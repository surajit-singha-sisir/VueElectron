import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';
import { parse } from 'css';
import { compileTemplate } from '@vue/compiler-sfc';

// Paths
const vueFilesPath = path.join(__dirname, 'pages');
const mastorsCssPath = path.join(__dirname, 'mastorscdn', 'mastors.css');
const newMastorsCssPath = path.join(__dirname, 'mastorscdn', 'newmastors.css');
const rulesJsonPath = path.join(__dirname, 'mastorscdn', 'rules.json');

// Interfaces for CSS parse tree
interface CssDeclaration {
  type: 'declaration';
  property?: string;
  value?: string;
}

interface CssComment {
  type: 'comment';
  comment?: string;
}

interface CssRule {
  type: 'rule';
  selectors?: string[];
  declarations?: (CssDeclaration | CssComment)[];
}

interface CssAtRule {
  type: 'media' | 'keyframes' | 'font-face' | string;
  name?: string;
  rules?: (CssRule | CssComment | CssAtRule)[];
}

interface CssStylesheet {
  rules: (CssRule | CssComment | CssAtRule)[];
}

interface CssParseResult {
  stylesheet?: CssStylesheet;
}

// Interfaces for rules.json
interface MediaScreens {
  [key: string]: string;
}

interface Positions {
  [key: string]: string;
}

interface MarginRules {
  property: string;
  combinations: string[];
  prefix: string[];
  important: boolean;
  media: string[];
}

interface RulesJson {
  'media-screens': MediaScreens;
  positions: Positions;
  margins: MarginRules;
}

// Load rules.json
let rulesJson: RulesJson;
try {
  rulesJson = JSON.parse(fs.readFileSync(rulesJsonPath, 'utf-8'));
} catch (error) {
  console.error(`Failed to load rules.json: ${error}`);
  process.exit(1);
}

// Global set to track all classes used in Vue files
let allVueClasses = new Set<string>();
console.log('Initialized allVueClasses: empty');

