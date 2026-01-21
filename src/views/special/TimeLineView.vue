<template>
  <div class="component-view">
    <div class="component-box">
      <TimeLine
          :starttime="starttime"
          :endtime="endtime"
          v-model="timelineCurrentValue"
          v-model:cacheWindow="cacheWindow"
      >
        {{ timelineCurrentValue.toLocaleTimeString() }}
      </TimeLine>

      <TimeLine
          :starttime="starttime"
          :endtime="endtime"
          :cachedSteps="0"
          v-model="timelineCurrentValueSecond"
      >
        {{ timelineCurrentValueSecond.toLocaleTimeString() }}
      </TimeLine>

      <h3>Cache for first timeline</h3>

      <template v-if="cacheWindow">
        <span><b>length:</b> {{ cacheWindow.length }}</span>
        <span><b>firstItem:</b> {{ cacheWindow[0] }}</span>
      </template>
    </div>

    <div class="description">
      <h3>Time-Line component</h3>
      <span>
        Timeline component for using in players
      </span>
      <span>
        Left side label could be changed by slot
      </span>
      <div class="props">
        <p><b>Props:</b></p>
        <p><u>sampleRate</u>: Number (in milliseconds). Default: 1000 * 60 (minute)</p>
        <p><u>starttime</u>: Date (required)</p>
        <p><u>endtime</u>: Date (required)</p>
        <p><u>framerate</u>: Number. Default: 24</p>
        <p><u>cachedSteps</u>: Number</p>
      </div>
    </div>
  </div>
</template>
<script>
import TimeLine from '@/components/special/TimeLine.vue';

export default {
  components: {
    TimeLine
  },
  data() {
    return {
      starttime: new Date('2025-12-1'),
      endtime: new Date('2025-12-2'),

      timelineCurrentValue: new Date('2025-12-1 10:00:00'),
      timelineCurrentValueSecond: new Date('2025-12-1 10:00:00'),
      cacheWindow: null,
    }
  }
}
</script>

<style scoped>
.component-view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}

.component-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: fit-content;
}

.description {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 400px;
}

.props {
  padding-left: 16px;
}
</style>