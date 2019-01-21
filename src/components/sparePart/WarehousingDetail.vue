<template>
  <div class="warehousing-detail">
    <div class="top">
      <div style="display: inline-block;width:60%">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="入库日期："
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
            <el-button size="small" type="primary" @click="beforeSearch"><i class='el-icon-search'></i>&nbsp;查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="search">
        <span>关键字：</span>
        <el-input
          type="search"
          placeholder="如单号、编号、名称、型号/规格、供货商"
          size="small"
          v-model="rkeyword"
        ></el-input>
        <el-button size="small" type="primary" @click="beforeSearch"><i class='el-icon-search'></i>&nbsp;搜索</el-button>
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
          :show-vertical-border="false"
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
      pageNumber: 0,
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      tableDate: [],
      columns: [
        {
          field: "godownEntryNo",
          title: "入库单号",
          width: 120,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
          //   orderBy: ""
        },
        {
          field: "godownEntryTime",
          title: "入库日期",
          width: 120,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partName",
          title: "备件名称",
          width: 120,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partNo",
          title: "备件编号",
          width: 100,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partModel",
          title: "型号/规格",
          width: 80,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "entryCount",
          title: "数量",
          width: 60,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "entryPrice",
          title: "单价",
          width: 60,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "causeAnalysis",
          title: "金额",
          width: 80,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          formatter:function (rowData,rowIndex,pagingIndex,field) {
            return rowData.entryCount*rowData.entryPrice
          }
        },
        {
          field: "supplierName",
          title: "供货商",
          width: 80,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "saveLocation",
          title: "放置位置",
          width: 80,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "remarks",
          title: "备注",
          width: 150,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        }
      ],
      //入库keyword
      rkeyword:""
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
      this.getTableData();
      this.listsearch();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      this.listsearch();
    },
    //
    listsearch(){
      //入库明细列表以及模糊搜索接口1
      this.Axios({
        params: {
          page: this.pageIndex,
          size: this.pageSize,
          startTime:this.startTime,
          endTime:this.endTime,
          keywords:this.rkeyword,
        },
        option: {
          successMsg:"入库单加载完成"
        },
        type: "get",
        url: "/part/listGodownEntryInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.tableData=result.data.data.content;
            this.pageNumber=result.data.data.totalElements;
            for(let i=0;i<this.tableData.length;i++){
              this.tableData[i].godownEntryTime = this.tableData[i].godownEntryTime.split(" ")[0];
            }

          },
          ({type, info}) => {
          }
        );
    },
    beforeSearch(){
      this.pageIndex=1;
      this.listsearch();
    }
  },
  created(){
    this.listsearch();
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
.warehousing-detail {
  font-size: 12px;
  .top {
    border: @border;
    border-radius: 5px;
    padding: 10px;
    overflow: hidden;
    .search {
      float: right;
      .el-input {
        width: 300px;
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
