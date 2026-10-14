<template>
  <div
      class="main-box"
      @focusin="isShowOptions = true"
      @focusout="isShowOptions = false"
      @mousedown.right.prevent
      :title="selectedOption"
      ref="main"
      tabindex="-1"
  >
    <div 
        v-if="onlyIcon"         
        ref="selected"
        :class="['only-icon', 'arrow-head', { rotated: isShowOptions }]"
        @mousedown.left.prevent="
          isShowOptions ? $refs.main.blur() : $refs.main.focus()
        "
    />
    <div
        v-else
        class="selected"
        ref="selected"
        @click.right.prevent="updateModelValue(null)"
        @mousedown.left.prevent="
          isShowOptions ? $refs.main.blur() : $refs.main.focus()
          "
    >
      <div
          v-if="selectedOption"
          class="selected-option"
      >
        {{ getLabel(selectedOption) }}
      </div>
      <div
          v-else
          class="placeholder"
      >
        {{ placeholder }}
      </div>
      <div :class="['arrow-head', { rotated: isShowOptions }]" />
    </div>
    <transition name="fade">
      <div
          class="options"
          v-show="isShowOptions"
      >
        <div
            v-if="emptyOptionText"
            class="option empty-option"
            @click="updateModelValue(null); $refs.main.blur()"
        >
          {{ emptyOptionText }}
        </div>
        <div
            v-for="(option, index) in options"
            :key="index"
            :class="[
              'option',
              { highlight: keyboardSelectedOptionIndex === index },
            ]"
            @click="updateModelValue(option); $refs.main.blur()"
        >
          {{ getLabel(option) }}
        </div>
        <div
            v-if="options && options.length === 0"
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
  name: "DropDown",
  emits: ['update:modelValue', 'update:value'],
  props: {
    // Values
    modelValue: { type: [String, Number, Object, null], default: null },
    value: { type: [String, Number, null], default: null},
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
    placeholder: { type: String, default: "select value" },
    emptyOptionText: { type: String, default: null },
    noOptionsText: { type: String, default: "have no options" },
    onlyIcon: { type: Boolean, default: false },
    // Size
    width: { type: [Number, String], default: null },
    buttonOptionsGap: { type: Number, default: 8 },
  },
  computed: {
    /**
     * Dropped part top pos
     */
    top() {
      return this.$refs.selected.getBoundingClientRect().height
    },
    computedWidth() {
      return ((this.width === null) || this.onlyIcon) ? "fit-content" : this.width + "px"
    },
  },
  data() {
    return {
      isShowOptions: false,
      selectedOption: null,
      keyboardSelectedOptionIndex: -1,
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
        this.$emit("update:value", this.selectedOption[this.valueKey])
      }
    },
    value(value) {
      if ((this.value !== null) && (this.valueKey !== null)) {
        this.setDefaultByKeyedValue(this.valueKey, this.value)
      }
    },
    isShowOptions(value) {
      if (value) {
        document.addEventListener("keydown", this.onKeyPress)
      } else {
        document.removeEventListener("keydown", this.onKeyPress)
      }
    },
  },
  methods: {
    onKeyPress() {
      if (["ArrowUp", "ArrowDown", "Enter"].includes(event.code)) {
        event.preventDefault()

        if (
          event.code === "ArrowDown" &&
          this.keyboardSelectedOptionIndex !== this.options.length - 1
        ) {
          this.keyboardSelectedOptionIndex++
        }
        if (
          event.code === "ArrowUp" &&
          this.keyboardSelectedOptionIndex !== 0
        ) {
          this.keyboardSelectedOptionIndex--
        }

        if (event.code === "Enter") {
          this.updateModelValue(
            this.options[this.keyboardSelectedOptionIndex],
          )
          this.$refs.main.blur()
        }
      }
    },
    updateModelValue(value) {
      this.$emit('update:modelValue', value)

      if ((this.valueKey !== null) && (typeof value === "object")) {
        this.$emit('update:value', value[this.valueKey])
      }
    },
    /**
     * Gets the label for a given option based on the labelKey prop or returns the value itself if it's not an object.
     * @param value - The option value.
     */
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
    /**
     * Value should be unique, or first will be set. Use it only for list of objects. Not simple list!
     * @param key 
     * @param value 
     */
    setDefaultByKeyedValue(key, value) {
      for (let option of this.options) {
        if (option[key] === value) {
          this.selectedOption = option
          this.updateModelValue(option)
          break
        }
      }
    }
  },
}
</script>
<style scoped>
.main-box {
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  width: v-bind(computedWidth);
  border-radius: 5px;
  background-color: var(--panels-color);
}

.selected {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  width: 100%;
  min-width: 100%;
  height: fit-content;
  box-sizing: border-box;
  background-color: var(--panels-color);
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
  background-color: inherit;
  border-radius: 5px;
  padding: 4px 16px;
  gap: 4px;
  width: 100%;
  min-width: fit-content;
  height: fit-content;
  top: v-bind((top + buttonOptionsGap) + "px");
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
  mask-image: url("./ArrowHead.svg");
  mask-size: contain;
  background-color: var(--font-color);
  height: 20px;
  width: 20px;
}

.rotated {
  rotate: 180deg;
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
