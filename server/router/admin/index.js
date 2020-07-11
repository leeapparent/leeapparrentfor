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

        const items = await req.Model.find().populate('parent').limit(10)
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

    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'), async(req, res) =>{
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    })

    app.post('/admin/api/login', async(req,res)=>{
      // res.send('1')
      const {username, password} = req.body
      const AdminUser = require('../../models/adminUser')
      const user = await AdminUser.findOne({username}).select('+password')
      if(!user){
        return res.status(422).send({
          message:'用户不存在'
        })
      }
    const isvad =  require('bcrypt').compareSync(password,user.password)
    if(!isvad){
      return res.status(422).send({
        message:'密码不存在'
      })
    }
      const jwt = require('jsonwebtoken')
      const token =  jwt.sign({
        id: user._id
      }, app.get('serct'))
      res.send({token})
    })
}