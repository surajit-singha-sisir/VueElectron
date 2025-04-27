<template>
  <div class="index-page">
    <h1>Welcome to the Index Page</h1>
    <p>This is the home page of your Vue-Electron SPA.</p>
    <router-link to="/about">Go to About Page (Link)</router-link>
    <br />
    <button @click="goToAbout" class="m-t-50">Go to About Page (Button)</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
}
</script>

<style scoped>
.index-page {
  text-align: center;
  padding: 20px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369a6d;
}
.m-10i {
  margin: 2rem;
}
</style>