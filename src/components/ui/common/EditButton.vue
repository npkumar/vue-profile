<template>
  <span>
    <button @click.prevent="handleButtonClick" :disabled="disableButton">
      <i :class="[editing ? editingClass : notEditingClass]"></i>
    </button>
  </span>
</template>

<script>
export default {
  props: {
    disableButton: Boolean
  },
  data () {
    return {
      editing: false,
      notEditingClass: 'far fa-edit',
      editingClass: 'fas fa-check'
    }
  },
  methods: {
    handleButtonClick () {
      this.editing = !this.editing

      // Emit to parent.
      this.$emit('isEditing', this.editing)
    }
  }
}
</script>

<style scoped>
</style>
