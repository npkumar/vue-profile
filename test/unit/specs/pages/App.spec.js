import { mount } from '@vue/test-utils'
import App from '@/components/pages/App'
import Profile from '@/components/ui/Profile'
import Password from '@/components/ui/Password'
import FullName from '@/components/ui/FullName'
import Email from '@/components/ui/Email'

describe('App.vue', () => {
  it('should render all components', () => {
    const wrapper = mount(App)
    expect(wrapper.contains(Profile)).toBe(true)
    expect(wrapper.contains(Password)).toBe(true)
    expect(wrapper.contains(FullName)).toBe(true)
    expect(wrapper.contains(Email)).toBe(true)
  })
})
