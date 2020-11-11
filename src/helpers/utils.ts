import { WatchlistState, CompanyEntry } from "../types/types";

// Check if we have already added a company to our watchlist
export const AssertCompanyInList = (list: WatchlistState, company: CompanyEntry): boolean => {
    for (let i = 0; i < list.watchlistEntries.length; i++) {
        if (list.watchlistEntries[i].name == company.name)
            return false;
    }
    return true;
}