<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {{ $t('intro.title') }}
          </h1>
          <p class="hero-subtitle text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {{ $t('intro.subtitle') }}
          </p>
          <p class="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            {{ $t('intro.description') }}
          </p>
          
          <RouterLink
            to="/cap"
            class="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            {{ $t('intro.getStarted') }}
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />\n            </svg>
          </RouterLink>
        </div>
      </div>
      
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 -z-10">
        <div class="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"></div>
        <div class="floating-element absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20" style="animation-delay: 1s;"></div>
        <div class="floating-element absolute bottom-20 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-20" style="animation-delay: 2s;"></div>
        <div class="floating-element absolute bottom-40 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-20" style="animation-delay: 0.5s;"></div>
      </div>
    </section>

    <!-- CAP Properties Preview -->
    <section class="py-16 lg:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('home.threeProperties') }}</h2>
          <p class="text-lg text-gray-600">{{ $t('home.understandingConcepts') }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          <!-- Consistency Card -->
          <div class="property-card bg-white border-2 border-green-200 p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mx-auto max-w-sm w-full">
            <div class="text-center">
              <div class="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('home.consistencyTitle') }}</h3>
              <p class="text-gray-700 mb-4">{{ $t('home.consistencyShort') }}</p>
              <div class="bg-green-50 p-4 rounded-lg text-left">
                <h4 class="font-bold text-green-700 mb-2">{{ $t('home.consistencyDetails') }}</h4>
                <p class="text-sm text-gray-700 leading-relaxed">
                  {{ $t('home.consistencyLong') }}
                </p>
              </div>
              <RouterLink to="/cap" class="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                {{ $t('home.learnMore') }}
              </RouterLink>
            </div>
          </div>

          <!-- Availability Card -->
          <div class="property-card bg-white border-2 border-yellow-200 p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mx-auto max-w-sm w-full">
            <div class="text-center">
              <div class="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('home.availabilityTitle') }}</h3>
              <p class="text-gray-700 mb-4">{{ $t('home.availabilityShort') }}</p>
              <div class="bg-yellow-50 p-4 rounded-lg text-left">
                <h4 class="font-bold text-yellow-700 mb-2">{{ $t('home.availabilityDetails') }}</h4>
                <p class="text-sm text-gray-700 leading-relaxed">
                  {{ $t('home.availabilityLong') }}
                </p>
              </div>
              <RouterLink to="/cap" class="inline-block mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                {{ $t('home.learnMore') }}
              </RouterLink>
            </div>
          </div>

          <!-- Partition Tolerance Card -->
          <div class="property-card bg-white border-2 border-red-200 p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mx-auto max-w-sm w-full">
            <div class="text-center">
              <div class="w-16 h-16 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('home.partitionTitle') }}</h3>
              <p class="text-gray-700 mb-4">{{ $t('home.partitionShort') }}</p>
              <div class="bg-red-50 p-4 rounded-lg text-left">
                <h4 class="font-bold text-red-700 mb-2">{{ $t('home.partitionDetails') }}</h4>
                <p class="text-sm text-gray-700 leading-relaxed">
                  {{ $t('home.partitionLong') }}
                </p>
              </div>
              <RouterLink to="/cap" class="inline-block mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                {{ $t('home.learnMore') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 lg:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('home.interactiveLearning') }}</h2>
          <p class="text-lg text-gray-600">{{ $t('home.exploreDescription') }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <RouterLink to="/cap" class="block">
            <div class="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-105 mx-auto max-w-xs w-full h-full">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">{{ $t('home.features.interactiveDiagrams.title') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('home.features.interactiveDiagrams.description') }}</p>
            </div>
          </RouterLink>

          <RouterLink to="/simulation" class="block">
            <div class="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-105 mx-auto max-w-xs w-full h-full">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">{{ $t('home.features.liveSimulations.title') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('home.features.liveSimulations.description') }}</p>
            </div>
          </RouterLink>

          <RouterLink to="/databases" class="block">
            <div class="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-105 mx-auto max-w-xs w-full h-full">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">{{ $t('home.features.databaseExamples.title') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('home.features.databaseExamples.description') }}</p>
            </div>
          </RouterLink>

          <RouterLink to="/conclusion" class="block">
            <div class="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-105 mx-auto max-w-xs w-full h-full">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">{{ $t('home.features.quickReference.title') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('home.features.quickReference.description') }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'

onMounted(() => {
  // Animate hero elements
  gsap.timeline()
    .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power2.out' })
    .from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.5')
    .from('.hero-title + p', { duration: 1, y: 20, opacity: 0, ease: 'power2.out' }, '-=0.5')
    .from('.hero-title + p + p + a', { duration: 1, y: 20, opacity: 0, ease: 'power2.out' }, '-=0.3')

  // Animate property cards
  gsap.from('.property-card', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
    delay: 1
  })

  // Animate feature cards
  gsap.from('.feature-card', {
    duration: 0.6,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 1.5
  })
})
</script>

<style scoped>
.floating-element {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.property-card,
.feature-card {
  backdrop-filter: blur(10px);
}

/* Ensure equal heights and symmetrical spacing */
.property-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.property-card .text-center {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.property-card .bg-green-50,
.property-card .bg-yellow-50,
.property-card .bg-red-50 {
  flex-grow: 1;
  margin-bottom: 1rem;
}

.feature-card {
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

/* Responsive grid adjustments */
@media (min-width: 768px) and (max-width: 1023px) {
  .property-card {
    min-height: 450px;
  }
}

@media (min-width: 1024px) {
  .property-card {
    min-height: 500px;
  }
}
</style>