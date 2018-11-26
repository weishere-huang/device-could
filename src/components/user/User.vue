<template>
  <div class="userManagement">
    <div class="userCase">
      <div class="top">
        <el-button size="small">启用</el-button>
        <el-button size="small">停用</el-button>
        <el-button size="small" @click="deleteUser">删除</el-button>
        <div class="search">
          <el-input type="search" placeholder="如员工编号，姓名，手机" size="small"></el-input>
          <el-button size="small">搜索</el-button>
        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table :select-all="selectALL" :select-group-change="selectGroupChange" is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px;">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="50" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
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
      pageIndex: 1,
      pageSize: 10,
      userIds: "",
      tableData: [
        {
          name: "111",
          phone: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
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
          field: "id",
          title: "企业名臣",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "tel",
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
          field: "userName",
          title: "邮箱",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },

        {
          field: "gmtCreate",
          title: "创建时间",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "用户状态",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        // {
        //   field: "gmtModified",
        //   title: "最后登录时间",
        //   width: 80,
        //   titleAlign: "center",
        //   columnAlign: "left",
        //   isResize: true
        // },
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
    deleteUser() {
      let qs = require("qs");
      let data = qs.stringify({
        userIds: this.userIds
      });
      axios
        .put("/api/employee/enableOrDisable", data)
        .then(response => {
          console.log(response.data.msg);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectGroupChange(selection) {
      console.log("select-group-change", selection);
    },
    selectALL(selection) {
      this.userIds = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.userIds != "") {
          this.userIds += "," + selection[i].userId;
        } else {
          this.userIds += selection[i].userId;
        }
      }
      console.log("select-aLL", selection);
    },
    selectChange(selection, rowData) {
      this.userIds = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.userIds != "") {
          this.userIds += "," + selection[i].userId;
        } else {
          this.userIds += selection[i].userId;
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
      let qs = require("qs");
      let data = qs.stringify({
        page: this.pageIndex,
        size: this.pageSize
      });
      axios
        .get("/api/user/all", data)
        .then(response => {
          this.tableData = response.data.data;
          this.tableDate = response.data.data;
          // console.log(response.data)
          // console.log(this.tableData)
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
