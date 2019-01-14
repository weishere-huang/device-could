<template>
  <div class="turnaroundPlansAdd">
    <div class="top">
      <el-button size="small" type="primary" @click="toback" icon="el-icon-arrow-left">返回</el-button>
      <permission-button
        permCode='operation_overhaul_detail_lookup.operation_overhaul_detail_save'
        banType='hide'
        size="small" type="primary" @click="updatePlan" v-if="isOk">
        <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</permission-button>
      <permission-button
        permCode='operation_overhaul_detail_lookup.operation_overhaul_detail_audit'
        banType='hide'
        size="small" type="primary" @click="auditInfo" icon="el-icon-search">审核详情</permission-button>
    </div>
    <div class="bottom">
      <div class="left">
        <h5>检修计划</h5>
        <el-form label-width="100px">
          <el-form-item label="计划名称：">
            <el-input v-model="companyName.planName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="检修分类：">
            <el-select v-model="companyName.maintenanceClassify" placeholder="请选择" size="mini">
              <el-option label="日常检修（DM）" value="1"></el-option>
              <el-option label="定期检修（TBM）" value="2"></el-option>
              <el-option label="改进性检修（PAM）" value="3"></el-option>
              <el-option label="故障检修（RTF）" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检修级别：">
            <el-select v-model="companyName.maintenanceLevel" placeholder="请选择" size="mini">
              <el-option label="大" value="3"></el-option>
              <el-option label="中" value="2"></el-option>
              <el-option label="小" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划类型：">
            <el-radio-group v-model="companyName.planType">
              <el-radio label="单次"></el-radio>
              <el-radio label="周期"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <el-form label-width="110px" v-if="companyName.planType==='周期'" v-model="companyName.planType">
          <el-form-item label="计划日期：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="companyName.startTime"  format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">~</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="companyName.endTime" format="yyyy/MM/dd"  value-format="yyyy/MM/dd" style="width: 100%;" size="mini"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="首次执行时间：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="date"  format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="times" format="HH:mm:ss" value-format="HH:mm:ss" style="width: 100%;padding-right:5px;" size="mini"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="计划频次：">
            <el-input v-model="companyName.frequency" size="mini" style="width:80px"></el-input>
            <el-select v-model="companyName.frequencyType" placeholder="请选择" size="mini" style="width:80px">
              <el-option label="天" value="1"></el-option>
              <el-option label="周" value="2"></el-option>
              <el-option label="月" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检修内容：" style="height:auto;">
            <el-input type="textarea" v-model="companyName.maintenanceCc" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
        <!-- 单次执行 -->
        <el-form label-width="110px" v-if="companyName.planType==='单次'" v-model="companyName.planType">
          <el-form-item label="计划日期：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期"  format="yyyy/MM/dd" value-format="yyyy/MM/dd" v-model="companyName.startTime" style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="首次执行时间：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd" v-model="date" style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="times" format="HH:mm:ss" value-format="HH:mm:ss" style="width: 100%;padding-right:5px;" size="mini"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="检修内容：" style="height:auto;">
            <el-input type="textarea" v-model="companyName.maintenanceCc" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
        <el-form>
        </el-form>
      </div>
      <div class="right">
        <div>
          <el-button size="small" type="primary" @click="amendPlanIsShow">
            <i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;设备添加</el-button>
        </div>
        <h5>设备列表</h5>
        <v-table :show-vertical-border="false" @on-custom-comp="customCompFunc" is-horizontal-resize column-width-drag :multiple-sort="false" :height="350" style="width:100%;height:350px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
        
        
      </div>
      <el-dialog
      title="人员列表"
      :visible.sync="person"
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
          :row-height=30
          :show-vertical-border="false"
        ></v-table>
      </div>
    </el-dialog>
      <el-dialog
        title="审核详情"
        :visible.sync="submitAuditInfo"
        width="50%"
      >
        <div style="padding:10px">
          <v-table
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="submitAuditTable"
            :table-data="submitAuditData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :row-height=30
            :show-vertical-border="false"
          ></v-table>
        </div>
      </el-dialog>
    </div>
    <el-dialog
      title="设备添加"
      :visible.sync="amendPlanShow"
      width="900px"
    >
      <amend-plan v-show="amendPlanShow" v-on:isHide="isHide" v-on:toAdd="toAdd"></amend-plan>
    </el-dialog>
  </div>
