import {Sol} from "../../api";
import React from 'react';
import {connect} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {State} from "../../store";
import {load, selectSol} from "../../store/controls/actions";

type ShowControlsProps = {
    selectedSol: Sol
    setCurrentSol: (sol: Sol) => void
    load: () => void
}

function ShowControls(props: ShowControlsProps) {
    return (
        <div>
            Sol:
            <input
                type="number"
                min={0}
                value={props.selectedSol}
                onChange={(e) =>
                    props.setCurrentSol(Number.parseInt(e.target.value) as Sol)
                }
            />
            <button onClick={() => props.load()}>Load</button>
        </div>
    )
}

const mapStateToProps = (state: State) => ({
    selectedSol: state.controls.selectedSol,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    load: () => dispatch(load()),
    setCurrentSol: (sol: Sol)  => dispatch(selectSol(sol)),
})

export const Controls = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowControls)
