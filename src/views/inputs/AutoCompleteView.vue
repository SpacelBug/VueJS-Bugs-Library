<template>
  <div class="component-view">
    <div class="component-variants">
      <auto-complete :completeOptions="completeOptions"></auto-complete>
    </div>
    <div class="description">
      <h3>Auto Complete component</h3>
      Input component with autocomplete options.
      <p><b>props:</b></p>
      <p><u>completeOptions:</u></p>
      <p><u>maxHeight:</u></p>
    </div>
  </div>
</template>
<script>
import AutoComplete from '@/components/inputs/AutoComplete.vue';

export default {
  name: "CheckBoxView",
  components: {
    AutoComplete,
  },
  data() {
    return {
      completeOptions: [
        'some text with some information', 
        'and some another text with different information',
        'some extra super different text',
        'some extra super different text',
        'some extra super different text',
        'some extra super different text',
        'some extra super different text',
        'some extra super different text'
      ]
    }
  }
}
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
}

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>