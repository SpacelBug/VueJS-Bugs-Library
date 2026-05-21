<template>
  <div class="main-box">
    <a
        :href="src"
        target="_blank"
        @mouseenter="isShowPreview = true"
        @mouseleave="isShowPreview = false"
    >
      {{ caption }}
    </a>
    <transition name="fade">
      <img
          v-if="isShowPreview"
          :src="src"
          :alt="alt"
          width="300px"
          height="300px"
      >
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ImageRefPreview',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: 'Image Preview'
    }
  },
  data() {
    return {
      isShowPreview: false
    }
  },
}

</script>

<style scoped>
.main-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: fit-content;
}

img {
  position: absolute;
  top: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>