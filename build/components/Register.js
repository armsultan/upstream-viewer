import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
import validator from "email-validator";


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

     validEmail() {
        return validator.validate(this.refs.email.value);
     }

    handleClick(event) {

        if (this.validPasswords() && this.validEmail()) {
            event.preventDefault(); // We want to prevent the default action since in react we want to prevent a page reload from a form submit https://developer.mozilla.org/samples/domref/dispatchEvent.html

            let email = this.refs.email.value;
            let password = this.refs.password.value;
            

            console.log("password OK with: ", email, " ", password);


            axios.get('/api/user/' + email)
                .then(res => {
                    console.log("test:", res.data)
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
                                console.log('We have registered a new user ', res.data.email);

                                //redux setstate
                                this.props.userLogin(res.data);

                                //unset values
                                this.refs.email.value="";
                                this.refs.password.value="";
                                this.refs.passwordConfirm.value="";
                                this.setState({registrationMessage: "registration successful!"});

                                // Redirect page
                                this.props.history.push("/myupstreams");
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
            if(this.validEmail() === false){
                this.setState({registrationMessage: "Invalid email address!"});
                console.log("Invalid email address!");
            }
            else{
                this.setState({registrationMessage: "Password does not match!"});
                console.log("Password does not match!");
            }

        }

    }
    render() {

        return (
           <form className="row">
                <div className="row">
                    <div className="col s12">
                        <h2>Registration</h2>
                    </div>
                </div>
             <div className="row">
                 <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input type="email" ref="email" className="validate" placeholder="name@isp.com"/>
                    <label className="active">Email</label>
                </div>
            </div>

            <div className="row">
                 <div className="input-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input type="password" ref="password" className="validate" placeholder="Password"/>
                    <label className="active">Password</label>
                </div>
            </div>

            <div className="row">
                 <div className="input-field col s12">
                    <i className="material-icons prefix">https</i>
                    <input type="password" ref="passwordConfirm" className="validate" placeholder="Password"/>
                    <label className="active">Confirm Password</label>
                </div>
            </div>

            <div className="row">
                 <div className="col s12">
                    <button className="btn waves-effect waves-light" type="submit" onClick={this.handleClick}>Register</button>
                </div>
            </div>

            <div className="row">
                <div className="col s12">
                        {this.state.registrationMessage}
                </div>
            </div>
        </form>
        );
    }
}