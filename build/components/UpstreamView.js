import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Parser from 'html-react-parser';

import {Pie} from 'react-chartjs-2';


export default class UpstreamView extends React.Component {
    constructor() {
        super();
        this.state = {
            status: {},
            es: {}
        };
        this.renderPieChartData = this.renderPieChartData.bind(this);
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        let es = new EventSource("/api/user/" + this.props.user.email + "/upstreamview/" + this.props.match.params.id);
   //             this.setState(new EventSource("/api/user/" + this.props.user.email + "/upstreamview/" + this.props.match.params.id));

         //  let es = new EventSource("/api/endpoint/");
 //this.state.es.onmessage = function (event) {
       es.onmessage = function (event) {
            this.setState({status: JSON.parse(event.data)});
            console.log('test: ', this.state.status);
        }.bind(this); //The callback is made in a different context. You need to bind to this in order to have access inside the callback



        // window.addEventListener("beforeunload", (ev) => 
        // { 
        //     ev.preventDefault();
       // es.close();
//         console.log('Closing event stream');

        //     return ev.returnValue = 'Are you sure you want to close?';
        // });
    }

    renderPieChartData(){
        if(this.state.status.data)
        return (<Pie data={this.state.status.data}  options={this.state.status.options} / >);
    }

    componentWillUnmount() {
  window.removeEventListener('beforeunload', this.keepOnPage);
}

keepOnPage(e) {
  var message = 'Warning!\n\nNavigating away from this page will delete your text if you haven\'t already saved it.';
  e.returnValue = message;
  return message;
}

    render() {

        let pieChartData = this.renderPieChartData();
        return (
            <div>
                <h2>Upstream Dashboard</h2>

            {this.renderPieChartData()}


            </div>
        );
    }
}