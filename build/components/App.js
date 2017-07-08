import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/actionCreator';
// import BasicRouting from './BasicRouting';
import Register from './Register';
import Login from './Login';
import UserTodoList from './UserTodoList';
import UpstreamView from './UpstreamView';
import MyUpstreams from './MyUpstreams';

// Redux requires to give a correct mapping of what State should ultimately look
// like. State is how React and Redux work. What the method below is doing is
// assigning state to an object, which will represent what props will look like
// as it descends through the app.
let mapStateToProps = (state) => {
    return {user: state.user}
};

// Binds actions to the dispatch object. The dispatch object is the lifecycle of
// Redux that gets called whenever there is a state change. When it receives an
// event, it executes the method that we implemented in our actionCreator
// module.
let mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

class App extends React.Component {
    constructor() {
        super();
        this.navigateToSingleUser = this
            .navigateToSingleUser
            .bind(this);
    }

    navigateToSingleUser(routeProps) {
        console.log(routeProps);
        let user = this
            .props
            .users
            .filter(user => user._id === routeProps.match.params.id)[0];
        return <Todo
            {...user}
            {...routeProps}
            addTodo={this.props.addTodo}
            removeTodo={this.props.removeTodo}/>
    }

    render() {
        return (
            <div>
            <BrowserRouter>
            <div className="row">
                        <Link to="/">Home</Link><br/>{/* <Link to="/users">Users</Link>
                    <Route exact path="/users" render={(routeProps) => <UserTodoList {...this.props} {...routeProps} />} />
                    <Route path="/users/:id/todo" render={this.navigateToSingleUser} /> */}

                        <Link to="/login">Login</Link>
                        <Route
                            exact
                            path="/login"
                            render={(routeProps) => <Login {...this.props} {...routeProps}/>}/>


                        <Link to="/register">Register</Link>
                        <Route
                            exact
                            path="/register"
                            render={(routeProps) => <Register {...this.props} {...routeProps}/>}/>

                        <Link to="/myupstreams">My Upstreams</Link>
                        <Route
                            exact
                            path="/myupstreams"
                            render={(routeProps) => <MyUpstreams {...this.state} {...this.props} {...routeProps}/>}/>

                        <Link to="/upstreamView">Upstream test</Link>
                        <Route
                            exact
                            path="/upstreamView"
                            render={(routeProps) => <UpstreamView {...this.state} {...this.props} {...routeProps}/>}/>
</div>
            </BrowserRouter>
            </div>
        );
    }
}

// connect() is used to inject props directly into a container component.
let ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
