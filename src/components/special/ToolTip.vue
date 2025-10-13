<template>
  <div class="tool-tipped-box">
    <slot class="">

    </slot>
    <div class="tool-tip">
      <slot name="text">
        <div class="simple-description">
          {{ description }}
        </div>
      </slot>
    </div>
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
}

.tool-tip {
  position: absolute;
  padding: 4px 8px;
  background-color: var(--panels-color);
  border-radius: 5px;
  width: v-bind(tipWidth + 'px');
</style>