import { mount } from '@vue/test-utils'
import EditButton from '@/components/ui/common/EditButton'

describe('EditButton.vue', () => {
  it('should show edit option on button', () => {
    const wrapper = mount(EditButton)
    expect(wrapper.contains('.fa-edit')).toBe(true)
  })

  it('should show check option and emit on button click', () => {
    const wrapper = mount(EditButton)
    wrapper.find('.fa-edit').trigger('click')
    expect(wrapper.contains('.fa-check')).toBe(true)
    expect(wrapper.emitted().isEditing[0][0]).toBe(true)
  })

  it('should show edit option and emit on button click', () => {
    const wrapper = mount(EditButton)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.find('.fa-check').trigger('click')
    expect(wrapper.contains('.fa-edit')).toBe(true)
    expect(wrapper.emitted().isEditing[0][0]).toBe(true)
    expect(wrapper.emitted().isEditing[1][0]).toBe(false)
  })
})
