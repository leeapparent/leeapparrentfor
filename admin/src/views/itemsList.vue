<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items" border stripe>
   <el-table-column label="物品名称" prop='name'></el-table-column>
   <el-table-column label="物品图标"></el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
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
      const res = await this.$http.get('rest/items')
      this.items = res.data
    },
   async handleClick(row) {
   this.$confirm(`此操作将永久删除 "${row.name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          this.$http.delete(`rest/items/${row._id}`).then((res) =>{
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