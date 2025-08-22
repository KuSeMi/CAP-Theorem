<template>
  <div class="flex justify-center">
    <svg
      class="trade-off-visualization"
      viewBox="0 0 600 200"
      width="600"
      height="200"
    >
      <!-- Background -->
      <rect width="600" height="200" fill="#f9fafb" rx="8" />
      
      <!-- Network Partition Line (for CP and AP) -->
      <line
        v-if="tradeOff !== 'CA'"
        x1="300" y1="20"
        x2="300" y2="180"
        stroke="#ef4444"
        stroke-width="3"
        stroke-dasharray="10,5"
        class="partition-line"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;15"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>
      
      <!-- Partition Label -->
      <text
        v-if="tradeOff !== 'CA'"
        x="300" y="15"
        text-anchor="middle"
        class="text-xs font-medium fill-red-600"
      >
        {{ t('visualization.networkPartition') }}
      </text>

      <!-- Left Side Nodes -->
      <g class="left-cluster">
        <text x="150" y="35" text-anchor="middle" class="text-sm font-medium fill-gray-700">
          {{ leftClusterLabel }}
        </text>
        
        <!-- Node 1 -->
        <circle
          cx="100" cy="80"
          r="20"
          :fill="getNodeColor('left', 0)"
          :class="getNodeClass('left', 0)"
          class="node transition-all duration-500"
        />
        <text x="100" y="85" text-anchor="middle" class="text-xs font-bold fill-white">1</text>
        
        <!-- Node 2 -->
        <circle
          cx="200" cy="80"
          r="20"
          :fill="getNodeColor('left', 1)"
          :class="getNodeClass('left', 1)"
          class="node transition-all duration-500"
        />
        <text x="200" y="85" text-anchor="middle" class="text-xs font-bold fill-white">2</text>
        
        <!-- Data -->
        <rect
          x="120" y="120"
          width="60" height="30"
          :fill="getDataColor('left')"
          rx="4"
          class="data-block transition-all duration-500"
        />
        <text x="150" y="140" text-anchor="middle" class="text-xs font-medium fill-white">
          {{ getDataValue('left') }}
        </text>
        
        <!-- Status -->
        <text x="150" y="170" text-anchor="middle" :class="getStatusClass('left')">
          {{ getClusterStatus('left') }}
        </text>
      </g>

      <!-- Right Side Nodes -->
      <g class="right-cluster">
        <text x="450" y="35" text-anchor="middle" class="text-sm font-medium fill-gray-700">
          {{ rightClusterLabel }}
        </text>
        
        <!-- Node 3 -->
        <circle
          cx="400" cy="80"
          r="20"
          :fill="getNodeColor('right', 0)"
          :class="getNodeClass('right', 0)"
          class="node transition-all duration-500"
        />
        <text x="400" y="85" text-anchor="middle" class="text-xs font-bold fill-white">3</text>
        
        <!-- Node 4 -->
        <circle
          cx="500" cy="80"
          r="20"
          :fill="getNodeColor('right', 1)"
          :class="getNodeClass('right', 1)"
          class="node transition-all duration-500"
        />
        <text x="500" y="85" text-anchor="middle" class="text-xs font-bold fill-white">4</text>
        
        <!-- Data -->
        <rect
          x="420" y="120"
          width="60" height="30"
          :fill="getDataColor('right')"
          rx="4"
          class="data-block transition-all duration-500"
        />
        <text x="450" y="140" text-anchor="middle" class="text-xs font-medium fill-white">
          {{ getDataValue('right') }}
        </text>
        
        <!-- Status -->
        <text x="450" y="170" text-anchor="middle" :class="getStatusClass('right')">
          {{ getClusterStatus('right') }}
        </text>
      </g>

      <!-- Connection Lines -->
      <template v-if="tradeOff === 'CA'">
        <!-- All nodes connected -->
        <line x1="120" y1="80" x2="180" y2="80" stroke="#10b981" stroke-width="2" class="connection" />
        <line x1="200" y1="80" x2="400" y2="80" stroke="#10b981" stroke-width="2" class="connection" />
        <line x1="420" y1="80" x2="480" y2="80" stroke="#10b981" stroke-width="2" class="connection" />
      </template>
      
      <template v-else>
        <!-- Internal cluster connections only -->
        <line x1="120" y1="80" x2="180" y2="80" stroke="#10b981" stroke-width="2" class="connection" />
        <line x1="420" y1="80" x2="480" y2="80" stroke="#10b981" stroke-width="2" class="connection" />
        
        <!-- Broken cross-partition connection -->
        <line x1="200" y1="80" x2="280" y2="80" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" class="broken-connection" opacity="0.5" />
        <line x1="320" y1="80" x2="400" y2="80" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" class="broken-connection" opacity="0.5" />
      </template>
    </svg>
    
    <!-- Legend -->
    <div class="ml-8 text-sm">
      <h5 class="font-semibold text-gray-800 mb-2">{{ t('visualization.legend') }}:</h5>
      <div class="space-y-1">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-gray-600">{{ t('visualization.activeConsistent') }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span class="text-gray-600">{{ t('visualization.activeInconsistent') }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span class="text-gray-600">{{ t('visualization.unavailable') }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-0.5 bg-red-500"></div>
          <span class="text-gray-600">{{ t('visualization.networkPartition') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  tradeOff: 'CA' | 'CP' | 'AP'
}

const props = defineProps<Props>()
const { t } = useI18n()

// Simulate data changes for demonstration
const dataVersion = ref(1)

const leftClusterLabel = computed(() => {
  return props.tradeOff === 'CA' ? t('visualization.clusterA') : t('visualization.partitionA')
})

const rightClusterLabel = computed(() => {
  return props.tradeOff === 'CA' ? t('visualization.clusterB') : t('visualization.partitionB')
})

const getNodeColor = (cluster: 'left' | 'right', nodeIndex: number) => {
  switch (props.tradeOff) {
    case 'CA':
      return '#10b981' // All nodes active and consistent
    case 'CP':
      // In CP, some nodes may be unavailable to maintain consistency
      if (cluster === 'right' && nodeIndex === 1) {
        return '#6b7280' // One node unavailable
      }
      return '#10b981'
    case 'AP':
      // In AP, all nodes are available but may have inconsistent data
      return cluster === 'left' ? '#10b981' : '#f59e0b'
    default:
      return '#6b7280'
  }
}

const getNodeClass = (cluster: 'left' | 'right', nodeIndex: number) => {
  const base = 'node'
  
  switch (props.tradeOff) {
    case 'CP':
      if (cluster === 'right' && nodeIndex === 1) {
        return `${base} unavailable`
      }
      return base
    case 'AP':
      return `${base} ${cluster === 'left' ? 'consistent' : 'inconsistent'}`
    default:
      return base
  }
}

const getDataColor = (cluster: 'left' | 'right') => {
  switch (props.tradeOff) {
    case 'CA':
      return '#3b82f6' // Same data everywhere
    case 'CP':
      return '#3b82f6' // Consistent data
    case 'AP':
      return cluster === 'left' ? '#3b82f6' : '#f59e0b' // Different data
    default:
      return '#6b7280'
  }
}

const getDataValue = (cluster: 'left' | 'right') => {
  switch (props.tradeOff) {
    case 'CA':
      return `v${dataVersion.value}`
    case 'CP':
      return `v${dataVersion.value}`
    case 'AP':
      return cluster === 'left' ? `v${dataVersion.value}` : `v${dataVersion.value - 1}`
    default:
      return 'v1'
  }
}

const getClusterStatus = (cluster: 'left' | 'right') => {
  switch (props.tradeOff) {
    case 'CA':
      return t('visualization.availableConsistent')
    case 'CP':
      if (cluster === 'right') {
        return t('visualization.partiallyAvailable')
      }
      return t('visualization.availableConsistent')
    case 'AP':
      if (cluster === 'left') {
        return t('visualization.availableConsistent')
      }
      return t('visualization.availableStale')
    default:
      return t('visualization.unknown')
  }
}

const getStatusClass = (cluster: 'left' | 'right') => {
  const baseClass = 'text-xs font-medium'
  
  switch (props.tradeOff) {
    case 'CA':
      return `${baseClass} fill-green-600`
    case 'CP':
      return cluster === 'right' 
        ? `${baseClass} fill-yellow-600` 
        : `${baseClass} fill-green-600`
    case 'AP':
      return cluster === 'left' 
        ? `${baseClass} fill-green-600` 
        : `${baseClass} fill-yellow-600`
    default:
      return `${baseClass} fill-gray-600`
  }
}

// Simulate data updates for AP scenario
onMounted(() => {
  if (props.tradeOff === 'AP') {
    setInterval(() => {
      dataVersion.value++
    }, 3000)
  }
})
</script>

<style scoped>
.trade-off-visualization {
  max-width: 100%;
  height: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.node {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.node.unavailable {
  opacity: 0.5;
  animation: fade 2s ease-in-out infinite;
}

.node.inconsistent {
  animation: warning-pulse 2s ease-in-out infinite;
}

.data-block {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.connection {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.broken-connection {
  animation: broken-line 2s linear infinite;
}

.partition-line {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

@keyframes fade {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

@keyframes warning-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}

@keyframes broken-line {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 20; }
}
</style>