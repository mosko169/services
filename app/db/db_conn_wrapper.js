
class DBConnWrapper {
    constructor(dbConn) {
        this.dbConn = dbConn;
    }

    query(query, params = []) {
        return this.dbConn.query(query, params);
    }

    static preparePaginatedQuery(query, orderByField, skip, limit, queryParams = []) {
        let paginatedQuery = query;
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

    paginatedQuery(query, orderByField, skip, limit, queryParams = []) {
        let {paginatedQuery, parameters} = DBConnWrapper.preparePaginatedQuery(query, orderByField, skip, limit, queryParams);
        return this.query(paginatedQuery, parameters);
    }
}

module.exports = DBConnWrapper;
