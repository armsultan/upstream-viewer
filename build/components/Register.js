import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            registrationMessage: ""
        };
        this.handleClick = this
            .handleClick
            .bind(this);
    }

    validPasswords() {
        let passwordBox = this.refs.password.value;
        let confirmbox = this.refs.passwordConfirm.value;
        return passwordBox === confirmbox;
    }

    handleClick(event) {

        if (this.validPasswords()) {
            event.preventDefault(); // We want to prevent the default action since in react we want to prevent a page reload from a form submit https://developer.mozilla.org/samples/domref/dispatchEvent.html

            let email = this.refs.email.value;
            let password = this.refs.password.value;
            

            console.log("password OK with: ", email, " ", password);


            axios.get('/api/user/' + email)
                .then(res => {
                    
                    let doesExist = res.data;
                    if (doesExist.length === 0){
                        this.setState({registrationMessage: "New registration"});
                        console.log("New registration");

                        //Create new User
                        axios
                            .post('/api/user/register', {
                            email: email,
                            password: password
                        })
                            .then(res => {
                                console.log('We have registered a New user ', res.data.email);
                                

                                //unset values
                                this.refs.email.value="";
                                this.refs.password.value="";
                                this.refs.passwordConfirm.value="";
                                this.setState({registrationMessage: "Registraion successful!"});
                            })
                            .catch(error => {
                                console.log(error)
                                this.setState({registrationMessage: "Error: Unable to register new user at this time"});
                            })

                    }
                    else{
                        this.setState({registrationMessage: "Error: Account already exists for " +  email});
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({registrationMessage: "Error: Unable to register at this time"});
                })
        }

        else {
            this.setState({registrationMessage: "Password does not match!"});
            console.log("Password does not match!");
        }

    }
    render() {

        return (
            <div>
                <h2>Registration</h2>
                <div>
                    <label>Email:
                        <input type="email" ref="email"/></label><br/>
                    <label>Password:
                        <input type="password" ref="password"/></label><br/>
                    <label>Confirm Password:
                        <input type="password" ref="passwordConfirm"/></label><br/>
                    <button type="submit" onClick={this.handleClick}>Register</button>
                </div>
                                <div>{this.state.registrationMessage}</div>
</div>
        );
    }
}