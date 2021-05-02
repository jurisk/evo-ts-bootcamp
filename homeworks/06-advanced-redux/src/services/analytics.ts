import { Middleware } from "redux";
import {State} from "../types";

export const localLogging: Middleware<{}, State> = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

export const remoteLogging: Middleware<{}, State> = _store => next => action => {
    submitAnalytics(action)
    return next(action)
}

function submitAnalytics(value: unknown) {
    fetch('http://localhost:3001/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    }).then((json) => {
        console.log(json);
    }).catch((ex) => {
        console.log(ex)
    });
}
