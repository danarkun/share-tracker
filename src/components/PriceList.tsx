import React, { FC, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from 'material-ui-search-bar'
import { v4 as uuid } from "uuid";
import { CompanyPreview } from './CompanyPreview';
import { CompanyInfo, CompanyData, CompanyEntry, AppActions, WatchlistState } from '../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { startAddToWatchlist } from '../actions/watchlistActions';
import { connect } from 'react-redux';

const API_KEY = '8URS5R4RTUK16KY0'
const DATA_FUNCTION = "TIME_SERIES_INTRADAY"
const INFO_FUNCTION = "OVERVIEW"
const INTERVAL = "1min"
enum StatusCodes { Fetching, Succeeded, Failed, Awaiting_Input }

interface PriceListProps {
    addTowatchlist(company: CompanyEntry): void
}

const initialDataState: CompanyData[] = [];
const initialCompanyInfo: CompanyInfo = {
    name: "",
    description: "",
    address: "",
    sector: ""
}

const PriceList:FC<PriceListProps> = (props) => {
    const [dataEntries, setEntries] = useState(initialDataState);
    const [symbol, setSymbol] = useState("");
    const [companyInfo, setInfo] = useState(initialCompanyInfo);
    const [status, setStatus] = useState(StatusCodes.Awaiting_Input);

    const ComposeDataURL = (symbol: string): string => {
        return `https://www.alphavantage.co/query?function=${DATA_FUNCTION}&symbol=${symbol}&interval=${INTERVAL}&apikey=${API_KEY}`
    }

    const ComposeInfoURL = (symbol: string): string => {
        return `https://www.alphavantage.co/query?function=${INFO_FUNCTION}&symbol=${symbol}&apikey=${API_KEY}`
    }

    const FetchData = async (symbol: string): Promise<CompanyData[]> => {
        let ret: CompanyData[] = [];
        try {
            // Fetching
            setStatus(StatusCodes.Fetching);

            console.log(symbol);
            await axios.all([
                axios.get(ComposeInfoURL(symbol)),
                axios.get(ComposeDataURL(symbol))
            ])
                .then(axios.spread((d1, d2) => {
                    let jsonData = d2;
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
                    setStatus(StatusCodes.Succeeded);
                }))
            return ret;
        } catch (err) {
            console.error(err instanceof TypeError ? "Can't resolve symbol" : err);
            setStatus(StatusCodes.Failed);
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
        const { open, close, volume } = dataEntries[0] ?? { open: 10, close: 11, volume: 10 };

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
        props.addTowatchlist(newEntry);
    }
    return (
        <div className="ShareTracker">
            <h1>Share Tracker</h1>
            <SearchBar
                value={symbol}
                onChange={(e) => setSymbol(e)}
                onRequestSearch={() => ReadData()} />

            <div style={{ height: 500, width: 1000 }}>
                <DataGrid
                    columns={[
                        { field: 'timeStamp', type: "string", width: 200, renderHeader: () => (<strong>{"TIME"}</strong>) },
                        { field: 'open', type: "number", renderHeader: () => (<strong>{"OPEN"}</strong>) },
                        { field: 'high', type: "number", renderHeader: () => (<strong>{"HIGH"}</strong>) },
                        { field: 'low', type: "number", renderHeader: () => (<strong>{"LOW"}</strong>) },
                        { field: 'close', type: "number", renderHeader: () => (<strong>{"CLOSE"}</strong>) },
                        { field: 'volume', type: "number", renderHeader: () => (<strong>{"VOLUME"}</strong>) },
                    ]}
                    rows={dataEntries}
                // onRowClick={e => console.log(e.data)}
                />
            </div>
            {status !== StatusCodes.Succeeded ? <p><b>Status: </b>{StatusCodes[status]}</p> :
                <div>
                    <button onClick={AddToWatchlist}>Add To Watchlist</button>
                    <CompanyPreview info={companyInfo} />
                </div>}
        </div>
    )
}

interface LinkDispatchProps {
    localAddToWatchlist: (company: CompanyEntry) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
    localAddToWatchlist: bindActionCreators(startAddToWatchlist, dispatch)
})

export default connect(null, mapDispatchToProps)(PriceList);