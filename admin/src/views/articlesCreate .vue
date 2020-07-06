<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
      <el-form :model="form" ref="form" label-width="80px">
          <el-form-item label="所属分类">
          <el-select v-model="form.categories" multiple>
            <el-option v-for="item in categories" :key="item._id" :label='item.name' :value='item._id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
          <el-form-item label="详情">
          <!-- <el-input v-model="form.body"></el-input> -->
           <vue-editor v-model="form.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
      
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";export default {
   components: {
    VueEditor
  },
  props: {
    id:{}
  },
    data () {
      return {
        form: {},
        categories: [],
      }
    },
    methods: {
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
 
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
    },
    async  onSubmit(){
      let res = res
      if (this.id) {
                  res = await this.$http.put(`rest/article/${this.id}`, this.form)
      } else {
        res = await this.$http.post('rest/article',this.form)
      }
                this.$router.push('/articles/list')
                this.$message.success('保存成功')
      },
      async fetch() {
        const res = await this.$http.get(`rest/article/${this.id}`)
        this.form = res.data
      },
        async fetchcategories() {
        const res = await this.$http.get(`rest/categories`, this.form)
        this.categories= res.data
        
      }
    },
    created() {
      this.id && this.fetch()
      this.fetchcategories()
    }
}
</script>

<style>

</style>