// Function to extract class names from Vue file
function extractClassesFromVue(fileContent: string): Set<string> {
  const classes = new Set<string>();
  
  try {
    // Parse Vue file to get template content
    const parsed = compileTemplate({
      source: fileContent,
      filename: 'temp.vue',
      id: 'temp'
    });

    // Extract classes from template (HTML-like content)
    const classRegex = /class=["']([^"']*)["']/g;
    let match;
    while ((match = classRegex.exec(fileContent)) !== null) {
      const classNames = match[1].split(/\s+/).filter(Boolean);
      classNames.forEach(cls => {
        classes.add(cls);
        console.log(`Extracted class from template: ${cls}`);
      });
    }

    // Extract classes from <style> blocks if present
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
    while ((match = styleRegex.exec(fileContent)) !== null) {
      const styleContent = match[1];
      const classNameRegex = /\.([^{}\s,]+)(?=[^{}]*{)/g;
      let classMatch;
      while ((classMatch = classNameRegex.exec(styleContent)) !== null) {
        classes.add(classMatch[1]);
        console.log(`Extracted class from style: ${classMatch[1]}`);
      }
    }
  } catch (error) {
    console.error(`Failed to parse Vue file: ${error}`);
  }

  return classes;
}

// Function to generate dynamic margin rules based on class name
function generateMarginRule(className: string): string | null {
  // Updated regex to clearly separate prefix, position, value, important, and media
  const marginRegex = /^(m-|--)(?:([a-z]+)-)?([0-9]{2})(i)?(?::(sm|md|lg|xl))?$/;
  const match = className.match(marginRegex);
  if (!match) {
    console.log(`Class ${className} does not match margin pattern`);
    return null;
  }

  const [, prefix, position, valueStr, importantFlag, media] = match;
  const isPercentage = prefix === 'm--';
  const isImportant = !!importantFlag; // True if 'i' is present
  const valueNum = parseInt(valueStr, 10); // Parse '05' to 5
  const value = isPercentage ? `${valueNum}%` : `${valueNum / 10}rem`; // 5 -> 5% or 0.5rem
  const adjustedValue = isPercentage ? value : `${(valueNum / 10) - 0.5}rem`;

  console.log(`Processing margin class ${className}: prefix=${prefix}, valueNum=${valueNum}, isPercentage=${isPercentage}, isImportant=${isImportant}, position=${position || 'none'}, media=${media || 'none'}`);

  const positionsMap: { [key: string]: string[] } = {
    all: ['left', 'right', 'top', 'bottom'],
    lt: ['left', 'top'],
    tl: ['top', 'left'],
    lb: ['left', 'bottom'],
    bl: ['bottom', 'left'],
    rt: ['right', 'top'],
    tr: ['top', 'right'],
    lr: ['left', 'right'],
    rl: ['right', 'left'],
    tb: ['top', 'bottom'],
    bt: ['bottom', 'top'],
    lrt: ['left', 'right', 'top'],
    rlt: ['right', 'left', 'top'],
    trl: ['top', 'right', 'left'],
    tlr: ['top', 'left', 'right'],
    ltr: ['left', 'top', 'right'],
    tbr: ['top', 'bottom', 'right'],
    btr: ['bottom', 'top', 'right'],
    lbr: ['left', 'bottom', 'right'],
    rbl: ['right', 'bottom', 'left'],
    lrb: ['left', 'right', 'bottom'],
    l: ['left'],
    r: ['right'],
    t: ['top'],
    b: ['bottom']
  };

  let declarations: string[] = [];
  if (!position) {
    // Simple margin (e.g., m-05i, m--05i)
    declarations.push(`margin: ${value}${isImportant ? ' !important' : ''};`);
  } else if (positionsMap[position]) {
    // Position-based margin (e.g., m-lt-05i, m--lt-05i)
    declarations = positionsMap[position].map(pos => `margin-${pos}: ${value}${isImportant ? ' !important' : ''};`);
  } else {
    console.log(`Invalid position for ${className}: ${position}`);
    return null;
  }

  console.log(`Generated declarations for ${className}: ${declarations.join(', ')}`);

  if (media && rulesJson['media-screens'][media]) {
    // Media query rule (e.g., m-lt-05i:sm, m--05i:sm)
    const mediaMaxWidth = rulesJson['media-screens'][media];
    const mediaDeclarations = positionsMap[position]?.map(pos => `margin-${pos}: calc(${adjustedValue} - 1rem)${isImportant ? ' !important' : ''};`) || [`margin: calc(${adjustedValue} - 1rem)${isImportant ? ' !important' : ''};`];
    return `@media screen and (max-width: ${mediaMaxWidth}) {\n  .${className} {\n    ${mediaDeclarations.join('\n    ')}\n  }\n}`;
  }

  return `.${className} {\n  ${declarations.join('\n  ')}\n}`;
}

// Function to parse mastors.css and get all relevant rules
function getCssRules(): Map<string, string[]> {
  let cssContent: string;
  try {
    cssContent = fs.readFileSync(mastorsCssPath, 'utf-8');
  } catch (error) {
    console.error(`Failed to read mastors.css: ${error}`);
    return new Map();
  }

  const parsedCss: CssParseResult = parse(cssContent);
  const classRules = new Map<string, string[]>();
  const seenSelectors = new Set<string>();

  parsedCss.stylesheet?.rules.forEach((rule) => {
    if (rule.type === 'rule') {
      const cssRule = rule as CssRule;
      if (cssRule.selectors) {
        cssRule.selectors.forEach((selector: string) => {
          const classNames = selector.split(',').map((s: string) => s.trim()).filter((s: string) => s.startsWith('.'));
          classNames.forEach((classSelector: string) => {
            const mainClassMatch = classSelector.match(/\.([^\s:]+)/);
            if (mainClassMatch) {
              const mainClass = mainClassMatch[1];
              const ruleContent = cssRule.declarations
                ?.filter((decl): decl is CssDeclaration => decl.type === 'declaration')
                .map((decl: CssDeclaration) => `${decl.property}: ${decl.value};`)
                .join('\n  ');
              const fullRule = `${selector} {\n  ${ruleContent}\n}`;
              if (!seenSelectors.has(selector)) {
                seenSelectors.add(selector);
                const existingRules = classRules.get(mainClass) || [];
                existingRules.push(fullRule);
                classRules.set(mainClass, existingRules);
              }
            }
          });
        });
      }
    }
  });

  return classRules;
}

// Function to collect all classes from all Vue files
function collectAllVueClasses(): Set<string> {
  const classes = new Set<string>();
  let files: string[];
  try {
    files = fs.readdirSync(vueFilesPath).filter(file => path.extname(file) === '.vue');
  } catch (error) {
    console.error(`Failed to read pages directory: ${error}`);
    return classes;
  }
  
  files.forEach(file => {
    const filePath = path.join(vueFilesPath, file);
    let content: string;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`Failed to read ${file}: ${error}`);
      return;
    }
    const fileClasses = extractClassesFromVue(content);
    console.log(`Classes extracted from ${file}: ${Array.from(fileClasses).join(', ')}`);
    fileClasses.forEach(cls => classes.add(cls));
  });

  return classes;
}

