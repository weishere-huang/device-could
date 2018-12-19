<template>
    <!-- <div>
        <span>Equipment{{showInfo}}</span>
        <button @click="clickDemo" :class="showInfo">点击</button>
    </div> -->
    <div class="monitSingleWrap">
      <el-container>
         <el-main class="monitSingleMainContent">
            <section class="topWrap">
                <div><el-button type="primary" size="small" @click="()=>{this.$router.go(-1) }" icon="el-icon-arrow-left">返回</el-button></div>
                <section>
                    <el-date-picker
                        v-model="dateValue"
                        type="daterange"
                        align="right"
                        size="small"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy/MM/dd"
                        @change="timeInfo"
                        :picker-options="pickerOptions">
                    </el-date-picker>&nbsp;
                    <el-button type="primary" size="small" icon="el-icon-search" @click="searchTime">查询</el-button>&nbsp;&nbsp;
                </section>
            </section>
            <section class="mainWrap">
                <div>
                    <el-tag type="info ellipsis" :title="runningLog.deviceName">名称：{{runningLog.deviceName}}</el-tag>
                    <el-tag type="info ellipsis" :title="runningLog.deviceModel">型号：{{runningLog.deviceModel}}</el-tag>
                    <el-tag type="info ellipsis" :title="runningLog.deviceNo">编号：{{runningLog.deviceNo}}</el-tag>
                    <el-tag type="info ellipsis" :title="runningLog.location">位置：{{runningLog.location}}</el-tag>
                    <el-tag type="info ellipsis" :title="runningLog.deviceState">当前状态：{{runningLog.deviceState}}</el-tag>
                    <el-tag type="info ellipsis" title="">报警状态：
                      <i class="iconfont c-green" v-if="runningLog.warnLevel===0">&#xe651;</i>
                      <i class="iconfont c-yellow" v-else-if="runningLog.warnLevel===1">&#xe651;</i>
                      <i class="iconfont c-orange" v-else-if="runningLog.warnLevel===2">&#xe651;</i>
                      <i class="iconfont c-red" v-else-if="runningLog.warnLevel===3">&#xe651;</i>
                      <i class="iconfont c-darkgray" v-else-if="runningLog.warnLevel===4">&#xe651;</i>
                    </el-tag>
                    <!-- <div style="float:right">
                        <el-button-group>
                        <el-button size="mini" type="primary" class="time_active">一周</el-button>
                        <el-button size="mini" type="primary">两周</el-button>
                        <el-button size="mini" type="primary">一月</el-button>
                        </el-button-group>
                    </div> -->
                </div>
                <div class="chartWrap">
                </div>
            </section>
            <section class="mainWrap">
                <v-table
                    :columns="columns"
                    :table-data="tableData"
                    is-horizontal-resize
                    value-format="yyyy/MM/dd"
                    style="width:100%"
                    row-hover-color="#eee"
                    row-click-color="#edf7ff"
                    ref="singleTable"
                    row-height="30"
                ></v-table>
                <div class="pagerWrap">
                    <v-pagination :total="runningLog.totalElements" 
                    @page-change="pageChange"
                    @page-size-change="pageSizeChange"
                    :page-size="pageSize"
                    :page-index="pageIndex"
                    :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
                </div>
            </section>
        </el-main> 
      </el-container>
    </div>
