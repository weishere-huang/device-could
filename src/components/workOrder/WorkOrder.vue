<template>
  <div class="work-order">
    <div class="top">
      <el-badge class="item">
        <el-button @click="load(-1)" size="small">全部工单</el-button>
      </el-badge>
      <el-badge
        :value="audited"
        class="item"
      >
        <el-button @click="load(0)" size="small">待审核</el-button>
      </el-badge>
      <el-badge
        :value="inAudit"
        class="item"
      >
        <el-button @click="load(4)" size="small">审核中</el-button>
      </el-badge>
      <el-badge
        :value="handle"
        class="item"
      >
        <el-button  size="small">待处理</el-button>
      </el-badge>
      <el-badge class="item">
        <el-button  size="small">已撤销</el-button>
      </el-badge>
      <el-badge class="item">
        <el-button @click="load(10)" size="small">已驳回</el-button>
      </el-badge>
      <el-badge class="item">
        <el-button size="small">已完成</el-button>
      </el-badge>
    </div>
    <div class="bottom">
      <v-table
        ref="companysTable"
        is-horizontal-resize
        column-width-drag
        :multiple-sort="false"
        style="width:100%;min-height:200px;"
        :columns="columns"
        :table-data="tableData"
        row-hover-color="#eee"
        :select-all="selectALL"
        :select-group-change="selectGroupChange"
        :row-dblclick="details"
        row-click-color="#edf7ff"
      >
      </v-table>
      <div
        class="mt20 mb20 bold"
        style="text-align:center;margin-top:30px"
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
  name: "Test",
  data() {
    return {
      audited:"",
      inAudit:"",
      handle:"",
      pageIsOk:true,
      pageIndex: 1,
      pageSize: 10,
      totalNub: "",
      tableData: [],
      tableDate: [],
      columns: [
        {
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        {
          field: "workNo",
          title: "工单编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
          //   orderBy: ""
        },
        {
          field: "state",
          title: "工单状态",
          width: 70,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "workType",
          title: "工单类型",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "workDesc",
          title: "工单描述",
          width: 200,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "workCauseAnalysis",
          title: "原因分析",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "deviceNames",
          title: "设备名称",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "gmtCreate",
          title: "工单创建时间",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ]
    };
  },
  methods: {
    selectGroupChange(selection) {
      console.log("select-group-change", selection);
    },
    selectALL(selection) {
      console.log("select-aLL", selection);
    },
    selectChange(selection, rowData) {
      console.log("select-change", selection, rowData);
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
      console.log(pageIndex);
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      if(this.pageIsOk){
        this.load(-1);
      }
    },
    details(rowIndex, rowData, column) {
      this.$router.push({
        path: "/BreakdownOrder"
      });
      this.$store.commit("workOrders", rowData);
    },

    load(stateNum) {
      if(stateNum === -1){
        this.pageIsOk = true;
      }else if (stateNum === 0){
        this.pageIsOk = false;
      }else if (stateNum === 1){
        this.pageIsOk = false;
      }else if (stateNum === 2){
        this.pageIsOk = false;
      }else if (stateNum === 3){
        this.pageIsOk = false;
      }else if (stateNum === 4){
        this.pageIsOk = false;
      }else if (stateNum === 5){
        this.pageIsOk = false;
      }else if (stateNum === 6){
        this.pageIsOk = false;
      }
      this.Axios(
        {
          params: {
            state:stateNum,
            page: this.pageIndex,
            size:this.pageSize
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
        ({type, info}) => {

        })
    },
    loadValue(value){
      for (let i in value){
        if (value[i].workType === 0){
          this.tableData[i].workType = "检修";
        }
        if (value[i].workType === 1){
          this.tableData[i].workType = "保养";
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
          this.tableData[i].state = "停用";
        }
        if (value[i].state === 10) {
          this.tableData[i].state = "已驳回";
        }
      }
    },
  },
  created(){
    this.load(0);
  },
  mounted() {}
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
  font-size: 14px;
  .top {
    border: @border;
    padding: 10px;
    border-radius: 5px;
    .el-badge:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>

