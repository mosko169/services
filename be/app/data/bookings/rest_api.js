const express = require('express');

const Middlewares = require('../../common/middlewares');

const Businesses = require('../businesses/businesses');

function getBookingsRouter(dbConn) {

    let router = express.Router();

    router.post('/bookings', async (req, res) => {
        
    });

    router.get('/bookings/:bookId', async (req, res) => {
    });

    router.put('/bookings/:bookId', async (req, res) => {

    });


    return router;
}

module.exports = getSearchRouter;
