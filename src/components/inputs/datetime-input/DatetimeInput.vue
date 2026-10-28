<template>
  <div class="datetime-box">
    <date-input
        v-model="dateValue"
        :keyboard-input="true"
        @update:modelValue="onUpdateModelValue"
        @date-focusout="onDateFocusout"
    >
      <template v-slot:time-place>
        <time-input
            v-model="timeValue"
            style="padding: 0;"
            ref="timeInput"
            :accuracy="accuracy"
            @update:modelValue="onUpdateModelValue"
        />
      </template>
    </date-input>
  </div>
</template>

<script>
import DateInput from './DateInput.vue';
import TimeInput from './TimeInput.vue';

export default {
  name: "DatetimeInput",
  emits: ["update:modelValue"],
  props: {
    modelValue: { type: Date, required: true },
    accuracy: { type: String, default: 'seconds', validator: (value) => {
      return ['hours', 'minutes', 'seconds', 'milliseconds'].includes(value)
    }},
  },
  components: {
    DateInput,
    TimeInput,
  },
  data() {
    return {
      dateValue: null,
      timeValue: null,
    }
  },
  beforeMount() {
    this.dateValue = new Date(this.modelValue)
    this.timeValue = new Date(this.modelValue)
  },
  methods: {
    onDateFocusout() {
      this.$refs.timeInput.$refs.hours.focus()
    },
    onUpdateModelValue() {
      this.$emit("update:modelValue", new Date(
        this.dateValue.getFullYear(),
        this.dateValue.getMonth(),
        this.dateValue.getDate(),

        this.timeValue.getHours(),
        this.timeValue.getMinutes(),
        this.timeValue.getSeconds(),
      ))
    }
  }
}
</script>

<style scoped>
.datetime-box {
  display: flex;
  flex-direction: row;
  background-color: var(--panels-color);
  width: fit-content;
  border-radius: 5px;
  align-items: center;
}
</style>