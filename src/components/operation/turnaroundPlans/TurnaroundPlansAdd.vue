<template>
  <div class="turnaroundPlansAdd">
    <div class="top">
      <el-button size="small" type="primary" @click="toback"  icon="el-icon-arrow-left">返回</el-button>
      <permission-button
        permCode='operation_overhaul_add_lookup.operation_overhaul_add_save'
        banType='hide'
        size="small" type="primary" @click="addPlan"><i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</permission-button>
    </div>
    <div class="bottom">
      <div class="left">
        <h5>检修计划</h5>
        <el-form label-width="100px">
          <el-form-item label="计划名称：">
            <el-input v-model="companyName.planName" autofocus size="mini"></el-input>
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
              <el-radio label="单次" ></el-radio>
              <el-radio label="周期" v-model="companyName.frequency=1,companyName.frequencyType='1'"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <el-form label-width="110px" v-if="companyName.planType==='周期'" v-model="companyName.planType">
          <el-form-item label="计划日期：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="companyName.startTime" format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">~</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="companyName.endTime" format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;" size="mini"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="首次执行时间：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
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
              <el-date-picker type="date" placeholder="选择日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd" v-model="companyName.startTime" style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
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
          <!--<el-form-item label="计划添加时间：" style="height:auto;">-->
          <!--<span>{{time}}</span>-->
          <!--</el-form-item>-->
        </el-form>
      </div>
      <div class="right">
        <div>
          <el-button size="small" type="primary" @click="addPlanIsShow"><i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;设备添加</el-button>
        </div>
        <h5>设备列表</h5>
        <v-table :select-all="selectALL" @on-custom-comp="customCompFunc"  :select-group-change="selectGroupChange" :show-vertical-border="false" is-horizontal-resize column-width-drag :multiple-sort="false" :height="350" style="width:100%;height:350px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
        
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
            row-height=30
            :show-vertical-border="false"
          ></v-table>
        </div>
      </el-dialog>
    </div>
    <el-dialog
      title="设备添加"
      :visible.sync="addPlanShow"
      width="900px"
    >
      <add-plan v-show="addPlanShow" v-on:isHide="isHide" v-on:toAdd="toAdd"></add-plan>
    </el-dialog>

  </div>
