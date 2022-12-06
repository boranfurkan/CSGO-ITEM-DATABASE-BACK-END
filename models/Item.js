const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'item name must be provided'],
    },
    suggestedPrice: {
        type: "object",
        required: [true, 'item must have suggested price'],
        properties: {
            "hellcase": {
                type: Number
            },
            "shadowpay": {
                type: Number
            }
        }
    },
    itemCheapest: {
        type: "object",
        required: [false],
        properties: {
            "shadowpay": {
                type: Number
            },
            "csgoMarket": {
                type: Number
            },
            "csgoEmpire": {
                type: Number
            }
        }
    },
    itemCount: {
        type: "object",
        required: [false],
        properties: {
            "shadowpay": {
                type: Number
            },
            "csgoMarket": {
                type: Number
            },
            "csgoEmpire": {
                type: Number
            }
        }
    },
    buff: {
        type: "object",
        required: [false],
        properties: {
            "listing": {
                type: Number
            },
            "buyOrder": {
                type: Number
            }
        }
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
      },
})

module.exports = mongoose.model('Item', itemSchema)