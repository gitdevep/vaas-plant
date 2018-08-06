import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import Validator from 'vue-validator';

import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
//后台api地址
import interfaceApi from '../static/js/interface';
//通用的信息提示和图片滚动放大缩小
import common from '../static/js/common';

import '../static/css/common.css';  //引入头部、底部、左侧和tags的样式
// 引入各个控件的通用样式
import '../static/css/button-common.css';
import '../static/css/modal.css';
import '../static/css/login.css';

Vue.use(ElementUI, { size: 'small' });
Vue.use(Validator);

axios.defaults.timeout = 30000;
axios.defaults.baseURL = process.env.NODE_ENV ==='development' ? process.env.API_ROOT : process.dev.API_ROOT;
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem("token")) {
            config.headers.Authorization = localStorage.getItem("token");
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
Vue.prototype.$http = axios;
Vue.prototype.$interfaceApi = interfaceApi;
Vue.prototype.$message = common;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if(!role && to.path !== '/login'){
        next('/login');
    }else if(to.meta.permission){
        console.log("to========",to.meta.permission)
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');