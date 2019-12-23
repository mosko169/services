const PG = require('pg');
const Promise = require('bluebird');
const Pool = PG.Pool;

const INIT_QUERIES = require('./init_queries');


class DbConn {

    static async _createTablesIfNotExist(dbConn) {
        await Promise.map(INIT_QUERIES, initQuery => dbConn.query(initQuery));
    }

    static async getDBConn() {
        const pool = new Pool({
            user: 'postgres',
            host: 'services.cdqtlfsn44ek.eu-central-1.rds.amazonaws.com',
            database: 'services',
            password: '1q2w3e4r',
        });
        
        await DbConn._createTablesIfNotExist(pool);
        return pool;
    }
}

module.exports = DbConn;
