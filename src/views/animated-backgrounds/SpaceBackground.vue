<template>
  <canvas ref="canvas" />
</template>

<script>

export default {
  name: 'SpaceBackground',
  props: {
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    starsCount: { type: Number, default: 200 },
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
        "hsl(270, 20%, 50%)",
        "hsl(150, 20%, 50%)",
      ]
    },
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
          r: Math.random() * 1.2 + 0.2,
          alpha: Math.random(),
          speed: Math.random() * 0.02,
          color: this.startColors[Math.floor(Math.random() * this.startColors.length)]
        })
      }
    },
    drawStars() {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

      for (const star of this.stars) {
        const offsetX = this.mouseX * star.r * 10 * this.parallaxStrength;
        const offsetY = this.mouseY * star.r * 10 * this.parallaxStrength;

        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace('hsl', 'hsla').replace(')', `, ${star.alpha})`)
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(180, 190, 255, 0.8)";
        ctx.fill();
      }

      return requestAnimationFrame(this.drawStars);
    },
    resize(event) {
      const parentRect = this.$el.parentElement.getBoundingClientRect()

      if (document.fullscreenElement === this.$refs.canvas) {
        this.$refs.canvas.width = window.innerWidth
        this.$refs.canvas.height = window.innerHeight
      } else {
        this.$refs.canvas.width = parentRect.width
        this.$refs.canvas.height = parentRect.height
      }
      this.createStars()
    },
    drawBackground() {
      this.resize()
      this.drawStars()
    }
  }
}
</script>