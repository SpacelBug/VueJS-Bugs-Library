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
            v-model="lastCheckedNodes"
            ref="checkboxTree"
        />
        last checked nodes: {{ lastCheckedNodes }}
      </div>
      <div class="component-variant">
        <h3>With checkboxes (wrapped)</h3>
        <Tree
            :nodes="nodesWithCheckbox"
            :checkable="true"
            :collapsed="true"
            ref="checkboxTree"
        />
      </div>
      <div class="component-variant">
        <h3>With custom nodes list key names</h3>
        <Tree
            :nodes="nodesWithCustomKeys"
            :checkable="true"
            :nodesKeyNames="['firstNodes', 'secondNodes']"
            v-model="lastCheckedNodesCustomKeys"
            ref="checkboxTree"
        />
        last checked nodes: {{ lastCheckedNodesCustomKeys }}
      </div>
    </div>

    <div class="description">
      <h3>Tree component</h3>
      <div class="description">
        <p><b>Props:</b></p>
        <p><u>modelValue:</u> prop for v-model</p>
        <p><u>nodes:</u> Array of objects</p>
        <p><u>collapsed:</u> Boolean - let you wrap all nested options on load</p>
        <p><u>checkable:</u> Boolean</p>
        <p><u>nodesKeyNames:</u> Array</p>
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
      lastCheckedNodes: [],
      lastCheckedNodesCustomKeys: [],
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
      nodesWithCustomKeys: [
        { name: 'node name 1' },
        { name: 'node name 2' },
        {
          name: 'node name 3', firstNodes: [
            {
              name: 'nested node 1', secondNodes: [
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
  width: 340px;
}

.description {
  width: 500px;
}
</style>