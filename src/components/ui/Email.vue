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
    <ErrorMessage v-if="!isValidEmail" msg="Please provide a valid email"/>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import md5 from 'md5'
import EditButton from './common/EditButton'
import ErrorMessage from './common/ErrorMessage'

export default {
  components: {
    EditButton,
    ErrorMessage
  },
  data: () => ({
    email: 'batman@gmail.com',
    editing: false // Keeps track if we are editing
  }),
  methods: {
    /**
     * Triggered when `isEditing` event is emitted by the child EditButton.
     * @param {boolean} value True if we are currently editing.
     */
    handleEditButtonClick (value) {
      this.editing = value
    },

    /**
     * Generate Gravatar avatar URL based on provided email.
     * @returns {string} Gravatar avatar URL.
     */
    getGravatarURL () {
      const GRAVATAR_AVATAR_API = 'https://www.gravatar.com/avatar/'
      const HASH = md5(this.email.toLowerCase())
      return `${GRAVATAR_AVATAR_API}${HASH}?s=200`
    },

    /**
     * Emits an event newGravatarURL with a valid Gravatar avatar URL.
     */
    emitGravatarURL () {
      this.$root.$emit('newGravatarURL', this.getGravatarURL())
    }
  },
  computed: {
    /**
     * Check if provided email is valid.
     * @returns {boolean} True if email is valid.
     */
    isValidEmail () {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const validEmail = emailRegex.test(String(this.email).toLowerCase())
      if (validEmail) {
        // Debounce delays invoking func until after wait milliseconds have elapsed
        // since the last time the debounced function was invoked. This allows the user
        // some time in typing the email before we invoke Gravatar endpoint.
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
