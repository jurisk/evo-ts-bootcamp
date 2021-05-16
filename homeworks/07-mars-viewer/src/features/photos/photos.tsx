import {Photo, PhotoId, Sol} from "../../domain";
import {connect} from "react-redux";
import {State} from "../../store";
import {Dispatch} from "@reduxjs/toolkit";
import {addFavourite, removeFavourite} from "../../store/favourites/actions";
import {Set, Map} from "immutable";
import * as O from "fp-ts/Option";

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
        <div>
            <img src={props.photo.img_src} title={name} alt={name}/>
            <span>{props.isFavourite}</span>

            {O.fold<() => void, null | JSX.Element>(
                () => null,
                (x: () => void) => <button onClick={x}>Add</button>
            )(props.addFavourite)}

            {O.fold<() => void, null | JSX.Element>(
                () => null,
                (x: () => void) => <button onClick={x}>Remove</button>
            )(props.removeFavourite)}
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
        <div>
            {props.photoPairs.map((x) => <ShowPhoto
                key={x.photo.id}
                photo={x.photo}
                isFavourite={x.isFavourite}
                addFavourite={x.isFavourite ? O.none : O.some(() => props.addFavourite(x.photo.id))}
                removeFavourite={x.isFavourite ? O.some(() => props.removeFavourite(x.photo.id)) : O.none}
            />)}
        </div>
    ) : <div>No photos loaded</div>
}

const calculatePhotoPairs = (photos: Map<Sol, readonly Photo[]>, favourites: Set<PhotoId>, selectedSol: Sol): readonly PhotoPair[] =>
    (photos.get(selectedSol) || [])
        .map((photo) => ({
        photo: photo,
        isFavourite: favourites.contains(photo.id),
    })
);

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
        .flatMap(([sol, photos]) =>
            photos.filter((photo) => favourites.contains(photo.id))
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
