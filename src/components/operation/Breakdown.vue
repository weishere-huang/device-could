<template>
  <div class="turnaround-plans">
    <div class="userCase">
      <div class="top">
        <el-button size="small" @click="outerVisibleIsOk">审核</el-button>
        <el-button size="small" @click="dispel">故障消除</el-button>
        <el-button size="small" @click="deleteBreak">删除</el-button>
        <div class="search">
          <el-input type="search" placeholder="如故障编码，设备名称，位号，描述" size="small" v-model="faultKey"></el-input>
          <el-button size="small" @click="search">搜索</el-button>
          <span style="padding-left:10px;">高级搜索</span>
        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table :row-dblclick="toDetails" :select-all="selectALL" :select-group-change="selectGroupChange" is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" ></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px;">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="tableData.length" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="审核" :visible.sync="outerVisible">
      <el-form label-position=right label-width="120px" :model="formLabelAlign">
          <el-form-item label="审批结果：">
            <el-radio v-model="formLabelAlign.radio" label="0">同意</el-radio>
            <el-radio v-model="formLabelAlign.radio" label="1">驳回</el-radio>
          </el-form-item>
          <el-form-item label="审批意见：">
            <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
          </el-form-item>
          <div v-if="formLabelAlign.radio!=1">
            <el-form-item label="是否终审：">
                <el-checkbox-group v-model="formLabelAlign.type">
                    <el-checkbox label="" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="下一级审批人：" v-if="formLabelAlign.type!=true">
                <el-input v-model="toAuditName.name" size="mini" style="width:60%"></el-input>
                <el-button type="primary" @click="innerVisible = true" size="mini">添加审批人</el-button>
            </el-form-item>
          </div>
        </el-form>
    <el-dialog title="人员添加" :visible.sync="innerVisible" append-to-body>
      <personnel v-on:getPersonnel="getPersonnel"></personnel>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" size="mini">提 交</el-button>
      
    </div>
  </el-dialog>
  </div>
</template>
<script>
import audit from "./breakdown/Audit";
import personnel from "./breakdown/Personnel";
export default {
  data() {
    return {
      arr:[],
      toAuditName:"",
      formLabelAlign: {
        desc:"",
        type:"",
        radio: "",
        name:""
      },
      approval:"",
      faultIds:"",
      pageNumber:0,
      outerVisible: false,
      innerVisible: false,
      faultId: "",
      faultKey: "",
      auditShow: false,
      auditdetails:"",
      pageIndex: 1,
      pageSize: 10,
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
          field: "faultNo",
          title: "故障编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
          //   orderBy: ""
        },
        {
          field: "state",
          title: "状态",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "deviceName",
          title: "设备名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "deviceSpec",
          title: "规格/型号",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "faultLevel",
          title: "故障等级",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "faultSource",
          title: "故障来源",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "faultDesc",
          title: "故障描述",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "causeAnalysis",
          title: "原因分析",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ]
    };
  },
  methods: {
    toDetails(rowIndex, rowData, column){
      this.$store.commit("breakDetails" , rowData);
      this.$router.push({path:"/BreakDetails"})
    },
    auditHide(params){
      this.auditShow=params;
    },
    toAudit() {
      this.auditShow = true;
    },
    selectGroupChange(selection) {
      this.arr = selection;
      this.faultIds="";
      for (let i=0;i<selection.length;i++){
        if(this.faultIds ===""){
          this.faultIds=selection[i].id;
        }else{
          this.faultIds+=","+selection[i].id;
        }
      }
      this.auditdetails=selection
    },
    selectALL(selection) {
      this.arr = selection;
      this.faultIds="";
      for (let i=0;i<selection.length;i++){
        if(this.faultIds ===""){
          this.faultIds=selection[i].id;
        }else{
          this.faultIds+=","+selection[i].id;
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

    load() {
      this.axios
        .get(this.global.apiSrc + "/fault/list", { params: {page: -1} })
        .then(response => {
          this.tableData = response.data.data;
          this.springReplacement();
          this.tableDate = this.tableData;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    springReplacement() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].state === 0) {
          this.tableData[i].state = "待审核";
        }
        if (this.tableData[i].state === 1) {
          this.tableData[i].state = "审核通过";
        }
        if (this.tableData[i].state === 2) {
          this.tableData[i].state = "禁用";
        }
        if (this.tableData[i].state === 3) {
          this.tableData[i].state = "已删除";
        }
        if (this.tableData[i].state === 4) {
          this.tableData[i].state = "审核中";
        }
        if (this.tableData[i].state === 5) {
          this.tableData[i].state = "待处理";
        }
        if (this.tableData[i].state === 6) {
          this.tableData[i].state = "已消除";
        }
        if (this.tableData[i].state === 7) {
          this.tableData[i].state = "已撤销";
        }
        if (this.tableData[i].state === 10) {
          this.tableData[i].state = "审批被驳回";
        }
        if (this.tableData[i].faultLevel === 1) {
          this.tableData[i].faultLevel = "低";
        }
        if (this.tableData[i].faultLevel === 2) {
          this.tableData[i].faultLevel = "中";
        }
        if (this.tableData[i].faultLevel === 3) {
          this.tableData[i].faultLevel = "高";
        }
        if (this.tableData[i].faultSource === "0") {
          this.tableData[i].faultSource = "人工提交";
        }
        if (this.tableData[i].faultSource === "1") {
          this.tableData[i].faultSource = "设备采集";
        }
      }
    },
    search() {
      this.axios
        .get(this.global.apiSrc + "/fault/search", {
          params: { keyword: this.faultKey, page: -1 }
        })
        .then(response => {
          this.tableData = response.data.data;
          this.springReplacement();
          this.tableDate = this.tableData;
          // console.log(response)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    dispel(){
      let qs = require("qs");
      let data = qs.stringify({
        faultIds:this.faultIds,
      });
      this.axios
        .post(this.global.apiSrc + "/fault/dispel",data)
        .then(response =>{
          alert(response.data.msg);
          this.load();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteBreak(){
      let qs = require("qs");
      let data = qs.stringify({
       ids:this.faultIds,
      });
      this.axios
        .post(this.global.apiSrc + "/fault/delete",data)
        .then(response =>{
          alert(response.data.msg);
          this.load();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getPersonnel(params) {
      this.toAuditName = params.person;
      this.innerVisible = params.hide;
    },
    submitAudit() {
      this.formLabelAlign.type ? this.formLabelAlign.type = 0 : this.formLabelAlign.type = 1;
      this.axios
        .get(this.global.apiSrc + "/mplan/maintenanceAudit", {
          params: {
            passOrTurn: this.formLabelAlign.radio,
            maintenanceId: this.maintenanceIds,
            isEndAudit: this.formLabelAlign.type,
            auditOpinion: this.formLabelAlign.desc,
            nextUserId: this.toAudit.id
          }
        })
        .then(response => {
          this.arr="";
          this.load();
          this.outerVisible = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    outerVisibleIsOk() {
      if (this.arr.length === 1) {
        this.outerVisible = true
      } else if(this.arr.length ===0){
        alert("请选择计划")
      }else{
        alert("抱歉只能计划只能单个修改")
      }
    },
  },
  created() {
    this.load();
  },
  components: {
    audit,
    personnel
  }
};
</script>

<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.turnaround-plans {
  // padding-left: 220px;
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
        font-size: 12px;
        .el-input {
          width: 60%;
        }
        span {
          cursor: pointer;
          &:hover {
            color: @blue;
          }
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
