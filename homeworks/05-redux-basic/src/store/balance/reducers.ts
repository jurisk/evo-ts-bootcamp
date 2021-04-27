import {BalanceAction, BalanceActionType, BalanceState} from "./types";

const initialState: BalanceState = {
    balance: 0
};

export const balanceReducer = (
    state: BalanceState = initialState,
    action: BalanceAction
): BalanceState => {
    switch (action.type) {
        case BalanceActionType.CREDIT:
            return { ...state, balance: state.balance + action.payload };
        case BalanceActionType.DEBIT:
            return { ...state, balance: state.balance - action.payload };
        case BalanceActionType.UPDATE_BALANCE:
            return { ...state, balance: action.payload };
        case BalanceActionType.SUBTRACT_PERCENTAGE:
            return { ...state, balance: state.balance * (1 - action.payload) };
        default:
            return state;
    }
};
