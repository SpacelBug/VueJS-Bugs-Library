<template>
  <div class="main-box">
    <div class="date-input">
      <div class="caption">
        <inputs-panel
            v-if="keyboardInput"
            :model-value="selectedValue"
            :accuracy="accuracy"
            @update:modelValue="onInputPanelUpdate"
            @date-focusout="this.$emit('dateFocusout')"
        />
        <template v-else>
          {{ caption }}
        </template>
      </div>
      <slot name="time-place"/>
      <div
          class="calendar-icon"
          @click="onInputClick"
      />
    </div>

    <div
        v-if="isShowInteractivePanel"
        class="interactive-panel"
        tabindex="0"
        ref="interactivePanel"
        @keydown.prevent="onInteractivePanelKeyPress"
        @keydown.enter="(event) => { event.target.blur() }"
        @keydown.escape="(event) => { selectedValue = modelValue; event.target.blur() }"
        @focusout="onFocusOut"
    >
      <div class="header">
        <span
            @click="changeActiveMode"
            class="mode-buttons"
        >
          <span v-if="activeMode === 'dates'">{{ monthNames[changingValue.getMonth()] }}</span>
          <span>{{ changingValue.getFullYear() }}</span>
        </span>
        <div class="arrows">
          <div
              class="up"
              @click="onArrowClick(-1)"
          />
          <div
              class="down"
              @click="onArrowClick(1)"
          />
        </div>
      </div>

      <div class="cells">
        <transition-group name="distancing">
          <dates-view
              v-if="activeMode === 'dates'"
              v-model="selectedValue"
              :changingValue="changingValue"
              @update:changingValue="changingValue = $event"
          />

          <months-view
              v-else-if="activeMode === 'month'"
              v-model="selectedValue"
              :is-end-panel="accuracy === 'month'"
              :changingValue="changingValue"
              @update:changingValue="changingValue = $event; accuracy === 'dates' ? activeMode = 'dates' : null"
          />

          <years-view
              v-else-if="activeMode === 'years'"
              ref="yearsView"
              v-model="selectedValue"
              :is-end-panel="accuracy === 'years'"
              :changingValue="changingValue"
              @update:changingValue="changingValue = $event;['dates', 'month'].includes(accuracy) ? activeMode = 'month' : null"
          />
        </transition-group>
      </div>

      <div class="footer">
        <span
            @click="changingValue = new Date(); selectedValue = new Date()"
            class="today"
        >Today</span>
      </div>
    </div>
  </div>
</template>

<script>
import InputsPanel from "./InputsPanel.vue"
import DatesView from "./DatesView.vue"
import MonthsView from "./MonthsView.vue"
import YearsView from "./YearsView.vue"
import { setBlockTracking } from "vue";

