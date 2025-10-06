<template>
  <div class="track">
    <div
        :class="['round', { 'disabled': !modelValue, 'active': modelValue }]"
        @click="$emit('update:modelValue', !modelValue)"
    />
  </div>
</template>

<script>
export default {
  name: 'Switch',
  data() {
    return {
      roundHeight: {type: Number, default: 30},
    }
  },
  props: {
    modelValue: { type: Boolean, default: false, required: true },
  },
};
</script>
<style scoped>
.track {
  position: relative;
  height: v-bind(roundHeight + 'px');
  min-width: v-bind((roundHeight * 2) + 'px');
  background-color: var(--panels-color);
  border-radius: v-bind(roundHeight + 'px');
  padding: 5px;
}

.round {
  position: absolute;
  cursor: pointer;
  border-radius: 100%;
  aspect-ratio: 1/1;
  height: v-bind(roundHeight + 'px');
  transition: all ease 0.3s;
}

.disabled {
  left: 5px;
  background-color: var(--accent-color);
  filter: grayscale(1);
}

.active {
  left: v-bind(roundHeight + 'px');
  background-color: var(--accent-color);
}
</style>