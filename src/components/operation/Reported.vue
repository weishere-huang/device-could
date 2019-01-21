<template>
  <div class="Reported">
    <div class="top">
      <el-button size="small" type="primary" @click="toBack"  icon="el-icon-arrow-left">返回</el-button>
      <permission-button
        permCode='operation_fault_report_lookup.operation_fault_report_save'
        banType='disable'
        size="small"
        @click="faultAdd"
        type="primary">
        <i style='font-size:12px'
           class='iconfont'
        >&#xe645;</i>&nbsp;保存</permission-button>
    </div>
    <div class="bottom">
      <div class="fault-details">
        <h5>故障信息</h5>
        <el-form label-width="90px">
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
              format="yyyy/MM/dd HH:mm:ss"
              value-format="yyyy/MM/dd HH:mm:ss"
              v-model="time"
              type="datetime"
              size="small"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="组织机构：">
            <cascader :changeValue="changeValue"></cascader>
          </el-form-item> -->
          <el-form-item label="故障描述：">
            <el-input
              v-model="breakDesc"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="原因分析：">
            <el-input
              v-model="breakInfo"
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
              <img width="100%" :src="dialogImageUrl" alt="">
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
            style="width:100%;"
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
// import cascader from '../public/Cascader.vue'
  import amendPlan from "./upkeep/AmendPlan";
  import Vue from "vue";
  Vue.component("table-reported", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看" placement="top">
             <permission-button permCode='employee_lookup.employee_add||employee_lookup.employee_modification'
                     banType='disable' type="text"
                     @click.stop.prevent="add(rowData,index)"
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
        ogrname:{},
        time:new Date().toLocaleString('chinese', { hour12: false }),
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
        scopeValue:1,
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
        gradeValue:1,
        breakDesc:"",
        breakInfo:"",
        img:[],
        deviceId:[],
        dialogImageUrl: "",
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
            componentName: "table-reported"
          }
        ],
        tableData: []
      };
    },
    methods: {
      //   changeValue(data){
      //    this.ogrname=data
      //  },
      toBack() {
        this.$router.back(-1);
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
        console.log(res);
        if(res.code===200 ){
          this.$message.success('图片成功上传');
          this.dialogImageUrl= file.response.data;
        }else{
          this.$message.error("抱歉，图片上传失败");
        }
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
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      faultAdd(){
        this.faultValue() ? this.toFaultAdd():"";
      },
      toFaultAdd(){
        let employee = JSON.parse(localStorage.getItem("user"));
        let qs = require("qs");
        let data = qs.stringify({
          deviceId:this.deviceId.toString(),
          faultLevel:this.gradeValue,
          incidence:this.scopeValue,
          discoveryId:employee.employeeId,
          discovery:employee.employeeName,
          discoveryTime:this.time,
          faultDesc:this.breakDesc,
          causeAnalysis:this.breakInfo,
          img:this.img.toString(),
          faultSource:0,
        });
        this.Axios(
          {
            params:data,
            type: "post",
            url: "/fault/add",
            option:{successMsg:"上报成功"}
          },
          this
        ).then(response => {
            this.toBack();
          },
          ({type, info}) => {

          })
      },
      faultValue(){
        let time1 = new Date(new Date().toLocaleString('chinese', { hour12: false })).valueOf();
        let dateTime = new Date(this.time).valueOf();
        if(this.deviceId.length===0)this.$message.error("请选择相关设备");
        else if(this.deviceId.length>1)this.$message.error("对不起，只能选择一个设备");
        else if(this.scopeValue==="")this.$message.error("请至少选择影响范围");
        else if(this.gradeValue==="")this.$message.error("请至少选择故障等级");
        else if(this.time==="")this.$message.error("请至少选择故障开始时间");
        else if(dateTime>time1)this.$message.error("故障开始时间有误");
        else if(this.breakDesc==="")this.$message.error("请填写故障描述");
        else if(this.breakInfo==="")this.$message.error("请填写原因分析");
        else if(this.img.length>0)this.$message.error("请上传至少一张故障相关图片");
        else return true;
      }
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
      // cascader
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
        min-height: 420px;
        min-width: 300px;
        float: left;
        padding: 10px;
      }
      .list {
        border: @border;
        border-radius: 5px;
        width: 60%;
        height: 463px;
        min-width: 600px;
        float: left;
        margin-left: 10px;
        padding: 10px;
      }
      h5 {
        position: relative;
        top: -17px;
        left: 15px;
      }
    }
  }
</style>
