<template>
    <div id="app">
        <div v-for="item in users" class="item">
            <span>{{item.id}}.{{item.name}}</span>
            <span :class='item.state==-1?"nowI":""'></span>
        </div>
    </div>
</template>

<script>
import {data} from "autoprefixer";

export default {
    name: "WebSocket",
    data(){
        return {
            users: [
                {
                    id: 1,
                    name: '张三',
                    state: 1
                },
                {
                    id: 2,
                    name: '李四',
                    state: 1
                },
                {
                    id: 3,
                    name: '王五',
                    state: 1
                },
                {
                    id: 4,
                    name: '韩梅梅',
                    state: 1
                },
                {
                    id: 5,
                    name: '李磊',
                    state: 1
                }
            ]
        }
    },
    mounted() {
        this.initLogs();
    },
    methods:{
        initLogs(){
            var webSocket = null;
            var vm = this;  // 显式绑定 this
            if ('WebSocket' in window) {
                //创建WebSocket对象
                webSocket = new WebSocket("ws://localhost:18801/webSocket/" + this.getUUID());

                //连接成功
                webSocket.onopen = function() {
                    console.log("已连接");
                    webSocket.send("消息发送测试")
                }
                // 接收到消息，箭头函数不会自己创建上下文，this 还能获取到 Vue 对象的数据
                webSocket.onmessage = (msg) => {
                    //处理消息
                    var serverMsg = msg.data;
                    const jsonObject = JSON.parse(serverMsg);  // 解析 webSocket 发送过来 json 消息
                    var t_id = parseInt(jsonObject.id)
                    const t_status = jsonObject.status;
                    for (var i = 0; i < this.users.length; i++) {
                        var item = this.users[i];
                        if(item.id == t_id){
                            item.state = t_status ? 1 : -1;  // 根据状态设置
                            this.users.splice(i,1,item)
                            break;
                        }
                    }
                };

                //关闭事件
                webSocket.onclose = function() {
                    console.log("websocket已关闭");
                };
                //发生了错误事件
                webSocket.onerror = function() {
                    console.log("websocket发生了错误");
                }
            } else {
                alert("很遗憾，您的浏览器不支持WebSocket！")
            }
        },
        getUUID(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
}
</script>

<style scoped>
    .item {
        display: flex;
        border-bottom: 1px solid #000000;
        justify-content: space-between;
        width: 30%;
        line-height: 50px;
        height: 50px;
    }

    .item span:nth-child(2){
        margin-right: 10px;
        margin-top: 15px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #55ff00;
    }
    .nowI{
        background: #ff0000 !important;
    }
</style>
