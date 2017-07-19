/**
 * Routing file
 * This file holds all the possible routes our app can make. It also has a reference to services to help keep logic out of this layer.
 */
'use strict';
import * as userService from '../services/userService';
import * as statusApiService from '../services/statusApiService';
import AsyncPolling from 'async-polling';

export default(app, sse) => {

// Root page '/' , render index.hbs 
app.get('/', (req, res) => {
        res.render('index');
    });


// iInitiates Server Sent Events
  app.get('/api/user/:id/upstreamview/:eid', (req, res) => {
    userService.readUser({
            email: req.params.id,
            'endPoint._id':req.params.eid
        }, (err, data) => {
            if (!err) {

                // Find the correct upstream data from the user's enpoint array
                let upstream = data[0].endPoint.find((e) => {
                    return e._id.toString() === req.params.eid;
                });

                //console.log("Upstream URL found :" + upstream.statusApiUrl); // uncomment to test

                res.setHeader('Content-Type', 'text/event-stream');
                AsyncPolling(function (end) {
                    statusApiService.fetchUpstream(upstream.statusApiUrl, (data,err) => {
                        if (!err) {
                            res.write(`data: ${data}\n\n`);
                            res.status(200)
                            res.end();

                        }
                        else{
                            console.log("error", err);
                            res.write(`data: ${err}\n\n`);
                            res.status(200)
                            res.end();
                        }
                    });
                    // Then notify the polling when your job is done:
                    this.stop();
                    end();
                    // This will schedule the next call here
                }, 3000).run();
            } else {
                res.status(400)
                res.json(err);
            }
        });

  });





/*
* C R U D - USER
*/

    /* CREATE User profiles */
    app.post('/api/user/', (req, res) => {
        userService.readUser(req.body, (err, data) => {
            if (!err) {
                console.log("OK: ", data);
                res.status(201)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });


    /* Create, Register a new User profiles */
    app.post('/api/user/register', (req, res) => {
        userService.createUser(req.body, (err, data) => {
                console.log("OK: ", data);
            if (!err) {
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err.errmsg);
            }
        });
    });

    /* READ, Get User profiles (FIND ALL when req = {})*/
    app.get('/api/user/', (req, res) => {
        userService.readUser({}, (err, data) => {
            if (!err) {
                console.log("OK: ", data);
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

    /* READ, Get User profiles by id (email) */
    app.get('/api/user/:id', (req, res) => {
        userService.readUser({
            email: req.params.id
        }, (err, data) => {
            if (!err) {
                console.log("OK: ", data);
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });



    /* UPDATE User profiles by id (email) */
    app.put('/api/user/:id', (req, res) => {
        userService.updateUser({
            email: req.params.id
        }, (err, data) => {
            if (!err) {
                console.log("OK: ", data);
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

    /* DELETE User profiles by id (email) */
    app.delete('/api/user/:id', (req, res) => {
        userService.removeUser({
            email: req.params.id
        }, (err, data) => {
            if (!err) {
                console.log("OK: ", data);
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

// Endpoint (Upstream)

    /* DELETE, Add upstream - Check to see remote NGINX status API exists first then add*/
    app.put('/api/user/:id/endpoint/delete', (req, res) => {
        userService.deleteEndpoint(req.params.id,req.body._id, (err, data) => { //this doesnt work when data is set first i.e.(data,err)
            if (!err) {
                console.log("OK: ", data);
                res.status(200)
                res.json(data);
            } else {
                console.log("error: ", err);
                res.status(400)
                res.json(err);
            }
        });
    });

    /* CREATE, Add upstream - Check to see remote NGINX status API exists first then add*/
    app.post('/api/user/:id/endpoint/add', (req, res) => {
        statusApiService.checkStatusApi(
            {
                    email: req.params.id,
                    name: req.body.name,
                    statusApiUrl: req.body.statusApiUrl,
                    description: req.body.description,
                    upStreamConfUrl: ""
                }, (data, err) => {
            if (!err) {
                console.log("OK: ", data);
                res.status(200)
                res.json(data);
            } else {
                console.log("error ", err);
                res.status(400)
                res.json(err);
            }
        });
    });

}