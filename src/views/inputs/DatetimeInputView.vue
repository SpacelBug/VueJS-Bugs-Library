<template>
  <div class="component-variants">
    <p><b>Result:</b> {{ value }}</p>
    <datetime-input v-model="value" />
    <datetime-input v-model="value" :accuracy="'minutes'"/>
  </div>
  <div class="description"></div>
</template>

<script>
import DatetimeInput from '@/components/inputs/datetime-input/DatetimeInput.vue';

export default {
  name: "DatetimeInputView",
  components: {
    DatetimeInput
  },
  data() {
    return {
      value: new Date()
    }
  }
}
</script>

<style  scoped>

</style>