<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items" border stripe>
   <el-table-column label="标题" prop='title'></el-table-column>
   <el-table-column label="ID" prop='_id'></el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    
      
  </div>
</template>

<script>
export default {
  data(){
    return{
      items:[]
    }
  },
  created() { 
    this.fetch()
  },
  methods:{
    async fetch () {
      const res = await this.$http.get('rest/article')
      this.items = res.data
    },
   async handleClick(row) {
   this.$confirm(`此操作将永久删除 "${row.title}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          this.$http.delete(`rest/article/${row._id}`).then((res) =>{
            console.log(res.status  );
            
          if (res.status === 200) {
            this.$message.success('删除成功')
          }
           this.fetch()
          })
       
        })
    }
  }
}
</script>

<style>

</style>