<template>
  <div
      tabindex="0"
      autofocus="true"
      class="modal-window-certain"
      @click.self="onCertainClick"
  >
    <div class="modal-window">
      <div class="close-button" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",
  emits: ["closeModal"],
  props: {
    height: { type: Number },
    width: { type: Number },
    certain: { type: Boolean, default: true },
    closeOnOuterClick: { type: Boolean, default: true }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyPress)
  },
  unmounted() {
    document.removeEventListener('keydown', this.onKeyPress)
  },
  methods: {
    onKeyPress() {
      if (event.code === "Escape") {
        this.$emit('closeModal')
      }
    },
    onCertainClick() {
      if (this.closeOnOuterClick) {
        this.$emit('closeModal')
      }
    }
  }
}
</script>

<style scoped>
.modal-window-certain {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.9;
}

.modal-window {
  background-color: var(--panels-color);
  border-radius: 5px;
  padding: 16px;
  height: v-bind(height + 'px');
  width: v-bind(width + 'px');
}
</style>