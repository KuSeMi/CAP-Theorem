<template>
  <div class="flex justify-center">
    <svg
      class="database-cap-triangle"
      viewBox="0 0 400 400"
      width="400"
      height="400"
    >
      <!-- Triangle Lines -->
      <line
        x1="200" y1="50"
        x2="100" y2="250"
        :stroke="getLineColor('consistency', 'availability')"
        stroke-width="3"
        class="triangle-line transition-all duration-500"
      />
      <line
        x1="100" y1="250"
        x2="300" y2="250"
        :stroke="getLineColor('availability', 'partition')"
        stroke-width="3"
        class="triangle-line transition-all duration-500"
      />
      <line
        x1="300" y1="250"
        x2="200" y2="50"
        :stroke="getLineColor('partition', 'consistency')"
        stroke-width="3"
        class="triangle-line transition-all duration-500"
      />

      <!-- Emphasized connection for database's CAP type -->
      <template v-if="database.capType === 'CA'">
        <line
          x1="200" y1="50"
          x2="100" y2="250"
          stroke="#3b82f6"
          stroke-width="6"
          class="emphasized-line"
        />
      </template>
      <template v-else-if="database.capType === 'CP'">
        <line
          x1="200" y1="50"
          x2="300" y2="250"
          stroke="#3b82f6"
          stroke-width="6"
          class="emphasized-line"
        />
      </template>
      <template v-else-if="database.capType === 'AP'">
        <line
          x1="100" y1="250"
          x2="300" y2="250"
          stroke="#3b82f6"
          stroke-width="6"
          class="emphasized-line"
        />
      </template>

      <!-- Database icon in center -->
      <circle
        cx="200" cy="183"
        r="25"
        fill="white"
        stroke="#3b82f6"
        stroke-width="3"
        class="database-icon"
      />
      <text
        x="200" y="190"
        text-anchor="middle"
        class="text-2xl"
      >
        {{ database.logo }}
      </text>

      <!-- Vertices -->
      <!-- Consistency (Top) -->
      <g class="vertex-group">
        <circle
          cx="200" cy="50"
          :r="getVertexRadius('consistency')"
          :fill="getVertexColor('consistency')"
          :class="getVertexClass('consistency')"
          class="vertex transition-all duration-300"
        />
        <text
          x="200" y="55"
          text-anchor="middle"
          class="vertex-label font-bold text-sm fill-white"
        >
          C
        </text>
        <text
          x="200" y="35"
          text-anchor="middle"
          class="vertex-title font-medium text-xs fill-gray-600"
        >
          Consistency
        </text>
        <!-- Property level indicator -->
        <circle
          cx="225" cy="50"
          r="8"
          :fill="getPropertyLevelColor(database.consistency)"
          class="property-level-indicator"
        />
      </g>

      <!-- Availability (Bottom Left) -->
      <g class="vertex-group">
        <circle
          cx="100" cy="250"
          :r="getVertexRadius('availability')"
          :fill="getVertexColor('availability')"
          :class="getVertexClass('availability')"
          class="vertex transition-all duration-300"
        />
        <text
          x="100" y="255"
          text-anchor="middle"
          class="vertex-label font-bold text-sm fill-white"
        >
          A
        </text>
        <text
          x="100" y="275"
          text-anchor="middle"
          class="vertex-title font-medium text-xs fill-gray-600"
        >
          Availability
        </text>
        <!-- Property level indicator -->
        <circle
          cx="75" cy="250"
          r="8"
          :fill="getPropertyLevelColor(database.availability)"
          class="property-level-indicator"
        />
      </g>

      <!-- Partition Tolerance (Bottom Right) -->
      <g class="vertex-group">
        <circle
          cx="300" cy="250"
          :r="getVertexRadius('partition')"
          :fill="getVertexColor('partition')"
          :class="getVertexClass('partition')"
          class="vertex transition-all duration-300"
        />
        <text
          x="300" y="255"
          text-anchor="middle"
          class="vertex-label font-bold text-sm fill-white"
        >
          P
        </text>
        <text
          x="300" y="275"
          text-anchor="middle"
          class="vertex-title font-medium text-xs fill-gray-600"
        >
          Partition Tolerance
        </text>
        <!-- Property level indicator -->
        <circle
          cx="325" cy="250"
          r="8"
          :fill="getPropertyLevelColor(database.partitionTolerance)"
          class="property-level-indicator"
        />
      </g>

      <!-- CAP Type Label -->
      <text
        x="200" y="320"
        text-anchor="middle"
        class="cap-type-label font-bold text-lg"
        :fill="getCapTypeColor()"
      >
        {{ database.capType }} System
      </text>

      <!-- Legend -->
      <g class="legend" transform="translate(50, 320)">
        <circle cx="0" cy="0" r="4" fill="#10b981" />
        <text x="10" y="4" class="text-xs fill-gray-600">High</text>
        
        <circle cx="50" cy="0" r="4" fill="#f59e0b" />
        <text x="60" y="4" class="text-xs fill-gray-600">Medium</text>
        
        <circle cx="100" cy="0" r="4" fill="#ef4444" />
        <text x="110" y="4" class="text-xs fill-gray-600">Low</text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

const supportedProperties = computed(() => {
  switch (props.database.capType) {
    case 'CA':
      return ['consistency', 'availability']
    case 'CP':
      return ['consistency', 'partition']
    case 'AP':
      return ['availability', 'partition']
    default:
      return []
  }
})

const getVertexRadius = (property: string) => {
  return supportedProperties.value.includes(property) ? 20 : 15
}

const getVertexColor = (property: string) => {
  const colors = {
    consistency: '#10b981',
    availability: '#f59e0b',
    partition: '#ef4444'
  }
  
  if (supportedProperties.value.includes(property)) {
    return colors[property as keyof typeof colors]
  }
  
  return '#d1d5db'
}

const getVertexClass = (property: string) => {
  const classes = ['vertex']
  
  if (supportedProperties.value.includes(property)) {
    classes.push('supported', 'shadow-lg')
  } else {
    classes.push('compromised', 'opacity-50')
  }
  
  return classes.join(' ')
}

const getLineColor = (prop1: string, prop2: string) => {
  const bothSupported = supportedProperties.value.includes(prop1) && supportedProperties.value.includes(prop2)
  
  return bothSupported ? '#3b82f6' : '#d1d5db'
}

const getPropertyLevelColor = (level: string) => {
  switch (level) {
    case 'high':
    case 'strong':
      return '#10b981'
    case 'medium':
    case 'configurable':
      return '#f59e0b'
    case 'low':
    case 'eventual':
      return '#ef4444'
    default:
      return '#d1d5db'
  }
}

const getCapTypeColor = () => {
  const colors = {
    'CA': '#3b82f6',
    'CP': '#10b981',
    'AP': '#f59e0b'
  }
  
  return colors[props.database.capType]
}
</script>

<style scoped>
.database-cap-triangle {
  max-width: 100%;
  height: auto;
}

.vertex {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.vertex.supported {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.vertex.compromised {
  opacity: 0.4;
}

.triangle-line {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.emphasized-line {
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3));
  animation: pulse-line 2s ease-in-out infinite;
}

.database-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  animation: float 3s ease-in-out infinite;
}

.property-level-indicator {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

@keyframes pulse-line {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>