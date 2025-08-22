import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CapTriangle from '../components/CapTriangle.vue'
import { createTestI18n } from './test-utils'

describe('CapTriangle', () => {
  const defaultProps = {
    selectedProperties: [] as Array<'consistency' | 'availability' | 'partition'>
  }

  const mountOptions = {
    props: defaultProps,
    global: {
      plugins: [createTestI18n()]
    }
  }

  it('renders the SVG triangle', () => {
    const wrapper = mount(CapTriangle, mountOptions)

    expect(wrapper.find('.cap-triangle-svg').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders all three vertices', () => {
    const wrapper = mount(CapTriangle, mountOptions)

    const vertices = wrapper.findAll('.vertex-group')
    expect(vertices).toHaveLength(3)
  })

  it('renders triangle lines', () => {
    const wrapper = mount(CapTriangle, mountOptions)

    const lines = wrapper.findAll('.triangle-line')
    expect(lines).toHaveLength(3)
  })

  it('shows hint text when no properties are selected', () => {
    const wrapper = mount(CapTriangle, mountOptions)

    const hintText = wrapper.find('.hint-text')
    expect(hintText.exists()).toBe(true)
  })

  it('emits property-click event when vertex is clicked', async () => {
    const wrapper = mount(CapTriangle, mountOptions)

    const firstVertex = wrapper.find('.vertex-group')
    await firstVertex.trigger('click')

    expect(wrapper.emitted('property-click')).toBeTruthy()
    expect(wrapper.emitted('property-click')![0]).toEqual(['consistency'])
  })

  it('shows selected properties correctly', () => {
    const wrapper = mount(CapTriangle, {
      props: {
        selectedProperties: ['consistency', 'availability'] as Array<'consistency' | 'availability' | 'partition'>
      },
      global: {
        plugins: [createTestI18n()]
      }
    })

    const hintText = wrapper.find('.hint-text')
    expect(hintText.exists()).toBe(false)

    const connectionLines = wrapper.findAll('.connection-line')
    expect(connectionLines.length).toBeGreaterThan(0)
  })

  it('displays correct vertex letters based on locale', () => {
    const wrapper = mount(CapTriangle, mountOptions)

    const vertexLabels = wrapper.findAll('.vertex-label')
    expect(vertexLabels[0].text()).toBe('C') 
    expect(vertexLabels[1].text()).toBe('A') 
    expect(vertexLabels[2].text()).toBe('P') 
  })
})
