<template>
    <div>
        <label v-if="setting.label" :for="setting.id">
            {{ setting.label }}:
        </label>
        <div id="grid">
            <img v-for="option in setting.options"
                :key="option.value"
                :src="option.value"
                @click="updateInput(option.value)"
                :class="value == option.value ? 'active' : ''"
            />
        </div>
    </div>
</template>

<script>

export default {
    name: "FotoComponent",
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
        updateInput(value) {
            this.value = value
            this.$emit("update:modelValue", value)
        }
    }
};
</script>

<style scoped>
label {
    display: block;
    text-align: left;
    margin-bottom: 6px;
}
#grid {
    display: grid;
    gap: 10px 2.5%;
    grid-template-columns: repeat(3, min(31.666666%, 150px));
    justify-content: center;
}
img {
    box-sizing: border-box;
    border: 2px solid #fff;
    width: 100%;
}
img.active {
    border: 2px solid #4CAF50;
}
</style>