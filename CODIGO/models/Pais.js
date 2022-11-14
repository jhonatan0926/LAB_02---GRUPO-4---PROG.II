const mongoose = require('mongoose')

const Pais = mongoose.model('Paises', {
    id: Number,
    nombre: String,
    capital: String,
    habitantes: String
})

module.exports = Pais