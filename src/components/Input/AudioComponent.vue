<template>
    <div>
        <p v-if="setting.label">
            {{ setting.label }}:
        </p>
        <div id="grid">
            <template v-for="option in setting.options"
                :key="option.value"
            >
                <input type="radio" name="value" :value="option.value" :id="option.value" :checked="value === option.value"
                @input="updateInput">
                <label :for="option.value">{{ option.text }}</label>
            </template>

        </div>
    </div>
</template>

<script>

export default {
    name: "AudioComponent",
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
            options: {
                // type: Options,
                default: []
            }
        },
        modelValue: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            value: this.modelValue
        }
    },
    methods: {
        updateInput(event) {
            this.value = event.target.value
            this.$emit("update:modelValue", event.target.value)
        }
    }
};
</script>

<style scoped>
label {
    display: block;
    text-align: left;
    font-size: 100% !important;
    font-weight: 100 !important;
}
input {
    margin: 0;
}
#grid {
    display: grid;
    justify-content: center;
    gap: 10px 3.5%;
    grid-template-columns: min(3.5%, 13px) min(91.5%, 437px);
    align-items: center;
}
p {
    text-align: left;
}
</style>