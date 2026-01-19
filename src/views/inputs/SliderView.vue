<template>
  <div class="component-view">
    <Range v-model="testValue" />
    <Range
        v-model="secondTestValue"
        :min="10"
        :max="100"
    />
    <div class="description">
      <h3>Range component</h3>
      <div class="description">
        <p>Custom range input</p>
        <p><b>Props:</b></p>
        <p>modelValue: <u>Number</u></p>
        <p>min: <u>Number</u></p>
        <p>max: <u>Number</u></p>
        <p>step: <u>Number</u></p>
        <p>showValue: <u>Boolean</u></p>
      </div>
    </div>
  </div>
</template>

<script>
import Range from '@/components/inputs/Slider.vue';

export default {
  name: 'SliderView',
  components: {
    Range,
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