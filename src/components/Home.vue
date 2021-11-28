<template>
    <div>

        <div>
            Scroll down to see the bottom-right button.
            <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
                <div
                    style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: #1989fa;
                      }"
                                >
                    UP
                </div>
            </el-backtop>
        </div>
    </div>


</template>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>

<script>
    export default {
        filters: {
            ellipsis(value) {
                if (!value) return ''
                if (value.length > 32) {
                    return value.slice(0, 32) + '...'
                }
                return value
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (row.level == "ERROR") {
                    console.log(rowIndex)
                    return 'warning-row';
                } else if (row.level == "INFO") {
                    console.log("success-row" + rowIndex);
                    return 'success-row';
                }
                return '';
            },
            initLogs() {
                let url = '/system/log/';
                url += "?page=" + this.page + "&size=" + this.size;
                if (this.search.message) {
                    url += "&message=" + this.search.message;
                }
                if (this.search.level) {
                    url += "&level=" + this.search.level;
                }
                if (this.search.date) {
                    this.search.startTime = this.search.date[0];
                    url += "&startTime=" + this.search.date[0];
                    url += "&endTime=" + this.search.date[1];
                }
                if (this.search.day) {
                    url += "&day=" + this.search.day;
                }
                this.getRequest(url).then(resp => {
                    if (resp) {
                        this.logs = resp.data.list;
                        this.total = resp.data.total;
                    } else {
                        this.logs = '';
                    }
                });
            },
            // 分页点击事件
            currentChange(currentPage) {
                this.page = currentPage;
                this.initLogs();
            },
            sizeChange(currentSize) {
                this.size = currentSize;
                this.initLogs();
            },
        },
        mounted() {
            this.initLogs();
        },
        data() {
            return {

                logs: [],
                levels: [{
                    value: 'DEBUG',
                    label: 'DEBUG'
                }, {
                    value: 'INFO',
                    label: 'INFO'
                }, {
                    value: 'ERROR',
                    label: 'ERROR'
                }],
                search: {
                    message: null,
                    level: null,
                    startTime: null,
                    endTime: null,
                    date: ['', ''],
                    day: ''
                },
                total: 0,
                page: 1,
                size: 20,
            }
        }
    }
</script>
