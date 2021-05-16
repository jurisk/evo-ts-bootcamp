import {Photo, PhotoId, Sol} from "../../domain"
import {connect} from "react-redux"
import {State} from "../../store"
import {Dispatch} from "@reduxjs/toolkit"
import {addFavourite, removeFavourite} from "../../store/favourites/actions"
import {Set, Map} from "immutable"
import * as O from "fp-ts/Option"
import "./photos.css"
import React from "react"

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

type HeartProps = {
    color: string,
    onClick: () => void,
}

function Heart(props: HeartProps) {
    return (<svg width="98" height="89" viewBox="0 0 98 89" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.7" className="heart" onClick={props.onClick}>
        <path d="M89.834 48.974L48.81 8.95 7.786 48.974 48.81 89l41.023-40.026z" fill={props.color}/>
        <path d="M59.467 29.381c0 16.022-13.312 29.01-29.733 29.01C13.311 58.391 0 45.403 0 29.381 0 13.36 13.312.371 29.733.371c16.422 0 29.734 12.989 29.734 29.01z" fill={props.color}/>
        <path d="M98 29.01c0 16.022-13.312 29.01-29.734 29.01-16.42 0-29.733-12.988-29.733-29.01C38.533 12.988 51.845 0 68.266 0 84.688 0 98 12.988 98 29.01z" fill={props.color}/>
    </svg>)
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

const photosListProps = (state: State) => ({
    photoPairs: calculatePhotoPairs(state.cache.photos, state.favourites.favourites, state.controls.selectedSol),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addFavourite: (id: PhotoId) => dispatch(addFavourite(id)),
    removeFavourite: (id: PhotoId) => dispatch(removeFavourite(id)),
})

export const PhotosList = connect(
    photosListProps,
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

const favouritesProps = (state: State) => ({
    photoPairs: selectFavourites(state.cache.photos, state.favourites.favourites),
})

export const FavouritesList = connect(
    favouritesProps,
    mapDispatchToProps,
)(ShowPhotos)
