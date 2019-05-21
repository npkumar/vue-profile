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
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 1px solid lightcoral;
  padding: 1em;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 300px;
  height: 400px;
  margin: 0 auto;
  margin-top: 40px;
}

button {
  background: lightskyblue;
  border: 0;
  margin: 0;
  padding: 1em;
  border-radius: 1em;
  outline: none;
}

button:disabled {
  background: lightgray;
}

input {
  width: 100%;
  border-radius: 1em;
  font-size: 1em;
  outline: none;
  border: 1px solid lightsalmon;
  padding-left: 0.25em;
  margin-right: 0.25em;
}
</style>
