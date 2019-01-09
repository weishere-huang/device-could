<template>
  <div class="breakdown-order">
    <div class="top">
      <el-button @click="toBack" type="primary" size="small" icon="el-icon-arrow-left">返回</el-button>
      <permission-button 
        permCode='work_list_detail_lookup.work_list_detail_audit'
        banType='alert'
        size="small" type="primary" @click="outerVisible=true" v-if="isOk">
        <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;提交审核</permission-button >
      <!-- 审核弹框 -->
      <el-dialog title="审核" :visible.sync="outerVisible" width="600px">
        <el-form label-position=right label-width="120px" :model="examine" style="padding:10px">
          <el-form-item label="审批结果：">
            <el-radio v-model="examine.radio" :label="0">同意</el-radio>
            <el-radio v-model="examine.radio" :label="1">驳回</el-radio>
          </el-form-item>
          <el-form-item label="审批意见：">
            <el-input type="textarea" autofocus v-model="examine.desc"></el-input>
          </el-form-item>
          <div v-if="examine.radio!=1">
            <el-form-item label="是否终审：">
              <el-checkbox-group v-model="examine.type">
                <el-checkbox label="" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="下一级审批人：" v-if="examine.type!=true">
              <el-input v-model="toExamine.name" size="mini" style="width:60%"></el-input>
              <el-button type="primary" @click="personLoad" size="mini">
                <i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;添加审批人</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-dialog title="人员添加" :visible.sync="innerVisible" append-to-body>
          <div style="padding:10px">
            <div class="search" style="padding:10px 0">
              <el-input type="search" placeholder="如姓名，手机号" size="mini" v-model="key" style="width:30%;"></el-input>
              <el-button size="mini" type="primary" @click="search"><i class='el-icon-search'></i>&nbsp;搜索</el-button>
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
          <el-button @click="goExit"  size="mini">
            <i style='font-size:12px' class='iconfont'>&#xe729;</i>&nbsp;取 消</el-button>
          <el-button @click="examineUp" type="primary" size="mini">
            <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;提 交</el-button>
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
          <el-carousel-item v-for="(item,index) in imgPath" :key="index">
            <img :src="item" style="height: 100%;width: 100%">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
      <!-- 照片弹框结束 -->
      <div class="right">
        <div class="equipment">
          <h5>设备信息</h5>
          <v-table is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;" :columns="equipmentTable" :table-data="equipmentTableData" row-hover-color="#eee" row-click-color="#edf7ff" :row-height=24 :height="160" :row-click="checkPerson">
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
              :row-height=35
              :height="230"
            ></v-table>
          </div>
        </el-dialog>
        <!-- 设备对象人员查看弹框结束 -->
        <div class="supplies">
          <h5>工单物料</h5>
          <div style="padding-bottom:10px;">
            <el-button size="mini" type="primary" @click=" listBasicInfo">
              <i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;添加物料</el-button>
            <permission-button 
              permCode='work_list_detail_lookup.work_list_detail_save'
              banType='alert'
              type="primary" @click="insertPart" size="mini">
              <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存列表</permission-button>
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
            :row-height=24
            :height="140"
            @on-custom-comp="customCompFunc"
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
                <el-input type="search" size="mini" v-model="searchPerson" style="width:55%;" placeholder="关键词：设备编号、备件名称、型号/规格"></el-input>
                <el-button @click="goDownEntryInfo" type="primary"  size="mini">
                  <i class='el-icon-search'></i>&nbsp;查询</el-button>
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
                :row-height=24
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
                <el-button @click="deleteBasic" type="primary" size="mini">
                  <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</el-button>
              </div>
              <ul>
                <h6>已选择</h6>
                <li v-model="personListValue" v-for="(value,index) in personListValue" :key="index">
                  {{value.partName}}
                  <span :id="value.id" @click="basicAdd($event)" class="el-icon-circle-close-outline"></span>
                </li>
              </ul>
            </div>
          </div>
        </el-dialog>
        <!-- 物料添加弹窗结束 -->
        <div class="information-receipt">
          <h5>回执信息</h5>
          <div style="overflow-y:scroll;" class="case">
            <el-form label-width="100px" :model="workReceiptInfo" v-for="(item,index) of workReceiptInfo" :key="index">
              <el-form-item label="施工人员：">
                <span>{{item.builder}}</span>
              </el-form-item>
              <el-form-item label="处理状态：">
                <span>{{item.dealState}}</span>
              </el-form-item>
              <el-form-item label="处理时间：">
                <span>{{item.dealTime}}</span>
              </el-form-item>
              <el-form-item label="处理内容：">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="" readonly style="width:94%" v-model="item.dealContent"></el-input>
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
            :row-height=24
            :height="230"
          ></v-table>
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
        isOk:true,
        imgPath:[],
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
        workReceiptInfo:[{
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
        }],
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
            isEdit: true,
            formatter(rowData,rowIndex,pagingIndex,field) {
              return `<s class='cell-edit-style'></s><span">${rowData.planCount}</span>`;
            }
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
            field: "custome-adv",
            title: "操作",
            width: 90,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            componentName: "table-breakdownOrder"
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
        ],
        personPageIsOk:true,
        basicInfoPageIsOk:true,
      };
    },
    methods: {
      customCompFunc(params) {
        if (params.type === "delete") {
          this.$confirm('此操作将删除该物料, 是否继续?', '提示')
            .then(_=>{
              this.suppliesTableData = this.suppliesTableData.filter(item=>item.id!=params.rowData["id"]);
              this.personListValue = this.personListValue.filter(item=>item.id!=params.rowData["id"]);
            })
            .catch(_=>{
            })

        }
      },
      toBack(){
        this.$router.back(-1)
      },

      // 单元格编辑回调
      cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
        let _suppliesTableData=require('clone')(this.suppliesTableData);
        _suppliesTableData[rowIndex][field] = newValue;
        this.suppliesTableData=_suppliesTableData;
        this.suppliesTableData = Array.from(new Set(this.suppliesTableData))
      },
      selectGroupChange(selection) {
        // console.log("select-group-change", selection);
      },
      selectALL(selection) {
        // console.log("select-aLL", selection);
      },
      selectChange(selection, rowData) {
        // console.log("select-change", selection, rowData);
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
        if( this.personListValue.find(i => i.partNo === rowData.partNo)){
          this.$message.error("请勿重复添加物料");
        }else{
          this.personListValue.push(rowData);
        }
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

      //执行审核
      examineUp(){
        if(this.examine.radio!=1){
          if(this.toExamine.userId !==""|| this.examine.type){
            this.toExamineUp();
          }else{
            this.$message.error('请选择终审或添加下一级审批人')
          }
        }else{
          this.toExamineUp();
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
            this.examine.type = false;
            this.toBack();
            this.$store.commit("workOrders","y");
          },
          ({ type, info }) => {
            this.pageNumber = "";
            this.outerVisible = false;
            this.pageIndex = 1;
            this.pageSize = 10;
            this.examine.desc = "";
            this.examine.type = false;
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

      //保存工单物料到数据库
      insertPart(){
        let isOk= "";
        if(this.suppliesTableData.length>0) {
          for (let i in this.suppliesTableData) {
            if (this.suppliesTableData[i].planCount == 0) {
              isOk = false;
              this.$message.error(this.suppliesTableData[i].partName + '物料未填入计划数量');
              break;
            }else{
              if (/^[0-9]*$/.test(this.suppliesTableData[i].planCount)) {
                isOk=true;
              }else{
                this.$message.error("请正确输入计划数量");
                isOk = false;
              }
            }
          }
          isOk? this.toInsertPart():"";
        }else {
          this.toInsertPart()
        }
      },
      toInsertPart(){
        for (let i in this.suppliesTableData) {
          if(this.suppliesTableData[i].partCategory === "普通件"){
            this.suppliesTableData[i].partCategory = 1;
          }
          if(this.suppliesTableData[i].partCategory === "关键件"){
            this.suppliesTableData[i].partCategory = 2;
          }
        }
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
            option:{successMsg:"操作成功"}
          },
          this
        ).then(
          response => {
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
            // console.log(response.data.data.devices);
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
        this.personListValue=[];
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
            this.suppliesTableData != [] ?
              this.suppliesTableData.map((item)=>{this.personListValue.push(item)}):
              "";

          },
          ({type, info}) => {

          })
      },
      //备品备件信息分页处理
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
          option:{enableMsg:false}
        },this)
          .then(result => {
            this.spareParts= this.filterArray2(result.data.data,0);
          })
          .catch(err => {
            // console.log(err);
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
        this.suppliesTableData =[];
        this.suppliesTableData = (this.suppliesTableData||[]).concat(this.personListValue);
        this.suppliesTableData.forEach((item)=>{
          if(item.planCount == "" || item.planCount ==null) item.planCount =1
        });
        this.suppliesTableData = Array.from(new Set(this.suppliesTableData))
      },

      //双击删除指定的备品备件
      basicAdd(event){
        this.personListValue = this.personListValue.filter(item=>item.id!=event.target.id);
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

      //工单信息
      workInfoValue(value){
        if (value.state ===0){
          this.isOk = true
        } else{
          this.isOk = false
        }
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
        if(this.formLabelAlign.img!==null){
          this.imgPath = this.formLabelAlign.img.split(",").map((item)=>{
            return this.global.imgPath+item.split("img:")[1];
          });
        }
      },
      //设备
      equipmentTableDataValue(value){
        this.equipmentTableData = value;
        // console.log(this.equipmentTableData)
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
      //回执信息
      workReceiptInfoValue(value){
        this.workReceiptInfo = value;
        for(let i in this.workReceiptInfo){
          if(this.workReceiptInfo[i].dealState==0){
            this.workReceiptInfo[i].dealState="已处理"
          }
          if(this.workReceiptInfo[i].dealState==1){
            this.workReceiptInfo[i].dealState="未处理"
          }
          if(this.workReceiptInfo[i].dealState==2){
            this.workReceiptInfo[i].dealState="已取消"
          }
        }
      },
      //流程信息
      informationDataValue(value){
        this.informationData = value;
      }
    },
    created(){
      this.workLoad(this.$route.params.id);
    }
  };
  Vue.component("table-breakdownOrder", {
    template: `<span>
          <a href="" style="text-decoration: none;color:#409eff"><i @click.stop.prevent="deleteRow(rowData,index)" style='font-size:16px' class='iconfont'>&#xe635;</i></a>
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
          }
          &:hover {
            span {
              display: block;
              color: red;
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
