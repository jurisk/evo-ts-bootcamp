import { Action } from "redux"
import {Sol, ControlsTab} from "../../domain"

export interface ControlsState {
    selectedSol: Sol;
    selectedTab: ControlsTab;
}

export enum ControlsActionType {
    SelectSol = "SelectSol",
    SelectTab = "SelectTab",
}

export interface SelectSolAction extends Action {
    type: ControlsActionType.SelectSol
    sol: Sol
}

export interface SelectTabAction extends Action {
    type: ControlsActionType.SelectTab
    tab: ControlsTab
}

export type ControlsAction = SelectSolAction | SelectTabAction