export default {
  name: "DateInput",
  emits: ["update:modelValue", "dateFocusout"],
  components: {
    InputsPanel,
    DatesView,
    MonthsView,
    YearsView,
  },
  props: {
    /**
     * Set model value of date input, will be updated on blur of interactive panel
     */
    modelValue: { type: [Date, null], required: true },
    /**
     * Set accuracy of date input
     */
    accuracy: {
      type: String,
      default: "dates",
      validator: (value) => ["dates", "month", "years"].includes(value),
    },

    keyboardInput: { type: Boolean, default: false },
  },
  data() {
    return {
      // 
      changingValue: null,
      // 
      selectedValue: null,

      isShowInteractivePanel: false,
      /**
       * Set mode of interactive panel
       * Could be 'years', 'month', 'dates'
       * Default value is equal to accuracy prop
       */
      activeMode: this.accuracy,

      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],

      yearsList: [],
    }
  },
  beforeMount() {
    if (
      (Object.prototype.toString.call(this.modelValue) !== "[object Date]") &&
      (this.modelValue !== null)
    ) {
      throw new Error("Model value must be a Date object or null")
    }

    if (this.modelValue) {
      if (!this.checkTime(this.modelValue)) {
        console.warn('[BL component warn]: Time check error: Datetime input value should be zero time')
      }

      this.selectedValue = new Date(this.modelValue)
      this.changingValue = new Date(this.modelValue)
    }
  },
  computed: {
    caption() {
      if (!this.changingValue) {
        if (this.accuracy === "dates") {
          return "ДД-ММ-ГГГГ"
          return "DD-MM-YYYY"
        } else if (this.accuracy === "month") {
          return "________ ____"
        } else if (this.accuracy === "years") {
          return "____"
        }
      }

      if (this.accuracy === "dates") {
        const date = this.changingValue.getDate().toString().padStart(2, "0")
        const month = (this.changingValue.getMonth() + 1)
          .toString()
          .padStart(2, "0")
        const year = this.changingValue.getFullYear()
        return `${date}-${month}-${year}`
      } else if (this.accuracy === "month") {
        return `${this.monthNames[this.changingValue.getMonth()]} ${this.changingValue.getFullYear()}`
      } else if (this.accuracy === "years") {
        return this.changingValue.getFullYear()
      }
    },
  },
  watch: {
    modelValue(valueNew, valueOld) {
      if (
        (Object.prototype.toString.call(valueNew) !== "[object Date]") &&
        (valueNew !== null)
      ) {
        throw new Error("Model value must be a Date object")
      }

      this.changingValue = this.modelValue
      this.selectedValue = this.modelValue
    },
  },
  methods: {
    checkTime(datetime) {
      if (datetime.getHours() !== 0) return false
      if (datetime.getMinutes() !== 0) return false
      if (datetime.getSeconds() !== 0) return false
      if (datetime.getMilliseconds() !== 0) return false
      return true
    },
    clearTime(datetime) {
      if (datetime === null) return null

      return new Date(
        datetime.getFullYear(),
        this.accuracy === "years" ? 0 : datetime.getMonth(),
        this.accuracy === "month" || this.accuracy === "years" ? 1 : datetime.getDate(),
        0,
        0,
        0,
        0,
      )
    },
    onInputClick() {
      this.isShowInteractivePanel = true
      this.changingValue = this.modelValue
        ? new Date(this.modelValue)
        : new Date()
      this.$nextTick(() => {
        this.$refs.interactivePanel.focus()
      })
    },
    onArrowClick(value) {
      if (this.activeMode === "dates") {
        this.changeMonth(value)
      } else if (this.activeMode === "month") {
        this.changeYear(value)
      } else if (this.activeMode === "years") {
        this.$refs.yearsView.createNewYearsList(value)
      }
    },
    onFocusOut() {
      this.isShowInteractivePanel = false
      this.changingValue = this.selectedValue
      this.$emit('update:modelValue', this.clearTime(this.selectedValue))
    },
    onInputPanelUpdate(value) {
      this.$emit('update:modelValue', this.clearTime(value))
    },
    onInteractivePanelKeyPress() {
      let currentDate = new Date(this.changingValue)

      if (this.activeMode === "dates") {
        if (event.code === "ArrowLeft") {
          currentDate.setDate(currentDate.getDate() - 1)
        } else if (event.code === "ArrowUp") {
          currentDate.setDate(currentDate.getDate() - 7)
        } else if (event.code === "ArrowRight") {
          currentDate.setDate(currentDate.getDate() + 1)
        } else if (event.code === "ArrowDown") {
          currentDate.setDate(currentDate.getDate() + 7)
        }
      }

      this.changingValue = currentDate
    },
    changeMonth(value) {
      if (value > 0) {
        this.datesAnimPow = -1
      } else {
        this.datesAnimPow = 1
      }

      let currentDate = new Date(this.changingValue)
      currentDate.setMonth(currentDate.getMonth() + value)

      this.changingValue = currentDate
    },
    changeYear(value) {
      if (value > 0) {
        this.datesAnimPow = -1
      } else {
        this.datesAnimPow = 1
      }

      let currentDate = new Date(this.changingValue)
      currentDate.setFullYear(currentDate.getFullYear() + value)

      this.changingValue = currentDate
    },
    changeActiveMode() {
      if (this.activeMode === "dates") {
        this.activeMode = "month"
      } else if (this.activeMode === "month") {
        this.activeMode = "years"
      } else if (this.accuracy === "dates") {
        this.activeMode = "dates"
      }
    },
  },
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
  height: fit-content;
}

.date-input {
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background-color: var(--panels-color);
  border-radius: 5px;
  height: 40px;
  width: 100%;
  padding: 0 8px;
  white-space: nowrap;
}

.interactive-panel {
  user-select: none;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  top: 56px;
  background-color: var(--panels-color);
  border: solid 1px var(--border-color);
  border-radius: 5px;
  padding: 16px 8px;
  gap: 8px;
  width: 300px;
  height: 300px;
  outline: none;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.mode-buttons {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 8px;
  font-weight: bold;
}

.mode-buttons:hover {
  color: var(--accent-color);
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

/**Icons**/
.calendar-icon {
  cursor: pointer;
  mask-image: url("./Calendar.svg");
  mask-size: contain;
  background-color: var(--font-color);
  width: 20px;
  height: 20px;
}

.calendar-icon:hover {
  background-color: var(--accent-color);
}

/***Vue Transitions***/
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
