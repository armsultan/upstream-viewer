/**
 * Mongoose Models and Schema Declaration File
 *
 * Endpoint (NGINX Cluster exposing the Status API) 
 */
'use strict';
import mongoose from 'mongoose';

let endPointSchema = mongoose.Schema({
    name: {type: String, required: true},                   /*Name of the Endpoint (NGINX Cluster)*/
    statusApiUrl: {type: String, required: true},           /*URL to the NGINX STATUS API*/
    description: {type: String, required: false},           /*Description of the Endpoint (NGINX Cluster)*/
    upStreamConfUrl: [{type: String, required: false}],     /*URL to the NGINX Upstream conf*/
    createdDate: {type: Date, default: Date.now}            /*Timestamp*/
});

export let EndPointSchema = endPointSchema;
export let EndPoint = mongoose.model('EndPoint', endPointSchema);