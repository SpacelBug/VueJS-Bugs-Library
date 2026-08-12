<template>
  <div class="component-view">
    <div class="component-variants">

      Const width by setting width prop = 200

      <multi-drop-down
          v-model="testValue"
          :options="testOptions"
          :width="200"
      />

      Default width with emptyOptionText = 'unselect'

      <multi-drop-down
          v-model="testValue"
          :options="testOptions"
          :emptyOptionText="'unselect'"
      />

      Full width by setting width prop = 100%

      <multi-drop-down
          v-model="testValue"
          :options="testOptions"
          :width="'100%'"
      />

      Have no options example

      <multi-drop-down
          v-model="testValue"
          :width="'100%'"
      />
    </div>

    <div class="description">
      <h3>Multi Drop-Down component</h3>
      <div class="description">
        <p>Custom multi drop down with specific params</p>
        Right click on drop down clear modelValue
        <p><b>Props:</b></p>
        <p><u>modelValue:</u> Set</p> v-model option
        <p><u>options:</u> Array</p> list of values
        <p><u>placeholder:</u> String</p> display when value don`t select
        <p><u>noOptionsText:</u> String</p> text witch display of list of options is empty
        <p><u>width:</u> Number</p> width of component
        <p><u>buttonOptionsGap: </u>Number</p> gap (in pixels) between options
      </div>
    </div>
  </div>
</template>

<script>
import MultiDropDown from '@/components/inputs/drop-down/MultiDropDown.vue';

export default {
  name: 'DropDownView',
  components: {
    MultiDropDown
  },
  data() {
    return {
      testValue: null,
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