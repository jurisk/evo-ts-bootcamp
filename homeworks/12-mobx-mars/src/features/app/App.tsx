import React from "react"
import "./App.css"
import {ControlsTab} from "../../domain"
import {Controls} from "../controls/controls"
import {PhotoList, FavouriteList} from "../photos/photos"
import {state} from "../../state/state"
import {observer} from "mobx-react-lite"

type ShowContentsProps = {
  selectedTab: ControlsTab,
}

function ShowContents(props: ShowContentsProps) {
    function photoList(tab: ControlsTab) {
        switch (tab) {
        case ControlsTab.Photos:
            return (<PhotoList/>)
        case ControlsTab.Favourites:
            return (<FavouriteList/>)
        default:
            return null
        }
    }

    return (
        <>
            <Controls/>
            {photoList(props.selectedTab)}
        </>
    )
}

export const App = observer(() =>
    <ShowContents selectedTab={state.selectedTab}/>
)
