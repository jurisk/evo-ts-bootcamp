import React from "react"
import "./App.css"
import {Controls} from "../controls/controls"
import {connect, Provider} from "react-redux"
import {FavouriteList, PhotoList} from "../photos/photos"
import {State, store} from "../../store"
import {ControlsTab} from "../../domain"

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

const mapStateToProps = (state: State) => ({
    selectedTab: state.controls.selectedTab,
})

export const Contents = connect(
    mapStateToProps,
)(ShowContents)

export function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Contents/>
        </Provider>
    )
}
