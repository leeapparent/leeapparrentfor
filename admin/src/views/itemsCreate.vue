<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
      <el-form :model="form" ref="form" label-width="80px">

        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="图标">
          <el-upload
   class="avatar-uploader"
  :action="$http.defaults.baseURL + '/upload'"
  :show-file-list="false"
  :on-success="afterUpload">
  <img v-if="form.icon" :src="form.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
      
  </div>
</template>

<script>
export default {
  props: {
    id:{}
  },
    data () {
      return {
        form: {},
      }
    },
    methods: {
      afterUpload(res) {
        // console.log(res);
        this.$set(this.form, 'icon', res.url)
        this.form.icon = res.url
      },
    async  onSubmit(){
      let res = res
      if (this.id) {
                  res = await this.$http.put(`rest/items/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/items',this.form)
      }
                this.$router.push('/items/list')
                this.$message.success('保存成功')
      },
      async fetch() {
        const res = await this.$http.get(`rest/items/${this.id}`)
        this.form = res.data
      },
       
    },
    created() {
      this.id && this.fetch()
    }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>