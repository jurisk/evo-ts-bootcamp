export enum Entity {
    Bricks,
    Window,
    Animal,
}

export type Coords = {
    x: number,
    y: number,
}

export type State = {
    windows: readonly Entity[][],
    score: number,
    reticle: Coords | null,
}
