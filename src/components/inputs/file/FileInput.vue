<template>
  <div class="main-box">
    <input
        type="file"
        hidden
        ref="fileInput"
        :accept="accept"
        @change="openFile"
    >
    <div class="file-input">
      <button @click="$refs.fileInput.click()"> + </button>
      <span v-if="modelValue"> {{ modelValue.name }} </span>
      <span v-else>No file chosen</span>
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
  background-color: var(--panels-color);
  border-radius: 5px;
  height: 30px;
  padding: 8px 16px;
}

.file-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  color: var(--text-color);
  background-color: var(--background-color);
}
</style>