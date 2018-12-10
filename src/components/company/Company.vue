<template>
  <div class="company">
    <div class="userCase">
      <div class="top">
        <el-button
          size="small"
          @click="auditblock"
        >审核
        </el-button>
        <el-button
          size="small"
          @click="startUseing"
        >启用
        </el-button>
        <el-button
          size="small"
          @click="forbidden"
        >停用
        </el-button>
        <el-button
          size="small"
          @click="replace"
        >刷新
        </el-button>
        <div class="search">
          <el-input
            type="search"
            placeholder="根据企业名称"
            size="small"
            v-model="name"
          ></el-input>
          <el-button
            size="small"
            @click="findByName"
          >搜索
          </el-button>
          <span
            style="color:#409eff"
            @click="adsearch"
          >高级搜索</span>
        </div>
      </div>
      <div class="bottom">
        <div style="width:100%">
          <v-table
            ref="companysTable"
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;min-height:400px;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            :select-all="selectALL"
            :select-group-change="selectGroupChange"
            :row-dblclick="details"
            row-click-color="#edf7ff"
            @on-custom-comp="customCompFunc"
          >
          </v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:left;margin-top:20px"
          >
            <v-pagination
              @page-change="pageChange"
              @page-size-change="pageSizeChange"
              :total="totalNub"
              :page-size="pageSize"
              :pageIndex="pageIndex"
              :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <advancedsearch
      class="adsearch"
      v-on:advanceValue="advanceValue"
      :pageSize="pageSize"
    ></advancedsearch>

    <el-dialog
      title="审核"
      :visible.sync="auditShow"
      width="800px"
    >
      <audit
        v-on:auditByValue="auditByValue"
        :auditValue="auditValue"
        :searchData="name"
      ></audit>
    </el-dialog>
    <el-dialog
      title="企业详情"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <businessDetails
        v-on:childByValue="childByValue"
        :detailsValue="detailsValue"
      ></businessDetails>
    </el-dialog>
  </div>
