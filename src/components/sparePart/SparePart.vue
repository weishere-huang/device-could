<template>
  <div class="spare-part">
    <div class="top">
      <el-button
        size="small"
        @click="toAdd"
      >添加</el-button>
      <el-button size="small">删除</el-button>
      <div class="search">
        <span>关键字：</span>
        <el-input
          type="search"
          placeholder="如编号，名称，型号/规格"
          size="small"
        ></el-input>
        <el-button size="small">搜索</el-button>
      </div>
    </div>
    <div class="bottom">
      <div>
        <v-table
          :row-dblclick="toDetails"
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
          @on-custom-comp="customCompFunc"
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
  name: "",
  data() {
    return {
      pageNumber: "",
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
        {
          field: "faultNo",
          title: "备件编号",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
          //   orderBy: ""
        },
        {
          field: "state",
          title: "备件名称",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "deviceName",
          title: "型号/规格",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "deviceSpec",
          title: "备件级别",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultLevel",
          title: "备件分类",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultSource",
          title: "库存总量",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultDesc",
          title: "每月用量",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "causeAnalysis",
          title: "库存下限",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "causeAnalysis",
          title: "计量单位",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
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
          field: "custome-adv",
          title: "操作",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          componentName: "table-sparePart"
          // isResize: true
        }
      ]
    };
  },
  methods: {
    toAdd() {
      this.$router.push({
        path: "/SparePartAdd"
      });
    },
    customCompFunc(params) {
      // console.log(params);
      if (params.type === "delete") {
        // this.$delete(this.tableData, params.index);
        this.toDeleteBreak(params.rowData.id);
      } else if (params.type === "update") {
        // this.$delete(this.tableData, params.index);
        this.toDeleteBreak(params.rowData.id);
      }
    },
    toDetails(rowIndex, rowData, column) {
      console.log(rowData);
    },
    selectGroupChange(selection) {
      console.log(selection);
    },
    selectALL(selection) {
      console.log(selection);
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
      this.load();
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
    },

    //备品备件接口

  }
};
Vue.component("table-sparePart", {
  template: `<span>
        <a href="" @click.stop.prevent="update(rowData,index)" style="text-decoration: none;">修改</a>
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
    deleteRow() {
      // 参数根据业务场景随意构造
      let params = { type: "delete", rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    },
    update() {
      // 参数根据业务场景随意构造
      let params = { type: "edit", index: this.index, rowData: this.rowData };
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
@border: 1px solid #dde2eb;
.spare-part {
  font-size: 12px;
  .top {
    border: @border;
    border-radius: 5px;
    padding: 10px;
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
