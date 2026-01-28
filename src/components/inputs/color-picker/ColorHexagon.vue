<template>
  <div class="canvas-wrapper">
    <div class="hexagon-box">
      <canvas
          class="hexagon"
          ref="canvas"
          :width="width"
          :height="height"
          @mousedown="async () => {
            await (isMouseDown = true)
            pickColor()
          }"
          @mouseup="isMouseDown = false"
          @mousemove="pickColor"
      />

      <div
          class="hexagon-caret"
          v-if="hexagonCaretPos"
      />
    </div>

    <div
        type="range"
        min="0"
        max="100"
        class="saturation"
        :width="width / 2"
        height="10px"
    >
      <div class="caption">
        saturation
      </div>
      <div class="caret"></div>
    </div>
    <div
        type="range"
        min="0"
        max="100"
        class="lightness"
        :width="width / 2"
        height="10px"
    >
      <div class="caption">
        lightness
      </div>
      <div class="caret"></div>
    </div>
    <div
        type="range"
        step="0.01"
        min="0"
        max="1"
        class="transparency"
        :width="width / 2"
        height="10px"
    >
      <div class="caption">
        transparency
      </div>
      <div class="caret"></div>
    </div>

    <div class="color" />
  </div>
</template>

<script>
export default {
  name: "ColorHexagon",
  props: {
    height: { type: Number, default: 300 },
    width: { type: Number, default: 300 }
  },
  data() {
    return {
      mainColors: ['yellow', 'limegreen', 'cyan', 'mediumblue', 'magenta', 'red'],
      gradientDirections: [90, 30, 330, 270, 210, 150],

      saturation: 100,
      lightness: 50,
      transparency: 1,

      isMouseDown: false,

      hexagonCaretPos: [],

      colorPixels: [],
    }
  },
  mounted() {
    this.drawHexagon()
    this.hexagonCaretPos = [this.width / 2, this.height / 2]

    let ctx = this.$refs.canvas.getContext('2d')
    this.colorPixels = ctx.getImageData(this.hexagonCaretPos[0], this.hexagonCaretPos[1], 1, 1).data
  },
  watch: {
    saturation() {
      this.drawHexagon()
    },
    lightness() {
      this.drawHexagon()
    },
    transparency() {
      this.drawHexagon()
    }
  },
  computed: {
    rgbaColor() {
      return `rgba(${this.colorPixels[0]}, ${this.colorPixels[1]}, ${this.colorPixels[2]}, ${this.transparency})`
    }
  },
  methods: {
    drawHexagon() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, this.width, this.height)

      ctx.globalCompositeOperation = 'multiply'

      const canvasCenter = [this.height / 2, this.width / 2]
      const radius = Math.min(this.height, this.width) / 2

      for (const index in this.gradientDirections) {
        const color = this.mainColors[index]

        let gradient = ctx.createLinearGradient(
          canvasCenter[0],
          canvasCenter[1],
          canvasCenter[0] + radius * Math.cos((this.gradientDirections[index] * Math.PI) / 180),
          canvasCenter[1] + radius * Math.sin((this.gradientDirections[index] * Math.PI) / 180)
        )

        gradient.addColorStop(0, `hsla(0, 100%, 100%, ${this.transparency})`)
        gradient.addColorStop(1, `hsla(${(256 / this.gradientDirections.length) * (index + 1)}, ${this.saturation}%, ${this.lightness}%, ${this.transparency})`)

        ctx.fillStyle = gradient

        // Draw rectangle in hexagon shape
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * 60 - 30) * (Math.PI / 180)
          const x = canvasCenter[0] + radius * Math.cos(angle)
          const y = canvasCenter[1] + radius * Math.sin(angle)
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fill()
      }
    },
    pickColor() {
      if (this.isMouseDown) {
        const rect = this.$refs.canvas.getBoundingClientRect()
        const ctx = this.$refs.canvas.getContext('2d')

        let pixels = ctx.getImageData(event.clientX - rect.left, event.clientY - rect.top, 1, 1)

        if (pixels.data[3]) {
          this.hexagonCaretPos = [
            event.clientX - rect.left,
            event.clientY - rect.top,
          ]
        }

        this.colorPixels = pixels.data
      }
    }
  }
}
</script>

<style scoped>
.canvas-wrapper {
  display: flex;
  position: relative;
  width: v-bind(width + 'px');
  height: v-bind(height + 'px');
}

.color {
  position: absolute;
  height: 50px;
  width: 50px;
  background-color: v-bind(rgbaColor);
}

.hexagon-caret {
  pointer-events: none;
  height: 6px;
  width: 6px;
  background-color: white;
  border: solid black 1px;
  border-radius: 50%;
  left: v-bind(hexagonCaretPos[0] + 'px');
  top: v-bind(hexagonCaretPos[1] + 'px');
  margin-left: -3px;
  margin-top: -3px;
  position: absolute;
}

.layers {
  position: relative;
  width: fit-content;
  height: fit-content;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
}

.transparency,
.saturation,
.lightness {
  display: flex;
  justify-content: center;
  position: absolute;
  border: solid 1px white;
  width: v-bind(width / 2 + 'px');
  height: 15px;
  
}

.transparency .caption,
.lightness .caption {
  position: absolute;
  font-size: 12px;
  bottom: -100%;
}

.saturation .caption {
  position: absolute;
  font-size: 12px;
  top: -100%;
}


.transparency {
  transform: rotate(-30deg);
  bottom: 0px;
  right: 0;
  background: linear-gradient(to right, v-bind(rgbaColor), transparent);
}

.saturation {
  transform: rotate(30deg);
  top: 0px;
  right: 0;
  background: linear-gradient(to right, v-bind(rgbaColor), black);
}

.lightness {
  transform: rotate(-90deg);
  align-self: center;
  right: v-bind(- width / 4 + 'px');
  background: linear-gradient(to right, black, v-bind(rgbaColor), white);
}
</style>