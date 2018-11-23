<template>
  <div class="turnaround-plans">
    <div class="userCase">
      <div class="top">
        <el-button size="small" @click="toPansAdd">添加</el-button>
        <el-button size="small"@click="stopDiscontinuation">停止</el-button>
        <el-button size="small" @click="deleteMaintenance">删除</el-button>
      </div>
      <div class="bottom">
        <div>
          <v-table :row-dblclick="toAmend" :select-all="selectALL" :select-group-change="selectGroupChange" is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px;">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="pageNumber" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageNumber:0,
      pageIndex: 1,
      pageSize: 10,
      userId:3,
      maintenanceIds:"",
      //检修分类
      planType:[],
      //检修级别
      planLevel:[],
      tableData: [
        {
          id:"",
          planName: "",
          state: "",
          maintenanceType:"",
          maintenanceLevel:"",
          startTime:"",
          endTime:"",
          executeTime:"",
          frequencyType:"",
          maintenanceCc:"",
          creator:""
        }
      ],
      tableDate: [],
      columns: [
        {
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        {
          field: "planName",
          title: "计划名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
          //   orderBy: ""
        },
        {
          field: "state",
          title: "当前状态",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "maintenanceType",
          title: "检修分类",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "maintenanceLevel",
          title: "检修级别",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "startTime",
          title: "开始日期",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "endTime",
          title: "结束日期",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "executeTime",
          title: "首次执行时间",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "frequencyType",
          title: "计划频次",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "maintenanceCc",
          title: "检修内容",
          width: 200,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "creator",
          title: "计划制定人",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ]
    };
  },
  methods: {
    toAmend(rowIndex, rowData, column) {
      // 传值给修改
      this.$store.commit("turnaroundPlans", rowData);
      this.$router.push({
        path: "/TurnaroundPlansAmend"
      });
    },
    toPansAdd() {
      this.$router.push({
        path: "/TurnaroundPlansAdd"
      });
    },
    selectGroupChange(selection) {
      this.maintenanceIds = "";
      for(let i in selection){
        if(this.maintenanceIds === ""){
          this.maintenanceIds = selection[i].id;
        }else{
          this.maintenanceIds += ","+selection[i].id;
        }
      }
    },
    selectALL(selection) {
      this.maintenanceIds = "";
      for(let i in selection){
        if(this.maintenanceIds === ""){
          this.maintenanceIds = selection[i].id;
        }else{
          this.maintenanceIds += ","+selection[i].id;
        }
      }
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
    },
    sortChange(params) {
      if (params.height.length > 0) {
        this.tableConfig.tableData.sort(function(a, b) {
          if (params.height === "asc") {
            return a.height - b.height;
          } else if (params.height === "desc") {
            return b.height - a.height;
          } else {
            return 0;
          }
        });
      }
    },

    load(){
      this.axios
        .get(this.global.apiSrc+"/mplan/allPlan",{params:{
            userId:this.userId,
            page:this.pageIndex,
            size:this.pageSize
          }})
        .then(response =>{
          this.tableData = response.data.data.content;
          this.pageNumber = response.data.data.content.length;
          for(let i in this.tableData){
            // console.log(response.data.data.content[i].id);
            // console.log(this.tableData[i].state);
            if(this.tableData[i].state === 0 ){
              this.tableData[i].state ="待审核";
            }
            if(this.tableData[i].state === 1 ){
              this.tableData[i].state ="已通过"
            }
            if(this.tableData[i].state === 2 ){
              this.tableData[i].state ="已禁用"
            }
            if(this.tableData[i].state === 3 ){
              this.tableData[i].state ="已删除"
            }
            if(this.tableData[i].state === 4 ){
              this.tableData[i].state ="审核中"
            }
            if(this.tableData[i].maintenanceType === 0){
              this.tableData[i].maintenanceType="维修"
            }
            if(this.tableData[i].maintenanceType === 1){
              this.tableData[i].maintenanceType="保养"
            }
            if(this.tableData[i].frequencyType === 0){
              this.tableData[i].frequencyType = "每天";
            }
            if(this.tableData[i].frequencyType === 1){
              this.tableData[i].frequencyType = "每周"
            }
            if(this.tableData[i].frequencyType === 2){
              this.tableData[i].frequencyType = "每月"
            }
            this.tableData[i].endTime=this.tableData[i].endTime.replace(/T/g, " ");
            this.tableData[i].executeTime=this.tableData[i].executeTime.replace(/T/g, " ");
            this.tableData[i].startTime=this.tableData[i].startTime.replace(/T/g, " ");
            for(let j in this.planLevel ){
              if(this.tableData[i].maintenanceLevel === this.planLevel[j].id) {
                this.tableData[i].maintenanceLevel = this.planLevel[j].levelDesc;
              }
            }
          }
          this.pageNumber = this.tableData.length;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listMaintenanceLevel(){
      this.axios
        .get(this.global.apiSrc+"/mplan/listMaintenanceLevel")
        .then(response =>{
          this.planLevel = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteMaintenance(){
      let qs = require("qs");
      let data = qs.stringify({maintenanceIds:this.maintenanceIds});
      this.axios
        .post(this.global.apiSrc+"/mplan/delete", data)
        .then(response => {
          this.load()
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    stopDiscontinuation(){
      let qs = require("qs");
      let data = qs.stringify({maintenanceIds:this.maintenanceIds});
      this.axios
        .post(this.global.apiSrc+"/mplan/discontinuation", data)
        .then(response => {
          this.load()
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created(){
    this.listMaintenanceLevel();
    this.load()
  }
};
</script>

<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
.turnaround-plans {
  padding-left: 220px;
  .userCase {
    width: 100%;
    padding: 10px;
    .top {
      height: 60px;
      line-height: 60px;
      border: 1px solid @Info;
      border-radius: 5px;
      padding-left: 10px;
      .search {
        float: right;
        width: 40%;
        .el-input {
          width: 80%;
        }
      }
    }
    .bottom {
      padding: 10px;
      font-size: 12px;
      border: 1px solid @Info;
      margin-top: 10px;
      min-height: 500px;
      border-radius: 5px;
    }
  }
}
</style>
