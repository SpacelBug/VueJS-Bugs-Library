<template>
  <div class="component-view">
    <div class="component-various">
      <AreaInput v-model="value" />
      <AreaInput
          v-model="value"
          style="width: 400px;"
      />
    </div>

    <div class="description">
      <h3>Area text input component</h3>
      <div class="description">
        <p>Component for work with long string and multi string</p>
        <p><b>Props:</b></p>
        <p><u>modelValue: </u>for v-model</p>
        <p><u>placeholder: </u>Text displayed on empty area</p>
        <p><u>unwrappedHeight: </u>Height of element after focus</p>
      </div>
    </div>
  </div>
</template>

<script>
import AreaInput from '@/components/inputs/AreaInput.vue';

export default {
  name: "AreaInputView",
  components: {
    AreaInput,
  },
  data() {
    return {
      value: 'Hello world'
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
</style>