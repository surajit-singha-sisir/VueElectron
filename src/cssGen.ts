import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';
import { parse } from 'css';
import { compileTemplate } from '@vue/compiler-sfc';

// Paths
const vueFilesPath = path.join(__dirname, 'pages');
const mastorsCssPath = path.join(__dirname, 'mastorscdn', 'mastors.css');
const newMastorsCssPath = path.join(__dirname, 'mastorscdn', 'newmastors.css');
const rulesJsonPath = path.join(__dirname, 'mastorscdn', 'rules2.json');
interface MediaScreens {
  xxsm: string;
  xsm: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
  xxxxl: string;
}

interface Positions {
  all: string;
  l: string;
  t: string;
  r: string;
  b: string;
}

interface MarginCombinations {
  all: string;
  lr: string;
  rl: string;
  tb: string;
  bt: string;
  lrt: string;
  rlt: string;
  trl: string;
  tlr: string;
  ltr: string;
  tbr: string;
  btr: string;
  lbr: string;
  lrb: string;
  rbl: string;
}

interface Margins {
  property: string;
  combinations: MarginCombinations;
  prefix: string[];
  important: boolean;
  media: string[];
}

interface ColorName {
  [key: string]: string;
}

interface PaddingCombinations {
  all: string;
  lr: string;
  rl: string;
  tb: string;
  bt: string;
  lrt: string;
  rlt: string;
  trl: string;
  tlr: string;
  ltr: string;
  tbr: string;
  btr: string;
  lbr: string;
  lrb: string;
  rbl: string;
}

interface Paddings {
  property: string;
  combinations: PaddingCombinations;
  prefix: string[];
  important: boolean;
  media: string[];
}

interface BackgroundCombinations {
  'bg-[ColorName]': string;
  'bg-[Positions]': string[];
  'bg-[Image]': string;
  'bg-[Size]': string[];
}

interface Backgrounds {
  property: string;
  combinations: BackgroundCombinations;
  prefix: string[];
  important: boolean;
  media: string[];
}

interface TextCombinations {
  'text-[ColorName]': string;
  'text-xs': string;
  'text-sm': string;
  'text-md': string;
  'text-lg': string;
  'text-xl': string;
  'text-xxl': string;
  'text-xxxl': string;
}

interface Texts {
  property: string;
  combinations: TextCombinations;
  prefix: string[];
  important: boolean;
  media: string[];
}

interface BorderCombinations {
  b: string;
  'b-t': string;
  'b-r': string;
  'b-b': string;
  'b-l': string;
  'b-lr': string;
  'b-rl': string;
  'b-tb': string;
  'b-bt': string;
}

interface Border {
  property: string;
  combinations: BorderCombinations;
  prefix: string[];
  important: boolean;
  media: string[];
}

interface Config {
  'media-screens': MediaScreens;
  positions: Positions;
  margins: Margins;
  ColorName: ColorName;
  paddings: Paddings;
  backgrounds: Backgrounds;
  texts: Texts;
  border: Border;
}
interface RulesJson {
  'media-screens': MediaScreens;
  positions: Positions;
  margins: MarginCombinations;
}
// Load rules.json
let rulesJson: RulesJson;
try {
  rulesJson = JSON.parse(fs.readFileSync(rulesJsonPath, 'utf-8'));
} catch (error) {
  console.error(`Failed to load rules.json: ${error}`);
  process.exit(1);
}
console.log(rulesJson);






console.log(`Watcher initialized for ${vueFilesPath}`);