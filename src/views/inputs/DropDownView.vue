<template>
  <div class="component-view">
    <div class="component-variants">
      <drop-down
          v-model="testValue"
          :options="testOptions"
          :width="200"
      />

      <drop-down
          v-model="testValue"
          :options="testOptions"
      />

      <drop-down
          v-model="testValue"
          :options="testOptions"
          :width="'100%'"
      />
    </div>

    <div class="description">
      <h3>Drop-Down component</h3>
      <div class="description">
        <p>Custom drop down with specific params and different types</p>
        <p><b>Props:</b></p>
        <p><u>modelValue:</u> String</p>
        <p><u>options:</u> Array</p>
        <p><u>type:</u> String</p>
        <p><u>placeholder:</u> String</p>
        <p><u>noOptionsText:</u> String</p>
        <p><u>width:</u> Number</p>
        <p><u>buttonOptionsGap: </u>Number</p>
      </div>
    </div>
  </div>
</template>

<script>
import DropDown from '@/components/inputs/drop-down/DropDown.vue';

export default {
  name: 'DropDownView',
  components: {
    DropDown
  },
  data() {
    return {
      testValue: false,
      testOptions: [
        'Dog',
        'Cat',
        'Frog',
        'Whale',
        'Test very long value'
      ],
    }
  }
};
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}

.component-variants {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}

.description {
  width: 400px;
}
</style>