<template>
  <div class="flex items-center space-x-2">
    <div class="flex space-x-1">
      <div
        v-for="i in 3"
        :key="i"
        class="w-3 h-3 rounded-full"
        :class="getLevelClass(i)"
      ></div>
    </div>
    <span 
      class="text-sm font-medium capitalize"
      :class="getLevelTextClass()"
    >
      {{ translatedLevel }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  level: 'high' | 'medium' | 'low' | 'strong' | 'eventual' | 'configurable'
  property: 'consistency' | 'availability' | 'partition'
}

const props = defineProps<Props>()

const normalizedLevel = computed(() => {
  // Normalize different level types to high/medium/low
  switch (props.level) {
    case 'strong':
      return 'high'
    case 'eventual':
      return 'low'
    case 'configurable':
      return 'medium'
    default:
      return props.level
  }
})

const translatedLevel = computed(() => {
  // Get the translated level text
  const levelKey = `databases.levels.${normalizedLevel.value}`
  return t(levelKey)
})

const getLevelClass = (position: number) => {
  const levelValue = {
    'high': 3,
    'medium': 2,
    'low': 1
  }[normalizedLevel.value]
  
  const propertyColors = {
    consistency: {
      active: 'bg-green-500',
      inactive: 'bg-gray-200'
    },
    availability: {
      active: 'bg-yellow-500',
      inactive: 'bg-gray-200'
    },
    partition: {
      active: 'bg-red-500',
      inactive: 'bg-gray-200'
    }
  }
  
  const colors = propertyColors[props.property]
  
  return position <= levelValue ? colors.active : colors.inactive
}

const getLevelTextClass = () => {
  const levelColors = {
    'high': 'text-green-700',
    'medium': 'text-yellow-700',
    'low': 'text-red-700'
  }
  
  return levelColors[normalizedLevel.value]
}
</script>