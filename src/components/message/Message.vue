<template>
  <div class="message">
    <div class="userCase">
      <div class="top">

        <el-button size="small">删除</el-button>


      </div>
      <div class="bottom">
        <div>
          <v-table is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"></v-table>

        <el-button size="small" @cilck="updateMessageRead">修改消息为已读</el-button>
      </div>
      <div class="bottom">
        <div>
          <v-table :row-dblclick="details" is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :select-all="selectALL" :select-group-change="selectGroupChange"></v-table>

          <div class="mt20 mb20 bold" style="text-align:center;margin-top:20px">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="50" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <MsgDetails v-show="detailsShow" :msgDetail="msgDetail" v-on:detailsIsHide="detailsIsHide"></MsgDetails>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        pageIndex: 1,
        pageSize: 20,
        tableData: [
          {
            name: "111",
            tel: "222",
            address: "3333",
            hobby: "4444"
          },
          {
            name: "111",
            tel: "222",
            address: "3333",
            hobby: "4444"
          },
          {
            name: "111",
            tel: "222",
            address: "3333",
            hobby: "4444"
          },
          {
            name: "111",
            tel: "222",
            address: "3333",
            hobby: "4444"
          }
        ],
        tableDate: [],
        columns: [
          {
            width: 50,
            titleAlign: "center",
            columnAlign: "center",
            type: "selection"
          },
          {
            field: "name",
            title: "序号",
            width: 60,
            titleAlign: "center",
            columnAlign: "center",
            //   isResize: true
          },
          {
            field: "tel",
            title: "信息标题",
            width: 150,
            titleAlign: "center",
            columnAlign: "left",
            //   isResize: true
            //   orderBy: ""
          },
          {
            field: "address",
            title: "信息内容",
            width: 150,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          }
        ]
      };
    },
    methods: {
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
      }

import MsgDetails from './MsgDetails'
export default {
  data() {
    return {
      detailsShow:false,
      msgDetail:"",
      pageIndex: 1,
      pageSize: 20,
      userId: 10,
      tableData: [
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        }
      ],
      tableDate: [],
      columns: [
        {
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        {
          field: "title",
          title: "信息标题",
          width: 150,
          titleAlign: "center",
          columnAlign: "left"
          //   isResize: true
          //   orderBy: ""
        },
        {
          field: "msgContent",
          title: "信息内容",
          width: 150,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "msgType",
          title: "消息类型",
          width: 50,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "isRead",
          title: "是否阅读",
          width: 50,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "msgState",
          title: "消息状态",
          width: 50,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "gmtCreate",
          title: "创建时间",
          width: 50,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        }
      ]
    };
  },
  methods: {
    detailsIsHide:function (params) {
      this.detailsShow=params
    },
    details(rowIndex, rowData, column){
      console.log(rowData.name);
      this.msgDetail=rowData;
      this.detailsShow=true;
    },
    selectGroupChange(selection) {
      console.log("select-group-change", selection);
    },
    selectALL(selection) {
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
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
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
    // updateMessage(id){
    //   //修改消息
    // },
    // addMessage(){
    //   //增加消息
    // },
    // RealdeleteMessage(){
    //   //删除消息,物理删除
    // },
    deleteMessage() {
      //逻辑删除
      let qs = require("qs");
      let data = qs.stringify({
        ids: "test"
      });
      axios
        .post("api/message/UpdateMsgState/", data)
        .then(result => {
          alert("逻辑删除执行");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    allMsg() {
      //查询该用户所有消息
      let qs = require("qs");
      let data = qs.stringify({
        page: 1,
        size: 20
      });
      axios
        .get("api/message/allMsg/" + this.userId, data)
        .then(result => {
          alert("allMSg");
          console.log(result.data.data);
          this.tableData = result.data.data;
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    oneMessage() {
      //根据消息ID查询单个消息
      let qs = require("qs");
      let data = qs.stringify({
        id: 1
        //
      });
      axios
        .get("api/message/findOneMsg/1", data)
        .then(result => {
          alert("按照ID 查询单个消息内容");
          alert(
            result.data.data.id +
              "\n---标题--" +
              result.data.data.msgTitle +
              "\n--内容--" +
              result.data.data.msgContent
          );
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    allNotReadMsg() {
      //查询该用户所有未读消息
      let qs = require("qs");
      let data = qs.stringify({
        page: 0,
        size: 20
      });
      axios
        .get("api/message/allNotReadMsg/" + this.userId, data)
        .then(result => {
          alert("所有未读消息");
          console.log(result.data);
          this.tableData = result.data.data;
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    NotReadMsgCount() {
      //查询该用户未读消息数目
      let qs = require("qs");
      let data = qs.stringify({});
      axios
        .get("api/message/NotReadMsgCount/" + this.userId, data)
        .then(result => {
          alert("count");

          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    updateMessageRead() {
      //修改消息为已读
      let qs = require("qs");
      let data = qs.stringify({
        id: 10
        //
      });
      axios
        .get("api/message/UpdateMsgRead/1", data)
        .then(result => {
          alert("updateMessageRead 修改消息已阅读");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });

    }
  },
  created() {
    //查询当前用户所有消息
    this.allMsg();
    //查询当前用用户未读消息数量
    this.NotReadMsgCount();
    //修改消息为已读
    //this.updateMessageRead();
    //查询所有用户未读消息
    //this.allNotReadMsg();
    //按照ID 查询单个消息内容;
    this.oneMessage();
    //按照数组删除数据
    this.deleteMessage();
  },
  components:{
    MsgDetails
  }
};
</script>
<style lang="less" scoped>
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  .message {
    padding-left: 180px;
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
}
</style>
