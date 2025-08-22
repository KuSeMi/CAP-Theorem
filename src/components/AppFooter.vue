<template>
  <footer class="bg-gray-900 text-white mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">CAP Theorem Explanation</h3>
          <p class="text-gray-300 text-sm leading-relaxed">
            An interactive educational tool to understand the CAP Theorem and its implications 
            for distributed systems and database design.
          </p>
        </div>

        <!-- Resources Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('conclusion.resources') }}</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="https://en.wikipedia.org/wiki/CAP_theorem"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                CAP Theorem - Wikipedia
              </a>
            </li>
            <li>
              <a
                href="https://www.ibm.com/cloud/learn/cap-theorem"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                IBM - Understanding CAP Theorem
              </a>
            </li>
            <li>
              <a
                href="https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Martin Kleppmann - CAP Analysis
              </a>
            </li>
          </ul>
        </div>

        <!-- Tech Stack -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Built With</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in techStack"
              :key="tech.name"
              class="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded"
            >
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-8 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} CAP Theorem Explanation. Kushnir Serhii educational project.
          </p>
          <div class="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/KuSeMi"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { gsap } from 'gsap'

const currentYear = computed(() => new Date().getFullYear())

const techStack = [
  { name: 'Vue 3' },
  { name: 'TypeScript' },
  { name: 'Tailwind CSS' },
  { name: 'GSAP' },
  { name: 'Vue i18n' },
  { name: 'Vite' }
]

// Animate footer on mount
onMounted(() => {
  gsap.from('footer', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out',
    delay: 0.3
  })
})
</script>