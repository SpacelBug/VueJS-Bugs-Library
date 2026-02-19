<template>
  <div
      class="check-box"
      @click="changeStatus"
  >
    <template v-if="type === 'tri-state'">
      <div
          v-if="modelValue === true"
          class="include"
      />
      <div
          v-if="modelValue === false"
          class="exclude"
      >
        -
      </div>
    </template>
    <template v-else>
      <div
          v-if="modelValue"
          class="checked"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: [Boolean, null], default: null },
    type: {
      type: String, default: 'simple', validator: (value) => {
        return ['simple', 'tri-state'].includes(value)
      }
    }
  },
  methods: {
    changeStatus() {
      if (this.modelValue === true) {
        this.$emit('update:modelValue', false)
      } else if (this.modelValue === false) {
        this.$emit('update:modelValue', this.type === 'tri-state' ? null : true)
      } else {
        this.$emit('update:modelValue', true)
      }
    }
  }
}
</script>

<style scoped>
.check-box {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: solid 1px var(--border-color);
  background-color: var(--panels-color);
  padding: 4px;
}

.check-box:hover {
  opacity: 0.7;
}

.check-box img {
  height: 100%;
  width: 100%;
}

.include {
  mask-image: url('./plus.svg');
  mask-size: contain;
  background-color: var(--accent-color);
  width: 100%;
  height: 100%;
}

.exclude {
  mask-image: url('./minus.svg');
  mask-size: contain;
  background-color: var(--accent-color);
  width: 100%;
  height: 100%;
}

.checked{
  background-color: var(--accent-color);
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
</style>