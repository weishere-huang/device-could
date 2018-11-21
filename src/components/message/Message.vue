<template>
  <div class="message">
    <div class="userCase">
      <div class="top">
        <el-button size="small" @click="allMsg">所有消息</el-button>
        <el-button size="small" @click="allNotReadMsg">未读消息</el-button>
        <el-button size="small" @click="deleteMessage">删除</el-button>
        您有  <font color="#dc143c">{{msgcount}}</font>  条未读消息 !

      </div>
      <div class="bottom">
        <div>
          <v-table :row-dblclick="details" is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;"
                   :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff"
                   :select-all="selectALL" :select-group-change="selectGroupChange"></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:20px">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="50" :page-size="pageSize"
                          :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <MsgDetails v-show="detailsShow" :msgDetail="msgDetail" v-on:detailsIsHide="detailsIsHide"></MsgDetails>
  </div>
</template>
<script>
  import MsgDetails from './MsgDetails'
  export default {
    data() {
      return {
        detailsShow:false,
        msgDetail:"",
        pageIndex: 1,
        pageSize: 20,
        userId: 10,
        ids: "",
        rowData:"",
        msgcount: 0,
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
            field: "msgTitle",
            title: "信息标题",
            width: 150,
            titleAlign: "center",
            columnAlign: "left",
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
            field: "gmtCreate",
            title: "创建时间",
            width: 50,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          }
        ]
      }
    },
    methods: {
      selectGroupChange(selection) {
        this.ids = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.ids != "") {
            this.ids += "," + selection[i].id;
          } else {
            this.ids += selection[i].id
          }
        }
        this.rowData=selection[0];
        console.log("select-group-change", selection);
      },
      selectALL(selection) {
        this.ids = "";
        for (let i = 0; i < selection.length; i++) {
          if (this.ids != "") {
            this.ids += "," + selection[i].id;
          } else {
            this.ids += selection[i].id
          }
        }
        console.log("select-aLL", selection);
      },
      selectChange(selection,rowData) {
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
      },
      sortChange(params) {
        if (params.height.length > 0) {
          this.tableConfig.tableData.sort(function (a, b) {
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
          ids:this.ids
        });
        this.axios
          .put(this.global.apiSrc+"/message/UpdateMsgState/",data)
          .then(result => {
            this.allMsg();
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
          page: this.pageIndex,
          size: this.pageSize
        });
        this.axios
          .get(this.global.apiSrc+"/message/allMsg/" + this.userId, data)
          .then(result => {
            console.log(result.data.data);
            // for(let i = 0;i<result.data.data.length;i++){
            //   if(result.data.data[i].isRead ==)
            // }
            this.tableData = result.data.data;
            this.NotReadMsgCount();
          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
      oneMessage() {
        //根据消息ID查询单个消息
        if (this.ids.length > 1) {
          alert("请选择单个消息")
        } else {
          this.axios
            .get(this.global.apiSrc+"/message/findOneMsg/" + this.ids, )
            .then(result => {
              alert(result.data.data.id + "\n---标题--" + result.data.data.msgTitle + "\n--内容--" + result.data.data.msgContent);
              console.log(result.data);
              console.log(this.rowData);
              if (this.rowData.isRead === 0) {
                this.updateMessageRead();
                this.allMsg();
              }

            })
            .catch(err => {
              console.log(err);
              console.log(this.userName);
            });
        };
        //执行修改阅读状态函数

      },
      allNotReadMsg() {
        //查询该用户所有未读消息
        let qs = require("qs");
        let data = qs.stringify({
          page: 1,
          size: 20
        });
        this.axios
          .get(this.global.apiSrc+"/message/allNotReadMsg/" + this.userId, data)
          .then(result => {
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
        this.axios
          .get(this.global.apiSrc+"/message/NotReadMsgCount/" + this.userId, data)
          .then(result => {
            this.msgcount = result.data.data;
            console.log(result.data);
          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
      updateMessageRead() {
        //修改消息为已读
        this.axios
          .get(this.global.apiSrc+"/message/UpdateMsgRead/" + this.ids)
          .then(result => {
            console.log(result.data);
          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
      details(rowIndex, rowData, column){
        console.log(rowData.id);
        this.msgDetail=rowData;
        this.detailsShow=true;
        this.ids=rowData.id;
        this/axios
          .get(this.global.apiSrc+"/message/findOneMsg/" + this.ids)
          .then(result => {
            console.log(result.data);
           this.msgDetail=result.data.data;
            if (this.msgDetail.isRead === 0) {
              this.updateMessageRead();
              this.allMsg();
            }
          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });

      },
      detailsIsHide:function (params) {
        this.detailsShow=params
      }
    },
    created() {
      //查询当前用户所有消息
      this.allMsg();
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
</style>
