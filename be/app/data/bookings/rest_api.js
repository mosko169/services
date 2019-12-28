const express = require('express');

const Middlewares = require('../../common/middlewares');

const Businesses = require('../businesses/businesses');
const Bookings = require('../bookings/bookings');

function getBookingsRouter(dbConn) {

    let router = express.Router();
    router.use(Middlewares.parseUserId);

    router.post('/bookings', async (req, res) => {
        let businessId = req.body.businessId;
        let serviceId = req.body.serviceId;
        let start = new Date(req.body.start);
        let end = new Date(req.body.end);
        let bookingId = await Bookings.book(dbConn, businessId, serviceId, req.userDetails, start, end);
        res.send(bookingId);    
    });

    router.delete('/bookings/:bookingId', async (req, res) => {
        let bookingId = await Bookings.removeBooking(dbConn, req.userDetails, req.params.bookingId);
        res.send(bookingId);    
    });

    router.get('/bookings/:bookingId', async (req, res) => {
        let booking = await Bookings.getBooking(dbConn, req.userDetails, req.params.bookingId);
        if (!booking) {
            res.status(404);
            res.send(`could not find booking ${req.params.bookingId}`);
        }

        res.send(booking);
    });

    router.put('/bookings/:bookingId', async (req, res) => {
        let newData = req.body;
        await Bookings.updateBooking(dbConn, req.userDetails, req.params.bookingId, newData.start, newData.end);
    });


    return router;
}

module.exports = getBookingsRouter;
