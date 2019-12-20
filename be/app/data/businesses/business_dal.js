class BusinessesDal {

    static async insert(business) {
        return 6;
    }

    static async getById(businessId) {
        return {
            "business_id": businessId,
            "name": "hive"
        };
    }

    static async deleteById(businessId) {
    }

    static async updateById(businessId, business) {
        let b = business;
        b["business_id"] = businessId;

        return b;
    }
}

module.exports = BusinessesDal;
