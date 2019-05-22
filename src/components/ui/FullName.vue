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
    editing: false
  }),
  methods: {
    // Triggered when `isEditing` event is emitted by the child EditButton.
    handleEditButtonClick (value) {
      this.editing = value
    }
  },
  computed: {
    fullName () {
      return `${this.firstName} ${this.lastName}`
    },
    isValidFullName () {
      return this.firstName.length > 2 && this.lastName.length > 2
    }
  }
}
</script>

<style scoped>
@import '../../css/ui/FullName.css';
</style>
