const ApiKey = "odlGkPB9bfGzgZvnjH54zaVPjdPaqVCzpjw2cVvC" // normally, we would pass this as an environment variable

type Brand<K, T> = K & { __brand: T }

type PageNumber = Brand<number, 'PageNumber'>

export const DefaultRover: Rover = "curiosity"

type Rover = "perseverence" | "curiosity" | "opportunity" | "spirit"

export type PhotoId = Brand<number, 'PhotoId'>

type Url = Brand<string, 'Url'>

export type Photo = {
    id: PhotoId,
    img_src: Url,
}

export type Sol = Brand<number, 'Sol'>

export function loadRoverPhotos(rover: Rover, sol: Sol): Promise<readonly Photo[]> {
    // TODO: support pagination
    return loadSinglePageOfRoverPhotos(rover, sol)
}

function loadSinglePageOfRoverPhotos(rover: Rover, sol: Sol, page: PageNumber = 1 as PageNumber): Promise<readonly Photo[]> {
    return fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${ApiKey}&page=${page}`)
        .then(async (x) =>
            await x.text()
        )
        .then((x) =>
            JSON.parse(x).photos as readonly Photo[]
        )
}
