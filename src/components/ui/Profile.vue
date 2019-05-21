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
img {
  border-radius: 100%;
}

.profile {
  text-align: center;
  margin-bottom: 1em;
}
</style>
