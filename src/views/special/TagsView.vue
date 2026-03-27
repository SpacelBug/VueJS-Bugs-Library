<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <tags
            :tags="tags"
            :max="3"
            @click="(tagName) => clicked = tagName"
        />
        clicked tag: {{ clicked }}
      </div>
      <div class="component-variant">
        <tags
            :tags="tags"
            :editable="true"
            @click="(tagName) => clicked = tagName"
        />
        clicked tag: {{ clicked }}
      </div>
    </div>


    <div class="description">
      <h3>Tags component</h3>
      <div class="description">
        <p></p>
        <p><b>Props:</b></p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/special/Tags.vue';

export default {
  name: "TagsView",
  components: {
    Tags,
  },
  data() {
    return {
      tags: ['tag one', 'tag two', 'tag three', 'tag four', 'tag five'],
      clicked: null,
    }
  },
}
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 64px;
  width: 100%;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
  border-radius: 5px;
  border: solid var(--border-color);
  padding: 16px;
}

.description {
  width: 400px;
}
</style>