<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-wrap">
        <h3>Table with pagination</h3>
        <Table
            :header="simpleHeader"
            :data="tableData"
            @headerClick="(header) => testFunction('header: ' + header)"
            @rowClick="(row) => testFunction('row: ' + row)"
            @cellClick="(cell) => testFunction('cell: ' + cell)"
        />
      </div>
      <div class="component-wrap">
        <h3>Table with infinity scroll</h3>
        <Table
            :header="simpleHeader"
            :data="tableData"
            @headerClick="(header) => testFunction('header: ' + header)"
            @rowClick="(row) => testFunction('row: ' + row)"
            @cellClick="(cell) => testFunction('cell: ' + cell)"
        />
      </div>
      <div class="component-wrap">
        <h3>Table with limited rows</h3>
        <Table
            :header="simpleHeader"
            :data="tableData"
            :limitedRows="10"
            @headerClick="(header) => testFunction('header: ' + header)"
            @rowClick="(row) => testFunction('row: ' + row)"
            @cellClick="(cell) => testFunction('cell: ' + cell)"
        />
      </div>
      <div class="component-wrap">
        <h3>Named data (each row is object)</h3>
        <Table
            :header="header"
            :data="tableDataNamed"
            :scroll-behavior="'infinityScroll'"
            @headerClick="(header) => testFunction('header: ' + header)"
            @rowClick="(row) => testFunction('row: ' + row)"
            @cellClick="(cell) => testFunction('cell: ' + cell)"
            @interceptLast="tableDataNamed.push({ Date: new Date().toLocaleDateString(), Value: Math.floor(Math.random() * 100), From: 'some person' })"
        />
      </div>
    </div>

    <div class="description">
      <h3>Table component</h3>
      <p> Component for display table data from arrays of values and from arrays of objects</p>
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
      tableData: [...Array(154).keys().map(index => [new Date().toLocaleDateString(), index, 'some person'])],
      tableDataNamed: [...Array(50).keys().map(index => ({ Date: new Date().toLocaleDateString(), Value: Math.floor(Math.random() * 100), From: 'some person' }))],
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