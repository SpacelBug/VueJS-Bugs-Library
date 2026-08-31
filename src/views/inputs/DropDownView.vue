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

      <hr>

      Work with objects

      <div class="component-wrap">
        <drop-down
            v-model="testValueObject"
            :options="testObjectOptions"
            :width="200"
            style="background-color: dimgray;"
        />
        <b>value:</b> {{ testValueObject }}
      </div>

      Check validation

      <div class="component-wrap">
        <drop-down
            v-model="testValueObject"
            :options="testObjectOptionsBroken"
            :width="200"
        />
        <b>value:</b> {{ testValueObject }}
      </div>
    </div>

    <div class="description">
      <h3>Drop-Down component</h3>
      <div class="description">
        <p>Custom drop down with specific params</p>
        <p>Right click on drop down clear modelValue</p>
        <p>Component background-color and color could be set by style attr (style="background-color: dimgray;")</p>
        <p><b>Props:</b></p>
        <p><u>modelValue:</u> String | Number | Object </p> v-model option
        <p><u>labelKey:</u> String [default="label"] </p> using when options is list of object 
        <p><u>options:</u> Array</p> list of values (could be a list of objects)
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
      testValue: null,
      testOptions: [
        'Dog',
        'Cat',
        'Frog',
        'Whale',
        'Test very long value'
      ],
      testValueObject: null,
      testObjectOptions: [
        {label: "Dog", id: 0, name: "Max"},
        {label: 'Cat', id: 1, name: "Sam"},
        {label: 'Frog', id: 2, name: "Lance"},
        {label: 'Whale', id: 3, name: "Mobbi"},
        {label: 'Test very long value', id: 4, name: null}
      ],
      testObjectOptionsBroken: [
        { label: 'Frog', id: 2, name: "Lance" },
        { label: 'Test very long value', id: 4, name: null },
        "string"
      ],
    }
  }
};
</script>

<style scoped>
hr {
  width: 100%;
}

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

.component-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}
</style>