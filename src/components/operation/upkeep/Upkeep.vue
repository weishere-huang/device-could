<template>
  <div class="turnaround-plans">
    <div class="userCase">
      <div class="top">
        <el-button
          size="small"
          type="primary"
          @click="toUpkeepAdd"
        >添加</el-button>
        <el-button
          size="small"
          type="primary"
          @click="outerVisibleIsOk"
        >审核</el-button>
        <el-dialog
          title="审核"
          :beforeClose="cancel"
          :visible.sync="outerVisible"
        >
          <el-form
            label-position=right
            label-width="120px"
            :model="formLabelAlign"
          >
            <el-form-item label="审批结果：">
              <el-radio
                v-model="formLabelAlign.radio"
                label="0"
              >同意</el-radio>
              <el-radio
                v-model="formLabelAlign.radio"
                label="1"
              >驳回</el-radio>
            </el-form-item>
            <el-form-item label="审批意见：">
              <el-input
                type="textarea"
                v-model="formLabelAlign.desc"
              ></el-input>
            </el-form-item>
            <div v-if="formLabelAlign.radio!=1">
              <el-form-item label="是否终审：">
                <el-checkbox-group v-model="formLabelAlign.type">
                  <el-checkbox
                    label=""
                    name="type"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item
                label="下一级审批人："
                v-if="formLabelAlign.type!=true"
              >
                <el-input
                  v-model="toAudit.name"
                  size="mini"
                  style="width:60%"
                ></el-input>
                <el-button
                  type="primary"
                  @click="innerVisible = true"
                  size="mini"
                >添加审批人</el-button>
              </el-form-item>
            </div>
          </el-form>
          <el-dialog
            title="人员添加"
            :visible.sync="innerVisible"
            append-to-body
          >
            <personnel v-on:getPersonnel="getPersonnel"></personnel>
          </el-dialog>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              @click="cancel"
              type="primary"
              size="mini"
            >取 消</el-button>
            <el-button
              @click="submitAudit"
              type="primary"
              size="mini"
            >提交</el-button>
          </div>
        </el-dialog>
        <!-- <el-button
          size="small"
          type="primary"
          @click="stopDiscontinuation"
          style="margin-left: 10px;"
        >停止</el-button>
        <el-button
          size="small"
          type="primary"
          @click="deleteMaintenance"
        >删除</el-button> -->
      </div>
      <div class="bottom">
        <div>
          <v-table
            :row-dblclick="toAmend"
            :select-all="selectALL"
            :select-group-change="selectGroupChange"
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            @on-custom-comp="customCompFunc"
            ref="upkeepTable"
          ></v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:left;margin-top:20px;"
          >
            <v-pagination
              @page-change="pageChange"
              @page-size-change="pageSizeChange"
              :total="pageNumber"
              :page-size="pageSize"
              :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import audit from "./AuditUPkeep";
