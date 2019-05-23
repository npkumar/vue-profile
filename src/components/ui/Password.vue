<template>
  <div class="password">
    <div class="password__input">
      <div class="password__input__form">
        <div v-if="!editing">*********</div>
        <div v-else class="password__input__form__items">
          <input :type="type" v-model.trim="password">
          <button v-if="editing" @click.prevent="handleUnmask">
            <i :class="[unmask ? unmaskClass : maskClass]"></i>
          </button>
        </div>
      </div>
      <div>
        <EditButton :disableButton="!isValidPassword" v-on:isEditing="handleEditButtonClick"/>
      </div>
    </div>
    <div v-if="editing" class="password__meter">
      <div
        v-for="i in score"
        :key="i"
        :class="[score === 1 ? passwordMeterRedClass : passwordMeterGreenClass ]"
      ></div>
    </div>
    <ErrorMessage v-if="!isValidPassword" msg="Provide provide a strong password"/>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import EditButton from './common/EditButton'
import ErrorMessage from './common/ErrorMessage'

export default {
  components: {
    EditButton,
    ErrorMessage
  },
  data: () => ({
    password: 'BatmanIsAwesome',
    editing: false, // Keeps track if we are editing
    type: 'password', // Hide password by default
    unmask: false, // Keeps track if we unmask password
    unmaskClass: 'far fa-eye-slash',
    maskClass: 'fas fa-eye',
    passwordMeterRedClass: 'password__meter__item--red',
    passwordMeterGreenClass: 'password__meter__item--green'
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
     * Triggered when mask or unmask button for password form is clicked.
     * Toggles between password and text input types.
     */
    handleUnmask () {
      // Toggle input type
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
      this.unmask = !this.unmask
    }
  },
  computed: {
    /**
     * Password strength score.
     * @returns {number} Strength score in range 1 to 5.
     */
    score () {
      return zxcvbn(this.password).score + 1
    },

    /**
     * Check if provided password is valid.
     * @returns {boolean} True if password strength is > 1
     */
    isValidPassword () {
      return this.score > 1
    }
  }
}
</script>

<style scoped>
@import '../../css/ui/Password.css';
</style>
