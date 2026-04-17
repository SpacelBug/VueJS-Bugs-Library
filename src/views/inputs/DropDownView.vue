<template>
  <div class="component-view">
    <div class="component-variants">

      Const width by setting width prop = 200

      <drop-down
          v-model="testValue"
          :options="testOptions"
          :width="200"
      />

      Default width with emptyOptionText = 'unselect'

      <drop-down
          v-model="testValue"
          :options="testOptions"
          :emptyOptionText="'unselect'"
      />

      Full width by setting width prop = 100%

      <drop-down
          v-model="testValue"
          :options="testOptions"
          :width="'100%'"
      />

      Have no options example

      <drop-down
          v-model="testValue"
          :width="'100%'"
      />
    </div>

    <div class="description">
      <h3>Drop-Down component</h3>
      <div class="description">
        <p>Custom drop down with specific params</p>
        Right click on drop down clear modelValue
        <p><b>Props:</b></p>
        <p><u>modelValue:</u> String</p> v-model option
        <p><u>options:</u> Array</p> list of values
        <p><u>placeholder:</u> String</p> display when value don`t select
        <p><u>emptyOptionText:</u> String</p> text value for option witch clear value
        <p><u>noOptionsText:</u> String</p> text witch display of list of options is empty
        <p><u>width:</u> Number</p> width of component
        <p><u>buttonOptionsGap: </u>Number</p> gap (in pixels) between options
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