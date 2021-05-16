const ApiKey = "odlGkPB9bfGzgZvnjH54zaVPjdPaqVCzpjw2cVvC" // normally, we would pass this as an environment variable

type Brand<K, T> = K & { __brand: T }

type PageNumber = Brand<number, 'PageNumber'>

type Rover = "perseverence" | "curiosity" | "opportunity" | "spirit"

type Camera = "all" | "FHAZ" | "RHAZ" | "MAST" | "CHEMCAM" | "MAHLI" | "MARDI" | "NAVCAM" | "PANCAM" | "MINITES"

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

function loadSinglePageOfRoverPhotos(rover: Rover, sol: Sol, camera: Camera = "all", page: PageNumber = 1 as PageNumber): Promise<readonly Photo[]> {
    return fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${ApiKey}&page=${page}&camera=${camera}`)
        .then(async (x) =>
            await x.text()
        )
        .then((x) =>
            JSON.parse(x).photos as readonly Photo[]
        )
}
