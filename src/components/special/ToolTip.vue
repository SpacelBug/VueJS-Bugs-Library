<template>
  <div
      class="tool-tipped-box"
      @mouseenter="isShowToolTip = true"
      @mouseleave="isShowToolTip = false"
  >
    <slot>

    </slot>
    <transition name="fade">
      <div
          class="tool-tip"
          v-if="isShowToolTip"
      >
        <slot name="text">
          <div class="simple-description">
            {{ description }}
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    description: { type: String, default: null },
    tipWidth: { type: Number, default: null }
  },
  data() {
    return {
      isShowToolTip: false,
      toolTipPosition: {
        top: null,
        left: null,
      }
    }
  },
  methods: {
    mouseEnter() {},
  }
};
</script>

<style scoped>
.tool-tipped-box {
  position: relative;
  height: fit-content;
  width: 100%;
}

.tool-tip {
  position: absolute;
  padding: 4px 8px;
  background-color: var(--panels-color);
  border-radius: 5px;
  width: v-bind(tipWidth + 'px');
}

/*Animation*/

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>