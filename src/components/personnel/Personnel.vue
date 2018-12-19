<template>
  <div class="userManagement">
    <div class="userCase">
      <div class="top">
        <el-button
          size="small"
          type="primary"
          @click="PersnnelAdd"
        ><i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;添加</el-button>
        <!-- <el-button
          size="small"
          type="primary"
          @click="updateEmployee"
        >修改</el-button>
        <el-button
          size="small"
          type="primary"
          @click="disable"
        >启用</el-button>
        <el-button
          size="small"
          type="primary"
          @click="enable"
        >禁用</el-button>
        <el-button
          size="small"
          type="primary"
          @click="deleteEmployee"
        >删除</el-button> -->
        <div class="search">
          <el-input
            type="search"
            placeholder="如员工姓名，手机，部门，岗位"
            size="small"
            v-model="searchs"
            @keyup.enter.native="search"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            @click="search"
          ><i class='el-icon-search'></i>&nbsp;搜索</el-button>
        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table
            :row-dblclick="modefication"
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
            ref="personnelTable"
          ></v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:left;margin-top:20px"
          >
            <v-pagination
              @page-change="pageChange"
              @page-size-change="pageSizeChange"
              :total="pageNumber"
              :pageIndex="pageIndex"
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
import Vue from "vue";
export default {
  data() {
    return {
      isPageOk:true,
      searchs: "",
      pageIndex: 1,
      pageSize: 10,
      pageNumber: "",
      tableData: [],
      tableDate: [],
      userIds: "",
      values: "",
      columns: [
        {
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        {
          field: "employeeNo",
          title: "员工编号",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
          //   orderBy: ""
        },
        {
          field: "name",
          title: "姓名",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "phone",
          title: "手机号",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "userName",
          title: "用户名",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "organizeName",
          title: "组织单位/部门",
          width: 250,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "position",
          title: "岗位",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "entryTime",
          title: "入职日期",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "state",
          title: "状态",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowData.state === "0"
              ? "正常"
              : "停用"
          },
          componentName: "switch-personnel"
        },
        {
          field: "custome-adv",
          title: "操作",
          width: 130,
          titleAlign: "center",
          columnAlign: "center",
          componentName: "table-person"
          // isResize: true
        }
      ]
    };
  },
  methods: {
    customCompFunc(params) {
      this.userIds = params.rowData["id"];
      if (params.type === "change") {
        console.log(params);
        if (params.rowData.state === "1") {
          this.choice = params.rowData.id;
          this.enable();
          
        } else if (params.rowData.state === "0") {
          this.choice = params.rowData.id;
          this.disable();
          
        }
      }
      if (params.type === "delete") {
       this.deleteEmployee();
        this.$delete(this.tableData, params.index);
      } else if (params.type === "edit") {
        this.$router.push("/Modification/"+this.userIds);
      } else if (params.type === "stop") {
        this.enable();
      } else if (params.type === "start") {
        this.disable();
      }
    },
    search() {
      if(this.searchs==""){
        this.isPageOk=true;
      }else{
        this.isPageOk=false;
      }
      this.pageIndex = 1;
      this.Axios(
        {
          params: { condition: this.searchs },
          type: "get",
          url: "/employee/search"
        },
        this
      ).then(
        response => {
          if (this.searchs !== "") {
            this.pageNumber = response.data.data.totalElements;
            this.tableData = response.data.data.content;
            for (let i in this.tableData) {
              this.tableData[i].state =String(this.tableData[i].state)
              
            }
            this.tableDate = this.tableData;
          } else {
            this.pageChange(1);
          }
        },
        ({ type, info }) => {}
      );
    },
    PersnnelAdd() {
      this.$router.push({
        path: "/PersnnelAdd"
      });
    },
    modefication(rowIndex, rowData, column) {
      this.$router.push("/Modification/" + rowData.id);
      this.$store.commit("personnel", rowData);
    },
    disable() {
      let qs = require("qs");
      let data = qs.stringify({
        employeeIds: this.userIds,
        enableOrDisable: 1
      });
      this.Axios(
        {
          params: data,
          type: "post",
          url: "/employee/enableOrDisable"
        },
        this
      ).then(
        response => {
          this.load();
        },
        ({ type, info }) => {}
      );
    },
    enable() {
      let qs = require("qs");
      let data = qs.stringify({
        employeeIds: this.userIds,
        enableOrDisable: 0
      });
      this.Axios(
        {
          params: data,
          type: "post",
          url: "/employee/enableOrDisable"
        },
        this
      ).then(
        response => {
          this.load();
        },
        ({ type, info }) => {}
      );
    },
    selectGroupChange(selection) {
      this.userIds = "";
      this.values = selection;
      for (let i = 0; i < selection.length; i++) {
        if (this.userIds === "") {
          this.userIds += selection[i].id;
        } else {
          this.userIds += "," + selection[i].id;
        }
      }
    },
    selectALL(selection) {
      this.userIds = "";
      this.values = selection;
      for (let i = 0; i < selection.length; i++) {
        if (this.userIds === "") {
          this.userIds += selection[i].id;
        } else {
          this.userIds += "," + selection[i].id;
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
      if (this.isPageOk) {
        this.load();
      }
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      if (this.isPageOk) {
        this.load();
      }
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
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.personnelTable.resize();
        }, 500);
      });
      this.Axios(
        {
          params: { page: this.pageIndex, size: this.pageSize },
          type: "get",
          url: "/employee/findEmployeeList"
        },
        this
      ).then(
        response => {
          this.pageNumber = response.data.data.totalElements;
          this.tableData = response.data.data.content;
          for (let i in this.tableData) {
            this.tableData[i].state =String(this.tableData[i].state)
          }
          this.tableDate = this.tableData;
        },
        ({ type, info }) => {}
      );
    },
    deleteEmployee() {
      this.$confirm('此操作将删除该角色, 是否继续?', '提示')
        .then(_=>{
          let qs = require("qs");
          let data = qs.stringify({
            employeeIds: this.userIds,
            enableOrDisable: 2
          });

          this.Axios(
            {
              params: data,
              type: "post",
              url: "/employee/enableOrDisable"
            },
            this
          ).then(
            response => {
              this.load();
            },
            ({ type, info }) => {}
          );
        })
        .catch(_=>{
          console.log("stop")
        })



    },
    updateEmployee() {
      if (this.values.length === 1) {
        this.$router.push("/Modification/" + this.values[0].id);
        // this.$store.commit("personnel", this.values[0]);
      } else {
        alert("抱歉、只能单个修改");
      }
    }
  },
  created() {
    this.load();
  }
};
Vue.component("switch-personnel", {
  template: `<span>
      <el-switch
        v-model="rowData.state"
        active-value="0"
        inactive-value="1"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="changeValue(rowData,index)"
        >
      </el-switch>
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
    changeValue() {
      let params = { type: "change", rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    }
  }
});
Vue.component("table-person", {
  template: `<span>
          <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <a href="" style="text-decoration: none;color:#409eff"><i @click.stop.prevent="update(rowData,index)" style='font-size:16px' class='iconfont'>&#xe6b4;</i></a>
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
    },
    startUsing() {
      let params = { type: "start", rowData: this.rowData };
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
.userManagement {
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

