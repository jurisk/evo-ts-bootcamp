import {ControlsAction, ControlsActionType, ControlsState} from "./types"
import {ControlsTab, Sol} from "../../domain";

const initialState: ControlsState = {
    selectedSol: 0 as Sol,
    selectedTab: ControlsTab.Photos,
}

export const controlsReducer = (
    state: ControlsState = initialState,
    action: ControlsAction,
): ControlsState => {
    switch (action.type) {
        case ControlsActionType.SelectSol:
            return { ...state, selectedSol: action.sol }
        case ControlsActionType.SelectTab:
            return { ...state, selectedTab: action.tab }
        default:
            return state
    }
}
