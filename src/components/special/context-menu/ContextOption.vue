<template>
  <div
      class="option"
      ref="option"
      @mouseleave="showNested = false"
      @mouseenter="showNested = true"
  >
    <div class="option-name" @click="$emit('optionClick', option)">
      {{ option.name }}
      <span v-if="option.hasOwnProperty('options')"> - </span>
    </div>
    <div
        v-if="option.hasOwnProperty('options') && showNested"
        class="nested-options"
        :style="`${nestedDrawStartFrom}: 100%;`"
    >
      <ContextOption
          v-for="nestedOption in option.options"
          :option="nestedOption"
          :orientation-horizontal="orientationHorizontal"
          @option-click="$emit('optionClick', nestedOption)"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContextOption',
  emits: ['optionClick'],
  props: {
    option: { type: Object, required: true },

    orientationHorizontal: { type: String }
  },
  computed: {
    nestedDrawStartFrom() {
      if (this.orientationHorizontal === 'toLeft') return 'left'
      if (this.orientationHorizontal === 'toRight') return 'right'
    }
  },
  data() {
    return {
      showNested: false,
    };
  },
};
</script>
<style scoped>
.option {
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  padding: 4px 32px 4px 16px;
}

.option:hover {
  color: var(--accent-color);
}

.nested-options {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 16px 0 16px 0;
  background-color: var(--panels-color);
  border-radius: 5px;
  color: var(--font-color);
}
</style>