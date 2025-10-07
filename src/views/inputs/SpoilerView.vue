<template>
    <div class="component-view">
        <Spoiler>
            <template v-slot:caption>
                Spoiler text
            </template>
            <template v-slot:content>
                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam excepturi doloribus vitae vel ipsa iure voluptates natus debitis quidem, corrupti odit, adipisci magni, esse et enim numquam dolorem? Sunt, amet.</div>
            </template>
        </Spoiler>
        <div class="description">
            <h3>Spoiler component</h3>
            <div class="description">
                <p></p>
                <p><b>Props:</b></p>
                <p>width:</p>
            </div>
        </div>
    </div>
</template>

<script>
import Spoiler from '@/components/content/spoiler/Spoiler.vue';

export default {
    name: 'SwitchView',
    components: {
        Spoiler
    },
    data() {
        return {
            testValue: false
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