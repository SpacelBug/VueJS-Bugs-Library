<template>
  <div class="node">
    <div class="icon-box">
      <div
          v-if="node[nodesListKeyName]"
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
        v-show="isShowNested && node[nodesListKeyName]"
        class="nested-nodes"
    >
      <TreeNode
          v-for="nestedNode in node[nodesListKeyName]"
          ref="nestedNodes"
          :node="nestedNode"
          :parentNode="node"
          :collapsed="collapsed"
          :depth="depth + 1"
          :checkable="checkable"
          :nodesKeyNames="nodesKeyNames"
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
    collapsed: {type: Boolean},
    
    nodesKeyNames: { type: Array, default: null },
  },
  data() {
    return {
      isShowNested: !this.collapsed,
      parentWatcherLock: false,
    }
  },
  mounted() {
    if (this.checkable) {
      /**
       * Add keys for checkable nodes
       */
      if (!this.node.hasOwnProperty('checked')) {
        this.node.checked = false
      }
    }
  },
  computed: {
    nodesListKeyName() {
      if (this.nodesKeyNames) {
        return[this.nodesKeyNames[this.depth]]
      } else {
        return ['nodes']
      }
    },
    /**
     * Need for watcher of node changes
     */
    nodeStatus() {
      return this.node.checked
    },
    /**
     * Need for watcher of parent node changes
     */
    nodeParentStatus() {
      if (this.parentNode) {
        return this.parentNode.checked
      }
    },
    /**
     * Compute sum of statuses
     */
    sameLevelNodesStatus() {
      let statuses = new Set()

      let parentNodesListKeyName = this.nodesKeyNames ? this.nodesKeyNames[this.depth - 1] : 'nodes'

      if (this.parentNode && this.parentNode[parentNodesListKeyName]) {
        for (let node of this.parentNode[parentNodesListKeyName]) {
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
    /**
     * Watch on node status
     */
    async nodeStatus() {
      // Lock parent node watcher (fix recursive)
      await (this.parentWatcherLock = true)
      // Set parent node status 
      if (this.parentNode) {
        this.parentNode.checked = this.sameLevelNodesStatus
      }
      // Unlock parent node watcher 
      await (this.parentWatcherLock = false)
    },
    /**
     * Watch on parent node status
     */
    nodeParentStatus() {
      // Change node status after changing parent status, if it wasn`t blocked
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