<template>
  <div>
    <div class="fullName">
      <div v-if="!editing">{{ fullName }}</div>
      <div v-else class="fullName__input">
        <input placeholder="First Name" type="text" v-model.trim="firstName">
        <input placeholder="Last Name" type="text" v-model.trim="lastName">
      </div>
      <div>
        <EditButton :disableButton="!isValidFullName" v-on:isEditing="handleEditButtonClick"/>
      </div>
    </div>
    <ErrorMessage v-if="!isValidFullName" msg="Provide valid firstname and lastname"/>
  </div>
</template>

<script>
import EditButton from './common/EditButton'
import ErrorMessage from './common/ErrorMessage'

export default {
  components: {
    EditButton,
    ErrorMessage
  },
  data: () => ({
    firstName: 'Bruce',
    lastName: 'Wayne',
    editing: false // Keeps track if we are editing
  }),
  methods: {
    /**
     * Triggered when `isEditing` event is emitted by the child EditButton.
     * @param {boolean} value True if we are currently editing.
     */
    handleEditButtonClick (value) {
      this.editing = value
    }
  },
  computed: {
    /**
     * Get full name based on first and last name.
     * @returns {string} Full name.
     */
    fullName () {
      return `${this.firstName} ${this.lastName}`
    },

    /**
     * Check if provided first name and last name is valid.
     * Currently a naive implementation.
     * @returns {boolean} True, if both first and last name is valid.
     */
    isValidFullName () {
      return this.firstName.length > 2 && this.lastName.length > 2
    }
  }
}
</script>

<style scoped>
@import '../../css/ui/FullName.css';
</style>
