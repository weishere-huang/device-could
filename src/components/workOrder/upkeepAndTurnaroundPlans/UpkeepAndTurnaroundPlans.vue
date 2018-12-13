<template>
  <div class="breakdown-order">
    <div class="top">
      <el-button size="small" type="primary" @click="toBack">返回</el-button>
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
              <el-button type="primary" size="mini" @click="search">搜索</el-button>
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
          <el-button type="primary" @click="goExit" size="mini">取 消</el-button>
          <el-button @click="examineUp" type="primary" size="mini">提 交</el-button>
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
            :model="workInfo"
          >
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
          <h5>计划详情</h5>
          <el-form
            label-width="120px"
            :model="maintenancePlan"
          >
            <el-form-item label="分类：">
              <span>{{maintenancePlan.maintenanceClassify}}</span>
            </el-form-item>
            <el-form-item label="级别：">
              <span>{{maintenancePlan.maintenanceLevel}}</span>
            </el-form-item>
            <el-form-item label="计划类型：">
              <span>{{maintenancePlan.maintenanceType}}</span>
            </el-form-item>
            <el-form-item label="开始时间：">
              <span>{{maintenancePlan.startTime}}</span>
            </el-form-item>
            <el-form-item label="结束时间：">
              <span>{{maintenancePlan.endTime}}</span>
            </el-form-item>
            <el-form-item label="执行时间：">
              <span>{{maintenancePlan.executeTime}}</span>
            </el-form-item>
            <el-form-item label="计划频次：">
              <span>{{maintenancePlan.frequency}}</span>
            </el-form-item>
            <el-form-item label="计划内容：">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 6}"
                placeholder=""
                v-model="maintenancePlan.maintenanceCc"
                readonly
                style="width:94%"
              ></el-input>
            </el-form-item>
            <el-form-item label="计划制定人：">
              <span>{{maintenancePlan.creator}}</span>
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
            :columns="devicesTable"
            :table-data="devicesTableData"
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
            ></v-table>
          </div>
        </el-dialog>
        <!-- 设备对象人员查看弹框结束 -->
        <div class="supplies">
          <h5>工单物料</h5>
          <div style="padding-bottom:10px;">
            <el-button  type="primary" size="mini" @click="listBasicInfo">从物料库中添加</el-button>
            <el-button  type="primary" @click="insertPart" size="mini">保存列表</el-button>
          </div>
          <v-table
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="workSheetMaterialTable"
            :table-data="workSheetMaterialTableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
            row-height=24
          >
          </v-table>
        </div>
        <!-- 物料添加弹窗 -->
        <el-dialog title="备品备件" :visible.sync="dialogVisible2" width="70%">
          <div style="padding:10px" class="dialog-case">
            <div class="spare-parts-list" style="overflow:scroll;height:425px">
              <el-tree
                :data="data2"
                node-key="id"
                @node-click="handleNodeClick"
                :props="defaultProps"
                default-expand-all
                :expand-on-click-node="false"
              >
              </el-tree>
            </div>
            <div class="center-list">
              <div style="padding:10px;">
                <el-input
                  type="search"
                  size="mini"
                  v-model="searchPerson"
                  style="width:50%;"
                  placeholder="关键词：设备编号、备件名称、型号/规格"
                ></el-input>
                <el-button type="primary" @click="goDownEntryInfo" size="mini">查询</el-button>
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
            <div class="add">
              <div style="text-align:center">
                <el-button type="primary" @click="deleteBasic" size="mini">提交</el-button>
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
          <div
            style="overflow-y:scroll;"
            class="case"
          >
            <el-form
              label-width="100px"
              :model="workReceiptInfo"
            >
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
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder=""
                  readonly
                  style="width:94%"
                  v-model="workReceiptInfo.dealContent"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="information-flow">
          <h6>流程信息</h6>
          <v-table
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="flowInfoTable"
            :table-data="flowInfoData"
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
        workId:0,
        pageIndex:1,
        pageSize:10,
        pageNumber:0,
        personListValue: [],
        data2: [],
        defaultProps: {
          children: "children",
          label: "name"
        },
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
        maintenancePlan:{
          id:"",
          organizeCode:"",
          organizeName:"",
          planName:"",
          planCode:"",
          maintenanceClassify:"",
          maintenanceLevel:"",
          maintenanceType:"",
          planType:"",
          startTime:"",
          endTime:"",
          executeTime:"",
          frequency:"",
          frequencyType:"",
          maintenanceCc:"",
          reminding:"",
          remindNum:"",
          isReceipt:"",
          createTime:"",
          editorTime:"",
          creatorId:"",
          creator:"",
          state:"",
        },
        dialogVisible2: false,
        dialogVisible1: false,
        outerVisible: false,
        innerVisible: false,
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
        workSheetMaterialTableData: [],
        devicesTableData: [],
        flowInfoData: [],
        devicesTable: [
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
        workSheetMaterialTable: [
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
        flowInfoTable: [
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
        ],
        toExamine:{
          userId:"",
          name:"",
        },
        examine:{
          desc:"",
          type:"",
          radio:0,
          msg: ""
        },
        personPageIsOk:true,
        basicInfoPageIsOk:true,
      };
    },
    methods: {
      // 单元格编辑回调
      cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
        this.workSheetMaterialTableData[rowIndex][field] = newValue;
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
      pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        if(this.basicInfoPageIsOk){
          this.pageBasicInfo();
        }
        if(this.searchPerson!==""){
          this.goDownEntryInfo();
        }
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        if(this.basicInfoPageIsOk){
          this.pageBasicInfo();
        }
        if(this.searchPerson!==""){
          this.goDownEntryInfo();
        }
      },
      personPageChange(pageIndex) {
        this.pageIndex = pageIndex;
        if(this.personPageIsOk){
          this.personLoad();
        }
        if(this.key!==""){
          this.search();
        }
      },
      personPageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        if(this.personPageIsOk){
          this.personLoad();
        }
        if(this.key!==""){
          this.search();
        }
      },
      handleNodeClick(data) {
        this.findBasicInfoByTypeId(data.id);
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


      //回退
      toBack(){
        this.$router.back(-1)
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
          this.personPageIsOk=true;
          this.personLoad();
        }else{
          this.personPageIsOk=false;
          this.pageIndex =1;
          this.Axios(
            {
              params: {
                condition: this.key,
                page:this.pageIndex,
                size:this.pageSize
              },
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
      //执行审核
      examineUp(){
        if(this.toExamine.userId !==""|| this.examine.type){
          this.toExamineUp();
        }else{
          this.$message.error('请选择终审或添加下一级审批人')
        }
      },
      toExamineUp(){
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
            this.toBack();
          },
          ({ type, info }) => {
            this.pageNumber = "";
            this.outerVisible = false;
            this.pageIndex = 1;
            this.pageSize = 10;
            this.examine.desc = "";
            this.examine.radio = 0;
          }
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
      //工单信息加载
      overhaulLoad(stateNum){
        this.Axios(
          {
            params: {workId:stateNum},
            type: "get",
            url: "/maintenanceWork/findOneWork",
          },
          this
        ).then(
          response => {
            this.workInfoValue(response.data.data.work);
            this.maintenancePlanValue(response.data.data.maintenancePlan);
            this.devicesTableDataValue(response.data.data.devices);
            this.workSheetMaterialValue(response.data.data.workSheetMaterial);
            this.workReceiptInfoValue(response.data.data.workReceiptInfo);
            this.flowInfo(response.data.data.sysLog);
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
      pageBasicInfo(){
        this.Axios(
          {
            params: {page:this.pageIndex,size:this.pageSize},
            type: "get",
            url: "/part/listBasicInfo",
          },
          this
        ).then(
          response => {
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
            this.data2= this.filterArray2(result.data.data,0);
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
      //备品模糊查询
      goDownEntryInfo(){
        if(this.searchPerson===""){
          this.basicInfoPageIsOk = true;
          this.listBasicInfo();
        }else{
          this.basicInfoPageIsOk = false;
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
      //双击删除指定的备品备件
      basicAdd(event){
        this.personListValue = this.personListValue.filter(item=>item.id!=event.target.id);
      },
      //关闭备品备件页面并传值到详情页
      deleteBasic(){
        this.dialogVisible2 = false;
        this.workSheetMaterialTableData = this.personListValue;
      },
      //保存工单物料到数据库
      insertPart(){
        for (let i in this.workSheetMaterialTableData) {
          if(this.workSheetMaterialTableData[i].partCategory === "普通件"){
            this.workSheetMaterialTableData[i].partCategory = 1;
          }
          if(this.workSheetMaterialTableData[i].partCategory === "关键件"){
            this.workSheetMaterialTableData[i].partCategory = 2;
          }
        }
        console.log(JSON.stringify(this.workSheetMaterialTableData));
        let qs = require("qs");
        let data = qs.stringify({
          workId:this.workInfo.id,
          workSheetMaterialDTOS:JSON.stringify(this.workSheetMaterialTableData)
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

      //工单信息
      workInfoValue(value){
        this.workInfo = value;
        if (value.workType ===0){
          this.workInfo.workType = "检修"
        }
        if (value.workType ===1){
          this.workInfo.workType = "保养"
        }
        if (value.workType ===2){
          this.workInfo.workType = "故障"
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
        if (value.state === 15) {
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
      //计划详情
      maintenancePlanValue(value){
        this.maintenancePlan = value;
        if(this.maintenancePlan.maintenanceClassify === 0){
          this.maintenancePlan.maintenanceClassify = "维修";
        }if(this.maintenancePlan.maintenanceClassify === 1){
          this.maintenancePlan.maintenanceClassify = "保养";
        }

        if(this.maintenancePlan.maintenanceLevel===1){
          this.maintenancePlan.maintenanceLevel = "小";
        }if(this.maintenancePlan.maintenanceLevel===2){
          this.maintenancePlan.maintenanceLevel = "中";
        }if(this.maintenancePlan.maintenanceLevel===3){
          this.maintenancePlan.maintenanceLevel = "大";
        }

        if (this.maintenancePlan.maintenanceType === 0){
          this.maintenancePlan.maintenanceType = "单次"
        }if (this.maintenancePlan.maintenanceType === 1){
          this.maintenancePlan.maintenanceType = "周期"
        }
      },
      //设备
      devicesTableDataValue(value){
        this.devicesTableData = value;
      },
      //物料
      workSheetMaterialValue(value){
        this.workSheetMaterialTableData = value;
      },
      //添加物料
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
      //回执信息
      workReceiptInfoValue(value){
        this.workReceiptInfo = value
      },
      //流程信息
      flowInfo(value){
        this.flowInfoData = value;
      },

    },
    created(){
      this.workId = this.$route.params.id;
      this.overhaulLoad(this.workId);
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
