import { Action } from "redux"
import {Photo, Sol} from "../../domain";
import {Map} from "immutable";

export interface CacheState {
    photos: Map<Sol, readonly Photo[]>;
}

export enum CacheActionType {
    AddPhotos = "AddPhotos",
}

export interface AddPhotosAction extends Action {
    type: CacheActionType.AddPhotos;
    sol: Sol;
    photos: readonly Photo[];
}

export type CacheAction = AddPhotosAction;
