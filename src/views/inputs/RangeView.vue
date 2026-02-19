<template>
  <div class="component-view">
    <div class="component-variants">
     <Range v-model="testValue" />
      <Range v-model="secondTestValue" :min="10" :max="100"/>
    </div>
    <div class="description">
      <h3>Range component</h3>
      <div class="description">
        <p>Custom range input</p>
        <p><b>Props:</b></p>
        <p>modelValue: <u>[Number, Number]</u></p>
        <p>min: <u>Number</u></p>
        <p>max: <u>Number</u></p>
        <p>step: <u>Number</u></p>
        <p>showValue: <u>Boolean</u></p>
      </div>
    </div>
  </div>
</template>

<script>
import Range from '@/components/inputs/Range.vue';

export default {
  name: 'RangeView',
  components: {
    Range
  },
  data() { return {
    testValue: [0, 10],
    secondTestValue: [50, 60],
  }}
}

</script>

<style scoped>

.component-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
}

.range-box {
  width: 300px;
}

</style>