</template>
<script>
  import addPlan from "./AddPlan";
  import Vue from "vue";
  export default {
    name: "",
    data() {
      return {
        person:false,
        arr:new Array(),
        auditId:0,
        deviceIds:0,
        date:"",
        times:"",
        addPlanShow: false,
        time: new Date().toLocaleString(),
        companyName: {
          id:"",
          planName:"",
          maintenanceClassify:"",
          maintenanceLevel:"",
          maintenanceType:0,
          planType:"单次",
          startTime:"",
          endTime:"",
          executeTime:"",
          frequency:"1",
          frequencyType:"1",
          maintenanceCc:""
        },
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
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "workerNames",
            title: "人员",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            componentName: "table-addPerson"
          },
        ],
        pageIndex: 1,
        pageSize: 10,
        tableData: [],
        tableDate: [],
        timeValue: "",
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
      };
    },
    created() {},
    methods: {
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
            this.personData = response.data.data;
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

      TurnaroundPlans() {
        this.$router.push({
          path: "/TurnaroundPlans"
        });
        this.$store.commit("turnaroundPlans","y")
      },
      addPlan(){
        this.deviceIds = this.tableData.map(item=>item.id).toString();
        if(this.valueVerification()){
          this.toAddPlan()
        }
      },
      toAddPlan(){
        this.deviceIds = this.tableData.map(item=>item.id).toString();
        this.companyName.executeTime = this.date +" "+ this.times;
        this.companyName.executeTime = this.companyName.executeTime.split(".")[0];
        this.companyName.maintenanceType = 0;
        if(this.companyName.planType === "单次"){
          this.companyName.endTime =this.companyName.startTime;
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
            url: "/mplan/add",
            option:{successMsg:"新增成功"}
          },
          this
        ).then(response => {
            this.auditId = response.data.data.id;
            this.TurnaroundPlans();
          },
          ({type, info}) => {

          })
      },
      valueVerification(){
        if(this.deviceIds===""){
          this.$message.error('最少添加一个设备');
          return false;
        }
        if(this.companyName.planName===""){
          this.$message.error('计划名称不能为空');
          return false;
        }
        if(this.companyName.maintenanceClassify===""){
          this.$message.error('检修类别不能为空');
          return false;
        }
        if(this.companyName.maintenanceLevel===""){
          this.$message.error('检修级别不能为空');
          return false;
        }
        if(this.companyName.maintenanceType===""){
          this.$message.error('检修类型不能为空');
          return false;
        }
        if(this.companyName.planType===""){
          this.$message.error('请选择计划类型');
          return false;
        }
        if(this.companyName.startTime===""){
          this.$message.error('开始时间不能为空');
          return false;
        }
        let time = new Date().toLocaleDateString().split(" ")[0];
        time = new Date(time).valueOf();
        if(new Date(this.companyName.startTime).valueOf()<time){
          this.$message.error('计划日期不能小于当前时间');
          return false;
        }
        if(this.companyName.planName=="周期"){
          if(this.companyName.endTime===""){
            this.$message.error('结束时间不能为空');
            return false;
          }
        }
        if(new Date(this.companyName.endTime).valueOf()<new Date(this.companyName.startTime).valueOf()){
          this.$message.error('结束时间不能小于开始时间');
          return false;
        }
        if(this.date===""){
          this.$message.error('首次执行日期不能为空');
          return false;
        }
        if(this.times===""){
          this.$message.error('执行时间不能为空');
          return false;
        }else{
          let systemTime = new Date(new Date().toLocaleString('chinese', { hour12: false })).valueOf();
          let startDate = new Date(this.companyName.startTime+" 00:00:00").valueOf();
          let endDate = new Date(this.companyName.endTime+" 23:59:59").valueOf();
          let dateTime = new Date(this.date+" "+this.times).valueOf();
          if(dateTime<startDate||dateTime<systemTime||dateTime<endDate){
            this.$message.error("首次执行时间有误");
            return false;
          }
        }
        if(this.companyName.maintenanceCc===""){
          this.$message.error('检修内容不能为空');
          return false;
        }else{
          this.companyName.startTime = this.companyName.startTime+" 00:00:00";
          this.companyName.endTime= this.companyName.endTime+" 23:59:59";
          return true;
        }
      },

      isHide(params) {
        this.addPlanShow = params;
      },
      toAdd(params){
        this.tableData = params.values;
        this.addPlanShow = params.isOk;
      },
      addPlanIsShow() {
        this.addPlanShow = true;
      },
      toback() {
        this.$router.back(-1);
      },
      selectGroupChange(selection) {
      },
      selectALL(selection) {

      },
      selectChange(selection, rowData) {
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
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
      }
    },
    components: {
      addPlan
    }
  };
  Vue.component("table-addPerson", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <permission-button permCode='employee_lookup.employee_add||employee_lookup.employee_modification'
                     banType='disable' type="text"
                     @click.stop.prevent="showLook(rowData,index)"
                     style="text-decoration: none;color:#409eff">
                     <i style='font-size:16px' class='iconfont'>&#xe734;</i>
            </permission-button>
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
        // 参数根据业务场景随意构造
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
    .top {
      padding: 10px;
      border: @border;
      border-radius: 5px;
    }
    .bottom {
      padding: 10px 0 10px 10px;
      border: @border;
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;
      min-width: 1090px;
      .left {
        padding: 10px;
        border: @border;
        border-radius: 5px;
        min-width: 400px;
        height: 420px;
        float: left;
        width: 35%;
        h5 {
          position: relative;
          top: -17px;
          left: 10px;
        }
        .el-form-item {
          height: 40px;
          margin-bottom: 0px;
          overflow: hidden;
          .el-input__inner{
            padding-right: 20px;
          }
        }
      }
      .right {
        width: 61%;
        min-width: 640px;
        height: 420px;
        font-size: 14px;
        float: left;
        padding: 10px;
        border: @border;
        border-radius: 5px;
        margin-left: 10px;
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
