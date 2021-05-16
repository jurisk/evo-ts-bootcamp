import {ControlsAction, ControlsActionType, ControlsState} from "./types"
import {Sol} from "../../api";

const initialState: ControlsState = {
    selectedSol: 0 as Sol
}

export const controlsReducer = (
    state: ControlsState = initialState,
    action: ControlsAction,
): ControlsState => {
    switch (action.type) {
        case ControlsActionType.Load:
            return state; // TODO: middle-ware to do the loading part
        case ControlsActionType.SelectSol:
            return { ...state, selectedSol: action.payload }
        default:
            return state
    }
}
