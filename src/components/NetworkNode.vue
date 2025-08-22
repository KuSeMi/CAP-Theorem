<template>
  <div
    :style="{ left: `${node.x}px`, top: `${node.y}px` }"
    :data-node-id="node.id"
    class="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move select-none"
    :class="nodeClass"
    @mousedown="startDrag"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Node Circle -->
    <div
      class="relative w-16 h-16 rounded-full border-4 transition-all duration-300 flex items-center justify-center"
      :class="nodeStyle"
    >
      <!-- Node ID -->
      <span class="text-white font-bold text-lg">{{ node.id }}</span>
      
      <!-- Status Indicator -->
      <div
        class="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
        :class="statusIndicatorClass"
      ></div>
      
      <!-- Partition Indicator -->
      <div
        v-if="isPartitioned"
        class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium rounded bg-gray-800 text-white"
      >
        {{ node.partition }}
      </div>
    </div>
    
    <!-- Node Info Tooltip -->
    <div
      v-if="showTooltip"
      class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none"
    >
      <div>Status: {{ nodeStatusText }}</div>
      <div>Data: v{{ node.dataVersion }}</div>
      <div>Requests: {{ node.requestCount }}</div>
      
      <!-- Tooltip Arrow -->
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
    
    <!-- Activity Pulses -->
    <div
      v-if="node.isActive && isProcessingRequest"
      class="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

interface Node {
  id: number
  x: number
  y: number
  isActive: boolean
  dataVersion: number
  requestCount: number
  partition: 'A' | 'B'
}

interface Props {
  node: Node
  isPartitioned: boolean
  selectedSystem: 'cp' | 'ap' | 'ca'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update-position': [nodeId: number, x: number, y: number]
}>()

const isDragging = ref(false)
const showTooltip = ref(false)
const isProcessingRequest = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const nodeClass = computed(() => {
  const classes = ['network-node']
  
  if (isDragging.value) {
    classes.push('dragging', 'z-50')
  }
  
  if (!props.node.isActive) {
    classes.push('inactive')
  }
  
  return classes.join(' ')
})

const nodeStyle = computed(() => {
  const baseClasses = 'database-node'
  
  if (!props.node.isActive) {
    return `${baseClasses} border-gray-400 bg-gray-200 opacity-50`
  }
  
  switch (props.selectedSystem) {
    case 'cp':
      if (props.isPartitioned && !props.node.isActive) {
        return `${baseClasses} border-red-600 bg-red-200 shadow-lg shadow-red-200`
      }
      return `${baseClasses} border-green-600 bg-green-200 shadow-lg shadow-green-200`
      
    case 'ap':
      if (props.isPartitioned) {
        // Show different colors for stale vs current data
        const isStale = props.node.dataVersion < 2 // Simplified staleness check
        return isStale 
          ? `${baseClasses} border-yellow-600 bg-yellow-200 shadow-lg shadow-yellow-200 animate-pulse`
          : `${baseClasses} border-orange-600 bg-orange-200 shadow-lg shadow-orange-200`
      }
      return `${baseClasses} border-orange-600 bg-orange-200 shadow-lg shadow-orange-200`
      
    case 'ca':
      if (props.isPartitioned) {
        return `${baseClasses} border-red-600 bg-red-300 shadow-lg shadow-red-300 animate-pulse`
      }
      return `${baseClasses} border-blue-600 bg-blue-200 shadow-lg shadow-blue-200`
      
    default:
      return `${baseClasses} border-gray-500 bg-gray-100`
  }
})

