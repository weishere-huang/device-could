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
            <el-button size="small" type="primary" @click="beforeFind"><i class='el-icon-search'></i>&nbsp;查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="search">
        <span>关键字：</span>
        <el-input
          type="search"
          placeholder="如编号，名称，型号/规格，单号"
          size="small"
          v-model="keywords"
        ></el-input>
        <el-button size="small" type="primary" @click="beforeFind"><i class='el-icon-search'></i>&nbsp;搜索</el-button>
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
          field: "no",
          title: "出库单号",
          width: 120,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "time",
          title: "出库日期",
          width: 100,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "name",
          title: "备件名称",
          width: 80,
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
          field: "Model",
          title: "型号/规格",
          width: 80,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "outCount",
          title: "数量",
          width: 30,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "price",
          title: "单价",
          width: 30,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "money",
          title: "金额",
          width: 30,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true,
          formatter:function (rowData,rowIndex,pagingIndex,field) {
            return rowData.outCount*rowData.price
          }
        },
        {
          field: "orgaizeName",
          title: "领用部门",
          width: 60,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "receiverName",
          title: "领用人",
          width: 60,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "employeeName",
          title: "经手人",
          width: 60,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "remark",
          title: "备注",
          width: 120,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true,
          overflowTitle: true
        },
      ],
      keywords:"",
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
      this.boundList();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      this.boundList();
    },
    beforeFind(){
      this.pageIndex=1;
      this.boundList();
    },
    //出库明细
    boundList(){
      this.Axios({
        params:{
          startTime:this.startTime,
          endTime:this.endTime,
          keywords:this.keywords
        },
        url:"/part/listOutInfo",
        type:"get",
        option:{
          successMsg:"出库单加载完成"
        }
      },this).then(result =>{
          console.log(result);
          this.tableData=result.data.data.content;
          this.pageNumber=result.data.data.totalElements;
      });
    },
    //备件出库


  },
  created(){
    this.boundList();
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
