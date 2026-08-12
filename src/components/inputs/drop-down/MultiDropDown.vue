<template>
  <div
      class="main-box"
      @focusin="isShowOptions = true"
      @focusout="isShowOptions = false"
      @mousedown.right.prevent
      :title="modelValue"
      ref="main"
      tabindex="-1"
  >
    <div
        class="selected"
        ref="selected"
        @click.right.prevent="$emit('update:modelValue', null)"
        @mousedown.left.prevent="isShowOptions ? $refs.main.blur() : $refs.main.focus()"
    >
      <div
          v-if="modelValue && modelValue.size"
          class="selected-options"
      >
        {{ [...modelValue].join(", ") }}
      </div>
      <div
          v-else
          class="placeholder"
      >
        {{ placeholder }}
      </div>
      <div :class="['arrow-head', { 'rotated': isShowOptions }]" />
    </div>
    <transition name="fade">
      <div
          class="options"
          v-if="isShowOptions"
      >
        <div
            v-for="(option, index) in options"
            :key="index"
            :class="['option', { 'highlight': keyboardSelectedOptionIndex === index, 'marked':  modelValue.has(option) }]"
            @click="onOptionClick(option)"
        >
          {{ option }}
        </div>
        <div
            v-if="options.length === 0"
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
  props: {
    // Values
    modelValue: { type: Set, default: new Set()},
    options: { type: Array, default: [] },
    // Text fields
    placeholder: { type: String, default: 'select value' },
    noOptionsText: { type: String, default: 'have no options' },
    // Size
    width: { type: [Number], default: null },
    buttonOptionsGap: { type: Number, default: 8 }
  },
  beforeMount() {
    if (this.modelValue === null) {
      this.$emit('update:modelValue', new Set())
    }
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
    }
  },
  data() {
    return {
      isShowOptions: false,
      keyboardSelectedOptionIndex: -1,
    }
  },
  watch: {
    isShowOptions(value) {
      if (value) {
        document.addEventListener('keydown', this.onKeyPress)
      } else {
        document.removeEventListener('keydown', this.onKeyPress)
      }
    }
  },
  methods: {
    onOptionClick(option) {
      if (this.modelValue.has(option)) {
        this.modelValue.delete(option)
      } else {
        this.modelValue.add(option)
      }
    },
    onKeyPress() {
      if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.code)) {
        event.preventDefault()

        if ((event.code === 'ArrowDown') && (this.keyboardSelectedOptionIndex !== (this.options.length - 1))) {
          this.keyboardSelectedOptionIndex++
        }
        if ((event.code === 'ArrowUp') && (this.keyboardSelectedOptionIndex !== 0)) {
          this.keyboardSelectedOptionIndex--
        }

        if (event.code === 'Enter') {
          this.$emit('update:modelValue', this.options[this.keyboardSelectedOptionIndex])
          this.$refs.main.blur()
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

.selected-options {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
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

.marked {
  color: var(--accent-color);
}

.option:hover {
  color: var(--accent-color);
  opacity: 0.7;
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
  min-height: 20px;
  width: 20px;
  min-width: 20px;
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