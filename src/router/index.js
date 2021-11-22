import Vue from 'vue'
import Router from 'vue-router'
import Log from '@/components/Log'
import Home from "../components/Home";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }, {
            path: '/log',
            name: 'Log',
            component: Log
        },{
            path: '/home',
            name: '导航一',
            component: Home,
            children: [
                {
                    path: '/test1',
                    name: '选项一',
                    component: Test1
                }, {
                    path: '/test2',
                    name: '选项二',
                    component: Test2
                }
            ]
        }
    ]
})


