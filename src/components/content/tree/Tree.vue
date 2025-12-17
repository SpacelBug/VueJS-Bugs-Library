<template>
  <div class="tree-box">
    <TreeNode
        v-for="node in nodes"
        class="node"
        :node="node"
        :checkable="checkable"
        @change="$emit('change', (node) => $emit('change', node))"
    />
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue';

/**
 * Vue js tree component
 * @nodes
 */
export default {
  name: "Tree",
  emits: ['nodeClick', "change"],
  components: {
    TreeNode,
  },
  props: {
    /**
     * Array of Objects.
     * - Each object represents a node in the tree.
     * - Each node could have checked property and nested nodes.
     * ```js
     * [
     *  {name: 'node name'}, 
     *  {name: 'node name'}, 
     *  {name: 'node name', nodes: [
     *    {name: 'nested node name'}, 
     *    {name: 'nested node name'}, 
     *    {name: 'nested node name'}
     *  ]}
     * ]
     * ```
     */
    nodes: { type: [Object], required: true },
    /**
     * Adding checkbox for every node
     * @values true, false
     */
    checkable: { type: Boolean, default: false },
  },
  data() {
    return {
      checkedNodes: [],
    }
  },
  methods: {
    /**
     * Return last checked nodes in tree
     */
    getLastCheckedNodes(nodes=null) {
      if (nodes === null) {
        nodes = this.nodes
      }
      
      let checked = []
      
      for (let node of nodes) {
        if (node.hasOwnProperty('nodes')) {
          checked = this.getLastCheckedNodes(node.nodes)
        } else if (node.checked) {
          checked.push(node)
        }
      }
      
      return checked
    }
  }
}
</script>

<style scoped>
.tree-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>