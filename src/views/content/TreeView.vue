<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <h3>Without checkboxes</h3>
        <Tree :nodes="nodes" />
      </div>
      <div class="component-variant">
        <h3>With checkboxes</h3>
        <Tree
            :nodes="nodesWithCheckbox"
            :checkable="true"
            ref="checkboxTree"
            @change="lastCheckedNodes = $refs.checkboxTree.getLastCheckedNodes()"
        />
        last checked nodes: {{ lastCheckedNodes }}
      </div>
    </div>

    <div class="description">
      <h3>Tree component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p><u>nodes:</u> Array of objects</p>
        <p><u>checkable:</u> Boolean</p>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/content/tree/Tree.vue';

export default {
  name: "TreeView",
  components: {
    Tree,
  },
  data() {
    return {
      lastCheckedNodes: [1],
      nodes: [
        { name: 'node name 1' },
        { name: 'node name 2' },
        {
          name: 'node name 3', nodes: [
            {
              name: 'nested node 1', nodes: [
                { name: 'nested nested 1' },
                { name: "nested nested 2" },
              ]
            },
            { name: 'nested node 2' },
          ]
        },
      ],
      nodesWithCheckbox: [
        { name: 'node name 1' },
        { name: 'node name 2' },
        {
          name: 'node name 3', nodes: [
            {
              name: 'nested node 1', nodes: [
                { name: 'nested nested 1' },
                { name: "nested nested 2" },
              ]
            },
            { name: 'nested node 2' },
          ]
        },
      ],
    }
  },
}
</script>

<style scoped>
.component-view {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 32px;
}

.component-variants {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--panels-color);
  padding: 16px;
  border-radius: 5px;
}

.description {
  width: 500px;
}
</style>