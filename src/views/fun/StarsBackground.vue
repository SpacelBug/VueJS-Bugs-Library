<template>
  <canvas ref="canvas"></canvas>
</template>

<script>

export default {
  name: 'StarsBackground',
  props: {
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    sparkle: { type: Boolean, default: false },
    starSize: { type: Number, default: 2 },
    speed: { type: Number, default: 0.5 },

    type: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'cursor'].includes(value)
    },
  },
  data() {
    return {
      starsCount: 200,
      stars: [],
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    const parentRect = canvas.parentElement.getBoundingClientRect()

    canvas.width = this.width || parentRect.width
    canvas.height = this.height || parentRect.height

    this.createStars()
    this.drawStars()

    if (this.type === 'default') {
      this.animateStars()
    } else if (this.type === 'cursor') {
      addEventListener('mousemove', this.moveStarsToCursor)
    }
  },
  methods: {
    createStars() {
      const canvas = this.$refs.canvas

      for (let i = 0; i < this.starsCount; i++) {
        this.stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (this.starSize - 0.1) + 0.1,
          speedY: Math.random() * this.speed + 0.2,
          speedX: Math.random() * this.speed + 0.2,
        })
      }
    },
    drawStars() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      for (const star of this.stars) {
        ctx.beginPath()
        if (this.sparkle) {
          // draw path
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(star.x + (star.size / 2) + star.size / 0.2, star.y + (star.size / 2) + star.size / 0.2)
          ctx.lineTo(star.x + (star.size / 2), star.y)
          ctx.lineTo(star.x + (star.size / 2) + star.size / 0.2, star.y - (star.size / 2) - star.size / 0.2)
          ctx.lineTo(star.x, star.y - (star.size / 2))
          ctx.lineTo(star.x - (star.size / 2) - star.size / 0.2, star.y - (star.size / 2) - star.size / 0.2)
          ctx.lineTo(star.x - (star.size / 2), star.y)
          ctx.lineTo(star.x - (star.size / 2) - star.size / 0.2, star.y + (star.size / 2) + star.size / 0.2)
          ctx.closePath()
          ctx.fillStyle = 'white'
          ctx.fill()
        } else {
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fillStyle = 'white'
          ctx.fill()
        }
      }
    },
    animateStars() {
      let interval = setInterval(() => {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (const star of this.stars) {
          star.y += star.speedY
          if (star.y > canvas.height) {
            star.y = 0
            star.x = Math.random() * canvas.width
          }
          star.x += star.speedX
          if (star.x > canvas.width) {
            star.x = 0
          }
        }

        this.drawStars()
      }, 30)
    },
    moveStarsToCursor() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of this.stars) {
        star.y += event.movementY * 0.1
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        } else if (star.y < 0) {
          star.y = canvas.height
          star.x = Math.random() * canvas.width
        }
        star.x += event.movementX * 0.1
        if (star.x > canvas.width) {
          star.y = Math.random() * canvas.height
          star.x = 0
        } else if (star.x < 0) {
          star.y = Math.random() * canvas.height
          star.x = canvas.width
        }
      }

      this.drawStars()
    },
  },
};

</script>

<style scoped></style>