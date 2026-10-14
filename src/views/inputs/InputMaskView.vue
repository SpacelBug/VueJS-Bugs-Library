<template>
  <div class="component-view">
    <div class="components-variants">
      <div class="component-variant">
        Setting mask with default maskChar
        <InputMask
            v-model="value"
            :mask="'999-999-99-99'"
        />
     </div>
      <div class="component-variant">
        Setting mask with maskChar="0" and style="width: 500px"
        <InputMask
            v-model="value"
            :mask="'00:00:00'"
            :maskChar="'0'"
            style="width: 500px"
        />
      </div>
    </div>

    <div class="description">
      <h3>Masked Input Examples</h3>
      Input component with mask functionality.
      <p><b>props:</b></p>
      <p><u>modelValue:</u> String</p>
      used for v-model
      <p><u>maskChar:</u> String (default: 9)</p>
      char using for writing mask
      <p><u>mask:</u> String (required)</p>
      mask string with maskChar
    </div>
  </div>
</template>

<script>
import InputMask from '@/components/inputs/MaskedInput.vue';

export default {
  name: "InputMaskView",
  components: {
    InputMask,
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>

<style>
.component-view {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 16px;
}

.components-variants {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.description {
  width: 500px;
}
</style>