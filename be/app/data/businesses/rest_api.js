const express = require('express');

const BusinessDal = require('./business_dal');

function getBusinessesRouter() {

    let router = express.Router();

    router.post('/', async (req, res) => {
        let businessId = await BusinessDal.insert(req.body);
        res.send({"id": businessId});
    });

    router.get('/:businessId', async (req, res) => {
        let business = await BusinessDal.getById(req.params.businessId);
        res.send(business);
    });

    router.delete('/:businessId', async (req, res) => {
        await BusinessDal.deleteById(req.params.businessId);
        res.send({});
    });

    router.put('/:businessId', async (req, res) => {
        let business = await BusinessDal.updateById(req.params.businessId, req.body);
        res.send(business);
    });

    return router;
}

module.exports = getBusinessesRouter;
