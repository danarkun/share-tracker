import React from 'react'
import { NavLink, Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Home } from '../components/Home';
import PriceList from '../components/PriceList';
import Watchlist from '../components/Watchlist';

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

const AppRouter = () => {
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
                    <Route path="/Search" component={PriceList} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Watchlist" component={Watchlist} />
                </ContentColumn>
            </Switch>
        </Router>
    )
}

export default AppRouter;