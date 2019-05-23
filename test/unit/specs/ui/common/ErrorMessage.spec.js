import { mount } from '@vue/test-utils'
import ErrorMessage from '@/components/ui/common/ErrorMessage'

describe('ErrorMessage.vue', () => {
  it('should have error class', () => {
    const wrapper = mount(ErrorMessage)
    expect(wrapper.contains('.error')).toBe(true)
  })

  it('should set error message correctly', () => {
    const wrapper = mount(ErrorMessage, {
      propsData: {
        msg: 'batman'
      }
    })
    expect(wrapper.text()).toBe('batman')
  })
})
