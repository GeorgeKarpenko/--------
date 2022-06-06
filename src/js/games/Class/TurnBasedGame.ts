import { ref, computed, watch } from 'vue'
import { Cell } from './Cell'
import store from '@/store';
import { GameActionTypes } from '@/store/game/action-types';


const namespace: string = 'game/';
let start!: ReturnType<typeof setTimeout>
const sec = ref(0)
const pause = computed<boolean>({
    get() {
        return store.state.game.pause
    },
    set(value) {
        return store.dispatch(namespace + GameActionTypes.PAUSE, value)
    }
})

const time = computed<string>({
    get() {
        return store.state.game.time
    },
    set(value) {
        return store.dispatch(namespace + GameActionTypes.TIME, value)
    }
})

const countMove = computed<number>({
    get() {
        return store.state.game.countMove
    },
    set(value) {
        return store.dispatch(namespace + GameActionTypes.COUNT_MOVE, value)
    }
})

const triggerGame = computed<boolean>({
    get() {
        return store.state.game.triggerGame
    },
    set(value) {
        return store.dispatch(namespace + GameActionTypes.TRIGGER_GAME, value)
    }
})
watch(
    () => sec.value,
    (sec) => {
        time.value = `${String(Math.trunc(sec / 60)).padStart(2,'0')}:${String(sec % 60).padStart(2,'0')}`
    }
)
watch(
    () => pause.value,
    (pause) => {
        if (!pause) {
            start = setInterval(() => {
                sec.value++
            }, 1000)
        } else {
            clearInterval(start)
        }
    }
)
watch(
    () => triggerGame.value,
    (triggerGame) => {
        pause.value = !triggerGame
    }
)

export default class TurnBasedGame {

    private moves!: object[]

    move(cell: Cell): void {}
    gameStart(): void {}
    moveCheck(cell: Cell): boolean { return true }
    private _gameEndCheck!: boolean
    public get gameEndCheck(): boolean {
        return this._gameEndCheck
    }
    public set gameEndCheck(value: boolean) {
        this._gameEndCheck = value
    }

    defaultVariables() {
        pause.value = false
        triggerGame.value = true
        countMove.value = 0
        sec.value = 0
        this.moves = []
        this.gameStart()
    }

    basicMoveLogic(cell: Cell) {
        if (!this.moveCheck(cell) || pause.value || !triggerGame.value) return

        this.move(cell)
        countMove.value++
        triggerGame.value = !this.gameEndCheck
    }
}
