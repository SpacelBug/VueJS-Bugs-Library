<template>
  <div
      class="main-box"
      @mousedown.right.prevent
      :title="selectedOption"
      ref="main"
      tabindex="-1"
  >
    <div
        class="selected"
        ref="selected"
        @click.right.prevent="updateModelValue(null)"
    >
      <input
          :value="isShowOptions ? inputtedValue : getLabel(selectedOption)"
          :placeholder="placeholder"
          @input="inputtedValue = $refs.input.value"
          @focusin="isShowOptions = true, inputtedValue = getLabel(selectedOption)"
          @focusout="isShowOptions = false"
          ref="input"
          class="selected-option"
      >
      <div
          @mousedown.prevent
          @click.self.prevent="isShowOptions ? $refs.input.blur() : $refs.input.focus()"
          :class="['arrow-head', { 'rotated': isShowOptions }]"
      />
    </div>
    <transition name="fade">
      <div
          class="options"
          v-show="isShowOptions"
      >
        <div
            v-if="emptyOptionText"
            class="option empty-option"
            @click="$emit('update:modelValue', null); $refs.main.blur()"
        >
          {{ emptyOptionText }}
        </div>
        <div
            v-for="(option, index) in filteredOptions"
            :key="index"
            :class="['option', { 'highlight': keyboardSelectedOptionIndex === index }]"
            @mousedown.prevent
            @click="updateModelValue(option); $refs.input.blur(); isShowOptions = false"
        >
          {{ getLabel(option) }}
        </div>
        <div
            v-if="(filteredOptions === null) || (filteredOptions.length === 0)"
            class="empty"
        >
          {{ noOptionsText }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  emits: ['update:modelValue', 'update:value'],
  props: {
    // Values
    modelValue: { type: [String, Number, Object, null], default: null },
    value: { type: [String, Number, null], default: null },
    // Specific keys for work with objects
    labelKey: { type: [Number, String], default: "label" }, // values by this key will be show in drop-down
    valueKey: { type: [Number, String], default: null }, // value by this keu will be return by v-model:value
    //  Variants for drop=down values
    options: {
      type: Array,
      default: [],
      validator(options) {
        let types = new Set()

        for (const option of options) {
          types.add(typeof option)
        }

        if (types.size > 1) {
          console.error('The "options" parameter must be uniform')
          return false
        }

        return true
      },
    },
    // Text fields
    placeholder: { type: String, default: 'select value' },
    emptyOptionText: { type: String, default: null },
    noOptionsText: { type: String, default: 'have no options' },
    // Size
    width: { type: [Number, String], default: null },
    buttonOptionsGap: { type: Number, default: 8 },
    // 
    disabled: { type: Boolean, default: false },
    registerIsImportant: {type: Boolean, default: false}
  },
  computed: {
    /**
     * Dropped part top pos 
     */
    top() {
      return this.$refs.selected.getBoundingClientRect().height
    },
    computedWidth() {
      return this.width === null ? 'fit-content' : this.width + 'px'
    },
    filteredOptions() {
      if (this.inputtedValue) {
        const filtered = []

        for (const value of this.options) {
          if (this.registerIsImportant) {
            if (typeof value === "object") {
              value[this.labelKey].includes(this.inputtedValue) ? filtered.push(value) : null
            } else {
              value.includes(this.inputtedValue) ? filtered.push(value) : null
            }
          } else {
            if (typeof value === "object") {
              value[this.labelKey].toLocaleLowerCase().includes(this.inputtedValue.toLocaleLowerCase()) ? filtered.push(value) : null
            } else {
              value.toLocaleLowerCase().includes(this.inputtedValue.toLocaleLowerCase()) ? filtered.push(value) : null
            }
          }
        }

        return filtered
      } else {
        return this.options
      }
    }
  },
  data() {
    return {
      isShowOptions: false,
      selectedOption: null,
      keyboardSelectedOptionIndex: -1,
      inputtedValue: null,
    }
  },
  mounted() {
    this.selectedOption = this.modelValue
    if (this.value && this.valueKey) {
      this.setDefaultByKeyedValue(this.valueKey, this.value)
    }
  },
  watch: {
    modelValue(value) {
      this.selectedOption = value
      if (this.valueKey) {
        this.$emit("update:value", value ? this.selectedOption[this.valueKey] : null)
      }
    },
    value(value) {
      if ((this.value !== null) && (this.valueKey !== null)) {
        this.setDefaultByKeyedValue(this.valueKey, this.value)
      }
    },
    isShowOptions(value) {
      if (value) {
        document.addEventListener('keydown', this.onKeyPress)
      } else {
        document.removeEventListener('keydown', this.onKeyPress)
      }
    }
  },
  methods: {
    onKeyPress() {
      if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(event.code)) {
        event.preventDefault()

        if ((event.code === 'ArrowDown') && (this.keyboardSelectedOptionIndex !== (this.options.length - 1))) {
          this.keyboardSelectedOptionIndex++
        }
        if ((event.code === 'ArrowUp') && (this.keyboardSelectedOptionIndex !== 0)) {
          this.keyboardSelectedOptionIndex--
        }

        if (event.code === 'Enter') {
          if (this.filteredOptions.length === 1) {
            this.$emit('update:modelValue', this.filteredOptions[0])
            this.$refs.input.blur()
          } else if ((this.filteredOptions.length > 1) && (this.keyboardSelectedOptionIndex !== -1)) {
            this.$emit('update:modelValue', this.filteredOptions[this.keyboardSelectedOptionIndex])
            this.$refs.input.blur()
          }
        }

        if (event.code === 'Escape') {
          this.$refs.input.blur()
        }
      }
    },
    updateModelValue(value) {
      this.$emit('update:modelValue', value)

      if ((this.valueKey !== null) && (typeof value === "object")) {
        this.$emit('update:value', value ? value[this.valueKey] : null)
      }
    },
    getLabel(value) {
      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        return value[this.labelKey]
      } else {
        return value
      }
    },
    setDefaultByKeyedValue(key, value) {
      for (let option of this.options) {
        if (option[key] === value) {
          this.selectedOption = option
          this.updateModelValue(option)
          break
        }
      }
    }
  }
};
</script>
<style scoped>
.main-box {
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  width: v-bind(computedWidth);
}

.selected {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  background-color: var(--panels-color);
  border-radius: 5px;
  width: 100%;
  min-width: 100%;
  height: fit-content;
  box-sizing: border-box;
}

.selected-option {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.placeholder {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.5;
}

.options {
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--panels-color);
  border-radius: 5px;
  padding: 4px 16px;
  gap: 4px;
  width: 100%;
  min-width: fit-content;
  height: fit-content;
  top: v-bind((top + buttonOptionsGap) + 'px');
  white-space: nowrap;
}

.empty-option {
  opacity: 0.5;
}

.option {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  gap: 16px;
  width: 100%;
}

.highlight {
  color: var(--accent-color);
  opacity: 0.7;
}

.option:hover {
  color: var(--accent-color);
}

.reserved-option-place {
  width: 10px;
  height: 10px;
  background-color: aliceblue;
}

.arrow-head {
  mask-image: url("@/assets/icons/SmallArrowHead.svg");
  mask-size: contain;
  background-color: var(--font-color);
  height: 20px;
  width: 20px;
}

.rotated {
  rotate: 180deg;
}

input {
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--font-color);
  font-size: inherit;
  width: 100%;
  height: 100%;
}

/*Animation*/

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>