const { populate } = require('../../models/categories')

module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/categories')
    router.put('/categories/:id', async(req, res)=>{
      const model = await Category.findByIdAndUpdate(req.params.id, req.body)
      res.send(model)
    })
    router.post('/categories', async(req, res)=>{
        const model = await Category.create(req.body)
        res.send(model)
      })
    router.get('/categories', async(req, res)=>{
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
      })
      router.get('/categories/:id', async(req, res)=>{
        const model = await Category.findById(req.params.id)
        res.send(model)
      })
      router.delete('/categories/:id', async(req, res)=>{
        await Category.findOneAndDelete(req.params.id)
        res.send(
         {   success: true}
        )
      })
    app.use('/admin/api', router)
}