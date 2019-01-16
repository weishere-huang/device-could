<template>
  <div class="turnaroundPlansAdd">
    <div class="top">
      <el-button size="small" type="primary" @click="toBack" icon="el-icon-arrow-left">返回</el-button>
      <permission-button
        permCode='operation_maintain_detail_lookup.operation_maintain_detail_save'
        banType='hide'
        size="small" type="primary" @click="updatePlan" v-if="isOk">
        <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</permission-button>
      <el-button
        size="small" type="primary" @click="auditInfo" icon="el-icon-search">审核详情</el-button>
    </div>
    <div class="bottom">
      <div class="left">
        <h5>保养计划</h5>
        <el-form label-width="100px">
          <el-form-item label="计划名称：">
            <el-input v-model="companyName.planName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="保养分类：">
            <el-select v-model="companyName.maintenanceClassify" placeholder="请选择" size="mini">
              <el-option label="例行保养" value="1"></el-option>
              <el-option label="季节性保养" value="2"></el-option>
              <el-option label="换季保养" value="3"></el-option>
              <el-option label="磨合期保养" value="4"></el-option>
              <el-option label="转移保养" value="5"></el-option>
              <el-option label="停放保养" value="6"></el-option>
              <el-option label="其他" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保养级别：">
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

        <el-form label-width="110px" v-if="companyName.planType==='周期'" v-model="companyName">
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
              <el-date-picker type="date" placeholder="选择日期" v-model="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd"  style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
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
          <el-form-item label="保养内容：" style="height:auto;" >
            <el-input type="textarea" v-model="companyName.maintenanceCc" style="width:100%;"></el-input>
          </el-form-item>

        </el-form>
        <!-- 单次执行 -->
        <el-form label-width="110px" v-if="companyName.planType==='单次'" v-model="companyName">
          <el-form-item label="计划日期：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="companyName.startTime" format="yyyy/MM/dd" value-format="yyyy/MM/dd" style="width: 100%;padding-right:5px;" size="mini"></el-date-picker>
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
          <el-form-item label="保养内容：" style="height:auto;">
            <el-input type="textarea" v-model="companyName.maintenanceCc" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div class="right">
        <div>
          <el-button size="small" type="primary" @click="amendPlanIsShow">
            <i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;设备添加</el-button>
        </div>
        <h5>设备列表</h5>
        <v-table :select-all="selectALL" @on-custom-comp="customCompFunc" :select-group-change="selectGroupChange" is-horizontal-resize column-width-drag :multiple-sort="false" :height="350"  style="width:100%;height:350px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :show-vertical-border="false"></v-table>
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
    </div>
    <el-dialog
      title="添加设备"
      :visible.sync="amendPlanShow"
      width="900px"
    >
      <amend-plan  v-on:isHide="isHide" v-on:toAdd="toAdd"></amend-plan>
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
</template>
<script>
  import AmendPlan from "./AmendPlan";
  import Vue from "vue";
  export default {
    name: "",
    data() {
      return {
        person:false,
        isOk:true,
        date:"",
        times:"",
        deviceIds:1,
        arr:[],
        amendPlanShow: false,
        time: new Date().toLocaleString(),
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
            componentName: "table-upkeepAmendPerson"
          },
        ],
        pageIndex: 1,
        pageSize: 10,
        tableData: [],
        tableDate: [],
        submitAuditInfo:false,
        submitAuditTable:[
          {
            field: 'custome', title:'序号', width: 15, titleAlign: 'center', columnAlign: 'center',
            formatter: function (rowData,rowIndex) {
              return rowIndex < 3 ? '<span>' + (rowIndex + 1) + '</span>' : rowIndex + 1
            }, isFrozen: true,isResize:true
          },
          {
            field: "name",
            title: "审核人",
            width: 40,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "startTime",
            title: "提交时间",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "endTime",
            title: "审核时间",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
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
            field: "position",
            title: "岗位",
            width: 40,
            titleAlign: "center",
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
        this.companyName.frequencyType=this.companyName.frequencyType.toString();
        this.date = this.companyName.executeTime.split(" ")[0];
        this.times = this.companyName.executeTime.split(" ")[1].split(".")[0];
        this.companyName.state===0 ? this.isOk = true : this.isOk = false;
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
            for (let i in arr){
              this.tableData[i].workerNames = arr[i].maintains+","+arr[i].overhauls;
              if(this.tableData[i].workerNames=="null,null"){
                this.tableData[i].workerNames="";
              }
            }
            this.tableDate = this.tableData;
          },
          ({type, info}) => {

          })
      },
      updatePlan(){
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
        this.companyName.executeTime = this.date +" "+ this.times;
        this.companyName.executeTime = this.companyName.executeTime.split(".")[0].replace(/-/g,"/");
        this.companyName.startTime = this.companyName.startTime.split(" ")[0].replace(/-/g,"/");
        this.companyName.endTime = this.companyName.endTime.split(" ")[0].replace(/-/g,"/");
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
          this.companyName.frequencyType = 1
        }
        if(this.companyName.frequencyType ==="周" ){
          this.companyName.frequencyType = 2
        }
        if(this.companyName.frequencyType ==="月" ){
          this.companyName.frequencyType = 3
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
            this.Upkeep();
          },
          ({type, info}) => {

          });
      },
      Upkeep() {
        this.$router.push({
          path: "/Upkeep"
        });
        this.$store.commit("upkeepAmend","y")
      },
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
      toBack() {
        this.$router.back(-1);
      },
      selectGroupChange(selection) {
        this.deviceIds = selection.map(item=>item.id).toString();
        this.arr = selection.map(item=>item);
      },
      selectALL(selection) {
        this.deviceIds = selection.map(item=>item.id).toString();
        this.arr = selection.map(item=>item);
      },
      selectChange(selection, rowData) {
        console.log("select-change", selection, rowData);
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
        console.log(pageIndex);
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
      }
    },
    components: {
      amendPlan: AmendPlan
    }
  };
  Vue.component("table-upkeepAmendPerson", {
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
      overflow: hidden;
      margin-top: 10px;
      min-width: 1090px;
      .left {
        padding: 10px;
        border: @border;
        border-radius: 5px;
        min-width: 400px;
        float: left;
        height: 418px;
        width: 35%;
        h5 {
          position: relative;
          top: -15px;
          left: 10px;
        }
        .el-form-item {
          height: 40px;
          margin-bottom: 0px;
          overflow: hidden;
        }
      }
      .right {
        width: 61%;
        min-width: 640px;
        font-size: 12px;
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

