<template>
  <textarea
      name=""
      :placeholder="placeholder"
      @focusin="isUnwrapped = true"
      @focusout="isUnwrapped = false"
  />
</template>

<script>
export default {
  name: "AreaInput",
  props: {
    placeholder: { type: String, default: "Text area" },
    modelValue: { type: String, required: true },
    unwrappedHeight: { type: Number, default: 300 },
  },
  data() {
    return {
      isUnwrapped: false, 
    }
  },
  computed: {
    height() {
      return this.isUnwrapped ? this.unwrappedHeight +'px' : '22px'
    }
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  resize: none;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: var(--panels-color);
  color: var(--font-color);
  padding: 8px;
  height: v-bind(height);
  transition: all ease 0.3s;
}
</style>