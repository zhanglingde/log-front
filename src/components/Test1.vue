<div style="padding-bottom: 10px;">
    <el-row>

        <el-col :span="3">
            等级:
            <el-select v-model="search.level" placeholder="Level"
                       style="width: 130px;"
                       clearable
                       @change="initLogs">
                <el-option
                    v-for="item in levels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            消息：
            <el-input v-model="search.message"
                      placeholder="消息"
                      clearable
                      @keydown.enter.native="initLogs"
                      style="width:200px;"></el-input>
        </el-col>
        <el-col :span="8">
            时间：
            <el-time-picker
                is-range
                v-model="search.date"
                range-separator="至"
                value-format="HH:mm:ss"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                @change="initLogs">
            </el-time-picker>

        </el-col>
        <el-col :span="5">
            <div class="block">
                <span class="demonstration">日期</span>
                <el-date-picker
                    v-model="search.day"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    @change="initLogs">
                </el-date-picker>
            </div>
        </el-col>
        <el-col :span="2">
            <el-button type="primary"
                       @click="initLogs">搜索
            </el-button>
        </el-col>
    </el-row>

</div>
<div>
    <el-table
        :data="logs"
        height="730"
        border
        :row-class-name="tableRowClassName"
        style="width: 100%">
        <el-table-column align="center"
                         label="序号"
                         type="index"
                         width="55">
        </el-table-column>
        <el-table-column prop="host"
                         align="center"
                         label="客户端"
                         width="90">
        </el-table-column>
        <el-table-column prop="level"
                         align="center"
                         label="等级"
                         width="80">
        </el-table-column>
        <el-table-column prop="loggerName"
                         align="center"
                         label="位置"
                         width="180">
        </el-table-column>


        <el-table-column prop="message"
                         label="消息"
                         height="80"
                         width="400">
            <!--                    <template slot-scope="scope">-->
            <!--                        <el-tooltip class="item" effect="dark" :content="scope.row.message" placement="top">-->
            <!--                            <el-button>上左</el-button>-->
            <!--                        </el-tooltip>-->
            <!--                    </template>-->
        </el-table-column>


        <el-table-column prop="stackTrace"
                         label="异常"
                         show-overflow-tooltip
                         height="20px"
                         width="400">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                                <span v-html="scope.row.stackTrace">

                                </span>
                    </div>
                    <span>{{scope.row.stackTrace | ellipsis}}</span>
                </el-tooltip>
            </template>
            <!--                    <template slot-scope="scope">-->
            <!--                        <el-popover placement="left" trigger="hover" width="400">-->
            <!--                            <div style="overflow-y: auto;height:500px" v-html="scope.row.stackTrace"></div>-->
            <!--                            <span-->
            <!--                                slot="reference"-->
            <!--                                v-html="scope.row.stackTrace"-->
            <!--                            ></span>-->
            <!--                        </el-popover>-->
            <!--                    </template>-->
        </el-table-column>
        <el-table-column prop="threadName"
                         label="线程"
        >
        </el-table-column>
        <el-table-column prop="createTime"
                         label="时间">
        </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end;padding-top: 10px;">
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            background
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
        </el-pagination>
    </div>
</div>


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
},
filters: {
ellipsis(value) {
if (!value) return ''
if (value.length > 32) {
return value.slice(0, 32) + '...'
}
return value
}
},
mounted() {
this.initLogs();
},
methods: {
tableRowClassName({row, rowIndex}) {
if (rowIndex === 1) {
console.log(rowIndex)
return 'warning-row';
} else if (rowIndex === 3) {
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
}
