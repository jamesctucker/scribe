<script setup>
import Header from "./components/Header.vue";
</script>
<template>
  <div class="app" data-theme="nord">
    <Header />
    <div class="main"><RouterView /></div>
  </div>
</template>
<style scoped>
.app {
  .main {
    padding: 1.5rem;
  }
}
</style>
