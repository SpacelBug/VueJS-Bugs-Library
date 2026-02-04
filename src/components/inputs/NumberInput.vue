<template>
  <input
      ref="input"
      :value="modelValue"
      @keydown="onKeyDown"
      @change="onChange"
      @focusin="(event) => { $emit('focusin'); $emit('update:modelValue', Number(event.target.value)) }"
      @focusout="(event) => { $emit('focusout'); $emit('update:modelValue', Number(event.target.value)) }"
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
    async onKeyDown() {
      const excludedKeyCodes = ['Backspace', 'Enter', 'Delete', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']

      if (!excludedKeyCodes.includes(event.key)) {
        event.preventDefault()

        const cursorPos = event.target.selectionStart

        let firstPart = event.target.value.slice(0, cursorPos)
        let secondPart = event.target.value.slice(cursorPos)

        let result = firstPart + event.key + secondPart

        if (/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(result)) {
          event.target.value = result
          this.onInput()
          event.target.setSelectionRange(cursorPos + 1, cursorPos + 1)
        }
      } else if (event.key === 'Enter') {
        await this.$emit('update:modelValue', Number(event.target.value))
      }
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