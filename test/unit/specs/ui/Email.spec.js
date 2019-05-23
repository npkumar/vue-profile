import { mount } from '@vue/test-utils'
import Email from '@/components/ui/Email'
import Profile from '@/components/ui/Profile'
import EditButton from '@/components/ui/common/EditButton'
import ErrorMessage from '@/components/ui/common/ErrorMessage'

describe('Email.vue', () => {
  it('should hide input field', () => {
    const wrapper = mount(Email)
    expect(wrapper.contains('input')).toBe(false)
    expect(wrapper.contains(EditButton)).toBe(true)
  })

  it('should verify if email is valid to accept', () => {
    const wrapper = mount(Email)
    wrapper.setData({ email: 'batman@mandrake' })
    expect(wrapper.vm.isValidEmail).toBe(false)
    wrapper.setData({ email: 'batman@mandrake.com' })
    expect(wrapper.vm.isValidEmail).toBe(true)
    expect(wrapper.contains(ErrorMessage)).toBe(false)
  })

  it('should show input field on clicking edit button', () => {
    const wrapper = mount(Email)
    wrapper.find('.fa-edit').trigger('click')
    expect(wrapper.findAll('input').length).toBe(1)
    expect(wrapper.contains(EditButton)).toBe(true)
    expect(wrapper.contains('.fa-check')).toBe(true)
  })

  it('should hide input field on clicking edit button twice', () => {
    const wrapper = mount(Email)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.find('.fa-check').trigger('click')
    expect(wrapper.contains('input')).toBe(false)
    expect(wrapper.contains(EditButton)).toBe(true)
  })

  it('should not disable EditButton if email is valid', () => {
    const wrapper = mount(Email)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ email: 'batman@mandrake.com' })
    expect(wrapper.find('button').attributes().disabled).toBe(undefined)
    expect(wrapper.find('[disabled]').exists()).toBe(false)
    expect(wrapper.contains(ErrorMessage)).toBe(false)
  })

  it('should disable EditButton if email is not valid', () => {
    const wrapper = mount(Email)
    wrapper.find('.fa-edit').trigger('click')
    wrapper.setData({ email: 'batman@mandrake' })
    expect(wrapper.find('[disabled]').exists()).toBe(true)
    expect(wrapper.contains(ErrorMessage)).toBe(true)
  })

  it('should update Profile component if email is valid', () => {
    const profileWrapper = mount(Profile)
    const emailWrapper = mount(Email)
    emailWrapper.find('.fa-edit').trigger('click')
    emailWrapper.setData({ email: 'batman@mandrake.com' })
    profileWrapper.vm.$root.$emit('newGravatarURL', emailWrapper.vm.getGravatarURL())
    expect(profileWrapper.vm.gravatarURL).toBe(emailWrapper.vm.getGravatarURL())
  })
})
