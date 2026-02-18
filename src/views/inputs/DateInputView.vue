<template>
  <div class="component-view">
    <div class="component-variants">
      <DateInput v-model="value" />
      <DateInput v-model="value" :accuracy="'month'" style="width: 200px;"/>
      <DateInput v-model="value" :accuracy="'years'" />
    </div>

    <div class="description">
      <h3>Date Input component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p><b>modelValue:</b> v-model prop</p>
        <p><b>accuracy:</b></p>
      </div>
    </div>
  </div>
</template>

<script>
import DateInput from '@/components/inputs/DateInput.vue'

export default {
  name: "DateInputView",
  components: {
    DateInput,
  },
  data() {
    return {
      value: new Date()
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

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>