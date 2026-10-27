<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="grouped-variants">
        <h3>With v-model Date</h3>

        <p><b>Result:</b> {{ value.toLocaleDateString() }} {{ value.toLocaleTimeString() }}</p>

        <DateInput v-model="value" />

        <DateInput
            v-model="value"
            :accuracy="'month'"
            style="width: 200px"
        />

        <DateInput
            v-model="value"
            :accuracy="'years'"
        />

      </div>

      <div class="grouped-variants">
        <h3>With v-model null</h3>

        <p><b>Result:</b> {{ nullValue }}</p>

        <DateInput v-model="nullValue" />

        <DateInput
            v-model="nullValue"
            :accuracy="'month'"
        />

        <DateInput
            v-model="nullValue"
            :accuracy="'years'"
        />

      </div>

      <div class="grouped-variants">
        <h3>With input panel and v-model Date</h3>

        <p><b>Result:</b> {{ value }}</p>

        <DateInput
            v-model="value"
            :keyboard-input="true"
        />

        <DateInput
            v-model="value"
            :accuracy="'month'"
            :keyboard-input="true"
        />

        <DateInput
            v-model="value"
            :accuracy="'years'"
            :keyboard-input="true"
        />
      </div>

      <div class="grouped-variants">
        <h3>With input panel and v-model null</h3>

        <p><b>Result:</b> {{ nullValue }}</p>

        <DateInput
            v-model="nullValue"
            :keyboard-input="true"
        />

        <DateInput
            v-model="nullValue"
            :accuracy="'month'"
            :keyboard-input="true"
        />

        <DateInput
            v-model="nullValue"
            :accuracy="'years'"
            :keyboard-input="true"
        />
      </div>
    </div>

    <div class="description">
      <h3>Date Input component</h3>
      <span>
        Date Input component allows to select date, month and year. It has 3 accuracy levels: date, month and years. It also has an option to input date via text.
      </span>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p><b>modelValue:</b> v-model prop</p>
        <p><b>accuracy:</b></p>
        <ul>
          <li><b>dates:</b> default, allows to select date, month and year</li>
          <li><b>month:</b> allows to select month and year</li>
          <li><b>years:</b> allows to select only year</li>
        </ul>
        <p><b>keyboard-input:</b> boolean, allows to input date via text</p>
      </div>
    </div>
  </div>
</template>

<script>
import DateInput from "@/components/inputs/date-input/DateInput.vue"
import InputsPanel from "@/components/inputs/date-input/InputsPanel.vue"

export default {
  name: "DateInputView",
  components: {
    DateInput,
    InputsPanel,
  },
  data() {
    return {
      value: new Date(new Date().setHours(0,0,0,0)),
      nativeValue: new Date(),
      nullValue: null,
      undefinedValue: undefined,
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
  width: 100%;
}

.component-variants {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-direction: row;
  gap: 16px;
  width: 100%;
}

.grouped-variants {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--border-color);
}

.description {
  display: flex;
  flex-direction: column;
  width: 500px;
  p {
    margin: 4px 0;
  }
}
</style>
