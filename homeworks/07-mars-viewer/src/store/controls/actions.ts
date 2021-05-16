import { ControlsActionType, SelectSolAction, LoadAction } from "./types"
import {Sol} from "../../api";

export const selectSol = (sol: Sol): SelectSolAction => ({
    type: ControlsActionType.SelectSol,
    payload: sol,
})

export const load = (): LoadAction => ({
    type: ControlsActionType.Load,
})
