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
            upstreamName: "",
            upstreamDescription: "",
            statusApiUrl:""

        };
        this.renderPieChartData = this.renderPieChartData.bind(this);
        this.findUpstream = this.findUpstream.bind(this);
    }

        findUpstream(e) {
            return e._id === this.props.match.params.id;
        }

    componentWillMount() {
        // console.log(this.props.match.params.id); // uncomment to test
        this.es = new EventSource("/api/user/" + this.props.user.email + "/upstreamview/" + this.props.match.params.id);

        // Set State - pie chart data
        this.es.onmessage = function (event) {
            this.setState({status: JSON.parse(event.data)});
        }.bind(this); //The callback is made in a different context. You need to bind to this in order to have access inside the callback

        // Set State - this upstream
        let upstream = this.props.user.endPoints.find(this.findUpstream);
        this.setState({upstreamName: upstream.name});
        this.setState({upstreamDescription: upstream.description});
        this.setState({statusApiUrl: upstream.statusApiUrl});



  console.log(upstream);
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
                    <h4><i className="small material-icons">insert_chart</i>{this.state.upstreamName}</h4>
                    <p>{this.state.upstreamDescription}</p>
                    <p> {this.state.statusApiUrl}</p>
                </div>
                {this.renderPieChartData()}
            </div>
        );
    }
}