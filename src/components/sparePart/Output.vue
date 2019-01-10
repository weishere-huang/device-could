<template>
  <div class="spare-parts-warehouse">
    <div class="top">
      <!--<permission-button-->
        <!--permCode='part_warehouse_lookup.part_warehouse_add'-->
        <!--banType='hide'-->
        <!--size="small"-->
        <!--type="primary"-->
        <!--@click="insertBT"-->
      <!--&gt;-->
        <el-button
          size="small"
          type="primary"
          @click="insertBT"
        >
        <i
          style='font-size:12px'
          class='iconfont'
        >&#xe645;</i>&nbsp;保存</el-button>
    </div>
    <div class="warehouse">
      <h1>备件出库</h1>
      <div>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="70px"
          style="width:100%;"
        >
          <el-form-item
            label="出库单号："
            style="width:25%;"
          >
            <el-input
              v-model="outNo"
              placeholder=""
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="出库日期："
            style="width:25%;"
          >
            <el-date-picker
              v-model="outTime"
              type="datetime"
              size="small"
              value-format="yyyy/MM/dd HH:mm:ss"
              placeholder="选择日期时间"
              style="width:184px;"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="领用部门："
            style="width:25%;"
          >
            <el-cascader
              placeholder="请选择"
              :options="options"
              :props="defaultProps"
              expand-trigger="hover"
              change-on-select
              :show-all-levels="false"
              ref="getName"
              @change="handleChange"
              size="small"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="领用人："
            style="width:24%;"
          >
            <el-input size="small" @focus="showTable" v-model="userName"></el-input>
          </el-form-item>
            <el-form-item
              label="备注："
              style="width:50%;"
            >
              <el-input size="small" style="width:400px;" v-model="remark"></el-input>
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
            placeholder="请选择..."
            :options="ctgoptions"
            filterable
            ref="getName2"
            expand-trigger="hover"
            :props="defaultProps2"
            change-on-select
            :show-all-levels="false"
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
              label="出库清单："
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
    <el-dialog
      title="人员添加"
      :visible.sync="dialogVisible"
      width="80%"
      >
      <addPerson :personAddHandler="personAddHandler"></addPerson>
    </el-dialog>
  </div>
</template>
<script>
import addPerson from '../equipment/AddPerson'
import Vue from "vue";
export default {
  inject: ["reload"],
  data() {
    return {
      dialogVisible:false,
      defaultProps: {
        value: "code",
        label: "name"
      },
      options: [],
      //入库单号
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
          field: "outCount",
          title: "*数量",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true,
          titleCellClassName: "title-cell-class-name",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<s class='cell-edit-style'></s><span>${
              rowData.outCount
            }</span>`;
          }
        },
        {
          field: "price",
          title: "*单价（元）",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true,
          titleCellClassName: "title-cell-class-name",
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return `<s class='cell-edit-style'></s><span>${
              rowData.price
            }</span>`;
          }
        },
        {
          field: "subtotal",
          title: "金额",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowData.outCount * rowData.price;
          }
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
      basekeyword: "",
      //入库参数
      formInline:[],
      organizeCode:"",
      organizeName:"",
      outNo:"",
      outTime:new Date().toLocaleString().replace(/[\u4e00-\u9fa5]/g, ""),
      remark:"",

    };
  },
  methods: {
    showTable(){
      this.dialogVisible=true
    },
    personAddHandler(data){
      let pcount=0;
      data.forEach(item => pcount += item.content.length);
      if(pcount > 1){
        this.$message.error("只能添加一个领用人!!");
      }else{
       let person = data.find(item => item.content.length > 0);
       this.userId = person.content[0].id;
       this.userName = person.content[0].workerName;
       this.dialogVisible=false;
      }
    },
    handleChange(value) {
      console.log(value);
      let name = this.$refs["getName"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      this.organizeCode=id;
      this.organizeName=name;
    },
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
        this.tableData1 = this.tableData1.filter(
          item => item.partId !== params.rowData.partId
        );
        // this.deleteOne(params.rowData["id"]);
        // this.$delete(this.tableData, params.index);
      }
    },
    toDetails(rowIndex, rowData, column) {
      console.log(rowData);
      if (this.tableData1.find(i => i.partId === rowData.id)) {
        this.$message("不能添加重复的配件");
      } else {
        this.tableData1.push({
          partId: rowData.id,
          partName: rowData.partName,
          partNo: rowData.partNo,
          partModel: rowData.partModel,
          outCount: 0,
          price: 0,
          partUnit:"",
          subtotal:0,
        });
      }
    },
    toDetails2(rowIndex, rowData, column) {},
    handleChange2(value) {
      let name = this.$refs["getName2"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      this.classifyId = id;
      this.findbyclassifyId();
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
    //查询类别
    partOut(){
      let qs = require("qs");
      let data = qs.stringify({
        outNo:this.outNo,
        outTime:this.outTime,
        organizeCode:this.organizeCode,
        organizeName:this.organizeName,
        userId:this.userId,
        userName:this.userName,
        remark:this.remark,
        partOutDTO:JSON.stringify(this.tableData1)
      });
      this.Axios({
        params:data,
        url:"/part/partOut",
        type:"post",
        option:{
          enableMsg: false
        }
      },this).then(result=>{
        console.log(result.data);
        if(result.data.code===200){
          this.$message.success("入库成功");
          this.reload();
        }else{
          this.$message.error("入库失败,请重新尝试")
        }
      })
    },
    insertBT() {
      let subok = true;
      if (this.outNo === "" || this.tableData1.length === 0) {
        subok = false;
      }
      if (subok) {
        this.$confirm("确定完成出库吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.partOut();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      } else {
        this.$message.warning("请完善出库信息");
      }
    },
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
    filterArray2(data, parent) {
      //编辑组织机构数据为树状结构方法
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
    baselist() {
      //备品备件列表接口1
      this.Axios(
        {
          params: {
            page:-1,
            keywords: this.basekeyword
          },
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/part/searchBasicInfo"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      ).then(
        result => {
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
    loadall(){
      this.Axios(
        {
          url: ["/organize/allOrganize","/part/list","/part/searchBasicInfo"],
          type: ["get","get","get"],
          params:[{},{},{
            page: -1,
            keywords: this.basekeyword
          }],
          option:{
            enableMsg:false
          }
        },
        this
      ).then(
        ([res1,res2,res3]) => {
          this.options = this.filterArray2(res1.data.data, res1.data.data.find(item=>item.organizeType===1).parentCode);
          this.ctgoptions = this.filterArray(res2.data.data, 0);
          this.tableData = res3.data.data;
        },
        () => {}
      );
    }
  },
  created() {

    this.loadall();
    EventBus.$on("sideBarTroggleHandle", isCollapse => {
      window.setTimeout(() => {
        this.$refs.inventoryListTable.resize();
        this.$refs.classifyTable.resize();
      }, 500);
    });
  },
  components:{
    addPerson
  }
};
Vue.component("table-warehouse", {
  template: `<span>
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i style='font-size:16px;color:#F56C6C;cursor: pointer;' class='iconfont' @click.stop.prevent="deleteRow(rowData,index)">&#xe66b;</i>
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
        .v-table-body {
          height: 220px !important;
        }
      }
      .inventory-list {
        width: 68%;
        // border: @border;
        float: left;
        height: 426px;
        .v-table-body {
          height: 320px !important;
        }
      }
    }
  }
  .el-form--inline .el-form-item {
    margin-right: 0px;
  }
  .el-form-item__label {
    padding: 0;
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
