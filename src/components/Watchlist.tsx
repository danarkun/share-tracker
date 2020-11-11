import { DataGrid } from '@material-ui/data-grid';
import React, { FC } from 'react'
import { AppActions, CompanyEntry, WatchlistState } from '../types/types'
import { RootState } from '../store'
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { startAddToWatchlist, startClearWatchlist, startDeleteFromWatchlist } from '../actions/watchlistActions';
import { connect } from 'react-redux'

// TODO CONVERT TO PASSED STATE/DISPATCH PROPS
// Elicit watched companies from store
type Props = LinkStateProps & LinkDispatchProps;

const Watchlist:FC<Props> = (props: Props) => {
    const { watchlist } = props;

    return (
        <div>
            <h1>Watchlist</h1>
            <div style={{ height: 500, width: 1000 }}>
                <DataGrid
                    columns={[
                        { field: 'name', type: "string", width: 500, renderHeader: () => (<strong>{"COMPANY"}</strong>) },
                        { field: 'open', type: "number", renderHeader: () => (<strong>{"OPEN"}</strong>) },
                        { field: 'close', type: "number", renderHeader: () => (<strong>{"CLOSE"}</strong>) },
                        { field: 'volume', type: "number", renderHeader: () => (<strong>{"VOLUME"}</strong>) },
                    ]}
                    rows={watchlist.watchlistEntries}
                    onRowClick={e => console.log(e.data)}
                />
            </div>
            <button onClick={props.clearWatchlist}>CLEAR WATCHLIST</button>
        </div>
    )
}

interface LinkStateProps {
    watchlist: WatchlistState;
}

interface LinkDispatchProps {
    addToWatchList: (company: CompanyEntry) => void;
    deleteFromWatchList: (id: string) => void;
    clearWatchlist: () => void
}

const mapStateToProps = (state: RootState): LinkStateProps => ({
    watchlist: state.watchlist
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
    addToWatchList: bindActionCreators(startAddToWatchlist, dispatch),
    deleteFromWatchList: bindActionCreators(startDeleteFromWatchlist, dispatch),
    clearWatchlist: bindActionCreators(startClearWatchlist, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);