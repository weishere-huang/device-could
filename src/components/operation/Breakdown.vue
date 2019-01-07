<template>
  <div class="turnaround-plans">
    <router-view></router-view>
    <div class="userCase" :class="[{hide:isHideList}]">
      <div class="top">
        <el-button
          size="small"
          type="primary"
          @click="reload()"
        ><i style='font-size:12px' class='iconfont'>&#xe614;</i>&nbsp;刷新</el-button>
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
            <el-button type="primary" @click="cancel">取 消</el-button>
            <el-button

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
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
            //   orderBy: ""
          },
          {
            field: "state",
            title: "状态",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true,
          },
          {
            field: "deviceName",
            title: "设备名称",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "deviceSpec",
            title: "规格/型号",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "faultLevel",
            title: "故障等级",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true,
            formatter:function (rowData) {
              if (rowData.faultLevel === 1) {
                return `<span >低</span>`;
              }else if (rowData.faultLevel === 2) {
                return `<span >中</span>`;
              }else if (rowData.faultLevel === 3) {
                return `<span >高</span>`;
              }
            },
          },
          {
            field: "faultSource",
            title: "故障来源",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "faultDesc",
            title: "故障描述",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "causeAnalysis",
            title: "原因分析",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true,
            overflowTitle: true
          },
          {
            field: "custome-adv",
            title: "操作",
            width: 120,
            titleAlign: "center",
            columnAlign: "center",
            componentName: "table-breakdown"
            // isResize: true
          }
        ]
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
      customCompFunc(params) {
        // console.log(params);
        if (params.type === "delete") {
          this.toDeleteBreak(params.rowData.id);
        } else if (params.type === "edit") {
          this.toDetails(params.index, params.rowData);
        }else if(params.type === "dispel"){
          this.faultIds = params.rowData.id;
          params.rowData.state ==="待处理" ?　this.dispel() : this.$message.error('对不起、不能消除'+params.rowData.state+'的计划')
        }else if(params.type === "submitAudit"){
          this.faultIds = params.rowData.id;
          params.rowData.state ==="待审核" ?　this.outerVisible = true : this.$message.error('对不起、不能审核'+params.rowData.state+'的计划')
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
        if (this.pageIsOk) {
          this.load();
        }
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
            this.springReplacement();
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
      springReplacement() {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].state === 0) {
            this.tableData[i].state = "待审核";
          }
          if (this.tableData[i].state === 1) {
            this.tableData[i].state = "执行中";
          }
          if (this.tableData[i].state === 2) {
            this.tableData[i].state = "禁用";
          }
          if (this.tableData[i].state === 3) {
            this.tableData[i].state = "已删除";
          }
          if (this.tableData[i].state === 4) {
            this.tableData[i].state = "审核中";
          }
          if (this.tableData[i].state === 5) {
            this.tableData[i].state = "执行中";
          }
          if (this.tableData[i].state === 6) {
            this.tableData[i].state = "已消除";
          }
          if (this.tableData[i].state === 7) {
            this.tableData[i].state = "已撤销";
          }
          if (this.tableData[i].state === 10) {
            this.tableData[i].state = "已驳回";
          }
          if (this.tableData[i].state === 12) {
            this.tableData[i].state = "已停止";
          }
          if (this.tableData[i].state === 14) {
            this.tableData[i].state = "已完成";
          }
          if (this.tableData[i].faultSource === "0") {
            this.tableData[i].faultSource = "人工提交";
          }
          if (this.tableData[i].faultSource === "1") {
            this.tableData[i].faultSource = "设备采集";
          }
        }
      },
      search() {
        if (this.faultKey !== "") {
          this.toSearch();
        } else {
          this.pageIsOk = true;
          this.pageChange(1);
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
            this.springReplacement();
            this.tableDate = this.tableData;
            this.pageIsOk = false;
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

    },
    created() {
      this.load();
    },
    components: {
      audit,
      personnel
    },
    watch: {
      $route() {
        this.isHideList=this.$route.params.id !== undefined ? true : false;
        this.$refs.breakdownTable.resize();
        this.$store.state.operation.breakList==="y"? this.reload():"";
      }
    },
  };
  Vue.component("table-breakdown", {
    template: `<span>
        <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <a href="" style="text-decoration: none;color:#409eff"><i @click.stop.prevent="update(rowData,index)"  style='font-size:16px' class='iconfont'>&#xe734;</i></a>
        </el-tooltip>
         &nbsp;
        <el-tooltip class="item" effect="dark" content="审核" placement="top">
            <a href="" style="text-decoration: none;color:#2474c5"><i @click.stop.prevent="submitAudit(rowData,index)" @dblclick.stop style='font-size:16px' class='iconfont'>&#xe689;</i></a>
          </el-tooltip>
         &nbsp;
        <el-tooltip class="item" effect="dark" content="消除" placement="top">
            <a href="" style="text-decoration: none;color:#2474c5"><i @click.stop.prevent="dispel(rowData,index)" @dblclick.stop style='font-size:16px' class='iconfont'>&#xe645;</i></a>
          </el-tooltip>
        &nbsp;
        <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <a href="" style="text-decoration: none;color:#F56C6C"><i @click.stop.prevent="deleteRow(rowData,index)" @dblclick.stop style='font-size:16px' class='iconfont'>&#xe66b;</i></a>
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
          width: 40%;
          font-size: 12px;
          .el-input {
            width: 70%;
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
