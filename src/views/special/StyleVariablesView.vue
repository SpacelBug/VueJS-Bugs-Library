<template>
  <div class="component-view">
    <StyleVariables />
    <div class="description">
      <h3>Style Variables</h3>
      Show and let changing style variables
      <p><b>Props:</b></p>
      <p><u>variablePrefix:</u> (default = "--")</p>
      <p><u>excludeSubString:</u> (default = "vue")</p>
    </div>
  </div>
</template>

<script>
import StyleVariables from '@/components/special/StyleVariables.vue';

export default {
  name: 'StyleVariablesView',
  components: {
    StyleVariables
  },
}
</script>

<style>

.component-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.description {
  width: 400px;
}

</style>