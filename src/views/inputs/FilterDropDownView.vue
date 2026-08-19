<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <div class="caption">Const width by setting width prop = 200</div>
        <filter-drop-down
            v-model="selectedOption"
            :options="options"
            :width="200"
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
    </div>
    <div class="description">
      <h3>Filter Drop-Down component</h3>
      <div>
        <p>Custom drop down with input for filter options</p>
        Right click on drop down clear modelValue
        <p><b>Props:</b></p>
        <p><u>modelValue:</u> String</p> v-model option
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
        { value: "1", label: "Cat" },
        { value: "2", label: "Frog" },
        { value: "3", label: "Whale" },
        { value: "4", label: "Dog" }
      ],
      selectedOption: null,
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
