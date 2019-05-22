import { mount } from '@vue/test-utils'
import Password from '@/components/ui/Password'
import EditButton from '@/components/ui/common/EditButton'

describe('Password.vue', () => {
  it('should hide input field', () => {
    const wrapper = mount(Password)
    expect(wrapper.contains('input')).toBe(false)
    expect(wrapper.contains(EditButton)).toBe(true)
  })

  it('should verify if password is strong enough to accept', () => {
    const wrapper = mount(Password)
    // Dictionary word gives least score.
    wrapper.setData({ password: 'apple' })
    expect(wrapper.vm.isValidPassword).toBe(false)
  })

  it('should show input field on clicking edit button', () => {
    const wrapper = mount(Password)
    wrapper.find('.fa-edit').trigger('click')
    expect(wrapper.findAll('input').length).toBe(1)
    expect(wrapper.contains(EditButton)).toBe(true)
    expect(wrapper.contains('.fa-check')).toBe(true)
  })

  it('should hide input field on clicking edit button twice', () => {
    const wrapper = mount(Password)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.find('.fa-check').trigger('click')
    expect(wrapper.contains('input')).toBe(false)
    expect(wrapper.contains(EditButton)).toBe(true)
  })

  it('should not disable EditButton if password is valid', () => {
    const wrapper = mount(Password)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ password: 'Complicated!@#Password' })
    expect(wrapper.find('button').attributes().disabled).toBe(undefined)
    expect(wrapper.find('[disabled]').exists()).toBe(false)
  })

  it('should disable EditButton if password is not valid', () => {
    const wrapper = mount(Password)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ password: '' })
    expect(wrapper.find('[disabled]').exists()).toBe(true)
  })

  it('should show password if view password button is clicked', () => {
    const wrapper = mount(Password)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.find('.fa-eye').trigger('click')
    expect(wrapper.find('[type="text"]').exists()).toBe(true)
  })

  it('should hide password if hide password button is clicked', () => {
    const wrapper = mount(Password)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.find('.fa-eye').trigger('click')
    wrapper.find('.fa-eye-slash').trigger('click')
    expect(wrapper.find('[type="password"]').exists()).toBe(true)
  })

  it('should show single strength bar for weak password', () => {
    const wrapper = mount(Password)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ password: '' })
    expect(wrapper.findAll('.password__meter__item--red').length).toBe(1)
    expect(wrapper.findAll('.password__meter__item--green').length).toBe(0)
  })

  it('should show five strength bars for super strong password', () => {
    const wrapper = mount(Password)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ password: 'Complica90@21#2$' })
    expect(wrapper.findAll('.password__meter__item--red').length).toBe(0)
    expect(wrapper.findAll('.password__meter__item--green').length).toBe(5)
  })
})
