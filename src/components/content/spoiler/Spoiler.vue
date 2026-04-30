<template>
  <div class="component-box">
    <div
        class="header"
        @click="isShowContent = !isShowContent"
    >
      <slot name="caption" />
      <div :class="['arrow-head-icon', { 'rotated': isShowContent }]" />
    </div>

    <transition
        name="drop"
        appear
    >
      <div
          v-show="isShowContent"
          class="content"
          ref="content"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Spoiler',
  props: {
    width: { type: Number, default: null }
  },
  data() {
    return {
      isShowContent: false,
      height: 0,
    };
  },
  mounted() {
    this.height = this.getElementHeight(this.$refs.content)
  },
  methods: {
    getElementHeight(element) {
      const clone = element.cloneNode(true);

      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.display = 'block';
      clone.style.height = 'auto';
      clone.style.width = element.parentElement.getBoundingClientRect().width + 'px'


      document.body.appendChild(clone);

      const height = clone.offsetHeight;

      document.body.removeChild(clone);

      return height;
    }
  }
};
</script>

<style scoped>
.component-box {
  display: grid;
  width: v-bind(width===null ? "100%" : width + 'px');
  height: fit-content;
}

.header {
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.arrow-head-icon {
  mask-image: url("ArrowHead.svg");
  mask-size: contain;
  background-color: var(--font-color);
  width: 20px;
  height: 20px;
}

.rotated {
  transform: rotate(180deg);
}

.content {
  height: fit-content;
}

/*Animation*/

.drop-enter-from,
.drop-leave-to {
  height: 0
}

.drop-enter-active,
.drop-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}

.drop-enter-to,
.drop-leave-from {
  height: v-bind(height + 'px');
}
</style>