<template>
    <div class="component-view">
        <div class="component-variants">
            <div class="component-variant">
                <Spoiler>
                    <template v-slot:caption>
                        Spoiler text
                    </template>
                    <template v-slot:content>
                        <h3>Some header</h3>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, fugiat eos autem
                        distinctio, ipsam corrupti vero nesciunt, ipsum sequi laudantium minus. Ipsum iure animi libero
                        excepturi, quisquam inventore repellendus sit. Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Sit consectetur expedita numquam, illo tempora fuga aliquam quod neque fugiat
                        natus error, quis, necessitatibus assumenda amet labore dolorum sequi cumque similique.
                    </template>
                </Spoiler>
                <h3>Other content</h3>
                <div class="other-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur consequatur totam quos architecto,
                    quisquam voluptatum sed cupiditate libero aperiam magnam possimus alias earum reprehenderit ea
                    molestias voluptate similique? Accusantium, aliquid.
                </div>
            </div>
        </div>
        <div class="description">
            <h3>Spoiler component</h3>
            Component for hide some information. Realized by slots <br>
            <div class="description">
                <p></p>
                <p><b>Slots:</b></p>
                <p><u>caption</u> - visible part</p>
                <p><u>content</u> - hidden content</p>
                <p><b>Props:</b></p>
                <p><u>width:</u> - width of hidden content in px. Default is 100%</p>
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
    justify-content: space-between;
    gap: 16px;
}

.component-variant {
    display: flex;
    flex-direction: column;
    width: 500px;
    gap: 8px;
}
</style>