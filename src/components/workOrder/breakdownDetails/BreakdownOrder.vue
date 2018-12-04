<template>
  <div class="breakdown-order">
    <div class="top">
      <el-button size="small">返回</el-button>
      <el-button
        size="small"
        @click="outerVisible=true"
      >提交审核</el-button>
      <!-- 审核弹框 -->
      <el-dialog
        title="审核"
        :visible.sync="outerVisible"
        width="600px"
      >
        <el-form
          label-position=right
          label-width="120px"
          :model="formLabelAlign"
          style="padding:10px"
        >
          <el-form-item label="审批结果：">
            <el-radio
              v-model="formLabelAlign.radio"
              :label="0"
            >同意</el-radio>
            <el-radio
              v-model="formLabelAlign.radio"
              :label="1"
            >驳回</el-radio>
          </el-form-item>
          <el-form-item label="审批意见：">
            <el-input
              type="textarea"
              v-model="formLabelAlign.desc"
            ></el-input>
          </el-form-item>
          <div v-if="formLabelAlign.radio!=1">
            <el-form-item label="是否终审：">
              <el-checkbox-group v-model="formLabelAlign.type">
                <el-checkbox
                  label=""
                  name="type"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="下一级审批人："
              v-if="formLabelAlign.type!=true"
            >
              <el-input
                v-model="toAudit.name"
                size="mini"
                style="width:60%"
              ></el-input>
              <el-button
                type="primary"
                @click="innerVisible = true"
                size="mini"
              >添加审批人</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-dialog
          title="人员添加"
          :visible.sync="innerVisible"
          append-to-body
        >
          <div style="padding:10px">
            <div
              class="search"
              style="padding:10px 0"
            >
              <el-input
                type="search"
                size="mini"
                v-model="key"
                style="width:30%;"
              ></el-input>
              <el-button size="mini">搜索</el-button>
              <span style="padding:0 10px;">最近搜索：</span>
              <span style="text-decoration: underline;"></span>
            </div>
            <div class="tableList">
              <v-table
                :row-dblclick="getPersonnel"
                :select-all="selectALL"
                :select-group-change="selectGroupChange"
                is-horizontal-resize
                column-width-drag
                :multiple-sort="false"
                style="width:100%;min-height:300px;"
                :columns="columns"
                :table-data="tableData"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
              ></v-table>
            </div>
          </div>

        </el-dialog>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="outerVisible = false"
            size="mini"
          >取 消</el-button>
          <el-button
            @click="outerVisible = false"
            type="primary"
            size="mini"
          >提 交</el-button>
        </div>
      </el-dialog>
      <!-- 审核弹框结束 -->
    </div>
    <div class="bottom">
      <div class="left">
        <div class="msg">
          <h5>工单信息</h5>
          <el-form
            label-width="120px"
            :model="formLabelAlign"
          >
            <el-form-item label="工单编号：">
              <span></span>
            </el-form-item>
            <el-form-item label="工单类型：">
              <span></span>
            </el-form-item>
            <el-form-item label="工单状态：">
              <span></span>
            </el-form-item>
            <el-form-item label="工单创建时间：">
              <span></span>
            </el-form-item>
          </el-form>
        </div>
        <div class="breakdown-details">
          <h5>故障详情</h5>
          <el-form
            label-width="120px"
            :model="formLabelAlign"
          >
            <el-form-item label="故障编码：">
              <span></span>
            </el-form-item>
            <el-form-item label="故障等级：">
              <span></span>
            </el-form-item>
            <el-form-item label="影响范围：">
              <span></span>
            </el-form-item>
            <el-form-item label="故障提交人：">
              <span></span>
            </el-form-item>
            <el-form-item label="故障上报时间：">
              <span></span>
            </el-form-item>
            <el-form-item label="故障描述：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 6}"
                placeholder=""
                readonly
                style="width:94%"
              ></el-input>
            </el-form-item>
            <el-form-item label="原因分析：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 6}"
                placeholder=""
                readonly
                style="width:94%"
              ></el-input>
            </el-form-item>
            <el-form-item label="相关照片：">
              <span style="cursor: pointer;color:#409eff">查看照片</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="right">
        <div class="equipment">
          <h5>设备对象</h5>
          <v-table
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="equipmentTable"
            :table-data="equipmentTableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            row-height=24
            :height="160"
            :row-click="checkPerson"
          >
          </v-table>
        </div>
        <!-- 设备对象人员查看弹框 -->
        <el-dialog
          title="人员列表"
          :visible.sync="dialogVisible1"
          width="50%"
        >
          <div style="padding:10px">
            <v-table
              is-horizontal-resize
              column-width-drag
              :multiple-sort="false"
              style="width:100%;"
              :columns="personTable"
              :table-data="personData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
              :cell-edit-done="cellEditDone"
              row-height=24
              :height="230"
            ></v-table>
          </div>
        </el-dialog>
        <!-- 设备对象人员查看弹框结束 -->
        <div class="supplies">
          <h5>工单物料</h5>
          <div style="padding-bottom:10px;">
            <el-button size="mini">从物料库中添加</el-button>
            <el-button size="mini">保存列表</el-button>
          </div>
          <v-table
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="suppliesTable"
            :table-data="suppliesTableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
            row-height=24
            :height="140"
          >
          </v-table>
        </div>
        <!-- 物料添加弹窗 -->
        <el-dialog
          title="备品备件"
          :visible.sync="dialogVisible2"
          width="70%"
        >
          <div class="spare-parts-list"></div>
          <div style="padding:10px">
            <v-table
              is-horizontal-resize
              column-width-drag
              :multiple-sort="false"
              style="width:100%;"
              :columns="personTable"
              :table-data="personData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
              :cell-edit-done="cellEditDone"
              row-height=24
              :height="230"
            ></v-table>
          </div>
        </el-dialog>
        <!-- 物料添加弹窗结束 -->
        <div class="information-receipt">
          <h5>回执信息</h5>
          <div
            style="overflow-y:scroll;"
            class="case"
          >
            <el-form
              label-width="100px"
              :model="formLabelAlign"
            >
              <el-form-item label="施工人员：">
                <span></span>
              </el-form-item>
              <el-form-item label="处理状态：">
                <span></span>
              </el-form-item>
              <el-form-item label="处理时间：">
                <span></span>
              </el-form-item>
              <el-form-item label="处理内容：">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  readonly
                  style="width:94%"
                  v-model="formLabelAlign.msg"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="information-flow">
          <h5>流程信息</h5>
          <v-table
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="informationTable"
            :table-data="informationData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
            row-height=24
            :height="230"
          ></v-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: "",
      toAudit: {},
      formLabelAlign: {
        radio: ""
      },
      dialogVisible2: true,
      dialogVisible1: false,
      outerVisible: false,
      innerVisible: false,
      formLabelAlign: {
        msg: ""
      },
      suppliesTableData: [
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "999",
          address: "999",
          gmtCreate: "999"
        }
      ],
      equipmentTableData: [
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "999",
          address: "999",
          gmtCreate: "999"
        }
      ],
      informationData: [
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "11",
          address: "22",
          gmtCreate: "33"
        },
        {
          name: "999",
          address: "999",
          gmtCreate: "999"
        }
      ],
      equipmentTable: [
        {
          field: "name",
          title: "设备编号",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "设备名称",
          width: 140,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "phone",
          title: "型号/规格",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "gmtCreate",
          title: "设备位号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "state",
          title: "设备位置",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "state",
          title: "设备负责人",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "state",
          title: "维修人员",
          width: 90,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ],
      suppliesTable: [
        {
          field: "name",
          title: "备件编号",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "名称",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "phone",
          title: "型号/规格",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "gmtCreate",
          title: "计划数量",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          isEdit: true
        },
        {
          field: "state",
          title: "实际数量",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          isEdit: true
        },
        {
          field: "state",
          title: "计量单位",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "state",
          title: "操作",
          width: 90,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ],
      informationTable: [
        {
          field: "name",
          title: "工单进度",
          width: 200,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "处理时间",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        }
      ],
      personTable: [
        {
          field: "name",
          title: "姓名",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "手机号",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "组织单位/部门",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "岗位",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        }
      ],
      personData: [],
      tableData: [],
      columns: [
        {
          field: "employeeNo",
          title: "员工编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
          //   orderBy: ""
        },
        {
          field: "name",
          title: "姓名",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "phone",
          title: "手机号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "organizeName",
          title: "组织单位/部门",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "position",
          title: "岗位",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        }
      ]
    };
  },
  methods: {
    // 单元格编辑回调
    cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
      this.suppliesTableData[rowIndex][field] = newValue;

      // 接下来处理你的业务逻辑，数据持久化等...
    },
    selectGroupChange(selection) {
      console.log("select-group-change", selection);
    },
    selectALL(selection) {
      console.log("select-aLL", selection);
    },
    selectChange(selection, rowData) {
      console.log("select-change", selection, rowData);
    },
    getPersonnel(rowIndex, rowData, column) {
      console.log(rowData);
    },
    checkPerson(rowIndex, rowData, column) {
      console.log(rowData);
      this.dialogVisible1 = true;
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
.breakdown-order {
  font-size: 14px;
  h5 {
    position: relative;
    top: -18px;
    left: 10px;
    background-color: white;
    display: inline-block;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .top {
    padding: 10px;
    border: @border;
    border-radius: 5px;
  }
  .bottom {
    margin-top: 10px;
    //   border: @border;
    width: 100%;
    overflow: hidden;
    .left {
      float: left;
      width: 25%;
      //   border: @border;
      .msg {
        padding: 10px;
        border: @border;
        border-radius: 5px;
        margin-top: 20px;
      }
      .breakdown-details {
        padding: 10px;
        border: @border;
        border-radius: 5px;
        margin-top: 20px;
      }
    }
    .right {
      float: left;
      //   border: @border;
      width: 70%;
      margin-left: 10px;
      .equipment {
        border: @border;
        border-radius: 5px;
        margin-top: 20px;
        padding: 10px;
        height: 198px;
      }
      .supplies {
        border: @border;
        border-radius: 5px;
        margin-top: 20px;
        padding: 10px;
        height: 220px;
      }
      .information-receipt {
        border: @border;
        border-radius: 5px;
        margin-top: 20px;
        padding: 10px;
        width: 40%;
        float: left;
        .case {
          height: 220px;
        }
        .el-form {
          border-bottom: 1px dashed #dde2eb;
          padding-bottom: 10px;
        }
      }
      .information-flow {
        border: @border;
        border-radius: 5px;
        margin-top: 20px;
        margin-left: 10px;
        padding: 10px;
        width: 58%;
        float: left;
      }
    }
  }
}
</style>
