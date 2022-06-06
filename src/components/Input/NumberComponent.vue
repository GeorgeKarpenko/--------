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
            type="number"
        />
    </div>
</template>

<script>
export default {
    name: "NumberComponent",
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
label {
    width: calc(100% - 50px);
    display: inline-block;
    text-align: left;
}
input {
    width: 50px;
    box-sizing: border-box;
}
</style>