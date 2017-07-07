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
            data: {
      labels: ["Web Server 1", "Web Server 2", "Web Server 3", "Web Server 4", "Web Server 5"],
      datasets: [{
        label: "Connections per sec",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Connections per sec'
      }
    }

        };
        this.renderPieChartData = this.renderPieChartData.bind(this);
    }


    componentDidMount() {
        let es = new EventSource("/sse");

        es.onmessage = function (event) {
           // this.setState({status: JSON.parse(event.data)});
            this.setState({status: JSON.parse(event.data)});
            //console.log(JSON.parse(this.state.status));

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

                <p>This is a test for server event push:</p>


            {this.renderPieChartData()}


            </div>
        );
    }
}