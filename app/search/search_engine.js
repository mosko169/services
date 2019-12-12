


class SearchEngine {
    
    static searchService(dbConn, searchTerm, filters, pagination) {
        
    }

    static async searchCategory(dbConn, searchTerm, pagination) {
        let totalC
        let records = await dbConn.query("SELECT * from categories")
    }

}