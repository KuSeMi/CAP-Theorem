<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 lg:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8 lg:mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('cap.title') }}</h1>
        <p class="text-xl text-gray-600 mb-8">{{ $t('cap.subtitle') }}</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 items-start">
        <!-- Left Column: CAP Triangle -->
        <div class="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8 flex-shrink-0">
          <div class="relative">
            <CapTriangle
              :selected-properties="selectedProperties"
              @property-click="handlePropertyClick"
            />
          </div>
          
          <!-- Selection Info -->
          <div class="mt-8 text-center">
            <div v-if="selectedProperties.length === 0" class="text-gray-500">
              {{ $t('cap.selectTwo') }}
            </div>
            <div v-else-if="selectedProperties.length === 1" class="text-blue-600">
              {{ $t('cap.selectOne') }}
            </div>
            <div v-else-if="selectedProperties.length === 2" class="space-y-2">
              <div class="text-green-600 font-medium">
                {{ $t('cap.selected', { properties: getPropertyNames(selectedProperties).join(' + ') }) }}
              </div>
              <div class="text-red-600">
                {{ $t('cap.tradeOff', { missing: getMissingProperty }) }}
              </div>
            </div>
            <div v-else class="text-amber-600">
              {{ $t('cap.canSelectTwo') }}
            </div>
          </div>

          <!-- Reset Button -->
          <div class="mt-6 text-center">
            <button
              @click="resetSelection"
              class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            >
              {{ $t('cap.resetSelection') }}
            </button>
          </div>
        </div>

        <!-- Right Column: Property Details -->
        <div class="w-full lg:w-1/2 flex flex-col min-h-0 flex-shrink-0" style="gap: 24px;">
          <!-- Consistency -->
          <div 
            class="property-detail bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-transparent"
            :class="{
              'ring-2 ring-green-500 bg-green-50 border-green-200': selectedProperties.includes('consistency'),
              'opacity-70': selectedProperties.length === 2 && !selectedProperties.includes('consistency')
            }"
            @click="handlePropertyClick('consistency')"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-lg">{{ vertexLetters.consistency }}</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  {{ $t('cap.consistency.title') }}
                  <span v-if="showEnglishTerms" class="text-sm font-normal text-gray-500 ml-2">(Consistency)</span>
                </h3>
                <p class="text-gray-600 mb-3 font-medium">{{ $t('cap.consistency.description') }}</p>
                <p class="text-sm text-gray-500 leading-relaxed">{{ $t('cap.consistency.detail') }}</p>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div 
            class="property-detail bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-transparent"
            :class="{
              'ring-2 ring-yellow-500 bg-yellow-50 border-yellow-200': selectedProperties.includes('availability'),
              'opacity-70': selectedProperties.length === 2 && !selectedProperties.includes('availability')
            }"
            @click="handlePropertyClick('availability')"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-lg">{{ vertexLetters.availability }}</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  {{ $t('cap.availability.title') }}
                  <span v-if="showEnglishTerms" class="text-sm font-normal text-gray-500 ml-2">(Availability)</span>
                </h3>
                <p class="text-gray-600 mb-3 font-medium">{{ $t('cap.availability.description') }}</p>
                <p class="text-sm text-gray-500 leading-relaxed">{{ $t('cap.availability.detail') }}</p>
              </div>
            </div>
          </div>

          <!-- Partition Tolerance -->
          <div 
            class="property-detail bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-transparent"
            :class="{
              'ring-2 ring-red-500 bg-red-50 border-red-200': selectedProperties.includes('partition'),
              'opacity-70': selectedProperties.length === 2 && !selectedProperties.includes('partition')
            }"
            @click="handlePropertyClick('partition')"
          >
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-lg">{{ vertexLetters.partition }}</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  {{ $t('cap.partition.title') }}
                  <span v-if="showEnglishTerms" class="text-sm font-normal text-gray-500 ml-2">(Partition Tolerance)</span>
                </h3>
                <p class="text-gray-600 mb-3 font-medium">{{ $t('cap.partition.description') }}</p>
                <p class="text-sm text-gray-500 leading-relaxed">{{ $t('cap.partition.detail') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trade-off Examples -->
      <div v-if="selectedProperties.length === 2" class="mt-8 lg:mt-12">
        <TradeOffExamples :selected-properties="selectedProperties" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
import CapTriangle from '../components/CapTriangle.vue'
import TradeOffExamples from '../components/TradeOffExamples.vue'

type CapProperty = 'consistency' | 'availability' | 'partition'

const selectedProperties = ref<CapProperty[]>([])
const { t, locale } = useI18n()

// Computed property for vertex letters based on language
const vertexLetters = computed(() => {
  if (locale.value === 'uk') {
    return {
      consistency: 'У',
      availability: 'Д', 
      partition: 'Т'
    }
  } else {
    return {
      consistency: 'C',
      availability: 'A',
      partition: 'P'
    }
  }
})

// Computed property for showing English terms in parentheses (only for Ukrainian)
const showEnglishTerms = computed(() => locale.value === 'uk')

const handlePropertyClick = (property: CapProperty) => {
  const index = selectedProperties.value.indexOf(property)
  
  if (index > -1) {
    // Remove if already selected
    selectedProperties.value.splice(index, 1)
  } else if (selectedProperties.value.length < 2) {
    // Add if less than 2 selected
    selectedProperties.value.push(property)
  } else {
    // Replace first selected with new one if 2 already selected
    selectedProperties.value.shift()
    selectedProperties.value.push(property)
  }
}

const resetSelection = () => {
  selectedProperties.value = []
}

const getPropertyNames = (properties: CapProperty[]) => {
  const nameMap = {
    consistency: t('cap.consistency.title'),
    availability: t('cap.availability.title'),
    partition: t('cap.partition.title')
  }
  return properties.map(prop => nameMap[prop])
}

const getMissingProperty = computed(() => {
  const allProperties: CapProperty[] = ['consistency', 'availability', 'partition']
  const missing = allProperties.find(prop => !selectedProperties.value.includes(prop))
  
  const nameMap = {
    consistency: t('cap.consistency.title'),
    availability: t('cap.availability.title'),
    partition: t('cap.partition.title')
  }
  
  return missing ? nameMap[missing] : ''
})

onMounted(() => {
  // Animate property details
  gsap.from('.property-detail', {
    duration: 0.6,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.property-detail {
  transition: all 0.3s ease;
  min-height: 160px;
  display: flex !important;
  visibility: visible !important;
  position: relative;
  z-index: 1;
  opacity: 1 !important;
  flex-shrink: 0;
}

.property-detail:hover {
  transform: translateY(-2px);
}

/* Ensure equal spacing between all cards using gap */
.property-detail {
  /* Force remove any margins that might interfere */
  margin: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

/* Explicitly set gap on the container */
.w-full.lg\:w-1\/2 {
  gap: 24px !important;
}

/* Fix letter centering in circles */
.property-detail .w-12.h-12 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.property-detail .w-12.h-12 span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 1;
}

/* Ensure all property cards remain visible */
.property-detail * {
  visibility: visible !important;
}

/* Improved visibility for compromised state */
.property-detail.opacity-70 {
  opacity: 0.75 !important;
}

/* Prevent text overflow */
.min-w-0 {
  min-width: 0 !important;
}
</style>