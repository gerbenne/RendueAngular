/*
Imports
*/
    const { Router } = require('express');
    const AuthRouterClass = require('./auth/auth.routes');
    const ScoreRouterClass = require('./score/score.routes');
//

/* 
Passport Strategy
Passport est un module NPM qui permet de sécuriser les connexions utilisateur grâce à des stratégies spécifiques. Nous utilisons ici la startégie JWT (cf. setAuthentication)
*/
    const passport = require('passport');
    const { setAuthentication } = require('../services/authentication');
    setAuthentication(passport);
//

/*
Define routers
*/
    // Parent
    const mainRouter = Router();
    const apiRouter = Router();

    // Child
    const authRouter = new AuthRouterClass();
    const scoreRouter = new ScoreRouterClass( { passport } );
//

/*
Configure routes
*/
    mainRouter.use('/api', apiRouter);
    apiRouter.use('/auth', authRouter.init());
    apiRouter.use('/score', scoreRouter.init());
//

/*
Export
*/
    module.exports = { mainRouter };
//