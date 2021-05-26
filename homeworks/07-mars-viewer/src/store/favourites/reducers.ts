import { FavouritesActionType, FavouritesState, FavouritesAction } from "./types"
import {Set} from "immutable"

const initialState: FavouritesState = {
    favourites: Set(),
}

export const favouritesReducer = (
    state: FavouritesState = initialState,
    action: FavouritesAction,
): FavouritesState => {
    switch (action.type) {
    case FavouritesActionType.Add:
        return { ...state, favourites: state.favourites.add(action.id) }
    case FavouritesActionType.Remove:
        return { ...state, favourites: state.favourites.remove(action.id) }
    default:
        return state
    }
}
