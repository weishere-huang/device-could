<template>
  <div class="breakdown-order">
    <div class="top">
      <el-button @click="toBack" type="primary" size="small">返回</el-button>
      <el-button size="small" type="primary" @click="outerVisible=true">提交审核</el-button>
      <!-- 审核弹框 -->
      <el-dialog title="审核" :visible.sync="outerVisible" width="600px">
        <el-form label-position=right label-width="120px" :model="examine" style="padding:10px">
          <el-form-item label="审批结果：">
            <el-radio v-model="examine.radio" :label="0">同意</el-radio>
            <el-radio v-model="examine.radio" :label="1">驳回</el-radio>
          </el-form-item>
          <el-form-item label="审批意见：">
            <el-input type="textarea" v-model="examine.desc"></el-input>
          </el-form-item>
          <div v-if="examine.radio!=1">
            <el-form-item label="是否终审：">
              <el-checkbox-group v-model="examine.type">
                <el-checkbox label="" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="下一级审批人：" v-if="examine.type!=true">
              <el-input v-model="toExamine.name" size="mini" style="width:60%"></el-input>
              <el-button type="primary" @click="personLoad" size="mini">添加审批人</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-dialog title="人员添加" :visible.sync="innerVisible" append-to-body>
          <div style="padding:10px">
            <div class="search" style="padding:10px 0">
              <el-input type="search" size="mini" v-model="key" style="width:30%;"></el-input>
              <el-button size="mini" type="primary" @click="search">搜索</el-button>
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
                row-click-color="#edf7ff"></v-table>
              <div
                class="mt20 mb20 bold"
                style="text-align:left;margin-top:20px;"
              >
                <v-pagination
                  @page-change="personPageChange"
                  @page-size-change="personPageSizeChange"
                  :total="pageNumber"
                  :page-size="pageSize"
                  :page-index="pageIndex"
                  :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
                ></v-pagination>
              </div>
            </div>
          </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="goExit" type="primary" size="mini">取 消</el-button>
          <el-button @click="examineUp" type="primary" size="mini">提 交</el-button>
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
              <span>{{formLabelAlign.faultNo}}</span>
            </el-form-item>
            <el-form-item label="故障等级：">
              <span>{{formLabelAlign.faultLevel}}</span>
            </el-form-item>
            <el-form-item label="影响范围：">
              <span>{{formLabelAlign.incidence}}</span>
            </el-form-item>
            <el-form-item label="故障提交人：">
              <span>{{formLabelAlign.discovery}}</span>
            </el-form-item>
            <el-form-item label="故障上报时间：">
              <span>{{formLabelAlign.discoveryTime}}</span>
            </el-form-item>
            <el-form-item label="故障描述：">
              <el-input type="textarea" v-model="formLabelAlign.faultDesc" :autosize="{ minRows: 6, maxRows: 6}" placeholder="" readonly style="width:94%"></el-input>
            </el-form-item>
            <el-form-item label="原因分析：">
              <el-input type="textarea" v-model="formLabelAlign.causeAnalysis" :autosize="{ minRows: 6, maxRows: 6}" placeholder="" readonly style="width:94%"></el-input>
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
          <h5>设备信息</h5>
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
            <el-button size="mini" type="primary" @click=" listBasicInfo">从物料库中添加</el-button>
            <el-button type="primary" @click="insertPart" size="mini">保存列表</el-button>
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
                <el-button @click="goDownEntryInfo" type="primary"  size="mini">查询</el-button>
              </div>
              <v-table
                is-horizontal-resize
                column-width-drag
                :multiple-sort="false"
                style="width:100%; min-height:300px;max-height:400px"
                :columns="materielTable"
                :table-data="materielData"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                :row-dblclick="basicInfo"
                :cell-edit-done="cellEditDone"
                row-height=24
                :height="230"
              ></v-table>
              <div
                class="mt20 mb20 bold"
                style="text-align:left;margin-top:20px;"
              >
                <v-pagination
                  @page-change="pageChange"
                  @page-size-change="pageSizeChange"
                  :total="pageNumber"
                  :page-index="pageIndex"
                  :page-size="pageSize"
                  :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
                ></v-pagination>
              </div>
            </div>
            <div class="add">
              <div style="text-align:center">
                <el-button @click="deleteBasic" type="primary" size="mini">提交</el-button>
              </div>
              <ul>
                <h6>已选择</h6>
                <li v-model="personListValue" v-for="value in personListValue">
                  {{value.partName}}
                  <span :id="value.id" @click="basicAdd($event)">X</span>
                </li>
              </ul>
            </div>
          </div>
        </el-dialog>
        <!-- 物料添加弹窗结束 -->
        <div class="information-receipt">
          <h5>回执信息</h5>
          <div style="overflow-y:scroll;" class="case">
            <el-form label-width="100px" :model="workReceiptInfo">
              <el-form-item label="施工人员：">
                <span>{{workReceiptInfo.builder}}</span>
              </el-form-item>
              <el-form-item label="处理状态：">
                <span>{{workReceiptInfo.dealState}}</span>
              </el-form-item>
              <el-form-item label="处理时间：">
                <span>{{workReceiptInfo.dealTime}}</span>
              </el-form-item>
              <el-form-item label="处理内容：">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="" readonly style="width:94%" v-model="workReceiptInfo.dealContent"></el-input>
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
        examine:{
          desc:"",
          type:"",
          radio:0,
          msg: ""
        },
        toExamine:{
          userId:"",
          name:"",
        },
        pageIndex:1,
        pageSize:10,
        pageNumber:0,
        personListValue: [],
        clickId:"",
        defaultProps: {
          children: "children",
          label: "name"
        },
        spareParts: [],
        searchPerson: "",
        key: "",
        toAudit: {},
        workInfo: {
          id:"",
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
          img:"",
          revokeId:"",
          faultLevel:"",
          deviceId:"",
          faultNo:"",
          deviceName:"",
          revokeTime:"",
          discovery:"",
          discoveryTime:"",
          dispelCause:"",
          id:0,
          state:0,
          discoveryId:"",
          organizeCode:"",
          incidence:"",
          dispelTime:"",
          revokePeople:"",
          organizeName:"",
          faultDuration:"",
          dispel:"",
          deviceSpec:"",
          locationNo:"",
          revokeCause:"",
          faultSource:"",
          faultDesc:"",
          deviceNo:"",
          deviceModel:"",
          location:"",
          causeAnalysis:"",
          dispelId:"",
        },
        workReceiptInfo:{
          id:"",
          workId:"",
          builderId:"",
          builder:"",
          dealState:"",
          dealTime:"",
          dealContent:"",
          gmtCreate:"",
          gmtModified:"",
          state:"",
        },
        suppliesTableData: [],
        equipmentTableData: [],
        informationData: [],
        equipmentTable: [
          {
            field: "deviceNo",
            title: "设备编号",
            width: 100,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "deviceName",
            title: "设备名称",
            width: 140,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "deviceModel",
            title: "型号/规格",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "locationNo",
            title: "设备位号",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "location",
            title: "设备位置",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "charges",
            title: "设备负责人",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "repairs",
            title: "维修人员",
            width: 90,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          }
        ],
        suppliesTable: [
          {
            field: "partNo",
            title: "备件编号",
            width: 100,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "partName",
            title: "名称",
            width: 100,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "partModel",
            title: "型号/规格",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "planCount",
            title: "计划数量",
            width: 70,
            titleAlign: "center",
            columnAlign: "center",

            isResize: true,
            isEdit: true
          },
          {
            field: "actualCount",
            title: "实际数量",
            width: 70,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
          },
          {
            field: "partUnit",
            title: "计量单位",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "isOk",
            title: "操作",
            width: 90,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          }
        ],
        informationTable: [
          {
            field: "operateDesc",
            title: "工单进度",
            width: 200,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "gmtModified",
            title: "处理时间",
            width: 100,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          }
        ],
        materielTable:[
          {
            field: "partNo",
            title: "备件编号",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "partName",
            title: "备件名称",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "partModel",
            title: "型号/规格",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "partCategory",
            title: "备件级别",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "partClassifyName",
            title: "备件分类",
            width: 60,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "inventory",
            title: "库存",
            width: 60,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "partUnit",
            title: "计量单位",
            width: 60,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          }
        ],
        materielData:[],
        personTable: [
          {
            field: "workTypeName",
            title: "职责",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "name",
            title: "姓名",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "phone",
            title: "手机号",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "organizeName",
            title: "组织单位/部门",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "position",
            title: "岗位",
            width: 60,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
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
        this.toExamine = rowData;
        this.innerVisible = false;
      },
      checkPerson(rowIndex, rowData, column) {
        this.dialogVisible1 = true;
        this.findByDeviceId(rowData.id);
      },
      handleNodeClick(data) {
        this.findBasicInfoByTypeId(data.categoryNo);
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
      basicInfo(rowIndex, rowData, column){
        this.personListValue.push(rowData);
        this.personListValue = Array.from(new Set(this.personListValue));
      },
      pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.listBasicInfo();
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.listBasicInfo();
      },
      personPageChange(pageIndex) {
        this.pageIndex = pageIndex;
      },
      personPageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
      },

      //执行审核
      examineUp(){
        this.Axios(
          {
            params: {
              nextUserId: this.toExamine.userId,
              workId:this.workInfo.id,
              auditOpinion:this.examine.desc,
              passOrTurn:this.examine.radio
            },
            type: "get",
            url: "/maintenanceWork/workAudit"
          },
          this
        ).then(
          response => {
            this.pageNumber = "";
            this.outerVisible = false;
            this.pageIndex = 1;
            this.pageSize = 10;
            this.examine.desc = "";
            this.examine.radio = 0;
          },
          ({ type, info }) => {}
        );
      },

      //取消审核
      goExit(){
        this.pageNumber = "";
        this.outerVisible = false;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.examine.desc = "";
        this.examine.radio = 0;
      },

      //添加审核人员
      personLoad(){
        this.innerVisible = true;
        this.Axios(
          {
            params: { page: this.pageIndex, size: this.pageSize },
            type: "get",
            url: "/employee/findEmployeeList"
          },
          this
        ).then(
          response => {
            this.pageNumber = response.data.data.totalElements;
            this.tableData = response.data.data.content;
            this.tableDate = this.tableData;
          },
          ({ type, info }) => {}
        );
      },

      //通过手机号姓名搜索员工
      search() {
        if(/^1\d{10}$/ .test(this.key)) {
          if (!(/^1[345789]\d{9}$/.test(this.key))) {
            alert("手机号码有误，请重填");
          }
        }if(this.key===""){
          this.load();
        }else{
          this.pageIndex =1;
          this.Axios(
            {
              params: {condition: this.key},
              type: "get",
              url: "/employee/search",
            },
            this
          ).then(response => {
              if(this.key!==""){
                this.pageNumber = response.data.data.totalElements;
                this.tableData = response.data.data.content;
                this.tableDate = this.tableData;
              }else{
                this.pageChange(1);
              }
            },
            ({type, info}) => {
            })
        }

      },

      //保存工单物料到数据库
      insertPart(){
        for (let i in this.suppliesTableData) {
          if(this.suppliesTableData[i].partCategory === "普通件"){
            this.suppliesTableData[i].partCategory = 1;
          }
          if(this.suppliesTableData[i].partCategory === "关键件"){
            this.suppliesTableData[i].partCategory = 2;
          }
        }
        console.log(this.workInfo.id);
        let qs = require("qs");
        let data = qs.stringify({
          workId:this.workInfo.id,
          workSheetMaterialDTOS:JSON.stringify(this.suppliesTableData)
        });
        this.Axios(
          {
            params:data,
            type: "post",
            url: "/maintenanceWork/insertPart",
          },
          this
        ).then(
          response => {
            console.log(response.data);
          },
          ({type, info}) => {
            this.addMaterielValue();
          })
      },

      //加载工单详细信息
      workLoad(stateNum){
        this.Axios(
          {
            params: {workId:stateNum},
            type: "get",
            url: "/maintenanceWork/findOneWork",
          },
          this
        ).then(
          response => {
            console.log(response.data.data);
            this.workInfoValue(response.data.data.work);
            this.formLabelAlignValue(response.data.data.fault);
            this.equipmentTableDataValue(response.data.data.devices);
            this.suppliesTableDataValue(response.data.data.workSheetMaterial);
            this.workReceiptInfoValue(response.data.data.workReceiptInfo);
            this.informationDataValue(response.data.data.sysLog);
          },
          ({type, info}) => {

          })
      },

      //通过设备ID查找相关负责人员
      findByDeviceId(deviceId){
        this.Axios(
          {
            params: {deviceId:deviceId},
            type: "get",
            url: "/device/findDeviceWorker",
          },
          this
        ).then(
          response => {
            // console.log(response.data.data);
            this.personData = response.data.data;
          },
          ({type, info}) => {

          })
      },

      //备品备件信息
      listBasicInfo(){
        this.dialogVisible2=true;
        this.Axios(
          {
            params: {page:this.pageIndex,size:this.pageSize},
            type: "get",
            url: "/part/listBasicInfo",
          },
          this
        ).then(
          response => {
            this.findAlldeviceClassify();
            this.addMaterielValue(response.data.data.content);
            this.pageNumber = response.data.data.totalElements;
          },
          ({type, info}) => {

          })
      },

      //备件类别转树状结构
      filterArray2(data, parent) {
        let vm = this;
        var tree = [];
        var temp;
        for (var i = 0; i < data.length; i++) {
          if (data[i].parentCode == parent) {
            var obj = data[i];
            temp = this.filterArray2(data, data[i].code);
            if (temp.length > 0) {
              obj.children = temp;
            }
            tree.push(obj);
          }
        }
        return tree;
      },
      findAlldeviceClassify(){
        this.Axios({
          params: {},
          type: "get",
          url: "/part/list",
        },this)
          .then(result => {
            this.spareParts= this.filterArray2(result.data.data,0);
          })
          .catch(err => {
            console.log(err);
          });
      },

      //通过备品类别ID查询相关备品
      findBasicInfoByTypeId(typeID){
        this.Axios(
          {
            params: {
              classifyId:typeID,
              page:this.pageIndex,
              size:this.pageSize
            },
            type: "get",
            url: "/part/listInfoByClassifyId",
          },
          this
        ).then(
          response => {
            this.pageNumber = response.data.data.totalElements;
            this.addMaterielValue(response.data.data.content);
          },
          ({type, info}) => {
            this.addMaterielValue();
          })
      },

      //关闭备品备件页面并传值到详情页
      deleteBasic(){
        this.dialogVisible2 = false;
        this.suppliesTableData = this.personListValue;
      },

      //双击删除指定的备品备件
      basicAdd(event){
        this.personListValue = this.personListValue.filter(item=>item.id!=event.target.id);
      },

      //备品模糊查询
      goDownEntryInfo(){
        //searchPerson
        if(this.searchPerson===""){
          this.listBasicInfo();
        }else{
          this.Axios(
            {
              params: {
                keywords:this.searchPerson,
                page:this.pageIndex,
                size:this.pageSize
              },
              type: "get",
              url: "/part/searchBasicInfo",
            },
            this
          ).then(
            response => {
              this.pageNumber = response.data.data.totalElements;
              this.addMaterielValue(response.data.data.content);
            },
            ({type, info}) => {
              this.addMaterielValue();
            })
        }
      },

      //工单信息
      workInfoValue(value){
        this.workInfo = value;
        if (value.workType ===2){
          this.workInfo.workType = "故障"
        }else{
          this.workInfo.workType = "系统错误"
        }
        if (value.state === 0) {
          this.workInfo.state = "待审核";
        }
        if (value.state === 1) {
          this.workInfo.state = "已通过";
        }
        if (value.state === 2) {
          this.workInfo.state = "已禁用";
        }
        if (value.state === 3) {
          this.workInfo.state = "已删除";
        }
        if (value.state === 4) {
          this.workInfo.state = "审核中";
        }
        if (value.state === 5) {
          this.workInfo.state = "待处理";
        }
        if (value.state === 6) {
          this.workInfo.state = "已消除";
        }
        if (value.state === 7) {
          this.workInfo.state = "已撤销";
        }
        if (value.state === 10) {
          this.workInfo.state = "已驳回";
        }
        if (value.state === 12) {
          this.workInfo.state = "已停止";
        }
        if (value.state === 13) {
          this.workInfo.state = "已完成";
        }
      },
      //故障详情
      formLabelAlignValue(value){
        this.formLabelAlign = value;
        if (this.formLabelAlign.faultLevel === 1) {
          this.formLabelAlign.faultLevel = "低";
        }
        if (this.formLabelAlign.faultLevel === 2) {
          this.formLabelAlign.faultLevel = "中";
        }
        if (this.formLabelAlign.faultLevel === 3) {
          this.formLabelAlign.faultLevel = "高";
        }
      },
      //设备
      equipmentTableDataValue(value){
        let arr = value;
        this.equipmentTableData = arr;
      },
      //工单物料
      suppliesTableDataValue(value){
        this.suppliesTableData = value;
      },
      //备品备件
      addMaterielValue(value){
        this.materielData = value;
        for(let i in value){
          if(value[i].partCategory === 1){
            this.materielData[i].partCategory ="普通件";
          }
          if(value[i].partCategory === 2){
            this.materielData[i].partCategory ="关键件";
          }else{
            this.materielData[i].partCategory ="普通件";
          }
        }
      },
      //流程信息
      workReceiptInfoValue(value){
        this.workReceiptInfo = value;
      },
      //回执信息
      informationDataValue(value){
        this.informationData = value;
      }
    },
    created(){
      this.workLoad(this.$route.query.id);
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
          span {
            float: right;
            cursor: pointer;
            display: none;
          }
          &:hover {
            span {
              display: block;
            }
          }
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
