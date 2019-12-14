

const knex = require('knex')
const dbConn = require('./db/db_conn')

async function main() {
    let db = await dbConn.getDBConn();

    let QueryBuilder = knex({client:'pg'});
    let term = "k%"
    let query = QueryBuilder.select().from('businesses').where(builder => 
        builder.where('businesses.name', 'like', term).orWhere('description', 'like', term
    ));

    let category = "barbers";
    if (category) {
        query
            .join("businesses_categories", "businesses.business_id", "=", "businesses_categories.business_id")
            .join("categories", "businesses_categories.category_id", "=", "categories.category_id")
            .where("categories.name", "=", category);
    }
    query.select("a");
    query.select("b");

    let nativeQuery = query.toSQL().toNative();
    let res = await db.query(nativeQuery.sql, nativeQuery.bindings);
    console.log(res);

}



main();