<template>
  <div class="component-view">
    <div class="component-various">
      <NumberInput
          v-model="value"
          @focusin="focused = true"
          @focusout="focused = false"
      />
      <NumberInput
          v-model="value"
          :fitContent="true"
          @focusin="focused = true"
          @focusout="focused = false"
      />

      {{ focused }}
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
      value: 0,
      focused: false,
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