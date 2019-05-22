<template>
  <div class="error">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style scoped>
@import '../../../css/ui/common/ErrorMessage.css';
</style>
