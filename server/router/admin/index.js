const { populate } = require('../../models/categories')
const jwt = require('jsonwebtoken')
// http异常处理包
const assert = require('http-assert')

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
    router.get('/',async(req, res)=>{
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
     
      const {username, password} = req.body
      const AdminUser = require('../../models/AdminUsers')
      const user = await AdminUser.findOne({username}).select('+password')
      assert(user, 422, '用户不存在')
      // if(!user){
      //   return res.status(422).send({
      //     message:'用户不存在'
      //   })
      // }
    const isvad =  require('bcrypt').compareSync(password,user.password)
    assert(isvad, 422, '用户不存在')
    // if(!isvad){
    //   return res.status(422).send({
    //     message:'密码不存在'
    //   })
    // }
      const token =  jwt.sign({
        id: user._id
      }, app.get('serct'))
      res.send({token})
    })
    // 错误处理
    app.use(async(err,req,res,next)=>{
      res.status(err.statusCode).send({
        message: err.message
      })
    })
}