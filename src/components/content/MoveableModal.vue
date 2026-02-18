<template>
  <div
      :class="['moveable-modal', { 'select-lock': isMouseDown }]"
      @mousedown.self="isMouseDown = true"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "MoveableModal",
  props: {
    startPosX: {type: Number, default: window.innerWidth / 2},
    startPosY: {type: Number, default: window.innerHeight / 2},
  },
  data() {
    return {
      isMouseDown: false,
      posX: this.startPosX,
      posY: this.startPosY,
    }
  },
  mounted() { 
    document.body.addEventListener('mousemove', this.onMouseMove)
    document.body.addEventListener('mouseup', this.onMouseUp)
  },
  unmounted() {
    document.body.removeEventListener('mousemove', this.onMouseMove)
    document.body.addEventListener('mouseup', this.onMouseUp)

  },
  methods: {
    onMouseMove() {
      if (this.isMouseDown) {
        console.log('move: ', event)
        this.posX += event.movementX
        this.posY += event.movementY
      }
    },
    onMouseUp() {
      this.isMouseDown = false
    }
  }
}
</script>

<style scoped>
.moveable-modal {
  position: fixed;
  top: v-bind(posY + 'px');
  left: v-bind(posX + 'px');
  background-color: var(--panels-color);
  border: solid 1px var(--border-color);
  padding: 16px;
  border-radius: 5px;
}

.select-lock {
  user-select: none;
}
</style>