<template>
  <div class="turnaround-plans">
    <div class="userCase">
      <div class="top">
        <el-button size="small">审核</el-button>
        <el-button size="small">停止</el-button>
        <el-button size="small">删除</el-button>
        <div class="search">
          <el-input type="search" placeholder="如故障编码，设备名称，位号，描述" size="small"></el-input>
          <el-button size="small">搜索</el-button>
          <span style="padding-left:10px;">高级搜索</span>
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
      tableData: [
        {
          id: "111",
          name: "222",
          num: "3333",
          hobby: "4444",
          startTime: "555",
          endTime: "6666",
          frequency: "7777",
          maintenanceCc: "888",
          state: "999"
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
          title: "故障编码",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
          //   orderBy: ""
        },
        {
          field: "num",
          title: "设备名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "hobby",
          title: "设备位号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "startTime",
          title: "状态",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "starTime",
          title: "故障来源",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "endTime",
          title: "故障描述",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "frequency",
          title: "上报时间",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "endTime",
          title: "消除时间",
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
      console.log("select-group-change", selection);
    },
    selectALL(selection) {
      console.log("select-aLL", selection);
    },
    selectChange(selection, rowData) {
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
@border: 1px solid #dde2eb;
.turnaround-plans {
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
        font-size: 12px;
        .el-input {
          width: 60%;
        }
        span {
          cursor: pointer;
          &:hover {
            color: @blue;
          }
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
