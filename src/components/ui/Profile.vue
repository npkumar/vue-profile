<template>
  <div class="profile">
    <img :src="gravatarURL">
  </div>
</template>

<script>
export default {
  data: () => ({
    gravatarURL: 'https://www.gravatar.com/avatar/default?f=y&s=200'
  }),
  mounted () {
    this.$root.$on('newGravatarURL', data => {
      this.gravatarURL = data
    })
  }
}
</script>

<style scoped>
@import '../../css/ui/Profile.css';
</style>
