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
import randomColor from 'random-color';
import * as userService from '../services/userService';

let createEndpoint = (body, callback) => {

EndPoint.create(
    {
    name: body.name,
    statusApiUrl: body.statusApiUrl,
    description: body.description
    }
, callback);
}


/*
 * Check if Status API on remote NGINX server EXISTS
 */

export let checkStatusApi = (body, callback) => {

    // Fetch the entire NGINX Status and check for the Address Field to confirm API
    // exists

    // default fail response
    let rFail = {
                "found": false,
                "comment": "Fail"
                };


    axios
        .get(body.statusApiUrl)
        .then(response => {

            if(response.data !== undefined){

            console.log("API Check Status: Found");
            console.log("Address: " + response.data.address);

                let endPointId = "";


                createEndpoint(body, (err, data) => {
                    if (!err) {
                        endPointId = data.id;
                        console.log("the ID saved is.....: ", endPointId);
                        
                        userService.putEndpoint(body.email, data.id, (err, data) => {
                             if (!err) {
                                 console.log("User updated: ", data);
                             }
                             else{
                                console.log(err);
                             }
                             });

                    } else {
                        console.log(err);
                    }

                });

            let r = {
                "found": true,
                "comment": "Success",
                "address": response.data.address,
                "nginx_build": response.data.nginx_build,
                "endPointId" : endPointId,
                "timestamp": response.data.timestamp
            };

            callback(r);

        }
            else{
                console.log("API Check Status: Failed");
                callback(rFail);
            }
        })
        .catch(error => {
            console.log(error);
            console.log("API Check Status: Failed");

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
            //callback(response.data);
            //console.log(requestsPiechart(response.data.peers)); //uncheck this line to test
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
    data.forEach((value) => {
        let color = randomColor();
        labels.push(value.name)
        backgroundColor.push(color.hexString());
        requests.push(value.requests)
    });

    let chart = {
    "type": "pie",
    "data": {
      "labels": labels,
      "datasets": [{
        "label": "Connections per sec",
        "backgroundColor": backgroundColor,
        "data": requests
      }]
    },
    "options": {
      "title": {
        "display": true,
        "text": "Connections per sec"
      }
    }
};

return JSON.stringify(chart);
}

/*TESTS
run 'node_modules/.bin/babel-node server/services/statusApiService.js'
*/
// setInterval(fetchStatus('http://demo.nginx.com/status'), 5000); # call back
// erro!

//test('https://demo.nginx.com/status/upstreams/trac-backend'); 

// setInterval ( () => {
// fetchStatus('http://demo.nginx.com/status/timestamp')  }, 1000);