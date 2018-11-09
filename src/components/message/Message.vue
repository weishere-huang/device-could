<template>
    <div class="message">
        <div class="userCase">
            <div class="top">
                
                <el-button size="small">删除</el-button>
               
            </div>
            <div class="bottom">
                <div>
                    <v-table is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
                    <div class="mt20 mb20 bold" style="text-align:center;margin-top:20px">
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
      pageSize: 20,
      tableData: [
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
          field: "name",
          title: "序号",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
        //   isResize: true
        },
        {
          field: "tel",
          title: "信息标题",
          width: 150,
          titleAlign: "center",
          columnAlign: "left",
        //   isResize: true
          //   orderBy: ""
        },
        {
          field: "address",
          title: "信息内容",
          width: 150,
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
  }
};
</script>
<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
.message {
  padding-left: 180px;
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