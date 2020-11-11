import React from 'react'
import { uniqueId } from 'vega-lite'
import { v4 as uuid } from 'uuid'
import { ADD_TO_WATCHLIST, WatchlistState, WatchlistActions, DELETE_FROM_WATCHLIST, CompanyEntry, CLEAR_WATCHLIST } from '../types/types'
import { AssertCompanyInList } from '../helpers/utils'

const initialState: WatchlistState = {
    watchlistEntries: [
        {
            name: "Test",
            description: "Test Company",
            address: "123 Fake Street",
            sector: "Tech",
            open: "10",
            close: "11",
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
                watchlistEntries: AssertCompanyInList(state, action.payload) ? [action.payload, ...state.watchlistEntries] : state.watchlistEntries
            }
        case DELETE_FROM_WATCHLIST:
            return {
                ...state,
                watchlistEntries: state.watchlistEntries.filter(entry => entry.id != action.id)
            }
        case CLEAR_WATCHLIST:
            return {
                ...state,
                watchlistEntries: []
            }
        default:
            return state;
    }
}
