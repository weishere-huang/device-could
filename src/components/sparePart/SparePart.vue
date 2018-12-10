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
          field: "partNo",
          title: "备件编号",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
          //   orderBy: ""
        },
        {
          field: "partName",
          title: "备件名称",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partModel",
          title: "型号/规格",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partCategory",
          title: "备件级别",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partClassify",
          title: "备件分类",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "inventory",
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
          field: "partUnit",
          title: "计量单位",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "remarks",
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
    Sadd(){
      //备品备件添加1
      let qs = require("qs");
      let data = qs.stringify({
        parentCode:"",
        name:"",
        remarks:"",
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/add"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    Supdate(){
      //备品备件修改1
      let qs = require("qs");
      let data = qs.stringify({
        id:"",
        name:"",
        remarks:""
      });
      this.Axios({
        params:data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/update"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    Sdelete(){
      //备品备件删除1
      let qs = require("qs");
      let data = qs.stringify({
        partId:""
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/delete"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );

    },

    Saddbaseinfo(){
    //新增备件基础信息接口1
      let qs = require("qs");
      let data = qs.stringify({
        partNo:"",
        partName:"",
        partModel:"",
        partCategory:"",
        partClassify:"",
        partClassifyName:"",
        partQuality:"",
        partUnit:"",
        inventory:"",
        freeze:"",
        price:"",
        storageTime:"",
        partSource:"",
        company:"",
        manufactor:"",
        remarks:"",
        img:""
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/addBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );

    },
    baseadd(){
    //编辑备件基础信息接口1
      let qs = require("qs");
      let data = qs.stringify({
        id:"",
        partNo:"",
        partName:"",
        partModel:"",
        partCategory:"",
        partClassify:"",
        partClassifyName:"",
        partQuality:"",
        partUnit:"",
        inventory:"",
        freeze:"",
        price:"",
        storageTime:"",
        partSource:"",
        company:"",
        manufactor:"",
        remarks:"",
        img:""
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/updateBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    basedelete(){
      //批量删除备件基础信息接口1
      let qs = require("qs");
      let data = qs.stringify({
        ids:""
        //用,分割   可以
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "get",
        url: "/part/deleteBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    baselist(){
      //备品备件列表接口1

      this.Axios({
        params: {
          page: this.pageIndex,
          size: this.pageSize
        },
        // option: {
        //   enableMsg: false
        // },
        type:"get",
        url: "/part/listBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.tableData=result.data.data
            this.$message({
              message: "启用成功",
              type: "success"
            });
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    basesearch(){
      //模糊搜索备品备件接口1
      let qs = require("qs");
      let data = qs.stringify({
        enterpriseIds: this.choice
      });
      this.Axios({
        params: {
          page: this.pageIndex,
          size: this.pageSize,
          keywords:"",
        },
        option: {
          enableMsg: false
        },
        type: "get",
        url: "/part/searchBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    listbybase(){
      //根据备件分类查询备件列表1

      this.Axios({
        params: {
          page: this.pageIndex,
          size: this.pageSize,
          classifyId:"",
        },
        option: {
          enableMsg: false
        },
        type: "get",
        url: "/part/listInfoByClassifyId"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    Sinsert(){
      //备件入库接口1
      let qs = require("qs");
      let data = qs.stringify({
        godownEntryNo:"",
        godownEntryTime:"",
        partInfoListJsonStr:{
          partId:"",
          entryPrice:"",
          entryCount:"",
          subtotal:"",
          batchNumberId:"",
          batchNumber:"",
          supplierName:"",
          saveLocation:"",
          remarks:""
        }
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/insertPartEntry"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    listsearch(){
      //入库明细列表以及模糊搜索接口1

      this.Axios({
        params: {
          page: this.pageIndex,
          size: this.pageSize,
          startTime:"",
          endTime:"",
          keywords:"",
        },
        option: {
          enableMsg: false
        },
        type: "get",
        url: "/enterprise/findByNameOrState"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    getuserbatch(){
      //获取最近使用批次接口

      this.Axios({
        params: {
          partId:""
        },
        option: {
          enableMsg: false
        },
        type: "get",
        url: "/part/listRecentlyUsedBatch"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            this.load();
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    }

  },
  created(){
    //默认加载
    this.baselist();
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
