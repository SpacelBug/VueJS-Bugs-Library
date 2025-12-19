<template>
  <div class="main-box">
    <div class="date-input">
      {{ modelValue.toLocaleDateString() }}
    </div>

    <div class="interactive-panel">
      <div class="header">
        <span>{{ modelValue.getFullYear() }} {{ monthNames[modelValue.getMonth()] }}</span>
        <div class="arrows">
          <div class="up" @click="changeMonth(-1)"/>
          <div class="down" @click="changeMonth(1)"/>
        </div>
      </div>
      <div class="cells">
        <div class="year">

        </div>
        <div class="month">

        </div>
        <transition
            name="dates"
            mode="out-in"
        >
          <div
              class="date"
              tabindex="0"
              @keydown.prevent="onDatePanelKeyPress"
              :key="modelValue.getMonth()"
          >
            <div
                class="date-header-cell"
                v-for="dayName in dayNames"
            >
              {{ dayName }}
            </div>

            <div
                v-for="date in datesList"
                :class="['date-cell', { 'active-date-cell': modelValue.getTime() === date.getTime(), 'other-month': modelValue.getMonth() !== date.getMonth() }]"
                :title="date"
                @click="this.$emit('update:modelValue', date)"
            >
              {{ date.getDate().toString().padStart(2, '0') }}
            </div>

          </div>
        </transition>
        <div class="footer">
          <span @click="this.$emit('update:modelValue', new Date())">Today</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateInput",
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Date, default: new Date(), required: true }
  },
  data() {
    return {
      changeableValue: null,

      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    }
  },
  computed: {
    datesList() {
      let list = []

      let startDate = new Date(this.modelValue)
      startDate.setDate(1)

      while (startDate.getDay() !== 1) {
        startDate.setDate(startDate.getDate() - 1)
      }

      while (list.length < 7 * 6) {
        list.push(new Date(startDate))
        startDate.setDate(startDate.getDate() + 1)
      }

      return list
    }
  },
  methods: {
    onDatePanelKeyPress() {
      let currentDate = new Date(this.modelValue)
      if (event.code === 'ArrowLeft') {
        currentDate.setDate(currentDate.getDate() - 1)
      } else if (event.code === 'ArrowUp') {
        currentDate.setDate(currentDate.getDate() - 7)
      } else if (event.code === 'ArrowRight') {
        currentDate.setDate(currentDate.getDate() + 1)
      } else if (event.code === 'ArrowDown') {
        currentDate.setDate(currentDate.getDate() + 7)
      }

      this.$emit('update:modelValue', currentDate)
    },
    changeMonth(value) {
      let currentDate = new Date(this.modelValue)
      currentDate.setMonth(currentDate.getMonth() + value)
      this.$emit('update:modelValue', currentDate)
    }
  }
}
</script>

<style scoped>
.main-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  gap: 16px;
}

.date-input {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--panels-color);
  border-radius: 5px;
  height: 40px;
  width: 100px;
}

.interactive-panel {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 56px;
  background-color: var(--panels-color);
  border: solid 1px var(--border-color);
  border-radius: 5px;
  padding: 16px 8px;
  gap: 8px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.arrows {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.up, .down {
  cursor: pointer;
  mask-image: url("@/assets/icons/SmallArrowHead.svg");
  mask-size: contain;
  background-color: var(--font-color);
  width: 15px;
  height: 15px;
}

.up {
  rotate: 180deg;
}

.cells {
  position: relative;
}

.date {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 8px;
}

.date-cell {
  user-select: none;
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
  background-color: var(--background-color);
}

.other-month {
  opacity: 0.3;
}

.footer {
  display: flex;
  justify-content: end;
}

/***Vue Transitions***/
.dates-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}

.dates-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.dates-enter-active {
  transition: all 0.3s ease;
}

.dates-leave-active {
  transition: all 0.3s ease;
}

.dates-enter-to,
.dates-leave-from {
  opacity: 1;
}
</style>