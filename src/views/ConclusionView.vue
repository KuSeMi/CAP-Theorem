<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('conclusion.title') }}</h1>
        <p class="text-xl text-gray-600">{{ $t('conclusion.subtitle') }}</p>
      </div>

      <!-- Key Takeaways -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-3">{{ $t('conclusion.keyTakeaways') }}</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">{{ $t('conclusion.keyTakeawaysDescription') }}</p>
        </div>
        <div class="space-y-4">
          <div
            v-for="(point, index) in keyTakeawayPoints"
            :key="index"
            class="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            style="display: flex !important; visibility: visible !important;"
          >
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {{ index + 1 }}
              </div>
            </div>
            <div class="flex-1">
              <p class="text-gray-800 text-base">{{ point }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CAP Quick Reference -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('conclusion.quickReference') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- CA Systems -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6" style="display: block !important; visibility: visible !important;">
            <h3 class="text-xl font-bold text-blue-800 mb-3">{{ $t('conclusion.systemTypes.ca.title') }}</h3>
            <p class="text-blue-700 mb-4">{{ $t('conclusion.systemTypes.ca.subtitle') }}</p>
            <ul class="text-sm text-blue-600 space-y-1">
              <li v-for="feature in caSystemFeatures" :key="feature" style="display: list-item !important;">
                • {{ feature }}
              </li>
            </ul>
          </div>

          <!-- CP Systems -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-6" style="display: block !important; visibility: visible !important;">
            <h3 class="text-xl font-bold text-green-800 mb-3">{{ $t('conclusion.systemTypes.cp.title') }}</h3>
            <p class="text-green-700 mb-4">{{ $t('conclusion.systemTypes.cp.subtitle') }}</p>
            <ul class="text-sm text-green-600 space-y-1">
              <li v-for="feature in cpSystemFeatures" :key="feature" style="display: list-item !important;">
                • {{ feature }}
              </li>
            </ul>
          </div>

          <!-- AP Systems -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6" style="display: block !important; visibility: visible !important;">
            <h3 class="text-xl font-bold text-yellow-800 mb-3">{{ $t('conclusion.systemTypes.ap.title') }}</h3>
            <p class="text-yellow-700 mb-4">{{ $t('conclusion.systemTypes.ap.subtitle') }}</p>
            <ul class="text-sm text-yellow-600 space-y-1">
              <li v-for="feature in apSystemFeatures" :key="feature" style="display: list-item !important;">
                • {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Decision Matrix -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('conclusion.choosingSystem') }}</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-semibold text-gray-800">{{ $t('conclusion.useCase') }}</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-800">{{ $t('conclusion.priority') }}</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-800">{{ $t('conclusion.recommendedType') }}</th>
                <th class="text-left py-3 px-4 font-semibold text-gray-800">{{ $t('conclusion.examples') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-100">
                <td class="py-3 px-4">{{ $t('conclusion.useCases.financialTransactions') }}</td>
                <td class="py-3 px-4">{{ $t('conclusion.priorities.strongConsistency') }}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">CP</span>
                </td>
                <td class="py-3 px-4">PostgreSQL, MySQL</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-3 px-4">{{ $t('conclusion.useCases.socialMediaFeed') }}</td>
                <td class="py-3 px-4">{{ $t('conclusion.priorities.highAvailability') }}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">AP</span>
                </td>
                <td class="py-3 px-4">Cassandra, DynamoDB</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-3 px-4">{{ $t('conclusion.useCases.realtimeAnalytics') }}</td>
                <td class="py-3 px-4">{{ $t('conclusion.priorities.performance') }}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">CA</span>
                </td>
                <td class="py-3 px-4">Redis, In-memory DB</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-3 px-4">{{ $t('conclusion.useCases.iotDataCollection') }}</td>
                <td class="py-3 px-4">{{ $t('conclusion.priorities.scaleAvailability') }}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">AP</span>
                </td>
                <td class="py-3 px-4">Cassandra, InfluxDB</td>
              </tr>
              <tr>
                <td class="py-3 px-4">{{ $t('conclusion.useCases.ecommerceCatalog') }}</td>
                <td class="py-3 px-4">{{ $t('conclusion.priorities.consistencyQueries') }}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">CP</span>
                </td>
                <td class="py-3 px-4">MongoDB, PostgreSQL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Interactive Summary -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('conclusion.testUnderstanding') }}</h2>
        <CapQuiz />
      </div>

      <!-- Additional Resources -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('conclusion.resources') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            v-for="resource in resources"
            :key="resource.title"
            :href="resource.url"
            target="_blank"
            rel="noopener noreferrer"
            class="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300"
            style="display: block !important; visibility: visible !important;"
          >
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-2">{{ resource.title }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ resource.description }}</p>
                <span class="text-xs text-blue-600 font-medium">{{ resource.source }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <h2 class="text-3xl font-bold mb-4">{{ $t('conclusion.continuelearning') }}</h2>
        <p class="text-xl mb-6 opacity-90">
          {{ $t('conclusion.readyToDive') }}
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <RouterLink
            to="/cap"
            class="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
          >
            {{ $t('conclusion.reviewCapDiagram') }}
          </RouterLink>
          <RouterLink
            to="/simulation"
            class="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors duration-200"
          >
            {{ $t('conclusion.trySimulationAgain') }}
          </RouterLink>
          <RouterLink
            to="/databases"
            class="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-medium transition-colors duration-200"
          >
            {{ $t('conclusion.exploreDatabases') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CapQuiz from '../components/CapQuiz.vue'

const { t, locale } = useI18n()

// Computed properties for array translations
const keyTakeawayPoints = computed(() => {
  // Always ensure we have content regardless of translation issues
  const ukPoints = [
    'Жодна розподілена система не може гарантувати всі три властивості CAP одночасно',
    'Виберіть дві властивості на основі вимог вашого застосунку',
    'SQL бази даних зазвичай віддають перевагу узгодженості над доступністю',
    'NoSQL бази даних часто надають перевагу доступності та толерантності до розділення',
    'Вибір залежить від вашого конкретного випадку використання та вимог'
  ]
  
  const enPoints = [
    'No distributed system can guarantee all three CAP properties simultaneously',
    'Choose two properties based on your application requirements',
    'SQL databases typically favor consistency over availability',
    'NoSQL databases often prioritize availability and partition tolerance',
    'The choice depends on your specific use case and requirements'
  ]
  
  return locale.value === 'uk' ? ukPoints : enPoints
})

const caSystemFeatures = computed(() => {
  try {
    const features = t('conclusion.systemTypes.ca.features')
    if (Array.isArray(features) && features.length > 0) {
      return features
    }
  } catch (error) {
    console.error('CA features translation error:', error)
  }
  
  return locale.value === 'uk' ? [
    'Традиційні RDBMS',
    'Односерверні бази даних',
    'Відповідність ACID',
    'Без толерантності до розділення'
  ] : [
    'Traditional RDBMS',
    'Single-node databases',
    'ACID compliance',
    'No partition tolerance'
  ]
})

const cpSystemFeatures = computed(() => {
  try {
    const features = t('conclusion.systemTypes.cp.features')
    if (Array.isArray(features) && features.length > 0) {
      return features
    }
  } catch (error) {
    console.error('CP features translation error:', error)
  }
  
  return locale.value === 'uk' ? [
    'MongoDB',
    'HBase',
    'Redis Cluster',
    'Може жертвувати доступністю'
  ] : [
    'MongoDB',
    'HBase',
    'Redis Cluster',
    'May sacrifice availability'
  ]
})

const apSystemFeatures = computed(() => {
  try {
    const features = t('conclusion.systemTypes.ap.features')
    if (Array.isArray(features) && features.length > 0) {
      return features
    }
  } catch (error) {
    console.error('AP features translation error:', error)
  }
  
  return locale.value === 'uk' ? [
    'Cassandra',
    'DynamoDB',
    'CouchDB',
    'Врешті-решт узгодженість'
  ] : [
    'Cassandra',
    'DynamoDB',
    'CouchDB',
    'Eventual consistency'
  ]
})

const resources = [
  {
    title: "CAP Theorem - Wikipedia",
    description: "Comprehensive overview of the CAP theorem with mathematical proofs and examples.",
    source: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/CAP_theorem"
  },
  {
    title: "Dr. Eric A. Brewer CAP Theorem",
    description: "YouTube podcast with Dr. Eric Brewer discussing the CAP theorem and distributed systems.",
    source: "IEEE Computer Society",
    url: "https://www.youtube.com/watch?v=_zHJAvq8xIA&ab_channel=IEEEComputerSociety"
  },
  {
    title: "Please Stop Calling Databases CP or AP",
    description: "Martin Kleppmann's perspective on the practical implications of CAP classifications.",
    source: "Martin Kleppmann",
    url: "https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html"
  },
  {
    title: "CAP Theorem Explained",
    description: "IBM's practical guide to understanding CAP theorem in modern systems.",
    source: "IBM Cloud",
    url: "https://www.ibm.com/cloud/learn/cap-theorem"
  },
  {
    title: "Designing Data-Intensive Applications",
    description: "Martin Kleppmann's comprehensive book on distributed systems design.",
    source: "O'Reilly",
    url: "https://dataintensive.net/"
  },
  {
    title: "Distributed Systems Course",
    description: "MIT's distributed systems course materials and lectures.",
    source: "MIT",
    url: "https://pdos.csail.mit.edu/6.824/"
  }
]

onMounted(() => {
  // Simple fade in animation
  console.log('ConclusionView mounted')
  console.log('keyTakeawayPoints on mount:', keyTakeawayPoints.value)
  console.log('caSystemFeatures on mount:', caSystemFeatures.value)
  console.log('cpSystemFeatures on mount:', cpSystemFeatures.value)
  console.log('apSystemFeatures on mount:', apSystemFeatures.value)
})
</script>

<style scoped>
/* Simple hover effects */
table tbody tr {
  transition: background-color 0.2s ease;
}

table tbody tr:hover {
  background-color: rgba(59, 130, 246, 0.05);
}

/* Ensure all content is visible */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>