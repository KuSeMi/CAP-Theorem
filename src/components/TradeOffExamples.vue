<template>
  <div class="bg-white rounded-xl shadow-lg p-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
      {{ $t('tradeoff.title', { combination: tradeOffTitle }) }}
    </h3>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- What this means (takes 2 columns) -->      
      <div class="lg:col-span-2">
        <h4 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('tradeoff.whatItMeans') }}</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-green-800 mb-1">{{ $t('tradeoff.guaranteed') }}</p>
              <p class="text-green-700 text-sm leading-relaxed">{{ guaranteedDescription }}</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
            <div class="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-red-800 mb-1">{{ $t('tradeoff.compromised') }}</p>
              <p class="text-red-700 text-sm leading-relaxed">{{ compromisedDescription }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Database Examples (takes 1 column) -->
      <div>
        <h4 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('tradeoff.databaseExamples') }}</h4>
        <div class="space-y-3">
          <div
            v-for="example in examples"
            :key="example.name"
            class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-gray-900 text-sm">{{ example.name }}</span>
              <span class="px-2 py-1 text-xs font-bold bg-blue-500 text-white rounded-full">
                {{ tradeOffAbbrev }}
              </span>
            </div>
            <p class="text-xs text-gray-700 mb-2 leading-relaxed">{{ example.description }}</p>
            <div class="text-xs text-blue-600 font-medium">
              💡 {{ example.useCase }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- System Behavior Visualization -->
    <div class="mt-8 pt-8 border-t border-gray-200">
      <h4 class="text-lg font-semibold text-gray-800 mb-4 text-center">{{ $t('tradeoff.systemBehavior') }}</h4>
      <TradeOffVisualization v-if="tradeOffType" :trade-off="tradeOffType" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TradeOffVisualization from './TradeOffVisualization.vue'

type CapProperty = 'consistency' | 'availability' | 'partition'

interface Props {
  selectedProperties: CapProperty[]
}

const props = defineProps<Props>()
const { t } = useI18n()

const tradeOffType = computed(() => {
  const sorted = [...props.selectedProperties].sort()
  if (sorted.includes('consistency') && sorted.includes('availability')) {
    return 'CA'
  } else if (sorted.includes('consistency') && sorted.includes('partition')) {
    return 'CP'
  } else if (sorted.includes('availability') && sorted.includes('partition')) {
    return 'AP'
  }
  return ''
})

const tradeOffTitle = computed(() => {
  return t(`tradeoff.combinations.${tradeOffType.value}`)
})

const tradeOffAbbrev = computed(() => tradeOffType.value)

const guaranteedDescription = computed(() => {
  return t(`tradeoff.guarantees.${tradeOffType.value}`)
})

const compromisedDescription = computed(() => {
  return t(`tradeoff.compromises.${tradeOffType.value}`)
})

const examples = computed(() => {
  const exampleSets = {
    'CA': [
      {
        name: 'MySQL',
        description: t('tradeoff.examples.mysql.description'),
        useCase: t('tradeoff.examples.mysql.useCase')
      },
      {
        name: 'PostgreSQL', 
        description: t('tradeoff.examples.postgresql.description'),
        useCase: t('tradeoff.examples.postgresql.useCase')
      }
    ],
    'CP': [
      {
        name: 'MongoDB',
        description: t('tradeoff.examples.mongodb.description'),
        useCase: t('tradeoff.examples.mongodb.useCase')
      },
      {
        name: 'HBase',
        description: t('tradeoff.examples.hbase.description'),
        useCase: t('tradeoff.examples.hbase.useCase')
      }
    ],
    'AP': [
      {
        name: 'Cassandra',
        description: t('tradeoff.examples.cassandra.description'),
        useCase: t('tradeoff.examples.cassandra.useCase')
      },
      {
        name: 'DynamoDB',
        description: t('tradeoff.examples.dynamodb.description'),
        useCase: t('tradeoff.examples.dynamodb.useCase')
      }
    ]
  }
  return exampleSets[tradeOffType.value as keyof typeof exampleSets] || []
})
</script>