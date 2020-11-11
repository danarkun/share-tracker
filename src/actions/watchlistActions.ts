import { Dispatch } from "react";
import { RootState } from "../store";
import { ADD_TO_WATCHLIST, AppActions, CLEAR_WATCHLIST, CompanyEntry, DELETE_FROM_WATCHLIST } from "../types/types";

// Actions Creators
export const addToWatchList = (company: CompanyEntry): AppActions => ({
    type: ADD_TO_WATCHLIST,
    payload: company
});

export const deleteFromWatchList = (id: string): AppActions => ({
    type: DELETE_FROM_WATCHLIST,
    id: id
});

export const clearWatchList = (): AppActions => ({
    type: CLEAR_WATCHLIST
});

export const startAddToWatchlist = (company: CompanyEntry) => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(addToWatchList(
            company
        ))
    }
}

export const startDeleteFromWatchlist = (id: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(deleteFromWatchList(
            id
        ))
    }
}

export const startClearWatchlist = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
        dispatch(clearWatchList())
    }
}