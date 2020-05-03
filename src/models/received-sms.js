const {Schema, model} = require('mongoose');

const newSchema = new Schema({
    Body:{
        type: String
    },
    From:{
        type: String
    }, 
    Country:{
        type: String
    }
}, {    
    timestamps: true
})

module.exports = model('smsReceived', newSchema);