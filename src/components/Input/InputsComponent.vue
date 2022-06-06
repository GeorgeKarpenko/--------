<template>
    <p>{{ name }}</p>
    <component v-for="setting in modelValue" 
        :key="setting.id" 
        :setting="setting" 
        v-model="setting.value" 
        :is="setting.inputComponent"
        @input="updateInput"
    ></component>
</template>

<script>
import AudioComponent from "@/components/Input/AudioComponent.vue";
import FotoComponent from "@/components/Input/FotoComponent.vue";
import RangeComponent from "@/components/Input/RangeComponent.vue";
import NumberComponent from "@/components/Input/NumberComponent.vue";
export default {
    name: "InputsComponent",
    props: ['modelValue', 'name'],
    components: {
        AudioComponent,
        FotoComponent,
        RangeComponent,
        NumberComponent
    },
    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", this.modelValue);
        }
    }
}
</script>

<style scoped>
p {
    font-size: 150%;
    font-weight: 600;
}
:deep(label), :deep(p)  {
    font-size: 120%;
    font-weight: 600;
}
:deep(input) {
    font-size: 100%;
}
</style>