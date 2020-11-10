import React from 'react'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { watchlistReducer } from '../reducers/watchlistReducer'
import { applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppActions } from '../types/types';

const rootReducer = combineReducers({
    watchlist: watchlistReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<RootState, AppActions>)))