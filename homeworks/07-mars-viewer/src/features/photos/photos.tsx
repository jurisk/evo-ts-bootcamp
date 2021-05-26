import {Photo, PhotoId, Sol} from "../../domain"
import {connect} from "react-redux"
import {State} from "../../store"
import {Dispatch} from "@reduxjs/toolkit"
import {addFavourite, removeFavourite} from "../../store/favourites/actions"
import {Set, Map} from "immutable"
import * as O from "fp-ts/Option"
import "./photos.css"
import React from "react"
import {Heart} from "./heart"

type PhotoPair = {
    photo: Photo
    isFavourite: boolean
}

type ShowPhotoProps = {
    photo: Photo
    isFavourite: boolean
    addFavourite: O.Option<() => void>,
    removeFavourite: O.Option<() => void>
}

function ShowPhoto(props: ShowPhotoProps) {
    const name = props.photo.id.toString()

    return (
        <div className="photoContainer">
            <img className="img" src={props.photo.imageUrl} title={name} alt={name}/>
            <span>{props.isFavourite}</span>

            {O.fold<() => void, null | JSX.Element>(
                () => null,
            (x: () => void) => <Heart color="#930A17" onClick={x}/>,
            )(props.addFavourite)}

            {O.fold<() => void, null | JSX.Element>(
                () => null,
            (x: () => void) => <Heart color="#FF0A17" onClick={x}/>,
            )(props.removeFavourite)}

            <span className="photoDescription">{props.photo.description}</span>
        </div>
    )
}

type ShowPhotosProps = {
    photoPairs: readonly PhotoPair  [],
    addFavourite: (photoId: PhotoId) => void,
    removeFavourite: (photoId: PhotoId) => void,
}

function ShowPhotos(props: ShowPhotosProps) {
    return props.photoPairs.length > 0 ? (
        <div className="viewer">
            <div className="grid">
                {props.photoPairs.map((x) => <ShowPhoto
                    key={x.photo.id}
                    photo={x.photo}
                    isFavourite={x.isFavourite}
                    addFavourite={x.isFavourite ? O.none : O.some(() => props.addFavourite(x.photo.id))}
                    removeFavourite={x.isFavourite ? O.some(() => props.removeFavourite(x.photo.id)) : O.none}
                />)}
            </div>
        </div>
    ) : <div>No photos.</div>
}

const calculatePhotoPairs = (photos: Map<Sol, readonly Photo[]>, favourites: Set<PhotoId>, selectedSol: Sol): readonly PhotoPair[] =>
    (photos.get(selectedSol) || [])
        .map((photo) => ({
            photo: photo,
            isFavourite: favourites.contains(photo.id),
        })
        )

const photoListProps = (state: State) => ({
    photoPairs: calculatePhotoPairs(state.cache.photos, state.favourites.favourites, state.controls.selectedSol),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addFavourite: (id: PhotoId) => dispatch(addFavourite(id)),
    removeFavourite: (id: PhotoId) => dispatch(removeFavourite(id)),
})

export const PhotoList = connect(
    photoListProps,
    mapDispatchToProps,
)(ShowPhotos)

function selectFavourites(photos: Map<Sol, readonly Photo[]>, favourites: Set<PhotoId>): readonly PhotoPair[] {
    return photos
        .toArray()
        .flatMap((x) =>
            x[1].filter((photo) => favourites.contains(photo.id))
        )
        .map((x) => ({
            photo: x,
            isFavourite: true,
        }))
}

const favouriteListProps = (state: State) => ({
    photoPairs: selectFavourites(state.cache.photos, state.favourites.favourites),
})

export const FavouriteList = connect(
    favouriteListProps,
    mapDispatchToProps,
)(ShowPhotos)
