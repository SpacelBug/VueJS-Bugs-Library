<template>
  <div class="main-box">
    <div
        class="date-input"
        @click="async () => { await (isShowInteractivePanel = !isShowInteractivePanel); $refs.interactivePanel.focus() }"
    >
      {{ caption }}
    </div>

    <div
        v-if="isShowInteractivePanel"
        class="interactive-panel"
        tabindex="0"
        ref="interactivePanel"
        @focusout="isShowInteractivePanel = false"
    >
      <div class="header">
        <span
            @click="changeActiveMode"
            class="caption"
        >{{ modelValue.getFullYear() }} {{ monthNames[modelValue.getMonth()] }}</span>
        <div class="arrows">
          <div
              class="up"
              @click="this.activeMode === 'dates' ? changeMonth(-1) : changeYear(-1)"
          />
          <div
              class="down"
              @click="this.activeMode === 'dates' ? changeMonth(1) : changeYear(1)"
          />
        </div>
      </div>
      <div class="cells">
        <transition-group name="distancing">
          <div
              v-if="activeMode === 'dates'"
              class="date-panel"
              tabindex="0"
              @keydown.prevent="onDatePanelKeyPress"
          >
            <transition
                name="dates"
                mode="out-in"
            >
              <div
                  class="dates-wrapper"
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
                    @mousedown="this.$emit('update:modelValue', date)"
                >
                  {{ date.getDate().toString().padStart(2, '0') }}
                </div>
              </div>
            </transition>
          </div>

          <div
              v-else-if="activeMode === 'month'"
              class="month"
          >
            <div
                v-for="(month, index) in monthNames"
                @click="onMonthClick(index)"
                :class="['month-cell', { 'active-month-cell': index === modelValue.getMonth() }]"
            >
              {{ month }}
            </div>
          </div>

          <div
              v-if="activeMode === 'years'"
              class="year"
              :key="activeMode"
          >
            <div
                v-for="year in yearsList"
                @click="onYearClick(year)"
                :class="['year-cell', { 'active-year-cell': year === modelValue.getFullYear() }]"
            >
              {{ year }}
            </div>
          </div>
        </transition-group>
      </div>
      <div class="footer">
        <span
            @click="this.$emit('update:modelValue', new Date())"
            class="today"
        >Today</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateInput",
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Date, default: new Date(), required: true },
    accuracy: { type: String, default: 'dates', validator: (value) => ['dates', 'month', 'years'].includes(value) }
  },
  data() {
    return {
      isShowInteractivePanel: false,
      /**
       * Set mode of interactive panel
       * Could be 'years', 'month', 'dates'
       */
      activeMode: this.accuracy,

      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

      datesAnimPow: 1,
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
    },
    yearsList() {
      let date = new Date(this.modelValue)
      date.setFullYear(date.getFullYear() - 8)

      let list = []

      while (list.length < 16) {
        list.push(date.getFullYear())
        date.setFullYear(date.getFullYear() + 1)
      }

      return list
    },
    caption() {
      if (this.accuracy === 'dates') {
        return this.modelValue.toLocaleDateString()
      } else if (this.accuracy === 'month') {
        return `${this.monthNames[this.modelValue.getMonth()]} ${this.modelValue.getFullYear()}`
      } else  if (this.accuracy === 'years') {
        return this.modelValue.getFullYear()
      }
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
      if (value > 0) {
        this.datesAnimPow = -1
      } else {
        this.datesAnimPow = 1
      }

      let currentDate = new Date(this.modelValue)
      currentDate.setMonth(currentDate.getMonth() + value)
      this.$emit('update:modelValue', currentDate)
    },
    changeYear(value) {
      if (value > 0) {
        this.datesAnimPow = -1
      } else {
        this.datesAnimPow = 1
      }

      let currentDate = new Date(this.modelValue)
      currentDate.setFullYear(currentDate.getFullYear() + value)
      this.$emit('update:modelValue', currentDate)
    },
    changeActiveMode() {
      if (this.activeMode === 'dates') {
        this.activeMode = 'month'
      } else if (this.activeMode === 'month') {
        this.activeMode = 'years'
      } else if (this.accuracy === 'date') {
        this.activeMode = 'dates'
      }
    },
    onMonthClick(monthIndex) {
      let currentDate = new Date(this.modelValue)
      currentDate.setMonth(monthIndex)
      this.$emit('update:modelValue', currentDate)

      this.activeMode = this.accuracy === 'date' ? 'dates' : 'month'
    },
    onYearClick(year) {
      let currentDate = new Date(this.modelValue)
      currentDate.setFullYear(year)
      this.$emit('update:modelValue', currentDate)

      this.activeMode = ['month', 'date'].includes(this.accuracy) ? 'month' : 'years'
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
  width: fit-content;
}

.date-input {
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--panels-color);
  border-radius: 5px;
  height: 40px;
  width: 100%;
  padding: 0 8px;
}

.interactive-panel {
  user-select: none;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 56px;
  background-color: var(--panels-color);
  border: solid 1px var(--border-color);
  border-radius: 5px;
  padding: 16px 8px;
  gap: 8px;
  width: 300px;
  height: 300px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.caption {
  cursor: pointer;
}

.arrows {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.up,
.down {
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.date-panel {
  width: 100%;
  height: 100%;
}

.dates-wrapper {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 100%;
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
  background-color: var(--background-color);
}

.other-month {
  opacity: 0.3;
}

/*Month panel*/

.month {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
}

.month-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
}

.month-cell:hover {
  background-color: var(--background-color);
}

.active-month-cell {
  background-color: var(--background-color);
}

/*Year panel*/

.year {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
}

.year-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
}

.active-year-cell {
  background-color: var(--background-color);
}

.year-cell:hover {
  background-color: var(--background-color);
}

.footer {
  display: flex;
  justify-content: end;
}

.today {
  cursor: pointer;
}

/***Vue Transitions***/
.dates-enter-from {
  transform: translateY(v-bind(datesAnimPow * 30 + 'px'));
  opacity: 0;
}

.dates-leave-to {
  transform: translateY(v-bind(datesAnimPow * -30 + 'px'));
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

.distancing-enter-from {
  opacity: 0;
  width: 400px;
  height: 400px;
}

.distancing-enter-active,
.distancing-leave-active {
  position: absolute;
  transition: all 0.3s ease;
  pointer-events: none;
}

.distancing-enter-to,
.distancing-leave-from {
  opacity: 1;
  width: 100%;
  height: 100%;
}

.distancing-leave-to {
  opacity: 0;
  width: 200px;
  height: 200px;
}
</style>