const getAllItems = async (req, res) => {
    res.send("All items")
}

const getItem = async (req, res) => {
    res.send("Get item")
}

const createItem = async (req, res) => {
    res.json(req.user)
}

const updateItem = async (req, res) => {
    res.send("Update items")
}

const deleteItem = async (req, res) => {
    res.send("Delete items")
}

module.exports = {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}