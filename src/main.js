// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'


import {postRequest} from "@/utils/api";
import {postKeyValueRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";

Vue.config.productionTip = false

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.config.productionTip = false

// 引入依赖并使用ElementUI 全局配置组件 mini
Vue.use(ElementUI, {size: 'small'});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
