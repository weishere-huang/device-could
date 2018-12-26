<template>

  <div class="spare-part" >
    <router-view></router-view>
    <div class="top" :class="[{hide:isHideList}]">
      <el-button
        size="small"
        type="primary"
        @click="toAdd"
      ><i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;添加</el-button>
      <el-button size="small" type="primary" @click="reload()"><i class='el-icon-refresh'></i> 立即刷新</el-button>
      <!-- <el-button size="small" type="primary" @click="btisok">删除</el-button> -->
      <div class="search">
        <span>关键字：</span>
        <el-input
          type="search"
          placeholder="如编号，名称，型号/规格"
          size="small"
          v-model="basekeyword"
        ></el-input>
        <el-button size="small" type="primary" @click="baselist"><i class='el-icon-search'></i> 搜索</el-button>
      </div>
    </div>
    <div class="bottom" :class="[{hide:isHideList}]">
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
          ref="sparePartTable"
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
      pageNumber: 50,
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
          overflowTitle: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowData.partCategory === 2
              ?`<span style="color:#ff6600">关键</span>`
              :`<span >普通</span>`
          },
        },
        {
          field: "partClassifyName",
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
          field: "lower",
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
      ],
      //条件查询
      basekeyword:"",
      isHideList: this.$route.params.id !== undefined
        ? true
        : false,

    };
  },
  methods: {
    toAdd() {
      this.$router.push({path: "SparePart/SparePartAdd"});
    },
    customCompFunc(params) {
       console.log(params);
      if (params.type === "delete") {
        this.ids =params.rowData.id
        this.btisok();
        console.log(this.ids);
        // this.$delete(this.tableData, params.index);
      } else if (params.type === "edit") {
        this.$router.push("SparePart/SparePartAmend/" + params.rowData.id);
        // this.$delete(this.tableData, params.index);
      }
    },
    toDetails(rowIndex, rowData, column) {
      this.$router.push("SparePart/SparePartAmend/" + rowData.id);
      // this.$store.commit("equipmentRedact", rowData);
      console.log(rowData);
    },
    selectGroupChange(selection) {
      this.ids = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.ids != "") {
          this.ids += "," + selection[i].id;
        } else {
          this.ids += selection[i].id;
        }
      }
      console.log(selection);
      console.log(this.ids);
    },
    selectALL(selection) {
      this.ids = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.ids != "") {
          this.ids += "," + selection[i].id;
        } else {
          this.ids += selection[i].id;
        }
      }
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
      this.getTableData();
      this.baselist();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      this.baselist();
    },

    //备品备件接口
    basedelete(){
      //批量删除备件基础信息接口1

      let qs = require("qs");
      let data = qs.stringify({
        ids: this.ids
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/deleteBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            console.log(result.data);
            this.reload();
          },
          ({type, info}) => {
          }
        );
    },
    baselist(){
      //备品备件列表接口1
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.sparePartTable.resize();
        }, 500);
      });
      this.Axios({
        params: {
          page: this.pageIndex,
          size: this.pageSize,
          keywords:this.basekeyword,
        },
        option: {
          successMsg:"备件信息加载完成"
        },
        type:"get",
        url: "/part/searchBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            console.log(result);
            console.log(result.data);
            this.tableData=result.data.data.content;
            this.pageNumber = result.data.data.totalElements;
          },
          ({type, info}) => {
          }
        );
    },


    //确认按钮
    btisok(){
      console.log(this.ids);
      if(this.ids === "" || this.ids === undefined){
        this.$message.warning("请至少选择一行数据")
      }else{
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.basedelete();
        }).catch(() => {
        });
      }

    }

  },
  created(){
    //默认加载
    this.baselist();
    let a=this.$route.matched.find(item=>(item.name==="SparePartAdd"))?true:false;
    let b=this.$route.params.id !== undefined ? true : false;
    this.isHideList = a||b ?true:false;
  },
  watch: {
    $route() {
      //debugger
      let a=this.$route.matched.find(item=>(item.name==="SparePartAdd"))?true:false;
      let b=this.$route.params.id !== undefined ? true : false;
      this.isHideList = a||b ?true:false;
      this.$refs.sparePartTable.resize();
    }
  },
};
Vue.component("table-sparePart", {
  template: `<span>
        <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <a href="" style="text-decoration: none;color:#409eff"><i @click.stop.prevent="update(rowData,index)" style='font-size:16px' class='iconfont'>&#xe6b4;</i></a>
        </el-tooltip>
        &nbsp;
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <a href="" style="text-decoration: none;color:#F56C6C"><i @click.stop.prevent="deleteRow(rowData,index)" style='font-size:16px' class='iconfont'>&#xe66b;</i></a>
          </el-tooltip>
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
