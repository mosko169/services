const express = require('express');
const log = require('./common/logger');

const DB = require('./db/db_conn');



async function main() {
    const app = express();
    let apiRouter = express.Router();

    let dbConn = await DB.getDBConn();

    
    app.use('/app', express.static('build/static'));
    app.use('/api', apiRouter);
    
    apiRouter.get('/', (req, res) => {
        res.send("hello");
    });
    
    log.info("starting server");
    app.listen(8080);
}

main();