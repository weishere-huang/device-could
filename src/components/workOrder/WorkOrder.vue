<template>
  <div class="work-order">
    <router-view></router-view>
    <div class="top" :class="[{hide:isHideList}]">
      <el-button-group>
        <el-button
          type="primary"
          @click="load(toNull)"
          size="small"
        >全部工单</el-button>
        <el-button
          type="primary"
          @click="load(0)"
          size="small"
        >待审核</el-button>
        <el-button
          type="primary"
          @click="load(4)"
          size="small"
        >审核中</el-button>
        <el-button
          type="primary"
          @click="load(15)"
          size="small"
        >待处理</el-button>
        <el-button
          type="primary"
          @click="load(10)"
          size="small"
        >已驳回</el-button>
        <el-button
          type="primary"
          @click="load(13)"
          size="small"
        >已完成</el-button>
      </el-button-group>
    </div>
    <div class="bottom" :class="[{hide:isHideList}]">
      <v-table
        @on-custom-comp="workToPlans"
        is-horizontal-resize
        column-width-drag
        :multiple-sort="false"
        style="width:100%;min-height:200px;"
        :columns="columns"
        :table-data="tableData"
        row-hover-color="#eee"
        :select-all="selectALL"
        :select-group-change="selectGroupChange"
        :row-dblclick="Jump"
        row-click-color="#edf7ff"
        ref="workOrderTable"
      >
      </v-table>
      <div
        class="mt20 mb20 bold"
        style="text-align:left;margin-top:20px"
      >
        <v-pagination
          @page-change="pageChange"
          @page-size-change="pageSizeChange"
          :total="totalNub"
          :page-size="pageSize"
          :page-index="pageIndex"
          :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
        ></v-pagination>
      </div>
    </div>
    <el-dialog
      title="审核"
      :visible.sync="outerVisible"
      :beforeClose="cancel"
    >
      <el-form
        label-position=right
        label-width="120px"
        :model="formLabelAlign"
      >
        <el-form-item label="审批结果：">
          <el-radio
            v-model="formLabelAlign.radio"
            label="0"
          >同意</el-radio>
          <el-radio
            v-model="formLabelAlign.radio"
            label="1"
          >驳回</el-radio>
        </el-form-item>
        <el-form-item label="审批意见：">
          <el-input
            type="textarea"
            v-model="formLabelAlign.desc"
            style="width:95%;"
          ></el-input>
        </el-form-item>
        <div v-if="formLabelAlign.radio!=1">
          <el-form-item label="是否终审：">
            <el-checkbox-group v-model="formLabelAlign.type">
              <el-checkbox
                label=""
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="下一级审批人："
            v-if="formLabelAlign.type!=true"
          >
            <el-input
              v-model="toAuditName.name"
              size="mini"
              style="width:60%"
            ></el-input>
            <el-button
              type="primary"
              @click="innerVisible = true"
              size="mini"
            >添加审批人</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog
        title="人员添加"
        :visible.sync="innerVisible"
        append-to-body
      >
        <personnel v-on:getPersonnel="getPersonnel"></personnel>
      </el-dialog>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="cancel"
          size="mini"
        >取 消</el-button>
        <el-button
          @click="isSubmitAudit"
          type="primary"
          size="mini"
        >提 交</el-button>

      </div>
    </el-dialog>
  </div>
