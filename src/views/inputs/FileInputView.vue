<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <div class="caption">Const width by setting style: width = 200px</div>
        <FileInput
            v-model="file"
            style="width: 200px;"
        />
      </div>
      <div class="component-variant">
        <div class="caption">Full component view with accepting .png and .jpg</div>
        <FileInput
            v-model="file"
            :accept="'.png,.jpg'"
            :view="'full'"
        />
      </div>
      <div class="component-variant">
        <div class="caption">Short component view</div>
        <FileInput
            v-model="file"
            :view="'short'"
        />
      </div>
      <div class="component-variant">
        <div class="caption">Short component view without padding (style="padding: 0")</div>
        <FileInput
            v-model="file"
            :view="'short'"
            style="padding: 0;"
        />
      </div>
    </div>
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
  justify-content: space-between;
  gap: 16px;
}

.component-variants {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.component-variant{
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>