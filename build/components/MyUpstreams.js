import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
import validUrl from 'valid-url';


export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            registrationMessage: "",
            upstreamListMessage: ""

        };
        this.handleClick = this
            .handleClick
            .bind(this);

            this.handleRemoveClick = this
            .handleRemoveClick
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

    handleRemoveClick(event){

        //unset react state
        this.setState({registrationMessage: ""});
        this.setState({upstreamListMessage: ""});

        // Varibles
        const value = event.target.value;
        const name = this.props.user.endPoints[value].name;

        //Update Database
        axios.put('/api/user/' + this.props.user.email + '/endpoint/delete' ,
                {
                    _id: this.props.user.endPoints[value]._id
                })
                .then(res => {

                    // Update redux state
                    this.props.updateEndpointsRemove(value);

                    //Update react state
                    this.setState({upstreamListMessage: "Upstream " +  name + " removed"});
                    console.log("all good!");

                })
                .catch(error => {
                    // Update react state
                    this.setState({upstreamListMessage: "Unable to remove upstream " + name});

                })

    }


    handleClick(event) {
        //unset react state
        this.setState({registrationMessage: ""});
        this.setState({upstreamListMessage: ""});


        if (this.refs.name.value.trim() === ""){
            console.log('Add a name');
            this.setState({registrationMessage: "Add a name"})
        }

        else if (validUrl.isUri(this.refs.url.value)){
            console.log('Looks like an URI');
            this.setState({registrationMessage: "Looks like an URI"})


            axios.post('/api/user/' + this.props.user.email + '/endpoint/add',
                {
                    statusApiUrl: this.refs.url.value,
                    name: this.refs.name.value,
                    description: this.refs.description.value

                })
                .then(res => {
                    console.log(res.data);
                    let doesExist = res.data;
                    if (doesExist.length !== 0 && res.data.found !== false){
                        console.log("THIS IS IT: ",res.data)
                        this.setState({registrationMessage: "Status API for Upstream found, with shared memory zone " + res.data.zone});

                        console.log("Status API for Upstream found, with shared memory zone " + res.data.zone);

                        //Update redux state
                        this.updateEndpointList();

                          //unset values
                          this.refs.name.value="";
                          this.refs.url.value="";
                          this.refs.description.value="";

                    }
                    else{
                     this.setState({registrationMessage: "Unable to connect to the status API: " + res.data.comment});

                    }
                })
                .catch(error => {
                        console.log(error)
                        this.setState({registrationMessage: "Unable to connect to the status API: " + res.data.comment});
                })


        } else {
            console.log('Not a URI');
            this.setState({registrationMessage: "Not a URI"})

        }

    }

render() {

        return (
            <div className="row">
                <div className="row">
                    <div className="col s12">
                        <h2>My Upstreams</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p>Enter the url to a Live Activity Monitoring API Address of the Upstream (JSON output).<br/>e.g. https://demo.nginx.com/status/upstreams/trac-backend</p>
                        <p>For more information on configuration please visit the <a href="https://www.nginx.com/resources/admin-guide/logging-and-monitoring/" target="_blank">logging and monitoring guide</a></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h4>Add Upstream</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">label</i>
                        <input type="text" ref="name" className="validate" placeholder="e.g. Example Inc Production"/>
                        <label className="active">Name</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">equalizer</i>
                        <input type="url" ref="url" className="validate" placeholder="e.g. https://internal.example.com/status/upstreams/production"/>
                        <label className="active">Status API Address</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">info_outline</i>
                        <input type="text" ref="description" className="validate" placeholder="e.g. Production traffic"/>
                        <label className="active">Description</label>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12">
                         <div>{this.state.registrationMessage}</div>
                    </div>
                </div>
                

                <div className="row">
                    <div className="col s12">
                        <button className="btn waves-effect waves-light" type="submit" onClick={this.handleClick}>Add</button>
                    </div>
                </div>


                        <ul className="collection with-header">
                            <li className="collection-header"> <h4>Upstream List</h4></li>


                <li className="collection-header">
                       {this.state.upstreamListMessage}
                </li>
   
                            {this.props.user.endPoints.slice(0).reverse().map((endPoint, key) => {
                                let reverseKey = this.props.user.endPoints.length - key - 1;
                                    return (
                                         <li className="collection-item avatar" key={reverseKey}>
                                         <Link to={'/upstreamview/' + endPoint._id} alt={endPoint.name}><i className="material-icons circle green">insert_chart</i></Link>           
                                            <span className="title"><Link to={'/upstreamview/' + endPoint._id} alt={endPoint.name}>{endPoint.name}</Link></span>
                                            <p>{endPoint.description}<br/>
                                                <small><a href={endPoint.statusApiUrl} target="_blank">{endPoint.statusApiUrl}</a></small>
                                            </p>
                                             <button className="secondary-content btn waves-effect waves-light" type="button" value={reverseKey} onClick={this.handleRemoveClick}>Remove</button>
                                        </li>
                                    )
                                })
                                }
                        </ul>
            </div>
        );
    }

}