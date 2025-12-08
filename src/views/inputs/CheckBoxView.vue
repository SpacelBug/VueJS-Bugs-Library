<template>
  <div class="component-view">
    <div class="component-variants">
      <check-box v-model="value" />
      <check-box v-model="valueTriState" type="tri-state" />
    </div>
    <div class="description"></div>
  </div>
</template>

<script>
import CheckBox from '@/components/inputs/check-box/CheckBox.vue';

export default {
  name: "CheckBoxView",
  components: {
    CheckBox,
  },
  data() {
    return {
      value: null,
      valueTriState: null,
    }
  }
}
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
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