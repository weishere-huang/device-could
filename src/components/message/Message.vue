<template>
  <div class="message">
    <div class="userCase">
      <div class="top">
        <el-button
          size="small"
          type="primary"
          @click="allMsg"
        >所有消息
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="allNotReadMsg"
        >未读消息
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="btwarning"
        >全部标为已读
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="dtwarning"
        >删除
        </el-button>

      </div>
      <div class="bottom">
        <div>
          <v-table
            :row-dblclick="details"
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :select-all="selectALL"
            :select-group-change="selectGroupChange"
            @on-custom-comp="customCompFunc"
            ref="messageTable"
          ></v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:left;margin-top:20px"
          >
            <v-pagination
              @page-change="pageChange"
              @page-size-change="pageSizeChange"
              :total=totoelement
              :page-size="pageSize"
              :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="消息详情" width="30%" :visible.sync="detailsShow">
     <MsgDetails
      v-show="detailsShow"
      :msgDetail="msgDetail"
      v-on:detailsIsHide="detailsIsHide"
      ></MsgDetails>
    </el-dialog>

  </div>
</template>
<script>
let apiMsg = "http://192.168.1.104:9880/m";
import MsgDetails from "./MsgDetails";
import Vue from "vue";

export default {
  inject: ["reload"],
  data() {
    return {
      detailsShow: false,
      msgDetail: "",
      pageIndex: 1,
      pageSize: 10,
      ids: "",
      rowData: "",
      msgcount: 0,
      tableData: [],
      tableDate: [],
      columns: [
        {
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        {
          field: "msgTitle",
          title: "信息标题",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          overflowTitle: true,
          isResize: true
          //   orderBy: ""
        },
        {
          field: "msgContent",
          title: "信息内容",
          width: 200,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "isRead",
          title: "是否阅读",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          formatter: function(rowData, rowIndex, pagingIndex, field) {
            return rowData.state === "0"
              ?`<span style="color:#ff6600">未读</span>`
              :`<span>已读</span>`
          },
        },
        {
          field: "gmtCreate",
          title: "创建时间",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "custome-adv",
          title: "操作",
          width: 100,
          titleAlign: "center",
          columnAlign: "center",
          componentName: "table-message"
          // isResize: true
        }
      ],
      //判断是未读消息
      readkey:0,
      totoelement:0
    };
  },
  methods: {
    customCompFunc(params) {
      console.log(params);

      if (params.type === "delete") {
        // do delete operation

        this.$delete(this.tableData, params.index);
      } else if (params.type === "edit") {
        // do edit operation
        this.ids = params.rowData.id;
        this.dtwarning();
      } else if (params.type === "stop") {
        // do edit operation

        alert(`ID：${params.rowData["id"]} 姓名：${params.rowData["name"]}`);
      }
    },
    selectGroupChange(selection) {
      this.ids = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.ids != "") {
          this.ids += "," + selection[i].id;
        } else {
          this.ids += selection[i].id;
        }
      }
      this.rowData = selection[0];
      console.log("select-group-change", selection);
    },
    selectALL(selection) {
      this.ids = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.ids != "") {
          this.ids += "," + selection[i].id;
        } else {
          this.ids += selection[i].id;
        }
      }
      console.log("select-aLL", selection);
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
      if(this.readkey === 0){
        this.allMsg();
      }else{
        this.allNotReadMsg;
      }
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      this.allMsg();
      if(this.readkey === 0){
        this.allMsg();
      }else{
        this.allNotReadMsg;
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

    dtwarning() {
      console.log(this.ids);
      if (this.ids === "") {
        this.$message.warning("至少选择一条数据")
      } else {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMessage();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
    },
    deleteMessage() {
      //逻辑删除
      let qs = require("qs");
      let data = qs.stringify({
        ids: this.ids
      });
      this.Axios(
        {
          url: "/message/UpdateMsgState/",
          params: data,
          type: "post",
          option: {
            requestTarget:"m",
            enableMsg:false
          },
        },
        this
      )
        //.post(apiMsg + "/message/UpdateMsgState/", data)
        .then(result => {
          this.reload();
          this.$message("成功删除!!!");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    allMsg() {
      //查询该用户所有消息
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.messageTable.resize();
        }, 500);
      });
      this.readkey=0;
      this.Axios(
        {
          params:{
            page: this.pageIndex,
            size: this.pageSize
          },
          type: "get",
          url: "/message/allMsg",
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
          option:{
            requestTarget:"m",
            enableMsg:false
          }
        },
        this
      )
        .then(result => {
          console.log(result.data);
          console.log(result.data.data);

          this.tableData = result.data.data.content;
          this.totoelement = result.data.data.totalElements;
          this.NotReadMsgCount();
        })
        .catch(err => {
          console.log(err);
        });
    },
    allNotReadMsg() {
      this.readkey=1;
      this.Axios(
        {
          params: {
            page: this.pageIndex,
            size: this.pageSize
          },
          type: "get",
          url: "/message/allNotReadMsg",
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
          option:{
            requestTarget:"m",
            enableMsg:false
          }
        },
        this
      )
        .then(result => {
          console.log(result);
          console.log(result.data);
          this.tableData = result.data.data.content;
          this.totoelement = result.data.data.totalElements;
        })
        .catch(err => {
          console.log(err);
        });
    },

    NotReadMsgCount() {
      //查询该用户未读消息数目
      this.Axios(
        {
          url: "/message/NotReadMsgCount/",
          type: "get",
          option:{
            enableMsg:false,
            requestTarget:"m"
          }
        },
        this
      )
        // .get(apiMsg + "/message/NotReadMsgCount/")
        .then(result => {
          this.msgcount = result.data.data;
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateMessageRead() {
      //修改消息为已读
      this.Axios(
        {
          params:{ids:this.ids},
          url: "/message/UpdateMsgRead/",
          type: "get",
          option:{requestTarget:"m"}
        },
        this
      )
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateAllMessageRead() {
      //全部已阅
      this.Axios(
        {
          url: "/message/UpdateAllMsgRead/",
          type: "get",
          option:{requestTarget:"m"}
        },
        this
      )
        //.get(apiMsg + "/message/UpdateAllMsgRead/")
        .then(result => {
          if(result.data.code === 200){
            this.reload();
          }
          console.log(result.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    btwarning(){
      this.$confirm('确定要全部标为已读吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateAllMessageRead();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    details(rowIndex, rowData, column) {
      console.log(rowData.id);
      this.msgDetail = rowData;
      this.detailsShow = true;
      this.ids = rowData.id;
      this.updateMessageRead();
      this.findonemsg();
    },
    findonemsg(){
      this.Axios(
        {
          url: "/message/findOneMsg/" + this.ids,
          type: "get",
          option:{requestTarget:"m"}
        },
        this
      )
      // .get(apiMsg + "/message/findOneMsg/" + this.ids)
        .then(result => {
          console.log(result);
          this.msgDetail = result.data.data;
          if (this.msgDetail.isRead === 0) {
            //this.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    detailsIsHide: function(params) {
      this.detailsShow = params;
    }
  },
  created() {
    //查询当前用户所有消息
    this.allMsg();
  },
  components: {
    MsgDetails
  }
};
Vue.component("table-message", {
  template: `<span>
  <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i style='font-size:16px;color:#F56C6C;cursor: pointer;' class='iconfont' @click.stop.prevent="update(rowData,index)">&#xe66b;</i>
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
    stop() {
      let params = { type: "stop", rowData: this.rowData };
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
.message {
  // padding-left: 180px;
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
        .el-input {
          width: 80%;
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
