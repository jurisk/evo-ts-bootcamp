import {observer} from "mobx-react-lite"
import React from "react"
import {ControlsTab, Sol} from "../../domain"
import {state} from "../../state/state"

type ShowControlsProps = {
    selectedTab: ControlsTab
    selectTab: (tab: ControlsTab) => void
    selectedSol: Sol
    setCurrentSol: (sol: Sol) => void
    load: () => void
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
                        <button onClick={() => props.load()}>Load</button>
                    </div>
                </>) : null
            }
        </div>
    )
}

export const Controls = observer(() => ShowControls(state))