</template>
<script>
import advancedsearch from "./AdvancedSearch";
import businessDetails from "./BusinessDetails";
import audit from "./Audit";
import Vue from "vue";
export default {
  inject: ["reload"],
  data() {
    return {
      dialogVisible: false,
      detailsShow: true,
      auditShow: false,
      detailsValue: "",
      auditValue: "",
      // advanceValue: "",
      choice: "",
      pageIndex: 1,
      pageSize: 10,
      name: "",
      totalNub: "",
      states: [],
      tableData: [
        {
          name: "",
          address: "",
          phone: "",
          address: "",
          gmtCreate: "",
          state: ""
        }
      ],
      searchParams: {},
      tableDate: [],
      columns: [
        {
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        {
          field: "name",
          title: "企业名称",
          width: 150,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          //   orderBy: ""
          overflowTitle: true
        },
        {
          field: "address",
          title: "企业地址",
          width: 200,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "phone",
          title: "企业电话",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "gmtCreate",
          title: "申请时间",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "state",
          title: "状态",
          width: 50,
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
          componentName: "table-company"
          // isResize: true
        }
      ]
    };
  },
  components: {
    advancedsearch,
    businessDetails,
    audit
  },
  methods: {
    customCompFunc(params) {
      console.log("params");
      console.log(params);

      if (params.type === "delete") {
        // do delete operation
        this.choice = params.rowData.id;
        this.forbidden();
        this.choice = "";
        this.$delete(this.tableData, params.index);
      } else if (params.type === "edit") {
        // do edit operation
        this.choice = params.rowData.id;
        this.startUseing();
        this.choice = "";
        console.log(this.params);
      } else if (params.type === "audit") {
        // do edit operation
        this.auditShow = true;
        this.auditValue = params.rowData;
      }
    },
    advanceValue: function({ dataName, params }) {
      this.pageIndex = 1;
      this.tableData = dataName.content;
      this.totalNub = dataName.totalElements;
      this.searchParams = params;
    },
    replace() {
      this.reload();
    },
    auditblock() {
      if (this.choice.length == 0 || this.choice.length > 1) {
        this.$message({
          message: "请选择一个企业进行审核",
          type: "error"
        });
      } else {
        this.auditShow = true;
      }
    },
    auditByValue: function(params) {
      this.auditShow = params;
    },
    childByValue: function(params) {
      this.dialogVisible = params;
    },
    details(rowIndex, rowData, column) {
      this.dialogVisible = true;
      this.detailsValue = rowData;
      console.log(rowData);
    },
    selectGroupChange(selection) {
      console.log("select-group-change", selection);
      this.auditValue = selection[0];
      this.choice = "";
      this.states == [];
      for (let i = 0; i < selection.length; i++) {
        if (this.choice == "") {
          this.choice = selection[i].id;
          this.states[i] = selection[i].state;
          this.auditValue == selection[0];
        } else {
          this.choice += "," + selection[i].id;
          // this.auditValue +=","+selection[i]
        }
      }
      console.log(this.choice);
      console.log(this.states);
      console.log(this.auditValue);
    },
    selectALL(selection) {
      this.choice = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.choice == "") {
          this.choice = selection[i].id;
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
    load() {
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.companysTable.resize();
        }, 500);
      });
      const pa = Object.assign(this.searchParams, {
        page: this.pageIndex,
        size: this.pageSize
      });
      this.Axios(
        {
          params: Object.assign(this.searchParams, {
            page: this.pageIndex,
            size: this.pageSize
          }),
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/enterprise/findByNameOrState"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      ).then(
        response => {
          console.log(response);
          this.totalNub = response.data.data.totalElements;
          for (let i = 0; i < response.data.data.content.length; i++) {
            // console.log(response.data.data.content.length)
            if (response.data.data.content[i].state === 0) {
              response.data.data.content[i].state = "待审核";
            }
            if (response.data.data.content[i].state === 1) {
              response.data.data.content[i].state = "正常";
            }
            if (response.data.data.content[i].state === 2) {
              response.data.data.content[i].state = "禁用";
            }
            if (response.data.data.content[i].state === 4) {
              response.data.data.content[i].state = "审核中";
            }
            if (response.data.data.content[i].state === 10) {
              response.data.data.content[i].state = "未通过";
            }
          }
          this.tableData = response.data.data.content;
        },
        ({ type, info }) => {
          //错误类型 type=faild / error
          //error && error(type, info);
        }
      );
    },
    findByName() {
      this.Axios(
        {
          url: "/enterprise/findByNameOrState",
          params: Object.assign(this.searchParams, {
            enterpriseName: this.name,
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
          for (let i = 0; i < response.data.data.content.length; i++) {
            if (response.data.data.content[i].state === 0) {
              response.data.data.content[i].state = "待审核";
            }
            if (response.data.data.content[i].state === 1) {
              response.data.data.content[i].state = "正常";
            }
            if (response.data.data.content[i].state === 2) {
              response.data.data.content[i].state = "禁用";
            }
            if (response.data.data.content[i].state === 4) {
              response.data.data.content[i].state = "审核中";
            }
            if (response.data.data.content[i].state === 10) {
              response.data.data.content[i].state = "未通过";
            }
          }
          this.tableData = response.data.data.content;
          console.log(this.pageIndex);
        },
        ({ type, info }) => {}
      );
    },
    startUseing() {
      let qs = require("qs");
      let data = qs.stringify({ enterpriseIds: this.choice });
      this.Axios(
        {
          url: "/enterprise/enableEnterprises/",
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      ).then(
        response => {
          this.$message({
            message: "启用成功",
            type: "success"
          });
          this.load();
          console.log("请求参数：" + data);
        },
        ({ type, info }) => {}
      );
    },
    forbidden() {
      let qs = require("qs");
      let data = qs.stringify({
        enterpriseIds: this.choice
      });
      console.log("请求参数：" + data);
      this.Axios(
        {
          params: data,
          url: "/enterprise/discontinuationEnterprises",
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      ).then(
        response => {
          this.$message({
            message: "禁用成功",
            type: "success"
          });
          this.load();
        },
        ({ type, info }) => {}
      );
    },
    adsearch() {
      document.querySelectorAll(".adsearch")[0].style.right = 0;
    }
  },
  created() {
    this.load();
  }
};
Vue.component("table-company", {
  template: `<span>
        <a href="" @click.stop.prevent="update(rowData,index)" style="text-decoration: none;">启用</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)" style="text-decoration: none;">停用</a>&nbsp;
        <a href="" @click.stop.prevent="audit(rowData,index)" style="text-decoration: none;">审核</a>
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
    audit() {
      let params = { type: "audit", rowData: this.rowData };
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
.company {
  // padding-left: 180px;
  position: relative;
  width: 100%;
  overflow: hidden;
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
        overflow: hidden;
        width: 40%;
        .el-input {
          width: 60%;
        }
        span {
          font-size: 12px;
          cursor: pointer;
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
  .adsearch {
    position: absolute;
    top: 0%;
    right: -310px;
    transition: all 0.3s ease-in;
  }
}
</style>
