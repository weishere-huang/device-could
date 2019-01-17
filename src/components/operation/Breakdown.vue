<template>
  <div class="turnaround-plans">
    <router-view></router-view>
    <div class="userCase" :class="[{hide:isHideList}]">
      <div class="top">
        <permission-button
          permCode='operation_fault_lookup.operation_fault_audit'
          banType='hide'
          size="small"
          type="primary"
          @click="reportedShow"
        >故障上报</permission-button>
        <el-button
          size="small"
          type="primary"
          @click="reload()"
        ><i style='font-size:12px' class='iconfont'>&#xe614;</i>&nbsp;立即刷新</el-button>
        <el-dialog
          title="故障消除"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <el-form
            label-position=right
            label-width="120px"
            :model="formLabelAlign"
            style="padding:10px"
          >
            <el-form-item label="故障持续时间：">
              <el-input
                autofocus
                v-model="formLabelAlign.time"
                size="mini"
                style="width:30%"
              ></el-input>
              <span>小时</span>
            </el-form-item>
            <el-form-item label="消除原因：">
              <el-input
                type="textarea"
                v-model="formLabelAlign.desc"
              ></el-input>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button size="small" @click="cancel">取 消</el-button>
            <el-button
              size="small"
              type="primary"
              @click="toDispel"
            >确 定</el-button>
          </span>
        </el-dialog>
        <!-- 故障消除弹框结束 -->
        <!--<el-button size="small" @click="deleteBreak">删除</el-button>-->
        <div class="search">
          <el-input
            type="search"
            placeholder="如故障编码，设备名称"
            size="small"
            v-model="faultKey"
            @keyup.enter.native="search"
          ></el-input>
          <el-button
            size="small"
            @click="search"
            type="primary"
          ><i class='el-icon-search'></i>&nbsp;搜索</el-button>
        </div>
      </div>
      <div class="bottom">
        <div>
          <v-table
            :row-dblclick="toDetails"
            :select-all="selectALL"
            :select-group-change="selectGroupChange"
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            @on-custom-comp="customCompFunc"
            ref="breakdownTable"
            :show-vertical-border="false"
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
    <!--工单查看弹窗-->
    <el-dialog
      :title="planName"
      :visible.sync="workIsShow"
      width="50%"
    >
      <div style="padding:10px">
        <v-table
          is-horizontal-resize
          column-width-drag
          :multiple-sort="false"
          style="width:100%;"
          :columns="workInfoTable"
          :table-data="workInfoDate"
          @on-custom-comp="lookWork"
          row-hover-color="#eee"
          row-click-color="#edf7ff"
          :row-height=35
          :show-vertical-border="false"
        ></v-table>
      </div>
    </el-dialog>
    <!--工单查看弹窗结束-->
  </div>
