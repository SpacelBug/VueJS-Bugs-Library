<template>
  <input
      ref="input"
      :value="modelValue"
      @keydown="onKeyDown"
      @change="onChange"
      @input="onInput"
  >
</template>

<script>
export default {
  name: "NumberInput",
  emits: ["update:modelValue", "change"],
  props: {
    modelValue: { type: Number, required: true },
    fitContent: { type: Boolean, default: false },
  },
  computed: {
    fieldSizing() {
      return this.fitContent ? 'content' : 'unset'
    }
  },
  methods: {
    onKeyDown() {
      const reg = /[0-9,.]/
      const excludedKeyCodes = ['Backspace', 'Enter', 'Delete', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']
      if (
        !reg.test(event.key) && 
        !excludedKeyCodes.includes(event.key) ||
        (event.key === '.' && event.target.value.includes('.'))
      ) {
        event.preventDefault()
      }
    },
    onChange() {
      this.$emit('update:modelValue', Number(event.target.value))
    },
    onInput() {
      this.$emit('change', event)
    }
  }
}
</script>

<style scoped>
input {
  field-sizing: v-bind(fieldSizing);
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  height: fit-content;
  background-color: var(--panels-color);
  color: var(--font-color);
}
</style>