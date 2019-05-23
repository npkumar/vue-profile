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
    // Disables button if true.
    disableButton: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      editing: false,
      notEditingClass: 'far fa-edit',
      editingClass: 'fas fa-check'
    }
  },
  methods: {
    /**
     * Emits an event `isEditing` to parent component
     * notifying if current status is editing or not.
     */
    handleButtonClick () {
      this.editing = !this.editing

      // Emit to parent.
      this.$emit('isEditing', this.editing)
    }
  }
}
</script>

<style scoped>
@import '../../../css/ui/common/EditButton.css';
</style>
