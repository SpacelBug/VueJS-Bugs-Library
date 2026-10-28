<template>
    <div class="component-view">
        <div class="component-variants">
            <div class="component-variant">
                <h3> With Date object value </h3>
                <p><b>Result: </b> {{ testValueDate }}</p>
                <TimeInput v-model="testValueDate" />
            </div>
            <div class="component-variant">
                <h3> With string value </h3>
                <p><b>Result: </b> {{ testValueString }}</p>
                <TimeInput v-model="testValueString" />
            </div>
            <div class="component-variant">
                <h3> With object value </h3>
                <p><b>Result: </b> {{ testValueObject }}</p>
                <TimeInput v-model="testValueObject" />
            </div>
            <div class="component-variant">
                <h3> With different accuracy </h3>
                <p><b>Result: </b> {{ testAccuracy.toLocaleString() }}:{{ testAccuracy.getMilliseconds() }}</p>
                <TimeInput v-model="testAccuracy" :accuracy="'milliseconds'"/>
                <TimeInput v-model="testAccuracy" />
                <TimeInput v-model="testAccuracy" :accuracy="'minutes'"/>
                <TimeInput v-model="testAccuracy" :accuracy="'hours'"/>
            </div>
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
                <p><u>accuracy:</u></p>
                <ul>
                    <li><b>milliseconds:</b> allow to select hours, minutes, seconds ad milliseconds</li>
                    <li><b>seconds:</b> default, allow to select hours, minutes and seconds</li>
                    <li><b>minutes:</b> allow to select hours and minutes</li>
                    <li><b>hours:</b> allow to select only hours</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import TimeInput from '@/components/inputs/datetime-input/TimeInput.vue';

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
            testAccuracy: new Date(),
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

.component-variant {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border: solid 1px var(--border-color);
}

.results {
    display: flex;
    flex-direction: column;
}

.description {
    width: 500px;
}
</style>