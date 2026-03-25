<template>
  <div class="color" @click="isShowPanel = true"/>

  <div class="picker-panel" v-show="isShowPanel">
    <div class="selected-color" @click="isShowPanel = false"/>

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


    <div class="additional-params">
      <div class="caption">
        Saturation
      </div>
      <div
          class="saturation"
          :width="width / 2"
          height="10px"
          @click="additionalParamClick('saturation')"
      >
        <div
            class="param-caret"
            :style="`left: ${saturationCaretPos}px`"
        ></div>
      </div>
      <div class="caption">
        Lightness
      </div>
      <div
          class="lightness"
          :width="width / 2"
          height="10px"
          @click="additionalParamClick('lightness')"
      >
        <div
            class="param-caret"
            :style="`left: ${lightnessCaretPos}px`"
        ></div>
      </div>
      <div class="caption">
        Transparency
      </div>
      <div
          class="transparency"
          :width="width / 2"
          height="10px"
          @click="additionalParamClick('transparency')"
      >
        <div
            class="param-caret"
            :style="`left: ${transparencyCaretPos}px`"
        ></div>
      </div>
    </div>
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
      saturationCaretPos: 0,
      lightnessCaretPos: 0,
      transparencyCaretPos: 0,

      colorPixels: [],

      isShowPanel: false,
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
      let ctx = this.$refs.canvas.getContext('2d')
      this.colorPixels = ctx.getImageData(this.hexagonCaretPos[0], this.hexagonCaretPos[1], 1, 1).data
    },
    saturationCaretPos() {
      this.saturation = (100 * this.saturationCaretPos / event.target.getBoundingClientRect().width)
    },
    lightness() {
      this.drawHexagon()
      let ctx = this.$refs.canvas.getContext('2d')
      this.colorPixels = ctx.getImageData(this.hexagonCaretPos[0], this.hexagonCaretPos[1], 1, 1).data
    },
    lightnessCaretPos() {
      this.lightness = (100 * this.lightnessCaretPos / event.target.getBoundingClientRect().width)
    },
    transparency() {
      this.drawHexagon()
    },
    transparencyCaretPos() {
      this.transparency = (100 * this.transparencyCaretPos / event.target.getBoundingClientRect().width) / 100
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

        gradient.addColorStop(0, `hsla(0, 100%, 100%)`)
        gradient.addColorStop(1, `hsla(${(256 / this.gradientDirections.length) * (index + 1)}, ${this.saturation}%, ${this.lightness}%)`)

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
    },
    additionalParamClick(paramName) {
      if (paramName === 'saturation') {
        this.saturationCaretPos = event.clientX - event.target.getBoundingClientRect().left
      } else if (paramName === 'lightness') {
        this.lightnessCaretPos = event.clientX - event.target.getBoundingClientRect().left
      } else if (paramName === 'transparency') {
        this.transparencyCaretPos = event.clientX - event.target.getBoundingClientRect().left
      }
    }
  }
}
</script>

<style scoped>
.picker-panel {
  position: absolute;
  display: flex;
  flex-direction: row;
  background-color: var(--panels-color);
  padding: 32px 16px;
  border-radius: 5px;
}

.selected-color {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: v-bind(rgbaColor);
  top: 0;
  left: 0;
  border-radius: 0 0 100%;
  box-shadow: inset -2px -2px 4px 2px black;
}

.hexagon-box {
  display: flex;
  position: relative;
  width: v-bind(width + 'px');
  height: v-bind(height + 'px');
}

.color {
  cursor: pointer;
  height: 30px;
  width: 30px;
  box-shadow: inset var(--border-color) 0 0 0 2px;
  border-radius: 5px;
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

.additional-params {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.transparency,
.saturation,
.lightness {
  position: relative;
  display: flex;
  border: solid 1px white;
  width: v-bind(width / 2 + 'px');
  height: 15px;

}

.transparency {
  background: linear-gradient(to right, transparent, v-bind(rgbaColor));
}

.saturation {
  background: linear-gradient(to right, black, v-bind(rgbaColor));
}

.lightness {
  background: linear-gradient(to right, black, v-bind(rgbaColor), white);
}

.param-caret {
  pointer-events: none;
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: white;
  border: solid 1px black;
}
</style>