import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Parser from 'html-react-parser';

export default class UpstreamView extends React.Component {
    constructor() {
        super();
        this.state = {
            status: ""
            
        };
    }

    // componentWillMount() {


    // }

    componentDidMount() {
        let es = new EventSource("/sse");

        es.onmessage = function (event) {
            console.log(event.data);
            this.setState({status: event.data});

        }.bind(this); //The callback is made in a different context. You need to bind to this in order to have access inside the callback:
        // let pieChart = new Chart(document.getElementById("pie-chart"), this.state.status);
        // pieChart.update();
    }
    render() {

        return (
            <div>
                <h2>Upstream Dashboard</h2>

                <p>This is a test for server event push:</p>
                <pre>{this.state.status}</pre>

                <canvas id="pie-chart" width="800" height="450"></canvas>

            </div>
        );
    }
}