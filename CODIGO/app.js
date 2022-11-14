const express = require('express')
const mongoose = require('mongoose')
const Pais = require('./models/Pais')

const app = express()

const DB_USER = 'USUARIOTEST'
const DB_PASSWORD = encodeURIComponent('ZBti6MWtdbDRgC6')

app.use(express.json())

app.post('/pais', async (req, res) => {
    const { id, nombre, capital, habitantes } = req.body
    if(!nombre) {
      res.status(422).json({error: 'Nombre obligatorio'})
      return
    }
    const pais = {
      id,
      nombre,
      capital,
      habitantes,
    }
    try {
      await Pais.create(pais)
      res.status(201).json({message : 'Pais definido'})
    } catch (error) {
      res.status(500).json({error: error})
    }
  })

app.get('/paises', async (req, res) => {
    try {
      const paises = await Pais.find()
      res.status(200).json(paises)
    } catch (error) {
      res.status(500).json({error:error})
    }
})

app.get('/pais/:id', async (req, res) => {
    const id = req.params.id
    try {
      const pais = await Pais.findOne({id: id})
      if(!pais){
        res.status(422).json({message: 'Pais no encontrado'})
        return
      }
      res.status(200).json(pais)
    } catch (error) {
      res.status(500).json({error : error})
    }
})

app.patch('/pais/:id', async (req, res) => {
    const {id, nombre, capital, habitantes} = req.body
    const pais = {
      id,
      nombre,
      capital,
      habitantes,
    }
    try {
      const updatePais = await Pais.updateOne({id: id}, pais)
      if(updatePais.matchedCount===0){
        res.status(422).json({message: 'Pais no encontrado'})
        return
      }
      res.status(200).json(pais)
    } catch (error) {
      res.status(500).json({error : error})
    }
})

app.delete('/pais/:id', async (req, res) => {
    const id = req.params.id
    const pais = await Pais.findOne({id: id})
    if(!pais){
        res.status(422).json({message: 'Pais no encontrado'})
        return
    }
    try {
        await Pais.deleteOne({id: id})
        res.status(200).json({message: 'Pais removido'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@miapi.krbjwop.mongodb.net/segundoLABORATORIO?retryWrites=true&w=majority`
    ).then(() => {
      console.log('conectado al mongodb')
      app.listen(5000)
    })
    .catch((err) => {
      console.log(err)
    })
    
