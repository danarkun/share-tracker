import React from 'react'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { watchlistReducer } from '../reducers/watchlistReducer'
import { applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppActions, DATA_WATCHLIST } from '../types/types';
import { getData, storeData } from '../helpers/localStorage';

const persitantData = {
    watchlist: getData(DATA_WATCHLIST)
}

const rootReducer = combineReducers({
    watchlist: watchlistReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, persitantData, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<RootState, AppActions>)))

const unsubscribe = store.subscribe(() => {
    storeData(DATA_WATCHLIST, store.getState().watchlist)
})