import { ref, Ref, computed, watch } from 'vue'
import { Cell } from './Cell'
import { useStore } from '@/store';
import { GameActionTypes } from '@/store/modules/game/action-types';

const store = useStore();

const pause = computed<boolean>({
    get() {
        return store.state.game.pause
    },
    set(value) {
        return store.dispatch(GameActionTypes.PAUSE, value)
    }
})

const countMove = computed<number>({
    get() {
        return store.state.game.countMove
    },
    set(value) {
        return store.dispatch(GameActionTypes.COUNT_MOVE, value)
    }
})
watch(
    () => pause.value,
    (pause) => {
        console.log('fsdfsdfds')
        if (pause) {
            clearInterval(this.start)
        } else {
            this.start = setInterval(() => {
                this.#sec.value++
            }, 1000)
        }
    }
)
export default class TurnBasedGame {

    /* Локальные переменные */

    #sec: Ref<number>
    start!: ReturnType<typeof setTimeout>
    triggerGame = ref<boolean>(true)
    private moves!: object[]
    #time = computed(() => {
        return `${String(Math.trunc(this.#sec.value / 60)).padStart(2,'0')}:${String(this.#sec.value % 60).padStart(2,'0')}`
    })

    /* Не локальные переменные */

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
    gameLevels!: (arr?: object[]) => object

    constructor() {
        countMove.value = 0
        this.#sec = ref(0)
        pause.value = false
        this.start = setInterval(() => {
            this.#sec.value++
        }, 1000)
    }

    set sec(value) {
        this.#sec = value
    }
    get sec() {
        return this.#sec;
    }

    get time() {
        return this.#time;
    }

    // setup() {
    //     watch(
    //         () => this.triggerGame.value,
    //         (triggerGame) => {
    //             if (triggerGame) {
    //                 this.defaultVariables()
    //                 this.start = setInterval(() => {
    //                     this.#sec.value++
    //                 }, 1000)
    //             } else {
    //                 clearInterval(this.start)
    //             }
    //         }
    //     )
    //     watch(
    //         () => this.#pause.value,
    //         (pause) => {
    //             console.log('fsdfsdfds')
    //             if (pause) {
    //                 clearInterval(this.start)
    //             } else {
    //                 this.start = setInterval(() => {
    //                     this.#sec.value++
    //                 }, 1000)
    //             }
    //         }
    //     )
    // }

    defaultVariables() {
        this.triggerGame.value = true
        pause.value = false
        countMove.value = 0
        this.#sec.value = 0
        this.moves = []
        this.gameStart()
    }

    basicMoveLogic(cell: Cell) {
        if (!this.moveCheck(cell) || pause.value || !this.triggerGame.value) return

        this.move(cell)
        countMove.value++
        this.triggerGame.value = !this.gameEndCheck
    }
}


