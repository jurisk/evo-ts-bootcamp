import { Action } from "redux"
import {Sol} from "../../api";

export interface ControlsState {
    selectedSol: Sol;
}

export enum ControlsActionType {
    SelectSol = "SelectSol",
    Load = "Load",
}

export interface SelectSolAction extends Action {
    type: ControlsActionType.SelectSol
    payload: Sol
}

export type ControlsAction = SelectSolAction
