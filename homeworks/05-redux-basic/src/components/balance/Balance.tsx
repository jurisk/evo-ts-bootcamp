import React from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import {credit, debit, subtractPercentage, updateBalance} from "../../store/balance/actions"
import {State} from "../../store"

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
            <button onClick={() => credit(100)}>Credit 100</button>
            <button onClick={() => debit(100)}>Debit 100</button>
            <button onClick={() => updateBalance(1000)}>Set Balance to 1000</button>
            <button onClick={() => subtractPercentage(0.1)}>Subtract 10%</button>
        </div>
    )
}

const mapStateToProps = (state: State) => ({
    balance: state.balance.balance,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    debit: (amount: number) => dispatch(debit(amount)),
    credit: (amount: number) => dispatch(credit(amount)),
    updateBalance: (amount: number) => dispatch(updateBalance(amount)),
    subtractPercentage: (amount: number) => dispatch(subtractPercentage(amount)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Balance)

