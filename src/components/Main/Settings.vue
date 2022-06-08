<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { router } from '@/router'
import store from '@/store';
import type { State } from '@/store/settings/state';
import { SettingsActionTypes } from '@/store/settings/action-types';
import InputsComponent from "@/components/Input/InputsComponent.vue";

const namespace: string = 'settings/';
const audioSrc = computed(() => store.state.game.audioSrc)
const audio = ref<HTMLAudioElement>();
onMounted(() => {
  watch(
    () => settings.value.gameVolume.value,
    (gameVolume) => {
      audio.value!.volume = 1 / settings.value.gameVolume.max * gameVolume
      audio.value!.pause()
      audio.value!.currentTime = 0.0
      audio.value!.play()
    })
})
const settings = computed<State>({
  get() {
    return store.state.settings
  },
  set(value) {
    return store.dispatch(namespace + SettingsActionTypes.UP_DATA, value)
  }
})
const initialSettings = JSON.parse(JSON.stringify(settings.value))

function exitInMain(save = false) {
  if (!save) {
    settings.value = initialSettings
  }
  router.push({name: 'Main'})
}


</script>

<template>
  <audio ref="audio" :src="audioSrc"></audio>
  <div class="container">
    <inputs-component v-model="settings" name="Настройки"></inputs-component>
    <div class="upSetting"><button @click="exitInMain()" class="cancel">Отмена</button> <button @click="exitInMain(true)">Сохранить</button></div>
  </div>
</template>

<style scoped>
.container {
  max-width: calc(450px + 1vmin);
  min-width: 280px;
  margin: auto;
  padding: 0 20px;
  display: grid;
  gap: 13px;
}

.upSetting {
  width: 280px;
  margin: auto;
}
.upSetting button {
  padding: 15px 20px;
}
.upSetting button {
    transition-duration: 0.4s;
}
.upSetting button.cancel {
  border: 2px solid #f44336;
}

.upSetting button:hover {
  background-color: #4CAF50;
  color: white;
}

.upSetting button.cancel:hover {
  background-color: #f44336;
}

.upSetting {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.upSetting button {
  width: 130px;
}

</style>