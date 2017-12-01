import axios from 'axios';                       //axios文档：https://www.kancloud.cn/yunye/axios/234845
import router from '../router';
import * as util from '../assets/util.js';

// 创建实例时设置配置的默认值
const instance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/224',
  timeout: 10000
});

instance.defaults.headers.post['Content-Type'] = 'application/json';      // 在实例已创建后修改默认值
//错误处理
// 添加响应拦截器
instance.interceptors.response.use(function(response) {
  console.log(response)
  return response;
}, util.catchError);

export default instance;
