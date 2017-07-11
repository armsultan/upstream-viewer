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
            <div>
                <h2>Login</h2>
                <label>Email:
                    <input type="email" ref="email" placeholder="name@isp.com"/></label><br/>
                <label>Password:
                    <input type="password" ref="password" placeholder="Password"/></label><br/>
                <button type="button" onClick={this.handleClick}>Login</button>
                        <Route
                            exact
                            path="/register"
                            render={(routeProps) => <Register {...this.props} {...routeProps}/>}/>

                
                 <div>{this.state.loginMessage}</div>
            </div>
        );
    }
}