import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
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


      componentDidMount() {
        this.updateEndpointList();
    }

    updateEndpointList(){
        axios
            .get('/api/user/' + this.props.user.email)
            .then(res => {

                console.log("user data: ", res.data[0]);
                //redux setstate
                this.props.updateEndpoints(res.data[0]);
            })
            .catch(error => {
                console.log(error);
            })

    }


    handleClick(event) {

        if (this.refs.name.value.trim() === ""){
            console.log('Add a name');
            this.setState({registrationMessage: "Add a name"})
        }

        else if (validUrl.isUri(this.refs.url.value)){
            console.log('Looks like an URI');
            this.setState({registrationMessage: "Looks like an URI"})


            axios.post('http://localhost:3000/api/endpoint/',
                {
                    email: this.props.user.email,
                    statusApiUrl: this.refs.url.value,
                    name: this.refs.name.value,
                    description: this.refs.description.value

                })
                .then(res => {
                    console.log(res.data);
                    let doesExist = res.data;
                    if (doesExist.length !== 0 && res.data.found !== false){
                        this.setState({registrationMessage: res.data.address + " (" + res.data.nginx_build + ")" + " was found"});
                        
                        console.log(res.data.address + " (" + res.data.nginx_build + ")" + " was found");
        
                        //Update redux state
                        this.updateEndpointList();

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
                <h2>My Servers</h2>
                 <strong>user: {this.props.user.email}</strong>

                <p>Enter the url to Live Activity Monitoring API Address (JSON output).</p>
                <p>For more information on configuration please visit the <a href="https://www.nginx.com/resources/admin-guide/logging-and-monitoring/" target="_blank">logging and monitoring guide</a></p>
                 <h4>Add Server</h4>
                <label>Name: </label><input type="text" ref="name"/>
                <label>Status API Address:</label><input type="url" ref="url"/>
                <label>Description (Optional) :</label><input type="text" ref="description"/>

                         <div>{this.state.registrationMessage}</div>
                    <button type="submit" onClick={this.handleClick}>Add</button>
                <h4>Server List</h4>
                                    <ul>

                            {this.props.user.endPoints.slice(0).reverse().map((endPoint, key) => {
                                    return (
                                        <li className="endPoint" key={key}>
                                            {endPoint.name},  {endPoint.statusApiUrl}, {endPoint.description}
                                            <small>
                                                remove</small>
                                        </li>
                                    )
                                })
                                }
                        </ul>

</div>
        );
    }

}