<template>
  <div class="component-view">
    <Switch v-model="testValue" />
    <div class="description">
      <h3>Switch component</h3>
      <div class="description">
        <p>Component return bool value.</p>
        <p><b>Props:</b></p>
        <p>modelValue: </p>
        <p>roundHeight: </p>
      </div>
    </div>
  </div>
</template>

<script>
import Switch from '@/components/inputs/Switch.vue';

export default {
  name: 'SwitchView',
  components: {
    Switch
  },
  data() {
    return {
      testValue: false
    }
  }
};
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>