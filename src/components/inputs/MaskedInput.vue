<template>
  <div class="masked-input">
    <input
        type="text"
        ref="input"
        :value="maskedValue"
        @keydown="onKeyDown"
        @input.prevent="onInput"
        @change.prevent="onChange"
        @focusin="isFocused = true"
        @focusout="isFocused = false"
    >
    <div :class="['placeholder', { 'top': maskedValue.length > 0 && isFocused, 'hidden': maskedValue.length > 0 && !isFocused }]">
      {{ mask }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MaskedInput",
  emits: ["update:modelValue"],
  props: {
    modelValue: { type: String, default: '' },
    mask: { type: String, required: true },
    maskChar: { type: String, default: '9' },
  },
  data() {
    return {
      maskedValue: '',
      isFocused: false,
    }
  },
  methods: {
    onKeyDown(event) {
      if (['Backspace', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return
      }

      event.preventDefault()

      const currentValueLength = this.maskedValue.length

      if (/^[0-9]$/.test(event.key)) {

        if (currentValueLength < this.mask.length) {
          console.log(currentValueLength)
          if ((this.mask[currentValueLength] !== this.maskChar) && (currentValueLength >= 0)) {
            this.maskedValue += this.mask[currentValueLength]
          } else {
            this.maskedValue += event.key
          }
        }
      }
    },
    onInput() {
      if (this.mask[event.target.value.length - 1] !== this.maskChar) {
        this.maskedValue = event.target.value.slice(0, -1)
      } else {
        this.maskedValue = event.target.value
      }
    },
  },
}
</script>

<style scoped>
.masked-input {
  position: relative;
  height: fit-content;
}

input {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: var(--panels-color);
  color: var(--font-color);
}

.placeholder {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  user-select: none;
  opacity: 0.3;
  transition: all 0.2s ease;
}

.hidden {
  display: none;
}

.top {
  top: -10px;
  font-size: 12px;
}
</style>