import React from "react"
import "./App.css"
import {Controls} from "../controls/controls"
import {connect, Provider} from "react-redux"
import {FavouritesList, PhotosList} from "../photos/photos"
import {State, store} from "../../store"
import {ControlsTab} from "../../domain"

type ShowContentsProps = {
    selectedTab: ControlsTab,
}

function ShowContents(props: ShowContentsProps) {
    function photosList(tab: ControlsTab) {
        switch (tab) {
        case ControlsTab.Photos:
            return (<PhotosList/>)
        case ControlsTab.Favourites:
            return (<FavouritesList/>)
        default:
            return null
        }
    }

    return (
        <>
            <Controls/>
            {photosList(props.selectedTab)}
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
