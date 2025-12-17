<template>
  <div class="node">
    <div class="icon-box">
      <div
          v-if="node.nodes"
          :class="['icon', { 'opened': isShowNested }]"
          @click="isShowNested = !isShowNested"
      />
    </div>

    <input
        v-if="checkable"
        type="checkbox"
        v-model="node.checked"
        @change="$emit('change', node)"
    />

    <div class="node-name">
      {{ node.name }}
    </div>

    <div
        v-if="isShowNested && node.nodes"
        class="nested-nodes"
    >
      <TreeNode
          v-for="node in node.nodes"
          :node="node"
          :checkable="checkable"
          @change="$emit('change', $event)"
      />
    </div>
  </div>
</template>

<script>
/**
 * Tree node component nodes
 */
export default {
  name: "TreeNode",
  emits: ["update:modelValue", "change"],
  props: {
    node: { required: true },
    checkable: { type: Boolean },
  },
  data() {
    return {
      isShowNested: false,
    }
  },
}
</script>

<style scoped>
.icon-box {
  width: 15px;
  aspect-ratio: 1/1;
  grid-area: icon;
}

.icon {
  mask-image: url("@/assets/icons/SmallArrowHead.svg");
  mask-size: contain;
  cursor: pointer;
  background-color: var(--font-color);
  width: 100%;
  height: 100%;
  rotate: -90deg;
}

.opened {
  rotate: 0deg;
}

input {
  grid-area: checkbox;
  height: 15px;
  width: 15px;
}

.node {
  display: grid;
  align-items: center;
  grid-template: "icon checkbox name"
    "nested nested nested" auto / 15px min-content auto;
  grid-gap: 4px;
}

.node-name {
  grid-area: name;
}

.nested-nodes {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  gap: 4px;
  grid-area: nested;
}
</style>