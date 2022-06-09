import { ref } from 'vue';

export class Cell {
    #tag;
    readonly x;
    readonly y;
    constructor(tag: Tag, x: number, y: number) {
        this.#tag = ref(tag);
        this.x = x;
        this.y = y;
    }

    set tag(value: Tag) {
        this.#tag.value = value;
    }

    get tag() {
        return this.#tag.value;
    }
}
export class Tag {
    // TODO Замена value на index
    readonly value;
    // TODO opacity public
    opacity = 1;
    readonly x;
    readonly y;
    constructor(value: number, x: number, y: number) {
        this.value = value;
        this.x = x;
        this.y = y;
    }
}
