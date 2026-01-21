<template>
  <div class="time-line-box">
    <span class="start-label">
      <slot>
        {{ starttime.toLocaleString() }}
      </slot>
    </span>

    <div
        :class="['time-line', { 'disabled-transition': isMouseDown }]"
        ref="timeline"
        @click="onTimeLineClick"
        @mousedown="isMouseDown = true"
    >
      <div :class="['walked-path', { 'disabled-transition': isMouseDown }]" />
      <div
          :class="['caret', {'disabled-transition': isMouseDown}]"
          draggable="false"
      />
      <div :class="['loaded-path', { 'disabled-transition': isMouseDown }]" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'TimeLine',
  emits: ['update:modelValue', 'update:cacheWindow'],
  props: {
    /**
     * model value of current pos 
     */
    modelValue: { type: Date },
    /**
     * model value of cached window 
     */
    cacheWindow: { type: Array },
    /**
     * In milliseconds
     */
    sampleRate: { type: Number, default: 1000 * 60 },

    starttime: { type: Date, required: true },
    endtime: { type: Date, required: true },
    /**
     * Frames per sample rate
     */
    framerate: { type: Number, default: 24 },
    /**
     * Count of steps in cached window
     */
    cachedSteps: { type: Number, default: 100 },
  },
  data() {
    return {
      timelineRect: null,

      isMouseDown: false,
      caretPos: 0,

      currentStep: 0,

      isPlaying: false,
      playInterval: null,
    }
  },
  mounted() {
    this.timelineRect = this.$refs.timeline.getBoundingClientRect()

    const resizeObserver = new ResizeObserver((entries) => {
      this.timelineRect = entries[0].target.getBoundingClientRect()
    })
    resizeObserver.observe(this.$refs.timeline)

    document.body.addEventListener('keydown', this.onKeyDown)
    document.body.addEventListener('mouseup', () => {
      this.isMouseDown = false
    })
    document.body.addEventListener('mousemove', this.onTimeLineMouseMove)

    if (!this.modelValue) {
      this.$emit('update:modelValue', )
    } else {
      this.currentStep = this.getStepsByDatetime(this.modelValue)
    }
  },
  unmounted() {
    document.body.removeEventListener('keydown', this.onKeyDown)
    document.body.removeEventListener('mouseup', () => { })
    document.body.removeEventListener('mousemove', this.onTimeLineMouseMove)
  },
  computed: {
    stepsCount() {
      let start = new Date(this.starttime)
      let end = new Date(this.endtime)

      let steps = 0

      while (start.getTime() < end.getTime()) {
        steps++
        start.setMilliseconds(start.getMilliseconds() + this.sampleRate)
      }

      return steps
    },
    pixelsInStep() {
      if (this.timelineRect) {
        return this.timelineRect.width / this.stepsCount
      } else {
        return 0
      }
    },
    loadedPathWidth() {
      return this.pixelsInStep * this.cachedSteps
    }
  },
  watch: {
    currentStep(newValue, oldValue) {
      this.setCaretPosByStep(newValue)
      this.$emit('update:modelValue', this.getCurrentDatetime())
      this.$emit('update:cacheWindow', this.getCachedWindow())
    }
  },
  methods: {
    onKeyDown() {
      if (event.code === 'ArrowRight') {
        this.currentStep++
      } else if (event.code === 'ArrowLeft') {
        this.currentStep--
      } else if (event.code === 'Space') {
        event.preventDefault()

        if (this.isPlaying) {
          this.stopPlay()
        } else {
          this.startPlay()
        }
      }
    },
    onTimeLineClick() {
      this.setStepByPixel(event.pageX - this.timelineRect.x)
    },
    onTimeLineMouseMove() {
      if (this.isMouseDown) {
        this.setStepByPixel(event.pageX - this.timelineRect.x)
      }
    },
    setCaretPosByStep(step) {
      this.caretPos = step * this.pixelsInStep
    },
    setStepByPixel(pixel) {
      if (
        (Math.floor(pixel / this.pixelsInStep) <= this.stepsCount) && 
        (Math.floor(pixel / this.pixelsInStep) > 0)
      ) {
        this.currentStep = Math.floor(pixel / this.pixelsInStep)
      }
    },
    getCurrentDatetime() {
      let datetime = new Date(this.starttime)
      datetime.setMilliseconds(datetime.getMilliseconds() + (this.currentStep * this.sampleRate))
      return datetime
    },
    getStepsByDatetime(datetime) {
      let steps = 0
      while (datetime.getTime() > this.starttime) {
        datetime.setMilliseconds(datetime.getMilliseconds() - this.sampleRate)
        steps++
      }

      return steps
    },
    getCachedWindow() {
      let window = []

      for (let step = this.currentStep; step < this.currentStep + this.cachedSteps; step++) {
        let datetime = new Date(this.starttime)
        datetime.setMilliseconds(datetime.getMilliseconds() + step * this.sampleRate)
        window.push(datetime)
      }

      return window
    },
    startPlay() {
      this.isPlaying = true

      this.playInterval = setInterval(() => {
        this.currentStep++
      }, 1000 / this.framerate)
    },
    stopPlay() {
      this.isPlaying = false

      clearInterval(this.playInterval)
    }
  }
}
</script>

<style>
.time-line-box {
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  gap: 8px;
  width: 100%;
}

.time-line {
  position: relative;
  height: 30px;
  width: 100%;
  background-color: var(--panels-color);
  overflow: hidden;
}

.caret {
  position: absolute;
  z-index: 2;
  width: 5px;
  height: 100%;
  background-color: var(--accent-color);
  left: v-bind(caretPos + 'px');
  margin-left: -2px;
  transition: all 0.2s ease;
}

.walked-path {
  position: absolute;
  z-index: 1;
  left: 0;
  height: 100%;
  width: v-bind(caretPos + 'px');
  background-color: var(--accent-color);
  opacity: 0.2;
  transition: all 0.2s ease;
}

.loaded-path {
  position: absolute;
  z-index: 1;
  left: v-bind(caretPos + 'px');
  background-color: var(--font-color);
  height: 100%;
  width: v-bind(loadedPathWidth + 'px');
  opacity: 0.1;
  transition: all 0.2s ease;
}

.disabled-transition {
  transition: none;
}
</style>