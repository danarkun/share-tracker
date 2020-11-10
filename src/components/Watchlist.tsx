import { DataGrid } from '@material-ui/data-grid';
import React from 'react'
import { AppActions, CompanyEntry, WatchlistState } from '../types/types'
import { RootState } from '../store'
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { startAddToWatchlist, startDeleteFromWatchlist } from '../actions/watchlistActions';
import { connect } from 'react-redux'

// Elicit watched companies from store
type Props = LinkStateProps & LinkDispatchProps;

export const Watchlist = (props: Props) => {
    return (
        <div>
            <h1>Watchlist</h1>
            <div style={{ height: 500, width: 1000 }}>
                <DataGrid
                    columns={[
                        { field: 'name', width: 200, renderHeader: () => (<strong>{"TIME"}</strong>) },
                        { field: 'open', renderHeader: () => (<strong>{"OPEN"}</strong>) },
                        { field: 'close', renderHeader: () => (<strong>{"CLOSE"}</strong>) },
                        { field: 'volume', renderHeader: () => (<strong>{"VOLUME"}</strong>) },
                    ]}
                    rows={[]}
                    onRowClick={e => console.log(e.data)}
                />
            </div>
        </div>
    )
}

interface LinkStateProps {
    watchList: WatchlistState;
}

interface LinkDispatchProps {
    addToWatchList: (company: CompanyEntry) => void;
    deleteFromWatchList: (id: string) => void;
}

const mapStateToProps = (state: RootState): LinkStateProps => ({
    watchList: state.watchlist
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
    addToWatchList: bindActionCreators(startAddToWatchlist, dispatch),
    deleteFromWatchList: bindActionCreators(startDeleteFromWatchlist, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Watchlist);