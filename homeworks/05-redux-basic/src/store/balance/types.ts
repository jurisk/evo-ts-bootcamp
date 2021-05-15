import { Action } from "redux"

export interface BalanceState {
    balance: number;
}

export enum BalanceActionType {
    UPDATE_BALANCE = "UPDATE_BALANCE",
    CREDIT = "CREDIT",
    SUBTRACT_PERCENTAGE = "SUBTRACT_PERCENTAGE",
    DEBIT = "DEBIT",
}

export interface UpdateBalanceAction extends Action {
    type: BalanceActionType.UPDATE_BALANCE
    payload: number
}

export interface CreditAction extends Action {
    type: BalanceActionType.CREDIT;
    payload: number
}

export interface SubtractPercentageAction extends Action {
    type: BalanceActionType.SUBTRACT_PERCENTAGE;
    payload: number
}

export interface DebitAction extends Action {
    type: BalanceActionType.DEBIT;
    payload: number
}

export type BalanceAction = UpdateBalanceAction | CreditAction | SubtractPercentageAction | DebitAction;
