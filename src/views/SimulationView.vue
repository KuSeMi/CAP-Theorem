<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('simulation.title') }}</h1>
        <p class="text-xl text-gray-600 mb-6">{{ $t('simulation.subtitle') }}</p>
      </div>

      <!-- Step-by-Step Instructions -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 mb-8">
        <div class="flex items-center mb-4">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-lg font-bold text-blue-800">{{ $t('simulation.howToUse') }}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div class="flex items-start space-x-3">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p class="font-medium text-blue-800">{{ $t('simulation.step1Title') }}</p>
              <p class="text-blue-600">{{ $t('simulation.step1Desc') }}</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p class="font-medium text-blue-800">{{ $t('simulation.step2Title') }}</p>
              <p class="text-blue-600">{{ $t('simulation.step2Desc') }}</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p class="font-medium text-blue-800">{{ $t('simulation.step3Title') }}</p>
              <p class="text-blue-600">{{ $t('simulation.step3Desc') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="mb-6">
          <h3 class="text-lg font-bold text-gray-900 mb-3">{{ $t('simulation.chooseSystem') }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              @click="selectedSystem = 'cp'"
              :class="selectedSystem === 'cp' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="p-4 rounded-lg border-2 transition-all duration-200 text-left"
              :style="selectedSystem === 'cp' ? 'border-color: #10b981' : 'border-color: #e5e7eb'"
            >
              <div class="font-bold text-sm mb-1">CP System</div>
              <div class="text-xs opacity-80">{{ $t('simulation.cpDescription') }}</div>
              <div class="text-xs mt-2 font-medium">{{ $t('simulation.examples') }}: MongoDB, HBase</div>
            </button>
            
            <button
              @click="selectedSystem = 'ap'"
              :class="selectedSystem === 'ap' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="p-4 rounded-lg border-2 transition-all duration-200 text-left"
              :style="selectedSystem === 'ap' ? 'border-color: #f59e0b' : 'border-color: #e5e7eb'"
            >
              <div class="font-bold text-sm mb-1">AP System</div>
              <div class="text-xs opacity-80">{{ $t('simulation.apDescription') }}</div>
              <div class="text-xs mt-2 font-medium">{{ $t('simulation.examples') }}: Cassandra, DynamoDB</div>
            </button>
            
            <button
              @click="selectedSystem = 'ca'"
              :class="selectedSystem === 'ca' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="p-4 rounded-lg border-2 transition-all duration-200 text-left"
              :style="selectedSystem === 'ca' ? 'border-color: #ef4444' : 'border-color: #e5e7eb'"
            >
              <div class="font-bold text-sm mb-1">CA System</div>
              <div class="text-xs opacity-80">{{ $t('simulation.caDescription') }}</div>
              <div class="text-xs mt-2 font-medium">{{ $t('simulation.examples') }}: MySQL, PostgreSQL</div>
            </button>
          </div>
        </div>
        
        <div class="border-t pt-6">
          <h3 class="text-lg font-bold text-gray-900 mb-3">{{ $t('simulation.simulateFailure') }}</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <button
              @click="createPartition"
              :disabled="isPartitioned"
              class="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{{ $t('simulation.createPartition') }}</span>
            </button>
            
            <button
              @click="healPartition"
              :disabled="!isPartitioned"
              class="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ $t('simulation.healPartition') }}</span>
            </button>
            
            <button
              @click="resetSimulation"
              class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{{ $t('simulation.reset') }}</span>
            </button>
          </div>
          
          <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-start space-x-2">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div class="text-sm text-yellow-800">
                <p class="font-medium mb-1">{{ $t('simulation.partitionExplanation') }}</p>
                <p>{{ $t('simulation.partitionDetail') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Simulation Area -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <!-- Current Status Display -->
        <div class="mb-6 p-4 rounded-lg" :class="{
          'bg-green-50 border border-green-200': !isPartitioned,
          'bg-red-50 border border-red-200': isPartitioned
        }">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="w-3 h-3 rounded-full" :class="{
                'bg-green-500': !isPartitioned,
                'bg-red-500': isPartitioned
              }"></div>
              <span class="font-medium" :class="{
                'text-green-800': !isPartitioned,
                'text-red-800': isPartitioned
              }">
                {{ isPartitioned ? $t('simulation.partitioned') : $t('simulation.connected') }}
              </span>
            </div>
            <div class="text-sm font-medium" :class="{
              'text-green-600': !isPartitioned,
              'text-red-600': isPartitioned
            }">
              {{ systemName }}
            </div>
          </div>
          
          <!-- What's Happening Explanation -->
          <div class="text-sm" :class="{
            'text-green-700': !isPartitioned,
            'text-red-700': isPartitioned
          }">
            <div v-if="!isPartitioned" class="flex items-start space-x-2">
              <svg class="w-4 h-4 mt-0.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ $t('simulation.normalOperation') }}</span>
            </div>
            <div v-else class="flex items-start space-x-2">
              <svg class="w-4 h-4 mt-0.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{{ getCurrentBehaviorText }}</span>
            </div>
          </div>
        </div>
        
        <!-- Interactive Instructions -->
        <div class="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div class="flex items-center space-x-2 text-blue-800 text-sm mb-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
            <span class="font-bold">{{ $t('simulation.dragInstruction') }}</span>
          </div>
          <div class="text-blue-700 text-sm space-y-1">
            <p class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{{ $t('simulation.dragTip1') }}</span>
            </p>
            <p class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{{ $t('simulation.dragTip2') }}</span>
            </p>
            <p class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{{ $t('simulation.dragTip3') }}</span>
            </p>
          </div>
        </div>
        
        <div class="relative">
          <!-- Network Partition Indicator -->
          <div
            v-if="isPartitioned"
            class="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <div class="h-full w-1 bg-red-500 opacity-50 animate-pulse"></div>
            <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
              Network Partition Active
            </div>
          </div>

          <!-- Simulation Canvas -->
          <div
            ref="simulationCanvas"
            class="simulation-canvas relative min-h-[500px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
            @drop="handleDrop"
            @dragover.prevent
          >
            <!-- Network Nodes -->
            <NetworkNode
              v-for="node in nodes"
              :key="node.id"
              :node="node"
              :is-partitioned="isPartitioned"
              :selected-system="selectedSystem"
              @update-position="updateNodePosition"
            />

            <!-- Connection Lines -->
            <svg
              class="absolute inset-0 w-full h-full pointer-events-none"
              :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
            >
              <ConnectionLine
                v-for="connection in connections"
                :key="`${connection.from}-${connection.to}`"
                :connection="connection"
                :nodes="nodes"
                :is-broken="isConnectionBroken(connection)"
              />
            </svg>
          </div>
        </div>

        <!-- Node Status -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="node in nodes"
            :key="`status-${node.id}`"
            class="p-4 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-4 h-4 rounded-full"
                :class="getNodeStatusColor(node)"
              ></div>
              <div>
                <p class="font-medium text-gray-900">
                  {{ $t('simulation.nodeStatus', { id: node.id, status: getNodeStatusText(node) }) }}
                </p>
                <p class="text-sm text-gray-600">
                  Data: v{{ node.dataVersion }} | 
                  Requests: {{ node.requestCount }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Behavior Explanation -->
      <div class="mt-8 bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center mb-6">
          <div class="w-3 h-3 rounded-full mr-3" :class="{
            'bg-green-500': selectedSystem === 'cp',
            'bg-yellow-500': selectedSystem === 'ap', 
            'bg-red-500': selectedSystem === 'ca'
          }"></div>
          <h3 class="text-2xl font-bold text-gray-900">{{ $t('simulation.currentSystem') }}: {{ systemName }}</h3>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-4">
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 class="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {{ $t('simulation.behaviorDuringPartition') }}
              </h4>
              <p class="text-blue-700">{{ systemBehavior }}</p>
            </div>
            
            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 class="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {{ $t('simulation.tradeOffs') }}
              </h4>
              <ul class="space-y-2 text-yellow-700">
                <li
                  v-for="tradeoff in systemTradeoffs"
                  :key="tradeoff"
                  class="flex items-start space-x-2"
                >
                  <span class="text-yellow-500 mt-1">•</span>
                  <span>{{ tradeoff }}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {{ $t('simulation.whatYouLearn') }}
              </h4>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start space-x-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span>{{ $t('simulation.learnPoint1') }}</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span>{{ $t('simulation.learnPoint2') }}</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span>{{ $t('simulation.learnPoint3') }}</span>
                </li>
              </ul>
            </div>
            
            <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h4 class="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {{ $t('simulation.quickTips') }}
              </h4>
              <ul class="space-y-1 text-indigo-700 text-sm">
                <li>• {{ $t('simulation.tip1') }}</li>
                <li>• {{ $t('simulation.tip2') }}</li>
                <li>• {{ $t('simulation.tip3') }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
import NetworkNode from '../components/NetworkNode.vue'
import ConnectionLine from '../components/ConnectionLine.vue'

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

const { t } = useI18n()

const simulationCanvas = ref<HTMLElement>()
const canvasWidth = ref(800)
const canvasHeight = ref(500)
const isPartitioned = ref(false)
const selectedSystem = ref<'cp' | 'ap' | 'ca'>('cp')

const nodes = ref<Node[]>([
  { id: 1, x: 150, y: 150, isActive: true, dataVersion: 1, requestCount: 0, partition: 'A' },
  { id: 2, x: 300, y: 200, isActive: true, dataVersion: 1, requestCount: 0, partition: 'A' },
  { id: 3, x: 450, y: 150, isActive: true, dataVersion: 1, requestCount: 0, partition: 'B' },
  { id: 4, x: 600, y: 200, isActive: true, dataVersion: 1, requestCount: 0, partition: 'B' },
  { id: 5, x: 375, y: 350, isActive: true, dataVersion: 1, requestCount: 0, partition: 'A' }
])

const connections = ref<Connection[]>([
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 5 },
  { from: 1, to: 5 },
  { from: 4, to: 5 }
])

const systemName = computed(() => {
  const names = {
    cp: 'CP System (Consistency + Partition Tolerance)',
    ap: 'AP System (Availability + Partition Tolerance)',
    ca: 'CA System (Consistency + Availability)'
  }
  return names[selectedSystem.value]
})

const systemBehavior = computed(() => {
  const behaviors = {
    cp: t('simulation.cpSystemBehavior'),
    ap: t('simulation.apSystemBehavior'),
    ca: t('simulation.caSystemBehavior')
  }
  return behaviors[selectedSystem.value]
})

const systemTradeoffs = computed(() => {
  const tradeoffs = {
    cp: [
      t('simulation.cpTradeoff1'),
      t('simulation.cpTradeoff2'),
      t('simulation.cpTradeoff3')
    ],
    ap: [
      t('simulation.apTradeoff1'),
      t('simulation.apTradeoff2'),
      t('simulation.apTradeoff3')
    ],
    ca: [
      t('simulation.caTradeoff1'),
      t('simulation.caTradeoff2'),
      t('simulation.caTradeoff3')
    ]
  }
  return tradeoffs[selectedSystem.value]
})

const getCurrentBehaviorText = computed(() => {
  const behaviors = {
    cp: t('simulation.cpPartitionBehavior'),
    ap: t('simulation.apPartitionBehavior'),
    ca: t('simulation.caPartitionBehavior')
  }
  return behaviors[selectedSystem.value]
})

const createPartition = () => {
  isPartitioned.value = true
  updateNodeStates()
  
  // Animate partition creation
  gsap.to('.network-partition', {
    duration: 0.5,
    opacity: 1,
    ease: 'power2.out'
  })
}

const healPartition = () => {
  isPartitioned.value = false
  updateNodeStates()
  
  // Animate partition healing
  gsap.to('.network-partition', {
    duration: 0.5,
    opacity: 0,
    ease: 'power2.out'
  })
}

const resetSimulation = () => {
  // Reset partition state
  isPartitioned.value = false
  
  // Reset all nodes to original positions and state
  nodes.value = [
    { id: 1, x: 150, y: 150, isActive: true, dataVersion: 1, requestCount: 0, partition: 'A' },
    { id: 2, x: 300, y: 200, isActive: true, dataVersion: 1, requestCount: 0, partition: 'A' },
    { id: 3, x: 450, y: 150, isActive: true, dataVersion: 1, requestCount: 0, partition: 'B' },
    { id: 4, x: 600, y: 200, isActive: true, dataVersion: 1, requestCount: 0, partition: 'B' },
    { id: 5, x: 375, y: 350, isActive: true, dataVersion: 1, requestCount: 0, partition: 'A' }
  ]
  
  updateNodeStates()
  
  // Animate reset
  gsap.from('.simulation-canvas', {
    duration: 0.5,
    scale: 0.95,
    ease: 'power2.out'
  })
}

const updateNodeStates = () => {
  nodes.value.forEach(node => {
    switch (selectedSystem.value) {
      case 'cp':
        if (isPartitioned.value) {
          // In CP system, minority partition becomes unavailable
          const partitionANodes = nodes.value.filter(n => n.partition === 'A').length
          const partitionBNodes = nodes.value.filter(n => n.partition === 'B').length
          
          if (partitionANodes > partitionBNodes) {
            node.isActive = node.partition === 'A'
          } else {
            node.isActive = node.partition === 'B'
          }
        } else {
          node.isActive = true
        }
        break
        
      case 'ap':
        // In AP system, all nodes remain active
        node.isActive = true
        if (isPartitioned.value) {
          // Simulate eventual consistency with version drift
          setTimeout(() => {
            if (node.partition === 'B') {
              node.dataVersion = Math.max(1, node.dataVersion - 1)
            }
          }, 1000)
        }
        break
        
      case 'ca':
        if (isPartitioned.value) {
          // In CA system, all nodes become unavailable during partition
          node.isActive = false
        } else {
          node.isActive = true
        }
        break
    }
  })
}

const updateNodePosition = (nodeId: number, x: number, y: number) => {
  const node = nodes.value.find(n => n.id === nodeId)
  if (node) {
    node.x = x
    node.y = y
    
    // Determine partition based on position
    node.partition = x < canvasWidth.value / 2 ? 'A' : 'B'
    
    // Update node states when positions change
    nextTick(() => {
      updateNodeStates()
    })
  }
}

const isConnectionBroken = (connection: Connection) => {
  if (!isPartitioned.value) return false
  
  const fromNode = nodes.value.find(n => n.id === connection.from)
  const toNode = nodes.value.find(n => n.id === connection.to)
  
  if (!fromNode || !toNode) return false
  
  // Connection is broken if nodes are in different partitions
  return fromNode.partition !== toNode.partition
}

const getNodeStatusColor = (node: Node) => {
  if (!node.isActive) return 'bg-gray-400'
  
  switch (selectedSystem.value) {
    case 'cp':
      return node.isActive ? 'bg-green-500' : 'bg-red-500'
    case 'ap':
      if (isPartitioned.value && node.dataVersion < Math.max(...nodes.value.map(n => n.dataVersion))) {
        return 'bg-yellow-500'
      }
      return 'bg-green-500'
    case 'ca':
      return isPartitioned.value ? 'bg-red-500' : 'bg-green-500'
    default:
      return 'bg-gray-400'
  }
}

const getNodeStatusText = (node: Node) => {
  if (!node.isActive) return t('simulation.nodeUnavailable')
  
  switch (selectedSystem.value) {
    case 'cp':
      return t('simulation.nodeConsistent')
    case 'ap':
      if (isPartitioned.value && node.dataVersion < Math.max(...nodes.value.map(n => n.dataVersion))) {
        return t('simulation.nodeStale')
      }
      return t('simulation.nodeCurrent')
    case 'ca':
      return isPartitioned.value ? t('simulation.nodeOffline') : t('simulation.nodeAvailable')
    default:
      return t('simulation.nodeUnknown')
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  // Handle drop logic if needed
}

// Simulate requests and data updates
const simulateActivity = () => {
  setInterval(() => {
    nodes.value.forEach(node => {
      if (node.isActive) {
        node.requestCount++
        
        // Simulate data version updates
        if (Math.random() > 0.7) {
          if (selectedSystem.value === 'ap' && isPartitioned.value) {
            // In AP system during partition, some nodes may lag
            if (node.partition === 'A') {
              node.dataVersion++
            }
          } else if (selectedSystem.value !== 'ap' || !isPartitioned.value) {
            node.dataVersion++
          }
        }
      }
    })
  }, 2000)
}

onMounted(() => {
  // Update canvas dimensions
  if (simulationCanvas.value) {
    canvasWidth.value = simulationCanvas.value.offsetWidth
    canvasHeight.value = simulationCanvas.value.offsetHeight
  }
  
  // Start activity simulation
  simulateActivity()
  
  // Initial animation
  gsap.from('.simulation-canvas', {
    duration: 1,
    opacity: 0,
    scale: 0.95,
    ease: 'power2.out'
  })
})

// Watch for system changes and provide visual feedback
watch(() => selectedSystem.value, (newSystem, oldSystem) => {
  if (oldSystem) {
    // First update node states
    updateNodeStates()
    
    // Create dramatic visual feedback for system change
    gsap.timeline()
      .to('.simulation-canvas', {
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to('.simulation-canvas', {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out'
      })
      .to('.simulation-canvas', {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      })
    
    // Flash border to indicate system change
    gsap.timeline()
      .to('.simulation-canvas', {
        borderColor: newSystem === 'cp' ? '#10b981' : newSystem === 'ap' ? '#f59e0b' : '#ef4444',
        duration: 0.5,
        ease: 'power2.out'
      })
      .to('.simulation-canvas', {
        borderColor: '#d1d5db',
        duration: 1,
        ease: 'power2.out',
        delay: 0.5
      })
  }
})

// Watch for partition changes
watch(() => isPartitioned.value, () => {
  nextTick(() => {
    updateNodeStates()
  })
})
</script>

<style scoped>
.simulation-canvas {
  position: relative;
}
</style>