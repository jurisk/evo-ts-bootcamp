import {PageNumber, Photo, Rover, Sol} from "./domain";

const ApiKey = "odlGkPB9bfGzgZvnjH54zaVPjdPaqVCzpjw2cVvC" // normally, we would pass this as an environment variable

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
            JSON.parse(x).photos.map((x: any) =>
                ({
                    id: x.id,
                    imageUrl: x.img_src,
                    description: `${x.id} - ${x.rover.name} - ${x.camera.name}`,
                })
            )
        )
}
