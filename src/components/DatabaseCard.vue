<template>
  <div
    class="database-card p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md bg-white border-gray-300 hover:border-gray-400 hover:shadow-lg"
    :class="cardClass"
    @click="$emit('select', database)"
    style="min-height: 120px; border: 2px solid #d1d5db !important; background-color: white !important;"
  >
    <div class="flex items-center space-x-4">
      <!-- Database Logo -->
      <div class="text-3xl" style="color: #333 !important;">{{ database.logo || '🗃️' }}</div>
      
      <!-- Database Info -->
      <div class="flex-1">
        <div class="flex items-center space-x-2 mb-1">
          <h4 class="text-lg font-semibold text-gray-900" style="color: #111 !important; font-weight: bold !important;">{{ database.name || 'Database Name' }}</h4>
          <span 
            class="px-2 py-1 text-xs font-medium rounded"
            :class="capBadgeClass"
            style="display: inline-block !important;"
          >
            {{ database.capType || 'CP' }}
          </span>
        </div>
        <p class="text-sm text-gray-600 mb-2" style="color: #555 !important;">{{ getTranslatedDescription }}</p>
        <p class="text-xs text-gray-500" style="color: #666 !important;">
          <span class="font-medium">{{ t('databases.useCase') }}:</span> {{ getTranslatedUseCase }}
        </p>
      </div>
      
      <!-- Selection Indicator -->
      <div v-if="isSelected" class="flex-shrink-0">
        <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

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
  isSelected: boolean
}

const props = defineProps<Props>()

defineEmits<{
  select: [database: Database]
}>()

// Computed properties for translated content
const getTranslatedDescription = computed(() => {
  const key = `databases.${props.database.type}.${props.database.id}.description`
  return t(key) !== key ? t(key) : props.database.description
})

const getTranslatedUseCase = computed(() => {
  const key = `databases.${props.database.type}.${props.database.id}.useCase`
  return t(key) !== key ? t(key) : props.database.useCase
})

const cardClass = computed(() => {
  const baseClass = 'database-card'
  
  if (props.isSelected) {
    return `${baseClass} !border-blue-500 !bg-blue-50 shadow-lg`
  }
  
  return `${baseClass} !border-gray-300 !bg-white hover:!border-gray-400`
})

const capBadgeClass = computed(() => {
  const capColors = {
    'CA': 'bg-blue-100 text-blue-800',
    'CP': 'bg-green-100 text-green-800',
    'AP': 'bg-yellow-100 text-yellow-800'
  }
  
  return capColors[props.database.capType]
})
</script>

<style scoped>
.database-card {
  transform: translateY(0);
  transition: all 0.3s ease;
  background-color: white !important;
  border: 2px solid #d1d5db !important;
  border-radius: 0.5rem !important;
  padding: 1rem !important;
  margin-bottom: 1rem !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  min-height: 120px !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
}

.database-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  border-color: #9ca3af !important;
}

.database-card h4 {
  color: #111827 !important;
  font-weight: 600 !important;
  font-size: 1.125rem !important;
}

.database-card p {
  color: #6b7280 !important;
  display: block !important;
}
</style>