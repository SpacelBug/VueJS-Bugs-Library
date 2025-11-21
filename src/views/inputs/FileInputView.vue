<template>
  <div class="component-view">
    <FileInput
        v-model="file"
        style="width: 200px;"
    />
    <FileInput
        v-model="file"
        :accept="'.png,.jpg'"
        :view="'full'"
    />
    <FileInput
        v-model="file"
        :view="'short'"
    />
    <div class="description">
      <h3>File input component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p><b>modelValue:</b> v-model prop</p>
        <p><b>accept:</b> files extensions accepted by the input</p>
        <p><b>view:</b> view type of component (default, full, short) </p>
      </div>
    </div>
  </div>
</template>

<script>
import FileInput from '@/components/inputs/file/FileInput.vue';

export default {
  name: 'fileInputView',
  components: {
    FileInput
  },
  data() {
    return {
      file: null
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