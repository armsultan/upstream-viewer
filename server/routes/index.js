/**
 * Routing file
 * This file holds all the possible routes our app can make. It also has a reference to services to help keep logic out of this layer.
 */
'use strict';
import * as userService from '../services/userService';
import * as statusApiService from '../services/statusApiService';
import AsyncPolling from 'async-polling';

export default(app, sse) => {

    // We can create an API by this.
    app.get('/', (req, res) => {
        res.render('index');
    });


  app.get('/api/user/:id/endpoint/:eid', (req, res) => {

    userService.readUser({
            email: req.params.id,
            'endPoint._id':req.params.eid
        }, (err, data) => {
            if (!err) {
                //console.log("Status API URL found: " + data[0].endPoint[0].statusApiUrl)
                res.setHeader('Content-Type', 'text/event-stream');
                /* MORE RELIABLE AsyncPolling with this.stop to prevent errors*/
                AsyncPolling(function (end) {
                    statusApiService.fetchUpstream(data[0].endPoint[0].statusApiUrl, (data,err) => {
                        console.log(`data: ${data}\n\n`);
                        if (!err) {
                            res.write(`data: ${data}\n\n`);
                            res.status(200)
                            res.end();

                        }
                        else{
                            console.log("error");
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

    app.get('/api/endpoint/', (req, res) => {

        res.setHeader('Content-Type', 'text/event-stream');

         /* MORE RELIABLE AsyncPolling with this.stop to prevent errors*/
        AsyncPolling(function (end) {
            statusApiService.fetchUpstream('https://demo.nginx.com/status/upstreams/trac-backend', (data,err) => {
                console.log(`data: ${data}\n\n`);
                if (!err) {
                    res.write(`data: ${data}\n\n`);
                    res.status(200)
                    res.end();

                  }
                else{
                    console.log("error");
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
    });


/*
* C R U D : All Functions work with one or many depending on the query (u) passed in
*/

    /* Create / edit User profiles */
    app.post('/api/user/', (req, res) => {
        userService.readUser(req.body, (err, data) => {
            if (!err) {
                console.log(data);
                res.status(201)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

    /* Get User profiles (find all when req = {})*/
    app.get('/api/user/', (req, res) => {
        userService.readUser({}, (err, data) => {
            if (!err) {
                console.log(data);
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

    /* Get User profiles by id (email) */
    app.get('/api/user/:id', (req, res) => {
        userService.readUser({
            email: req.params.id
        }, (err, data) => {
            if (!err) {
                console.log(data);
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

    /* Register a new User profiles */
    app.post('/api/user/register', (req, res) => {
        console.log(req.body);
        userService.createUser(req.body, (err, data) => {
            console.log(data);
            if (!err) {
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

    

    /* Update User profiles by id (email) */
    app.put('/api/user/:id', (req, res) => {
        userService.updateUser({
            email: req.params.id
        }, (err, data) => {
            if (!err) {
                console.log(data);
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

    /* Delete User profiles by id (email) */
    app.delete('/api/user/:id', (req, res) => {
        userService.removeUser({
            email: req.params.id
        }, (err, data) => {
            if (!err) {
                console.log(data);
                res.status(200)
                res.json(data);
            } else {
                res.status(400)
                res.json(err);
            }
        });
    });

    /* Add upstream - Check to see remote NGINX status API exists first then add*/
    app.put('/api/user/:id/endpoint/delete', (req, res) => {
        userService.deleteEndpoint(req.params.id,req.body._id, (err, data) => { //this doesnt work when data is set first i.e.(data,err)
            if (!err) {
                console.log("GOOD, response is: ",data);
                res.status(200)
                res.json(data);
            } else {
                console.log("BAD, response is: ",err);
                res.status(400)
                res.json(err);
            }
        });
    });

    /* Add upstream - Check to see remote NGINX status API exists first then add*/
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
                console.log("GOOD, response is: ",data);
                res.status(200)
                res.json(data);
            } else {
                console.log("BAD, response is: ",err);
                res.status(400)
                res.json(err);
            }
        });
    });

}