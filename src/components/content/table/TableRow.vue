<template>
  <tr @click="$emit('rowClick', row)">
    <template
        v-if="Array.isArray(row)"
        v-for="(cell, index) in row"
        :key="index"
    >
      <td @click="$emit('cellClick', cell)">
        {{ cell }}
      </td>
    </template>
    <template
        v-else-if="typeof row === 'object'"
        v-for="headerCell, index in header"
    >
      <td @click="$emit('cellClick', cell)">
        {{ row[headerCell.name] }}
      </td>
    </template>
    <div
        v-if="!lengthCheck"
        class="mark"
        title="Too much columns"
    >
      !
    </div>
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  emits: ['rowClick', 'cellClick'],
  props: {
    header: Array,
    row: [Array, Object],
  },
  data() {
    return {

    }
  },
  computed: {
    lengthCheck() {
      return Object.keys(this.row).length === this.header.length
    }
  }
}
</script>

<style scoped>

tr:hover {
  background-color: color-mix(in srgb, var(--accent-color) 20%, transparent)
}

td {
  border: solid 1px var(--border-color);
  padding: 4px 8px;
}

.mark {
  user-select: none;
  cursor: help;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: red;
  border-radius: 50%;
}
</style>