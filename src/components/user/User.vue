<template>
  <div class="userManagement">
    <div class="userCase">
      <div class="top">
        <!--<el-button-->
          <!--type="primary"-->
          <!--size="small"-->
          <!--@click="enable"-->
        <!--&gt;启用-->
        <!--</el-button>-->
        <!--<el-button-->
          <!--type="primary"-->
          <!--size="small"-->
          <!--@click="prohibit"-->
        <!--&gt;停用-->
        <!--</el-button>-->
        <!--<el-button-->
          <!--type="primary"-->
          <!--size="small"-->
          <!--@click="deleteUser"-->
        <!--&gt;删除-->
        <!--</el-button>-->
        <div class="search">
          <el-input
            type="search"
            placeholder="如企业名称，用户名，手机号"
            size="small"
            v-model="keyWord"
            @keyup.enter.native="findByKeyWord"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            @click="findByKeyWord"
          ><i class='el-icon-search'></i> 搜索
          </el-button>
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
            ref="userTable"
          ></v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:left;margin-top:20px;"
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
  inject: ["reload"],
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
        // {
        //   width: 50,
        //   titleAlign: "center",
        //   columnAlign: "center",
        //   type: "selection"
        // },
        {
          field: "enterpriseName",
          title: "企业名称",
          width: 200,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "userName",
          title: "用户名",
          width: 90,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
          //   orderBy: ""
        },
        {
          field: "phone",
          title: "手机号",
          width: 90,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "email",
          title: "邮箱",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },

        {
          field: "createTime",
          title: "创建时间",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "state",
          title: "用户状态",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowData.state === "0"
              ? "正常"
              : "禁用"
          },
          componentName: "switch-user"
        },
        {
          field: "custome-adv",
          title: "操作",
          width: 60,
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
      if (params.type === "change") {
        console.log(params);
        if (params.rowData.state === "1") {
          this.choice = params.rowData.id;
          this.prohibit();
          this.choice = "";
        } else if (params.rowData.state === "0") {
          this.choice = params.rowData.id;
          this.enable();
          this.choice = "";
        }
      }
      if (params.type === "delete") {
        this.$confirm("确定删除该用户吗？","提示").then(_=>{
          this.choice = params.rowData.id;
          this.deleteUser()
        }).catch(_=>{})
        this.choice = "";
        // do delete operation
        this.$delete(this.tableData, params.index);
      } else if (params.type === "start") {
        this.choice = params.rowData.id;
        this.enable();
        this.choice = "";
        // do edit operation
      } else if (params.type === "stop") {
        // do edit operation
        this.choice = params.rowData.id;
        this.prohibit();
        this.choice = "";
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
          this.load();
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
          this.load();
        },
        ({ type, info }) => {}
      );
    },
    deleteUser(){
      // this.$confirm("您确定要删除该用户吗？", "提示")
      //   .then(_=>{
      //   }).catch(info=>{console.log(info)})
      let qs = require("qs");
      let data = qs.stringify({
        userIds: this.choice
      });
      console.log(111)
      console.log(this.choice)
      this.Axios({
        url: "/user/deleteUsers",
        params: data,
        type: "post",
        option: { enableMsg: false }
      }).then(res=>{
        // console.log(res)
        this.$message.success("您已经删除该用户")
        this.load()
      },({type,info})=>{
        console.log(info)
      })
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
          type: "get",
          option:{enableMsg:false}
        },
        this
      ).then(
        response => {
          this.pageIndex = 1;
          this.totalNub = response.data.data.totalElements;
          this.tableData = response.data.data.content;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].state =String(this.tableData[i].state)
          }
          console.log(this.pageIndex);
          console.log(response);
        },
        ({ type, info }) => {}
      );
    },

    load() {
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.userTable.resize();
        }, 500);
      });
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

          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].state =String(this.tableData[i].state)
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
Vue.component("switch-user", {
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
    .bottom {
      border: 1px solid @Info;
      border-radius: 5px;
      padding: 10px;
      margin-top: 10px;
      
    }
  }
}
</style>
