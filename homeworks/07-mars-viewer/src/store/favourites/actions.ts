import { FavouritesActionType, AddFavouriteAction, RemoveFavouriteAction } from "./types"
import {PhotoId} from "../../api";

export const addFavourite = (id: PhotoId): AddFavouriteAction => ({
    type: FavouritesActionType.Add,
    payload: id,
})

export const removeFavourite = (id: PhotoId): RemoveFavouriteAction => ({
    type: FavouritesActionType.Remove,
    payload: id,
})
