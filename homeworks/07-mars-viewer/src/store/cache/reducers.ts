import { CacheActionType, CacheState, CacheAction } from "./types"
import {Map} from "immutable"

const initialState: CacheState = {
    photos: Map(),
}

export const cacheReducer = (
    state: CacheState = initialState,
    action: CacheAction,
): CacheState => {
    switch (action.type) {
    case CacheActionType.AddPhotos:
        return { ...state, photos: state.photos.set(action.sol, action.photos) }
    default:
        return state
    }
}
