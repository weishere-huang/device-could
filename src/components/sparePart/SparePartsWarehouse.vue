<template>
  <div class="spare-parts-warehouse">
    <div class="top">
      <el-button
        size="small"
        type="primary"
        @click="Sinsert"
      >保存</el-button>
    </div>
    <div class="warehouse">
      <h1>备件入库</h1>
      <div>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="100px"
        >
          <el-form-item
            label="入库单号："
            style="margin-bottom:0px;"
          >
            <el-input
              v-model="godownEntryNo"
              placeholder=""
              size="small"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="入库日期："
            style="margin-bottom:0px;"
          >
            <el-date-picker
              v-model="formInline.time"
              type="date"
              size="small"
              value-format="yyyy/MM/dd"
              placeholder="选择日期"
            >
            </el-date-picker>

          </el-form-item>
        </el-form>
      </div>
      <div class="table-list">
        <div class="spare-parts-table">
          <el-form label-width="85px">
            <el-form-item
              label="备件分类："
              style="margin-bottom:0px;"
            >
            </el-form-item>
          </el-form>
          <el-cascader
            placeholder=""
            :options="ctgoptions"
            filterable
            ref="getName2"
            expand-trigger="hover"
            :props="defaultProps2"
            change-on-select
            :show-all-levels="false"
            v-model="formInline.user"
            @change="handleChange2"
            style="width:100%;"
            size="small"
          ></el-cascader>
          <el-input
            placeholder="输入编号、名称、型号规格"
            class="input-with-select"
            size="small"
            style="margin-top:10px"
            v-model="basekeyword"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="baselist"
            ></el-button>
          </el-input>
          <div style="width:100%;margin-top:10px">
            <v-table
              :row-dblclick="toDetails"
              is-horizontal-resize
              is-vertical-resize
              row-height="30"
              :multiple-sort="false"
              style="width:100%;max-height:280px;height:280px;"
              :columns="columns"
              :table-data="tableData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
              ref="classifyTable"
            ></v-table>
          </div>
        </div>
        <div style="float:left;font-size:20px;height:426px;line-height:426px">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
        <div class="inventory-list">
          <el-form label-width="85px">
            <el-form-item
              label="入库清单："
              style="margin-bottom:0px;"
            >
            </el-form-item>
          </el-form>
          <div>
            <v-table
              :row-dblclick="toDetails2"
              is-horizontal-resize
              is-vertical-resize
              column-width-drag
              :multiple-sort="false"
              style="width:100%;height:364px"
              :min-height='364'
              :columns="columns1"
              :table-data="tableData1"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
              :cell-edit-done="cellEditDone"
              @on-custom-comp="customCompFunc"
              :column-cell-class-name="columnCellClass"
              ref="inventoryListTable"
            ></v-table>
          </div>
          <div style="color:#e6a23c;line-height:20px">
            温馨提示：带"*"号的字段可编辑！录入完成后记得保存哟！
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  inject: ["reload"],
  data() {
    return {
      formInline: {
        time: new Date().toLocaleDateString()
      },
      //入库单号
      godownEntryNo: "",
      ctgoptions: [],
      defaultProps2: {
        value: "id",
        label: "name"
      },
      columns: [
        {
          field: "partNo",
          title: "备件编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partName",
          title: "备件名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partModel",
          title: "备件型号/规格",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partCategory",
          title: "备件级别",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        }
      ],
      columns1: [
        {
          field: "partName",
          title: "备件名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partNo",
          title: "备件编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "partModel",
          title: "备件型号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "entryCount",
          title: "*数量",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true,
          titleCellClassName: "title-cell-class-name",
          formatter: function (rowData,rowIndex,pagingIndex,field) {
                        return `<s class='cell-edit-style'></s><span>${rowData.entryCount}</span>`;
                    }
          },
        {
          field: "entryPrice",
          title: "*单价（元）",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true,
          titleCellClassName: "title-cell-class-name"
        },
        {
          field: "faultNo4",
          title: "金额",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowData.entryCount * rowData.entryPrice;
          }
        },
        {
          field: "supplierName",
          title: "*供应商",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true,
          titleCellClassName: "title-cell-class-name"
        },
        {
          field: "batchNumber",
          title: "*批次",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true,
          titleCellClassName: "title-cell-class-name"
        },
        {
          field: "saveLocation",
          title: "*存放位置",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true,
          titleCellClassName: "title-cell-class-name"
        },
        {
          field: "remarks",
          title: "*备注",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true,
          titleCellClassName: "title-cell-class-name"
        },
        {
          field: "custome-adv",
          title: "操作",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          componentName: "table-warehouse"
          // isResize: true
        }
      ],
      tableData: [],
      tableData1: [],
      classifyId: "",
      //搜索关键字
      basekeyword: ""
    };
  },
  methods: {
    columnCellClass(rowIndex, columnName, rowData) {
      // 给三行column为‘Parts1Material’和‘Parts2Material’的列设置className
      /*根据你自己的cloumn设置*/
      if (columnName === "faultNo1" || columnName === "Parts2Material") {
        return "column-cell-class-name-cailiao"; //这是你的css名字
      }
    },
    cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
      this.tableData1[rowIndex][field] = newValue;
      // 接下来处理你的业务逻辑，数据持久化等...
    },
    customCompFunc(params) {
      if (params.type === "delete") {
        console.log(params.rowData);
        this.tableData1 = this.tableData1.filter(
          item => item.partId !== params.rowData.partId
        );
        // this.deleteOne(params.rowData["id"]);
        // this.$delete(this.tableData, params.index);
      }
    },
    toDetails(rowIndex, rowData, column) {
      console.log(rowData);
      //this.getuserbatch(rowData.id);
      if (this.tableData1.find(i => i.partId === rowData.id)) {
        this.$message("不能添加重复的配件");
      } else {
        this.tableData1.push({
          partId: rowData.id,
          partName: rowData.partName,
          partNo: rowData.partNo,
          partModel: rowData.partModel,
          entryCount: "",
          entryPrice: "",
          supplierName: "",
          //批次ID
          //batchNumberId:"",
          batchNumber: "",
          saveLocation: "",
          remarks: ""
        });
      }
    },
    toDetails2(rowIndex, rowData, column) {
      console.log(rowData);
     //
     //
     //
     //
     //
    },
    handleChange2(value) {
      let name = this.$refs["getName2"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      console.log(id, name);
      this.classifyId = id;
      this.findbyclassifyId();
    },
    gezhongconso() {
      console.log(this.tableData1);
    },
    findbyclassifyId() {
      //根据备件分类查询备件列表1
      this.Axios(
        {
          params: {
            // page: this.pageIndex,
            // size: this.pageSize,
            classifyId: this.classifyId
          },
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/part/listInfoByClassifyId"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      ).then(
        result => {
          console.log(result.data);
          this.tableData = result.data.data.content;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].partCategory === 2) {
              this.tableData[i].partCategory = "关键";
            } else {
              this.tableData[i].partCategory = "普通";
            }
          }
        },
        ({ type, info }) => {}
      );
    },
    Sinsert() {
      //备件入库接口1
      let qs = require("qs");
      let data = qs.stringify({
        godownEntryNo: this.godownEntryNo,
        godownEntryTime: this.formInline.time,
        partInfoListJsonStr: JSON.stringify(this.tableData1)
      });
      this.Axios(
        {
          params: data,
          option: {
            enableMsg: false
          },
          type: "post",
          url: "/part/insertPartEntry"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      ).then(
        result => {
          console.log(result);
          console.log(result.data);
          if (result.data.code === 200) {
            this.$message("添加成功");
            this.reload();
          }
        },
        ({ type, info }) => {}
      );
    },
    baselist() {
      //备品备件列表接口1
      this.Axios(
        {
          params: {
            page:-1,
            keywords: this.basekeyword
          },
          // option: {
          //   enableMsg: false
          // },
          type: "get",
          url: "/part/searchBasicInfo"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      ).then(
        result => {
          console.log(result.data);
          this.tableData = result.data.data;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].partCategory === 2) {
              this.tableData[i].partCategory = "关键";
            } else {
              this.tableData[i].partCategory = "普通";
            }
          }
        },
        ({ type, info }) => {}
      );
    },

    //查询类别
    filterArray(data, parent) {
      let vm = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentCode == parent) {
          var obj = data[i];
          temp = this.filterArray(data, data[i].code);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    },
    Sgetlist() {
      //获取备品备件分类数据接口1
      this.Axios(
        {
          // option: {
          //   enableMsg: false
          // },
          type: "get",
          url: "/part/list"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      ).then(
        result => {
          console.log(result.data);
          console.log(result.data.data);
          this.ctgoptions = this.filterArray(result.data.data, 0);
          console.log(this.ctgoptions);
        },
        ({ type, info }) => {}
      );
    },
    //获取批次
    getuserbatch(id) {
      //获取最近使用批次接口
      this.Axios(
        {
          params: {
            partId: id
          },
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/part/listRecentlyUsedBatch"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      ).then(
        result => {
          console.log(result.data);
        },
        ({ type, info }) => {}
      );
    }
  },
  created() {
    this.Sgetlist();
    this.baselist();
    EventBus.$on("sideBarTroggleHandle", isCollapse => {
      window.setTimeout(() => {
        this.$refs.inventoryListTable.resize();
        this.$refs.classifyTable.resize();
      }, 500);
    });
  }
};
Vue.component("table-warehouse", {
  template: `<span>
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
    }
  }
});
</script>

<style lang="less" >
@import url("../../assets/font/font.css");
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.spare-parts-warehouse {
  font-size: 12px;
  .top {
    border: @border;
    border-radius: 5px;
    padding: 10px;
  }
  .warehouse {
    border: @border;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    padding: 10px;
    overflow: hidden;
    h1 {
      text-align: center;
      letter-spacing: 6px;
    }
    .table-list {
      overflow: hidden;
      margin-top: 20px;
      .spare-parts-table {
        width: 30%;
        // border: @border;
        float: left;
        height: 403px;
        padding-bottom: 10px;
        .v-table-body{
          height: 220px !important;
        }
      }
      .inventory-list {
        width: 68%;
        // border: @border;
        float: left;
        height: 426px;
        .v-table-body{
          height: 320px !important;
        }
      }
    }
  }
}
.column-cell-class-name-cailiao {
  background-color: #e1fbfb;
  color: #141314;
}
.title-cell-class-name {
  color: #e6a23c;
}
.v-checkbox-group {
  height: auto;
}
</style>
