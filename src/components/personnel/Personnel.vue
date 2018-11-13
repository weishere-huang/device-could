<template>
  <div class="userManagement">
    <div class="userCase">
      <div class="top">
        <el-button size="small">添加</el-button>
        <el-button size="small">删除</el-button>
        <div class="search">
          <el-input type="search" placeholder="如员工编号，姓名，手机，部门，岗位" size="small"></el-input>
          <el-button size="small">搜索</el-button>
        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px">
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
      tableData: [],
      tableDate: [],
      columns: [
        {
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        // {
        //   field: "name",
        //   title: "序号",
        //   width: 40,
        //   titleAlign: "center",
        //   columnAlign: "center",
        //   isResize: true
        // },
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
          field: "gender",
          title: "性别",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "workType",
          title: "工作性质",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "organizationName",
          title: "组织单位及部门",
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
          field: "phone",
          title: "手机号",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        }
      ]
    };
  },
  methods: {
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
    }
  },
  created() {
    let qs = require("qs");
    let data = qs.stringify({
      page : "0",
      size : "10"
    });
    axios
      .get("/api/employee/selectAll", data)
      .then(response => {
        this.tableData = response.data.data.content;
        // console.log(response.data.data.content)
        // console.log(this.tableData)
      })
      .catch(function(error) {
        console.log(error);
      });
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
