import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from 'material-ui-search-bar'
import { v4 as uuid } from "uuid";
import { CompanyProfile } from './CompanyProfile';
import { CompanyInfo, CompanyData, CompanyEntry, AppActions } from '../types/types';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { addToWatchList, startAddToWatchlist } from '../actions/watchlistActions';
import { connect } from 'react-redux';
import { start } from 'repl';

const API_KEY = '8URS5R4RTUK16KY0'
const DATA_FUNCTION = "TIME_SERIES_INTRADAY"
const INFO_FUNCTION = "OVERVIEW"
const INTERVAL = "1min"

type Props = LinkDispatchToProps;

export class PriceList extends React.Component<{}, { dataEntries: CompanyData[], symbol: string, info: CompanyInfo }> {
    constructor(props: any) {
        super(props);
        this.state = { dataEntries: [], symbol: "", info: {name: "", description: "", address: "", sector: ""} }
        this.AddToWatchlist = this.AddToWatchlist.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    static ComposeDataURL = (symbol: string): string => {
        return `https://www.alphavantage.co/query?function=${DATA_FUNCTION}&symbol=${symbol}&interval=${INTERVAL}&apikey=${API_KEY}`
    }

    static ComposeInfoURL = (symbol: string): string => {
        return `https://www.alphavantage.co/query?function=${INFO_FUNCTION}&symbol=${symbol}&apikey=${API_KEY}`
    }

    FetchData = async (symbol: string): Promise<CompanyData[]> => {
        var ret: CompanyData[] = [];
        try {
            console.log(symbol);
            await axios.all([
                axios.get(PriceList.ComposeInfoURL(symbol)),
                axios.get(PriceList.ComposeDataURL(symbol))
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
                    this.setState({ info: companyInfo })
                }))
            return ret;
        } catch (err) {
            console.error(err instanceof TypeError ? "Can't resolve symbol" : err);
            return [];
        }
    }

    ReadData = async () => {
        this.FetchData(this.state.symbol)
            .then(res => {
                this.setState({ dataEntries: res });
            });
    }

    AddToWatchlist = () => {
        const { name, description, address, sector } = this.state.info;
        const { open, volume } = this.state.dataEntries[0]

        const newEntry: CompanyEntry = {
            id: uuid(),
            name,
            description,
            address,
            sector,
            open,
            volume
        }
        // this.props.props.localAddToWatchlist(newEntry);
    }

    render() {
        return (
            <div className="Home">
                <h1>Share Tracker</h1>
                <SearchBar
                    value={this.state.symbol}
                    onChange={(e) => this.setState({ symbol: e })}
                    onRequestSearch={() => this.ReadData()} />

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
                        rows={this.state.dataEntries}
                        onRowClick={e => console.log(e.data)}
                    />
                </div>
                <button onClick={e => this.AddToWatchlist()}>Add To Watchlist</button>
                <CompanyProfile info={this.state.info} />
            </div>
        )
    }
}

interface LinkDispatchToProps {
    localAddToWatchlist: (company: CompanyEntry) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchToProps => ({
    localAddToWatchlist: bindActionCreators(startAddToWatchlist, dispatch)
})

connect(null, mapDispatchToProps)(PriceList);