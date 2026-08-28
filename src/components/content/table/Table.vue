<template>
  <table ref="table">
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
      <template v-for="(row, index) in data">
        <TableRow
            ref="rows"
            v-bind="$attrs"
            :header="header"
            :row="row"
            @click="$emit('rowClick', row)"
            @cell-click="(value) => $emit('cellClick', value)"
        />
      </template>
    </tbody>
  </table>
</template>

<script>
import TableRow from './TableRow.vue';

export default {
  name: 'Table',
  emits: ['headerClick', 'rowClick', 'cellClick', 'interceptLast'],
  props: {
    /**
     * Table header. Could be an array of strings or array of objects.
     * If array of objects, each object should have a name and type property.
     * If array of strings, each string will be used as the header name and will be connected to the data by index.
     * @example
     * ['Header0', 'Header1', 'Header2']
     * or
     * [
     *  {name: 'Header0', type: 'String'}, 
     *  {name: 'Header1', type: 'String'},
     *  {name: 'Header2', type: 'String'}
     * ]
     */
    header: { type: [Array, Object] },
    /**
     * Table data. Length of row should be equal header length
     * Could be an array of arrays with values or array of objects. 
     * If array of objects, each object should have a key equal to the same name as the header name.
     * @example
     * [
     *  ['Value', 'Value', 'Value'], 
     *  ['Value', 'Value', 'Value']
     * ]
     * or
     * [
     * {Header0: 'Value', Header1: 'Value', Header2: 'Value'},
     * {Header0: 'Value', Header1: 'Value', Header2: 'Value'},
     * {Header0: 'Value', Header1: 'Value', Header2: 'Value'},
     * ]
     */
    data: { type: [Array, [Object]] },

    limit: { type: Number, default: null },
    scrollBehavior: {
      type: String, default: "infinityScroll", validator: (value) => {
        return ['infinityScroll', 'pagination', 'showMore'].includes(value)
      }
    },
  },
  components: {
    TableRow,
  },
  data() {
    return {
      page: null,
      showedRows: null,
      intersectionObserver: new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          this.intersectionObserver.disconnect()

          this.$emit('interceptLast', this.data[this.$refs.rows.length - 1])
        } else {
          // console.log(entries)
        }
      }),
    }
  },
  watch: {
    data: { 
      handler() {
        this.intersectionObserver.observe(this.$refs.rows[this.$refs.rows.length - 1].$el)
      }, deep: true
    }
  },
  async mounted() {
    // Check data
    for (let row of this.data) {
      if (Object.keys(row).length !== this.header.length) {
        throw new Error(`Different length of row and header`)
      }
    }

    this.intersectionObserver.observe(this.$refs.rows[this.$refs.rows.length - 1].$el)
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.data.length / this.pagination)
    },
    paginationStructure() {
      let pages

      if ((this.page >= 3) && (this.page <= (this.pagesCount - 2))) {
        pages = [
          1,
          '...',
          this.page - 1,
          this.page,
          this.page + 1,
          '...',
          this.pagesCount,
        ]
      } else if ((this.page < 3) || (this.page > (this.pagesCount - 2))) {
        pages = [
          1,
          2,
          3,
          '...',
          this.pagesCount - 2,
          this.pagesCount - 1,
          this.pagesCount,
        ]
      }

      return pages
    }
  },
  methods: {
  },
}
</script>

<style scoped>
table {
  width: 100%;
  height: fit-content;
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

tfoot>tr>td {
  text-align: center;
}

.pages {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.active-page {
  color: var(--accent-color);
}
</style>