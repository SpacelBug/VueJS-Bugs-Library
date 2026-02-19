<template>
  <div class="table-of-contents">
    <div
        class="header"
        v-for="contentsObject in tableOfContents"
        @click="contentsObject.node.scrollIntoView({ block: 'center', behavior: 'smooth' })"
        :style="`margin-left: ${contentsObject.level * 10}px`"
    >
      {{ contentsObject.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Contents",
  props: {
    target: {type: Node, default: document.body}
  },
  data() {
    return {
      tableOfContents: [],
    }
  },
  mounted() {
    if (this.target) {
      this.formTableOfContents()
    }
  },
  methods: {
    formTableOfContents() {
      for (let node of this.target.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
        this.tableOfContents.push({
          node: node,
          content: node.innerHTML,
          level: Number(node.nodeName.slice(1, 2))
        })
      }
    }
  },
  watch: {
    target(newValue) {
      this.formTableOfContents()
    }
  }
}
</script>

<style>
.table-of-contents {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.header {
  cursor: pointer;
  white-space: nowrap;
}
</style>