<template>
  <div class="database-details">
    <div class="flex items-center space-x-4 mb-6">
      <div class="text-4xl">{{ database.logo }}</div>
      <div>
        <h3 class="text-3xl font-bold text-gray-900">{{ database.name }}</h3>
        <div class="flex items-center space-x-2 mt-1">
          <span class="text-lg text-gray-600">{{ database.type.toUpperCase() }} {{ t('databases.databaseLabel') }}</span>
          <span 
            class="px-3 py-1 text-sm font-medium rounded-full"
            :class="capBadgeClass"
          >
            {{ database.capType }} {{ t('databases.systemLabel') }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Description -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-3">{{ t('databases.description') }}</h4>
          <p class="text-gray-600 leading-relaxed">{{ getTranslatedDescription }}</p>
        </div>

        <!-- CAP Properties -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-3">{{ t('databases.capProperties') }}</h4>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="font-medium text-gray-700">{{ t('cap.consistency.title') }}</span>
              <PropertyLevel :level="database.consistency" property="consistency" />
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="font-medium text-gray-700">{{ t('cap.availability.title') }}</span>
              <PropertyLevel :level="database.availability" property="availability" />
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="font-medium text-gray-700">{{ t('cap.partition.title') }}</span>
              <PropertyLevel :level="database.partitionTolerance" property="partition" />
            </div>
          </div>
        </div>

        <!-- Use Cases -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-3">{{ t('databases.primaryUseCase') }}</h4>
          <p class="text-gray-600">{{ getTranslatedUseCase }}</p>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Key Features -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-3">{{ t('databases.keyFeatures') }}</h4>
          <ul class="space-y-2">
            <li
              v-for="(feature, index) in getTranslatedFeatures"
              :key="index"
              class="flex items-center space-x-2"
            >
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>
        </div>

        <!-- Example Applications -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-3">{{ t('databases.exampleApplications') }}</h4>
          <div class="space-y-2">
            <div
              v-for="example in database.examples"
              :key="example"
              class="p-3 bg-blue-50 rounded-lg"
            >
              <span class="text-blue-800 font-medium">{{ example }}</span>
            </div>
          </div>
        </div>

        <!-- Trade-off Summary -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-3">{{ t('databases.capTradeoffSummary') }}</h4>
          <div 
            class="p-4 rounded-lg border-l-4"
            :class="tradeoffSummaryClass"
          >
            <p class="font-medium mb-2">{{ tradeoffTitle }}</p>
            <p class="text-sm text-gray-600">{{ tradeoffDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PropertyLevel from './PropertyLevel.vue'

const { t } = useI18n()

interface Database {
  id: string
  name: string
  type: 'sql' | 'nosql'
  capType: 'CA' | 'CP' | 'AP'
  description: string
  logo: string
  useCase: string
  consistency: 'strong' | 'eventual' | 'configurable'
  availability: 'high' | 'medium' | 'low'
  partitionTolerance: 'high' | 'medium' | 'low'
  features: string[]
  examples: string[]
}

interface Props {
  database: Database
}

const props = defineProps<Props>()

// Computed properties for translated content
const getTranslatedDescription = computed(() => {
  const key = `databases.${props.database.type}.${props.database.id}.description`
  return t(key) !== key ? t(key) : props.database.description
})

const getTranslatedUseCase = computed(() => {
  const key = `databases.${props.database.type}.${props.database.id}.useCase`
  return t(key) !== key ? t(key) : props.database.useCase
})

const getTranslatedFeatures = computed(() => {
  // Try to get the specific database features translations
  const featuresKey = `databases.${props.database.type}.${props.database.id}.features`
  
  // Use the locale directly to check if features translation exists
  try {
    const translatedFeatures = props.database.features.map(feature => {
      const featureKey = `${featuresKey}.${feature}`
      const translated = t(featureKey)
      
      // If translation exists and is different from the key, use it
      if (translated && translated !== featureKey) {
        return translated
      }
      
      return feature
    })
    
    return translatedFeatures
  } catch (error) {
    console.error('Feature translation error:', error)
    return props.database.features
  }
})

const capBadgeClass = computed(() => {
  const capColors = {
    'CA': 'bg-blue-100 text-blue-800',
    'CP': 'bg-green-100 text-green-800',
    'AP': 'bg-yellow-100 text-yellow-800'
  }
  
  return capColors[props.database.capType]
})

const tradeoffSummaryClass = computed(() => {
  const capClasses = {
    'CA': 'border-blue-500 bg-blue-50',
    'CP': 'border-green-500 bg-green-50',
    'AP': 'border-yellow-500 bg-yellow-50'
  }
  
  return capClasses[props.database.capType]
})

const tradeoffTitle = computed(() => {
  const titleKeys = {
    'CA': 'databases.tradeoffs.ca.title',
    'CP': 'databases.tradeoffs.cp.title',
    'AP': 'databases.tradeoffs.ap.title'
  }
  
  return t(titleKeys[props.database.capType])
})

const tradeoffDescription = computed(() => {
  const descKeys = {
    'CA': 'databases.tradeoffs.ca.description',
    'CP': 'databases.tradeoffs.cp.description',
    'AP': 'databases.tradeoffs.ap.description'
  }
  
  return t(descKeys[props.database.capType])
})
</script>