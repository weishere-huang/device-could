<template>
  <div class="spare-parts-warehouse">
    <div class="top">
      <el-button size="small">保存</el-button>
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
              v-model="formInline.user"
              placeholder=""
              size="small"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="入库日期："
            style="margin-bottom:0px;"
          >
            <el-input
              v-model="formInline.time"
              placeholder=""
              size="small"
              style="width:200px"
            ></el-input>
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
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
          <div style="width:100%;margin-top:10px">
            <v-table
              :row-dblclick="toDetails"
              is-horizontal-resize
              is-vertical-resize
              column-width-drag
              :multiple-sort="false"
              style="width:100%;height:280px"
              :min-height='280'
              :columns="columns"
              :table-data="tableData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
            ></v-table>
          </div>
        </div>
        <div style="float:left;font-size:20px;height:426px;line-height:426px">
          →
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
              :row-dblclick="toDetails"
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
  data() {
    return {
      formInline: {
        time: new Date().toLocaleDateString()
      },
      ctgoptions: [],
      defaultProps2: {
        value: "categoryNo",
        label: "categoryName"
      },
      columns: [
        {
          field: "faultNo",
          title: "备件编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultNo",
          title: "备件名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultNo",
          title: "备件型号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultNo",
          title: "设备规格",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        }
      ],
      columns1: [
        {
          field: "faultNo",
          title: "备件名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultNo",
          title: "备件编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultNo",
          title: "备件型号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultNo1",
          title: "*数量",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true
        },
        {
          field: "faultNo",
          title: "*单价（元）",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true
        },
        {
          field: "faultNo",
          title: "金额",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "faultNo",
          title: "*供应商",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true
        },
        {
          field: "faultNo",
          title: "*批次",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true
        },
        {
          field: "faultNo",
          title: "*存放位置",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true
        },
        {
          field: "faultNo",
          title: "*备注",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          isEdit: true
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
      tableData: [
        {
          faultNo: "1111"
        }
      ],
      tableData1: [
        {
          faultNo: "1111",
          faultNo1: "22222"
        },
        {
          faultNo: "1111",
          faultNo1: "22222"
        },
        {
          faultNo: "1111",
          faultNo1: "22222"
        }
      ]
    };
  },
  methods: {
    cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
      this.tableData1[rowIndex][field] = newValue;
      // 接下来处理你的业务逻辑，数据持久化等...
    },
    customCompFunc(params) {
      if (params.type === "delete") {
        console.log(params.rowData);
        // this.deleteOne(params.rowData["id"]);
        // this.$delete(this.tableData, params.index);
      }
    },
    toDetails(rowIndex, rowData, column) {
      console.log(rowData);
    },
    handleChange2(value) {
      let name = this.$refs["getName2"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      console.log(id, name);
    }
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
        height: 426px;
      }
      .inventory-list {
        width: 68%;
        // border: @border;
        float: left;
        height: 426px;
      }
    }
  }
}
</style>
