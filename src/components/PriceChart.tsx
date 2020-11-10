import React from 'react';
import BarChart from '../specs/BarChart';
import LineChart from '../specs/LineChart';
import { SignalListeners, Vega } from 'react-vega';
import { DataEntry, TableEntry } from '../types/types';
import { Data } from 'vega';

interface PriceChartProps {
    data: DataEntry[];
}

interface PriceChartState {
    data: DataEntry[];
}

export class PriceChart extends React.Component<PriceChartProps, PriceChartState> {
    constructor(props: PriceChartProps) {
        super(props);
        this.state = { data: [] };
    }

    shouldComponentUpdate(nextProps: PriceChartProps, nextState: PriceChartState) {
        console.log("OLD PROPS:");
        console.log(this.props.data);
        console.log("NEXT PROPS:");
        console.log(nextProps.data);
        if (nextProps.data != this.props.data) {
            console.log(`Updating data`)
            this.state = { data: nextProps.data };
            console.log(this.state.data);
            return true;
        }
        else {
            console.log(`No update`)
            return false;
        }
    }

    componentDidUpdate() {
        console.log("COMPONENT UPDATED");
    }

    ConstructTable(dataEntries: DataEntry[]) {
        var res: TableEntry[] = [];
        dataEntries.forEach(entry => res.push({ time: entry.timeStamp, price: parseFloat(entry.high) }));
        var data = {
            "table": res
        }
        console.log(data);
        return data;
    }

    data = {
        "table": [
            { time: 0, price: 28, c: 0 }, { time: 0, price: 20, c: 1 },
            { time: 1, price: 43, c: 0 }, { time: 1, price: 35, c: 1 },
            { time: 2, price: 81, c: 0 }, { time: 2, price: 10, c: 1 },
            { time: 3, price: 19, c: 0 }, { time: 3, price: 15, c: 1 },
            { time: 4, price: 52, c: 0 }, { time: 4, price: 48, c: 1 },
            { time: 5, price: 24, c: 0 }, { time: 5, price: 28, c: 1 },
            { time: 6, price: 87, c: 0 }, { time: 6, price: 66, c: 1 },
            { time: 7, price: 17, c: 0 }, { time: 7, price: 27, c: 1 },
            { time: 8, price: 68, c: 0 }, { time: 8, price: 16, c: 1 },
            { time: 9, price: 49, c: 0 }, { time: 9, price: 25, c: 1 }
        ]
    }

    handleHover(...args: any[]) {
        console.log(args);
    }

    signalListeners: SignalListeners = { hover: () => console.log("HOVERING") };

    render() {
        return (
            <div>
                <Vega spec={LineChart} data={this.ConstructTable(this.props.data)} signalListeners={this.signalListeners} />
            </div>
        )
    }
}