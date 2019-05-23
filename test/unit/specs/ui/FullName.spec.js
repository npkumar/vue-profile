import { mount } from '@vue/test-utils'
import FullName from '@/components/ui/FullName'
import EditButton from '@/components/ui/common/EditButton'
import ErrorMessage from '@/components/ui/common/ErrorMessage'

describe('FullName.vue', () => {
  it('should hide input fields', () => {
    const wrapper = mount(FullName)
    expect(wrapper.contains('input')).toBe(false)
    expect(wrapper.contains(EditButton)).toBe(true)
  })

  it('should get the correct fullName', () => {
    const wrapper = mount(FullName)
    wrapper.setData({ firstName: 'A', lastName: 'B' })
    expect(wrapper.vm.fullName).toBe('A B')
  })

  it('should verify if fullName is valid', () => {
    const wrapper = mount(FullName)
    wrapper.setData({ firstName: 'A', lastName: 'B' })
    expect(wrapper.vm.isValidFullName).toBe(false)
    expect(wrapper.contains(ErrorMessage)).toBe(true)
  })

  it('should show input fields on clicking edit button', () => {
    const wrapper = mount(FullName)
    wrapper.find('.fa-edit').trigger('click')
    expect(wrapper.findAll('input').length).toBe(2)
    expect(wrapper.contains(EditButton)).toBe(true)
    expect(wrapper.contains('.fa-check')).toBe(true)
  })

  it('should hide input fields on clicking edit button twice', () => {
    const wrapper = mount(FullName)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.find('.fa-check').trigger('click')
    expect(wrapper.contains('input')).toBe(false)
    expect(wrapper.contains(EditButton)).toBe(true)
  })

  it('should not disable EditButton if firstName is valid', () => {
    const wrapper = mount(FullName)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ firstName: 'Valid' })
    expect(wrapper.find('button').attributes().disabled).toBe(undefined)
    expect(wrapper.contains(ErrorMessage)).toBe(false)
  })

  it('should not disable EditButton if lastName is valid', () => {
    const wrapper = mount(FullName)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ lastName: 'Valid' })
    expect(wrapper.find('button').attributes().disabled).toBe(undefined)
    expect(wrapper.contains(ErrorMessage)).toBe(false)
  })

  it('should disable EditButton if firstName is not valid', () => {
    const wrapper = mount(FullName)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ firstName: '' })
    expect(wrapper.find('button').attributes().disabled).toBe('disabled')
    expect(wrapper.contains(ErrorMessage)).toBe(true)
  })

  it('should disable EditButton if lastName is not valid', () => {
    const wrapper = mount(FullName)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ lastName: '' })
    expect(wrapper.find('button').attributes().disabled).toBe('disabled')
    expect(wrapper.contains(ErrorMessage)).toBe(true)
  })
})
