const { MESSAGE } = require('../config/constants')
const pathwayAuditCrud = require('../crud/pathway.audit.crud')


// Fetch pathway by query
const getByQuery = async (req, res) => {
    try {
        let result = await pathwayAuditCrud.getByQuery(req.query ? req.query : {})
        if (!result.length)
            return res.status(404).send({ message: MESSAGE.PATHWAY_READ.FAILED, body: `${MESSAGE.INVALID_QUERY}: ${JSON.stringify(req.query)}` })

        console.log(`Pathway Audit fetched successfully , ${JSON.stringify(result)}`)
        return res.send({ message: MESSAGE.PATHWAY_READ.SUCCESS, body: result })
    } catch (err) {
        console.error(`Failed to fetch audit pathway , ${err}`)
        return res.status(500).send({ message: MESSAGE.PATHWAY_READ.FAILED, body: `${err}` })
    }
}


module.exports = {
    getByQuery
}
