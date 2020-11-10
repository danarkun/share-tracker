export interface CompanyInfo {
    name: string,
    description: string,
    address: string,
    sector: string
}

export interface DataEntry {
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