<template>
  <div class="about-page">
    <h1>About Page</h1>
    <p>This is the About page of your Vue-Electron SPA.</p>
    <router-link to="/">Back to Index Page (Link)</router-link>
    <br />
    <button @click="goToIndex">Back to Index Page (Button)</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToIndex = () => {
  router.push('/')
}
</script>

<style scoped>
.about-page {
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
</style>