import React, { FC } from 'react'
import { connect } from 'react-redux';
import { NavLink, Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import styled from 'styled-components';
import { startAddToWatchlist, startClearWatchlist, startDeleteFromWatchlist } from '../actions/watchlistActions';
import { Home } from '../components/Home';
import PriceList from '../components/PriceList';
import Watchlist from '../components/Watchlist';
import { RootState } from '../store';
import { AppActions, CompanyEntry, WatchlistState } from '../types/types';

const ContentColumn = styled.div`
position: absolute;
top: 100px;
left: 20%;
`;

const HeaderColumn = styled.div`
  top: 0px;
  left: 0px;
  position: absolute;
  width:100%;
`;

type Props = LinkStateProps & LinkDispatchProps;

export const AppRouter:FC<Props> = (props) => {
    return (
        <Router>
            <HeaderColumn>
                <ul className="nav" id="navButtons">
                    <li>
                        <NavLink exact to="/Home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Search">Search</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Watchlist">Watchlist</NavLink>
                    </li>
                </ul>
            </HeaderColumn>
            <Switch>
                <ContentColumn>
                    <Route exact path="/" render={() => (
                        <Redirect exact from="/" to="/Home" />
                    )} />
                    <Route render={() => <Redirect to={{ pathname: "/Home" }} />} />
                    <Route path="/Search" render={() => <PriceList addTowatchlist={props.startAddToWatchlist} />} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Watchlist" component={Watchlist} />
                </ContentColumn>
            </Switch>
        </Router>
    )
}

interface LinkStateProps {
    watchlist: WatchlistState;
}

interface LinkDispatchProps {
    startAddToWatchlist: (company: CompanyEntry) => void,
    startDeleteFromWatchlist: (id: string) => void,
    startClearWatchlist: () => void;
}

const mapStateToProps = (state: RootState): LinkStateProps => ({
    watchlist: state.watchlist
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
    startAddToWatchlist: bindActionCreators(startAddToWatchlist, dispatch),
    startDeleteFromWatchlist: bindActionCreators(startDeleteFromWatchlist, dispatch),
    startClearWatchlist: bindActionCreators(startClearWatchlist, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);