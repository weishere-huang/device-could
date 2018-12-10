<template>
  <div class="turnaroundPlansAdd">
    <div class="top">
      <el-button size="small" @click="toBack">返回</el-button>
      <el-button size="small" @click="updatePlan">保存</el-button>
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
          <el-button size="small" @click="amendPlanIsShow">设备添加</el-button>
        </div>
        <h5>设备列表</h5>
        <v-table :select-all="selectALL" :select-group-change="selectGroupChange" is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:318px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>
        <!--<div class="mt20 mb20 bold" style="text-align:center;margin-top:30px;">-->
          <!--<v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="tableData.length" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>-->
        <!--</div>-->
      </div>
    </div>
    <el-dialog
          title="添加设备"
          :visible.sync="amendPlanShow"
          width="900px"
          >
         <amend-plan  v-on:isHide="isHide" v-on:toAdd="toAdd"></amend-plan>
        </el-dialog>
    
  </div>
</template>
<script>
import AmendPlan from "./AmendPlan";
export default {
  name: "",
  data() {
    return {
      date:"",
      times:"",
      deviceIds:1,
      arr:[],
      amendPlanShow: false,
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
      columns: [
        {
          field: "deviceNo",
          title: "设备编号",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
          //   orderBy: ""
        },
        {
          field: "deviceName",
          title: "设备名称",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
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
          field: "location",
          title: "设备位置",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "workerNames",
          title: "人员",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
      ],
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      tableDate: []
    };
  },
  created() {
    this.findOne(this.$route.query.id);
    this.loadSelect(this.$route.query.id);
  },
  methods: {
    findOne(number){
      this.Axios(
        {
          type: "get",
          url: "/mplan/findOne/"+number,
        },
        this
      ).then(response => {
          this.loadValue(response.data.data);
          // this.companyName =response.data.data;
          // console.log(response.data.data)
        },
        ({type, info}) => {

        })
    },
    loadValue(value){
      this.companyName = value;
      this.companyName.maintenanceClassify = this.companyName.maintenanceClassify.toString();
      this.companyName.maintenanceLevel = this.companyName.maintenanceLevel.toString();
      if(this.companyName.planType=== 0){
        this.companyName.planType = "单次"
      }if(this.companyName.planType=== 1){
        this.companyName.planType = "周期"
      }
      this.companyName.frequencyType=this.companyName.frequencyType.toString();
      this.date = this.companyName.executeTime.split(" ")[0];
      this.times = this.companyName.executeTime.split(" ")[1].split(".")[0];
    },
    loadSelect(number){
      let arr=new Array()
      this.Axios(
        {
          params:{maintenanceId:number},
          type: "get",
          url: "/mplan/listDevice",
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
      this.deviceIds = this.tableData.map(item=>item.id).toString();
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
    eliminateAll(){
      let aaa = new Array();
      for (let i in this.tableData){
        for(let j in this.arr){
          if(this.tableData[i].id !==this.arr[j].id){
            aaa[aaa.length] = this.tableData[i];
          }
        }
      }
      this.tableData = aaa;
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
    padding: 10px 0px;
  }
  .bottom {
    padding: 10px 0px;
    .left {
      padding: 10px;
      border: @border;
      border-radius: 5px;
      width: 400px;
      float: left;
      h5 {
        position: relative;
        top: -20px;
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

