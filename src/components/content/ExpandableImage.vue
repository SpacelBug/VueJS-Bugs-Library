<template>
  <div class="image-wrapper">
    <img
        v-if="isLoaded !== false"
        :src="src"
        @error="onError"
        @load="onLoad"
        @click="onClick"
    >
    <div
        v-else
        class="error-message"
    >
      <slot>
        Loading error
      </slot>
    </div>
  </div>

  <transition name="fade">
    <div
        v-if="isExpanded"
        class="expanded-image-wrapper"
        @click="isExpanded = false"
    >
      <img
          :src="src"
          class="expanded-image"
      >
    </div>
  </transition>
</template>

<script>

export default {
  name: "ExpandableImage",
  props: {
    src: { type: String, required: true },
    height: { type: Number, default: 300 },
    width: { type: Number, default: 500 },
  },
  data() {
    return {
      isLoaded: null,
      isExpanded: false,
    }
  },
  watch: {
    isExpanded(newValue) {
      if (newValue === false) {
        document.removeEventListener("keydown", this.normalize)
      }
    }
  },
  methods: {
    onLoad() {
      this.isLoaded = true
    },
    onError() {
      this.isLoaded = false
    },
    onClick() {
      this.isExpanded = true
      document.addEventListener("keydown", this.normalize)
    },
    normalize() {
      if (event.key === "Escape") {
        this.isExpanded = false
      }
    }
  }
}
</script>

<style scoped>

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: v-bind(height + "px");
  width: v-bind(width + "px");
  background-color: var(--panels-color);
  object-fit: contain;
}

img {
  display: flex;
  max-width: 100%;
  max-height: 100%;
}

.expanded-image-wrapper {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

/*Transition*/

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

</style>