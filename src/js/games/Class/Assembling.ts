

    // preparingTheAssembly(): Array<number> {
    //     const cells = JSON.parse(JSON.stringify(this.#cells))
    //     console.log(this.#cells)

    //     const cellOpacity = JSON.parse(JSON.stringify(this.#cellOpacity))
    //     const array = this.assembling(cells, cellOpacity)
    //     return array
    // }

    // assembling(cells: Cell[], cellOpacity: Cell, moves: Array<number> = []): Array<number> {

    //     function gameEndCheck() {
    //         for (let i = 0; i < cells.length; i++) {
    //             if (cells[i].tag.value !== i) return false
    //         }
    //         return true
    //     }
    //     function move(cell: Cell) {
    //         [cellOpacity.tag, cell.tag] = [cell.tag, cellOpacity.tag]
    //     }
    //     for (let index = 0; index < cells.length; index++) {
    //         const cell = cells[index];
    //         if (cell.x === cellOpacity.x && cell.y === cellOpacity.y) continue
    //         if (cell.x === cellOpacity.x || cell.y === cellOpacity.y) move(cell)
    //         if (gameEndCheck()) {
    //             break;
    //         } else {
    //             moves.push(index)
    //             this.assembling(cells, cellOpacity, moves)
    //         }
    //     }
    //     console.log(moves)
    //     return moves
    // }