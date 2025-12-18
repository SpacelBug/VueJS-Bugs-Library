<template>
    <div class="component-view">
        <div class="component-variants">
            <TimeInput v-model="testValueDate" />
            <TimeInput v-model="testValueString" />
            <TimeInput v-model="testValueObject" />
        </div>

        <div class="results">
            <h3>Returned values:</h3>
            <span>
                <p>{{ testValueDate }}</p>
                <p>{{ testValueString }}</p>
                <p>{{ testValueObject }}</p>
            </span>
        </div>

        <div class="description">
            <h3>Time input component</h3>
            <div class="description">
                <p></p>
                <p><b>Props:</b></p>
                <p><u>modelValue:</u></p>
                Object: {hours, minutes, seconds}<br>
                Date()<br>
                String: "23:00:00"
            </div>
        </div>
    </div>
</template>

<script>
import TimeInput from '@/components/inputs/time/TimeInput.vue';

export default {
    name: 'SwitchView',
    components: {
        TimeInput
    },
    data() {
        return {
            testValueDate: new Date("2025-12-12 14:00:00"),
            testValueString: "14:00:00",
            testValueObject: { hours: 14, minutes: 0, seconds: 59 },
        }
    }
};
</script>

<style scoped>
.component-view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
}

.component-variants {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
}

.results {
    display: flex;
    flex-direction: column;
}

.description {
    width: 500px;
}
</style>