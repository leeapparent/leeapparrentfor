const { populate } = require('../../models/categories')

module.exports = app =>{
    const express = require('express')
    const router = express.Router(
      {
        mergeParams: true
      }
    )
    router.put('/:id', async(req, res)=>{
      const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
      res.send(model)
    })
    router.post('/', async(req, res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
      })
    router.get('/', async(req, res)=>{
        let queueyOpios = {}
        if (req.Model === 'Category') {
          queueyOpios.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queueyOpios).limit(10)
        res.send(items)
      })
      router.get('/:id', async(req, res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
      })
      router.delete('/:id', async(req, res)=>{
        await req.Model.findOneAndDelete(req.params.id)
        res.send(
         {   success: true}
        )
      })
    app.use('/admin/api/rest/:resource',async(req, res, next)=> {
      req.Model = require(`../../models/${req.params.resource}`)
      next()
    }, router)
}