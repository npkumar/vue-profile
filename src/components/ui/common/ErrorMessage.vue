<template>
  <div class="error">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  props: {
    // Displays the error message.
    msg: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
@import '../../../css/ui/common/ErrorMessage.css';
</style>
