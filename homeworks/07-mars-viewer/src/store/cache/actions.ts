import { CacheActionType, AddPhotosAction } from "./types"
import {Photo, Sol} from "../../domain";

export const addPhotos = (sol: Sol, photos: readonly Photo[]): AddPhotosAction => ({
    type: CacheActionType.AddPhotos,
    sol: sol,
    photos: photos,
})
