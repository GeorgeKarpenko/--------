<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue"
import store from '@/store';
import Grid from "@/js/games/Class/Grid"
import ModalGame from "@/components/Play/ModalGame.vue"
import HeaderComponent from "@/components/Play/Header.vue"

const grid = new Grid()

const triggerGame = computed(() => store.state.game.triggerGame)

const tagsColumns = computed(() => store.state.settings.tagsColumns.value)
const tagsRows = computed(() => store.state.settings.tagsRows.value)
const img = computed(() => store.state.settings.imgs.value)

const game = ref<HTMLElement>();

onMounted(() => {
    game.value!.style.setProperty('--tags-columns', `${tagsColumns.value}`)
    game.value!.style.setProperty('--tags-rows', `${tagsRows.value}`)
    game.value!.style.setProperty('--aside-x', `${grid.tagOpacity.x + 1}`)
    game.value!.style.setProperty('--aside-y', `${grid.tagOpacity.y + 1}`)
    game.value!.style.setProperty('--background-image', 'url(' + new URL(`${img.value}`, import.meta.url).href + ')')

    watch(
        () => triggerGame.value,
        (triggerGame) => {
            if (triggerGame) {
                grid.defaultVariables()
                game.value!.style.setProperty('--aside-x', `${grid.tagOpacity.x + 1}`)
                game.value!.style.setProperty('--aside-y', `${grid.tagOpacity.y + 1}`)
                game.value!.classList.remove('game-end')
            } else {
                game.value!.classList.add('game-end')
                grid.tagOpacity.opacity = 1
            }
        }
    )
});
</script>

<template>
    <div ref="game" class="game">
        <HeaderComponent />
        <aside></aside>
        <div id="game-board">
            <transition-group name="moving">
                <div
                    v-for="cell in grid.cells"
                    @click="grid.basicMoveLogic(cell)"
                    :key="cell.tag.value"
                    :style="`--x: ${cell.tag.x}; --y: ${cell.tag.y}; --opacity: ${cell.tag.opacity}`"
                    class="tag"
                >
                </div>
            </transition-group>
        </div>
    </div>
    <ModalGame />
</template>

<style scoped>
.game {
    --header-height: 50px;
    --size-foto-and-game-board: min(98vw, calc(45vmax - var(--header-height)));
    --tag-gap: max(0.5vmin, 3px);
    --tag-border-radius: max(1vmin, 5px);
    display: flex;
    flex-wrap: wrap;
    gap: 2vmin;
    height: 100vh;
    align-content: flex-start;
    justify-content: center;
}
.game-end {
    --tag-gap: 0px;
    --tag-border-radius: 0px;
}

#game-board {
    --tag-size-columns: calc((var(--size-foto-and-game-board) + var(--tag-gap)) / var(--tags-columns) - var(--tag-gap));
    --tag-size-rows: calc((var(--size-foto-and-game-board) + var(--tag-gap)) / var(--tags-rows) - var(--tag-gap));
    display: grid;
    grid-template-columns: repeat(var(--tags-columns), var(--tag-size-columns));
    grid-template-rows: repeat(var(--tags-rows), var(--tag-size-rows));
    gap: var(--tag-gap);
    transition: .3s;
}

.tag {
    --tag-background-position-left: calc(100% / (var(--tags-columns) - 1) * var(--x));
    --tag-background-position-top: calc(100% / (var(--tags-rows) - 1) * var(--y));
    background-image: var(--background-image);
    border-radius: var(--tag-border-radius);
    background-size: var(--size-foto-and-game-board) var(--size-foto-and-game-board);
    background-position: var(--tag-background-position-left) var(--tag-background-position-top);
    opacity: var(--opacity);
}

aside {
    width: var(--size-foto-and-game-board);
    height: var(--size-foto-and-game-board);
    background-image: var(--background-image);
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: var(--tag-border-radius);
}

aside::before  {
    --width: calc(100% / var(--tags-columns));
    --height: calc(100% / var(--tags-rows));
    content: "";
    display: block;
    height: var(--height);
    width: var(--width);
    margin-top: calc(var(--height) * (var(--aside-y) - 1));
    margin-left: calc(var(--width) * (var(--aside-x) - 1));
    background: #fff;
}
.moving-move {
    transition: transform .3s;
}
</style>