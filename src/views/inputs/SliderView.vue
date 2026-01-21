<template>
  <div class="component-view">
      <Slider v-model="testValue" />
      <Slider
    <div class="description">
      <h3>Slider component</h3>
      <p>Custom slider input</p>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/inputs/Slider.vue';

export default {
  name: 'SliderView',
  components: {
    Slider,
  },
  data() {
    return {
      testValue: 5,
      secondTestValue: 20
    }
  }
}
</script>

<style scoped>

.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.range-box{
  width: 300px;
}

</style>