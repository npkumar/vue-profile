<template>
  <div id="app">
    <Profile/>
    <FullName/>
    <Email/>
    <Password/>
  </div>
</template>

<script>
import Email from '../ui/Email'
import FullName from '../ui/FullName'
import Password from '../ui/Password'
import Profile from '../ui/Profile'

export default {
  name: 'App',
  components: {
    Email,
    FullName,
    Password,
    Profile
  }
}
</script>

<style>
@import '../../css/pages/App.css';
</style>
