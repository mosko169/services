

const knex = require('knex')
const dbConn = require('./db/db_conn')

async function main() {
    let db = await dbConn.getDBConn();

    let queryBuilder = new knex({client:'pg'});
    let query = queryBuilder.insert({user_id: 'a@a.com', start: new Date()}).into("bookings");
    
            let nativeQuery = query.toSQL().toNative();

    let upsert = `INSERT INTO ${BOOKINGS_TABLE_NAME} VALUES($1, $2, $3, $4, $5)
                  ON CONFLICT ON CONSTRAINT bookings_pkey DO
                  UPDATE SET user_id=$1 WHERE BOOKING
    let res = await db.query(nativeQuery.sql, nativeQuery.bindings);
    console.log(res);

}



main();