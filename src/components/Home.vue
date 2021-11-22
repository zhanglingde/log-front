<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">日志</div>
            </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
export default {

    name: "Home",
    data() {
        return {
            user: JSON.parse(window.sessionStorage.getItem("user"))
        }
    },
    mounted() {
        this.hello()
    },
    methods: {
        hello() {
            this.getRequest("/hello",resp=>{
                if (resp) {
                    console.log("调用成功");
                }else{
                    console.log("调用失败");
                }
            })
        },
        commandHandler(cmd) {
            if (cmd == 'logout') {
                this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getRequest("/logout");
                    window.sessionStorage.removeItem("user");
                    this.$router.replace("/");
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                })
            }
        }
    }
}
</script>

<style scoped>
.homeHeader {
    background: #109ce3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
}

.homeHeader .title {
    font-size: 30px;
    font-family: 华文行楷;
    color: #ffffff;
}

.homeHeader .userInfo {
    cursor: pointer;
}

.el-dropdown-link {
    display: flex;
    align-items: center; /*全局局中*/
}

.el-dropdown-link img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left: 8px;
}

</style>
