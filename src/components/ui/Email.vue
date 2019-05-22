<template>
  <div class="email">
    <div class="email__form">
      <div v-if="!editing">{{ email }}</div>
      <div v-else class="email__form__input">
        <input type="text" v-model.trim="email">
      </div>
      <div>
        <EditButton :disableButton="!isValidEmail" v-on:isEditing="handleEditButtonClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import md5 from 'md5'
import EditButton from './common/EditButton'

export default {
  components: {
    EditButton
  },
  data: () => ({
    email: 'batman@gmail.com',
    editing: false
  }),
  methods: {
    // Triggered when `isEditing` event is emitted by the child EditButton.
    handleEditButtonClick (value) {
      this.editing = value
    },
    getGravatarURL () {
      const GRAVATAR_AVATAR_API = 'https://www.gravatar.com/avatar/'
      const HASH = md5(this.email.toLowerCase())
      return `${GRAVATAR_AVATAR_API}${HASH}?s=200`
    },
    emitGravatarURL () {
      this.$root.$emit('newGravatarURL', this.getGravatarURL())
    }
  },
  computed: {
    isValidEmail () {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const validEmail = emailRegex.test(String(this.email).toLowerCase())
      if (validEmail) {
        // Delays invoking func until after wait milliseconds have elapsed
        // since the last time the debounced function was invoked
        debounce(this.emitGravatarURL, 500)()
      }
      return validEmail
    }
  }
}
</script>

<style scoped>
@import '../../css/ui/Email.css';
</style>
