<template>
    <!-- <div>
        <span>Equipment{{showInfo}}</span>
        <button @click="clickDemo" :class="showInfo">点击</button>
    </div> -->
    <div class="monitWrap">
      <el-container :class="[{hide:isHideList}]">
        <el-main class="monitMainContent2">
          <section class="topWrap">
            <div>
              <el-button size="small" type="primary" @click="$router.push({path: '/Oee/Add'})"><i class='el-icon-circle-plus-outline'></i> 新增OEE任务</el-button>
              <el-button size="small" type="primary"><i class='el-icon-refresh'></i> 立即刷新</el-button>
            </div>
            <div>
              搜索：
                <el-input style="width:200px" size="small"  placeholder="请输入编号"></el-input>
                <el-button size="small" type="primary"><i class='el-icon-search'></i> 搜索</el-button>
                <el-button type="text" @click="isHideAdvSearch=!isHideAdvSearch"><i :class="[isHideAdvSearch?'el-icon-arrow-down':'el-icon-arrow-up']"></i> more</el-button>
            </div>
          </section>
          <section :class="{advSearchWrap:true,ishide:isHideAdvSearch}">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="速记名称">
                <el-input size="small" v-model="formInline.user" placeholder="速记名称"></el-input>
              </el-form-item>
              <el-form-item label="起始时间范围">
                <el-date-picker
                  size="small"
                  v-model="dateRange"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="任务状态">
                <el-select size="small" v-model="formInline.region" placeholder="任务状态">
                  <el-option label="未开始" value="1"></el-option>
                  <el-option label="进行中" value="2"></el-option>
                  <el-option label="已完成" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary"><i class='el-icon-search'></i> 查询</el-button>
              </el-form-item>
            </el-form>
          </section>
          <section class="equListWrap">
            <div>
              <v-table
                      is-horizontal-resize
                      style="width:100%"
                      :columns="columns"
                      :table-data="tableData"
                      row-hover-color="#eee"
                      row-click-color="#edf7ff"
              ></v-table>
              <div class="pagerWrap">
                    <v-pagination :total="600"></v-pagination>
                </div>
            </div>
          </section>
        </el-main>
      </el-container>
      <router-view></router-view>
    </div>
</template>

<script>
var echarts = require("echarts");
import Vue from "vue";
require("echarts/lib/chart/pie");

