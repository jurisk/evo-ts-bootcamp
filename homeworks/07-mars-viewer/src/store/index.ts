import {
    combineReducers,
    compose,
    createStore,
    applyMiddleware,
} from "@reduxjs/toolkit"
import {favouritesReducer} from "./favourites/reducers"
import {FavouritesAction, FavouritesState} from "./favourites/types"
import {CacheAction, CacheState} from "./cache/types"
import {cacheReducer} from "./cache/reducers"
import {controlsReducer} from "./controls/reducers"
import {ControlsState} from "./controls/types"
import {ControlsAction} from "./controls/types"
import thunk from "redux-thunk"

export interface State {
    controls: ControlsState
    favourites: FavouritesState
    cache: CacheState
}

const rootReducer = combineReducers<State, CacheAction & ControlsAction & FavouritesAction>({
    cache: cacheReducer,
    controls: controlsReducer,
    favourites: favouritesReducer,
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ReturnType<typeof store.dispatch>
