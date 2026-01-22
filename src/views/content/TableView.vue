<template>
  <div class="component-view">
    <div class="component-variants">
      <Table
          :header="simpleHeader"
          :data="tableData"
          :pagination="10"
          @headerClick="(header) => testFunction('header: ' + header)"
          @rowClick="(row) => testFunction('row: ' + row)"
          @cellClick="(cell) => testFunction('cell: ' + cell)"
      />
      <Table
          :header="simpleHeader"
          :data="tableData"
          :infinityScroll="true"
          @headerClick="(header) => testFunction('header: ' + header)"
          @rowClick="(row) => testFunction('row: ' + row)"
          @cellClick="(cell) => testFunction('cell: ' + cell)"
      />
      <Table
          :header="simpleHeader"
          :data="tableData"
          :limitedRows="10"
          @headerClick="(header) => testFunction('header: ' + header)"
          @rowClick="(row) => testFunction('row: ' + row)"
          @cellClick="(cell) => testFunction('cell: ' + cell)"
      />
      <Table
          :header="header"
          :data="tableDataNamed"
          @headerClick="(header) => testFunction('header: ' + header)"
          @rowClick="(row) => testFunction('row: ' + row)"
          @cellClick="(cell) => testFunction('cell: ' + cell)"
      />
    </div>

    <div class="description">
      <h3>Table component</h3>
      <p> Component for display table data from arrays of values and from arrays of objects. Second variant let u change order of columns </p>
      <p><b>Props: </b></p>
      <p><u>header</u></p>
      <p><u>data</u></p>
      <p><b>Emits: </b></p>
      <p><u>headerClick</u></p>
      <p><u>rowClick</u></p>
      <p><u>cellClick</u></p>
    </div>
  </div>
</template>

<script>
import Table from '@/components/content/table/Table.vue';

export default {
  name: 'TableView',
  components: {
    Table
  },
  data() {
    return {
      header: [
        { name: 'Date', type: Date },
        { name: 'Value', type: Number },
        { name: 'From', type: String },
      ],
      simpleHeader: [
        'Date',
        'Value',
        'From'
      ],
      tableData: [...Array(54).keys().map(index => [new Date().toLocaleDateString(), index, 'some person'])],
      tableDataNamed: [...Array(50).fill({ Date: new Date().toLocaleDateString(), Value: 5, From: 'some person' })],
    }
  },
  methods: {
    testFunction(message) {
      console.log(message)
    }
  }
}
</script>

<style>
.component-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
}

.component-variants {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 32px;
}

.description {
  width: 400px;
}
</style>