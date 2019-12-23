const PG = require('pg');
const Pool = PG.Pool;

const INIT_QUERIES = require('./init_queries');


class DbConn {

    static async _createTablesIfNotExist(dbConn) {
        await dbConn.query(INIT_QUERIES.CREATE_BUSINESS_TABLE);
        await dbConn.query(INIT_QUERIES.CREATE_CATEGORIES_TABLE);
        await dbConn.query(INIT_QUERIES.CREATE_BUSINESSES_CATEGORIES_TABLE);
        await dbConn.query(INIT_QUERIES.CREATE_BUSINESSES_OPENING_HOURS_TABLE);
        await dbConn.query(INIT_QUERIES.CREATE_SERVICES_TABLE);
        await dbConn.query(INIT_QUERIES.CREATE_WORKERS_TABLE);
        await dbConn.query(INIT_QUERIES.CREATE_WORKERS_SERVICES_TABLE);
        await dbConn.query(INIT_QUERIES.CREATE_WORKERS_WORKING_HOURS);
    }

    static async getDBConn() {
        const pool = new Pool({
            user: 'postgres',
            host: '10.100.102.7',
            database: 'services',
            password: '123456',
        });
        
        await DbConn._createTablesIfNotExist(pool);
        return pool;
    }
}

module.exports = DbConn;
