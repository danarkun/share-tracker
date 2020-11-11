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

export interface AddToWatchlistAction {
    type: typeof ADD_TO_WATCHLIST,
    payload: CompanyEntry
}

export interface DeleteFromWatchlistAction {
    type: typeof DELETE_FROM_WATCHLIST,
    id: string
}

export type WatchlistActions = AddToWatchlistAction | DeleteFromWatchlistAction;

export type AppActions = WatchlistActions;