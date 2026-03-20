<template>
  <div class="backgrounds-selector">
    <div class="various" @click="selectedBackground = 'stars'">stars</div>
    <div class="various" @click="selectedBackground = 'starsSparkles'">stars (sparkles)</div>
    <div class="various" @click="selectedBackground = 'space'">space</div>
    <div class="various" @click="selectedBackground = 'spaceSimple'">space</div>
  </div>
  <stars-background
      v-if="selectedBackground === 'stars'"
      :speed="0.2"
      :stars-count="50"
  />
  <stars-background
      v-if="selectedBackground === 'starsSparkles'"
      :sparkle="true"
      :speed="0.2"
      :stars-count="50"
  />
  <space-background
      v-if="selectedBackground === 'space'"
      style="position: absolute;  z-index: 0; top: 0; left: 0;"
      :stars-count="starsCount"
      ref="space"
  />
  <space-background
      v-if="selectedBackground === 'spaceSimple'"
      style="position: absolute;  z-index: 0; top: 0; left: 0; background: none;"
      :stars-count="starsCount"
      :start-colors="['hsl(220, 20%, 50%)']"
      :is-nebulas="false"
      ref="space"
  />
</template>

<script>
import StarsBackground from './StarsBackground.vue';
import SpaceBackground from './SpaceBackground.vue';

export default {
  name: 'FunView',
  components: {
    StarsBackground,
    SpaceBackground,
  },
  data() {
    return {
      starsCount: 200,
      selectedBackground: null,
    }
  },
};

</script>

<style scoped>
.fun-examples {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  padding: 16px;
}

.backgrounds-selector {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin: 16px 0 0 16px;
}

.various {
  cursor: pointer;
}

.various:hover {
  color: var(--accent-color);
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  height: 30px;
  border: none;
  border-radius: 5px;
  color: var(--font-color);
  background-color: var(--second-accent-color);
}
</style>