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
                        :picker-options="pickerOptions">
                    </el-date-picker>&nbsp;
                    <el-button type="primary" size="small" icon="el-icon-search">查询</el-button>&nbsp;&nbsp;
                </section>
            </section>
            <section class="mainWrap">
                <div>
                    <el-tag type="info ellipsis">名称：常减压装置</el-tag>
                    <el-tag type="info ellipsis">型号：CY-2017-09</el-tag>
                    <el-tag type="info ellipsis">编号：CH10002355</el-tag>
                    <el-tag type="info ellipsis">位置：东2区 208</el-tag>
                    <el-tag type="info ellipsis">当前状态：正常</el-tag>
                    <el-tag type="info ellipsis">报警状态：<i class="iconfont c-red">&#xe651;</i></el-tag>
                    <div style="float:right">
                        <el-button-group>
                        <el-button size="mini" type="primary" class="time_active">一周</el-button>
                        <el-button size="mini" type="primary">两周</el-button>
                        <el-button size="mini" type="primary">一月</el-button>
                        </el-button-group>
                    </div>
                </div>
                <div class="chartWrap">
                </div>
            </section>
            <section class="mainWrap">
                <v-table
                    :columns="columns"
                    :table-data="tableData"
                    is-horizontal-resize
                    style="width:100%"
                    row-hover-color="#eee"
                    row-click-color="#edf7ff"
                ></v-table>
                <div class="pagerWrap">
                    <v-pagination :total="600"></v-pagination>
                </div>
            </section>
        </el-main> 
      </el-container>
    </div>
</template>
<script>
var echarts = require("echarts");
require("echarts/lib/chart/bar.js");
export default {
  data() {
    return {
      dateValue: "",
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
          eventName: "开机",
          eventTime: "2018/12/9 8:22:43",
          interval: 490,
          note: "工作日上午正常开机"
        },
        {
          eventName: "一般报警",
          eventTime: "2018/12/9 9:26:43",
          interval: 64,
          note: "主轴温度超标报警"
        },
        {
          eventName: "严重报警",
          eventTime: "2018/12/9 9:56:43",
          interval: 94,
          note: "主轴温度过高报警"
        },
        {
          eventName: "关机",
          eventTime: "2018/12/9 11:26:43",
          interval: 90,
          note: "设备关机（手动）"
        },
        {
          eventName: "开机",
          eventTime: "2018/12/9 11:46:43",
          interval: 10,
          note: "手动开机"
        }
      ],
      columns: [
        {
          field: "eventName",
          title: "设备事件",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "eventTime",
          title: "记录时间",
          width: 220,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "interval",
          title: "上一事件间隔时间(分钟)",
          width: 200,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "note",
          title: "事件详情",
          width: 470,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        }
      ]
    };
  },
  methods: {
    clickDemo: function() {
      this.showInfo++;
    }
  },
  mounted: function() {
    var mainChart = echarts.init(document.querySelector(".chartWrap"));
    // var app = {};
    // option = null;
    // app.title = '坐标轴刻度与标签对齐';
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
        data: ["12/1", "12/2", "12/3", "12/4", "12/5", "12/6", "12/7"]
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
          data: [320, 302, 301, 334, 390, 330, 320]
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
          data: [120, 132, 101, 134, 90, 230, 210]
        }
      ]
    });
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
        margin: 5px;
        //border: solid 1px #dfdfdf;
      }
      & > div:last-child {
        flex: 3;
        margin: 5px;
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
