<template>
  <div class="inputs-panel">
    <input
        v-if="accuracy == 'dates'"
        type="text"
        :value="date"
        ref="dateInput"
        placeholder="дд"
        @click="$refs.dateInput.select()"
        @keydown="onInputKeydown"
        @keypress.enter="onEnterPress"
        @input="dateCheck"
        @focusout="onDateBlur"
    >
    <input
        v-if="accuracy == 'dates' || accuracy === 'month'"
        type="text"
        v-model="month"
        ref="monthInput"
        placeholder="мм"
        @click="$refs.monthInput.select()"
        @keydown="onInputKeydown"
        @keypress.enter="onEnterPress"
        @input="monthCheck"
        @focusout="onMonthBlur"
    >
    <input
        type="text"
        v-model="year"
        ref="yearInput"
        placeholder="гггг"
        @click="$refs.yearInput.select()"
        @keydown="onInputKeydown"
        @keypress.enter="onEnterPress"
        @input="yearCheck"
        @focusout="onYearBlur"
    >
  </div>
</template>

<script>
export default {
  name: "InputsPanel",
  props: {
    accuracy: {
      type: String,
      default: "dates",
      validator: (value) => ["dates", "month", "years"].includes(value),
    },
    modelValue: { type: [Date, null], required: true },
  },
  data() {
    return {
      date: null,
      month: null,
      year: null,
    }
  },
  beforeMount() {
    if (this.modelValue) {
      this.date = this.modelValue.getDate().toString().padStart(2, '0')
      this.month = (this.modelValue.getMonth() + 1).toString().padStart(2, '0')
      this.year = this.modelValue.getFullYear().toString()
    }
  },
  computed: {
    maxDate() {      
      if ((this.year !== null) && (this.month !== null)) {
        const year = parseInt(this.year)
        const month = parseInt(this.month) - 1
        return new Date(year, month + 1, 0).getDate()
      } else {
        return 31
      }
    },
  },
  watch: {
    modelValue(newValue) {
      if (this.modelValue) {
        this.date = newValue.getDate().toString().padStart(2, '0')
        this.month = (newValue.getMonth() + 1).toString().padStart(2, '0')
        this.year = newValue.getFullYear().toString()
      } else {
        this.date = null
        this.month = null
        this.year = null
      }
    },
    month(newValue) {
      if (this.year !== null) {
        if (this.date > this.maxDate) {
          this.date = this.maxDate.toString().padStart(2, '0')
        }
      }
    },
    year(newValue) {
      if (this.month !== null) {
        if (this.date > this.maxDate) {
          this.date = this.maxDate.toString().padStart(2, '0')
        }
      }
    },
  },
  methods: {
    onInputKeydown(inputType) {
      // Let inly numbers, backspace, delete and arrow keys
      if (
        !(
          (event.key >= "0" && event.key <= "9") ||
          event.key === "Backspace" ||
          event.key === "Delete" || 
          event.key === "ArrowLeft" ||
          event.key === "ArrowRight" || 
          event.key === "Tab" || 
          event.key === "Enter"
        )
      ) {
        event.preventDefault()
      }
    },
    updateModelValue() {
      if (this.accuracy === 'years') {
        this.date = 1
        this.month = 1
      } else if (this.accuracy === 'month') {
        this.date = 1
      }

      if (
        (this.date !== null) && 
        (this.month !== null) && 
        (this.year !== null)
      ) {
        const newDate = new Date(
          parseInt(this.year),
          parseInt(this.month) - 1,
          parseInt(this.date)
        )
        this.$emit("update:modelValue", newDate)
      }
    },
    onEnterPress() {
      if (this.date > this.maxDate) {
        this.date = this.maxDate.toString().padStart(2, '0')
      }

      event.target.blur()
    },
    async dateCheck() {
      const value = this.$refs.dateInput.value

      if (value > this.maxDate) {
        await this.$nextTick(()=>{
          this.date = this.maxDate
        })
        this.$refs.monthInput.focus()
        this.$refs.monthInput.select()
      } else if ((value > 3) || value.length === 2) {
        this.date = value.padStart(2, '0')
        this.$refs.monthInput.focus()
        this.$refs.monthInput.select()
      }
    },
    onDateBlur() {
      const value = this.$refs.dateInput.value
      if (value) {
        this.date = value.padStart(2, '0')
      }
      this.updateModelValue()
    },
    monthCheck() {
      const value = this.$refs.monthInput.value
      if (value > 12) {
        this.month = "12"
        this.$refs.yearInput.focus()
        this.$refs.yearInput.select()
      } else if ((value >= 2) || value.length === 2) {
        this.month = value.padStart(2, '0')
        this.$refs.yearInput.focus()
        this.$refs.yearInput.select()
      }
    },
    onMonthBlur() {
      const value = this.$refs.monthInput.value
      if (value) {
        this.month = value.padStart(2, '0')
      }
      this.updateModelValue()
    },
    yearCheck() {
      const value = this.$refs.yearInput.value
      if (value.length >= 4) {
        this.$refs.yearInput.blur()
      }
    },
    onYearBlur() {
      const value = this.$refs.yearInput.value
      if (value) {
        if (value.length === 2) {
          this.year = '20' + value
        } else {
          this.year = value.padStart(4, '0')
        }
      }
      this.updateModelValue()
    }
  },
}
</script>

<style scoped>
.inputs-panel {
  display: flex;
  gap: 10px;
}

input {
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--font-color);
  color: var(--font-color);
  width: 2ch;
}

input:last-child {
  width: 4ch;
}
</style>