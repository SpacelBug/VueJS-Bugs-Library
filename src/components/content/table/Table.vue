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
            v-if="rowVisibility(index)"
            ref="rows"
            v-bind="$attrs"
            :header="header"
            :row="row"
        />
      </template>
    </tbody>
    <tfoot v-if="limitedRows || pagination">
      <tr>
        <td :colspan="header.length">
          <button
              v-if="limitedRows && showedRows < data.length"
              @click="showedRows += limitedRows"
          >Show more</button>
          <div
              v-if="pagination"
              class="pages"
          >
            <button
                v-for="value in paginationStructure"
                :class="{'active-page': this.page === value}"
                @click="page = value"
            >
              {{ value }}
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { getConstantValue } from 'typescript';
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

    pagination: { type: Number, default: null },
    infinityScroll: { type: Boolean, default: false},
    limitedRows: { type: Number, default: null },
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
          this.intersectionObserver.observe(this.$refs.rows[this.$refs.rows.length - 1].$el)
          this.showedRows++
        } else {
          console.log(entries)
        }
      }),
    }
  },
  async mounted() {
    // Check data
    for (let row of this.data) {
      if (Object.keys(row).length !== this.header.length) {
        throw new Error(`Different length of row and header`)
      }
    }

    if (this.limitedRows) {
      this.showedRows = this.limitedRows
    } else if (this.infinityScroll) {
      this.showedRows = 1
      this.intersectionObserver.observe(this.$refs.table)
    }
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
    rowVisibility(index) {
      if (this.showedRows) {
        return index < this.showedRows
      } else if (this.pagination) {
        if (!this.page) {
          this.page = 1
        }
        return (index < (this.page * 10)) && (index >= ((this.page * 10) - this.pagination))
      } else if (this.infinityScroll) {
        return index < this.showedRows
      } else {
        return true
      }
    }
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