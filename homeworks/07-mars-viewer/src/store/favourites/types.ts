import { Action } from "redux"
import {PhotoId} from "../../api";
import {Set} from "immutable"

export interface FavouritesState {
    favourites: Set<PhotoId>;
}

export enum FavouritesActionType {
    Add = "Add",
    Remove = "Remove",
}

export interface AddFavouriteAction extends Action {
    type: FavouritesActionType.Add;
    payload: PhotoId;
}

export interface RemoveFavouriteAction extends Action {
    type: FavouritesActionType.Remove;
    payload: PhotoId;
}

export type FavouritesAction = AddFavouriteAction | RemoveFavouriteAction;
