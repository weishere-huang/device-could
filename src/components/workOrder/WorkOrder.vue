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
            field: "state",
            title: "工单状态",
            width: 70,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "workType",
            title: "工单类型",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
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
          ? true
          : false,
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
            this.loadValue(response.data.data.content);
            this.tableDate = this.tableData;
          },
          ({ type, info }) => {}
        );
      },
      loadValue(value) {
        for (let i in value) {
          if (value[i].workType === 0) {
            this.tableData[i].workType = "检修";
          }
          if (value[i].workType === 1) {
            this.tableData[i].workType = "保养";
          }
          if (value[i].workType === 2) {
            this.tableData[i].workType = "故障";
          }
          if (value[i].state === 0) {
            this.tableData[i].state = "待审核";
            this.audited++;
          }
          if (value[i].state === 1) {
            this.tableData[i].state = "已通过";
          }
          if (value[i].state === 2) {
            this.tableData[i].state = "已禁用";
          }
          if (value[i].state === 3) {
            this.tableData[i].state = "已删除";
          }
          if (value[i].state === 4) {
            this.tableData[i].state = "审核中";
            this.inAudit++;
          }
          if (value[i].state === 5) {
            this.tableData[i].state = "待处理";
            this.handle++;
          }
          if (value[i].state === 6) {
            this.tableData[i].state = "已消除";
          }
          if (value[i].state === 7) {
            this.tableData[i].state = "已撤销";
          }
          if (value[i].state === 10) {
            this.tableData[i].state = "已驳回";
          }
          if (value[i].state === 12) {
            this.tableData[i].state = "已停止";
          }
          if (value[i].state === 13) {
            this.tableData[i].state = "已完成";
          }
          if (value[i].state === 15) {
            this.tableData[i].state = "待处理";
          }
        }
      }
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

