<template>
  <div class="component-view">
    <div class="component-box">
      <TimeLine
          :starttime="starttime"
          :endtime="endtime"
          v-model="timelineCurrentValue"
          v-model:cacheWindow="cacheWindow"
      />
      />

      {{ timelineCurrentValue }}
    </div>

    <div class="description">
      <h3>Time-Line component</h3>
      <span>
        Timeline component for using in players
      </span>
      <div class="props">
        <p><b>Props:</b></p>
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
      cacheWindow: null,
    }
  }
}
</script>

<style>
.component-view {
  display: flex;
  flex-direction: row;
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