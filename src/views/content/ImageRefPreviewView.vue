<template>
  <div class="component-view">
    <div class="component-variants">
      <div class="component-variant">
        <span>
          With broken image path
        </span>
        <image-ref-preview
            :src="'broken-path'"
            :alt="'Some broken image'"
        />
      </div>
      <div class="component-variant">
        <span>
          With valid image path
        </span>
        <image-ref-preview :src="image" />
      </div>
    </div>
    <div class="description">
      <h3>
        Image Reference Preview component
      </h3>
      allows you to display a preview of an image when hovering over a link. 
      <p><b>Props:</b></p>
      <ul>
        <li><code>src</code>: The URL of the image to display</li>
        <li><code>alt</code>: The alternative text for the image</li>
        <li><code>caption</code>: The text to display as a link</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ImageRefPreview from "@/components/content/ImageRefPreview.vue";
import image from '@/assets/images/avatar.jpeg'

export default {
  name: 'ImageRefPreviewView',
  components: {
    ImageRefPreview
  },
  data() {
    return {
      image: image
    }
  }
}
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
}

.component-variants {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.component-variant {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.description {
  width: 500px;
}
</style>