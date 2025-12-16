<template>
  <div class="component-view">
    <div class="component-variants">
      <expandable-image :src="'broken-path'"/>
      <expandable-image :src="image" />
    </div>
    <div class="description"></div>
  </div>
</template>

<script>
import ExpandableImage from '@/components/content/ExpandableImage.vue';
import image from '@/assets/images/avatar.jpeg'

export default {
  name: "",
  components: {
    ExpandableImage,
  },
  data() {
    return {
      image: image
    }
  },
  mounted() {
    console.log(image)
  }
}
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.component-variants {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.component-variant {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>