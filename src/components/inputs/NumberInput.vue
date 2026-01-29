<template>
  <input
      ref="input"
      :value="modelValue"
      @keydown="onKeyDown"
      @change="onChange"
      @input="onInput"
      @focusin="$emit('focusin')"
      @focusout="$emit('focusout')"
  >
</template>

<script>
export default {
  name: "NumberInput",
  emits: ["update:modelValue", "change", "focusin", "focusout"],
  props: {
    modelValue: { type: Number, required: true },
    fitContent: { type: Boolean, default: false },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
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

      if ((this.max !== null) && (this.min !== null)) {
        if (event.target.value > this.max) {
          event.target.value = this.max
        } else if (event.target.value < this.min) {
          event.target.value = this.min
        }
      }
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