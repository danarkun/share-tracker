import React from 'react';
import BarChart from '../specs/BarChart';
import { SignalListeners, Vega } from 'react-vega';
import { DataEntry } from '../types/types';

interface PriceChartProps {
    data: DataEntry[];
}

interface PriceChartState {

}

export class PriceChart extends React.Component<PriceChartProps> {
    constructor(props: PriceChartProps) {
        super(props);
    }

    shouldComponentUpdate(nextProps: PriceChartProps, nextState: PriceChartState) {
        if (nextProps.data != this.props.data) {
            console.log(`Updating data to: ${this.props.data}`)
            return true;
        }
        else {
            console.log(`No update`)
            return false;
        }
    }

    barData = {
        "table": [
            { "category": "A", "amount": 28 },
            { "category": "B", "amount": 55 },
            { "category": "C", "amount": 43 },
            { "category": "D", "amount": 91 },
            { "category": "E", "amount": 81 },
            { "category": "F", "amount": 53 },
            { "category": "G", "amount": 19 },
            { "category": "H", "amount": 87 }
        ]
    };

    handleHover(...args: any[]) {
        console.log(args);
    }

    signalListeners: SignalListeners = { hover: () => console.log("HOVERING") };

    render() {
        return (
            <div>
                <Vega spec={BarChart} data={this.barData} signalListeners={this.signalListeners} />,
            </div>
        )
    }
}