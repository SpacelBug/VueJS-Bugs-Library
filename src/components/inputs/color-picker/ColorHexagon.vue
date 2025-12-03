<template>
  <canvas
      ref="canvas"
      :width="width"
      :height="height"
  />
</template>

<script>
export default {
  name: "ColorHexagon",
  props: {
    height: {type: Number, default: 300},
    width: {type: Number, default: 300}
  },
  data() { return {
    mainColors: ['yellow', 'limegreen', 'cyan', 'mediumblue', 'magenta', 'red'],
    gradientDirections: [90, 30, 330, 270, 210, 150],
  }},
  mounted() {
    const canvas = this.$refs.canvas
    const ctx = canvas.getContext('2d')

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

      gradient.addColorStop(0, 'white')
      gradient.addColorStop(1, color)

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
  }
}
</script>

<style>

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

</style>