<template>
  <div class="turnaround-plans">
    <div class="userCase">
      <div class="top">
        <el-button
          size="small"
          @click="toUpkeepAdd"
        >添加</el-button>
        <el-button
          size="small"
          @click="outerVisibleIsOk"
        >审核</el-button>
        <el-dialog
          title="审核"
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
                  v-model="formLabelAlign.name"
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
              @click="outerVisible = false"
              size="mini"
            >取 消</el-button>
            <el-button
              @click="submitAudit"
              type="primary"
              size="mini"
            >提交</el-button>
          </div>
        </el-dialog>
        <el-button
          size="small"
          @click="stopDiscontinuation"
        >停止</el-button>
        <el-button
          size="small"
          @click="deleteMaintenance"
        >删除</el-button>
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
            style="width:100%;min-height:400px;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            @on-custom-comp="customCompFunc"
          ></v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:center;margin-top:30px;"
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
          isResize: true
          //   orderBy: ""
        },
        {
          field: "state",
          title: "当前状态",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "maintenanceType",
          title: "保养分类",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "maintenanceLevel",
          title: "保养级别",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "startTime",
          title: "开始日期",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "endTime",
          title: "结束日期",
          width: 70,
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
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "maintenanceCc",
          title: "保养内容",
          width: 200,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "creator",
          title: "计划制定人",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
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
    customCompFunc(params) {
      console.log(params);

      if (params.type === "delete") {
        // do delete operation

        this.$delete(this.tableData, params.index);
      } else if (params.type === "edit") {
        // do edit operation

        alert(`行号：${params.index} 姓名：${params.rowData["name"]}`);
      } else if (params.type === "stop") {
        // do edit operation

        alert(`ID：${params.rowData["id"]} 姓名：${params.rowData["name"]}`);
      }
    },
    toAmend(rowIndex, rowData, column) {
      this.$store.commit("upkeepAmend", rowData);
      this.$router.push({
        path: "/UpkeepAmend"
      });
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
      this.Axios(
        {
          params: {
            page: this.pageIndex,
            size: this.pageSize
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
          this.tableData[i].state = "已通过";
        }
        if (this.tableData[i].state === 2) {
          this.tableData[i].state = "已禁用";
        }
        if (this.tableData[i].state === 3) {
          this.tableData[i].state = "已删除";
        }
        if (this.tableData[i].state === 4) {
          this.tableData[i].state = "审核中";
        }
        if (this.tableData[i].state === 5) {
          this.tableData[i].state = "停用";
        }
        if (this.tableData[i].state === 10) {
          this.tableData[i].state = "已驳回";
        }
        if (this.tableData[i].maintenanceType === 0) {
          this.tableData[i].maintenanceType = "维修";
        }
        if (this.tableData[i].maintenanceType === 1) {
          this.tableData[i].maintenanceType = "保养";
        }
        if (this.tableData[i].frequencyType === 0) {
          this.tableData[i].frequencyType = "天";
        }
        if (this.tableData[i].frequencyType === 1) {
          this.tableData[i].frequencyType = "周";
        }
        if (this.tableData[i].frequencyType === 2) {
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
    //审核操作
    submitAudit() {
      this.formLabelAlign.type
        ? (this.formLabelAlign.type = 0)
        : (this.formLabelAlign.type = 1);
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
          this.arr = "";
          this.load();
          this.outerVisible = false;
        },
        ({ type, info }) => {}
      );
    },
    outerVisibleIsOk() {
      if (this.arr.length === 1) {
        this.outerVisible = true;
      } else if (this.arr.length === 0) {
        alert("请选择计划");
      } else {
        alert("抱歉只能计划只能单个修改");
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
        <a href="" @click.stop.prevent="update(rowData,index)" style="text-decoration: none;">修改</a>&nbsp;
        <a href="" @click.stop.prevent="stop(rowData,index)" style="text-decoration: none;">停止</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)" style="text-decoration: none;">删除</a>
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
