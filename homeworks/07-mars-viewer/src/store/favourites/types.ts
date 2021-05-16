import { Action } from "redux"
import {PhotoId} from "../../domain";
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
    id: PhotoId;
}

export interface RemoveFavouriteAction extends Action {
    type: FavouritesActionType.Remove;
    id: PhotoId;
}

export type FavouritesAction = AddFavouriteAction | RemoveFavouriteAction;
