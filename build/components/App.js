import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, Link, withRouter} from 'react-router-dom';
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

    }

loginStatus(){

    if(this.props.user.email){
        // User is Loggedin: Redirect to 'My Upstreams' page
        this.props.history.push("/myupstreams");
    }
    else{
       // User is Loggedin: Redirect to 'Login' page
        this.props.history.push("/login");
    }


}
signOut(){
        //redux setstate
        //this.props.userLogout();
        this.props.userLogin({email : "",endPoints: []});
}

showLoginStatus(){

    if(this.props.user.email){
        return (
            <div><h6>Signed in: {this.props.user.email}</h6><span><Link to="/" ><button type="button" onClick={this.signOut}>Signout</button></Link></span></div>
        );
    }
    else{
         return (
            <h6>Signed out: Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> </h6>
        );
    }
    
    
}

    render() {
           <Link to="/" ><button type="button" onClick={this.signOut}>Signout</button></Link>
        return (
            <div>
            <BrowserRouter>
            <div className="row">
            
<div>{this.showLoginStatus()}</div>
                        <Route
                            exact
                            path="/login"
                            render={(routeProps) => <Login {...this.props} {...routeProps}/>}/>


                        <Route
                            exact
                            path="/register"
                            render={(routeProps) => <Register {...this.props} {...routeProps}/>}/>

                        <Route
                            exact
                            path="/myupstreams"
                            render={(routeProps) => <MyUpstreams {...this.state} {...this.props} {...routeProps}/>}/>

                        <Route
                            exact
                            path="/upstreamview/:id"
                            render={(routeProps) => <UpstreamView {...this.state} {...this.props} {...routeProps}/>}/>

                        <Route
                            exact
                            path="/upstreamview/"
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