import personnel from "./PersonnelUpkeep";
import Vue from "vue";
export default {
  data() {
    return {
      arr: [],
      toAudit: "",
      radio: "",
      formLabelAlign: {
        desc: "",
        type: "",
        radio: "",
        name: ""
      },
      outerVisible: false,
      innerVisible: false,
      pageNumber: 0,
      pageIndex: 1,
      pageSize: 10,
      maintenanceIds: "",
      //保养分类
      planType: [],
      //保养级别
      planLevel: [],
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
          field: "planName",
          title: "计划名称",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
          //   orderBy: ""
        },
        {
          field: "state",
          title: "当前状态",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "maintenanceType",
          title: "保养分类",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "maintenanceLevel",
          title: "保养级别",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "startTime",
          title: "开始日期",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "endTime",
          title: "结束日期",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "executeTime",
          title: "首次执行时间",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "frequencyType",
          title: "计划频次",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "maintenanceCc",
          title: "保养内容",
          width: 200,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "creator",
          title: "计划制定人",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "custome-adv",
          title: "操作",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          componentName: "table-upkeep"
          // isResize: true
        }
      ]
    };
  },
  methods: {
    cancel(){
      this.outerVisible = false;
      this.formLabelAlign.desc="";
      this.formLabelAlign.type="";
      this.formLabelAlign.radio="";
      this.maintenanceIds="";
      this.toAudit="";
    },
    customCompFunc(params) {
      // console.log(params);

      if (params.type === "delete") {
        // do delete operation
        this.deleteMaintenanceOne(params.rowData["id"]);
        // this.$delete(this.tableData, params.index);
      } else if (params.type === "edit") {
        // do edit operation
        this.toAmend(params.index, params.rowData);
        // alert(`行号：${params.index} 姓名：${params.rowData["name"]}`);
      } else if (params.type === "stop") {
        // do edit operation
        this.stopDiscontinuationOne(
          params.rowData["id"],
          params.rowData["state"]
        );
        // alert(`ID：${params.rowData["id"]} 姓名：${params.rowData["name"]}`);
      }
    },
    toAmend(rowIndex, rowData, column) {
      if(rowData.state=="待审核"){
        this.$store.commit("upkeepAmend", rowData);
        this.$router.push("/UpkeepAmend/" + rowData.id);
      }else{
        this.$message.error('只能修改待审核状态的计划')
      }
    },
    toUpkeepAdd() {
      this.$router.push({
        path: "/UpkeepAdd"
      });
    },
    selectGroupChange(selection) {
      this.arr = selection;
      this.maintenanceIds = "";
      for (let i in selection) {
        if (this.maintenanceIds === "") {
          this.maintenanceIds = selection[i].id;
        } else {
          this.maintenanceIds += "," + selection[i].id;
        }
      }
    },
    selectALL(selection) {
      this.arr = selection;
      this.maintenanceIds = "";
      for (let i in selection) {
        if (this.maintenanceIds === "") {
          this.maintenanceIds = selection[i].id;
        } else {
          this.maintenanceIds += "," + selection[i].id;
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
      this.load();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      this.load();
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
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.upkeepTable.resize();
        }, 500);
      });
      this.Axios(
        {
          params: {
            page: this.pageIndex,
            size: this.pageSize,
            maintenanceType: 1
          },
          type: "get",
          url: "/mplan/allPlan"
        },
        this
      ).then(
        response => {
          this.pageNumber = response.data.data.totalElements;
          this.loadValue(response.data.data.content);
        },
        ({ type, info }) => {}
      );
    },
    loadValue(value) {
      let arr = new Array();
      for (let i = 0; i < value.length; i++) {
        if (value[i].maintenanceType === 1) {
          arr[arr.length] = value[i];
        }
      }
      this.tableData = arr;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].state === 0) {
          this.tableData[i].state = "待审核";
        }
        if (this.tableData[i].state === 1) {
          this.tableData[i].state = "执行中";
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
        if (this.tableData[i].state === 6) {
          this.tableData[i].state = "已消除";
        }
        if (this.tableData[i].state === 7) {
          this.tableData[i].state = "已撤销";
        }
        if (this.tableData[i].state === 10) {
          this.tableData[i].state = "审批被驳回";
        }
        if (this.tableData[i].state === 10) {
          this.tableData[i].state = "已停止";
        }
        if (this.tableData[i].state === 14) {
          this.tableData[i].state = "已完成";
        }
        if (this.tableData[i].maintenanceType === 0) {
          this.tableData[i].maintenanceType = "维修";
        }
        if (this.tableData[i].maintenanceType === 1) {
          this.tableData[i].maintenanceType = "保养";
        }
        if (this.tableData[i].frequencyType === -1) {
          this.tableData[i].frequencyType = "单次";
        }
        if (this.tableData[i].frequencyType === 1) {
          this.tableData[i].frequencyType = "天";
        }
        if (this.tableData[i].frequencyType === 2) {
          this.tableData[i].frequencyType = "周";
        }
        if (this.tableData[i].frequencyType === 3) {
          this.tableData[i].frequencyType = "月";
        }
        for (let j in this.planLevel) {
          if (this.tableData[i].maintenanceLevel === this.planLevel[j].id) {
            this.tableData[i].maintenanceLevel = this.planLevel[j].levelDesc;
          }
        }
      }
    },
    listMaintenanceLevel() {
      this.Axios(
        {
          params: {},
          type: "get",
          url: "/mplan/listMaintenanceLevel"
        },
        this
      ).then(
        response => {
          this.planLevel = response.data.data;
        },
        ({ type, info }) => {}
      );
    },
    deleteMaintenance() {
      this.$confirm("计划一旦删除将无法恢复，请确认选择", "提示").then(_ => {
        let qs = require("qs");
        let data = qs.stringify({ maintenanceIds: this.maintenanceIds });
        this.Axios(
          {
            params: data,
            type: "post",
            url: "/mplan/delete"
          },
          this
        ).then(
          response => {
            this.load();
          },
          ({ type, info }) => {}
        );
      });
    },
    deleteMaintenanceOne(maintenanceId) {
      this.$confirm("计划一旦删除将无法恢复，请确认选择", "提示").then(_ => {
        let qs = require("qs");
        let data = qs.stringify({ maintenanceIds: maintenanceId });
        this.Axios(
          {
            params: data,
            type: "post",
            url: "/mplan/delete"
          },
          this
        ).then(
          response => {
            this.load();
          },
          ({ type, info }) => {}
        );
      });
    },
    stopDiscontinuation() {
      this.$confirm("计划一旦停用将无法撤销，请确认选择", "提示").then(_ => {
        let qs = require("qs");
        let data = qs.stringify({ maintenanceIds: this.maintenanceIds });
        this.Axios(
          {
            params: data,
            type: "post",
            url: "/mplan/discontinuation"
          },
          this
        ).then(
          response => {
            this.load();
          },
          ({ type, info }) => {}
        );
      });
    },
    stopDiscontinuationOne(maintenanceId, state) {
      if (state !== "待审核") {
        this.$confirm("计划一旦停用将无法撤销，请确认选择", "提示").then(_ => {
          let qs = require("qs");
          let data = qs.stringify({ maintenanceIds: maintenanceId });
          this.Axios(
            {
              params: data,
              type: "post",
              url: "/mplan/discontinuation"
            },
            this
          ).then(
            response => {
              this.load();
            },
            ({ type, info }) => {}
          );
        });
      } else if (state === "停用") {
        alert("该计划已经停用");
      } else {
        alert("不能停用待审核状态的计划");
      }
    },
    //审核操作
    submitAudit(){
      if (this.formLabelAlign.radio!=1){
        if (this.formLabelAlign.type ||!this.toAudit =="") {
          this.toSubmitAudit();
        }else{
          this.$message.error('请选择终审或添加下一审核人')
        }
      }else{
        this.toSubmitAudit();
      }
    },

    toSubmitAudit() {
      this.formLabelAlign.type ? (this.formLabelAlign.type = 0) : (this.formLabelAlign.type = 1);
      this.Axios(
        {
          params: {
            passOrTurn: this.formLabelAlign.radio,
            maintenanceId: this.maintenanceIds,
            isEndAudit: this.formLabelAlign.type,
            auditOpinion: this.formLabelAlign.desc,
            nextUserId: this.toAudit.id
          },
          type: "get",
          url: "/mplan/maintenanceAudit"
        },
        this
      ).then(
        response => {
          this.arr=[];
          this.cancel();
          this.load();
        },
        ({ type, info }) => {
          this.cancel();
        }
      );
    },
    outerVisibleIsOk() {
      if (this.arr.length === 1) {
        this.outerVisible = true;
      } else if (this.arr.length === 0) {
        this.$message.error("请选择计划")
      }
    },
    getPersonnel(params) {
      this.toAudit = params.person;
      this.innerVisible = params.hide;
    }
  },
  created() {
    this.listMaintenanceLevel();
    this.load();
  },
  components: {
    audit,
    personnel
  }
};
Vue.component("table-upkeep", {
  template: `<span>
        <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <a href="" style="text-decoration: none;color:#409eff"><i @click.stop.prevent="update(rowData,index)" style='font-size:16px' class='iconfont'>&#xe6b4;</i></a>
        </el-tooltip>
        &nbsp;
        <el-tooltip class="item" effect="dark" content="停止" placement="top">
            <a href="" style="text-decoration: none;color:#409eff"><i @click.stop.prevent="stop(rowData,index)" style='font-size:16px' class='iconfontz'>&#xe60c;</i></a>
        </el-tooltip>
        &nbsp;
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <a href="" style="text-decoration: none;color:#F56C6C"><i @click.stop.prevent="deleteRow(rowData,index)" style='font-size:16px' class='iconfont'>&#xe66b;</i></a>
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
    update() {
      // 参数根据业务场景随意构造
      let params = { type: "edit", index: this.index, rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    },
    deleteRow() {
      // 参数根据业务场景随意构造
      let params = { type: "delete", rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    },
    stop() {
      let params = { type: "stop", rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    }
  }
});
</script>

<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
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
