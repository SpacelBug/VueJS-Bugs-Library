<template>
  <div
      class="main-box"
      @focusin="isShowPicker = true"
      @focusout="isShowPicker = false"
      tabindex="0"
  >
    <div class="picked-color">
      <div class="color" />
    </div>
    <div
        v-show="isShowPicker"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
        class="picker"
    >
      <div class="palette-box">
        <canvas
            @mousemove="paletteMove"
            :width="circleSize"
            :height="circleSize"
            ref="rainbow"
        />
        <div
            class="caret"
            v-if="paletteCaretPos.length > 0"
        />
      </div>
      <div class="additional-params">
        <div class="param">
          Brightness
          <div class="param-gradient">
            <canvas
                class="brightness-gradient"
                :width="200"
                height="30"
                ref="brightness"
                @mousemove="brightnessMove"
            />
            <div class="brightness-caret" />
          </div>
        </div>
        <div class="param">
          Saturation
          <div class="param-gradient">
            <canvas
                class="saturation-gradient"
                :width="200"
                height="30"
                ref="saturation"
                @mousemove="saturationMove"
            />
            <div class="saturation-caret" />
          </div>
        </div>
        <div class="param">
          Transparency
          <div class="param-gradient">
            <canvas
                class="transparency-gradient"
                :width="200"
                height="30"
                ref="transparency"
                @mousemove="transparencyMove"
            />
            <div class="transparency-caret" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPicker',
  props: {
    modelValue: { type: String, default: '#FFFFFF' },
    circleSize: { type: Number, default: 300 }
  },
  data() {
    return {
      color: 'rgba(255, 255, 255, 1)',
      rgbColorPixels: [0, 0, 0],

      isShowPicker: false,
      isMouseDown: false,

      paletteCaretPos: [],
      brightnessCaretPos: 0,
      transparencyCaretPos: 0,
    }
  },
  mounted() {
    this.drawRainbowGradient()
    this.drawBrightnessGradient()
    this.drawSaturationGradient()
    this.drawTransparencyGradient()
  },
  watch: {
    pureColor() {
      this.drawBrightnessGradient()
      this.drawSaturationGradient()
      this.drawTransparencyGradient()
    }
  },
  computed: {
    pureColor() {
      return `rgb(${this.rgbColorPixels[0]}, ${this.rgbColorPixels[1]}, ${this.rgbColorPixels[2]})`
    },
    resultColor() {
      return `rgba(${this.rgbColorPixels[0]}, ${this.rgbColorPixels[1]}, ${this.rgbColorPixels[2]}, ${this.transparencyValue})`
    },
    brightnessValue() {
      return this.brightnessCaretPos / 200
    },
    saturationValue() { 
      return this.lightCaretPos / 200
    },
    transparencyValue() { 
      return (200 - this.transparencyCaretPos) / 200
    },
  },
  methods: {
    drawRainbowGradient() {
      const canvas = this.$refs.rainbow
      const ctx = canvas.getContext('2d');
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy);

      // count of steps for smooth gradient
      const steps = 1000;
      for (let i = 0; i < steps; i++) {
        const start = (i * Math.PI) / 180;
        const end = ((i + 1) * Math.PI) / 180;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, start, end);
        ctx.closePath();

        const hue = i; // smooth transition of colors
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fill();
      }
    },
    drawBrightnessGradient() {
      const canvas = this.$refs.brightness
      const ctx = canvas.getContext('2d')

      let grad = ctx.createLinearGradient(0, 0, 200, 30) 
      
      grad.addColorStop(0, 'white')
      grad.addColorStop(0.5, this.pureColor)
      grad.addColorStop(1, 'black')

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 200, 30) 
    },
    drawSaturationGradient() {
      const canvas = this.$refs.saturation
      const ctx = canvas.getContext('2d')

      let grad = ctx.createLinearGradient(0, 0, 200, 30)

      grad.addColorStop(0, this.pureColor)
      grad.addColorStop(1, 'white')

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 200, 30)
    },
    drawTransparencyGradient() {
      const canvas = this.$refs.transparency
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, 200, 30)

      let grad = ctx.createLinearGradient(0, 0, 200, 30)

      let splittedColor = this.color.split(',')
      splittedColor[splittedColor.length - 1] = ' 0)'

      console.log(splittedColor.join(','))

      grad.addColorStop(0, this.pureColor)
      grad.addColorStop(1, 'transparent')

      ctx.globalCompositeOperation = 'multiply'
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 200, 30)
    },
    paletteMove() {
      if (!this.isMouseDown) return;
      const rect = this.$refs.rainbow.getBoundingClientRect();
      const ctx = this.$refs.rainbow.getContext('2d')

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pixel = ctx.getImageData(x, y, 1, 1).data;

      this.paletteCaretPos = [x, y]
      this.rgbColorPixels = pixel
    },
    lightMove() {
      if (!this.isMouseDown) return
      const rect = this.$refs.light.getBoundingClientRect()
      const x = event.clientX - rect.left
      this.lightCaretPos = x
    },
    saturation() {
    },
    transparencyMove() {
      if (!this.isMouseDown) return
      const rect = this.$refs.transparency.getBoundingClientRect()
      const x = event.clientX - rect.left
      this.transparencyCaretPos = x
    },
  }
};
</script>

<style scoped>
.main-box {
  position: relative;
}

.picked-color {
  box-sizing: border-box;
  background-color: var(--panels-color);
  border-radius: 5px;
  width: 35px;
  height: 35px;
  padding: 5px;
}

.color {
  background-color: v-bind(resultColor);
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

.picker {
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 16px;
  gap: 16px;
  border-radius: 5px;
  background-color: var(--panels-color);
}

.palette-box {
  position: relative;
}

.palette-box canvas {
  border-radius: 50%;
}

.caret {
  pointer-events: none;
  position: absolute;
  background-color: white;
  border: solid 1px black;
  border-radius: 50%;
  top: v-bind(paletteCaretPos[1] - 3 + 'px');
  left: v-bind(paletteCaretPos[0] - 3 + 'px');
  width: 6px;
  height: 6px;
}

.additional-params {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.additional-params .param-gradient {
  position: relative;
}

.light-caret, .transparency-caret {
  cursor: pointer;
  position: absolute;
  border: solid 1px black;
  background-color: white;
  top: 0;
  border-radius: 5px;
  height: 30px;
  width: 5px;
}

.light-caret {
  left: v-bind(lightCaretPos + 'px');
}

.transparency-caret {
  left: v-bind(transparencyCaretPos + 'px');
}

.param {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.transparency-gradient, .brightness-gradient, .saturation-gradient {
  border: solid 1px black;
  border-radius: 5px;
  cursor: pointer;
  background-size: contain;
}

.color-plates {
  display: grid;
}

.plate {
  width: 30px;
  height: 30px;
}

.color-gradient {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  background: linear-gradient(90deg, white, red);
}

.light {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  mix-blend-mode: multiply;
  background: linear-gradient(to bottom, transparent, black);
}
</style>