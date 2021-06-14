import {makeAutoObservable} from "mobx"
import {ControlsTab, DefaultRover, Photo, PhotoId, PhotoPair, Sol} from "../domain"
import {Set, Map} from "immutable"
import {loadRoverPhotos} from "../api"

export interface State {
    selectedTab: ControlsTab
    selectTab: (tab: ControlsTab) => void

    selectedSol: Sol
    setCurrentSol: (sol: Sol) => void

    load: () => void

    selectedPhotos(): readonly PhotoPair[]

    favouritePhotos(): readonly PhotoPair[]
    addFavourite: (photoId: PhotoId) => void
    removeFavourite: (photoId: PhotoId) => void
}

class StateImpl {
    selectedSol: Sol = 0 as Sol
    selectedTab: ControlsTab = ControlsTab.Photos
    favourites: Set<PhotoId> = Set()
    cache: Map<Sol, readonly Photo[]> = Map()

    constructor() {
        makeAutoObservable(this)
    }

    selectTab(tab: ControlsTab): void {
        this.selectedTab = tab
    }

    setCurrentSol(sol: Sol): void {
        this.selectedSol = sol
    }

    load(): void {
        loadRoverPhotos(DefaultRover, this.selectedSol).then((results) =>
            this.addReceivedPhotos(this.selectedSol, results)
        )
    }

    addReceivedPhotos(sol: Sol, results: readonly Photo[]) {
        this.cache = this.cache.set(sol, results)
    }

    addFavourite(photoId: PhotoId): void {
        this.favourites = this.favourites.add(photoId)
    }

    removeFavourite(photoId: PhotoId): void {
        this.favourites = this.favourites.remove(photoId)
    }

    selectedPhotos(): readonly PhotoPair[] {
        return (this.cache.get(this.selectedSol) || [])
            .map((photo) => ({
                photo: photo,
                isFavourite: this.favourites.contains(photo.id),
            }))
    }

    favouritePhotos(): readonly PhotoPair[] {
        return this.cache
            .toArray()
            .flatMap((x) =>
                x[1].filter((photo) => this.favourites.contains(photo.id))
            )
            .map((x) => ({
                photo: x,
                isFavourite: true,
            }))
    }
}

export const state: State = new StateImpl()
