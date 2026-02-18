<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <Contents />
      </div>
      <div class="component-variant">
        <Contents :target="target" />
      </div>
    </div>

    <div
        class="test-content"
        ref="testContent"
    >
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia harum iure odio, ipsa labore enim.
        Officia iure vel quia cumque quae numquam minus. Quo minima optio perferendis nobis perspiciatis error. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempora illum ad quis odio ex placeat aperiam expedita
        voluptas, cum consequuntur quas, harum consequatur inventore! Consequuntur officia possimus nostrum
        ipsum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia non praesentium maiores nulla rem
        aliquam iste animi quidem temporibus labore repellat cumque quis voluptas, facilis facere. Obcaecati beatae
        exercitationem vel. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, corrupti odit? Incidunt,
        dolore commodi. Quasi quae distinctio hic ducimus numquam. Eos tempore asperiores esse veniam accusantium
        aperiam perspiciatis cumque in? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid vero excepturi
        quasi necessitatibus repellat voluptate in tempore temporibus, neque soluta numquam, repellendus fuga.
        Distinctio unde adipisci quas a accusantium necessitatibus.</span>
      <h2>Header 2</h2>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia harum iure odio, ipsa labore enim.
        Officia iure vel quia cumque quae numquam minus. Quo minima optio perferendis nobis perspiciatis error. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempora illum ad quis odio ex placeat aperiam expedita
        voluptas, cum consequuntur quas, harum consequatur inventore! Consequuntur officia possimus nostrum
        ipsum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia non praesentium maiores nulla rem
        aliquam iste animi quidem temporibus labore repellat cumque quis voluptas, facilis facere. Obcaecati beatae
        exercitationem vel. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, corrupti odit? Incidunt,
        dolore commodi. Quasi quae distinctio hic ducimus numquam. Eos tempore asperiores esse veniam accusantium
        aperiam perspiciatis cumque in? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid vero excepturi
        quasi necessitatibus repellat voluptate in tempore temporibus, neque soluta numquam, repellendus fuga.
        Distinctio unde adipisci quas a accusantium necessitatibus.</span>
      <h3>Header 3</h3>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia harum iure odio, ipsa labore enim.
        Officia iure vel quia cumque quae numquam minus. Quo minima optio perferendis nobis perspiciatis error.</span>
      <h2>Header 2</h2>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia harum iure odio, ipsa labore enim.
        Officia iure vel quia cumque quae numquam minus. Quo minima optio perferendis nobis perspiciatis error. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Fugiat tempora illum ad quis odio ex placeat aperiam expedita
        voluptas, cum consequuntur quas, harum consequatur inventore! Consequuntur officia possimus nostrum
        ipsum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia non praesentium maiores nulla rem
        aliquam iste animi quidem temporibus labore repellat cumque quis voluptas, facilis facere. Obcaecati beatae
        exercitationem vel. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, corrupti odit? Incidunt,
        dolore commodi. Quasi quae distinctio hic ducimus numquam. Eos tempore asperiores esse veniam accusantium
        aperiam perspiciatis cumque in? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid vero excepturi
        quasi necessitatibus repellat voluptate in tempore temporibus, neque soluta numquam, repellendus fuga.
        Distinctio unde adipisci quas a accusantium necessitatibus.</span>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia harum iure odio, ipsa labore enim.
        Officia iure vel quia cumque quae numquam minus. Quo minima optio perferendis nobis perspiciatis error.</span>
      <h3>Header 3</h3>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia harum iure odio, ipsa labore enim.
        Officia iure vel quia cumque quae numquam minus. Quo minima optio perferendis nobis perspiciatis error.</span>
      <h3>Header 3</h3>
      <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia harum iure odio, ipsa labore enim.
        Officia iure vel quia cumque quae numquam minus. Quo minima optio perferendis nobis perspiciatis error.</span>
    </div>

    <div class="description">
      <h3>Contents component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
      </div>
    </div>
  </div>
</template>

<script>
import Contents from '@/components/content/Contents.vue';

export default {
  name: "ContentsView",
  components: {
    Contents
  },
  data() { return {
    target: null
  }},
  mounted() {
    this.target = this.$refs.testContent
  }
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
  gap: 32px;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--panels-color);
  padding: 16px;
  border-radius: 5px;
}

.description {
  width: 500px;
}
</style>