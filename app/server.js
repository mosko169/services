const express = require('express');
const log = require('./common/logger');


const app = express();
let apiRouter = express.Router();

app.use('/app', express.static('build/static'));
app.use('/api', apiRouter);

apiRouter.get('/', (req, res) => {
    res.send("hello");
});

log.info("starting server");
app.listen(8080);