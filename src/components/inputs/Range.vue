<template>
  <div class="range-box">
    <div class="track-box">
      <div
          class="caret"
          @mousedown="isMouseDown = true"
          draggable="false"
      />
      <div
          class="track"
          ref="track"
      />
    </div>
    <div
        v-if="showValue"
        class="value"
    >
      {{ modelValue }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Range',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Number, default: 5 },

    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
    step: { type: Number, default: 1 },

    showValue: { type: Boolean, default: true }
  },
  data() {
    return {
      isMouseDown: false,
      caretPos: 0,
    }
  },
  mounted() {
    this.caretPos = this.modelValue * (this.$refs.track.getBoundingClientRect().width / (this.max - this.min))
  },
  watch: {
    isMouseDown(newValue, oldValue) {
      if (oldValue) {
        document.body.removeEventListener('mousemove', this.moveCaret)
        document.body.removeEventListener('mouseup', this.mouseUp)
      } else {
        document.body.addEventListener('mousemove', this.moveCaret)
        document.body.addEventListener('mouseup', this.mouseUp)
      }
    }
  },
  methods: {
    moveCaret(event) {
      const pos = event.clientX - this.$refs.track.getBoundingClientRect().x
      if ((pos > 0) && (pos < this.$refs.track.getBoundingClientRect().width)) {
        this.caretPos = pos
        this.$emit('update:modelValue', this.valueByPixel())
      }
    },
    mouseUp() {
      this.isMouseDown = false
    },
    valueByPixel() {
      let value = this.caretPos / (this.$refs.track.getBoundingClientRect().width / (this.max - this.min))

      if (value % this.step > 0) {
        value = Math.round(value)
      }

      this.caretPos = value * (this.$refs.track.getBoundingClientRect().width / (this.max - this.min))

      return value + this.min
    },
  }
}
</script>

<style scoped>
.range-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  position: relative;
  width: 100%;
  height: 20px;
  gap: 16px;
}

.track-box {
  position: relative;
  width: 100%;
  height: 2px;
}

.track {
  height: 2px;
  width: 100%;
  background-color: var(--panels-color);
}

.caret {
  cursor: pointer;
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: var(--accent-color);
  top: -10px;
  left: v-bind(-10 + caretPos + 'px');
}

.caret:hover {
  opacity: 0.7;
}
</style>