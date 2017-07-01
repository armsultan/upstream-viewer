import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
import Grid from 'material-ui/Grid';
import validUrl from 'valid-url';


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

    handleClick(event) {
        if (validUrl.isUri(this.refs.url.value)){
            console.log('Looks like an URI');
            this.setState({registrationMessage: "Looks like an URI"})


            axios.post('http://localhost:3000/api/endpoint/',
                {
                    url: this.refs.url.value
                })
                .then(res => {
                    console.log(res.data);
                    let doesExist = res.data;
                    if (doesExist.length !== 0 && res.data.found !== false){
                        this.setState({registrationMessage: res.data.address + " (" + res.data.nginx_build + ")" + " was found"});
                        console.log(res.data.address + " (" + res.data.nginx_build + ")" + " was found");
                    }
                    else{
                     this.setState({registrationMessage: "Unable to connect to a status API at " + this.refs.url.value});

                    }
                })
                .catch(error => {
                        console.log(error)
                        this.setState({registrationMessage: "Unable to connect to a status API at " + this.refs.url.value});
                })


        } else {
            console.log('Not a URI');
            this.setState({registrationMessage: "Not a URI"})

        }

    }

render() {

        return (
            <div>
            <Grid item xs={12}>
                <h2>My Servers</h2>
                                 <strong>user: {this.props.user.email}</strong>

                <p>Enter the url to Live Activity Monitoring API Address (JSON output).</p>
                <p>For more information on configuration please visit the <a href="https://www.nginx.com/resources/admin-guide/logging-and-monitoring/" target="_blank">logging and monitoring guide</a></p>
            </Grid>
            <Grid item xs={6}>
                    <label>Status API Address:
                        <input type="url" ref="url"/></label>
                         <div>{this.state.registrationMessage}</div>
                    <button type="submit" onClick={this.handleClick}>Add</button>
                  
                </Grid>
</div>
        );
    }

}