const statusIndicatorClass = computed(() => {
  if (!props.node.isActive) {
    return 'bg-red-500'
  }
  
  switch (props.selectedSystem) {
    case 'cp':
      return 'bg-green-500'
    case 'ap':
      // Check for data staleness in AP system
      return props.isPartitioned && props.node.dataVersion < 2
        ? 'bg-yellow-500'
        : 'bg-green-500'
    case 'ca':
      return props.isPartitioned ? 'bg-red-500' : 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
})

const nodeStatusText = computed(() => {
  if (!props.node.isActive) {
    return 'Offline'
  }
  
  switch (props.selectedSystem) {
    case 'cp':
      return 'Consistent'
    case 'ap':
      return props.isPartitioned && props.node.dataVersion < 2 ? 'Stale' : 'Current'
    case 'ca':
      return props.isPartitioned ? 'Unavailable' : 'Active'
    default:
      return 'Unknown'
  }
})

const startDrag = (event: MouseEvent) => {
  event.preventDefault()
  isDragging.value = true
  
  // Get the node's current position
  const nodeElement = event.currentTarget as HTMLElement
  const rect = nodeElement.getBoundingClientRect()
  const container = document.querySelector('.simulation-canvas')
  if (!container) return
  
  // Calculate offset from mouse to node center
  dragOffset.value = {
    x: event.clientX - (rect.left + rect.width / 2),
    y: event.clientY - (rect.top + rect.height / 2)
  }
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  
  // Hide tooltip during drag
  showTooltip.value = false
  
  // Visual feedback for drag start
  gsap.to(nodeElement, {
    scale: 1.1,
    duration: 0.2,
    ease: 'power2.out'
  })
}

const handleDrag = (event: MouseEvent) => {
  if (!isDragging.value) return
  
  const container = document.querySelector('.simulation-canvas')
  if (!container) return
  
  const containerRect = container.getBoundingClientRect()
  
  // Calculate new position relative to container
  const newX = event.clientX - containerRect.left - dragOffset.value.x
  const newY = event.clientY - containerRect.top - dragOffset.value.y
  
  // Constrain to container bounds (with margin for node size)
  const nodeSize = 32 // Half of node width/height
  const constrainedX = Math.max(nodeSize, Math.min(containerRect.width - nodeSize, newX))
  const constrainedY = Math.max(nodeSize, Math.min(containerRect.height - nodeSize, newY))
  
  emit('update-position', props.node.id, constrainedX, constrainedY)
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  
  // Animate drop with bounce effect
  const nodeElement = document.querySelector(`[data-node-id="${props.node.id}"]`)
  if (nodeElement) {
    gsap.to(nodeElement, {
      scale: 1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    })
  }
}

const simulateActivity = () => {
  if (!props.node.isActive) return
  
  isProcessingRequest.value = true
  
  setTimeout(() => {
    isProcessingRequest.value = false
  }, 500)
}

// Simulate periodic activity
onMounted(() => {
  const activityInterval = setInterval(() => {
    if (Math.random() > 0.7) {
      simulateActivity()
    }
  }, 2000 + Math.random() * 3000)
  
  onUnmounted(() => {
    clearInterval(activityInterval)
  })
})

// Show tooltip on hover
const handleMouseEnter = () => {
  if (!isDragging.value) {
    showTooltip.value = true
  }
}

const handleMouseLeave = () => {
  showTooltip.value = false
}

onMounted(() => {
  const element = document.querySelector(`[data-node-id="${props.node.id}"]`)
  if (element) {
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  const element = document.querySelector(`[data-node-id="${props.node.id}"]`)
  if (element) {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<style scoped>
.network-node {
  transition: transform 0.2s ease, filter 0.3s ease;
  cursor: grab;
}

.network-node:active {
  cursor: grabbing;
}

.network-node:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.network-node.dragging {
  transform: scale(1.1);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
  z-index: 50;
  cursor: grabbing;
}

.network-node.inactive {
  opacity: 0.6;
  filter: grayscale(50%);
  cursor: not-allowed;
}

.database-node {
  transition: all 0.3s ease;
  border-width: 3px;
}

.database-node:hover {
  transform: scale(1.05);
  border-width: 4px;
}

/* Pulse animation for problematic nodes */
@keyframes pulse-red {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
}

@keyframes pulse-yellow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(245, 158, 11, 0);
  }
}

.animate-pulse {
  animation: pulse-red 2s infinite;
}

.animate-pulse.bg-yellow-200 {
  animation: pulse-yellow 2s infinite;
}
</style>