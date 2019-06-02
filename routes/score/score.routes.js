/*
Imports
*/
    // Node
    const express = require('express');
    const scoreRouter = express.Router();

    // Inner
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
    const { checkFields } = require('../../services/request.checker');
    const { createItem, readItem } = require('./score.controller');
//

/*
Routes definition
*/
    class ScoreRouterClass {
        
        /* 
        Injection de Passport dans la class du Router
        Passeport sera utiliser en middleware afin d'authentifier l'utilisateur avant se requête
        */
            constructor({ passport }) {
                this.passport = passport
            }
        //

        routes(){

            // Read : afficher la liste des messages du chat
            scoreRouter.get( '/', (req, res) => {
                readItem()
                .then( apiResponse => sendApiSuccessResponse(res, 'Score received', apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, 'Error during fetch', apiResponse))
            });

            // Create : ajout de Passport en middleware
            scoreRouter.post( '/', this.passport.authenticate('jwt', { session: false }), (req, res) => {
                // Error: no body present
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') }
                // Check fields in the body
                const { miss, extra, ok } = checkFields(['NumeroTap'], req.body);
                //=> Error: bad fields provided
                if (!ok) { sendFieldsError(res, 'Bad fields provided', miss, extra) }
                //=> Request is valid: use controller
                else{
                    createItem(req.body, req.user._id)
                    .then( apiResponse => sendApiSuccessResponse(res, 'Score is created', apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, 'Error during chat message creation', apiResponse))
                }
            })

        }

        init(){
            this.routes();
            return scoreRouter;
        }
    }
//

/*
Export
*/
    module.exports = ScoreRouterClass;
//