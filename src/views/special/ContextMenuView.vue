<template>
  <div class="component-view">
    <div class="component-variants">
      <div
          class="component-variant"
          @contextmenu.prevent="$refs.contextMenuFirst.showContextMenu()"
      >
        Have no relative parent
        <ContextMenu
            :options="options"
            ref="contextMenuFirst"
        />
      </div>
      <div
          class="component-variant"
          @contextmenu.prevent="$refs.contextMenuSecond.showContextMenu()"
          style="position: relative;"
      >
        Have relative parent
        <ContextMenu
            :options="options"
            :position="'fixed'"
            ref="contextMenuSecond"
        />
      </div>
    </div>


    <div class="description">
      <h3>Context Menu component</h3>
      <div class="description">
        <p>Use ref with showContextMenu method for display context menu</p>
        <p><b>Props:</b></p>
        <p><u>options:</u> Array
        <pre>
[
  {name: 'Option 1', handler: () => {}},
  {name: 'Option 2', options: [
    name: 'Nested option 1', handler: () => {},
    name: 'Nested option 2', handler: () => {},
  ]},
]
        </pre>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ContextMenu from '@/components/special/context-menu/ContextMenu.vue';

export default {
  name: 'ContextMenuView',
  components: {
    ContextMenu,
  },
  data() {
    return {
      options: [
        { name: 'Option 1', handler: () => { console.log('hello') } },
        { name: 'Option 2', handler: () => { console.log('hello') } },
        {
          name: 'Option 3', options: [
            { name: 'Nested option 1', handler: () => { console.log('hello') } },
            { name: 'Nested option 2', handler: () => { console.log('hello') } },
          ]
        }
      ]
    }
  }
};
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  height: 100%;
}

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
}

.component-variant {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: solid 1px var(--border-color);
}

pre {
  border-radius: 5px;
  padding: 8px 16px;
  background-color: var(--panels-color);
}
</style>