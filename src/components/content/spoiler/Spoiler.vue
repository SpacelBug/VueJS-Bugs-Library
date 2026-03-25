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
    width: {type: Number, default: 300}
  },
  data() {
    return {
      isShowContent: false,
    };
  },
  methods: {

  },
};
</script>

<style scoped>

.component-box {
  width: v-bind(width + 'px');
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
  transition: all 0.5s ease
}

.rotated {
  transform: rotate(180deg);
}

/*Animation*/

.drop-enter-from,
.drop-leave-to {
  max-height: 0
}

.drop-enter-active,
.drop-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}

.drop-enter-to,
.drop-leave-from {
  max-height: 100%;
}

</style>