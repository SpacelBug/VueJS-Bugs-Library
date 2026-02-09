<template>
  <div class="range-box">
    <div class="track-box">
      <div class="carets">
        <div
            class="first-caret"
            @mousedown="isMouseDown = true, activeCaret = 'first'"
            draggable="false"
        />
        <div class="track-highlight"/>
        <div
            class="second-caret"
            @mousedown="isMouseDown = true, activeCaret = 'second'"
            draggable="false"
        />
      </div>
      <div
          class="track"
          ref="track"
      />
    </div>
    <div
        v-if="showValue"
        class="value"
    >
      {{ modelValue[0] }} : {{ modelValue[1] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Range',
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: [Number], default: [0, 10] },

    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
    step: { type: Number, default: 1 },

    showValue: { type: Boolean, default: true }
  },
  data() {
    return {
      isMouseDown: false,
      activeCaret: null,

      firstCaretPos: 0,
      secondCaretPos: 0,
    }
  },
  computed: {
    pixelsInStep() {
      let steps = (this.max - this.min) / this.step
      return this.$refs.track.getBoundingClientRect().width / steps
    }
  },
  mounted() {
    this.firstCaretPos = (this.modelValue[0] - this.min) * this.pixelsInStep / this.step
    this.secondCaretPos = (this.modelValue[1] - this.min) * this.pixelsInStep / this.step
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
        if ((this.activeCaret ==='first') && (pos < this.secondCaretPos)) {
          this.firstCaretPos = pos
        } else if ((this.activeCaret === 'second') && (pos > this.firstCaretPos)) {
          this.secondCaretPos = pos
        }
      }
      this.$emit('update:modelValue', [this.valueByPixel(this.firstCaretPos), this.valueByPixel(this.secondCaretPos)])
    },
    mouseUp() {
      this.isMouseDown = false
      this.draggingCaretIndex = null
    },
    valueByPixel(pos) {
      let value = (pos / this.pixelsInStep) * this.step

      if (value % this.step > 0) {
        value = (Math.round(value / this.step) * this.step)
      }

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

.first-caret, .second-caret {
  cursor: pointer;
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: var(--accent-color);
  top: -10px;
  transition: all 0.2s ease;
}

.caret:hover {
  opacity: 0.7;
}

.first-caret {
  left: v-bind(-10 + firstCaretPos + 'px');
}

.second-caret {
  left: v-bind(-10 + secondCaretPos + 'px');
}

.track-highlight {
  pointer-events: none;
  position: absolute;
  height: 2px;
  width: v-bind(secondCaretPos - firstCaretPos + 'px');
  border-radius: 100%;
  background-color: var(--accent-color);
  left: v-bind(-10 + firstCaretPos + 'px');
  transition: all 0.2s ease;
}

</style>