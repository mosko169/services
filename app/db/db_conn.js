const PG = require('pg');
const Pool = PG.Pool;


class DbConn {

    static async _createTablesIfNotExist(dbConn) {
        // TODO - create app tables
    }

    static async getDBConn() {
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'test',
            password: '123456',
        });
        
        await DbConn._createTablesIfNotExist(pool);
        return pool;
    }
}

module.exports = DbConn;
