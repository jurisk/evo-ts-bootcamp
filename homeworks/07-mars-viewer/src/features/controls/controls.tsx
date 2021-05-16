import React from "react"
import {connect} from "react-redux"
import {AppDispatch, State} from "../../store"
import {load, selectSol, selectTab} from "../../store/controls/actions"
import {ControlsTab, Sol} from "../../domain"

type ShowControlsProps = {
    selectedTab: ControlsTab,
    selectTab: (tab: ControlsTab) => void,
    selectedSol: Sol
    setCurrentSol: (sol: Sol) => void
    load: (sol: Sol) => void
}

function ShowControls(props: ShowControlsProps) {
    return (
        <div>
            <div>
                <button disabled={props.selectedTab === ControlsTab.Photos} onClick={() => props.selectTab(ControlsTab.Photos)}>Photos</button>
                <button disabled={props.selectedTab === ControlsTab.Favourites} onClick={() => props.selectTab(ControlsTab.Favourites)}>Favourites</button>
            </div>
            {(props.selectedTab === ControlsTab.Photos) ?
                (<>
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
                </>) : null
            }
        </div>
    )
}

const mapStateToProps = (state: State) => ({
    selectedSol: state.controls.selectedSol,
    selectedTab: state.controls.selectedTab,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    load: (sol: Sol) => dispatch(load(sol)),
    setCurrentSol: (sol: Sol) => dispatch(selectSol(sol)),
    selectTab: (tab: ControlsTab) => dispatch(selectTab(tab)),
})

export const Controls = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowControls)
