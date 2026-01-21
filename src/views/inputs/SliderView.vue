<template>
  <div class="component-view">
    <div class="component-variants">
      <Slider v-model="testValue" />
      <Slider
          v-model="secondTestValue"
          :min="10"
          :max="100"
      />
    </div>
    <div class="description">
      <h3>Slider component</h3>
      <p>Custom slider input</p>
      <p><b>Props:</b></p>
      <p>modelValue: <u>Number</u></p>
      <p>min: <u>Number</u></p>
      <p>max: <u>Number</u></p>
      <p>step: <u>Number</u></p>
      <p>showValue: <u>Boolean</u></p>
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
  justify-content: space-between;
  gap: 32px;
}

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
}

.description {
  width: 400px;
}

</style>