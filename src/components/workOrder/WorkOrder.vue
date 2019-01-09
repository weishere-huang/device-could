<template>
  <div class="work-order">
    <router-view></router-view>
    <div class="top" :class="[{hide:isHideList}]">
      <el-button-group>
        <el-button
          type="primary"
          @click="load(toNull)"
          size="small"
        >全部工单</el-button>
        <el-button
          type="primary"
          @click="load(0)"
          size="small"
        >待审核</el-button>
        <el-button
          type="primary"
          @click="load(4)"
          size="small"
        >审核中</el-button>
        <el-button
          type="primary"
          @click="load(15)"
          size="small"
        >待处理</el-button>
        <el-button
          type="primary"
          @click="load(10)"
          size="small"
        >已驳回</el-button>
        <el-button
          type="primary"
          @click="load(13)"
          size="small"
        >已完成</el-button>
      </el-button-group>
    </div>
    <div class="bottom" :class="[{hide:isHideList}]">
      <v-table
        @on-custom-comp="workToPlans"
        is-horizontal-resize
        column-width-drag
        :multiple-sort="false"
        style="width:100%;min-height:200px;"
        :columns="columns"
        :table-data="tableData"
        row-hover-color="#eee"
        :select-all="selectALL"
        :select-group-change="selectGroupChange"
        :row-dblclick="Jump"
        row-click-color="#edf7ff"
        ref="workOrderTable"
      >
      </v-table>
      <div
        class="mt20 mb20 bold"
        style="text-align:left;margin-top:20px"
      >
        <v-pagination
          @page-change="pageChange"
          @page-size-change="pageSizeChange"
          :total="totalNub"
          :page-size="pageSize"
          :pageIndex="pageIndex"
          :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  export default {
    inject: ["reload"],
    name: "Test",
    data() {
      return {
        stateNum:"",
        toNull: "",
        audited: "",
        inAudit: "",
        handle: "",
        //之后删除后三个变量
        audited1: "",
        inAudit1: "",
        handle1: "",
        //结束
        pageIsOk: true,
        pageIndex: 1,
        pageSize: 10,
        totalNub: 0,
        tableData: [],
        tableDate: [],
        columns: [
          {
            field: "workNo",
            title: "工单编号",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
            //   orderBy: ""
          },
          {
            field: "maintenanceId",
            title: "来源",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            componentName: "table-workToPlan"
          },
          {
            field: "state",
            title: "工单状态",
            width: 70,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true,
            formatter:function (rowData) {
              if(rowData.state ===0 )return `<span style="color: #ff6600">待审核</span>`;
              if(rowData.state ===1 )return `<span style="color: #00b400">已通过</span>`;
              if(rowData.state ===2 )return `<span style="color: #c48382">已禁用</span>`;
              if(rowData.state ===4 )return `<span style="color: #409dfe">审核中</span>`;
              if(rowData.state ===5 )return `<span style="color: #2b63b4">待处理</span>`;
              if(rowData.state ===6 )return `<span style="color: #999999">已消除</span>`;
              if(rowData.state ===7 )return `<span style="color: #c48382">已撤销</span>`;
              if(rowData.state ===10 )return `<span style="color: #59007a">已驳回</span>`;
              if(rowData.state ===12 )return `<span style="color: #999999">已停止</span>`;
              if(rowData.state ===13 )return `<span style="color: #999999">已完成</span>`;
              if(rowData.state ===15 )return `<span style="color: #00b400">待处理</span>`;
            }
          },
          {
            field: "workType",
            title: "工单类型",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true,
            formatter:function (rowData) {
              if(rowData.workType ===0 )return `<span>检修</span>`;
              if(rowData.workType ===1 )return `<span>保养</span>`;
              if(rowData.workType ===2 )return `<span>故障</span>`;
            }
          },
          {
            field: "workDesc",
            title: "工单描述",
            width: 200,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "workCauseAnalysis",
            title: "原因分析",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "deviceNames",
            title: "设备名称",
            width: 120,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "gmtCreate",
            title: "工单创建时间",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
          }
        ],
        isHideList: this.$route.params.id !== undefined
          ? true : false,
        isPage:1,
      };
    },
    methods: {
      selectGroupChange(selection) {
        // console.log("select-group-change", selection);
      },
      selectALL(selection) {
        // console.log("select-aLL", selection);
      },
      selectChange(selection, rowData) {
        // console.log("select-change", selection, rowData);
      },
      getTableData() {
        this.tableData = this.tableDate.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        );
      },
      pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.getTableData();
        this.audited = "";
        this.inAudit = "";
        this.handle = "";
        this.load(this.stateNum);
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
        this.audited = "";
        this.inAudit = "";
        this.handle = "";
        this.load(this.stateNum);
      },
      Jump(rowIndex, rowData, column) {
        if (rowData.workType === "故障") {
          this.$router.push({path:"WorkOrder/BreakdownOrder/" + rowData.id});
        } else {
          this.$router.push({path:"WorkOrder/UpkeepAndTurnaroundPlans/" + rowData.id});
        }
      },

      load(stateNum) {
        EventBus.$on("sideBarTroggleHandle", isCollapse => {
          window.setTimeout(() => {
            this.$refs.workOrderTable.resize();
          }, 500);
        });
        this.stateNum = stateNum;
        this.stateNum==null ||this.stateNum==="" ? ""
          :this.isPage===1 ? this.pageIndex=1:this.pageIndex;
        this.Axios(
          {
            params: {
              state: stateNum,
              page: this.pageIndex,
              size: this.pageSize
            },
            type: "get",
            url: "/maintenanceWork/workList",
          },
          this
        ).then(
          response => {
            this.totalNub = response.data.data.totalElements;
            this.tableData = response.data.data.content;
            this.tableDate = this.tableData;
          },
          ({ type, info }) => {}
        );
      },
      workToPlans(params){
        if (params.type === "workToPlans") {
          if(params.rowData.workType===0)this.$router.push({path:"Upkeep/UpkeepAmend/" + params.rowData.maintenanceId});
          if(params.rowData.workType===1)this.$router.push({path:"TurnaroundPlans/TurnaroundPlansAmend/" + params.rowData.maintenanceId});
          if(params.rowData.workType===2)this.$router.push({path:"Breakdown/BreakDetails/" + params.rowData.maintenanceId})
        }
      },
    },
    created() {
      this.load();
      this.$route.params.id !== undefined ? this.isHideList=true : this.isHideList=false;
    },
    mounted() {},
    watch: {
      $route() {
        this.$route.params.id !== undefined ? this.isHideList=true : this.isHideList=false;
        this.$refs.workOrderTable.resize();
        this.$store.state.operation.work==="y"? this.reload():"";
      }
    },
  };
  Vue.component("table-workToPlan", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <a href="" style="text-decoration: none">{{rowData.maintenanceId}}<i @click.stop.prevent="workToPlans(rowData,index)" style='font-size:20px;color:#409eff' class='iconfont'>&#xe734;</i></a>
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
    methods: {
      workToPlans() {
        // 参数根据业务场景随意构造
        let params = { type: "workToPlans", index: this.index, rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
    }
  });

</script>
<style scoped lang="less">
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  @border: 1px solid #dde2eb;
  .work-order {
    font-size: 12px;
    .top {

      border: @border;
      padding: 10px;
      border-radius: 5px;
      .el-badge:not(:last-child) {
        margin-right: 10px;
      }
    }
    .bottom {
      margin-top: 10px;
      padding: 10px;
      border: @border;
      border-radius: 5px;
    }
  }
</style>
