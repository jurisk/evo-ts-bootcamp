import {ControlsActionType, SelectSolAction, SelectTabAction} from "./types"
import { loadRoverPhotos } from "../../api";
import {AppDispatch, store} from "../index";
import {addPhotos} from "../cache/actions";
import {ControlsTab, DefaultRover, Sol} from "../../domain";

export const selectSol = (sol: Sol): SelectSolAction => ({
    type: ControlsActionType.SelectSol,
    sol: sol,
})

export const selectTab = (tab: ControlsTab): SelectTabAction => ({
    type: ControlsActionType.SelectTab,
    tab: tab,
})

export function load(sol: Sol) {
    return function (dispatch: AppDispatch) {
        if (!store.getState().cache.photos.has(sol)) {
            loadRoverPhotos(DefaultRover, sol)
                .then(
                    (photos) => dispatch(addPhotos(sol, photos)),
                    (e) => console.error("loading photos for" , sol, e),
                )
        }
    }
}
