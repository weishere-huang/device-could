<template>
  <div class="company">
    <div class="userCase">
      <div class="top">
        <el-button size="small">审核</el-button>
        <el-button size="small">启用</el-button>
        <el-button size="small">停用</el-button>
        <el-button size="small">刷新</el-button>
        <div class="search">
          <el-input type="search" placeholder="根据企业名称" size="small"></el-input>
          <el-button size="small">搜索</el-button>
        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;"
                   :columns="columns" :table-data="tableData" row-hover-color="#eee"
                   row-click-color="#edf7ff"></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="50" :page-size="pageSize"
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
        pageIndex: 1,
        pageSize: 10,
        tableData: [{
          name: "",
          address: "",
          phone: "",
          address: "",
          time: "",
          time1: "",
          state: ""
        }],
        tableDate: [],
        company: {
          name: "",
          address: "",
          phone: "",
          corporation: "",
          companyID: ""
        },
        manager: {
          userName: "",
          phone: "",

        },

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
            isResize: true
            //   orderBy: ""
          },
          {
            field: "address",
            title: "企业地址",
            width: 200,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "phone",
            title: "企业电话",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "time",
            title: "申请时间",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "time1",
            title: "审核时间",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "stat",
            title: "状态",
            width: 50,
            titleAlign: "center",
            columnAlign: "center",
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
      // findByNameAndState(){
      //   let qs = require("qs");
      //   let data = qs.stringify({
      //
      //   });
      //   axios.get("/api/enterprise/findByNameAndState", data)
      //     .then(response =>{
      //       console.log(response);
      //       this.tableData
      //     })
      // }
    },
    created() {
      let qs = require("qs");
      let data = qs.stringify({
        page: "0",
        size: "10"
      });
      axios.get("/api/enterprise/all", data)
        .then(response => {
          console.log(response);
          this.tableData = response.data.data.content;
        }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>
<style lang="less" scoped>
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  .company {
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
