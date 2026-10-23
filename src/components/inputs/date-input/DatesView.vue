<template>
  <div class="dates-box">
    <div class="dates-header">
      <div
          class="date-header-cell"
          v-for="dayName in dayNames"
      >
        {{ dayName }}
      </div>
    </div>
    <div class="wrapper">
      <transition name="dates">
        <div class="dates" :key="datesList[0]">
          <div
              v-for="date in datesList"
              :class="[
                'date-cell',
                {
                  'active-date-cell':
                    changingValue.getTime() === date.getTime(),
                  'other-month':
                    changingValue.getMonth() !== date.getMonth(),
                },
              ]"
              :title="date"
              @mousedown="$emit('update:changingValue', date)"
          >
            {{ date.getDate().toString().padStart(2, "0") }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatesView",
  emits: ["update:changingValue"],
  props: {
    changingValue: { type: Date, required: true },
  },
  data() {
    return {
      panelValue: null,
      dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datesList: [],
      listChangeDirection: 0,
    }
  },
  mounted() {
    this.panelValue = new Date(this.changingValue)
    this.createDatesList()
  },
  watch: {
    changingValue(newValue, oldValue) {
      if (newValue.getTime() > oldValue.getTime()) {
        this.createDatesList()
        this.listChangeDirection = 1
      } else if (newValue.getTime() < oldValue.getTime()) {
        this.listChangeDirection = -1
        this.createDatesList()
      }
    }
  },
  methods: {
    createDatesList() {
      let list = []

      let startDate = new Date(this.changingValue)
      startDate.setDate(1)

      while (startDate.getDay() !== 1) {
        startDate.setDate(startDate.getDate() - 1)
      }

      while (list.length < 7 * 6) {
        list.push(new Date(startDate))
        startDate.setDate(startDate.getDate() + 1)
      }

      this.datesList = list
    },
  },
}
</script>

<style scoped>
.dates-box {
  width: 100%;
  height: 100%;
}

.dates-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
}

.wrapper {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.dates {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
}

.date-cell {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 5px;
}

.date-cell:hover {
  background-color: var(--background-color);
}

.active-date-cell {
  background-color: var(--accent-color);
}

.other-month {
  opacity: 0.3;
}

.dates-enter-from {
  transform: translateY(v-bind((100 * listChangeDirection) + "%"));
  opacity: 0;
}

.dates-leave-to {
  transform: translateY(v-bind((-100 * listChangeDirection) + "%"));
  opacity: 0;
}

.dates-enter-active {
  transition: all 1s ease;
  position: absolute;
}

.dates-leave-active {
  transition: all 1s ease;
  position: absolute;
}

.dates-enter-to,
.dates-leave-from {
  opacity: 1;
}
</style>