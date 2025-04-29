<template>
    <WelcomeLayout class="welcome-container">
        <h1>Welcome to the App</h1>
        <p>This is the Welcome page without the DefaultLayout.</p>
        <router-link to="/about">About</router-link>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import WelcomeLayout from '../../components/layouts/WelcomeLayout.vue';
useHead({
    title: 'Welcome',
    link: [
        {
            href: 'https://cdn.jsdelivr.net/npm/mastorscdn@latest/mastors.min.css',
            rel: 'stylesheet'
        }
    ]
});
</script>

<style scoped>
.welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #fff;
}
</style>
<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/mastorscdn@latest/mastors.min.css";
// @import "../../assets/styles/onuman.scss";
</style>
