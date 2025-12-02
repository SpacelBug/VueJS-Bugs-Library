<template>
  <div
      class="main-box"
      @focusin="isShowOptions = true"
      @focusout="isShowOptions = false"
      @mousedown.right.prevent
      ref="main"
      tabindex="-1"
  >
    <div
        class="selected"
        ref="selected"
        @click.right.prevent="$emit('update:modelValue', null)"
    >
      <div
          v-if="modelValue"
          class="selected-option"
      >
        {{ modelValue }}
      </div>
      <div
          v-else
          class="placeholder"
      >
        {{ placeholder }}
      </div>
      <div class="arrow-head" />
    </div>
    <transition name="fade">
      <div
          class="options"
          v-show="isShowOptions"
      >
        <div
            v-for="(option, index) in options"
            :key="index"
            class="option"
            @click="$emit('update:modelValue', option); $refs.main.blur()"
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
  /**
   * Drop Down element
   * ---
   * Have 3 different types: single, multi, filtering
   */
  name: 'DropDown',
  props: {
    // Values
    modelValue: null,
    options: { type: Array, default: [] },
    // Type of select
    type: {
      type: String, default: 'single', validator: (value) => {
        return ['single', 'multi', 'filtering'].includes(value)
      }
    },
    // Text fields
    placeholder: { type: String, default: 'select value' },
    noOptionsText: { type: String, default: 'have no options' },
    // Size
    width: { type: [Number], default: null },
    buttonOptionsGap: {type: Number, default: 8}
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
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  background-color: var(--panels-color);
  border-radius: 5px;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
}

.placeholder {
  opacity: 0.5;
}

.options {
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  background-color: var(--panels-color);
  border-radius: 5px;
  padding: 4px 16px;
  gap: 4px;
  width: 100%;
  height: fit-content;
  top: v-bind((top + buttonOptionsGap) + 'px');
  white-space: nowrap;
}

.option {
  cursor: pointer;
}

.option:hover {
  color: var(--accent-color);
}

/*Animation*/

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>