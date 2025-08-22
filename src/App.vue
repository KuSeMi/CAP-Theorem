<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { gsap } from 'gsap'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

// Initialize GSAP animations
onMounted(() => {
  gsap.from('.app-container', {
    duration: 1,
    opacity: 0,
    y: 30,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <AppHeader />
    
    <main class="app-container">
      <RouterView />
    </main>
    
    <AppFooter />
  </div>
</template>

<style scoped>
.app-container {
  min-height: calc(100vh - 160px);
}
</style>
