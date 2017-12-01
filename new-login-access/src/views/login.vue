<style scoped>
  #app{display: table;width:100%;}
  .main-title{text-align: center;}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{width: 400px;margin:13% auto 0;border: 1px solid #eaeaea;padding: 35px 48px 15px 6px;box-shadow: 0 0 25px #cac6c6}
  .login-page{background:#fff;}
</style>
<template>
  <div>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form" label-width="80px">
        <h2 class="main-title">系统登录</h2>
        <el-form-item label="身份">
          <el-select id="identity" v-model="identity" placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            :autofocus="true"
            placeholder="请输入用户名"
            v-model="username">
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from "crypto-js";        //crypto 模块提供了加密功能(nodejs)
import * as util from '../assets/util.js';    //tod
//登录
const requestLogin = params => {
  let words = CryptoJS.enc.Utf8.parse(params.password);
  let base64 = CryptoJS.enc.Base64.stringify(words);
  params.password = base64;
  return axios.get(`http://rap2api.taobao.org/app/mock/224/GET/web`, {params})
};

export default {
  data() {
    return {
      username: '',
      password: '',
      identity:'operator',
      options:[
        {value:"operator",label:"操作员"},
        {value:"manager",label:"管理员"}
      ],
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {
      var vm = this;
      if (!vm.username) {
        vm.$message.error('请填写用户名！！！');
        return;
      }
      if (!vm.password) {
        vm.$message.error('请填写密码');
        return;
      }

      let loginParams = {name: vm.username, password: vm.password};
      vm.isBtnLoading = true;
      requestLogin(loginParams).then(res => {
        console.log(res);
        vm.isBtnLoading = false;
        if(res.data.token){
          util.session('token', res.data);
          console.log(vm.$router);
          vm.$emit('login', vm.$router.currentRoute.query.from);
        }else{
          return Promise.reject({
            message: '登录异常！'
          });
        }
      }).catch(util.catchError);
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>
