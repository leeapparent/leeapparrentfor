<template>
  <div>
      <el-card header="请先登录" class="login-card">
        <el-form @submit.native.prevent="login">
            <el-form-item label="用户名">
                <el-input  placeholder="" v-model="form.username"></el-input>
                
            </el-form-item>
             <el-form-item label="密码">
                <el-input  v-model="form.password" type="password" placeholder=""></el-input>
                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">登录</el-button>
                
            </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            form:{}
        }
    },
    methods:{
       async login() {
           const res = await this.$http.post('login', this.form)
           console.log(res.data);
        //    sessionStorage.token = res.data.token 浏览器关闭就没了
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
                type:'success',
                message: '登录成功'
            })
        }
    }
}
</script>

<style>
.login-card{
    width: 30rem;
    margin: 10rem auto;
}
</style>