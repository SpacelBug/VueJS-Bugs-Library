<template>
  <div class="component-view">
    <color-picker></color-picker>

    <div class="description">
      <h3>ColorPicker component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from '@/components/inputs/color-picker/ColorPicker.vue';

export default {
  name: 'ColorPickerView',
  components: {
    ColorPicker,
  },
  data() {
    return {
    }
  }
};
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>