Vue.component("table-operation", {
  template: `<span>
        <el-tooltip class="item" effect="dark" content="结束" placement="top">
          <a href="javascript:;" class='g-link' @click="endOeeTask"><i style='font-size:16px' class='iconfont'>&#xe603;</i></a>
        </el-tooltip>
        &nbsp;
        <el-tooltip class="item" effect="dark" content="查看" placement="top">
          <a href="javascript:;" class='g-link' @click="oeeTaskDetails"><i style='font-size:16px' class='iconfont'>&#xe734;</i></a>
        </el-tooltip>
        &nbsp;
        
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
          <el-popover
            placement="top"
            width="160"
            v-model="deleteVisible">
            <p>确定要删除此条Oee任务吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteVisible = false">确定</el-button>
            </div>
            <el-button type="text" slot="reference" class='g-link' @click.stop.prevent="deleteRow(rowData,index)"><i style='font-size:16px' class='iconfont'>&#xe66b;</i></el-button>
            
          </el-popover>
            
          </el-tooltip>
        </span>`,
  
  
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data(){
    return {
      deleteVisible:false,
    }
  },
  methods: {
    endOeeTask() {
      this.$router.push({ path: "/Oee/End" });
    },
    oeeTaskDetails() {
      this.$router.push({ path: "/Oee/Details" });
    },
    deleteRow() {
      // 参数根据业务场景随意构造
      let params = { type: "delete", index: this.index };
      this.$emit("on-custom-comp", params);
    }
  }
});
export default {
  data() {
    return {
      isHideList: false,
      formInline: {},
      isHideAdvSearch: true,
      dateRange: "",
      pickerOptions2: {
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
          oeeCode: "OEE233371",
          customName: "第三季度第二次OEE测试",
          startDate: "2018/10/11",
          endDate: "2018/11/23",
          equNum: 122,
          state: 1,
          oee: 332.3
        }
      ],
      columns: [
        {
          field: "oeeCode",
          title: "OEE编号",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
          // formatter: function (rowData,rowIndex,pagingIndex,field) {
          //     return rowIndex < 3 ? '<span style="color:red;font-weight: bold;">' + (rowIndex + 1) + '</span>' : rowIndex + 1
          // }, isResize:true
        },
        {
          field: "customName",
          title: "速记名称",
          width: 250,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "startDate",
          title: "起始时间",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "endDate",
          title: "截止时间",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "equNum",
          title: "设备数量",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "state",
          title: "状态",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "oee",
          title: "OEE值",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          title: "操作",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          componentName: "table-operation",
          isResize: true
        }
      ]
    };
  },
  created: function() {},
  mounted: function() {},
  watch: {
    $route() {
      this.isHideList=this.$route.matched.find(item=>(item.path==='/Oee/Details'))?true:false;
    }
  },
  methods: {
    collapseItemChange(val) {
      console.log(val);
    },
    treeNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="less" scoped>
.monitWrap {
  height: 100%;
  .equTypeListBar {
    //overflow: hidden;
    border-right: solid 1px #eee;
    padding: 10px;
  }
  .monitMainContent2 {
    padding-top: 0;
    .topWrap {
      border: solid 1px #dfdfdf;
      border-radius: 5px;
      height: 55px;
      display: flex;
      font-size: 12px;
      & > div:first-child {
        flex: 1;
        margin: 5px 10px;
        line-height: 40px;
        //border: solid 1px #dfdfdf;
      }
      & > div:last-child {
        flex: 3;
        margin: 5px 10px;
        //border: solid 1px #dfdfdf;
        text-align: right;
        div {
          margin: 5px;
        }
      }
    }
  }
  .advSearchWrap {
    margin: 0 15px 5px 15px;
    padding: 10px 10px 0 10px;
    border: solid 1px #dfdfdf;
    border-top: 0;
    background: #fdfdfd;
    transition: all 0.2s ease-out;
    overflow: hidden;
    form {
      width: 100%;
      display: flex;
      & > div {
        flex: 2;
        &:nth-child(2) {
          flex: 4;
        }
        &:nth-child(4) {
          flex: 1;
          text-align: right;
        }
      }
    }
    &.ishide {
      height: 0;
      -webkit-transform: translate3d(0, -25px, 0);
      //padding: 0;
      //border:0;
      //margin-top: -25px;
      opacity: 0;
    }
    // & > div {
    //   flex: 3;
    //   padding: 5px;
    //   border: solid 1px #dfdfdf;
    //   border-radius: 5px;
    // }
  }
  .equListWrap {
    //border: solid 1px #ccc;
    margin: 20px 5px 5px 5px;
  }
  .el-card__body {
    padding: 10px;
  }
  .cardItem {
    margin: 5px;
    .cardItem-header {
      font-size: 16px;
    }
    p {
      padding-bottom: 10px;
      font-size: 14px;
      border-bottom: solid 3px #0e8561;
    }
    .separate {
      background: #0e8561;
      height: 3px;
      border-radius: 1px;
    }
    ul {
      margin-top: 5px;
      list-style-type: none;
      display: inline-block;
      width: 100%;
      font-size: 12px;
      li {
        width: 100%;
        line-height: 22px;
        i {
          margin: 0 5px;
        }
        span {
          font-weight: bold;
        }
        &:hover {
          background: #e3edf8;
        }
      }
    }
    .red {
      cursor: pointer;
    }
  }
  .pagerWrap {
    text-align: center;
    padding: 20px 0 15px 0;
  }
}
</style>

