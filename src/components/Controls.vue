<template>
    <div class="window-controls">
        <button class="minimize" @click="minimizeWindow" title="Minimize"></button>
        <button class="maximize" @click="maximizeWindow" title="Maximize/Restore"></button>
        <button class="close" @click="closeWindow" title="Close"></button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Controls',
    methods: {
        closeWindow() {
            window.electronAPI.closeWindow();
        },
        minimizeWindow() {
            window.electronAPI.minimizeWindow();
        },
        maximizeWindow() {
            window.electronAPI.maximizeWindow();
        },
    },
});
</script>

<style scoped>
.window-controls {
    display: flex;
    gap: 6px;
    -webkit-app-region: no-drag;
}

.window-controls button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    -webkit-app-region: no-drag;
    transition: opacity 0.2s;
}

.window-controls button:hover {
    opacity: 0.8;
}

.close {
    background: #ff3b30;
}

.minimize {
    background: #ffcc00;
}

.maximize {
    background: #00ff00;
}
</style>