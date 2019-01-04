<template>
  <div class="personnel">
    <div class="personTable">
      <div class="search">
        <el-input
          type="search"
          size="mini"
          v-model="key"
          style="width:30%;"
          placeholder="请输入姓名或手机号"
        ></el-input>
        <el-button
          size="mini"
          type="primary"
          @click="search"
        >搜索</el-button>
        <span style="padding:0 10px;">最近搜索：{{searchs}}</span>
        <span style="text-decoration: underline;"></span>
      </div>
      <div class="tableList">
        <v-table
          :row-dblclick="getPersonnel"
          :select-all="selectALL"
          :select-group-change="selectGroupChange"
          is-horizontal-resize
          column-width-drag
          :multiple-sort="false"
          style="width:100%;min-height:300px;"
          :columns="columns"
          :table-data="tableData"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :row-height='30'
        ></v-table>
        <div
          class="mt20 mb20 bold"
          style="text-align:center;margin-top:10px;"
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
</template>
<script>
export default {
  data() {
    return {
      key: "",
      pageNumber: 0,
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      tableDate: [],
      columns: [
        {
          field: "employeeNo",
          title: "员工编号",
          width: 80,
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
          columnAlign: "center",
          isResize: true
        },
        {
          field: "phone",
          title: "手机号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "organizeName",
          title: "组织单位/部门",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "position",
          title: "岗位",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ]
    };
  },
  methods: {
    selectGroupChange(selection) {
      // console.log("select-group-change", selection);
    },
    selectALL(selection) {
      // console.log("select-aLL", selection);
    },
    selectChange(selection, rowData) {
      // console.log("select-change", selection, rowData);
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
    personHide() {
      this.$emit("personHide", false);
    },
    getPersonnel(rowIndex, rowData, column) {
      let jihe = {
        person: rowData,
        hide: false
      };
      this.$emit("getPersonnel", jihe);
    },
    load() {
      this.Axios(
        {
          params: { page: this.pageIndex, size: this.pageSize },
          type: "get",
          url: "/employee/findEmployeeList",
          option:{enableMsg:false}
        },
        this
      ).then(
        response => {
          this.pageNumber = response.data.data.totalElements;
          this.tableData = response.data.data.content;
          this.tableDate = this.tableData;
        },
        ({ type, info }) => {}
      );
    },
    search() {
      if (!/^1[345789]\d{9}$/.test(this.key)) {
        alert("手机号码有误，请重填");
      } else {
        this.pageIndex = 1;
        this.Axios(
          {
            params: { condition: this.key },
            type: "get",
            url: "/employee/search",
            option:{successMsg:"查询成功"}
          },
          this
        ).then(
          response => {
            if (this.key !== "") {
              this.pageNumber = response.data.data.totalElements;
              this.tableData = response.data.data.content;
              this.tableDate = this.tableData;
            } else {
              this.pageChange(1);
            }
          },
          ({ type, info }) => {}
        );
      }
    }
  },
  created() {
    this.load();
  },
  mounted() {
    //   location.reload()
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
.personnel {
  // width: 100vw;
  // height: 100vh;
  // position: absolute;
  // top: 0;
  // left: 0;
  // z-index: 20;
  font-size: 14px;
  .personTable {
    // width: 600px;
    // position: relative;
    // top: 50%;
    // left: 50%;
    // margin-left: -300px;
    // margin-top: -216px;
    // background-color: white;
    .top {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      background-color: @Info;
      span:nth-child(2) {
        float: right;
      }
    }
    .search {
      padding: 10px 10px;
    }
    .tableList {
      padding: 10px;
    }
  }
}
</style>
