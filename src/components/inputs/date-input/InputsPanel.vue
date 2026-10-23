<template>
  <div class="inputs-panel">
    <input
        type="text"
        :value="date"
        ref="dateInput"
        @click="$refs.dateInput.select()"
        @keydown="onInputKeydown"
        @keypress.enter="onEnterPress"
        @input="dateCheck"
    >
    <input
        type="text"
        v-model="month"
        ref="monthInput"
        @click="$refs.monthInput.select()"
        @mousedown=""
        @keydown="onInputKeydown"
        @keypress.enter="onEnterPress"
        @input="monthCheck"
    >
    <input
        type="text"
        v-model="year"
        ref="yearInput"
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
    modelValue: { type: Date, required: true },
  },
  data() {
    return {
      date: null,
      month: null,
      year: null,
    }
  },
  beforeMount() {
    this.date = this.modelValue.getDate().toString().padStart(2, '0')
    this.month = (this.modelValue.getMonth() + 1).toString().padStart(2, '0')
    this.year = this.modelValue.getFullYear().toString()
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
      this.date = newValue.getDate().toString().padStart(2, '0')
      this.month = (newValue.getMonth() + 1).toString().padStart(2, '0')
      this.year = newValue.getFullYear().toString()
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

      this.updateModelValue()
    },
    dateCheck() {
      const value = this.$refs.dateInput.value

      if (value > 31) {
        this.date = 31
        this.$refs.monthInput.focus()
        this.$refs.monthInput.select()
      } else if ((value > 3) || value.length === 2) {
        this.date = value.padStart(2, '0')
        this.$refs.monthInput.focus()
        this.$refs.monthInput.select()
      }
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
    yearCheck() {
      const value = this.$refs.yearInput.value
      if (value.length >= 4) {
        this.$refs.yearInput.blur()
      }
    },
    onYearBlur() {
      const value = this.$refs.yearInput.value
      this.year = value.padStart(4, '0')
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