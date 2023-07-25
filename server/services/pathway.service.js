const { MESSAGE } = require('../config/constants')
const pathwayCrud = require('../crud/pathway.crud')

// Create an new pathway
const createPathway = async (req, res) => {
    try {
        console.log(JSON.stringify(req.body))
        const result = await pathwayCrud.post(req.body)
        console.log(`Pathway created succesfully, ${JSON.stringify(result)}`);

        return res.send({ message: MESSAGE.PATHWAY_CREATE.SUCCESS, body: null })
    } catch (err) {
        console.error(`Failed to create pathway, ${err}`)
        return res.status(500).send({ message: MESSAGE.PATHWAY_CREATE.FAILED, body: `${err}` })
    }
}

// Fetch pathway by query
const getByQuery = async (req, res) => {
    try {
        let result = await pathwayCrud.getByQuery(req.query ? req.query : {})
        if (!result.length)
            return res.status(404).send({ message: MESSAGE.PATHWAY_READ.FAILED, body: `${MESSAGE.INVALID_QUERY}: ${JSON.stringify(req.query)}` })

        console.log(`Pathway fetched successfully , ${JSON.stringify(result)}`)
        return res.send({ message: MESSAGE.PATHWAY_READ.SUCCESS, body: result })
    } catch (err) {
        console.error(`Failed to fetch pathway , ${err}`)
        return res.status(500).send({ message: MESSAGE.PATHWAY_READ.FAILED, body: `${err}` })
    }
}

// Update an pathway by id
const updatePathway = async (req, res) => {
    try {
        const _result = await pathwayCrud.getByQuery(req.query ? req.query : {})
        if (!_result.length)
            return res.status(404).send({ message: MESSAGE.PATHWAY_UDPATE.FAILED, body: `${MESSAGE.INVALID_USER}` })

        const result = await pathwayCrud.update(req.query ? req.query : {}, req.body)
        console.log(`Pathway updated succesfully, ${JSON.stringify(result)}`);

        return res.send({ message: MESSAGE.PATHWAY_UDPATE.SUCCESS, body: null })
    } catch (err) {
        console.error(`Pathway to update pathway, ${err}`)
        return res.status(500).send({ message: MESSAGE.PATHWAY_UDPATE.FAILED, body: `${err}` })
    }
}

const deleteByQuery = async (req, res) => {
    try {
        const _result = await pathwayCrud.getByQuery(req.query ? req.query : {})
        if (!_result.length)
            return res.status(404).send({ message: MESSAGE.PATHWAY_UDPATE.FAILED, body: `${MESSAGE.INVALID_USER}` })

        const result = await pathwayCrud.deleteByQuery(req.query ? req.query : {}, req.body)
        console.log(`Pathway deleted succesfully, ${JSON.stringify(result)}`);

        return res.send({ message: MESSAGE.PATHWAY_DELETE.SUCCESS, body: null })
    } catch (err) {
        console.error(`Failed to delete pathway, ${err}`)
        return res.status(500).send({ message: MESSAGE.PATHWAY_DELETE.FAILED, body: `${err}` })
    }
}

module.exports = {
    createPathway,
    getByQuery,
    updatePathway,
    deleteByQuery
}
