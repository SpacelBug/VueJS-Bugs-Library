<template>
    <div class="component-view">
        <TimeInput v-model="testValue"/>
        <div class="description">
            <h3>Time input component</h3>
            <div class="description">
                <p></p>
                <p><b>Props:</b></p>
                <p>modelValue: </p>
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
            testValue: new Date()
        }
    }
};
</script>

<style scoped>
.component-view {
    display: flex;
    flex-direction: row;
    gap: 16px;
}
</style>