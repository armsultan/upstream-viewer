import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Parser from 'html-react-parser';

let PieChart = require("react-chartjs").Pie;


export default class UpstreamView extends React.Component {
    constructor() {
        super();
        this.state = {
            status: ""
            
        };
    }


    componentDidMount() {
        let es = new EventSource("/sse");

        es.onmessage = function (event) {
           // this.setState({status: JSON.parse(event.data)});
            this.setState({status: event.data});
            //console.log(JSON.parse(this.state.status));

            console.log(JSON.parse(this.state.status));
            
        }.bind(this); //The callback is made in a different context. You need to bind to this in order to have access inside the callback
    }

    getData(obj){
       // let o = JSON.parse(obj);
       // return obj.data.dataset[0].data;
    }

    render() {
        return (
            <div>
                <h2>Upstream Dashboard</h2>

                <p>This is a test for server event push:</p>
<pre>{this.state.status}</pre>
<pre>{this.getData(this.state.status)}</pre>
            </div>
        );
    }
}