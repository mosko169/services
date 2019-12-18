const express = require('express');

const Middlewares = require('../../common/middlewares');

const Businesses = require('../businesses/businesses');
const Categories = require('../categories/categories');

function getSearchRouter(dbConn) {

    let router = express.Router();

    router.get('/categories', async (req, res) => {
        let term = req.query.term;
        let categories = await Categories.getCategories(dbConn, term);
        res.send(categories);
    })

    router.get('/businesses', Middlewares.paginate, Middlewares.parseFilters, async (req, res) => {
        let term = req.query.term || req.body.term;
        let categories = await Businesses.getBusinesses(dbConn, term, req.filters, req.pagination, req.sorting);
        res.send(categories);
    })


    return router;
}

module.exports = getSearchRouter;
