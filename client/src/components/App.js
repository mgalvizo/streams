import '../style/App.css';
import React from 'react';
// Import necessary properties from react-router-dom, use a plain Router since we are using our own history object NOT a BrowserRouter
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
// import the history object
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            {/* Pass the history as a prop to browser router */}
            <Router history={history}>
                <div>
                    {/* Header will always be visible since it is not wrapped inside of a Route component */}
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <Route
                            path="/streams/new"
                            exact
                            component={StreamCreate}
                        />
                        {/* The /:id portion is whatever value holds URL after /streams/edit/ even if the stream id doesn't exist */}
                        <Route
                            path="/streams/edit/:id"
                            exact
                            component={StreamEdit}
                        />
                        <Route
                            path="/streams/delete/:id"
                            exact
                            component={StreamDelete}
                        />
                        <Route
                            path="/streams/:id"
                            exact
                            component={StreamShow}
                        />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
