<template>
    <div>
        <label v-if="setting.label" :for="setting.id">
            {{ setting.label }}
        </label>
        <input
            :id="setting.id"
            :min="setting.min"
            :max="setting.max"
            :value="modelValue"
            @input="updateInput"
            type="range"
        />
    </div>
</template>

<script>
export default {
    name: "RangeComponent",
    props: {
        setting: {
            id: {
                type: String,
                default: "",
            },
            label: {
                type: String,
                default: "",
            },
            min: {
                type: Number,
                default: "",
            },
            max: {
                type: Number,
                default: "",
            }
        },
        modelValue: {
            type: Number,
            default: "",
        }
    },
    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", parseInt(event.target.value));
        }
    }
};
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
}
label {
    width: calc(100% - 137px);
    display: inline-block;
    text-align: left;
}
input {
    width: 133px;
    margin: 2px;
}
</style>