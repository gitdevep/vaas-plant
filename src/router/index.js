import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/filemanage'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/business/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/filemanage',
                    component: resolve => require(['../components/page/business/FileManage.vue'], resolve),
                    meta: { title: '文件管理' }
                },
                {
                    path:'/fileupload',
                    component: resolve => require(['../components/page/business/FileManageUpload.vue'], resolve),
                    meta: {title: '文件上传'}
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/baseComponents/Table.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/pagination',
                    component: resolve => require(['../components/page/baseComponents/BasePagination.vue'], resolve),
                    meta: { title: '分页' }
                },
                {
                    path: '/button',
                    component: resolve => require(['../components/page/baseComponents/Button.vue'], resolve),
                    meta: { title: '按钮' }
                },
                {
                    path: '/modal',
                    component: resolve => require(['../components/page/baseComponents/Modal.vue'], resolve),
                    meta: { title: '弹框' }
                },
                {
                    path: '/input',
                    component: resolve => require(['../components/page/baseComponents/Input.vue'], resolve),
                    meta: { title: '输入框' }
                },
                {
                    path: '/checkbox',
                    component: resolve => require(['../components/page/baseComponents/CheckBox.vue'], resolve),
                    meta: { title: '复选框' }
                },
                {
                    path: '/select',
                    component: resolve => require(['../components/page/baseComponents/Select.vue'], resolve),
                    meta: { title: '选择框' }
                },
                {
                    path: '/uploadcomponent',
                    component: resolve => require(['../components/page/baseComponents/Upload.vue'], resolve),
                    meta: { title: '上传组件' }
                },
                {
                    path: '/detail',
                    component: resolve => require(['../components/page/baseComponents/Detail.vue'], resolve),
                    meta: { title: '详情组件' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/business/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/business/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/business/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/business/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/business/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/business/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/business/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/business/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
