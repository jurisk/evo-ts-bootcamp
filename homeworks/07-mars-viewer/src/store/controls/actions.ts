import { ControlsActionType, SelectSolAction } from "./types"
import {DefaultRover, loadRoverPhotos, Sol} from "../../api";
import {AppDispatch} from "../index";
import {addPhotos} from "../cache/actions";

export const selectSol = (sol: Sol): SelectSolAction => ({
    type: ControlsActionType.SelectSol,
    payload: sol,
})

export function load(sol: Sol) {
    return function (dispatch: AppDispatch) {
        loadRoverPhotos(DefaultRover, sol)
            .then(
                (photos) => dispatch(addPhotos(sol, photos)),
                (e) => console.error("loading photos for" , sol, e),
            )
    }
}
