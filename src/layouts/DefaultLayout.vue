<template>
    <div class="layout">
        <header class="ios-header">
            <div class="title">My App</div>
            <div class="header-right">
                <button class="action-button" @click="openSettings">Settings</button>
                <Controls />
            </div>
        </header>
        <main class="content">
            <slot />
        </main>
    </div>
</template>

<script>
import Controls from '../components/Controls.vue';

export default {
    name: 'DefaultLayout',
    components: {
        Controls,
    },
    methods: {
        openSettings() {
            alert('Settings clicked!');
            // Replace with actual settings logic, e.g., this.$router.push('/settings')
        },
    },
};
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    -webkit-app-region: no-drag;
    /* Prevent dragging on layout */
}

.ios-header {
    height: 44px;
    /* Standard iOS navigation bar height */
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    /* iOS-style blur effect */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    position: fixed;
    /* Keep header at top */
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    -webkit-app-region: drag;
    /* Make header draggable */
}

.title {
    font-size: 17px;
    font-weight: 600;
    color: #000;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 10px;
    /* Space between Settings and controls */
    -webkit-app-region: no-drag;
    /* Ensure right section is not draggable */
}

.action-button {
    background: none;
    border: none;
    font-size: 16px;
    color: #007aff;
    /* iOS blue */
    cursor: pointer;
    -webkit-app-region: no-drag;
}

.content {
    margin-top: 44px;
    /* Match header height */
    padding: 1rem;
    flex: 1;
}
</style>