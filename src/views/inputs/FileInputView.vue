<template>
  <div class="component-view">
    <FileInput v-model="file" />
    <div class="description">
      <h3>File input component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p>modelValue: </p>
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