import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/actionCreator';
import Register from './Register';
import Login from './Login';
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
        this.signOut = this
            .signOut
            .bind(this);

        this.loginStatus = this
            .loginStatus
            .bind(this);
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
        this.props.userLogout();
}

showNav(){

    if(this.props.user.email){
        return (
<ul id="nav-mobile" className="right hide-on-med-and-down">
  <li>Signed in: {this.props.user.email}</li>
        <li><Link to="/myupstreams">My Upstreams</Link></li>
        <li><Link to="/" onClick={this.signOut}>Signout</Link></li>

            {/*<div><h6>Signed in: {this.props.user.email}</h6><span><Link to="/myupstreams">My Upstreams</Link></span> | <span><Link to="/" onClick={this.signOut}>Signout</Link></span></div>*/}
        </ul>);
    }
    else{

         return (
             <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>Signed out:</li>
               <li><Link to="/login">Login</Link></li>
               <li><Link to="/register">Register</Link></li>
           </ul>
        );
    }
}

    render() {
        return (

            <BrowserRouter>

                    <div >

                        <nav>
                            <div className="nav-wrapper teal lighten-2">
                            <a href="#" className="brand-logo"><img src="/images/logo.png" width="50px" className="circle" alt="logo"/> Upstream Viewer</a>
                            {this.showNav()}
                            </div>
                        </nav>
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
                            path="/upstreamview"
                            render={(routeProps) => <UpstreamView {...this.state} {...this.props} {...routeProps}/>}/>
            </div>

            </BrowserRouter>
        );
    }
}

// connect() is used to inject props directly into a container component.
let ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
