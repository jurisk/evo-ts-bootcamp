import {
    BalanceActionType,
    CreditAction,
    DebitAction,
    SubtractPercentageAction,
    UpdateBalanceAction
} from "./types";

export const credit = (amount: number): CreditAction => ({
    type: BalanceActionType.CREDIT,
    payload: amount,
});

export const debit = (amount: number): DebitAction => ({
    type: BalanceActionType.DEBIT,
    payload: amount,
});

export const updateBalance = (amount: number): UpdateBalanceAction => ({
    type: BalanceActionType.UPDATE_BALANCE,
    payload: amount,
});

export const subtractPercentage = (percentage: number): SubtractPercentageAction => ({
    type: BalanceActionType.SUBTRACT_PERCENTAGE,
    payload: percentage,
});


