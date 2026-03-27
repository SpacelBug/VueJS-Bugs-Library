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
                <p><u>Date</u> - {{ testValueDate }}</p>
                <p><u>String</u> - {{ testValueString }}</p>
                <p><u>Object</u> - {{ testValueObject }}</p>
            </span>
        </div>

        <div class="description">
            <h3>Time input component</h3>
            This component could work with different format of time. It could be:
            <ul>
                <li><u>String</u> - "23:00:00"</li>
                <li><u>Object</u> - {hours, minutes, seconds}</li>
                <li><u>Date</u> - Date()</li>
            </ul> 
            <div class="description">
                <p></p>
                <p><b>Props:</b></p>
                <p><u>modelValue:</u> for v-model prop</p>
            </div>
        </div>
    </div>
</template>

<script>
import TimeInput from '@/components/inputs/TimeInput.vue';

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
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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