</template>
<script>
import personnel from '../operation/breakdown/Personnel'
  import Vue from "vue";
  export default {
    inject: ["reload"],
    name: "Test",
    data() {
      return {
        toAuditName: "",
        nextUserId:"",
        innerVisible:false,
        outerVisible:false,
        formLabelAlign: {
          time: "",
          desc: "",
          type: "",
          radio: "",
          name: ""
        },
        stateNum:"",
        toNull: "",
        audited: "",
        inAudit: "",
        handle: "",
        //之后删除后三个变量
        audited1: "",
        inAudit1: "",
        handle1: "",
        //结束
        pageIsOk: true,
        pageIndex: 1,
        pageSize: 10,
        totalNub: 0,
        tableData: [],
        tableDate: [],
        columns: [
          {
            field: "workNo",
            title: "工单编号",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
            //   orderBy: ""
          },
          {
            field: "state",
            title: "工单状态",
            width: 70,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true,
            formatter:function (rowData) {
              if(rowData.state ===0 )return `<span style="color: #ff6600">待审核</span>`;
              if(rowData.state ===1 )return `<span style="color: #00b400">已通过</span>`;
              if(rowData.state ===2 )return `<span style="color: #c48382">已禁用</span>`;
              if(rowData.state ===4 )return `<span style="color: #409dfe">审核中</span>`;
              if(rowData.state ===5 )return `<span style="color: #2b63b4">待处理</span>`;
              if(rowData.state ===6 )return `<span style="color: #999999">已消除</span>`;
              if(rowData.state ===7 )return `<span style="color: #c48382">已撤销</span>`;
              if(rowData.state ===10 )return `<span style="color: #59007a">已驳回</span>`;
              if(rowData.state ===12 )return `<span style="color: #999999">已停止</span>`;
              if(rowData.state ===13 )return `<span style="color: #999999">已完成</span>`;
              if(rowData.state ===15 )return `<span style="color: #00b400">待处理</span>`;
            }
          },
          {
            field: "workType",
            title: "工单类型",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true,
            formatter:function (rowData) {
              if(rowData.workType ===1 )return `<span>保养</span>`;
              if(rowData.workType ===0 )return `<span>检修</span>`;
              if(rowData.workType ===2 )return `<span>故障</span>`;
            }
          },
          {
            field: "workDesc",
            title: "工单描述",
            width: 200,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "workCauseAnalysis",
            title: "原因分析",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "deviceNames",
            title: "设备名称",
            width: 120,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "gmtCreate",
            title: "工单创建时间",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "operation",
            title: "操作",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            componentName: "table-operations"
          }
        ],
        isHideList: this.$route.params.id !== undefined
          ? true : false,
        isPage:1,
        pageValue:"",
        workId:0,
      };
    },
    components:{
      personnel
    },
    methods: {
      cancel() {
        this.dialogVisible = false;
        this.outerVisible = false;
        this.formLabelAlign.desc = "";
        this.formLabelAlign.type = "";
        this.formLabelAlign.time = "";
        this.formLabelAlign.radio = "";
        this.formLabelAlign.name = "";
        this.toAuditName="";
      },
      isSubmitAudit(){
        if (this.formLabelAlign.radio===0){
          if(this.toAuditName!==""||this.formLabelAlign.type){
            this.toSubmitAudit();
          }else{
            this.$message.error('请选择终审或添加下一审核人')
          }
        }else if(this.formLabelAlign.desc!==""){
          this.toSubmitAudit();
        }else{
          this.$message.error("请填写驳回原因")
        }
      },
      toSubmitAudit(){
        this.Axios(
          {
            params: {
              nextUserId: this.nextUserId,
              workId:this.workId,
              auditOpinion:this.formLabelAlign.desc,
              passOrTurn:this.formLabelAlign.radio
            },
            type: "get",
            url: "/maintenanceWork/workAudit"
          },
          this
        ).then(
          response => {
            this.outerVisible = false;
            this.reload();
          },
          ({ type, info }) => {
          }
        );
      },
      getPersonnel(params) {
        this.toAuditName = params.person;
        this.innerVisible = params.hide;
        this.nextUserId = this.toAuditName.employeeId;
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
      getTableData() {
        this.tableData = this.tableDate.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        );
      },
      pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.getTableData();
        this.audited = "";
        this.inAudit = "";
        this.handle = "";
        this.load(this.stateNum);
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
        this.audited = "";
        this.inAudit = "";
        this.handle = "";
        this.load(this.stateNum);
      },
      Jump(rowIndex, rowData, column) {
        if (rowData.workType === 2) {
          this.$router.push({path:"WorkOrder/BreakdownOrder/" + rowData.id});
        } else {
          this.$router.push({path:"WorkOrder/UpkeepAndTurnaroundPlans/" + rowData.id});
        }
      },

      load(stateNum) {
        this.pageValue === ""|| this.pageValue == null ?this.pageValue = stateNum :
        this.pageValue ===stateNum ? this.pageValue=this.stateNum: this.pageValue = stateNum;
        this.pageValue !== this.stateNum ? this.pageIndex = 1: "";
        EventBus.$on("sideBarTroggleHandle", isCollapse => {
          window.setTimeout(() => {
            this.$refs.workOrderTable.resize();
          }, 500);
        });
        this.Axios(
          {
            params: {
              state: stateNum,
              page: this.pageIndex,
              size: this.pageSize
            },
            type: "get",
            url: "/maintenanceWork/workList",
          },
          this
        ).then(
          response => {
            this.stateNum = stateNum;
            this.totalNub = response.data.data.totalElements;
            this.tableData = response.data.data.content;
            this.tableDate = this.tableData;
          },
          ({ type, info }) => {}
        );
      },
      workToPlans(params){
        if (params.type === "workToPlans") {
          let role = JSON.parse(localStorage.getItem("permissionUrl"));
          if(params.rowData.workType===1&&role.find(item=>{return item.module==="operation_maintain_detail_lookup"}))
            this.$router.push({path:"Upkeep/UpkeepAmend/" + params.rowData.maintenanceId});
          else if(params.rowData.workType===0&&role.find(item=>{return item.module==="operation_overhaul_detail_lookup"}))
            this.$router.push({path:"TurnaroundPlans/TurnaroundPlansAmend/" + params.rowData.maintenanceId});
          else if(params.rowData.workType===2&&role.find(item=>{return item.module==="operation_fault_detail_lookup"}))
            this.$router.push({path:"Breakdown/BreakDetails/" + params.rowData.maintenanceId});
          else this.$message.error("对不起，您的权限不足")
        }
        if (params.type ==="look") {
          if (params.rowData.workType === 2) {
            this.$router.push({path:"WorkOrder/BreakdownOrder/" + params.rowData.id});
          } else {
            this.$router.push({path:"WorkOrder/UpkeepAndTurnaroundPlans/" + params.rowData.id});
          }
        }
        if (params.type ==="submit") {
          this.outerVisible=true;
          this.workId = params.rowData.id;
        }
      },
    },
    created() {
      this.load();
      this.$route.params.id !== undefined ? this.isHideList=true : this.isHideList=false;
    },
    mounted() {},
    watch: {
      $route() {
        this.$route.params.id !== undefined ? this.isHideList=true : this.isHideList=false;
        this.$refs.workOrderTable.resize();
        this.$store.state.operation.work==="y"? this.reload():"";
      }
    },
  };
  Vue.component("table-operations", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
            <a href="" style="text-decoration: none"><i @click.stop.prevent="lookWork(rowData,index)" style='font-size:16px;color:#409eff' class='iconfont'>&#xe734;</i></a>
        </el-tooltip>
         &nbsp;
        <el-tooltip class="item" effect="dark" content="审核" placement="top">
            <permission-button permCode='work_list_detail_lookup.work_list_detail_audit'
                     banType='disable' type="text"
                     style="text-decoration: none;color:#409EFF;margin-left: -2px">
                    <i @click.stop.prevent="submitAudit(rowData,index)" @dblclick.stop style='font-size:16px' class='iconfont'>&#xe689;</i>
            </permission-button>
          </el-tooltip>
          &nbsp;
           <el-tooltip class="item" effect="dark" content="点击查看来源" placement="top">
            <a href="" style="text-decoration: none"><i @click.stop.prevent="workToPlans(rowData,index)" style='font-size:16px;color:#409eff' class='iconfont'>&#xe619;</i></a>
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
      lookWork() {
        // 参数根据业务场景随意构造
        let params = { type: "look", index: this.index, rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
      submitAudit(){
        let params = { type: "submit", index: this.index, rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
      workToPlans() {
        // 参数根据业务场景随意构造
        let params = { type: "workToPlans", index: this.index, rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
    }
  });

</script>
<style scoped lang="less">
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  @border: 1px solid #dde2eb;
  .work-order {
    font-size: 12px;
    .top {

      border: @border;
      padding: 10px;
      border-radius: 5px;
      .el-badge:not(:last-child) {
        margin-right: 10px;
      }
    }
    .bottom {
      margin-top: 10px;
      padding: 10px;
      border: @border;
      border-radius: 5px;
    }
  }
</style>
