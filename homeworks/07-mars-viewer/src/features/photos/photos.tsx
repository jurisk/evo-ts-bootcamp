import {Photo, PhotoId, Sol} from "../../api";
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
                (x) => <button onClick={() => x()}>Add</button>
            )(props.addFavourite)}

            {O.fold<() => void, null | JSX.Element>(
                () => null,
                (x) => <button onClick={() => x()}>Remove</button>
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
    return (
        <div>
            {props.photoPairs.map((x) => <ShowPhoto
                key={x.photo.id}
                photo={x.photo}
                isFavourite={x.isFavourite}
                addFavourite={x.isFavourite ? O.none : O.some(() => addFavourite(x.photo.id))}
                removeFavourite={x.isFavourite ? O.some(() => removeFavourite(x.photo.id)) : O.none}
            />)}
        </div>
    )
}

const calculatePhotoPairs = (photos: Map<Sol, readonly Photo[]>, favourites: Set<PhotoId>, selectedSol: Sol): readonly PhotoPair[] =>
    (photos.get(selectedSol) || [])
        .map((photo) => ({
        photo: photo,
        isFavourite: favourites.contains(photo.id),
    })
);

const mapStateToProps = (state: State) => ({
    photoPairs: calculatePhotoPairs(state.cache.photos, state.favourites.favourites, state.controls.selectedSol),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addFavourite: (id: PhotoId) => dispatch(addFavourite(id)),
    removeFavourite: (id: PhotoId) => dispatch(removeFavourite(id)),
})

export const PhotosList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowPhotos)
