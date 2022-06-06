<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue"
import store from '@/store';
import { GameActionTypes } from '@/store/game/action-types';
import Pause from "@/components/SVG/Pause.vue"
import Play from "@/components/SVG/Play.vue"
import SVGMenu from "@/components/SVG/Menu.vue"

const namespace: string = 'game/'
const countMove = computed(() => store.state.game.countMove)
const time = computed(() => store.state.game.time)
const pause = computed<boolean>({
    get() {
        return store.state.game.pause
    },
    set(value) {
        return store.dispatch(namespace + GameActionTypes.PAUSE, value)
    }
})

const gameVolume = store.state.settings.gameVolume
const audio = ref<HTMLAudioElement>();

onMounted(() => {

    audio.value!.volume = 1 / gameVolume.max * gameVolume.value
    watch(
        () => countMove.value,
        () => {
            audio.value!.pause()
	        audio.value!.currentTime = 0.0
            audio.value!.play()
        }
    )
});
</script>

<template>
    <audio ref="audio" src="/src/assets/music/Звук_Игры.mp3"></audio>
    <header>
        <nav>
            <p>Время: {{ time }}</p>
            <div @click="pause = !pause">
                <Play v-show="pause" />
                <Pause v-show="!pause" />
            </div>
            <p>Количество ходов: {{ countMove }}</p>
            <router-link :to="{name:'Main'}"><SVGMenu /></router-link>
        </nav>
    </header>
</template>


<style scoped>
svg {
    height: 1.5em;
}
nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
header {
    height: var(--header-height);
    width: 100%;
}
</style>