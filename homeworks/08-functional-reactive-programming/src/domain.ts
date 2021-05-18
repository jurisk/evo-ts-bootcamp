export enum Entity {
    Bricks,
    Window,
    Animal,
}

export type State = {
    windows: readonly Entity[][],
    score: number,
    mouseX: number,
    mouseY: number,
}
