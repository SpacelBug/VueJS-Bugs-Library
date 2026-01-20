<template>
  <div class="component-view">
    <div class="component-variants">
      <Table
          :header="simpleHeader"
          :data="tableData"
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
      tableData: [
        [new Date(), 5, 'some person'],
        [new Date(), 3, 'some person'],
        [new Date(), 4, 'some person'],
        [new Date(), 2, 'some person'],
      ],
      tableDataNamed: [
        { Date: new Date(), Value: 5, From: 'some person' },
        { Date: new Date(), Value: 5, From: 'some person' },
        { Date: new Date(), Value: 5, From: 'some person' },
        { Date: new Date(), Value: 5, From: 'some person' },
      ]
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
  flex-direction: column;
  width: 100%;
  gap: 32px;
}

.description {
  width: 400px;
}
</style>