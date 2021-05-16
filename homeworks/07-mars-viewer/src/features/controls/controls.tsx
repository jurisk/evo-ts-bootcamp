import {Sol} from "../../api";
import React from 'react';
import {connect} from "react-redux";
import {AppDispatch, State} from "../../store";
import {load, selectSol} from "../../store/controls/actions";

type ShowControlsProps = {
    selectedSol: Sol
    setCurrentSol: (sol: Sol) => void
    load: (sol: Sol) => void
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
            <button onClick={() => props.load(props.selectedSol)}>Load</button>
        </div>
    )
}

const mapStateToProps = (state: State) => ({
    selectedSol: state.controls.selectedSol,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    load: (sol: Sol) => dispatch(load(sol)),
    setCurrentSol: (sol: Sol)  => dispatch(selectSol(sol)),
})

export const Controls = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowControls)
