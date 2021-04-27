import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {credit, debit, subtractPercentage, updateBalance} from "../../store/balance/actions";
import {State} from "../../store";

interface BalanceProps {
    readonly credit: (amount: number) => void;
    readonly debit: (amount: number) => void;
    readonly updateBalance: (amount: number) => void;
    readonly subtractPercentage: (amount: number) => void;
    readonly balance: number;
}

const Balance = ({ credit, debit, updateBalance, subtractPercentage, balance }: BalanceProps) => {
    return (
        <div>
            <h1>Balance: {Math.round(balance)}</h1>
            <button onClick={() => credit(100)}>Credit</button>
            <button onClick={() => debit(100)}>Debit</button>
            <button onClick={() => updateBalance(1000)}>Update Balance</button>
            <button onClick={() => subtractPercentage(0.1)}>Subtract %</button>
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    balance: state.balance.balance,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    debit: (amount: number) => dispatch(debit(amount)),
    credit: (amount: number) => dispatch(credit(amount)),
    updateBalance: (amount: number) => dispatch(updateBalance(amount)),
    subtractPercentage: (amount: number) => dispatch(subtractPercentage(amount)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Balance);

