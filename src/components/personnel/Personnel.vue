<template>
  <div class="userManagement">
    <div class="userCase">
      <div class="top">
        <el-button size="small" @click="PersnnelAdd">添加</el-button>
        <el-button size="small" @click="disable">启用</el-button>
        <el-button size="small" @click="enable">禁用</el-button>
        <div class="search">
          <el-input type="search" placeholder="如员工编号，姓名，手机，部门，岗位" size="small" v-model="searchs"></el-input>
          <el-button size="small" @click="search">搜索</el-button>

        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table :row-dblclick="modefication" :select-all="selectALL" :select-group-change="selectGroupChange"
                   is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;"
                   :columns="columns" :table-data="tableData" row-hover-color="#eee"
                   row-click-color="#edf7ff"></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="tableData.length"
                          :page-size="pageSize"
                          :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
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
        searchs: "",
        pageIndex: 1,
        pageSize: 10,
        tableData: [],
        tableDate: [],
        userIds: "",
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
            width: 90,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
            //   orderBy: ""
          },
          {
            field: "name",
            title: "姓名",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "phone",
            title: "手机号",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "name",
            title: "用户名",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "organizeName",
            title: "组织单位/部门",
            width: 250,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "position",
            title: "岗位",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "entryTime",
            title: "入职日期",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "state",
            title: "状态",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          }
        ]
      };
    },
    methods: {
      search() {
        this.axios
          .get(this.global.apiSrc + "/employee/search", {
            params: {condition: this.searchs}
          })
          .then(response => {
            this.tableData = response.data.data.content;
            for (let i in this.tableData) {
              this.tableData[i].state === -1
                ? (this.tableData[i].state = "禁用")
                : (this.tableData[i].state = "正常");
              this.tableData[i].entryTime = this.tableData[i].entryTime.split("T")[0];
            }
            this.tableDate = this.tableData;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      PersnnelAdd() {
        this.$router.push({
          path: "/PersnnelAdd"
        });
      },
      modefication(rowIndex, rowData, column) {
        this.$router.push({
          path: "/Modification"
        });
        this.$store.commit("personnel", rowData);
      },
      disable() {
        let qs = require("qs");
        let data = qs.stringify({
          employeeIds: this.userIds,
          enableOrDisable: 1
        });
        this.axios
          .post(this.global.apiSrc + "/employee/enableOrDisable", data)
          .then(response => {
            if (response.data.msg === "成功") {
              alert("成功");
              this.load();
            } else {
              alert("失败");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.axios
          .post(this.global.apiSrc + "/employee/enableOrDisable", data)
          .then(response => {
            if (response.data.msg === "成功") {
              alert("成功");
              this.load();
            } else {
              alert("失败");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      enable() {
        let qs = require("qs");
        let data = qs.stringify({
          employeeIds: this.userIds,
          enableOrDisable: 0
        });
        this.axios
          .post(this.global.apiSrc + "/employee/enableOrDisable", data)
          .then(response => {
            if (response.data.msg === "成功") {
              alert("成功");
              this.load();
            } else {
              alert("失败");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      selectGroupChange(selection) {
        this.userIds = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.userIds === "") {
            this.userIds += selection[i].id;
          } else {
            this.userIds += "," + selection[i].id;
          }
        }

      },
      selectALL(selection){
        this.userIds = "";
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
        // console.log(pageIndex);
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
      },
      sortChange(params) {
        if (params.height.length > 0) {
          this.tableConfig.tableData.sort(function (a, b) {
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
          .get(this.global.apiSrc + "/employee/findEmployeeList", {
            params: {page: this.pageIndex, size: 10}
          })
          .then(response => {
            this.tableData = response.data.data.content;
            // console.log(this.tableData);
            for (let i in this.tableData) {
              this.tableData[i].state === -1
                ? (this.tableData[i].state = "禁用")
                : (this.tableData[i].state = "正常");
            }
            this.tableDate = this.tableData;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    created() {
      this.load();
    }
  };
</script>
<style lang="less" scoped>
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  .userManagement {
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
