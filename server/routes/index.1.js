/**
 * Routing file
 * This file holds all the possible routes our app can make. It also has a reference to services to help keep logic out of this layer.
 */
'use strict';
import * as userService from '../services/userService';


export default (app) => {


    // We can create an API by this.
    app.get('/', (req, res) => {
        res.render('index');
    });
    
 /*
* C R U D : All Functions work with one or many depending on the query (u) passed in
*/

/* Create All User profiles */
app.post('/api/user/', (req, res) => {
        readUser({}, (err, data) => {
            if(!err){
                console.log(data);
                res.status(201)
                res.json(data);
            }
            else {
                res.status(400)
                res.json(err);
            }
        });
    });


/* Get All User profiles */
app.get('/api/user/', (req, res) => {
        readUser({}, (err, data) => {
            if(!err){
                console.log(data);
                res.status(200)
                res.json(data);
            }
            else {
                res.status(400)
                res.json(err);
            }
        });
    });

/* Get User profiles by id (email) */
app.get('/api/user/:id', (req, res) => {
        readUser({email: req.params.id}, (err, data) => {
            if(!err){
                console.log(data);
                res.status(200)
                res.json(data);
            }
            else {
                res.status(400)
                res.json(err);
            }
        });
    });


/* Update User profiles by id (email) */
app.put('/api/user/:id', (req, res) => {
        updateUser({email: req.params.id}, (err, data) => {
            if(!err){
                console.log(data);
                res.status(200)
                res.json(data);
            }
            else {
                res.status(400)
                res.json(err);
            }
        });
    });

/* Remove User profiles by id (email) */
app.delete('/api/user/:id', (req, res) => {
        removeUser({email: req.params.id}, (err, data) => {
            if(!err){
                console.log(data);
                res.status(200)
                res.json(data);
            }
            else {
                res.status(400)
                res.json(err);
            }
        });
    });

    app.post('/task', (req, res) => {
        createTask(req.body, (err, data) => {
            if(!err){
                console.log(data);
                res.json(data);
            }
            else {
                res.json(err);
            }
        });
    });


    app.post('/task', (req, res) => {
        createTask(req.body, (err, data) => {
            if(!err){
                console.log(data);
                res.json(data);
            }
            else {
                res.json(err);
            }
        });
    });
    

    app.post('/user', (req, res) => {
        console.log(req.body);
        createUser(req.body, (err, data) => {
            if(!err){
                console.log(data);
            }

            res.json(data);
        });
    });

    app.get('/users', (req, res) => {
        UserService.getAllUsers((err, users) => {
            if(users){
                // console.log('USERS! : ', users); // debugging purposes
                res.json({users});
            }
            else {
                res.statusCode(400);
                res.send('Error!');
            }
        });
    });

    app.put('/users/:id/task', (req, res) => {
        console.log('Is our ID there?', req.params.id);
        console.log('Is our correct task there?', req.body);
        UserService.push(req.params.id, req.body, (err, modifiedObject) => {
            if(!err){
                res.json(modifiedObject);
            }
            else {
                res.json({error: 'There was an error!', data: null});
            }
        });
    });

    app.put('/users/:id/todoList', (req, res) => {
        console.log('Is our ID there?', req.params.id);
        console.log('Is our correct todoList there?', req.body);
        UserService.updateTodoList(req.params.id, req.body, (err, modifiedObject) => {
            if(!err){
                res.json(modifiedObject);
            }
            else {
                res.json({error: 'There was an error!', data: null});
            }
        });
    });

    app.get('/users/:id/test', (req, res) => {
        console.log('Is our ID there?', req.params.id);
        UserService.getAllUserFriends(req.params.id, (err, data) => {
            res.json({error: err, data: data});
        });
    });

    

}