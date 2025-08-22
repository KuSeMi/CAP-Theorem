<template>
  <line
    :x1="fromNode?.x || 0"
    :y1="fromNode?.y || 0"
    :x2="toNode?.x || 0"
    :y2="toNode?.y || 0"
    :class="lineClass"
    :stroke="lineColor"
    :stroke-width="lineWidth"
    :stroke-dasharray="isBroken ? '8,4' : 'none'"
    class="connection-line transition-all duration-500"
  >
    <!-- Animate broken connections -->
    <animate
      v-if="isBroken"
      attributeName="stroke-dashoffset"
      values="0;12"
      dur="1s"
      repeatCount="indefinite"
    />
    
    <!-- Data flow animation for active connections -->
    <animate
      v-if="!isBroken && showDataFlow"
      attributeName="stroke-opacity"
      values="0.3;1;0.3"
      dur="2s"
      repeatCount="indefinite"
    />
  </line>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

interface Node {
  id: number
  x: number
  y: number
  isActive: boolean
  dataVersion: number
  requestCount: number
  partition: 'A' | 'B'
}

interface Connection {
  from: number
  to: number
}

interface Props {
  connection: Connection
  nodes: Node[]
  isBroken: boolean
}

const props = defineProps<Props>()

const showDataFlow = ref(false)

const fromNode = computed(() => 
  props.nodes.find(node => node.id === props.connection.from)
)

const toNode = computed(() => 
  props.nodes.find(node => node.id === props.connection.to)
)

const lineClass = computed(() => {
  const classes = ['connection-line']
  
  if (props.isBroken) {
    classes.push('broken')
  } else {
    classes.push('active')
  }
  
  return classes.join(' ')
})

const lineColor = computed(() => {
  if (props.isBroken) {
    return '#ef4444' // Red for broken connections
  }
  
  // Check if both nodes are active
  const bothActive = fromNode.value?.isActive && toNode.value?.isActive
  
  if (!bothActive) {
    return '#9ca3af' // Gray for inactive connections
  }
  
  return '#10b981' // Green for active connections
})

const lineWidth = computed(() => {
  if (props.isBroken) {
    return 2
  }
  
  const bothActive = fromNode.value?.isActive && toNode.value?.isActive
  return bothActive ? 3 : 1
})

// Simulate data flow
const simulateDataFlow = () => {
  if (!props.isBroken && fromNode.value?.isActive && toNode.value?.isActive) {
    showDataFlow.value = true
    
    setTimeout(() => {
      showDataFlow.value = false
    }, 2000)
  }
}

onMounted(() => {
  // Randomly trigger data flow animations
  const flowInterval = setInterval(() => {
    if (Math.random() > 0.8) {
      simulateDataFlow()
    }
  }, 3000 + Math.random() * 2000)
  
  return () => {
    clearInterval(flowInterval)
  }
})
</script>

<style scoped>
.connection-line {
  transition: all 0.5s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.connection-line.broken {
  opacity: 0.6;
  filter: drop-shadow(0 1px 2px rgba(239, 68, 68, 0.3));
}

.connection-line.active {
  filter: drop-shadow(0 1px 2px rgba(16, 185, 129, 0.3));
}
</style>