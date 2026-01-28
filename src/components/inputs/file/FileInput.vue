<template>
  <div class="main-box">
    <input
        type="file"
        hidden
        ref="fileInput"
        :accept="accept"
        @change="openFile"
    >
    <div :class="['file-input', { 'short-file-input': view === 'short', 'full-file-input': view === 'full' }]">
      <button
          :class="{'full': view === 'full' }"
          @click="$refs.fileInput.click()"
      >
        <div class="plus-icon"></div>
      </button>
      <div
          v-if="view !== 'short'"
          class="file-description"
      >
        <div
            v-if="modelValue"
            class="fileName"
            :title="modelValue.name"
        > {{ modelValue.name }} </div>
        <div
            v-else
            class="placeholder"
        >No file chosen</div>
        <small>{{ accept }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileInput',
  props: {
    modelValue: {
      type: File,
      default: null
    },
    /**
     * Accepted file types
     */
    accept: {
      type: String,
      default: ''
    },
    /**
     * View type of the file input component
     */
    view: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'full', 'short'].includes(value)
    }
  },
  methods: {
    openFile(event) {
      this.$emit('update:modelValue', event.target.files[0])
    }
  }
}
</script>

<style scoped>
.main-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  background-color: var(--panels-color);
  border-radius: 5px;
  height: fit-content;
  padding: 8px 16px;
  white-space: nowrap;
}

.file-input {
  display: grid;
  grid-template-columns: 30px minmax(0, 100%);
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
  width: 100%;
}

.full-file-input {
  grid-template-columns: 50px auto;
}

.short-file-input {
  grid-template-columns: 30px;
}

.file-description {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
}

.fileName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-self: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  color: var(--font-color);
  background-color: var(--background-color);
}

.full {
  height: 50px;
  width: 50px;
}

.plus-icon {
  mask-image: url("./plus-icon.svg");
  mask-size: contain;
  background-color: var(--font-color);
  height: 100%;
  aspect-ratio: 1/1;
}
</style>