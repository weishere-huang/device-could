<template>
  <div class="message">
    <div class="userCase">
      <div class="top">
        <el-button
          size="small"
          @click="allMsg"
        >所有消息</el-button>
        <el-button
          size="small"
          @click="allNotReadMsg"
        >未读消息</el-button>
        <el-button
          size="small"
          @click="updateAllMessageRead"
        >全部已阅</el-button>
        <el-button
          size="small"
          @click="deleteMessage"
        >删除</el-button>
        您有 <font color="#dc143c">{{msgcount}}</font> 条未读消息 !

      </div>
      <div class="bottom">
        <div>
          <v-table
            :row-dblclick="details"
            is-horizontal-resize
            column-width-drag
            :multiple-sort="false"
            style="width:100%;min-height:400px;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :select-all="selectALL"
            :select-group-change="selectGroupChange"
            @on-custom-comp="customCompFunc"
          ></v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:center;margin-top:20px"
          >
            <v-pagination
              @page-change="pageChange"
              @page-size-change="pageSizeChange"
              :total=this.tableData.length
              :page-size="pageSize"
              :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <MsgDetails
      v-show="detailsShow"
      :msgDetail="msgDetail"
      v-on:detailsIsHide="detailsIsHide"
    ></MsgDetails>
  </div>
</template>
<script>
let apiMsg = "http://192.168.1.104:9880/m";
import MsgDetails from "./MsgDetails";
import Vue from "vue";
export default {
  data() {
    return {
      detailsShow: false,
      msgDetail: "",
      pageIndex: 1,
      pageSize: 20,
      userId: 10,
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
          columnAlign: "center"
          //   isResize: true
          //   orderBy: ""
        },
        {
          field: "msgContent",
          title: "信息内容",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "msgType",
          title: "消息类型",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "isRead",
          title: "是否阅读",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "gmtCreate",
          title: "创建时间",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
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
      ]
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

        alert(`行号：${params.index} 姓名：${params.rowData["name"]}`);
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
      this.allMsg();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      this.allMsg();
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

    deleteMessage() {
      //逻辑删除
      let qs = require("qs");
      let data = qs.stringify({
        ids: this.ids
      });
      this.axios
        .put(apiMsg + "/message/UpdateMsgState/", data)
        .then(result => {
          this.allMsg();
          alert("成功删除!!!");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    allMsg() {
      //查询该用户所有消息
      let qs = require("qs");
      let data = qs.stringify({
        page: this.pageIndex,
        size: this.pageSize
      });
      this.axios
        .get(apiMsg + "/message/allMsg/", data)
        .then(result => {
          console.log(result.data.data);
          for (let i = 0; i < result.data.data.length; i++) {
            if (result.data.data[i].isRead == 0) {
              result.data.data[i].isRead = "未读";
            } else {
              result.data.data[i].isRead = "已读";
            }
          }
          this.tableData = result.data.data;
          this.NotReadMsgCount();
        })
        .catch(err => {
          console.log(err);
        });
    },
    oneMessage() {
      //根据消息ID查询单个消息
      if (this.ids.length > 1) {
        alert("请选择单个消息");
      } else {
        this.axios
          .get(apiMsg + "/message/findOneMsg/" + this.ids)
          .then(result => {
            alert(
              result.data.data.id +
                "\n---标题--" +
                result.data.data.msgTitle +
                "\n--内容--" +
                result.data.data.msgContent
            );
            console.log(result.data);
            console.log(this.rowData);
            if (this.rowData.isRead === 0) {
              this.updateMessageRead();
              this.allMsg();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      //执行修改阅读状态函数
    },
    allNotReadMsg() {
      //查询该用户所有未读消息
      let qs = require("qs");
      let data = qs.stringify({
        page: this.pageIndex,
        size: this.pageSize
      });
      this.axios
        .get(apiMsg + "/message/allNotReadMsg/", data)
        .then(result => {
          console.log(result.data);
          if (result.data.data.length > 0) {
            for (let i = 0; i < result.data.data.length; i++) {
              if (result.data.data[i].isRead == 0) {
                result.data.data[i].isRead = "未读";
              } else {
                result.data.data[i].isRead = "已读";
              }
            }
            this.tableData = result.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    NotReadMsgCount() {
      //查询该用户未读消息数目
      this.axios
        .get(apiMsg + "/message/NotReadMsgCount/")
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
      this.axios
        .get(apiMsg + "/message/UpdateMsgRead/" + this.ids)
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateAllMessageRead() {
      //全部已阅
      this.axios
        .get(apiMsg + "/message/UpdateAllMsgRead/")
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    details(rowIndex, rowData, column) {
      console.log(rowData.id);
      this.msgDetail = rowData;
      this.detailsShow = true;
      this.ids = rowData.id;
      this.axios
        .get(apiMsg + "/message/findOneMsg/" + this.ids)
        .then(result => {
          console.log(result);
          this.msgDetail = result.data.data;
          if (this.msgDetail.isRead === 0) {
            this.updateMessageRead();
            this.allMsg();
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
        <a href="" @click.stop.prevent="update(rowData,index)" style="text-decoration: none;">修改</a>
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
