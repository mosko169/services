

const knex = require('knex')
const dbConn = require('./db/db_conn')

async function main() {
    let db = await dbConn.getDBConn();

    let queryBuilder = new knex({client:'pg'});
    let query = queryBuilder.delete().from("bookings").where({booking_id: 1, user_id: 'a@a.com'});
    
            let nativeQuery = query.toSQL().toNative();
    let res = await db.query(nativeQuery.sql, nativeQuery.bindings);
    console.log(res);

}



main();