import React from 'react'
import { ADD_TO_WATCHLIST, WatchlistState, WatchlistActions, DELETE_FROM_WATCHLIST } from '../types/types'

const initialState: WatchlistState = {
    watchList: [
        {
            name: "Test",
            description: "Test Company",
            address: "123 Fake Street",
            sector: "Tech",
            open: "10",
            volume: "10",
            id: "42069",
        }
    ]
}

export const watchlistReducer = (state = initialState, action: WatchlistActions): WatchlistState => {
    switch (action.type) {
        case ADD_TO_WATCHLIST:
            return {
                ...state,
                watchList: [action.payload, ...state.watchList]
            }
            case DELETE_FROM_WATCHLIST:
                return {
                    ...state,
                    watchList: state.watchList.filter(entry => entry.id != action.id)
                }
        default:
            return state;
    }
}
