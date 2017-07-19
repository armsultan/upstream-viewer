/**
 * Services
 * Services are used to abstract out the logic needed to enact on data, before sending it off to the database.
 *
 * EndPoint Service
 */
'use strict';
import {EndPoint} from '../models/EndPoint';
import {User} from '../models/User';

import axios from 'axios';
import randomColor from 'randomcolor';
import * as userService from '../services/userService';

// Randomize colors for graphs!
//create an empty array with length 1000
let colorsList = new Array(1000);
// Create 1000 colors in an array
for (let i=0; i< colorsList.length; i++) {
        let color = randomColor();
        colorsList[i] = randomColor();
}
console.log("Generating Colors: " + colorsList + "... Colors Generated");


let createEndpoint = (body, callback) => {

EndPoint.create(
    {
        name: body.name,
        statusApiUrl: body.statusApiUrl,
        description: body.description
    }
, callback);
}


export let checkStatusApi = (body, callback) => {


    // Fetch the entire NGINX Status and check for the Address Field to confirm API
    // exists then adds endpoint to user

    axios
        .get(body.statusApiUrl)
        .then(response => {

            if(response.data.zone !== undefined){

            console.log("Status API for Upstream found");
            console.log("Zone: " + response.data.zone);

                    userService.addEndpoint(body.email, {

                        name: body.name,                   /*Name of the Endpoint (NGINX Cluster)*/
                        statusApiUrl: body.statusApiUrl,           /*URL to the NGINX STATUS API*/
                        description: body.description,           /*Description of the Endpoint (NGINX Cluster)*/
                        upStreamConfUrl: "",     /*URL to the NGINX Upstream conf*/

                    }, (err, data) => {
                             if (!err) {
                                 console.log("User's endpoints: ", data.endPoint);
                             }
                             else{
                                console.log("Error: ", err);
                             }
                             });

            const r = {
                "found": true,
                "comment": "Success",
                "zone": response.data.zone,
                "timestamp": response.data.timestamp
            };

            callback(r);

        }
            else{
                console.log("API Check Status: Not an Upstream");

                const rFail = {
                "found": false,
                "comment": "Not an Upstream"
                };

                callback(rFail);
            }
        })
        .catch(error => {
            console.log("Error: ", error);
            console.log("API Check Status: Failed");
               const rFail = {
                "found": false,
                "comment": "Unable to connect"
                };
            callback(rFail);
        });

}

/*
 * GET Status API from remote NGINX server - any json data
 */
export let fetchStatus = (url, callback) => {

    //Fetch the entire NGINX Status
    axios
        .get(url)
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            callback(error);
        });

}

/*
 * GET Status API from remote NGINX server
 */
export let fetchUpstream = (url, callback) => {



    //Fetch the entire NGINX Status
    axios
        .get(url)
        .then(function (response) {
            let numOfNodes = Object
                .keys(response.data.peers)
                .length;
            //console.log("Number of nodes: ", numOfNodes); // uncomment to test
            //console.log("Data to process: ", response.data.peers); // uncomment to test
            callback(requestsPiechart(response.data.peers));
        })
        .catch(function (error) {
            callback(error);
        });

}

let requestsPiechart = (data) => {
    //REQUESTS PER SEC pie chart
    let numOfNodes = Object
        .keys(data)
        .length;
    let labels = [];
    let backgroundColor = [];
    let requests =[];
    data.forEach((value,index) => {
        labels.push(value.name)
        backgroundColor.push(colorsList[index]); // get a color from the color array by index
        requests.push(value.requests)
    });

    let chart = {
    "type": "pie",
    "data": {
      "labels": labels,
      "datasets": [{
        "label": "Total requests",
        "backgroundColor": backgroundColor,
        "data": requests
      }]
    },
    "options": {
      "title": {
        "display": true,
        "text": "Total requests"
      }
    }
};

return JSON.stringify(chart);
}