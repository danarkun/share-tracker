// Global Constant Strings
export const DATA_WATCHLIST = "DATA_WATCHLIST";

export interface WatchlistState {
    watchlistEntries: CompanyEntry[];
}

export interface CompanyInfo {
    name: string,
    description: string,
    address: string,
    sector: string
}

export interface CompanyData {
    timeStamp: string,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string,
    id: string
}

export interface TableEntry {
    time: string,
    price: number
}

export type CompanyEntry = CompanyInfo & {id: string, open: string, close: string, volume: string};

// Action Types
export const ADD_TO_WATCHLIST = "ADD_TO_WATCHLIST";
export const DELETE_FROM_WATCHLIST = "DELETE_FROM_WATCHLIST";
export const CLEAR_WATCHLIST = "CLEAR_WATCHLIST";

export interface AddToWatchlistAction {
    type: typeof ADD_TO_WATCHLIST,
    payload: CompanyEntry
}

export interface DeleteFromWatchlistAction {
    type: typeof DELETE_FROM_WATCHLIST,
    id: string
}

export interface ClearWatchlistAction {
    type: typeof CLEAR_WATCHLIST
}

export type WatchlistActions = AddToWatchlistAction | DeleteFromWatchlistAction | ClearWatchlistAction;

export type AppActions = WatchlistActions;