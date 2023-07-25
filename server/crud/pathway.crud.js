const Pathway = require('../models/pathway')
const PathwayAudit = require('../models/pathway.audit')


// Create an new pathway
const post = async (pathways) => {
    try {
        const result = await Pathway.insertMany(pathways)
        console.log(`Pathways created succesfully, ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to create pathways, ${err}`)
        throw err
    }
}

// Update an pathway by id
const update = async (query, pathway) => {
    try {
        delete pathway._id
        const __result = await Pathway.find(query).sort({ _id: -1 }) // Fetch current data
        console.log(`GET Pathway succesfully, ${JSON.stringify(__result)}`)

        let tempResult = JSON.parse(JSON.stringify(__result));
        const pId = tempResult[0]._id

        delete tempResult[0]._id;
        console.log(JSON.stringify(tempResult))

        const _result = await PathwayAudit.updateMany({ "__pId": pId }, tempResult[0], { upsert: true }) // Update current data to audit table
        console.log(`Pathway Audit updated succesfully, ${JSON.stringify(_result)}`)

        pathway['dataUpdated'] = true;
        const result = await Pathway.updateMany(query, pathway)
        console.log(`Pathway updated succesfully, ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to update pathway, ${err}`)
        throw err
    }
}

// Get pathway by query param
const getByQuery = async (query) => {
    try {
        const result = await Pathway.find(query).sort({ _id: -1 })
        console.log(`Pathway fetched successfully , ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to fetch pathway , ${err}`)
        throw err
    }
}

// Get pathway by query param
const deleteByQuery = async (query) => {
    try {
        const result = await Pathway.remove(query)
        console.log(`Pathway fetched successfully , ${JSON.stringify(result)}`)
        return result
    } catch (err) {
        console.error(`Failed to delete pathway , ${err}`)
        throw err
    }
}

module.exports = {
    post,
    getByQuery,
    update,
    deleteByQuery
}
