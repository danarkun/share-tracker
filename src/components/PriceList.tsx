import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from 'material-ui-search-bar'
import { v4 as uuid } from "uuid";
import { CompanyProfile } from './CompanyProfile';
import { CompanyInfo, CompanyData, CompanyEntry, AppActions, WatchlistState } from '../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { startAddToWatchlist } from '../actions/watchlistActions';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { entries } from 'vega-lite';

const API_KEY = '8URS5R4RTUK16KY0'
const DATA_FUNCTION = "TIME_SERIES_INTRADAY"
const INFO_FUNCTION = "OVERVIEW"
const INTERVAL = "1min"

type Props = LinkDispatchProps;

const initialDataState: CompanyData[] = [];
const initialCompanyInfo: CompanyInfo = {
    name: "",
    description: "",
    address: "",
    sector: ""
}

export const PriceList = (props: Props) => {
    const [dataEntries, setEntries] = useState(initialDataState);
    const [symbol, setSymbol] = useState("");
    const [companyInfo, setInfo] = useState(initialCompanyInfo);

    const ComposeDataURL = (symbol: string): string => {
        return `https://www.alphavantage.co/query?function=${DATA_FUNCTION}&symbol=${symbol}&interval=${INTERVAL}&apikey=${API_KEY}`
    }

    const ComposeInfoURL = (symbol: string): string => {
        return `https://www.alphavantage.co/query?function=${INFO_FUNCTION}&symbol=${symbol}&apikey=${API_KEY}`
    }

    const FetchData = async (symbol: string): Promise<CompanyData[]> => {
        var ret: CompanyData[] = [];
        try {
            console.log(symbol);
            await axios.all([
                axios.get(ComposeInfoURL(symbol)),
                axios.get(ComposeDataURL(symbol))
            ])
                .then(axios.spread((d1, d2) => {
                    var jsonData = d2;
                    const dates = Object.keys(jsonData.data["Time Series (1min)"]);

                    // Foreach data entry returned from server
                    dates.forEach(date => {
                        const obj: any = jsonData.data["Time Series (1min)"][date];
                        const newEntry = {
                            timeStamp: date,
                            open: obj["1. open"],
                            high: obj["2. high"],
                            low: obj["3. low"],
                            close: obj["4. close"],
                            volume: obj["5. volume"],
                            id: uuid()
                        }
                        ret.push(newEntry);
                    })

                    const companyInfo = {
                        name: d1.data["Name"],
                        description: d1.data["Description"],
                        address: d1.data["Address"],
                        sector: d1.data["Sector"]
                    }
                    setInfo(companyInfo);
                }))
            return ret;
        } catch (err) {
            console.error(err instanceof TypeError ? "Can't resolve symbol" : err);
            return [];
        }
    }

    const ReadData = async () => {
        FetchData(symbol)
            .then(res => {
                setEntries(res);
            });
    }

    const AddToWatchlist = () => {
        const { name, description, address, sector } = companyInfo;
        const { open, close, volume } = dataEntries[0] ?? { open: 10, close: 11, volume : 10 };

        const newEntry: CompanyEntry = {
            id: uuid(),
            name,
            description,
            address,
            sector,
            open,
            close,
            volume
        }
        props.localAddToWatchlist(newEntry);
    }
    return (
        <div className="Home">
            <h1>Share Tracker</h1>
            <SearchBar
                value={symbol}
                onChange={(e) => setSymbol(e)}
                onRequestSearch={() => ReadData()} />

            <div style={{ height: 500, width: 1000 }}>
                <DataGrid
                    columns={[
                        { field: 'timeStamp', width: 200, renderHeader: () => (<strong>{"TIME"}</strong>) },
                        { field: 'open', renderHeader: () => (<strong>{"OPEN"}</strong>) },
                        { field: 'high', renderHeader: () => (<strong>{"HIGH"}</strong>) },
                        { field: 'low', renderHeader: () => (<strong>{"LOW"}</strong>) },
                        { field: 'close', renderHeader: () => (<strong>{"CLOSE"}</strong>) },
                        { field: 'volume', renderHeader: () => (<strong>{"VOLUME"}</strong>) },
                    ]}
                    rows={dataEntries}
                    // onRowClick={e => console.log(e.data)}
                />
            </div>
            {/* TODO only add button if successfully searched and company not already added */}
            {dataEntries.length == 0 ? "" : <button onClick={e => AddToWatchlist()}>Add To Watchlist</button>}
            <CompanyProfile info={companyInfo} />
        </div>
    )
}

interface LinkStateProps {
    watchlist: WatchlistState;
}

interface LinkDispatchProps {
    localAddToWatchlist: (company: CompanyEntry) => void;
}

const mapStateToProps = (state: RootState): LinkStateProps => ({
    watchlist: state.watchlist
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
    localAddToWatchlist: bindActionCreators(startAddToWatchlist, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PriceList);