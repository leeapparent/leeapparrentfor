<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
      <el-form :model="form" ref="form" label-width="80px">
        <el-tabs type="border-card">
      <el-tab-pane label="基础信息" value='skils' >    
        <el-form-item label="英雄名称">
          <el-input v-model="form.name"></el-input>
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
           <el-form-item label="顺风出装">
             <el-select v-model="form.items1" placeholder="选择物品" multiple>
               <el-option v-for="item of items"
                 :key="item._id"
                 :label="item.name"
                 :value="item._id">
               </el-option>
             </el-select>
             
        </el-form-item>
          <el-form-item label="逆风出装">
             <el-select v-model="form.items2" placeholder="选择物品" multiple>
               <el-option v-for="item of items"
                 :key="item._id"
                 :label="item.name"
                 :value="item._id">
               </el-option>
             </el-select>
             
        </el-form-item>
        <el-form-item label="使用技巧">
          <el-input type="textarea" v-model="form.useTips" placeholder=""></el-input>
          
        </el-form-item>
           <el-form-item label="对抗技巧">
          <el-input type="textarea" v-model="form.battleTips" placeholder=""></el-input>
          
        </el-form-item>
           <el-form-item label="团战技巧">
          <el-input type="textarea" v-model="form.teamTips" placeholder=""></el-input>
          
        </el-form-item>
       
    
            </el-tab-pane>
            <el-tab-pane label="技能" name="skils">
              <el-button type='text' @click="form.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
              <el-row type="flex" style="flex-wrap: wrap">
                <el-col :md="12" v-for="(item, i) in form.skills" :key="i">
                  <el-form-item label="名称">
                    <el-input v-model="item.name"  placeholder=""></el-input>
                    
                  </el-form-item>
                  <el-form-item label="图标">
          <el-upload
   class="avatar-uploader"
  :action="$http.defaults.baseURL + '/upload'"
  :show-file-list="false"
  :on-success="res=> $set(item, 'icon', res.url)">
  <img v-if="item.icon" :src="item.icon" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

        </el-form-item>
                   <el-form-item label="描述">
                    <el-input  type="textarea" v-model="item.descriptio"  placeholder=""></el-input>
                    
                  </el-form-item>
                     <el-form-item label="小提示">
                    <el-input  type="textarea" v-model="item.tips"  placeholder=""></el-input>
                    
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" @click="form.skills.splice(i, 1)" size='small'>删除</el-button>
                    
                  </el-form-item>
                </el-col>
                <el-col :md="12"></el-col>
              </el-row>
              
            </el-tab-pane>
            
        </el-tabs>
              <el-form-item style="margin-top: 2rem">
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
          },
          skills: []
        },
        categories: [],
        items: []
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
      async fetchItems() {
        const res = await this.$http.get(`rest/items`)
        this.items = res.data
      },
    },
    created() {
      this.id && this.fetch()
      this.fetchCategories()
      this.fetchItems()
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>