</template>
<script>
var echarts = require("echarts");
import  clone from 'clone';
require("echarts/lib/chart/bar.js");
export default {
  data() {
    return {
      pageSize:10,
      pageIndex:1,
      dateValue: "",
      tableDate:'',
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [
        {
          dataType: "开机",
          createTime: "2018/12/9 8:22:43",
          lastEventInterval: 490,
          collectData: "工作日上午正常开机"
        },
        {
          dataType: "一般报警",
          createTime: "2018/12/9 9:26:43",
          lastEventInterval: 64,
          collectData: "主轴温度超标报警"
        },
        {
          dataType: "严重报警",
          createTime: "2018/12/9 9:56:43",
          lastEventInterval: 94,
          collectData: "主轴温度过高报警"
        },
        {
          dataType: "关机",
          createTime: "2018/12/9 11:26:43",
          lastEventInterval: 90,
          collectData: "设备关机（手动）"
        },
        {
          dataType: "开机",
          createTime: "2018/12/9 11:46:43",
          lastEventInterval: 10,
          collectData: "手动开机"
        }
      ],
      columns: [
        {
          field: "dataType",
          title: "设备事件",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter: function (rowData,rowIndex,pagingIndex,field) {
            return rowData.dataType===0 ? '开机':rowData.dataType===1?"关机":"故障"
          }
        },
        {
          field: "createTime",
          title: "记录时间",
          width: 220,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "lastEventInterval",
          title: "上一事件间隔时间(分钟)",
          width: 200,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "collectData",
          title: "事件详情",
          width: 470,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true,
        }
      ],
      runningLog:"",
      startDate:"",
      endDate:""
    };
  },
  methods: {
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getTableData();
      this.selectALLMsg()
      console.log(pageIndex);
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.selectALLMsg()
      console.log(pageSize);
    },
    getTableData() {
      this.tableData = this.tableDate.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    searchTime(){
      this.selectALLMsg()
    },
    timeInfo(data){
      this.startDate=data[0]
      this.endDate=data[1]
    },
    clickDemo: function() {
      this.showInfo++;
    },
    echartsWrap(days,unexpected,normal){
      console.log(days,unexpected,normal);
      var mainChart = echarts.init(document.querySelector(".chartWrap"));
      // var app = {};
      // option = null;
      // app.title = '坐标轴刻度与标签对齐';
      
      // console.log(this.days);
      mainChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["正常运行时间", "关机时间","其他状况"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value"
        },
        xAxis: {
          type: "category",
          data: days
        },
        series: [
          {
            name: "正常运行时间",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: normal
          },
          {
            name: "其他状况",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: unexpected
          }
        ]
      });
    },
    selectALLMsg(){
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.singleTable.resize();
        }, 500);
      });
      let id = this.$route.params.deviceId
      let code=JSON.parse(sessionStorage.getItem('user')).organizeCode
      console.log(code);
      console.log(id);
      this.Axios(
        {
          url: ["/deviceState/getRunInfoForStateTime","/deviceState/getRunInfoForBasic"],
          type: ["get","get"],
          params: {
            organizeCode:code,
            deviceId:id,
            startDate:this.startDate,
            endDate:this.endDate,
            page:this.pageIndex,
            size:this.pageSize
          },
          option: { requestTarget: "r" }
        },
        this
      ).then(
        ([res1,res2]) => {
          this.runningLog=res2.data.data
          if (this.runningLog.deviceState===0) {
            this.runningLog.deviceState="正常"
          }else if (this.runningLog.deviceState===1) {
            this.runningLog.deviceState="故障"
          }else if (this.runningLog.deviceState===2) {
            this.runningLog.deviceState="维保"
          }else if (this.runningLog.deviceState===3) {
            this.runningLog.deviceState="关机"
          }
          console.log(this.runningLog);
          let days=new Array()
          let unexpected=new Array()
          let normal=new Array()
          for (let i = 0; i < res1.data.data.length; i++) {
            days.push(res1.data.data[i].days)
            unexpected.push(res1.data.data[i].unexpected)
            normal.push(res1.data.data[i].normal)
          }
          console.log(res1.data.data);
          this.echartsWrap(days,unexpected,normal)
          this.tableData=res2.data.data.content
          console.log(this.tableData);
        }
      );
    }
  },
  mounted: function() {
    
  },
  created () {
    this.selectALLMsg()
  }
};
</script>
<style lang="less">
.monitSingleWrap {
  .monitSingleMainContent {
    padding: 10px 5px;
    .topWrap {
      border: solid 1px #dfdfdf;
      border-radius: 5px;
      height: 60px;
      margin: 0 10px 5px 10px;
      display: flex;
      font-size: 12px;
      line-height: 50px;
      & > div:first-child {
        flex: 1;
        margin: 5px 0 5px 12px;
        //border: solid 1px #dfdfdf;
      }
      & > div:last-child {
        flex: 3;
        margin:5px 12px 5px 0;
        //border: solid 1px #dfdfdf;
        text-align: right;
      }
    }
    .mainWrap {
      border: solid 1px #dfdfdf;
      border-radius: 5px;
      margin: 10px;
      padding: 10px;
      .el-tag--info {
        color: #666;
        max-width: 150px;
      }
      .chartWrap {
        margin: 5px;
        height: 300px;
      }
      .el-tag {
        &:hover {
          background: #ccc;
        }
      }
      .time_active {
        background: #cbe5ff;
        color: #696969;
      }
      .pagerWrap{
          text-align: center;
          padding: 20px 0 15px 0;
      }
    }
  }
}
</style>
