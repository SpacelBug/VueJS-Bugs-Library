<template>
  <div class="fun-examples">
    <div class="main-box">
      <h3>Stars background</h3>
      <div class="wrapper">
        <stars-background :stars-count="100"></stars-background>
      </div>
    </div>
    <div class="main-box">
      <h3>Stars background</h3>
      <div class="wrapper">
        <stars-background
            :sparkle="true"
            :speed="0.2"
            :stars-count="50"
        ></stars-background>
      </div>
    </div>
    <div class="main-box">
      <h3>Space background <button @click="$refs.space.$el.requestFullscreen()">FullScreen</button></h3>
      <div
          class="wrapper"
          style="width: 500px; height: 500px;"
      >
        <space-background :stars-count="starsCount" ref="space"></space-background>
      </div>
      <input
          type="number"
          v-model="starsCount"
      >
    </div>
  </div>
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
      starsCount: 500,
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

.main-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: fit-content;
  height: fit-content;
  position: relative;
  background-color: var(--panels-color);
  padding: 16px;
  border-radius: 5px;
}

.wrapper {
  box-sizing: border-box;
}

/*Space gradient*/
.wrapper:nth-last-child(2) {
  border-radius: 10px;
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