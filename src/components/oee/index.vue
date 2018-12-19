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
              <el-button size="small" type="primary" @click="reload()"><i class='el-icon-refresh'></i> 立即刷新</el-button>
            </div>
            <div>
              搜索：
                <el-input style="width:200px" size="small" v-model="planNo"  placeholder="请输入编号"></el-input>
                <el-button size="small" type="primary" @click="dataInit()"><i class='el-icon-search'></i> 搜索</el-button>
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
                  value-format="yyyy/MM/dd"
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
                <el-button size="small" type="primary" @click="dataInit()"><i class='el-icon-search'></i> 查询</el-button>
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
                      @on-custom-comp="customCompFunc"
                      ref="oeeTable"
              ></v-table>
              <div class="pagerWrap">
                <v-pagination 
                    :total="totalElements" 
                    @page-change="pageChange"
                    @page-size-change="pageSizeChange"
                    :page-size="pageSize"
                    :page-index="pageIndex"
                    :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
                </v-pagination>
              </div>
            </div>
          </section>
        </el-main>
      </el-container>
      <router-view></router-view>
    </div>
</template>

<script>
let qs = require("qs");
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
            <a href="javascript:;"  class='g-link' @click.stop.prevent="deleteRow(rowData,index)"><i style='font-size:16px;color:#F56C6C' class='iconfont'>&#xe66b;</i></a>
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
      //this.$router.push({ name: "/Oee/End/123",params:{endTime:rowData.endTime,desc:rowData.desc}});
      this.$router.push({ path: "/Oee/End/"+this.rowData.id});
    },
    oeeTaskDetails() {
      this.$router.push({ path: "/Oee/Details/"+this.rowData.id });
    },
    deleteRow() {
      // 参数根据业务场景随意构造
      let params = { type: "delete", index: this.index,rowData:this.rowData };
      this.$emit("on-custom-comp", params);
    },
    blurHandler:function(){
    },
    deleteOeeTask:function(){
      Message.wran({message:'此OEE任务不允许删除'});
      deleteVisible = false;
    }
  }
});
export default {
  inject:['reload'],
  data() {
    return {
      planNo:"",
      pageSize:10,
      pageIndex:1,
      isHideList: false,//this.$route.matched.find(item=>(item.name==="OeeDetails"))?true:false,
      formInline: {
        user:"",
        region:"",
        region:"",
      },
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
       
      ],
      hasLoaded:false,
      columns: [
        {
          field: "planNo",
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
          field: "shorthandName",
          title: "速记名称",
          width: 250,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "organizeName",
          title: "组织机构名称",
          width: 250,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "startDate",
          title: "起始时间",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter:function(rowData){
            return new Date(rowData.startDate).toLocaleDateString().replace(/\//g, "-");
          }
        },
        {
          field: "endDate",
          title: "截止时间",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter:function(rowData){
            return new Date(rowData.endDate).toLocaleDateString().replace(/\//g, "-");
          }
        },
        {
          field: "count",
          title: "设备数量",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "state",
          title: "状态",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter:function (rowData,rowIndex,pagingIndex,field){
            switch(rowData.state){
              case 0:
              return '未开始';
              case 1:
              return '进行中';
              case 2:
              return '已完成';
            }
          }
        },
        {
          field: "oee",
          title: "OEE值",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          formatter:function (rowData,rowIndex,pagingIndex,field){
            return rowData.oee?rowData.oee:'-';
          }
        },
        {
          title: "操作",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          componentName: "table-operation",
          isResize: true
        }
      ],
      pageable:{pageNumber:0,pageSize:0,total:0},
      totalElements:"",
      oeePlans:"",
      organizeCode:JSON.parse(sessionStorage.getItem('user')).organizeCode,
    };
  },
  created: function() {
    this.dataInit();
  },
  mounted: function() {},
  watch: {
    $route() {
      //debugger
      this.isHideList=this.$route.matched.find(item=>(item.name==="OeeDetails"))?true:false;
      if(!this.hasLoaded)this.dataInit();
    }
  },
  methods: {
    customCompFunc(params){
      if (params.type === "delete") {
        this.oeePlans=params.rowData.id
        this.$confirm('此操作将删除此任务, 是否继续?', '提示')
        .then(()=>{
          this.Axios(
        {
          url: "/data/deleteOeePlans",
          params:qs.stringify({
            // oeePlans:1500,
            // organizeCode:1000,
            organizeCode:this.organizeCode,
            oeePlans:this.oeePlans
         }) ,
          type: "post",
          option: { 
            requestTarget:'r' 
          }
        },
        this
      ).then(
        response => {
          this.$message({
            message: "计划已删除",
            type: "success"
          });
          this.reload();
        },
        ({ type, info }) => {}
      );
        })
        
      }
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getTableData();
      this.dataInit()
      console.log(pageIndex);
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.dataInit()
      console.log(pageSize);
    },
    getTableData() {
      this.tableData = this.tableDate.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    collapseItemChange(val) {
      console.log(val);
    },
    treeNodeClick(data) {
      console.log(data);
    },
    dataInit:function(){
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.oeeTable.resize();
        }, 500);
      });
      this.hasLoaded=true;
      this.Axios(
        {
          params: {
            organizeCode:JSON.parse(sessionStorage.getItem('user')).organizeCode,
            planNo:this.planNo,
            shorthandName:this.formInline.user,
            startDate:this.dateRange[0],
            endDate:this.dateRange[1],
            state:this.formInline.region,
            page:this.pageIndex,
            size:this.pageSize,
          },
          url: "/data/listOeePlans",
          type: "get",
          option: {
            enableMsg:false,
            requestTarget:'r'
          }
        },
        this
      ).then(
        response => {
          const _d=response.data.data;
          this.totalElements=response.data.data.totalElements
          this.tableData=_d.content;
          console.log(response.data.data);
          this.pageable={
            pageNumber:_d.pageable.pageNumber,
            pageSize:_d.pageable.pageSize,
            total:_d.totalElements}
            this.isHideList=this.$route.matched.find(item=>(item.name==="OeeDetails"))?true:false;
        },
        ({ type, info }) => {}
      );
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
    border: solid 1px #dfdfdf;
    padding:10px;
    margin-top: 10px;
    border-radius: 5px;
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

