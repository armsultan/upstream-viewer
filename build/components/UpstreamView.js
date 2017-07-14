import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Parser from 'html-react-parser';

import {Pie} from 'react-chartjs-2';


export default class UpstreamView extends React.Component {
    constructor() {
        super();
        this.es = null;
        this.state = {
            status: {},
            es: {}
        };
        this.renderPieChartData = this.renderPieChartData.bind(this);
    }

    componentWillMount() {
        console.log(this.props.match.params.id);
        this.es = new EventSource("/api/user/" + this.props.user.email + "/upstreamview/" + this.props.match.params.id);

        this.es.onmessage = function (event) {
            this.setState({status: JSON.parse(event.data)});
            console.log('test: ', this.state.status);
        }.bind(this); //The callback is made in a different context. You need to bind to this in order to have access inside the callback


    }
    componentWillUnmount() {
        this.es.close();
    }

    renderPieChartData(){
        if(this.state.status.data)
        return (<Pie data={this.state.status.data}  options={this.state.status.options} / >);
    }

    render() {

        let pieChartData = this.renderPieChartData();
        return (
           <div className="row">
            <div className="col s12">
                        
                    <h2>Upstream Dashboard</h2>
                </div>
                {this.renderPieChartData()}
            </div>
        );
    }
}