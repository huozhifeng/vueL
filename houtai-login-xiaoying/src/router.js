import Vue from "vue"
import VueRouter from "vue-router"

// 引入组件

import login from './page/login.vue'
import home from './page/home.vue'
import notFound from './page/404.vue'
import menutab from './page/menu1/menuTab.vue'
import menutable from './page/menu2/menuTable.vue'
import menuForm from './page/menu3/menuForm.vue'
import progress from './page/menu3/progress.vue'
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

let routes = [{
  path: '/login',
  component: login,
  name: '',
  hidden: true
},
  {
    path: '/404',
    component: notFound,
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: home,
    name: '导航一',
    iconCls: 'el-icon-message', //图标样式class
    children: [{
      path: '/menutab',
      component: menutab,
      name: 'Tab',
      hidden: true
    }],
    hidden: true
  },
  {
    path: '/',
    component: home,
    name: '导航二',
    iconCls: 'fa fa-id-card-o',
    children: [{
      path: '/menutable',
      component: menutable,
      name: 'Table',
      hidden: true
    }],
    hidden: true
  },
  {
    path: '/',
    component: home,
    name: '导航三',
    iconCls: 'fa fa-id-card-o',
    children: [{
      path: '/menuform',
      component: menuForm,
      name: 'Form',
      hidden: true
    },{
      path: '/progress',
      component: progress,
      name: 'Progress',
      hidden: true
    }],
    hidden: true
  }
];
var router = new VueRouter({
  routes
})
export default router;
