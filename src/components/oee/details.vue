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
                <div><el-button type="primary" size="small" @click="$router.push({ path: '/Oee/Details/End' })"><i class='iconfont'>&#xe603;</i>&nbsp;结束任务</el-button></div>
            </section>
            <section class="mainWrap">
                <div>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            OEE任务编号：OEE289330124
                        </el-col>
                        <el-col :span="12">
                            OEE任务速记名称：2018年第四季度第二次OEE任务
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            任务状态：已完成
                        </el-col>
                        <el-col :span="12">
                            任务时间：2018/12/2~2018/12/15
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            计划日工时：9小时/日
                        </el-col>
                        <el-col :span="12">
                            计划日停机时间：1.2小时/日
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            计划日损耗时间：1小时/日
                        </el-col>
                        <el-col :span="12">
                            计划日单件生产时间：120秒/件
                        </el-col>
                    </el-row>
                </div>
            </section>
            <section class="mainWrap">
                <div class="gaugeWrap">
                    <div id='gaugeWrap_1'></div>
                    <div id='gaugeWrap_2'></div>
                    <div id='gaugeWrap_3'></div>
                    <div id='gaugeWrap_4'></div>
                </div>
            </section>
            <section class="mainWrap" id='mainListWrap'>
                <v-table
                    :columns="columns"
                    :table-data="tableData"
                    is-horizontal-resize
                    style="width:100%"
                    row-hover-color="#eee"
                    row-click-color="#edf7ff"
                ></v-table>
            </section>
        </el-main> 
      </el-container>
      <router-view></router-view>
    </div>
</template>
<script>
var echarts = require("echarts");
require("echarts/lib/chart/bar.js");
import $ from 'jquery';
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
          equName: "A3区施耐德加工中心HDC344L型",
          hourNum: 99,
        },
        {
          equName: "A3区施耐德加工中心HDC344L型",
          hourNum: 190,
        },
        {
          equName: "A3区施耐德加工中心HDC344L型",
          hourNum: 130,
        }
      ],
      columns: [
        {
          field: "equName",
          title: "设备名称",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          
        },
        {
          field: "hourNum",
          title: "记录时间",
          width: 600,
          titleAlign: "center",
          isResize: true,
          formatter: function (rowData,rowIndex,pagingIndex,field) {
            const showWidth=(rowData.hourNum/300)*($("#mainListWrap .v-table-htable").width()||1000);
            return `<span style='width:${showWidth}px' class="progressBar">${rowData.hourNum}</span>`;
          }
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
    var mainChart_1 = echarts.init(document.querySelector("#gaugeWrap_1"));
    var mainChart_2 = echarts.init(document.querySelector("#gaugeWrap_2"));
    var mainChart_3 = echarts.init(document.querySelector("#gaugeWrap_3"));
    var mainChart_4 = echarts.init(document.querySelector("#gaugeWrap_4"));
    const option = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'OEE',
                type: 'gauge',
                detail: {formatter:'{value}'},
                data: [{value: 50, name: 'OEE性能'}]
            }
        ]
    }
    mainChart_1.setOption(option, true);
    mainChart_2.setOption(option, true);
    mainChart_3.setOption(option, true);
    mainChart_4.setOption(option, true);
    // var app = {};
    // option = null;
    // app.title = '坐标轴刻度与标签对齐';
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
      .el-col {
        line-height: 30px
      }
      .gaugeWrap {
        margin: 5px;
        height: 300px;
        display: flex;
        &>div{
            flex: 1
        }
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
    }
    .progressBar{
        display: inline-block;
        background: #2f3be4;
        color: #fff;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
  }
}
</style>
