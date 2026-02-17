<template>
  <div class="component-view">
    <div class="component-variants">
      <DateInput v-model="value" />
      <DateInput v-model="value" :accuracy="'month'" />
      <DateInput v-model="value" :accuracy="'years'" />
    </div>

    <div class="description">
      <h3>Date Input component</h3>
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