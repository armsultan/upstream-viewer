/**
 * Mongoose Models and Schema Declaration File
 *
 * ChangeLog - not yet implemented
 */
'use strict';
import mongoose from 'mongoose';

let changeLogSchema = mongoose.Schema({
    entry: {type: String, required: true},          /*Log entry e.g. 'Drained node1, removed Node2'*/
    endPoint: {type: String},                       /*A simple String with EndPoint ID (where the change was made to)*/
    createdDate: {type: Date, default: Date.now}    /*Timestamp*/
});

export let ChangeLogSchema = changeLogSchema;
export let ChangeLog = mongoose.model('ChangeLog', changeLogSchema);
