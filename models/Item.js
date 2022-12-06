const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'item name must be provided'],
        unique: true
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
    itemImageURI: {
        type: String,
        required: [true, 'item image uri must be provided'],
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
      }
})

module.exports = mongoose.model('Item', ItemSchema)