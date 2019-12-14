const knex = require('knex');
const Query
class DBConnWrapper {
    constructor(dbConn) {
        this.dbConn = dbConn;
        this.queryBuilder = new knex({client: 'pg'});
    }

    query(query, params = []) {
        return this.dbConn.query(query, params);
    }

    getQueryBuilder() {
        return this.queryBuilder;
    }

    static preparePaginatedQuery(query, orderByField, skip, limit, queryParams = []) {
        let paginatedParams = Array.from(queryParams);
        paginatedParams.push(orderByField);
        let orderByFieldParamIndex = paginatedParams.length;
    
        paginatedParams.push(skip);
        let skipParamIndex = paginatedParams.length;
    
        paginatedParams.push(limit);
        let limitParamIndex = paginatedParams.length;
    
        return {
            paginatedQuery: query + ` ORDER BY $${orderByFieldParamIndex} OFFSET $${skipParamIndex} LIMIT $${limitParamIndex}`,
            parameters: paginatedParams
        };
    }

    executeRawQuery(query, bindings = []) {
        return this.query(query, bindings);
    }

    executePreparedQuery(query, pagination = {}, sorting = {}) {
        let rawQuery = query.toSQL().toNative();
        return this.executeRawQuery(rawQuery.sql, rawQuery.bindings);
    }
}

module.exports = DBConnWrapper;
