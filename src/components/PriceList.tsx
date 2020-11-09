import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { DataGrid } from '@material-ui/data-grid';
import SearchBar from 'material-ui-search-bar'
import { v4 as uuid } from "uuid";


const API_KEY = '8URS5R4RTUK16KY0'
const TYPE = "TIME_SERIES_INTRADAY"
const INTERVAL = "1min"

interface URL {
    API_KEY: string,
    SYMBOL: string,
    TYPE: string,
    INTERVAL: string,
    URL: string
}

export class PriceList extends React.Component<{}, { objArr: any[], symbol: string }> {
    constructor(props: any) {
        super(props);
        this.state = { objArr: [], symbol: "" }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    ComposeURL = (symbol: string): string => {
            return `https://www.alphavantage.co/query?function=${TYPE}&symbol=${symbol}&interval=${INTERVAL}&apikey=${API_KEY}`
    }

    FetchData = async (symbol: string): Promise<any[]> => {
        var ret: any[] = [];
        try {
            var jsonData = await axios.get(this.ComposeURL(symbol));
            const dates = Object.keys(jsonData.data["Time Series (1min)"]);
            // Foreach date, extract the data from it
            dates.forEach(date => {
                ret.push(jsonData.data["Time Series (1min)"][date]);
            })
            return ret;
        }catch {
            console.error("ERROR: Couldn't find company")
            return [];
        }
    }

    ReadData = async () => {
        this.FetchData(this.state.symbol)
            .then(res => {
                res.forEach(x => x.id = uuid())
                this.setState({ objArr: res });
                console.log(res);
            });
    }

    render() {
        return (
            <div className="Home">
                <h1>Share Tracker</h1>
                <SearchBar
                    value={this.state.symbol}
                    onChange={(e) => this.setState({ symbol: e })}
                    onRequestSearch={() => this.ReadData()} />

                <div style={{ height: 500, width: 600 }}>
                    <DataGrid
                        columns={[
                            { field: '1. open', headerName: 'OPEN', renderHeader: () => (<strong>{"OPEN"}</strong>) },
                            { field: '2. high', renderHeader: () => (<strong>{"HIGH"}</strong>) },
                            { field: '3. low', renderHeader: () => (<strong>{"LOW"}</strong>) },
                            { field: '4. close', renderHeader: () => (<strong>{"CLOSE"}</strong>) },
                            { field: '5. volume', renderHeader: () => (<strong>{"VOLUME"}</strong>) },
                        ]}
                        rows={this.state.objArr}
                    />
                </div>

            </div>
        )
    }
}