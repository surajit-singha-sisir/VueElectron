<template>
    <router-view />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';


useHead({
    link: [
        {
            href: '../assets/styles/onuman.scss',
            rel: 'stylesheet'
        }
    ]
})
</script>