import {PageNumber, Photo, PhotoId, Rover, Sol, Url} from "./domain"

const ApiKey = "odlGkPB9bfGzgZvnjH54zaVPjdPaqVCzpjw2cVvC" // normally, we would pass this as an environment variable

export function loadRoverPhotos(rover: Rover, sol: Sol): Promise<readonly Photo[]> {
    // TODO: support pagination
    return loadSinglePageOfRoverPhotos(rover, sol)
}

interface PhotoJson {
    id: number;
    img_src: string;
    rover: {
        name: string;
    }
    camera: {
        name: string;
    }
}

interface JsonResponse {
    photos: readonly PhotoJson[]
}

function convertPhotoData(response: JsonResponse) {
    return response.photos.map((photoJson) =>
        ({
            id: photoJson.id as PhotoId,
            imageUrl: photoJson.img_src as Url,
            description: `${photoJson.id} - ${photoJson.rover.name} - ${photoJson.camera.name}`,
        })
    )
}

function loadSinglePageOfRoverPhotos(rover: Rover, sol: Sol, page: PageNumber = 1 as PageNumber): Promise<readonly Photo[]> {
    return fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${ApiKey}&page=${page}`)
        .then(response => response.json() as Promise<JsonResponse>)
        .then(convertPhotoData)
}
