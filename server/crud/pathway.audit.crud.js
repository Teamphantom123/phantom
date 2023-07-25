const PathwayAudit = require('../models/pathway.audit')

// Get pathway by query param
const getByQuery = async (query) => {
    try {
        console.log(query)
        const result = await PathwayAudit.find(query).sort({ _id: -1 })
        console.log(`Pathway audit fetched successfully , ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to fetch audit pathway , ${err}`)
        throw err
    }
}

module.exports = {
    getByQuery
}
