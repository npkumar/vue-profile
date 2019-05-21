<template>
  <div class="password">
    <div class="password__input">
      <div class="password__input__form">
        <div v-if="!editing">*********</div>
        <div v-else class="password__input__form__items">
          <input :type="type" v-model.trim="password">
          <button v-if="editing" @click.prevent="handleUnmask">
            <i :class="[unmask ? maskClass : unmaskClass]"></i>
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
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn'
import EditButton from './common/EditButton'

export default {
  components: {
    EditButton
  },
  data: () => ({
    password: 'BatmanIsAwesome',
    editing: false,
    type: 'password',
    unmask: false,
    unmaskClass: 'far fa-eye-slash',
    maskClass: 'fas fa-eye',
    passwordMeterRedClass: 'password__meter__item--red',
    passwordMeterGreenClass: 'password__meter__item--green'
  }),
  methods: {
    // Triggered when `isEditing` event is emitted by the child EditButton.
    handleEditButtonClick (value) {
      this.editing = value
    },
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
    score () {
      return zxcvbn(this.password).score + 1
    },
    isValidPassword () {
      return this.score > 1
    }
  }
}
</script>

<style scoped>
.password {
  display: flex;
  flex-direction: column;
}

.password__input {
  display: flex;
  justify-content: space-between;
}

.password__input__form {
  flex-basis: 100%;
  margin-right: 0.1em;
}

.password__input__form__items {
  display: flex;
}

.password__meter {
  display: flex;
  margin-top: 0.5em;
}

.password__meter__item--red {
  background: tomato;
  width: 60px;
  height: 5px;
  margin-right: 0.2em;
}

.password__meter__item--green {
  background: green;
  width: 60px;
  height: 5px;
  margin-right: 0.2em;
}
</style>
