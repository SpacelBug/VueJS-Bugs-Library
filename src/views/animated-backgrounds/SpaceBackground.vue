<template>
  <div class="canvas-container">
    <canvas
        ref="nebulaCanvas"
        id="nebulaCanvas"
    />
    <canvas
        ref="canvas"
        id="spaceCanvas"
    />
  </div>
</template>

<script>

export default {
  name: 'SpaceBackground',
  props: {
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    starsCount: { type: Number, default: 300 },
    startsMaxSize: { type: Number, default: 1 },
    /**
     * if parallaxStrength is 0, stars will not move on mouse move, 
     * if it's 1 they will move by their radius, 
     * if it's 2 they will move twice more, etc
     */
    parallaxStrength: { type: Number, default: 1 },
    startColors: {
      type: Array,
      default: () => [
        "hsl(220, 20%, 50%)",
        "hsl(50, 50%, 50%)",
        "hsl(357, 60%, 50%)",
        "hsl(270, 20%, 50%)",
        "hsl(150, 20%, 50%)",
      ]
    },
    dive: { type: Boolean, default: true },
    isNebulas: { type: Boolean, default: true }
  },
  data() {
    return {
      parentRect: null,

      stars: [],
      nebulas: [],

      animationFrameId: null,

      mouseX: 0,
      mouseY: 0,
    }
  },
  mounted() {
    window.addEventListener("resize", this.resize)
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX / window.innerWidth - 0.5;
      this.mouseY = e.clientY / window.innerHeight - 0.5;
    })

    this.drawBackground()
  },
  watch: {
    starsCount() {
      window.cancelAnimationFrame(this.animationFrameId)
      this.drawBackground()
    },
  },
  methods: {
    createStars() {
      this.stars = []

      for (let i = 0; i < this.starsCount; i++) {
        this.stars.push({
          x: Math.random() * this.$refs.canvas.width,
          y: Math.random() * this.$refs.canvas.height,
          r: (Math.random() * (this.startsMaxSize - 0) + this.startsMaxSize) + 0.2,
          alpha: Math.random(),
          speed: Math.random() * 0.02,
          color: this.startColors[Math.floor(Math.random() * this.startColors.length)]
        })
      }
    },
    createNebulas() {
      this.nebulas = []

      for (let i = 0; i < 10; i++) {
        let nebula = {
          centerPoint: { x: Math.random() * this.$refs.canvas.width, y: Math.random() * this.$refs.canvas.height },
          points: [],
          color: `hsl(${Math.random() * (360 - 0) + 360}, 50%, 50%)`,
          speed: Math.random() * 0.001,
          alpha: Math.random() * 0.03,
        }

        const nebulaSize = (Math.random() * (200 - 0) + 200)
        const corners = (Math.random() * (7 - 5) + 7)
        const step = (Math.PI * 2) / corners;

        for (let j = 0; j < corners; j++) {
          const angle = j * step;

          const radius = Math.random() * (nebulaSize - 0) + nebulaSize;

          const x = nebula.centerPoint.x + Math.cos(angle) * radius;
          const y = nebula.centerPoint.y + Math.sin(angle) * radius;

          nebula.points.push({ x, y });
        }

        this.nebulas.push(nebula)
      }

      console.log(this.nebulas)
    },
    drawStars() {
      const canvas = document.querySelector('#spaceCanvas')
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

      for (const star of this.stars) {
        const offsetX = this.mouseX * star.r * 10 * this.parallaxStrength;
        const offsetY = this.mouseY * star.r * 10 * this.parallaxStrength;

        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed *= -1;
        }

        ctx.beginPath();
        ctx.filter = "none"
        ctx.arc(star.x + offsetX, star.y + offsetY, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace('hsl', 'hsla').replace(')', `, ${star.alpha})`)
        ctx.shadowBlur = 16
        ctx.shadowColor = star.color.replace('hsl', 'hsla').replace(')', `, ${star.alpha})`)
        ctx.fill();
      }

      return requestAnimationFrame(this.drawStars);
    },
    drawNebulas() {
      const canvas = document.querySelector('#nebulaCanvas')
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, this.$refs.nebulaCanvas.width, this.$refs.nebulaCanvas.height);

      for (const nebula of this.nebulas) {
        nebula.alpha += nebula.speed
        if (nebula.alpha > 0.04 || nebula.alpha < 0.01) {
          nebula.speed *= -1;
        }

        ctx.beginPath()
        ctx.moveTo(nebula.points[0].x, nebula.points[0].y)
        for (const point of nebula.points) {
          ctx.lineTo(
            point.x,
            point.y
          )
        }
        ctx.fillStyle = nebula.color.replace('hsl', 'hsla').replace(')', `, ${nebula.alpha})`)
        ctx.fill()
      }

      return requestAnimationFrame(this.drawNebulas)
    },
    resize(event) {
      const parentRect = this.$el.parentElement.getBoundingClientRect()

      if (document.fullscreenElement === this.$refs.canvas) {
        this.$refs.canvas.width = window.innerWidth
        this.$refs.canvas.height = window.innerHeight

        this.$refs.nebulaCanvas.width = window.innerWidth
        this.$refs.nebulaCanvas.height = window.innerHeight

      } else {
        this.$refs.canvas.width = this.width ? this.width : parentRect.width
        this.$refs.canvas.height = this.height ? this.height : parentRect.height

        this.$refs.nebulaCanvas.width = this.width ? this.width : parentRect.width
        this.$refs.nebulaCanvas.height = this.height ? this.height : parentRect.height
      }

      if (this.isNebulas) this.createNebulas()
      this.createStars()
    },
    drawBackground() {
      this.resize()
      this.drawStars()
      if (this.isNebulas) this.drawNebulas()
    }
  }
}
</script>

<style scoped>
.canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: radial-gradient(
    #0a001f,
    #030303
  );
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}

#nebulaCanvas {
  filter: blur(100px);
  z-index: 0;
}

#spaceCanvas {
  z-index: 1;
}
</style>