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
        :indeterminate="node.checked === 'indeterminate'"
        :title="node.checked"
        ref="node"
    />

    <div class="node-name">
      {{ node.name }}
    </div>

    <div
        v-show="isShowNested && node.nodes"
        class="nested-nodes"
    >
      <TreeNode
          v-for="nestedNode in node.nodes"
          ref="nestedNodes"
          :node="nestedNode"
          :parentNode="node"
          :depth="depth + 1"
          :checkable="checkable"
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
  props: {
    node: { required: true },
    parentNode: { type: Object },
    checkable: { type: Boolean },
    /**
     * nested position
     */
    depth: { type: Number, default: 0 },
  },
  data() {
    return {
      isShowNested: false,
      parentWatcherLock: false,
    }
  },
  mounted() {
    if (this.checkable) {
      if (!this.node.hasOwnProperty('checked')) {
        this.node.checked = false
      }
    }
  },
  computed: {
    nodeStatus() {
      return this.node.checked
    },
    nodeParentStatus() {
      if (this.parentNode) {
        return this.parentNode.checked
      }
    },
    sameLevelNodesStatus() {
      let statuses = new Set()

      if (this.parentNode && this.parentNode.nodes) {
        for (let node of this.parentNode.nodes) {
          statuses.add(node.checked)
        }

        if (statuses.size > 1) {
          return 'indeterminate'
        }
      }

      if (statuses.has(true)) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    async nodeStatus() {
      console.debug('node was changed: ', this.node)
      console.debug('same level statuses: ', this.sameLevelNodesStatus)

      await (this.parentWatcherLock = true)

      if (this.parentNode) {
        console.debug('set parent status')
        this.parentNode.checked = this.sameLevelNodesStatus
      }

      await (this.parentWatcherLock = false)
    },
    nodeParentStatus() {
      console.debug('node parent was changed: ', this.node)

      if ((this.parentNode.checked !== 'indeterminate') && !this.parentWatcherLock) {
        this.node.checked = this.parentNode.checked
      }
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