</template>
<script>
  import amendPlan from './AmendPlan'
  import Vue from "vue";
  export default {
    name: "",
    data() {
      return {
        submitAuditInfo:false,
        person:false,
        isOk:true,
        arr:new Array(),
        auditId:0,
        deviceIds:0,
        date:"",
        times:"",
        amendPlanShow:false,
        time: new Date().toLocaleString(),
        companyName: {
          id:"",
          planName:"",
          maintenanceClassify:"",
          maintenanceLevel:"",
          maintenanceType:"",
          planType:"",
          startTime:"",
          endTime:"",
          executeTime:"",
          frequency:"",
          frequencyType:"",
          maintenanceCc:""
        },
        personTable: [
          {
            field: "workTypeName",
            title: "职责",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "name",
            title: "姓名",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "phone",
            title: "手机号",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "organizeName",
            title: "组织单位/部门",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "position",
            title: "岗位",
            width: 60,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
        ],
        personData: [],
        columns: [
          {
            field: "deviceNo",
            title: "设备编号",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
            //   orderBy: ""
          },
          {
            field: "deviceName",
            title: "设备名称",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "deviceModel",
            title: "型号/规格",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "location",
            title: "设备位置",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "workerNames",
            title: "人员",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            componentName: "table-amendPerson"
          },
        ],
        pageIndex: 1,
        pageSize: 10,
        tableData: [],
        tableDate: [],
        timeValue: "",
        submitAuditTable:[
          {
            field: "name",
            title: "审核人",
            width: 40,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "state",
            title: "审核状态",
            width: 60,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            formatter:function (rowData) {
              if(rowData.state===0)return`<span>待处理</span>`;
              if(rowData.state===1)return`<span>已通过</span>`;
              if(rowData.state===2)return`<span>已驳回</span>`;
            }
          },
          {
            field: "startTime",
            title: "提交时间",
            width: 60,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "endTime",
            title: "审核时间",
            width: 60,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
          },
          {
            field: "phone",
            title: "手机号",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "opinion",
            title: "审核意见",
            width: 180,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          }
        ],
        submitAuditData:[],
      };
    },
    created() {
      this.findOne(this.$route.params.id);
      this.loadSelect(this.$route.params.id);
    },
    methods: {
      //通过设备ID查找相关负责人员
      findByDeviceId(deviceId){
        this.Axios(
          {
            params: {deviceId:deviceId},
            type: "get",
            url: "/device/findDeviceWorker",
            option:{enableMsg:false}
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
      auditInfo(){
        this.submitAuditInfo = true;
        this.Axios(
          {
            params:{maintenanceId:this.companyName.id},
            type: "get",
            url: "/mplan/auditList",
            option:{enableMsg:false}
          },
          this
        ).then(response => {
            this.submitAuditData = response.data.data.content;
          },
          ({type, info}) => {

          })
      },
      customCompFunc(params) {
        if (params.type === "showLook") {
          this.findByDeviceId(params.rowData.id);
          this.person = true;
        }
      },

      isHide(params) {
        this.amendPlanShow = params;
      },
      toAdd(params){
        this.tableData = params.values;
        this.amendPlanShow = params.isOk;
      },
      amendPlanIsShow() {
        this.amendPlanShow = true;
      },
      findOne(number){
        this.Axios(
          {
            type: "get",
            url: "/mplan/findOne/"+number,
            option:{enableMsg:false}
          },
          this
        ).then(response => {
            this.loadValue(response.data.data);
          },
          ({type, info}) => {

          })
      },
      loadValue(value){
        this.companyName = value;
        this.companyName.maintenanceClassify = this.companyName.maintenanceClassify.toString();
        this.companyName.maintenanceLevel = this.companyName.maintenanceLevel.toString();
        if(this.companyName.planType=== 0){
          this.companyName.planType = "单次";
          this.companyName.frequency = 1;
          this.companyName.frequencyType = 1;
        }if(this.companyName.planType=== 1){
          this.companyName.planType = "周期"
        }
        this.companyName.frequencyType = this.companyName.frequencyType.toString();
        this.date = this.companyName.executeTime.split(" ")[0];
        this.times = this.companyName.executeTime.split(" ")[1].split(".")[0];
        this.companyName.state === 0 ? this.isOk = true : this.isOk = false;
      },

      TurnaroundPlans() {
        this.$router.push({
          path: "/TurnaroundPlans"
        });
        this.$store.commit("turnaroundPlans","y")
      },
      loadSelect(number){
        let arr=new Array()
        this.Axios(
          {
            params:{maintenanceId:number},
            type: "get",
            url: "/mplan/listDevice",
            option:{enableMsg:false}
          },
          this
        ).then(response => {
            arr = response.data.data;
            this.tableData = arr;
            this.tableDate = this.tableData;
          },
          ({type, info}) => {

          })
      },
      updatePlan(){
        // console.log(this.tableData);
        this.deviceIds = this.tableData.map(item=>item.id).toString();
        if(this.companyName.state===0){
          if(this.deviceIds!==""){
            this.toUpdatePlan()
          }else{
            this.$message.error("请至少选择一个设备")
          }
        }else{
          this.$message.error('只能修改待审核状态的计划')
        }
      },
      toUpdatePlan(){
        this.deviceIds = this.tableData.map(item=>item.id).toString();
        this.companyName.executeTime = this.date +" "+ this.times;
        this.companyName.executeTime = this.companyName.executeTime.split(".")[0].replace(/-/g,"/");
        this.companyName.startTime = this.companyName.startTime.split(" ")[0].replace(/-/g,"/");
        this.companyName.endTime = this.companyName.endTime.split(" ")[0].replace(/-/g,"/");
        if(this.companyName.planType === "单次"){
          this.companyName.planType = 0;
          this.companyName.frequency = -1;
          this.companyName.frequencyType = -1;
        }
        if(this.companyName.planType === "周期"){
          this.companyName.planType = 1
        }
        if(this.companyName.frequencyType ==="天" ){
          this.companyName.frequencyType = 0
        }
        if(this.companyName.frequencyType ==="周" ){
          this.companyName.frequencyType = 1
        }
        if(this.companyName.frequencyType ==="月" ){
          this.companyName.frequencyType = 2
        }
        let qs = require("qs");
        let data = qs.stringify({
          userId: this.userId,
          id:this.companyName.id,
          planName:this.companyName.planName,
          maintenanceClassify:this.companyName.maintenanceClassify,
          maintenanceLevel:this.companyName.maintenanceLevel,
          maintenanceType:this.companyName.maintenanceType,
          planType:this.companyName.planType,
          startTime:this.companyName.startTime,
          endTime:this.companyName.endTime,
          executeTime:this.companyName.executeTime,
          frequency:this.companyName.frequency,
          frequencyType:this.companyName.frequencyType,
          maintenanceCc:this.companyName.maintenanceCc,
          deviceIds : this.deviceIds,
        });
        this.Axios(
          {
            params:data,
            type: "post",
            url: "/mplan/updateMaintenancePlan",
            option:{successMsg:"操作成功"}
          },
          this
        ).then(response => {
            this.TurnaroundPlans();
          },
          ({type, info}) => {

          });
      },
      toback() {
        this.$router.back(-1);
      },

      selectChange(selection, rowData) {
        // console.log("select-change", selection, rowData);
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
        // console.log(pageIndex);
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
      }
    },
    components: {
      amendPlan
    }
  };

  Vue.component("table-amendPerson", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <a href="" style="text-decoration: none;color:#409eff"><i @click.stop.prevent="showLook(rowData,index)" style='font-size:20px' class='iconfont'>&#xe734;</i></a>
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
      showLook() {
        let params = { type: "showLook", index: this.index, rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
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
  .turnaroundPlansAdd {
    // padding-left: 180px;
    font-size: 12px;
    .top {
      padding: 10px;
      border: @border;
        border-radius: 5px;
    }
    .bottom {
      padding: 10px;
      border: @border;
        border-radius: 5px;
        overflow: hidden;
        margin-top: 10px;
        min-width: 1090px;
      .left {
        padding: 10px;
        border: @border;
        border-radius: 5px;
        width: 400px;
        height: 420px;
        float: left;
        h5 {
          position: relative;
          top: -17px;
          left: 10px;
        }
        .el-form-item {
          height: 40px;
          margin-bottom: 0px;
          overflow: hidden;
        }
      }
      .right {
        width: 640px;
        font-size: 12px;
        float: left;
        padding: 10px;
        border: @border;
        border-radius: 5px;
        margin-left: 10px;
        height: 420px;
        h5 {
          position: relative;
          top: -50px;
          left: 10px;
        }
      }
    }
  }
  .tableTime {
    text-align: center;
    td {
      height: 20px;
    }
    td:nth-child(1) {
      border: @border;
      width: 80px;
    }
    td:nth-child(2) {
      width: 200px;
      border: @border;
    }
  }
</style>
