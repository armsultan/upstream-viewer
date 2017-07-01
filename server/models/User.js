/**
 * Mongoose Models and Schema Declaration File
 *
 * User
 */
'use strict';
import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true},
    endPoint: [{type: String}], /*A simple String with EndPoint IDs*/
    createdDate: {type: Date, default: Date.now}
});

export let UserSchema = userSchema;
export let User = mongoose.model('User', userSchema);
