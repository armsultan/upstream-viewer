import React from 'react';
import axios from 'axios';
import store from '../AppStore'
import * as actionCreator from '../actions/actionCreator'
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            password: "",
            loginMessage: ""
        };
        this.handleClick = this
            .handleClick
            .bind(this);

    }

    handleClick(event) {

        axios
            .get('/api/user/' + this.refs.email.value)
            .then(res => {
                console.log("Attemping to login: ",res.data[0].email," ",res.data[0].password);
                let doesExist = res.data;

                //check the user exists! i.e not an empty '[]' response and email value return equals the one inputed
                if (res.data !== 0 && res.data[0].email === this.refs.email.value && res.data[0].password === this.refs.password.value){

                console.log('Login Success');
                this.setState({loginMessage: "Welcome back!"});
                console.log(res.data[0]);

                //redux setstate
                this.props.userLogin(res.data[0]);

                //unset values
                this.refs.email.value="";
                this.refs.password.value="";

                // Redirect page
                this.props.history.push("/myupstreams");

                }
                else {
                console.log('Login Failed');
                this.setState({loginMessage: "Error: Incorrect password"});
                this.refs.password.value="";
                }


            })
            .catch(error => {
                console.log(error);
                this.setState({loginMessage: "Error: User does not exist, please register as a new user"});
                //unset values
                this.refs.password.value="";
            })

    }

    render() {

    return (
<form className="row">
    <div className="row">
        <div className="col s12">
            <h2>Login</h2>
        </div>
    </div>
   <div className="row">
        <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input type="email" ref="email" className="validate"/>
            <label className="active">Email</label>

        </div>
    </div>
    <div className="row">
        <div className="input-field col s12">
            <i className="material-icons prefix">https</i>
            <input type="password" ref="password" className="validate"/>
            <label className="active">Password</label>
        </div>
    </div>
    <div className="row">
        <div className="col s12">
            <div>{this.state.loginMessage}</div>
        </div>
    </div>
    <div className="row">
        <div className="col s12">
            <button className="btn waves-effect waves-light" type="button" onClick={this.handleClick}>Login</button>
        </div>
    </div>
                        <Route
                            exact
                            path="/register"
                            render={(routeProps) => <Register {...this.props} {...routeProps}/>}/>

    </form>
        );
    }
}