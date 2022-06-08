import { Cell, Tag } from './Cell'
import TurnBasedGame from './TurnBasedGame'
import { computed } from "vue"
import store from '@/store';

const tagsColumns = computed(() => store.state.settings.tagsColumns.value)
const tagsRows = computed(() => store.state.settings.tagsRows.value)
export default class Grid extends TurnBasedGame {
    #cells: Cell[]
    #tagOpacity: Tag
    #cellOpacity: Cell
    constructor() {
        super()
        
        this.#cells = createCellElements();
        // TODO любая клетка
        // this.#cellOpacity = this.#cells[Math.floor(Math.random() * this.#cells.length)]
        this.#cellOpacity = this.#cells[this.#cells.length - 1]
        this.#tagOpacity = this.#cellOpacity.tag;
        this.#tagOpacity.opacity = 0
        this.defaultVariables()
        this.shuffleCells()
    }

    get cells() {
        return this.#cells
    }

    get tagOpacity() {
        return this.#tagOpacity
    }

    set tagOpacity(value) {
        this.#tagOpacity = value
    }

    get cellOpacity() {
        return this.#cellOpacity
    }

    set cellOpacity(value) {
        this.#cellOpacity = value
    }

    get cellsByColumn(): Cell[][] {
        return this.#cells.reduce((cellGrid: Cell[][], cell: Cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell
            return cellGrid
        }, [])
    }

    get cellsByRow(): Cell[][] {
        return this.#cells.reduce((cellGrid: Cell[][], cell: Cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell
            return cellGrid
        }, [])
    }

    get gameEndCheck() {
        return this.#cells.every((element, index) => {
            return element.tag.value === index
        })
    }

    opacityCellAndTag() {
        // TODO любая клетка
        // this.cellOpacity = this.#cells[Math.floor(Math.random() * this.#cells.length)]
        this.#cellOpacity = this.#cells[this.#cells.length - 1]
        this.#tagOpacity = this.cellOpacity.tag
        this.#tagOpacity.opacity = 0
    }

    shuffleCells(): any {
        function shuffle(array: number[]): number[] {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array
        }
        function isWinningPosition() {
            return arrayRandomIndexTags.every((element, index) => {
                return element === index
            })
        }
        let arrayRandomIndexTags = [...Array(this.#cells.length).keys()]
        arrayRandomIndexTags = shuffle(arrayRandomIndexTags)
        
        let k = 0
        let tag = arrayRandomIndexTags.findIndex(i => this.#tagOpacity.value === i)
        
        if (tagsColumns.value % 2 === 0 && (tagsRows.value - Math.floor(tag / tagsColumns.value)) % 2 === 0) k++
        
        const ARRAY_NO_TAG_OPACITY = arrayRandomIndexTags.filter(i => this.#tagOpacity.value !== i);
        for (let i = 0; i < ARRAY_NO_TAG_OPACITY.length; i++) {
            for (let j = i + 1; j < ARRAY_NO_TAG_OPACITY.length; j++) {
                if (ARRAY_NO_TAG_OPACITY[i] > ARRAY_NO_TAG_OPACITY[j]) k++
            }
        }
        if (k % 2 !== 0 || isWinningPosition()) return this.shuffleCells()
        let arrayTag: Tag[] = []
        arrayRandomIndexTags.forEach((element, index) => {
            arrayTag.push(this.#cells[index].tag)
            this.#cells[index].tag = arrayTag[element] || this.#cells[element].tag
            if (this.#cells[index].tag.value === this.#tagOpacity.value) this.#cellOpacity = this.#cells[index]
        });
    }

    arrayShiftToRight(array: Cell[]) {
        this.#cellOpacity = array[0]
        let tag = array[array.length - 1].tag
        for (let index = array.length - 1; index > 0; index--) {
            array[index].tag = array[index - 1].tag
        }
        array[0].tag = tag
    }
    
    move(cell: Cell) {
        if (this.#cellOpacity.y > cell.y) {
            this.arrayShiftToRight(this.cellsByColumn[cell.x].slice(cell.y, this.#cellOpacity.y + 1))
        }
        if (this.#cellOpacity.y < cell.y) {
            this.arrayShiftToRight(this.cellsByColumn[cell.x].slice(this.#cellOpacity.y, cell.y+ 1).reverse())
        }
        if (this.#cellOpacity.x > cell.x) {
            this.arrayShiftToRight(this.cellsByRow[cell.y].slice(cell.x, this.#cellOpacity.x + 1))
        }
        if (this.#cellOpacity.x < cell.x) {
            this.arrayShiftToRight(this.cellsByRow[cell.y].slice(this.#cellOpacity.x, cell.x + 1).reverse())
        }
    }

    moveCheck(cell: Cell): boolean {
        if (this.#cellOpacity.x !== cell.x && this.#cellOpacity.y === cell.y ||
            this.#cellOpacity.x === cell.x && this.#cellOpacity.y !== cell.y) return true
        return false
    }
}

function createCellElements() {
    const cells = []
    for (let i = 0; i < tagsColumns.value * tagsRows.value; i++) {
        const X = i % tagsColumns.value
        const Y = Math.floor(i / tagsColumns.value)
        cells.push(
            new Cell(
                new Tag(
                    i, 
                    X, 
                    Y
                ),
                X, 
                Y
            )
        )      
    }
    return cells
}