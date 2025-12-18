<template>
  <div class="component-box">
    <div class="time-text">
      <input
          type="text"
          ref="hours"
          :value="hours !== null ? hours.toString().padStart(2, '0') : null"
          @click="select"
          placeholder="00"
          @keydown.prevent="hours = checkValue(23, $refs.minutes); updateModelValue()"
      >
      <span class="divider">:</span>
      <input
          type="text"
          ref="minutes"
          :value="minutes !== null ? minutes.toString().padStart(2, '0') : null"
          @click="select"
          placeholder="00"
          @keydown.prevent="minutes = checkValue(59, $refs.seconds); updateModelValue()"
      >
      <span class="divider">:</span>
      <input
          type="text"
          ref="seconds"
          :value="seconds !== null ? seconds.toString().padStart(2, '0') : null"
          @click="select"
          placeholder="00"
          @keydown.prevent="seconds = checkValue(59); updateModelValue()"
      >
    </div>
  </div>
</template>

<script>

export default {
  name: 'TimeInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      default: new Date(),
      validator: (value) => {
        if ((typeof value === "string") || (value instanceof String)) {
          if (!/^[1-2]\d\:[0-5]\d\:[0-5]\d/.test(value)) {
            console.error('wrong string format of model value in TimeInput component')
            return false
          }
        } else if (value instanceof Date) {
          return true
        } else if (value instanceof Object) {
          for (let key in value) {
            if (!['hours', 'minutes', 'seconds'].includes(key)) {
              console.error('wrong object format of model value in TimeInput component')
            }
          }
        } else {
          console.error('wrong type of model value in TimeInput component')
        }
        return true
      }
    }
  },
  data() {
    return {
      hours: null,
      minutes: null,
      seconds: null,
    }
  },
  mounted() {
    if ((typeof this.modelValue === "string") || (this.modelValue instanceof String)) {
      this.hours = this.modelValue.split(':')[0]
      this.minutes = this.modelValue.split(':')[1]
      this.seconds = this.modelValue.split(':')[2]
    } else if (this.modelValue instanceof Date) {
      this.hours = this.modelValue.getHours()
      this.minutes = this.modelValue.getMinutes()
      this.seconds = this.modelValue.getSeconds()
    } else if (this.modelValue instanceof Object) {
      this.hours = this.modelValue.hours
      this.minutes = this.modelValue.minutes
      this.seconds = this.modelValue.seconds
    }
  },
  methods: {
    checkValue(max, nextElement = null) {
      if (!isNaN(event.key)) {
        if (window.getSelection().type === "Range") {
          event.target.value = 0
        }

        let resultValue = event.target.value !== null ? Number(event.target.value + event.key) : Number(event.key)

        if (resultValue > max) {
          resultValue = max
        }

        if (resultValue > Math.trunc(max / 10)) {
          if (nextElement) {
            nextElement.focus()
            nextElement.select()
          } else {
            event.target.blur()
          }
        }

        if (event.target.value.length == 2) {
          if (nextElement) {
            nextElement.focus()
            nextElement.select()
          } else {
            event.target.blur()
          }
        }

        return resultValue
      } else if (['Backspace', 'Delete'].includes(event.key)) {
        return null
      }
    },
    updateModelValue() {
      if ((typeof this.modelValue === "string") || (this.modelValue instanceof String)) {
        this.$emit('update:modelValue', `${this.hours}:${this.minutes}:${this.seconds}`)
      } else if (this.modelValue instanceof Date) {
        let date = new Date(this.modelValue)
        date.setHours(this.hours, this.minutes, this.seconds)
        this.$emit('update:modelValue', date)
      } else if (this.modelValue instanceof Object) {
        this.$emit('update:modelValue', {hours: this.hours, minutes: this.minutes, seconds: this.seconds})
      }
    }
  }
};
</script>
<style scoped>
.component-box {
  background-color: var(--panels-color);
  padding: 8px 16px;
  border-radius: 5px;
  height: fit-content;
}

.time-text {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
}

.divider {
  color: white;
}

input {
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  width: 2ch;
  height: fit-content;
  color: white;
  user-select: all;
}
</style>