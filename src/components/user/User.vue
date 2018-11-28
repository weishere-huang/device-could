<template>
  <div class="userManagement">
    <div class="userCase">
      <div class="top">
        <el-button size="small" @click="enable">启用</el-button>
        <el-button size="small" @click="prohibit">停用</el-button>
        <el-button size="small" @click="deleteUser">删除</el-button>
        <div class="search">
          <el-input type="search" placeholder="如员工编号，姓名，手机" size="small" v-model="keyWord"></el-input>
          <el-button size="small" @click="findByKeyWord">搜索</el-button>
        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table :select-all="selectALL" :select-group-change="selectGroupChange" is-horizontal-resize
                   column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns"
                   :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px;">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="this.totalNub"
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
        choice: "",
        pageIndex: 1,
        pageSize: 10,
        userIds: "",
        keyWord: "",
        tableData: [{
          companyName: "",

        }],
        totalNub: "",
        tableDate: [],
        columns: [
          {
            width: 50,
            titleAlign: "center",
            columnAlign: "center",
            type: "selection"
          },
          {
            field: "enterpriseName",
            title: "企业名称",
            width: 40,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "userName",
            title: "用户名",
            width: 90,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
            //   orderBy: ""
          },
          {
            field: "phone",
            title: "手机号",
            width: 150,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "email",
            title: "邮箱",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },

          {
            field: "createTime",
            title: "创建时间",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "state",
            title: "用户状态",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          }
        ]
      };
    },
    methods: {
      selectGroupChange(selection) {
        console.log("select-group-change", selection);
        this.choice = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.choice === "") {
            this.choice += selection[i].id;
          } else {
            this.choice += "," + selection[i].id;
          }
        }
      },
      selectALL(selection) {
        this.choice = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.choice === "") {
            this.choice += selection[i].id;
          } else {
            this.choice += "," + selection[i].id;
          }
        }
        console.log("select-aLL", selection);
      },
      selectChange(selection, rowData) {
        this.choice = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.choice === "") {
            this.choice += selection[i].id;
          } else {
            this.choice += "," + selection[i].id;
          }
        }
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
        this.load();
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
      enable() {
        let qs = require("qs");
        let data = qs.stringify({
          userIds: this.choice
        })
        this.axios.post(this.global.apiSrc + "/user/enableUser", data)
          .then(response => {
            this.load()
            console.log(response)
          }).catch(function (error) {
        });
      },
      prohibit() {
        let qs = require("qs");
        let data = qs.stringify({
          userIds: this.choice
        })
        this.axios.post(this.global.apiSrc + "/user/discontinuationUser", data)
          .then(response => {
            this.load()
            console.log(response)
          }).catch(function (error) {
        });
      },
      deleteUser() {
        let qs = require("qs");
        let data = qs.stringify({
          userIds: this.choice
        });
        this.axios
          .post(this.global.apiSrc + "/user/deleteUsers", data)
          .then(response => {
            console.log(this.data)
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      findByKeyWord() {
        this.axios.get(this.global.apiSrc + "/user/findByKeyWord/", {
          params: {
            keyWord: this.keyWord,
            page: this.pageIndex,
            size: this.pageSize
          }
        })
          .then(response => {
            this.totalNub = response.data.data.totalElements
            console.log(response)
            this.tableData = response.data.data.content;
          }).catch(function (error) {
          console.log(error)
        })
      },

      load() {
        this.axios
          .get(this.global.apiSrc + "/user/enterpriseUserAll", {params: {page: this.pageIndex, size: this.pageSize}})
          .then(response => {
            console.log(response);
            this.totalNub = response.data.data.totalElements
            this.totalNub = response.data.data.totalElements;

            for (let i = 0; i < response.data.data.content.length; i++) {
              // response.data.data.content[i].gmtCreate = response.data.data.content[i].gmtCreate.split("T")[0];
              if (response.data.data.content[i].state === 0) {
                response.data.data.content[i].state = "正常"
              }
              if (response.data.data.content[i].state === 1) {
                response.data.data.content[i].state = "停用"
              }
              if (response.data.data.content[i].state === 2) {
                response.data.data.content[i].state = "删除"
              }
            }
            this.tableData = response.data.data.content;
            // console.log(this.tableDate)
          })
          .catch(function(error) {
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
  }
}
</style>
