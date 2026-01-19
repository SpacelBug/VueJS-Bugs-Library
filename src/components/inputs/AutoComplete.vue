<template>
  <div class="auto-complete-box">
    <input
        type="text"
        v-model="value"
        @focusin="isShowOptions = true"
        @focusout="isShowOptions = false"
        @keypress.enter="onInputEnter"
        ref="input"
        :title="value"
    >
    <div
        v-if="isShowOptions"
        class="complete-options"
    >
      <template v-for="option in sortedCompleteOptions">
        <div
            class="option"
            @mousedown="value = option"
        >
          {{ option }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "AutoComplete",
  props: {
    completeOptions: { type: Array, required: true },
  },
  data() {
    return {
      value: "",
      isShowOptions: false,
    }
  },
  computed: {
    sortedCompleteOptions() {
      let sortedOptions = []

      for(let option of this.completeOptions) {
        if ((option.indexOf(this.value) === 0) && (this.value !== option)) {
          sortedOptions.push(option)
        }
      }

      return sortedOptions
    }
  },
  methods: {
    onInputEnter() {
      if (this.sortedCompleteOptions.length === 1) {
        this.value = this.sortedCompleteOptions[0]
        this.$refs.input.blur()
      }
    }
  }
}
</script>

<style scoped>
input {
  background-color: var(--panels-color);
  border-radius: 5px;
  border: none;
  padding: 8px 16px;
  color: var(--font-color);
  outline: none;
  text-overflow: ellipsis;
}

.complete-options {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--panels-color);
  border-radius: 5px;
  max-width: 400px;
}

.option {
  cursor: pointer;
  margin: 4px 16px;
}

.option:hover {
  opacity: 0.7;
}

</style>