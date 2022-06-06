<script setup lang="ts">
import { computed } from "vue"
import store from '@/store';
import { GameActionTypes } from '@/store/game/action-types';
import Modal from "@/components/Modal.vue";

const namespace: string = 'game/';
const countMove = computed(() => store.state.game.countMove)
const time = computed(() => store.state.game.time)
const triggerGame = computed<boolean>({
    get() {
        return store.state.game.triggerGame
    },
    set(value) {
        return store.dispatch(namespace + GameActionTypes.TRIGGER_GAME, value)
    }
})

</script>

<template>
    <Modal v-if="!triggerGame" @close="triggerGame = true">
        <template v-slot:header>
            <h3>Вы выиграли!</h3>
        </template>
        <template v-slot:body>
            <p>Количество ходов: {{ countMove }}</p>
            <p>Время: {{ time }}</p>
        </template>
        <template v-slot:footer>
            <router-link class="button back" :to="{name:'Main'}">Назад</router-link>
            <button @click="triggerGame = true">Начать с начала</button>
        </template>
    </Modal>
</template>


<style scoped>

</style>