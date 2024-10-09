import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import Test2 from "../components/Test2";
import Test1 from "../components/Test1";
import Log from "../components/Log";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/Log',
            name: 'Log',
            component: Log
        },{
            path: '/home',
            name: '导航一',
            component: Home,
            children: [
                 {
                    path: '/log',
                    name: '选项二',
                    component: Log
                }
            ]
        },{
            path: '/test1',
            name: '选项一',
            component: Test1
        }
    ]
})


