<template>
  <div class="tree-box">
    <TreeNode
        v-for="node in nodes"
        class="node"
        :node="node"
        :checkable="checkable"
    />
  </div>
</template>

<script>
import { toRaw } from 'vue';
import TreeNode from './TreeNode.vue';

/**
 * Vue js tree component
 * @nodes
 */
export default {
  name: "Tree",
  emits: ["change"],
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
  watch: {
    nodes: {
      handler: function () {
        this.$emit('change', this.getLastCheckedNodes(structuredClone(toRaw(this.nodes))))
      }, deep: true
    }
  },
  methods: {
    /**
     * Return last checked nodes in tree
     */
    getLastCheckedNodes(nodes) {
      let checked = []

      while (nodes.length) {
        for (let index in nodes) {
          if (nodes[index].hasOwnProperty('nodes')) {
            nodes = nodes.concat(nodes[index].nodes)
          } else if (nodes[index].checked) {
            checked.push(nodes[index])
          }
          nodes.splice(index, 1)
        }
      }

      return checked
    }
  },
}
</script>

<style scoped>
.tree-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>