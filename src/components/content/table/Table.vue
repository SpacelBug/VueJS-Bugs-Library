<template>
  <table>
    <thead>
      <tr>
        <th
            v-for="(headerCell, index) in header"
            @click="$emit('headerClick', headerCell)"
        >
          <template v-if="typeof headerCell === 'string'">
            {{ headerCell }}
          </template>
          <template v-else>
            {{ headerCell.name }}
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <TableRow
          v-for="row in data"
          v-bind="$attrs"
          :header="header"
          :row="row"
      />
    </tbody>
  </table>
</template>

<script>
import TableRow from './TableRow.vue';

export default {
  name: 'Table',
  emits: ['headerClick'],
  props: {
    /**
     * Table header. Could be an array of strings or array of objects.
     * @example
     * ['Header', 'Header', 'Header']
     * or
     * [
     *  {name: 'Header', type: 'String'}, 
     *  {name: 'Header', type: 'String'},
     *  {name: 'Header', type: 'String'}
     * ]
     */
    header: { type: [Array, Object] },
    /**
     * Table data. Length of row should be equal header length
     */
    data: { type: [Array, [Object]] },
  },
  components: {
    TableRow,
  },
  data() {
    return {
    }
  },
  mounted() {
    // Check data
    for (let row of this.data) {
      if (Object.keys(row).length !== this.header.length) {
        throw new Error(`Different length of row and header`)
      }
    }
  },
}
</script>

<style scoped>
table {
  width: 100%;
}

th {
  cursor: pointer;
  user-select: none;
}

th:hover {
  opacity: 0.7;
}

td {
  border: solid 1px var(--border-color);
  padding: 4px 8px;
}
</style>