<template>
  <div class="component-view">
    <tool-tip>
      Some text with tool-tip
      <template></template>
    </tool-tip>

    <div class="description">
      <h3>Tool-Tip component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import ToolTip from '@/components/special/ToolTip.vue';

export default {
  name: 'ToolTipView',
  components: {
    ToolTip,
  },
};
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>