// Function to update newmastors.css based on current Vue classes
function updateNewMastorsCss() {
  const cssRules = getCssRules();
  const newRules: string[] = [];
  const seenRules = new Set<string>();

  allVueClasses.forEach(cls => {
    const marginRule = generateMarginRule(cls);
    if (marginRule && !seenRules.has(marginRule)) {
      newRules.push(marginRule);
      seenRules.add(marginRule);
      console.log(`Added margin rule for ${cls}: ${marginRule.trim()}`);
    }

    if (cssRules.has(cls)) {
      const rules = cssRules.get(cls)!;
      rules.forEach(rule => {
        if (!seenRules.has(rule)) {
          newRules.push(rule);
          seenRules.add(rule);
          console.log(`Added mastors.css rule for ${cls}: ${rule.trim()}`);
        }
      });
    }
  });

  try {
    fs.writeFileSync(newMastorsCssPath, newRules.join('\n\n'), 'utf-8');
    console.log(`Updated ${newMastorsCssPath} with ${newRules.length} rules for classes: ${Array.from(allVueClasses).join(', ')}`);
  } catch (error) {
    console.error(`Failed to write newmastors.css: ${error}`);
  }
}

// Watch Vue files for changes
const watcher = chokidar.watch(vueFilesPath, {
  persistent: true,
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../,
  usePolling: true,
  interval: 100
});

watcher.on('add', (filePath) => {
  if (path.extname(filePath) === '.vue') {
    console.log(`Processing ${filePath}`);
    let content: string;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`Failed to read ${filePath}: ${error}`);
      return;
    }
    const classes = extractClassesFromVue(content);
    console.log(`Added classes from ${filePath}: ${Array.from(classes).join(', ')}`);
    classes.forEach(cls => allVueClasses.add(cls));
    updateNewMastorsCss();
  }
});

watcher.on('change', (filePath) => {
  if (path.extname(filePath) === '.vue') {
    console.log(`Detected change in ${filePath}`);
    let content: string;
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`Failed to read ${filePath}: ${error}`);
      return;
    }
    const newClasses = extractClassesFromVue(content);
    console.log(`Classes in ${filePath} after change: ${Array.from(newClasses).join(', ')}`);
    allVueClasses = collectAllVueClasses();
    console.log(`All classes after update: ${Array.from(allVueClasses).join(', ')}`);
    updateNewMastorsCss();
  }
});

watcher.on('unlink', (filePath) => {
  if (path.extname(filePath) === '.vue') {
    console.log(`Detected deletion of ${filePath}`);
    allVueClasses = collectAllVueClasses();
    console.log(`All classes after deletion: ${Array.from(allVueClasses).join(', ')}`);
    updateNewMastorsCss();
  }
});

console.log(`Watcher initialized for ${vueFilesPath}`);