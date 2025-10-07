<template>
    <div class="component-view">
        <drop-down
            v-model="testValue"
            :options="testOptions"
            :width="200"
        />
        <div class="description">
            <h3>Drop-Down component</h3>
            <div class="description">
                <p>Custom drop down with specific params and different types</p>
                <p><b>Props:</b></p>
                <p>modelValue: </p>
                <p>options: </p>
                <p>type: </p>
                <p>width: </p>
            </div>
        </div>
    </div>
</template>

<script>
import DropDown from '@/components/inputs/drop-down/DropDown.vue';

export default {
    name: 'SwitchView',
    components: {
        DropDown
    },
    data() {
        return {
            testValue: false,
            testOptions: [
                'Dog',
                'Cat',
                'Frog',
                'Whale'
            ],
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