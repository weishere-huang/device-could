<template>
  <div class="breakdown-order">
    <div class="top">
      <el-button @click="toBack" size="small">返回</el-button>
      <el-button size="small" @click="outerVisible=true">提交审核</el-button>
      <!-- 审核弹框 -->
      <el-dialog title="审核" :visible.sync="outerVisible" width="600px">
        <el-form label-position=right label-width="120px" :model="formLabelAlign" style="padding:10px">
          <el-form-item label="审批结果：">
            <el-radio v-model="formLabelAlign.radio" :label="0">同意</el-radio>
            <el-radio v-model="formLabelAlign.radio" :label="1">驳回</el-radio>
          </el-form-item>
          <el-form-item label="审批意见：">
            <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
          </el-form-item>
          <div v-if="formLabelAlign.radio!=1">
            <el-form-item label="是否终审：">
              <el-checkbox-group v-model="formLabelAlign.type">
                <el-checkbox label="" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="下一级审批人：" v-if="formLabelAlign.type!=true">
              <el-input v-model="toAudit.name" size="mini" style="width:60%"></el-input>
              <el-button type="primary" @click="innerVisible = true" size="mini">添加审批人</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-dialog title="人员添加" :visible.sync="innerVisible" append-to-body>
          <div style="padding:10px">
            <div class="search" style="padding:10px 0">
              <el-input type="search" size="mini" v-model="key" style="width:30%;"></el-input>
              <el-button size="mini">搜索</el-button>
              <span style="padding:0 10px;">最近搜索：</span>
              <span style="text-decoration: underline;"></span>
            </div>
            <div class="tableList">
              <v-table :row-dblclick="getPersonnel" :select-all="selectALL" :select-group-change="selectGroupChange" is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:300px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
            </div>
          </div>

        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false" size="mini">取 消</el-button>
          <el-button @click="outerVisible = false" type="primary" size="mini">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 审核弹框结束 -->
    </div>
    <div class="bottom">
      <div class="left">
        <div class="msg">
          <h5>工单信息</h5>
          <el-form label-width="120px" :model="workInfo">
            <el-form-item label="工单编号：">
              <span>{{workInfo.workNo}}</span>
            </el-form-item>
            <el-form-item label="工单类型：">
              <span>{{workInfo.workType}}</span>
            </el-form-item>
            <el-form-item label="工单状态：">
              <span>{{workInfo.state}}</span>
            </el-form-item>
            <el-form-item label="工单创建时间：">
              <span>{{workInfo.gmtCreate}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="breakdown-details">
          <h5>故障详情</h5>
          <el-form label-width="120px" :model="formLabelAlign">
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
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="" readonly style="width:94%"></el-input>
            </el-form-item>
            <el-form-item label="原因分析：">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" placeholder="" readonly style="width:94%"></el-input>
            </el-form-item>
            <el-form-item label="相关照片：">
              <span style="cursor: pointer;color:#409eff" @click="pictureDialog=true">查看照片</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 照片弹框 -->
      <el-dialog title="查看图片" :visible.sync="pictureDialog" width="60%">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
      <!-- 照片弹框结束 -->
      <div class="right">
        <div class="equipment">
          <h5>设备对象</h5>
          <v-table is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;" :columns="equipmentTable" :table-data="equipmentTableData" row-hover-color="#eee" row-click-color="#edf7ff" row-height=24 :height="160" :row-click="checkPerson">
          </v-table>
        </div>
        <!-- 设备对象人员查看弹框 -->
        <el-dialog title="人员列表" :visible.sync="dialogVisible1" width="50%">
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
            <el-button size="mini" @click="dialogVisible2=true">从物料库中添加</el-button>
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
        <el-dialog title="备品备件" :visible.sync="dialogVisible2" width="70%">
          <div style="padding:10px" class="dialog-case">
            <div class="spare-parts-list">
              <el-tree
                :data="spareParts"
                node-key="id"
                @node-click="handleNodeClick"
                :props="defaultProps"
                default-expand-all
              >
              </el-tree>
            </div>
            <div class="center-list">
              <div style="padding:10px;">
                <el-input type="search" size="mini" v-model="searchPerson" style="width:50%;" placeholder="关键词：设备编号、备件名称、型号/规格"></el-input>
                <el-button size="mini">查询</el-button>
              </div>
              <v-table
                is-horizontal-resize
                column-width-drag
                :multiple-sort="false"
                style="width:100%; min-height:300px;max-height:400px"
                :columns="personTable"
                :table-data="personData"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                :cell-edit-done="cellEditDone"
                row-height=24
                :height="230"
              ></v-table>
            </div>
            <div class="add">
              <div style="text-align:center">
                <el-button size="mini">提交</el-button>
              </div>
              <ul>
                <h6>已选择</h6>
                <li></li>
              </ul>
            </div>
          </div>
        </el-dialog>
        <!-- 物料添加弹窗结束 -->
        <div class="information-receipt">
          <h5>回执信息</h5>
          <div style="overflow-y:scroll;" class="case">
            <el-form label-width="100px" :model="formLabelAlign">
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
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="" readonly style="width:94%" v-model="formLabelAlign.msg"></el-input>
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
      spareParts: [],
      defaultProps: {
        children: "",
        label: ""
      },
      searchPerson: "",
      key: "",
      toAudit: {},
      workInfo: {
        workNo:"",
        workType:"",
        state:"",
        gmtCreate:"",
      },
      pictureDialog: false,
      dialogVisible2: false,
      dialogVisible1: false,
      outerVisible: false,
      innerVisible: false,
      formLabelAlign: {
        msg: ""
      },
      suppliesTableData: [],
      equipmentTableData: [],
      informationData: [],
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
          title: "备件编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "备件名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "型号/规格",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "备件级别",
          width: 60,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "备件分类",
          width: 70,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "库存",
          width: 60,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "name",
          title: "计量单位",
          width: 60,
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
    toBack(){
      this.$router.back(-1)
    },

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
    },
    handleNodeClick(data) {
      this.clickId = data.id;
      this.toLoad();
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
    }
  },
  created(){
    this.workInfo=this.$store.state.operation.work;
    // console.log(aaa);
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
.dialog-case {
  overflow: hidden;
  .spare-parts-list {
    float: left;
    width: 20%;
    border: @border;
    border-radius: 5px;
    margin-right: 5px;
    padding: 10px;
  }
  .center-list {
    width: 60%;
    float: left;
    border: @border;
    margin-right: 5px;
    padding: 10px;
    border-radius: 5px;
  }
  .add {
    width: 18%;
    float: left;
    border: @border;
    padding: 10px;
    border-radius: 5px;
    ul {
      margin-top: 10px;
      li {
        list-style-type: none;
        height: 24px;
        line-height: 24px;
        width: 100%;
        padding: 0 5px;
      }
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
