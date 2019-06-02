/*
Imports
*/
    require('dotenv').config();
    const express = require('express');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const port = process.env.PORT;
    const server = express();
    const { mainRouter } = require('./routes/main.router');
    const mongoDB = require('./services/db.connect');
    const passport = require('passport');
//

/*
Server configuration
*/
    class ServerClass {

        // Initialization fonction
        init(){

            //=> Body-parser
            server.use(bodyParser.json({limit: '10mb'}));
            server.use(bodyParser.urlencoded({ extended: true }));
            server.use(passport.initialize());
            //=> Cookie-parser
            server.use(cookieParser(process.env.COOKIE_SECRET));
            server.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "http://localhost:4200");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Credentials", "true");
                next();
            });
            //=> Router
            server.use('/', mainRouter);

            // Start server
            this.launch();
        };

        // After init. function
        launch(){
            // Connect MongoDB
            mongoDB.initClient()
            .then( mongooseResponse => {
                // Launch server
                server.listen(port, () => console.log({ database: mongooseResponse, server: `http://localhost:${port}` }))
            })
            .catch( mongooseError => console.log(mongooseError));
        };
    };
//



/*
Start server
*/
    new ServerClass().init();
//