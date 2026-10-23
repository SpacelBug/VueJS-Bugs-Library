<template>
  <div class="month">
    <div
        v-for="(month, index) in monthNames"
        @click="onMonthClick(index)"
        :class="[
          'month-cell',
          { 'active-month-cell': index === changingValue.getMonth() },
        ]"
    >
      {{ month }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MonthsView",
  emits: ["update:changingValue"],
  props: {
    changingValue: { type: Date, required: true },
  },
  data() {
    return {
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
    }
  },
  methods: {
    onMonthClick(monthIndex) {
      let currentDate = new Date(this.changingValue)
      currentDate.setMonth(monthIndex)

      this.activeMode = this.accuracy === "dates" ? "dates" : "month"

      this.$emit("update:changingValue", currentDate)
    }
  }
}
</script>

<style scoped>
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
</style>