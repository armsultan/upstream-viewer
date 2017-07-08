/**
 * Mongoose Models and Schema Declaration File
 *
 * User
 */
'use strict';
import mongoose from 'mongoose';

let endPoint = mongoose.Schema({
    name: {type: String, required: true},                   /*Name of the Endpoint (NGINX Cluster)*/
    statusApiUrl: {type: String, required: true},           /*URL to the NGINX STATUS API*/
    description: {type: String, required: false},           /*Description of the Endpoint (NGINX Cluster)*/
    upStreamConfUrl: {type: String, required: false},     /*URL to the NGINX Upstream conf*/
    createdDate: {type: Date, default: Date.now}            /*Timestamp*/
});
 

let userSchema = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true},
    endPoint: [endPoint], /*A simple String with EndPoint IDs*/
    createdDate: {type: Date, default: Date.now}
});


export let UserSchema = userSchema;
export let User = mongoose.model('User', userSchema);

