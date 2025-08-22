import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import App from '../App.vue'
import { createTestI18n } from './test-utils'

describe('App', () => {
  it('renders the main app structure', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [createTestI18n()],
        stubs: {
          AppHeader: true,
          AppFooter: true,
          RouterView: true
        }
      }
    })
    
    expect(wrapper.find('#app').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AppFooter' }).exists()).toBe(true)
  })

  it('has the correct CSS classes on app element', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [createTestI18n()],
        stubs: {
          AppHeader: true,
          AppFooter: true,
          RouterView: true
        }
      }
    })
    
    const app = wrapper.find('#app')
    expect(app.classes()).toContain('min-h-screen')
    expect(app.classes()).toContain('bg-gradient-to-br')
  })
})
