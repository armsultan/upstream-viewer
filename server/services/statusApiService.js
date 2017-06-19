/**
 * Services
 * Services are used to abstract out the logic needed to enact on data, before sending it off to the database.
 *
 * EndPoint Service
 */
'use strict';
import {EndPoint} from '../models/EndPoint';
import axios from 'axios';

/*
 * Check if Status API on remote NGINX server EXISTS
 */
export let checkStatusApi = (url) => {

let check = "error";

        //Fetch the entire NGINX Status and check for the Address Field to confirm API exists
        axios
            .get(url)
            .then(function (response) {
                console.log("API Check Status: Found");
                check = response.data.address;
            })
            .catch(function (error) {
                console.log(error);
                console.log("\nAPI Check Status: Failed");
                check = "error";
            });

            return check !== "error";

}


/*
 * GET Status API from remote NGINX server
 */
export let fetchStatus = (url) => {

        //Fetch the entire NGINX Status
        axios
            .get(url)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

}

//setInterval(fetchStatus('http://demo.nginx.com/status'), 5000); # call back erro!


// setInterval ( () => {
//      fetchStatus('http://demo.nginx.com/status/timestamp')
//  }, 1000);