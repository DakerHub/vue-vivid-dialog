<template>
  <button
    :class="['vivid-dialog-btn vivid-btn--default', primary && 'is-primary']"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span v-if="loading" key="loading">加载中...</span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
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
.vivid-btn--default {
  border: none;
}
.vivid-btn--default.is-primary {
  background-color: royalblue;
  color: #fff;
}
</style>
