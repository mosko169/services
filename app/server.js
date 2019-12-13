const express = require('express');
const log = require('./common/logger');

const DB = require('./db/db_conn');
const DBConnWrapper = require('./db/db_conn_wrapper');

const Categories = require('./data/categories');

async function main() {
    const app = express();
    let apiRouter = express.Router();

    let dbConn = new DBConnWrapper(await DB.getDBConn());

    app.use('/app', express.static('build/static'));
    app.use('/api', apiRouter);
    
    apiRouter.get('/search', async (req, res) => {
        let term = req.query.term;
        let skip = req.query.skip || 0;
        let limit = req.query.limit || 10;
        let results = await Categories.getCategories(dbConn, term, {skip: skip, limit: limit});
        res.send(results);
    });
    
    log.info("starting server");
    app.listen(8080);
}

main();
