<template>
  <div class="userManagement">
    <div class="userCase">
      <div class="top">
        <div class="search">
          <el-button size="small">搜索</el-button>
        </div>
      </div>
      <div class="bottom">
        <div>
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
        choice: "",
        tableData: [],
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
      enable() {
      },
      selectALL(selection) {
        this.choice = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.choice === "") {
            this.choice += selection[i].id;
          } else {
            return 0;
          }
        }
        console.log("select-aLL", selection);
      },
      selectChange(selection, rowData) {
        this.userIds = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.userIds === "") {
            this.userIds += selection[i].id;
          } else {
            this.userIds += "," + selection[i].id;
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
        this.load()
      },
      sortChange(params) {
        if (params.height.length > 0) {
          this.tableConfig.tableData.sort(function (a, b) {
            if (params.height === "asc") {
              return a.height - b.height;
            } else if (params.height === "desc") {
              return b.height - a.height;
            } else {
            }
          });
        }
      },
      load() {
        this.axios
          .get(this.global.apiSrc + "/user/enterpriseUserAll", {params: {page: this.pageIndex, size: this.pageSize}})
          .then(response => {
            console.log(response);
            this.totalNub = response.data.data.totalElements
            this.tableData = response.data.data.content;
            for (let i = 0; i < this.tableData.length; i++) {
              // this.tableData[i].gmtCreate = this.tableData[i].gmtCreate.split("T")[0];
              if (this.tableData[i].state === 0) {
                this.tableData[i].state = "正常"
              } else {
                this.tableData[i].state = "停用"
              }
            }
            this.tableDate = this.tableData;
            // console.log(this.tableDate)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    created() {
      this.load();
    },
  }
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
