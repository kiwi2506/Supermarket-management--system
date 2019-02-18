<template>
  <div class="login">
    <!-- 登录表单 -->
    <div class="login-wrapper">
      <h1 class="title">
        <i class="el-icon-menu"></i>
        华联超市系统-登录
      </h1>

      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="text" v-model="loginForm.checkPwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
 //引入 qs
 import qs from "qs";

  export default {
    data() {
      // 包含特殊字符的函数
      const checkSpecificKey = str => {
        var specialKey =
          "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
        for (var i = 0; i < str.length; i++) {
          if (specialKey.indexOf(str.substr(i, 1)) != -1) {
            return false;
          }
        }
        return true;
      };
      //自定义 验证密码 和确认密码函数

      //验证密码的函数
      const pass = (rule, value, callback) => {
        //rule是传入的验证规则 value是用户输入的值 callback是回调函数
        if (value === "") {
          callback(new Error("密码长度3到6位"));
        } else if (value.length < 3 || value.length > 6) {
          callback(new Error("密码长度 3 - 6 位"));
        } else if (!checkSpecificKey(value)) {
          callback(new Error("密码不能包含特殊字符"));
        } else {
          if (this.loginForm.checkPwd !== "") {
            //如果确认密码不为空
            this.$refs.loginForm.validateField("checkPwd"); //调用确认密码验证
          }
          //成功的回调
          callback();
        }
      };
      //确认密码验证的函数

      const checkPass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.loginForm.password) {
          callback(new Error("两次输入的密码不一致"));
        }
        //成功的回调
        callback();
      };

      return {
        //登录表单的数据
        loginForm: {
          username: "",
          password: "",
          checkPwd: ""
        },
        //验证的规则
        rules: {
          //验证用户名
          username: [
            { required: true, message: "请输入账号", trigger: "blur" },
            { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
          ],
          //验证密码
          password: [
            { required: true, validator: pass, trigger: "blur" } //validator 和确认密码做自定义验证
          ],
          //验证确认密码
          checkPwd: [{ required: true, validator: checkPass, trigger: "blur" }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            
            //如果登陆成功 搜集账号和密码 发给后端 验证 用户名和密码的正确性
            let params = {
              username: this.loginForm.username,
              password: this.loginForm.password
            };

            //发送请求 把参数发给后端 验证是否正确（后面来补充） 

            this.axios.post('http://127.0.0.1:3000/login/checklogin',qs.stringify(params))
             .then(response =>{
               //接收后端返回来的 查询结果



               
             })
             .catch(err =>{ 
               console.log(err)
             })


            //登录成功直接跳转到后台首页

            // this.$router.push("/");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style lang="less">
.login {
  height: 100%;
  width: 100%;
  background: #2d3a4b;
  .login-wrapper {
    width: 600px;
    height: 400px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.2);
    //水平居中
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 50px 50px 10px 10px;
    .title {
      font-size: 24px;
      color: #ffffff;
      margin-left: 45px;
      margin-bottom: 25px;
    }
    .el-form {
      .el-form-item {
        .el-form-item__label {
          color: #ffffff;
        }
      }
    }
  }
}
</style>


