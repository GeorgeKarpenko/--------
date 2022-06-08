<script setup lang="ts">

import { ref, computed, onMounted, watch } from "vue"
import store from '@/store';
import { SettingsActionTypes } from '@/store/settings/action-types';
import Modal from "@/components/Modal.vue"

const namespace: string = 'settings/';
const music = computed(() => store.state.settings.musicSelection.value);
const musicVolun = computed(() => store.state.settings.musicVolume);
const loaded = ref(true);
Promise.all([
    store.dispatch(namespace + SettingsActionTypes.IMGS),
    store.dispatch(namespace + SettingsActionTypes.MUSIC_SELECTION)
    ]).then(values => {
        loaded.value = false
})

const triggerModal = ref(true)
const triggerAudio = ref(false)
const audio = ref<HTMLAudioElement>();
onMounted(() => {
    watch(() => triggerAudio.value,
        (triggerAudio) => {
            if (triggerAudio) {
                audio.value!.src = music.value
                audio.value!.play()
                audio.value!.muted=false
            }
        }
    )
    watch(() => music.value,
        () => {
            if (triggerAudio.value) {
                console.log(audio.value)
                audio.value!.src = music.value
                audio.value!.currentTime = 0;
                audio.value!.play();
            } else {
                triggerModal.value = true
            }
        }
    )
    watch(() => musicVolun.value.value,
        (musicVolume) => {
          audio.value!.volume = 1 / musicVolun.value.max * musicVolume;
            if (!triggerAudio.value) {
                triggerModal.value = true
            }
        }
    )

})
function musicStart(trigger: boolean = false) {
    triggerModal.value = false
    triggerAudio.value = trigger
    if (trigger) {
        audio.value!.muted = true
    }
}
</script>

<template>
    <template v-if="!loaded">
        <audio ref="audio" loop></audio>
        <router-view/>
        <Modal v-if="triggerModal">
            <template v-slot:header>
            <h3>Согласие на музыку в игре</h3>
            </template>
            <template v-slot:body>
            <p>Даёте ли вы согласие на музыку в этой игре?</p>
            </template>
            <template v-slot:footer>
            <button @click="musicStart(true)">Да</button>
            <button @click="musicStart()">Нет</button>
            </template>
        </Modal>
    </template>
</template>

<style>
body {
    margin: 0;
}
#app {
    text-align: center;
}

.borderSelected {
    border: 2px solid #4CAF50;
    box-sizing: border-box;
}
.border {
    border: 2px solid white;
    box-sizing: border-box;
}
button, .button {
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
    padding: 0px 7px;
    text-align: center;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    margin: 16px 0 !important;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
}
</style>
