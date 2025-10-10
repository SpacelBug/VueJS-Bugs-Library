<template>
  <div class="component-box">
    <div class="time-text">
      <div class="hour">
        <input
            type="text"
            ref="hours"
            :value="hours"
            @click="select"
            placeholder="00"
            @keydown.prevent="checkValue(23, $refs.minutes)"
        >
      </div>
      <div class="minute">
        <input
            type="text"
            ref="minutes"
            :value="minutes"
            @click="select"
            placeholder="00"
            @keydown.prevent="checkValue(59, $refs.seconds)"
        >
      </div>
      <div class="seconds">
        <input
            type="text"
            ref="seconds"
            :value="seconds"
            @click="select"
            placeholder="00"
            @keydown.prevent="checkValue(59)"
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TimeInput',
  props: {
    modelValue: {
      default: new Date(),
      validator: (value) => {
        if (value instanceof String) {
          if (!RegExp("^[12]\d\:[0-5]\d\:[0-5]\d").test(value)) {
            console.error('wrong string format of model value in TimeInput component')
            return false
          }
        } else if (value instanceof Date) {
          return true
        } else if (value instanceof Object) {
          for (let key in this.modelValue) {
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
    if (this.modelValue instanceof String) {
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
          nextElement ? nextElement.focus() : event.target.blur()
        }

        if (event.target.value.length == 2) {
          nextElement ? nextElement.focus() : event.target.blur()
        }

        event.target.value = resultValue.toString().padStart(2, '0')
      } else if (['Backspace', 'Delete'].includes(event.key)) {
        event.target.value = null
      }
    },
    select() {
      event.target.select()
    },
    changeValue(value) {
      event.target.value = value
    },
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

.minute,
.seconds {
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
}

.minute::before,
.seconds::before {
  content: ':';
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