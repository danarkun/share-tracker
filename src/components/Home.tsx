import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { ColParams, DataGrid } from '@material-ui/data-grid';
import { v4 as uuid } from "uuid";

const API_KEY = '8URS5R4RTUK16KY0';
const SYMBOL = "IBM";
const TYPE = "TIME_SERIES_INTRADAY";
const INTERVAL = "1min"

const API_URL: string = `https://www.alphavantage.co/query?function=${TYPE}&symbol=${SYMBOL}&interval=${INTERVAL}&apikey=demo`;

const transactions =
    [
        {
            id: "1678",
            text: "First Transaction",
            amount: 100,
            user: "1",
            timeStamp: "October"
        }
    ]

const spoofSample = '[ { "id": "1", "1. open": "112.2600", "2. high": "112.2600", "3. low": "112.2600", "4. close": "112.2600", "5. volume": "203" } ]'

export class Home extends React.Component<{}, { objArr: any[] }> {
    constructor(props: any) {
        super(props);
        this.state = { objArr: [] }
    }

    componentDidMount() {
        this.ReadData();
    }

    componentDidUpdate(prevState: any[]) {
    }

    FetchData = async (apiUrl: string): Promise<any[]> => {
        var ret: any[] = [];
        var jsonData = await axios.get(apiUrl);

        const dates = Object.keys(jsonData.data["Time Series (1min)"]);
        // Foreach date, extract the data from it
        dates.forEach(date => {
            ret.push(jsonData.data["Time Series (1min)"][date]);
        })
        return ret;
    }

    ReadData = async () => {
        this.FetchData(API_URL)
            .then(res => {
                res.forEach(x => x.id = uuid())
                this.setState({ objArr: res });
            });
    }

    render() {
        return (
            <div className="Home">
                <h1>Share Tracker</h1>
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

// export const Home = () => {
//     const initialState = [{
//         id: "0"
//     }];
//     var objectState: any[] = [{}];
//     const [objArr, setObjArray] = useState(initialState);

//     useEffect(() => {
//         ReadData();
//     }, [objArr])

//     const FetchData = async (apiUrl: string): Promise<any[]> => {
//         var ret: any[] = [];
//         var jsonData = await axios.get(apiUrl);

//         const dates = Object.keys(jsonData.data["Time Series (1min)"]);
//         // Foreach date, extract the data from it
//         dates.forEach(date => {
//             ret.push(jsonData.data["Time Series (1min)"][date]);
//         })
//         return ret;
//     }

//     const ReadData = async () => {
//         FetchData(API_URL)
//             .then(res => {
//                 res.forEach(x => x.id = uuid())
//                 setObjArray(res);
//             });
//     }

//     return (
//         <div className="Home">
//             <h1>Share Tracker</h1>
//             <div style={{ height: 500, width: 600 }}>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <th>Open</th>
//                             <th>High</th>
//                             <th>Low</th>
//                             <th>Close</th>
//                             <th>volume</th>
//                         </tr>
//                         {
//                             objArr.map(obj => {
//                                 <tr>
//                                     <th>{obj.id}</th>
//                                 </tr>
//                             })
//                         }
//                     </tbody>
//                 </table>
//                 {/* <DataGrid
//                     // columns={[
//                     //     { field: '1. open', headerName: 'OPEN' },
//                     //     { field: '2. high', headerName: 'HIGH' },
//                     //     { field: '3. low', headerName: 'LOW' },
//                     //     { field: '4. close', headerName: 'CLOSE' },
//                     //     { field: '5. volume', headerName: 'VOLUME' },
//                     //     ]}
//                     columns={[
//                         { field: 'text', headerName: 'Transaction' },
//                         { field: 'amount', headerName: 'Amount' },
//                         { field: 'user', headerName: 'Submitted By' },
//                         { field: 'timeStamp', headerName: 'Submitted At' }
//                     ]}
//                     rows={state.length == 0 ? [{id: 0}] : state}
//                 /> */}
//             </div>

//         </div>
//     )
// }


const spoofData = {
    "2020-11-04 19:50:00": { "1. open": "112.2600", "2. high": "112.2600", "3. low": "112.2600", "4. close": "112.2600", "5. volume": "203" },
    "2020-11-04 19:27:00": { "1. open": "112.1000", "2. high": "112.1000", "3. low": "112.0500", "4. close": "112.0500", "5. volume": "200" },
    "2020-11-04 19:21:00": { "1. open": "112.0000", "2. high": "112.0000", "3. low": "112.0000", "4. close": "112.0000", "5. volume": "219" },
    "2020-11-04 19:13:00": { "1. open": "112.1700", "2. high": "112.1700", "3. low": "112.1700", "4. close": "112.1700", "5. volume": "200" },
    "2020-11-04 19:03:00": { "1. open": "112.2899", "2. high": "112.2899", "3. low": "112.2899", "4. close": "112.2899", "5. volume": "100" },
    "2020-11-04 18:45:00": { "1. open": "112.0000", "2. high": "112.0000", "3. low": "112.0000", "4. close": "112.0000", "5. volume": "969" },
    "2020-11-04 18:40:00": { "1. open": "112.0300", "2. high": "112.0300", "3. low": "112.0000", "4. close": "112.0000", "5. volume": "895" },
    "2020-11-04 18:39:00": { "1. open": "112.0300", "2. high": "112.0300", "3. low": "112.0300", "4. close": "112.0300", "5. volume": "183" },
    "2020-11-04 18:38:00": { "1. open": "112.0300", "2. high": "112.2900", "3. low": "112.0300", "4. close": "112.2900", "5. volume": "430" },
    "2020-11-04 18:35:00": { "1. open": "112.2500", "2. high": "112.2500", "3. low": "112.2500", "4. close": "112.2500", "5. volume": "150" },
    "2020-11-04 18:31:00": { "1. open": "112.2300", "2. high": "112.2300", "3. low": "112.2300", "4. close": "112.2300", "5. volume": "400" },
    "2020-11-04 18:26:00": { "1. open": "112.2700", "2. high": "112.2700", "3. low": "112.2500", "4. close": "112.2500", "5. volume": "300" },
    "2020-11-04 17:32:00": { "1. open": "112.0000", "2. high": "112.0000", "3. low": "112.0000", "4. close": "112.0000", "5. volume": "794" },
    "2020-11-04 17:20:00": { "1. open": "111.9700", "2. high": "111.9700", "3. low": "111.9700", "4. close": "111.9700", "5. volume": "113" }
}