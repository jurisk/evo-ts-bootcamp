import { FavouritesActionType, AddFavouriteAction, RemoveFavouriteAction } from "./types"
import {PhotoId} from "../../domain";

export const addFavourite = (id: PhotoId): AddFavouriteAction => ({
    type: FavouritesActionType.Add,
    id: id,
})

export const removeFavourite = (id: PhotoId): RemoveFavouriteAction => ({
    type: FavouritesActionType.Remove,
    id: id,
})
