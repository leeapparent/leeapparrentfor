<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
      <el-form :model="form" ref="form" label-width="80px">

        <el-form-item label="英雄名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="英雄称号">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
           <el-form-item label="英雄分类">
             <el-select v-model="form.categories" placeholder="选择分类" multiple>
               <el-option v-for="item of categories"
                 :key="item._id"
                 :label="item.name"
                 :value="item._id">
               </el-option>
             </el-select>
             
        </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="form.scores.different" :max='9' show-score  style="margin-top:0.6rem"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="form.scores.skills" :max='9' show-score  style="margin-top:0.6rem"></el-rate>

          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="form.scores.attack" :max='9' show-score  style="margin-top:0.6rem"></el-rate>

          </el-form-item>
          <el-form-item label='生存'>
            <el-rate v-model="form.scores.survive" :max='9' show-score  style="margin-top:0.6rem"></el-rate>

          </el-form-item>
          <el-form-item label="图标">
          <el-upload
   class="avatar-uploader"
  :action="$http.defaults.baseURL + '/upload'"
  :show-file-list="false"
  :on-success="afterUpload">
  <img v-if="form.avatar" :src="form.avatar" class="avatar">
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
        form: {
          scores: {
            different: 0,
          }
        },
        categories: []
      }
    },
    methods: {
      afterUpload(res) {
        // console.log(res);
        this.$set(this.form, 'avatar', res.url)
        this.form.icon = res.url
      },
    async onSubmit(){
      let res = res
      if (this.id) {
                  res = await this.$http.put(`rest/hero/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/hero',this.form)
      }
                this.$router.push('/heros/list')
                this.$message.success('保存成功')
      },
      async fetch() {
        const res = await this.$http.get(`rest/hero/${this.id}`)
        this.form = Object.assign({}, this.form, res.data)
      },
      async fetchCategories() {
        const res = await this.$http.get(`rest/categories`)
        this.categories = res.data
      },
    },
    created() {
      this.id && this.fetch()
      this.fetchCategories()
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