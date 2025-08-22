<template>
  <div class="flex justify-center">
    <svg
      class="cap-triangle-svg"
      viewBox="0 0 500 400"
      width="500"
      height="400"
    >
      <!-- Triangle Lines -->
      <line
        x1="250" y1="70"
        x2="140" y2="270"
        :class="lineClass('consistency', 'availability')"
        stroke-width="3"
        class="triangle-line transition-all duration-500"
      />
      <line
        x1="140" y1="270"
        x2="360" y2="270"
        :class="lineClass('availability', 'partition')"
        stroke-width="3"
        class="triangle-line transition-all duration-500"
      />
      <line
        x1="360" y1="270"
        x2="250" y2="70"
        :class="lineClass('partition', 'consistency')"
        stroke-width="3"
        class="triangle-line transition-all duration-500"
      />

      <!-- Connection Lines (when 2 properties selected) -->
      <template v-if="selectedProperties.length === 2">
        <!-- Center point -->
        <circle
          cx="250" cy="200"
          r="4"
          fill="#6b7280"
          class="center-point animate-pulse"
        />
        
        <!-- Lines to selected vertices -->
        <line
          v-for="property in selectedProperties"
          :key="`connection-${property}`"
          x1="250" y1="200"
          :x2="getVertexPosition(property).x"
          :y2="getVertexPosition(property).y"
          stroke="#3b82f6"
          stroke-width="2"
          stroke-dasharray="5,5"
          class="connection-line animate-pulse"
        />
      </template>

      <!-- Vertices -->
      <!-- Consistency (Top) -->
      <g
        class="vertex-group cursor-pointer"
        @click="$emit('property-click', 'consistency')"
      >
        <circle
          cx="250" cy="70"
          :r="getVertexRadius('consistency')"
          :fill="getVertexColor('consistency')"
          :class="getVertexClass('consistency')"
          class="vertex transition-all duration-300"
        />
        <text
          x="250" y="77"
          text-anchor="middle"
          class="vertex-label font-bold text-sm fill-white pointer-events-none"
        >
          {{ vertexLetters.consistency }}
        </text>
        <text
          x="250" y="35"
          text-anchor="middle"
          class="vertex-title font-medium text-xs fill-gray-700 pointer-events-none"
        >
          {{ $t('cap.consistency.title') }}
        </text>
      </g>

      <!-- Availability (Bottom Left) -->
      <g
        class="vertex-group cursor-pointer"
        @click="$emit('property-click', 'availability')"
      >
        <circle
          cx="140" cy="270"
          :r="getVertexRadius('availability')"
          :fill="getVertexColor('availability')"
          :class="getVertexClass('availability')"
          class="vertex transition-all duration-300"
        />
        <text
          x="140" y="277"
          text-anchor="middle"
          class="vertex-label font-bold text-sm fill-white pointer-events-none"
        >
          {{ vertexLetters.availability }}
        </text>
        <text
          x="140" y="310"
          text-anchor="middle"
          class="vertex-title font-medium text-xs fill-gray-700 pointer-events-none"
        >
          {{ $t('cap.availability.title') }}
        </text>
      </g>

      <!-- Partition Tolerance (Bottom Right) -->
      <g
        class="vertex-group cursor-pointer"
        @click="$emit('property-click', 'partition')"
      >
        <circle
          cx="360" cy="270"
          :r="getVertexRadius('partition')"
          :fill="getVertexColor('partition')"
          :class="getVertexClass('partition')"
          class="vertex transition-all duration-300"
        />
        <text
          x="360" y="277"
          text-anchor="middle"
          class="vertex-label font-bold text-sm fill-white pointer-events-none"
        >
          {{ vertexLetters.partition }}
        </text>
        <text
          x="360" y="310"
          text-anchor="middle"
          class="vertex-title font-medium text-xs fill-gray-700 pointer-events-none"
        >
          {{ $t('cap.partition.title') }}
        </text>
      </g>

      <!-- Trade-off indicator -->
      <template v-if="selectedProperties.length === 2">
        <g class="trade-off-indicator">
          <!-- Compromised vertex with X -->
          <g v-if="compromisedProperty">
            <circle
              :cx="getVertexPosition(compromisedProperty).x"
              :cy="getVertexPosition(compromisedProperty).y"
              r="30"
              fill="rgba(239, 68, 68, 0.1)"
              stroke="#ef4444"
              stroke-width="2"
              stroke-dasharray="3,3"
              class="compromised-indicator animate-pulse"
            />
            <line
              :x1="getVertexPosition(compromisedProperty).x - 12"
              :y1="getVertexPosition(compromisedProperty).y - 12"
              :x2="getVertexPosition(compromisedProperty).x + 12"
              :y2="getVertexPosition(compromisedProperty).y + 12"
              stroke="#ef4444"
              stroke-width="3"
              class="compromise-x"
            />
            <line
              :x1="getVertexPosition(compromisedProperty).x + 12"
              :y1="getVertexPosition(compromisedProperty).y - 12"
              :x2="getVertexPosition(compromisedProperty).x - 12"
              :y2="getVertexPosition(compromisedProperty).y + 12"
              stroke="#ef4444"
              stroke-width="3"
              class="compromise-x"
            />
          </g>
        </g>
      </template>

      <!-- Interactive hints -->
      <text
        v-if="selectedProperties.length === 0"
        x="250" y="360"
        text-anchor="middle"
        class="hint-text font-medium text-sm fill-gray-500"
      >
        {{ $t('cap.clickVertices') }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

type CapProperty = 'consistency' | 'availability' | 'partition'

interface Props {
  selectedProperties: CapProperty[]
}

const props = defineProps<Props>()
const { locale } = useI18n()

defineEmits<{
  'property-click': [property: CapProperty]
}>()

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

const getVertexPosition = (property: CapProperty) => {
  const positions = {
    consistency: { x: 250, y: 70 },
    availability: { x: 140, y: 270 },
    partition: { x: 360, y: 270 }
  }
  return positions[property]
}

const getVertexRadius = (property: CapProperty) => {
  if (props.selectedProperties.includes(property)) {
    return 25
  }
  return 20
}

const getVertexColor = (property: CapProperty) => {
  const colors = {
    consistency: '#10b981',
    availability: '#f59e0b',
    partition: '#ef4444'
  }
  
  if (props.selectedProperties.includes(property)) {
    return colors[property]
  }
  
  // Always show vertices with their colors, just slightly muted when not selected
  if (props.selectedProperties.length === 2 && !props.selectedProperties.includes(property)) {
    return '#9ca3af'  // Gray but still visible
  }
  
  return colors[property]
}

const getVertexClass = (property: CapProperty) => {
  const classes = ['vertex']
  
  if (props.selectedProperties.includes(property)) {
    classes.push('selected', 'shadow-lg')
  } else if (props.selectedProperties.length === 2) {
    classes.push('compromised')
  } else {
    classes.push('hover:shadow-md')
  }
  
  return classes.join(' ')
}

const lineClass = (prop1: CapProperty, prop2: CapProperty) => {
  const bothSelected = props.selectedProperties.includes(prop1) && props.selectedProperties.includes(prop2)
  
  if (bothSelected) {
    return 'stroke-blue-500'
  } else if (props.selectedProperties.length === 2) {
    return 'stroke-gray-300'
  } else {
    return 'stroke-gray-400'
  }
}

const compromisedProperty = computed(() => {
  if (props.selectedProperties.length !== 2) return null
  
  const allProperties: CapProperty[] = ['consistency', 'availability', 'partition']
  return allProperties.find(prop => !props.selectedProperties.includes(prop))
})

// Animate vertices when selection changes
watch(() => props.selectedProperties, (newSelection, oldSelection) => {
  // Animate newly selected vertices
  newSelection.forEach(property => {
    if (!oldSelection?.includes(property)) {
      const position = getVertexPosition(property)
      const vertex = document.querySelector(`.cap-triangle-svg circle[cx="${position.x}"][cy="${position.y}"]`)
      
      if (vertex) {
        gsap.fromTo(vertex, 
          {
            scale: 1,
            transformOrigin: `${position.x}px ${position.y}px`
          },
          {
            scale: 1.1,
            duration: 0.3,
            ease: 'back.out(1.7)',
            yoyo: true,
            repeat: 1
          }
        )
      }
    }
  })
  
  // Animate the connection lines and trade-off indicators
  if (newSelection.length === 2) {
    // Animate connection lines
    const connectionLines = document.querySelectorAll('.cap-triangle-svg .connection-line')
    connectionLines.forEach(line => {
      gsap.fromTo(line, 
        { opacity: 0, strokeDashoffset: 20 },
        { opacity: 1, strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }
      )
    })
    
    // Animate compromised indicator
    const compromisedIndicator = document.querySelector('.cap-triangle-svg .compromised-indicator')
    if (compromisedIndicator) {
      gsap.fromTo(compromisedIndicator,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      )
    }
    
    // Animate X marks
    const xMarks = document.querySelectorAll('.cap-triangle-svg .compromise-x')
    xMarks.forEach((mark, index) => {
      gsap.fromTo(mark,
        { strokeDasharray: '0,20', opacity: 0 },
        { strokeDasharray: '20,0', opacity: 1, duration: 0.3, delay: index * 0.1, ease: 'power2.out' }
      )
    })
  }
}, { immediate: false })
</script>

<style scoped>
.cap-triangle-svg {
  max-width: 100%;
  height: auto;
}

.vertex {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  cursor: pointer;
  transform-origin: center center;
}

.vertex.selected {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.vertex.compromised {
  opacity: 0.6;
}

/* Remove problematic hover animation that makes vertices 'run away' */
.vertex-group {
  cursor: pointer;
}

.vertex-group:hover .vertex {
  transform: scale(1.03);
  transition: transform 0.15s ease-in-out;
}

/* Ensure vertex stays in place during hover */
.vertex-group .vertex {
  transform-origin: center center;
  will-change: transform;
}

/* Prevent text interference with animations */
.vertex-label,
.vertex-title {
  pointer-events: none;
  user-select: none;
  transform-origin: center center;
}

.vertex-label {
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.vertex-title {
  font-weight: 500;
}

.triangle-line {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.connection-line {
  animation: dash 2s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 20;
  }
}

.compromised-indicator {
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.compromise-x {
  animation: draw-x 0.5s ease-out;
}

@keyframes draw-x {
  from {
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
  }
  to {
    stroke-dasharray: 20;
    stroke-dashoffset: 0;
  }
}
</style>