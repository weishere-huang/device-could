<template>
  <div class="outbound-details">
    <div class="top">
      <div style="display: inline-block;width:60%">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="出库日期："
            style="margin-bottom:0px;"
          >
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="开始时间"
              size="small"
              style="width:150px"
              value-format="yyyy/MM/dd"
            >
            </el-date-picker>
            <span>~</span>
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="结束时间"
              size="small"
              style="width:150px"
              value-format="yyyy/MM/dd"
            >
            </el-date-picker>
            <el-button size="small" type="primary"><i class='el-icon-search'></i>&nbsp;查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="search">
        <span>关键字：</span>
        <el-input
          type="search"
          placeholder="如编号，名称，型号/规格，单号"
          size="small"
        ></el-input>
        <el-button size="small" type="primary"><i class='el-icon-search'></i>&nbsp;搜索</el-button>
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
          style="width:100%;"
          :columns="columns"
          :table-data="tableData"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
        ></v-table>
        <div
          class="mt20 mb20 bold"
          style="text-align:left;margin-top:20px;"
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
import Vue from "vue";
export default {
  inject: ["reload"],
  name: "",
  data() {
    return {
      startTime: "",
      endTime: "",
      pageNumber: "",
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      tableDate: [],
      columns: [
        {
          field: "faultNo",
          title: "出库单号",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
          //   orderBy: ""
        },
        {
          field: "state",
          title: "出库日期",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "deviceName",
          title: "备件名称",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "deviceSpec",
          title: "备件编号",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultLevel",
          title: "型号/规格",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultSource",
          title: "数量",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "causeAnalysis",
          title: "备注",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "causeAnalysis",
          title: "经手人",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        }
      ]
    };
  },
  methods: {
    selectGroupChange(selection) {
    },
    selectALL(selection) {
    },
    selectChange(selection, rowData) {
    },
    getTableData() {
      this.tableData = this.tableDate.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.load();
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
    },


  },
  created(){

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
.outbound-details {
  font-size: 12px;
  .top {
    border: @border;
    border-radius: 5px;
    padding: 10px;
    overflow: hidden;
    .search {
      float: right;
      .el-input {
        width: 260px;
      }
    }
  }
  .bottom {
    border: @border;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    padding: 10px;
  }
}
</style>
