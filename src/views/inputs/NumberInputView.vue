<template>
  <div class="component-view">
    <div class="component-various">
      <div class="component-variant">
        Simple
        <NumberInput
            v-model="values[0]"
            @focusin="focused[0] = true"
            @focusout="focused[0] = false"
        />
      </div>
      <div class="component-variant">
        Simple style="width: 100px"
        <NumberInput
            v-model="values[1]"
            @focusin="focused[1] = true"
            @focusout="focused[1] = false"
            style="width: 100px"
        />
      </div>
      <div class="component-variant">
        With fitContent="True"
        <NumberInput
            v-model="values[2]"
            :fitContent="true"
            @focusin="focused[2] = true"
            @focusout="focused[2] = false"
        />
      </div>
      <div class="component-variant">
        With fitContent="True", min="0", max="100"
        <NumberInput
            v-model="values[3]"
            :fitContent="true"
            @focusin="focused[3] = true"
            @focusout="focused[3] = false"
            :min="0"
            :max="100"
        />
      </div>
    </div>

    <div class="components-data-box">
      value: {{ values }}
      focused: {{ focused }}
    </div>

    <div class="description">
      <h3>Number input component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p><b>modelValue:</b> Number</p>
        v-model prop
        <p><b>fitContent:</b> Boolean</p>
        if True, component will stretching for value
        <p><b>min:</b> Number</p>
        min value
        <p><b>max:</b> Number</p>
        max value
      </div>
    </div>
  </div>
</template>

<script>
import NumberInput from '@/components/inputs/NumberInput.vue';

export default {
  name: "NumberInputView",
  components: {
    NumberInput,
  },
  data() {
    return {
      values: [0, 0, 0, 0],
      focused: [false, false, false, false],
    }
  }
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

.component-various {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>