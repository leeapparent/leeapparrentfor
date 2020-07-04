<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
      <el-form :model="form" ref="form" label-width="80px">

        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="图标">
          <el-input v-model="form.icon"></el-input>
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

</style>