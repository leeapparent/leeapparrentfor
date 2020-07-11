<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告</h1>
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="新建广告">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="广告">
            <el-button type='text' @click="form.items.push({})"><i class="el-icon-plus"></i> 添加广告</el-button>
              <el-row type="flex" style="flex-wrap: wrap">
                <el-col :md="12" v-for="(item, i) in form.items" :key="i">
                  <el-form-item label="跳转链接">
                    <el-input v-model="item.url"  placeholder=""></el-input>
                    
                  </el-form-item>
                  <el-form-item label="图标" style="margin-top:3rem">
          <el-upload
   class="avatar-uploader"
  :action="$http.defaults.baseURL + '/upload'"
  :show-file-list="false"
  :on-success="res=> $set(item, 'images', res.url)">
  <img v-if="item.images" :src="item.images" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

        </el-form-item>
                  <el-form-item>
                    <el-button type="danger" @click="form.items.splice(i, 1)" size='small'>删除</el-button>
                  </el-form-item>
                </el-col>
                <el-col :md="12"></el-col>
              </el-row>
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
          items: []
        },
      }
    },
    methods: {
    async  onSubmit(){
      let res = res
      if (this.id) {
                  res = await this.$http.put(`rest/ad/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/ad',this.form)
      }
                this.$router.push('/ad/list')
                this.$message.success('保存成功')
      },
      async fetch() {
        const res = await this.$http.get(`rest/ad/${this.id}`)
       this.form = Object.assign({}, this.form, res.data)
      },
    },
    created() {
      this.id && this.fetch()
    }
}
</script>

<style>
</style>