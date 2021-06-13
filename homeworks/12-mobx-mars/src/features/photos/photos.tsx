import {Photo, PhotoId, PhotoPair} from "../../domain"
import * as O from "fp-ts/Option"
import "./photos.css"
import React from "react"
import {Heart} from "./heart"
import {state} from "../../state/state"
import {observer} from "mobx-react-lite"

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
    photoPairs: readonly PhotoPair[],
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

export const PhotoList = observer(() =>
    <ShowPhotos
        photoPairs={state.selectedPhotos()}
        addFavourite={(x) => state.addFavourite(x)}
        removeFavourite={(x) => state.removeFavourite(x)}
    />
)

export const FavouriteList = observer(() =>
    <ShowPhotos
        photoPairs={state.favouritePhotos()}
        addFavourite={(x) => state.addFavourite(x)}
        removeFavourite={(x) => state.removeFavourite(x)}
    />
)
