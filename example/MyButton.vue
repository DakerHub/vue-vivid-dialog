<template>
  <button
    :class="['vivid-dialog-btn my-btn', primary && 'is-primary']"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span v-if="loading" key="loading">...</span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" >
.my-btn {
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #c3c3c3;
}

.my-btn.is-primary {
  color: #fff;
  background-image: linear-gradient(90deg, #ff5722, #ffc107);
}
</style>
