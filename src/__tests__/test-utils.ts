import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { vi } from 'vitest'

vi.mock('gsap', () => ({
  gsap: {
    from: vi.fn(),
    to: vi.fn(),
    set: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      delay: vi.fn().mockReturnThis()
    }))
  }
}))

const testMessages = {
  en: {
    nav: {
      title: 'CAP Theorem Explorer',
      home: 'Home',
      cap: 'CAP Theory',
      simulation: 'Simulation',
      databases: 'Databases',
      conclusion: 'Conclusion'
    },
    cap: {
      consistency: {
        title: 'Consistency'
      },
      availability: {
        title: 'Availability'
      },
      partition: {
        title: 'Partition Tolerance'
      },
      clickVertices: 'Click on vertices to select CAP properties'
    }
  }
}

export const createTestI18n = () => {
  return createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: testMessages
  })
}

export const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
      { path: '/cap', name: 'cap', component: { template: '<div>CAP</div>' } },
      { path: '/simulation', name: 'simulation', component: { template: '<div>Simulation</div>' } },
      { path: '/databases', name: 'databases', component: { template: '<div>Databases</div>' } },
      { path: '/conclusion', name: 'conclusion', component: { template: '<div>Conclusion</div>' } }
    ]
  })
}
