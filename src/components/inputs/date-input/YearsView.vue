<template>
  <div class="wrapper">
    <transition
        name="years"
    >
      <div 
          class="year"
          :key="yearsList[0]"
      >
        <div
            v-for="year in yearsList"
            @click="onYearClick(year)"
            :class="[
              'year-cell',
              { 'active-year-cell': year === changingValue.getFullYear() },
            ]"
        >
          {{ year }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "YearsView",
  props: {
    isEndPanel: { type: Boolean, required: true },
    modelValue: { type: Date, required: true },
    changingValue: { type: Date, required: true }
  },
  mounted() {
    this.createNewYearsList()
  },
  data() {
    return {
      yearsList: [],
      listChangeDirection: 0,
    }
  },
  watch: {
    changingValue(newValue) {
      // if new date on list edge
      if (
        newValue.getFullYear() === this.yearsList[0]
      ) {
        this.listChangeDirection = -1
        this.createNewYearsList(-1)
      } else if (newValue.getFullYear() === this.yearsList[this.yearsList.length - 1]) {
        this.listChangeDirection = 1
        this.createNewYearsList(1)
      }
    }
  },
  methods: {
    createNewYearsList(value) {
      let date
      if (this.yearsList.length === 0) {
        date = new Date(this.changingValue)
        date.setFullYear(date.getFullYear() - 8)
      } else {
        if (value > 0) {
          date = new Date()
          date.setFullYear(this.yearsList[this.yearsList.length - 1])
          this.listChangeDirection = 1
        } else {
          date = new Date()
          date.setFullYear(this.yearsList[0] - 15)
          this.listChangeDirection = -1
        }
      }

      let list = []

      while (list.length < 16) {
        list.push(date.getFullYear())
        date.setFullYear(date.getFullYear() + 1)
      }

      this.yearsList = list
    },
    onYearClick(year) {
      let currentDate = new Date(this.changingValue)
      currentDate.setFullYear(year)

      this.$emit("update:changingValue", currentDate)
      
      if (this.isEndPanel) this.$emit("update:modelValue", currentDate)
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

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
  background-color: var(--accent-color);
}

.year-cell:hover {
  background-color: var(--background-color);
}

.years-enter-from {
  transform: translateY(v-bind((100 * listChangeDirection) + "%"));
  opacity: 0;
}

.years-leave-to {
  transform: translateY(v-bind((-100 * listChangeDirection) + "%"));
  opacity: 0;
}

.years-enter-active, 
.years-leave-active {
  transition: all 1s ease;
  position: absolute;
}

.years-enter-to,
.years-leave-from {
  opacity: 1;
}
</style>