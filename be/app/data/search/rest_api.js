const express = require('express');

const Middlewares = require('../../common/middlewares');

const Businesses = require('../businesses/businesses');
const Categories = require('../categories/categories');

function parseFilters(req) {
// TODO - middleware
    return [];
}

function getSearchRouter(dbConn) {

    let router = express.Router();

    router.get('/categories', async (req, res) => {
        let term = req.query.term;
        let categories = await Categories.getCategories(dbConn, term);
        res.send(categories);
    })

    router.get('/businesses', Middlewares.paginate, async (req, res) => {
        let term = req.query.term;
        let category = req.query.category;
        let filters = parseFilters(req);
        let categories = await Businesses.getBusinesses(dbConn, term, category, filters, req.pagination, req.sorting);
        res.send(categories);
    })


    return router;
}

module.exports = getSearchRouter;
