import { mount } from '@vue/test-utils'
import Profile from '@/components/ui/Profile'

describe('Profile.vue', () => {
  it('should render default gravatarURL', () => {
    const wrapper = mount(Profile)
    expect(wrapper.contains('img')).toBe(true)
    expect(wrapper.html()).toContain(
      '<img src="https://www.gravatar.com/avatar/default?f=y&amp;s=200">'
    )
  })

  it('should render set gravatarURL', () => {
    const wrapper = mount(Profile)
    wrapper.vm.$root.$emit('newGravatarURL', 'spiderman')
    wrapper.setData({gravatarURL: 'batman'})
    expect(wrapper.contains('img')).toBe(true)
    expect(wrapper.html()).toContain('<img src="batman">')
  })

  it('should set gravatarURL on receiving newGravatarURL', () => {
    const wrapper = mount(Profile)
    wrapper.vm.$root.$emit('newGravatarURL', 'spiderman')
    expect(wrapper.contains('img')).toBe(true)
    expect(wrapper.html()).toContain('<img src="spiderman">')
  })
})
