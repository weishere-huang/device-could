<template>
  <div class="userManagement">
    <div class="userCase">
      <div class="top">
        <el-button
          size="small"
          @click="enable"
        >启用</el-button>
        <el-button
          size="small"
          @click="prohibit"
        >停用</el-button>
        <el-button
          size="small"
          @click="deleteUser"
        >删除</el-button>
        <div class="search">
          <el-input
            type="search"
            placeholder="如员工编号，姓名，手机"
            size="small"
            v-model="keyWord"
          ></el-input>
          <el-button
            size="small"
            @click="findByKeyWord"
          >搜索</el-button>
        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table
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
              :total="totalNub"
              :page-size="pageSize"
              :page-index="pageIndex"
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
  inject:['reload'],
  data() {
    return {
      searchParams: {},
      choice: "",
      pageIndex: 1,
      pageSize: 10,
      userIds: "",
      keyWord: "",
      tableData: [
        {
          companyName: ""
        }
      ],
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
          width: 90,
          titleAlign: "center",
          columnAlign: "center",
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
          columnAlign: "center",
          isResize: true
        },
        {
          field: "state",
          title: "用户状态",
          width: 80,
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
          componentName: "table-user"
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
      } else if (params.type === "start") {
        // do edit operation
        alert(`行号：${params.index} 姓名：${params.rowData["name"]}`);
      } else if (params.type === "stop") {
        // do edit operation
        alert(`ID：${params.rowData["id"]} 姓名：${params.rowData["name"]}`);
      }
    },
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
    enable() {
      let qs = require("qs");
      let data = qs.stringify({
        userIds: this.choice
      });
      this.Axios(
        {
          url: "/user/enableUser",
          params: data,
          type: "post",
          option: { enableMsg: false }
        },
        this
      ).then(
        response => {
          this.$message({
            message: "启用成功",
            type: "success"
          });
          // this.load();
          this.reload()
        },
        ({ type, info }) => {}
      );
    },
    prohibit() {
      let qs = require("qs");
      let data = qs.stringify({
        userIds: this.choice
      });
      this.Axios(
        {
          url: "/user/discontinuationUser",
          params: data,
          type: "post",
          option: { enableMsg: false }
        },
        this
      ).then(
        response => {
          this.$message({
            message: "禁用成功",
            type: "success"
          });
          // this.load();
          this.reload()
        },
        ({ type, info }) => {}
      );
    },
    deleteUser() {
      let qs = require("qs");
      let data = qs.stringify({
        userIds: this.choice
      });
      this.Axios(
        {
          url: "/user/deleteUsers",
          params: data,
          type: "post",
          option: { enableMsg: false }
        },
        this
      ).then(
        response => {
          this.load();
          this.$message({
            message: "您已经删除该用户",
            type: "success"
          });
        },
        ({ type, info }) => {}
      );
    },
    findByKeyWord() {
      this.Axios(
        {
          url: "/user/findByKeyWord/",
          params: Object.assign(this.searchParams, {
            keyWord: this.keyWord,
            page: 1,
            size: this.pageSize
          }),
          type: "get"
        },
        this
      ).then(
        response => {
          this.pageIndex = 1;
          this.totalNub = response.data.data.totalElements;
          this.tableData = response.data.data.content;
          for (let i = 0; i < response.data.data.content.length; i++) {
            this.tableData[i].state === 0
              ? (this.tableData[i].state = "正常")
              : (this.tableData[i].state = "停用");
          }
          console.log(this.pageIndex);
          console.log(response);
        },
        ({ type, info }) => {}
      );
    },

    load() {
      // EventBus.$on("sideBarTroggleHandle", isCollapse => {
      //   window.setTimeout(() => {
      //     this.$refs.companysTable.resize();
      //   }, 500);
      // });
      this.Axios(
        {
          url: "/user/findByKeyWord/",
          params: Object.assign(this.searchParams, {
            page: this.pageIndex,
            size: this.pageSize
          }),
          type: "get",
          option: { enableMsg: false }
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      ).then(
        response => {
          console.log(response);
          // this.pageIndex=1
          this.totalNub = response.data.data.totalElements;
          this.tableData = response.data.data.content;

          for (let i = 0; i < response.data.data.content.length; i++) {
            this.tableData[i].state === 0
              ? (this.tableData[i].state = "正常")
              : (this.tableData[i].state = "停用");
          }
          console.log(this.tableDate);
        },
        ({ type, info }) => {}
      );
    }
  },
  created() {
    this.load();
  }
};
Vue.component("table-user", {
  template: `<span>
        <a href="" @click.stop.prevent="startUsing(rowData,index)" style="text-decoration: none;">启用</a>&nbsp;
        <a href="" @click.stop.prevent="stop(rowData,index)" style="text-decoration: none;">停用</a>&nbsp;
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
    startUsing() {
      // 参数根据业务场景随意构造
      let params = { type: "start", index: this.index, rowData: this.rowData };
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
.userManagement {
  // padding-left: 220px;
  .userCase {
    width: 100%;
    padding: 10px;
    font-size: 12px;
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
