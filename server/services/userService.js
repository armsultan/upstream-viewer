/**
 * Services
 * Services are used to abstract out the logic needed to enact on data, before sending it off to the database.
 *
 * User
 */
import {User} from '../models/User';
import {EndPoint} from '../models/EndPoint';
import * as statusApiService from '../services/userService';

import axios from 'axios';

/*
* C R U D : All Functions work with one or many depending on the query (u) passed in
*/

/* READ (Get) User profile */
export let createUser = (u, next) => {
  User.create(u, next);
};

/* READ (Get) User profile */
export let readUser = (u, next) => {
  User.find(u, next);
};

/* Update User profile  */
export let updateUser = (u, next) => {
  User.update(u, next);
};

/* DELETE User profile */
export let removeUser = (u, next) => {
  User.remove(u, next);
};

/* Remove EndPoint from User profile */
export let removeEndPointFromUser = (u, url, next) => {

     User.findByIdAndUpdate(u,{
                    $pullAll: {
                        endPoint: url
                    }}, next);
};

/* Add EndPoint to User profile IF EXISTS */
export let addEndPointToUser = (u, url, next) => {

if(checkStatusApi(url)){
    console.log("Adding endPoint: endPoint exists! Added to User Profile");
    User.findByIdAndUpdate(u,{
                    $set: {
                        endPoint: url
                    }}, next);

}

else {
console.log("Adding endPoint: endPoint does not exists! Failed");
throw "Err";
}

};