</template>
<script>
  import audit from "./breakdown/Audit";
  import personnel from "./breakdown/Personnel";
  import Vue from "vue";
  export default {
    inject: ["reload"],
    data() {
      return {
        isHideList: this.$route.params.id !== undefined
          ? true
          : false,
        arr: [],
        dialogVisible: false,
        toAuditName: "",
        formLabelAlign: {
          time: "",
          desc: "",
          type: "",
          radio: "",
          name: ""
        },
        approval: "",
        faultIds: "",
        pageNumber: 0,
        outerVisible: false,
        innerVisible: false,
        faultId: "",
        faultKey: "",
        auditShow: false,
        auditdetails: "",
        pageIndex: 1,
        pageSize: 10,
        tableData: [],
        tableDate: [],
        pageIsOk: true,
        columns: [
          {
            field: "faultNo",
            title: "故障编号",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
            //   orderBy: ""
          },
          {
            field: "state",
            title: "状态",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true,
            formatter:function (rowData) {
              if(rowData.state ===0 )return `<span style="color: #ff6600">待审核</span>`;
              if(rowData.state ===2 )return `<span style="color: #c48382">已禁用</span>`;
              if(rowData.state ===4 )return `<span style="color: #409dfe">审核中</span>`;
              if(rowData.state ===5 )return `<span style="color: #00b400">执行中</span>`;
              if(rowData.state ===6 )return `<span style="color: #999999">已消除</span>`;
              if(rowData.state ===7 )return `<span style="color: #c48382">已撤销</span>`;
              if(rowData.state ===10 )return `<span style="color: #59007a">已驳回</span>`;
              if(rowData.state ===12 )return `<span style="color: #999999">已停止</span>`;
              if(rowData.state ===14 )return `<span style="color: #999999">已完成</span>`;
            }
          },
          {
            field: "deviceName",
            title: "设备名称",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "deviceModel",
            title: "规格/型号",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "faultLevel",
            title: "故障等级",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true,
            formatter:function (rowData) {
              if (rowData.faultLevel === 1) {
                return `低`;
              }else if (rowData.faultLevel === 2) {
                return `中`;
              }else if (rowData.faultLevel === 3) {
                return `高`;
              }
            },
          },
          {
            field: "faultSource",
            title: "故障来源",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true,
            formatter:function (rowData) {
              if(rowData.faultSource ==0 )return `人工提交`;
              if(rowData.faultSource ==1 ) return `设备采集`;
            }
          },
          {
            field: "faultDesc",
            title: "故障描述",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "causeAnalysis",
            title: "原因分析",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "custome-adv",
            title: "操作",
            width: 140,
            titleAlign: "center",
            columnAlign: "center",
            componentName: "table-breakdown"
          }
        ],
        planName:"",
        workIsShow:false,
        workInfoTable:[
          {
            field: "workNo",
            title: "工单编号",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "gmtCreate",
            title: "创建时间",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "state",
            title: "状态",
            width: 60,
            titleAlign: "left",
            columnAlign: "left",
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
            field: "id",
            title: "查看",
            width: 60,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true,
            componentName: "table-lookWorkInfoS"
          }
        ],
        workInfoDate:[],
        searchValue:"",
      };
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
      lookWork(params){
        if(params.type === "lookWorkList"){
          this.goWorkInfo(params.rowData.id);
        }
      },
      goWorkInfo(value){
        this.$router.push({path:"WorkOrder/BreakdownOrder/" + value});
      },
      workInfoLoad(value){
        this.Axios(
          {
            params: {
              planId:value,
              planType:2
            },
            type: "get",
            url: "/mplan/planToWorkInfo",
            option:{enableMsg:false}
          },
          this
        ).then(
          response => {
            this.workInfoDate = response.data.data;
          },
          ({ type, info }) => {}
        )
      },
      customCompFunc(params) {
        if (params.type === "delete") {
          this.toDeleteBreak(params.rowData.id);
        } else if (params.type === "edit") {
          this.toDetails(params.index, params.rowData);
        }else if(params.type === "dispel"){
          this.faultIds = params.rowData.id;
          params.rowData.state === 5 || params.rowData.state === 0 ?
            this.dispel() : this.$message.error('对不起、只能消除待审核或执行中的计划')
        }else if(params.type === "submitAudit"){
          this.faultIds = params.rowData.id;
          params.rowData.state ===0 ?　this.outerVisible = true : this.$message.error('对不起、只能操作待审核的计划')
        }else if(params.type === "work"){
          this.workIsShow = true;
          this.planName = "故障编号“"+params.rowData.faultNo+"”的关联工单";
          this.workInfoLoad(params.rowData.id);
        }
      },
      toDetails(rowIndex, rowData, column) {
        this.$router.push({path:"Breakdown/BreakDetails/" + rowData.id});
      },
      auditHide(params) {
        this.auditShow = params;
      },
      toAudit() {
        this.auditShow = true;
      },
      selectGroupChange(selection) {
        this.arr = selection;
        this.faultIds = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.faultIds === "") {
            this.faultIds = selection[i].id;
          } else {
            this.faultIds += "," + selection[i].id;
          }
        }
        this.auditdetails = selection;
      },
      selectALL(selection) {
        this.arr = selection;
        this.faultIds = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.faultIds === "") {
            this.faultIds = selection[i].id;
          } else {
            this.faultIds += "," + selection[i].id;
          }
        }
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
        if (this.pageIsOk) this.load();
        this.getTableData();
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
        if (this.pageIsOk) {
          this.load();
        }
      },
      sortChange(params) {
        if (params.height.length > 0) {
          this.tableConfig.tableData.sort(function(a, b) {
            if (params.height === "asc") {
              return a.height - b.height;
            } else if (params.height === "desc") {
              return b.height - a.height;
            } else {
              return 0;
            }
          });
        }
      },

      load() {
        EventBus.$on("sideBarTroggleHandle", isCollapse => {
          window.setTimeout(() => {
            this.$refs.breakdownTable.resize();
          }, 500);
        });
        this.Axios(
          {
            params: {
              page: this.pageIndex,
              size: this.pageSize
            },
            type: "get",
            url: "/fault/list",
            option:{enableMsg:false}
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
      toDeleteBreak(faultIds) {
        this.$confirm('此操作将删除该计划、 是否继续?', '提示')
          .then(_=>{
            let qs = require("qs");
            let data = qs.stringify({
              ids: faultIds
            });
            this.Axios(
              {
                params: data,
                type: "post",
                url: "/fault/delete",
                option:{successMsg:"操作成功"}
              },
              this
            ).then(
              response => {
                this.load();
              },
              ({ type, info }) => {}
            );
          })
          .catch(_=>{
          })
      },
      search() {
        debugger;
        if (this.faultKey === "") {
          this.searchValue="";
          this.pageIsOk = true;
          this.pageIndex = 1;
          this.reload();
        } else {
          this.searchValue==="" ? this.pageIndex = 1 : "";
          this.toSearch();
        }
      },
      toSearch() {
        this.Axios(
          {
            params: {
              keyword: this.faultKey,
              page: this.pageIndex,
              size: this.pageSize
            },
            type: "get",
            url: "/fault/search",
            option:{enableMsg:false}
          },
          this
        ).then(
          response => {
            this.pageNumber = response.data.data.totalElements;
            this.tableData = response.data.data.content;
            this.tableDate = this.tableData;
            this.pageIsOk = false;
            this.searchValue = this.faultKey;
          },
          ({ type, info }) => {}
        );
      },
      dispel() {
        this.dialogVisible = true;
      },
      toDispel() {
        let qs = require("qs");
        let data = qs.stringify({
          faultIds: this.faultIds,
          dispelCause: this.formLabelAlign.desc,
          faultDuration: this.formLabelAlign.time
        });
        this.formLabelAlign.desc = "";
        this.formLabelAlign.time = "";
        this.Axios(
          {
            params: data,
            type: "post",
            url: "/fault/dispel",
            option:{successMsg:"操作成功"}
          },
          this
        ).then(
          response => {
            this.load();
            this.dialogVisible = false;
          },
          ({ type, info }) => {
            this.dialogVisible = false;
          }
        );
      },
      getPersonnel(params) {
        this.toAuditName = params.person;
        this.innerVisible = params.hide;
      },
      isSubmitAudit(){
        if (this.formLabelAlign.radio!==1){
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
      toSubmitAudit() {
        this.formLabelAlign.type
          ? (this.formLabelAlign.type = 1)
          : (this.formLabelAlign.type = 0);
        if (this.formLabelAlign.radio === "0") {
          let qs = require("qs");
          let data = qs.stringify({
            faultIds: this.faultIds,
            nextUserId: this.toAuditName.id,
            isEnd: this.formLabelAlign.type,
            auditOpinion: this.formLabelAlign.desc
          });
          console.log(data);
          this.Axios(
            {
              params: data,
              type: "post",
              url: "/fault/auditPass",
              option:{successMsg:"操作成功"}
            },
            this
          ).then(
            response => {
              this.cancel();
              this.load();
            },
            ({ type, info }) => {
              this.cancel();
            }
          );
        } else if (this.formLabelAlign.radio === "1") {
          let qs = require("qs");
          let data = qs.stringify({
            faultIds: this.faultIds,
            auditOpinion: this.formLabelAlign.desc
          });
          this.Axios(
            {
              params: data,
              type: "post",
              url: "/fault/auditReject"
            },
            this
          ).then(
            response => {
              this.arr = "";
              this.formLabelAlign.desc = "";
              console.log(response);
              this.load();
              this.outerVisible = false;
            },
            ({ type, info }) => {
              this.arr = "";
              this.formLabelAlign.desc = "";
            }
          );
        }
      },
      outerVisibleIsOk() {
        if (this.arr.length === 1) {
          this.outerVisible = true;
        } else if (this.arr.length === 0) {
          this.$message.error("请选择要处理的故障");
        }
      },
      reportedShow(){
        this.$router.push({path:"Breakdown/Reported"});
      },
    },
    created() {
      let a=this.$route.matched.find(item=>(item.name==="Reported"))?true:false;
      let b=this.$route.params.id !== undefined ? true : false;
      this.isHideList = a||b ?true:false;
      this.load();
    },
    components: {
      audit,
      personnel
    },
    watch: {
      $route() {
        this.$route.params.id !== undefined || this.$route.matched.find(item=>(item.name==="Reported"))?
          this.isHideList = true: this.isHideList = false;
        this.$refs.breakdownTable.resize();
        this.$store.state.operation.breakList==="y"? this.reload():"";
      }
    },
  };
  Vue.component("table-lookWorkInfoS", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看详情" placement="top">
            <permission-button permCode='work_list_detail_lookup.work_list_detail_save||work_list_detail_lookup.work_list_detail_audit'
                     banType='disable' type="text"
                     @click.stop.prevent="lookWorkInfo(rowData,index)"
                     style="text-decoration: none;color:#409eff;margin-left: -2px">
                     <i  style='font-size:16px' class='el-icon-view'></i>
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
      lookWorkInfo() {
        // 参数根据业务场景随意构造
        let params = { type: "lookWorkList", index: this.index, rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
    }
  });
  Vue.component("table-breakdown", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <permission-button permCode='operation_fault_detail_lookup.operation_fault_detail_audit'
                     banType='disable' type="text"
                     @click.stop.prevent="update(rowData,index)"
                     style="text-decoration: none;color:#409eff;margin-left: -2px">
                      <i  style='font-size:16px' class='iconfont'>&#xe734;</i>
            </permission-button>
        </el-tooltip>
         &nbsp;
        <el-tooltip class="item" effect="dark" content="审核" placement="top">
            <permission-button permCode='operation_fault_lookup.operation_fault_audit'
                     banType='disable' type="text"
                     @click.stop.prevent="submitAudit(rowData,index)"
                     style="text-decoration: none;color:#2474c5;margin-left: -2px">
                     <i  @dblclick.stop style='font-size:16px' class='iconfont'>&#xe689;</i>
            </permission-button>
          </el-tooltip>
         &nbsp;
        <el-tooltip class="item" effect="dark" content="消除" placement="top">
         <permission-button permCode='operation_fault_lookup.operation_fault_dispel'
                     banType='disable' type="text"
                     @click.stop.prevent="dispel(rowData,index)"
                     style="text-decoration: none;color:#2474c5;margin-left: -2px">
                     <i  @dblclick.stop style='font-size:16px' class='iconfont'>&#xe645;</i>
            </permission-button>
          </el-tooltip>
           &nbsp;
        <el-tooltip class="item" effect="dark" content="关联工单" placement="top">
            <permission-button permCode='work_list_detail_lookup.work_list_detail_save||work_list_detail_lookup.work_list_detail_audit'
                     banType='disable' type="text"
                     @click.stop.prevent="planToWork(rowData,index)"
                     style="text-decoration: none;color:#409EFF;margin-left: -2px">
                    <i style='font-size:16px' class='iconfont'>&#xe619;</i>
            </permission-button>
        </el-tooltip>
        &nbsp;
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <permission-button permCode='operation_fault_lookup.operation_fault_delete'
                     banType='disable' type="text"
                     @click.stop.prevent="deleteRow(rowData,index)"
                     style="text-decoration: none;color:#F56C6C;margin-left: -2px">
                     <i  @dblclick.stop style='font-size:16px' class='iconfont'>&#xe66b;</i>
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
      update() {
        // 参数根据业务场景随意构造
        let params = { type: "edit", index: this.index, rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
      deleteRow() {
        // 参数根据业务场景随意构造
        let params = { type: "delete", rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
      dispel() {
        // 参数根据业务场景随意构造
        let params = { type: "dispel", rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
      submitAudit(){
        let params = { type: "submitAudit", rowData: this.rowData };
        this.$emit("on-custom-comp", params);
      },
      planToWork(){
        let params = { type: "work", rowData: this.rowData };
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
  .turnaround-plans {
    // padding-left: 220px;
    .userCase {
      width: 100%;
      padding: 10px;
      .top {
        height: 60px;
        line-height: 60px;
        border: 1px solid @Info;
        border-radius: 5px;
        padding-left: 10px;
        .search {
          float: right;
          width: 390px;
          font-size: 12px;
          .el-input {
            width: 300px;
          }
          span {
            cursor: pointer;
            &:hover {
              color: @blue;
            }
          }
        }
      }
      .bottom {
        padding: 10px;
        font-size: 12px;
        border: 1px solid @Info;
        margin-top: 10px;
        min-height: 500px;
        border-radius: 5px;
      }
    }
  }
</style>
