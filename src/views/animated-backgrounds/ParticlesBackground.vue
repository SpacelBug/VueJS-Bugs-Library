<template>
  <div
      class="particles-box"
      ref="mainBox"
      @mousemove="onMouseMove"
      @mouseleave="mousePos = null"
  >
    <canvas ref="canvas" />
    <div
        class="backdrop"
        ref="backdrop"
    />
    <div class="slotted-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ParticlesBackground",
  data() {
    return {
      particles: [],
      particleSize: null,
      particleSprite: null,

      resizeObserver: new ResizeObserver(this.resizeCanvas),

      isMouseOnCanvas: false,

      animationFrameId: null,
      eraseAnimationFrameId: null,

      mousePos: null,
    }
  },
  mounted() {
    this.resizeObserver.observe(this.$refs.mainBox)

    this.particleSize = 20

    this.createParticles()
    this.createParticleSprite()
    this.startParticles()
  },
  unmounted() {
    cancelAnimationFrame(this.animationFrameId)
    cancelAnimationFrame(this.eraseAnimationFrameId)
  },
  methods: {
    createParticles() {
      const canvas = this.$refs.canvas

      let minSparkleSize = 1
      let maxSparkleSize = this.particleSize

      for (let i = 0; i < 500; i++) {
        this.particles.push({
          x: Math.random() * (canvas.width - 0 + 1) + 0,
          y: Math.random() * (canvas.height - 0 + 1) + 0,
          speedX: Math.random() * 10 - 0.5,
          speedY: Math.random() * 10 - 0.5,
          size: Math.random() * (maxSparkleSize - minSparkleSize + 1) + minSparkleSize,
          speedAlpha: Math.random() * 0.01 + 0.005,
          alpha: Math.random()
        })
      }
    },
    createParticleSprite() {
      const size = this.particleSize;
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d');

      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);

      gradient.addColorStop(0, `rgba(255, 255, 255, 1)`);
      gradient.addColorStop(0.2, `rgba(255, 255, 255, 0.9)`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 1)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      this.particleSprite = c;
    },
    startParticles() {
      const drawParticles = () => {
        const canvas = this.$refs.canvas

        if (!canvas) return null

        const ctx = canvas.getContext('2d')

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let particle of this.particles) {
          if ((particle.alpha > 1) || (particle.alpha < 0.1)) {
            particle.speedAlpha = -particle.speedAlpha
          }

          particle.alpha = particle.alpha + particle.speedAlpha

          if ((particle.x > canvas.width) || (particle.x < 0)) {
            particle.speedX = -particle.speedX
          }

          if ((particle.y > canvas.width) || (particle.y < 0)) {
            particle.speedY = -particle.speedY
          }

          //avoid cursor
          let avoidRadius = this.particleSize * 2
          if (this.mousePos && this.isInArea(
            particle.x,
            particle.y,
            this.mousePos[1] - avoidRadius,
            this.mousePos[0] + avoidRadius,
            this.mousePos[1] + avoidRadius,
            this.mousePos[0] - avoidRadius,
          )) {
            particle.speedX = particle.x < this.mousePos[0] ? -Math.abs(particle.speedX) : Math.abs(particle.speedX)
            particle.speedY = particle.y < this.mousePos[1] ? -Math.abs(particle.speedY) : Math.abs(particle.speedY)

            particle.x += particle.speedX * 2
            particle.y += particle.speedY * 2
          } else {
            particle.x += particle.speedX
            particle.y += particle.speedY
          }

          ctx.save()
          ctx.globalAlpha = particle.alpha
          ctx.drawImage(
            this.particleSprite,
            particle.x - particle.size / 2,
            particle.y - particle.size / 2,
            particle.size,
            particle.size
          )
          ctx.restore()
        }
        this.animationFrameId = requestAnimationFrame(drawParticles)
      }
      this.animationFrameId = requestAnimationFrame(drawParticles)
    },
    resizeCanvas(event) {
      const parentRect = this.$refs.mainBox.getBoundingClientRect()

      this.$refs.canvas.width = parentRect.width
      this.$refs.canvas.height = parentRect.height

      this.particleSize = parentRect.width < parentRect.height ? parentRect.width / 10 : parentRect.height / 10

      this.particles = []
      this.createParticles()
    },
    isInArea(x, y, topBorder, rightBorder, bottomBorder, leftBorder) {
      return (
        x >= leftBorder &&
        x <= rightBorder &&
        y >= topBorder &&
        y <= bottomBorder
      )
    },
    onMouseMove(event) {
      this.mousePos = [
        event.clientX - this.$refs.mainBox.getBoundingClientRect().x,
        event.clientY - this.$refs.mainBox.getBoundingClientRect().y,
      ]
    }
  }
}
</script>

<style scoped>
.particles-box {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

canvas {
  position: absolute;
  z-index: 2;
  transition: all 0.5s ease;
  mix-blend-mode: overlay;
}

.backdrop {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  transition: all 1s ease;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>