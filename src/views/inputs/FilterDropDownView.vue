<template>
  <div class="component-view">
    <div class="component-variants">

      <h3>Options is list of values</h3>

      <div class="component-variant">
        <div class="caption">Const width by setting width prop = 200</div>
        <filter-drop-down
            v-model="selectedOption"
            :options="options"
            :width="200"
        />
      </div>
      <div class="component-variant">
        <div class="caption">Register is important</div>
        <filter-drop-down
            v-model="selectedOption"
            :options="options"
            :width="200"
            :register-is-important="true"
            :uppercase="true"
        />
      </div>
      <div class="component-variant">
        <div class="caption">Default width with emptyOptionText = 'unselect'</div>
        <filter-drop-down
            v-model="selectedOption"
            :options="options"
            :emptyOptionText="'unselect'"
        />
      </div>
      <div class="component-variant">
        <div class="caption">Full width by setting width prop = 100%</div>
        <filter-drop-down
            v-model="selectedOption"
            :options="options"
            :width="'100%'"
        />
      </div>

      <p><b>Result:</b> {{ selectedOption }}</p>

      <h3>Options is list of objects</h3>

      <div class="component-variant">
        <div class="caption">Simple example</div>
        <filter-drop-down
            v-model="selectedObjectOption"
            v-model:value="selectedObjectValue"
            :value-key="'name'"
            :options="objectOptions"
            :width="'100%'"
        />
        <p><b>Result option:</b> {{ selectedObjectOption }}</p>
        <p><b>Result value:</b> {{ selectedObjectValue }}</p>
        <filter-drop-down
            v-model:value="selectedObjectValue"
            :value-key="'name'"
            :options="objectOptions"
            :width="'100%'"
        />
      </div>
    </div>

    <div class="description">
      <h3>Filter Drop-Down component</h3>
      <div>
        <p>Custom drop down with input for filter options</p>
        Right click on drop down clear modelValue
        <p><b>Props:</b></p>
        <p><u>modelValue:</u> [String, Number, Object] </p> v-model option
        <p><u>value:</u> [String, Number, Object]</p> v-model:title option
        <p><u>labelKey:</u> String</p> if option is object describe what will be display in drop down
        <p><u>valueKey:</u> String</p> if option is object describe what will be return by v-model:value
        <p><u>options:</u> Array</p> list of options. could be a simple list or list of objects
        <p><u>placeholder:</u> String</p> text witch display when value is empty
        <p><u>emptyOptionText:</u> String</p> text for option witch clear drop down
        <p><u>noOptionsText:</u> String</p> text for empty drop down
        <p><u>width:</u> [Number, String]</p> setting width. cold be a number or string, for something like "100%"
        <p><u>buttonOptionsGap:</u> Integer</p> gap between options
        <p><u>registerIsImportant:</u> Boolean</p> for filtering
      </div>
    </div>
  </div>
</template>

<script>
import FilterDropDown from "@/components/inputs/drop-down/FilterDropDown.vue"

export default {
  name: "",
  components: {
    FilterDropDown,
  },
  data() {
    return {
      options: ["Frog", "Cat", "Dog", "Whale"],
      objectOptions: [
        { value: "1", label: "Cat", name: "Tom" },
        { value: "2", label: "Frog", name: "Lance" },
        { value: "3", label: "Whale", name: "Mobbi" },
        { value: "4", label: "Dog", name: "Max" }
      ],
      selectedOption: null,
      selectedObjectOption: null,
      selectedObjectValue: null,
    }
  },
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
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.description {
  width: 400px;
}
</style>
