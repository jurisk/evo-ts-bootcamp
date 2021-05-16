type Brand<K, T> = K & { __brand: T }

export type PageNumber = Brand<number, 'PageNumber'>

export const DefaultRover: Rover = "curiosity"

export type Rover = "perseverence" | "curiosity" | "opportunity" | "spirit"

export type PhotoId = Brand<number, 'PhotoId'>

export type Url = Brand<string, 'Url'>

export type Photo = {
    id: PhotoId,
    img_src: Url,
}

export type Sol = Brand<number, 'Sol'>

export enum ControlsTab {
    Photos = "photos",
    Favourites = "favourites",
}
