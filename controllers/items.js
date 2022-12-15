const Item = require('../models/Item')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllItems = async (req, res) => {
    const { page = 1, limit = 50 } = req.query;
    const items = await Item.find().sort("name").limit(limit * 1).skip((page - 1) * limit).exec();

    const itemsCollectionCount = await Item.count()
    const totalPages = Math.ceil(itemsCollectionCount / limit)

    res.status(StatusCodes.OK).json({ 
        items, 
        paging: {
            total: itemsCollectionCount,
            currentPage: page,
            totalPages: totalPages}
        })
}

const getItem = async (req, res) => {
    const item = await Item.findOne({ name: req.params.name })
    if (!item) {
        throw new NotFoundError("No item found with name '" + req.params.name + "'")
    }
    res.status(StatusCodes.OK).json({ item, count: item.length })
}

const createItem = async (req, res) => {
    const item = await Item.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ item })
}

const updateItem = async (req, res) => {
    if (req.params.name === '') {
        throw new BadRequestError("Item name can not be empty!")
    }
    const item = await Item.findOneAndUpdate({ name: req.params.name }, req.body, {
        new: true,
        upsert: true
    })
    if (!item) {
        throw new NotFoundError("No item found with name '" + req.params.name + "'")
    }
    res.status(StatusCodes.OK).json({ item })
}

const deleteItem = async (req, res) => {
    const item = await Item.deleteMany({ name: req.params.name })
    if (!item) {
        throw new NotFoundError("No item found with name '" + req.params.name + "'")
    }
    res.status(StatusCodes.OK).send("Successfully deleted all items with name '" + req.params.name + "'")
}

module.exports = {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}