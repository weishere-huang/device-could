<template>
  <div class="Reported">
    <div class="top">
      <el-button
        size="small" type="primary" @click="toback"  icon="el-icon-arrow-left">返回</el-button>
      <permission-button
        permCode='work_create_lookup.work_create_save'
        banType='disable'
        size="small"
        type="primary"
        @click="addWork"
      >
        <i
          style='font-size:12px'
          class='iconfont'
        >&#xe645;</i>&nbsp;保存</permission-button>
    </div>
    <div class="bottom">
      <div class="fault-details">
        <h5>工单信息</h5>
        <el-form label-width="90px">
          <el-form-item label="工单类型：">
            <el-radio
              v-model="radio"
              label="2"
            >故障</el-radio>
            <el-radio
              v-model="radio"
              label="0"
            >检修</el-radio>
            <el-radio
              v-model="radio"
              label="1"
            >保养</el-radio>
          </el-form-item>
        </el-form>
        <el-form label-width="90px" v-if="radio==='0'">
          <el-form-item label="分类：">
            <el-select
              v-model="scopeValue"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in classify"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别：">
            <el-select
              v-model="gradeValue"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in turnaroundeGrade"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行时间：">
            <el-date-picker
              size="small"
              v-model="time"
              type="datetime"
              format="yyyy/MM/dd HH:mm:ss"
              value-format="yyyy/MM/dd HH:mm:ss"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="组织机构：">
            <cascader :changeValue="changeValue"></cascader>
          </el-form-item>
          <el-form-item label="内容：">
            <el-input
              v-model="workInfo"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="90px" v-if="radio==='1'">
          <el-form-item label="分类：">
            <el-select
              v-model="scopeValue"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in upkeepClassify"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别：">
            <el-select
              v-model="gradeValue"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in turnaroundeGrade"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行时间：">
            <el-date-picker
              format="yyyy/MM/dd HH:mm:ss"
              value-format="yyyy/MM/dd HH:mm:ss"
              v-model="time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="内容：">
            <el-input
              v-model="workInfo"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="90px" v-if="radio==='2'">
          <el-form-item label="影响范围：">
            <el-select
              v-model="scopeValue"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in scope"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="故障等级：">
            <el-select
              v-model="gradeValue"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in grade"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发现时间：">
            <el-date-picker
              v-model="breakTime"
              format="yyyy/MM/dd HH:mm:ss"
              value-format="yyyy/MM/dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="故障描述：">
            <el-input
              v-model="breakWorkDesc"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="原因分析：">
            <el-input
              v-model="breakWorkInfo"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="照片：">
            <el-upload
              :action="path()"
              multiple
              accept="image/jpeg,image/png"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <div class="list">
        <h5>设备列表</h5>
        <div style="padding:0 10px;">
          <permission-button
            permCode='device_lookup.device_redact'
            banType='disable'
            size="small"
            type="primary"
            @click="amendPlanShow=true"
          ><i
            style='font-size:12px'
            class='iconfont'
          >&#xe62f;</i>&nbsp;设备添加
          </permission-button>
          <el-dialog
            title="添加设备"
            :visible.sync="amendPlanShow"
            width="900px"
          >
            <amend-plan
              v-on:isHide="isHide"
              v-on:toAdd="toAdd"
            ></amend-plan>
          </el-dialog>
        </div>
        <el-col
          :span="24"
          style="padding:0 10px;margin-top:10px;"
        >
          <v-table
            is-vertical-resize
            is-horizontal-resize
            :vertical-resize-offset='100'
            column-width-drag
            :multiple-sort="false"
            style="width:100%;height:480px"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            @on-custom-comp="customCompFunc"
            ref="ReportedTable"
            :show-vertical-border="false"
          ></v-table>
        </el-col>
      </div>
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
</template>
<script>
  import cascader from '../public/Cascader.vue'
  import amendPlan from "../operation/upkeep/AmendPlan";
  import Vue from "vue";
  Vue.component("table-NewWorkOrder", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <i style='font-size:16px;cursor:pointer;color:#409eff;' class='iconfont'  @click.stop.prevent="add(rowData,index)">&#xe734;</i>
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
      add() {
        let params = { type: "add", index: this.index, rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      }
    }
  });
  export default {
    inject: ["reload"],
    data() {
      return {
        ogrname:{
          organizeCode:'',
          organizationName:''
        },
        radio: "2",
        person: false,
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
          }
        ],
        personData: [],
        amendPlanShow: false,
        dialogVisible: false,
        columns: [
          {
            field: "deviceNo",
            title: "设备编号",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
            // orderBy: ""
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
            width: 90,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "workerNames",
            title: "人员",
            width: 40,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            componentName: "table-NewWorkOrder"
          }
        ],
        tableData: [],
        upkeepClassify:[
          {
            value:1,
            label:"例行保养"
          },
          {
            value:2,
            label:"季节性保养"
          },
          {
            value:3,
            label:"换季保养"
          },
          {
            value:4,
            label:"磨合期保养"
          },
          {
            value:5,
            label:"转移保养"
          },
          {
            value:6,
            label:"停放保养"
          },
          {
            value:7,
            label:"其他"
          },
        ],
        dialogImageUrl: "",
        classify:[
          {
            value:1,
            label:'日常检修(DM)'
          },
          {
            value:2,
            label:'定期检修(TBM)'
          },
          {
            value:3,
            label:'改进性检修(PAM)'
          },
          {
            value:4,
            label:'故障检修(RTF)'
          },
          {
            value:5,
            label:'其他'
          },
        ],
        scope: [
          {
            value: 1,
            label: "停机"
          },
          {
            value: 2,
            label: "生产波动"
          },
          {
            value: 3,
            label: "设备本体"
          },
          {
            value: 4,
            label: "其他"
          }
        ],
        grade: [
          {
            value: 1,
            label: "低"
          },
          {
            value: 2,
            label: "中"
          },
          {
            value: 3,
            label: "高"
          }
        ],
        turnaroundeGrade:[
          {
            value:1,
            label:'小'
          },
          {
            value:2,
            label:'中'
          },
          {
            value:3,
            label:'大'
          },
        ],
        breakTime:new Date().toLocaleString().replace(/[\u4e00-\u9fa5]/g, ""),
        time:"",
        deviceId:[],
        scopeValue:1,
        gradeValue:1,
        workDesc:"",
        breakWorkDesc:"",
        workInfo:"",
        breakWorkInfo:"",
        imgPath:"",
        img:[],
        defaultProps: {
          value: "code",
          label: "name"
        },
        options:[],
        ogrname:'',
      };
    },
    methods: {
      //获取组织机构
     changeValue(data){
       this.ogrname=data
     },
      toback() {
        this.$router.back(-1)
      },
      path(){
        return this.global.apiImg;
      },
      isHide(params) {
        this.amendPlanShow = params;
      },
      toAdd(params) {
        this.amendPlanShow = params.isOk;
        if(params.values.length>0 ){
          params.values.map(item=>{this.tableData.push(item)});
          this.tableData.map(item=>{this.deviceId.push(item.id)});
        }else{
          this.tableData = [];
          this.deviceId = []
        }
      },
      findByDeviceId(deviceId) {
        this.Axios(
          {
            params: { deviceId: deviceId },
            type: "get",
            url: "/device/findDeviceWorker",
            option: { enableMsg: false }
          },
          this
        ).then(
          response => {
            // console.log(response.data.data);
            this.personData = response.data.data;
          },
          ({ type, info }) => {}
        );
      },
      customCompFunc(params) {
        if (params.type === "add") {
          this.findByDeviceId(params.rowData.id);
          this.person = true;
        }
      },
      handleAvatarSuccess(res, file) {
        this.$message.success('图片成功上传');
        this.dialogImageUrl= file.response.data;
        this.img.push(this.dialogImageUrl);
        this.imgPath = this.img.toString();
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;

        let isOk = true;
        if (!(isJPG || isPNG)) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
          isOk = false;
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB!');
        }
        return isOk && isLt1M ;
      },
      handleRemove(file, fileList) {
        let img = [];
        fileList.map(item=>{img.push(item.response.data)});
        this.imgPath = img.toString();
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },


      addWork(){
        if(this.radio==="2"){
          this.faultValue() ? this.addBreakWork():"";
        }else{
          this.maintenanceValue() ? this.addMaintenanceWork():"";
        }
      },
      addMaintenanceWork(){
        console.log(this.time);
        let qs = require("qs");
        let data = qs.stringify({
          planName:"工单计划",
          maintenanceClassify:this.scopeValue,
          maintenanceLevel:this.gradeValue,
          maintenanceType:this.radio,
          planType:0,
          startTime:this.time,
          endTime:this.time,
          executeTime:this.time,
          frequency:-1,
          frequencyType:1,
          maintenanceCc:this.workInfo,
          deviceIds:this.deviceId.toString()
        });
        this.Axios(
          {
            params:data,
            type: "post",
            url: "/mplan/addWork",
            option:{successMsg:"上报成功"}
          },
          this
        ).then(response => {
            this.WorkOrder();
          },
          ({type, info}) => {

          })
      },
      maintenanceValue(){
        let time1 = new Date(new Date().toLocaleString('chinese', { hour12: false })).valueOf();
        let dateTime = new Date(this.time).valueOf();
        if(this.deviceId===0)this.$message.error("请选择至少一个设备");
        else if(this.scopeValue==="")this.$message.error("请至少选择分类");
        else if(this.gradeValue==="")this.$message.error("请至少选择级别");
        else if(this.time==="")this.$message.error("请选择执行时间");
        else if(dateTime<time1)this.$message.error("执行时间有误");
        else if(this.workInfo==="")this.$message.error("请填写内容");
        else return true;
      },
      addBreakWork(){
        let qs = require("qs");
        let data = qs.stringify({
          deviceId:this.deviceId.toString(),
          faultLevel:this.gradeValue,
          incidence:this.scopeValue,
          faultSource:0,
          discoveryTime:this.breakTime,
          faultDesc:this.breakWorkDesc,
          causeAnalysis:this.breakWorkInfo,
          img:this.imgPath
        });
        this.Axios(
          {
            params:data,
            type: "post",
            url: "/fault/addWork",
            option:{successMsg:"上报成功"}
          },
          this
        ).then(response => {
            this.WorkOrder();
          },
          ({type, info}) => {
          })
      },
      faultValue(){
        let time1 = new Date(new Date().toLocaleString('chinese', { hour12: false })).valueOf();
        let dateTime = new Date(this.breakTime).valueOf();
        if(this.deviceId.length===0)this.$message.error("请选择相关设备");
        else  if(this.deviceId.length>1)this.$message.error("对不起，只能选择一个设备");
        else if(this.scopeValue==="")this.$message.error("请至少选择影响范围");
        else  if(this.gradeValue==="")this.$message.error("请至少选择故障等级");
        else if(this.breakTime==="")this.$message.error("请选择故障开始时间");
        else if(dateTime>time1)this.$message.error("故障发现时间有误");
        else if(this.breakWorkDesc==="")this.$message.error("请填写故障描述");
        else if(this.breakWorkInfo==="")this.$message.error("请填写原因分析");
        else  if(this.imgPath==="")this.$message.error("请上传至少一张故障相关图片");
        else return true;
      },
      WorkOrder() {
        this.$router.push({
          path: "/WorkOrder"
        });
      },
    },
    created() {
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.ReportedTable.resize();
        }, 500);
      });
    },
    components: {
      amendPlan,
      cascader
    }
  };
</script>

<style lang="less">
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  @border: 1px solid #dde2eb;
  .Reported {
    width: 100%;
    min-width: 1000px;
    .top {
      width: 100%;
      padding: 10px;
      border: @border;
      border-radius: 5px;
    }
    .bottom {
      width: 100%;
      padding: 10px;
      border: @border;
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;
      .fault-details {
        border: @border;
        border-radius: 5px;
        width: 35%;
        min-height: 560px;
        min-width: 300px;
        float: left;
        padding: 10px;
      }
      .list {
        border: @border;
        border-radius: 5px;
        width: 63%;
        min-height: 560px;
        min-width: 600px;
        float: left;
        margin-left: 1%;
        padding: 10px;
        .v-table-body{
          height: 440px!important;
        }
      }
      h5 {
        position: relative;
        top: -17px;
        left: 15px;
      }
    }
  }
</style>
