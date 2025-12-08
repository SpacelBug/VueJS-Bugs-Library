<template>
  <textarea
      :placeholder="placeholder"
      :value="modelValue"
      @focusin="isUnwrapped = true"
      @focusout="isUnwrapped = false"
      @change="onChange"
  />
</template>

<script>
export default {
  name: "AreaInput",
  emits: ['update:modelValue'],
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
      return this.isUnwrapped ? this.unwrappedHeight + 'px' : '22px'
    }
  },
  methods: {
    onChange() {
      this.$emit('update:modelValue', event.target.value)
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