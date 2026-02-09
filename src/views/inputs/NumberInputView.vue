<template>
  <div class="component-view">
    <div class="component-various">
      <NumberInput
          v-model="values[0]"
          @focusin="focused[0] = true"
          @focusout="focused[0] = false"
      />
      <NumberInput
          v-model="values[1]"
          :fitContent="true"
          @focusin="focused[1] = true"
          @focusout="focused[1] = false"
      />
      <NumberInput
          v-model="values[2]"
          :fitContent="true"
          @focusin="focused[2] = true"
          @focusout="focused[2] = false"
          :min="0"
          :max="100"
      />
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
        <p><b>modelValue:</b> v-model prop</p>
        <p><b>fitContent:</b> </p>
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
      values: [0, 0, 0],
      focused: [false, false, false],
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
  flex-direction: row;
  gap: 16px;
}
</style>