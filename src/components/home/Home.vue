<template>
  <div class="home">
    <div class="hide">主控面板，欢迎您：{{userMsg.name}}！</div>
    <div class="left">
      <div class="personal-information">
        <div class="user-msg">
          <h5>个人信息</h5>
          <div class="case">
            <div class="photo">
              <img
                src="../../assets/image/pic.png"
                alt=""
              >
            </div>
            <div class="message">
              <p>{{userMsg.name}}</p>
              <p>{{userMsg.position}}</p>
              <p>TEL：{{userMsg.phone}}</p>
            </div>
          </div>
          <span
            class="jurisdiction"
            @click="dialogVisible=true"
          ><i
              class="iconfont"
              style="color:blue"
            >&#xe670;</i>&nbsp;我的权限</span>
        </div>
        <el-dialog
          title="我的权限"
          :visible.sync="dialogVisible"
          width="700px"
        >
          <div style="height:300px;width:100%;overflow:scroll;">
            <ul class="role_style">
              <li
                v-for="(item,index) in role.permissionInfo "
                :key="index"
              >
                <span class="role-parent">{{item.module}}</span>：<span class="role-child">{{item.permissionItem}}</span>
              </li>
            </ul>
          </div>

        </el-dialog>

        <div class="equipment-data">
          <div class="top">
            <h5>设备数据</h5>
            <i
              style='font-size:14px'
              class='iconfont'
              @click="reload"
            >&#xe614;</i>
          </div>
          <ul class="case">
            <li title="设备总数">
              <p style="color:#409eff" v-if="deviceData.AllDevice>0">{{deviceData.AllDevice}}</p>
              <p style="color:#dde2eb" v-else>0</p>
              <p>设备总数</p>
            </li>
            <li title="正常运行">
              <p style="color:#67c23a" v-if="deviceData.normal>0">{{deviceData.normal}}</p>
              <p style="color:#dde2eb" v-else>0</p>
              
              <p>正常运行</p>
            </li>
            <li title="设备故障">
              <p style="color:#f56c6c" v-if="deviceData.fault>0">{{deviceData.fault}}</p>
              <p style="color:#dde2eb" v-else>0</p>
              <p>设备故障</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="quick-entry">
        <div class="top">
          <h5>快捷入口</h5>
          <span class="addIcon">
            <i
              style='font-size:16px'
              class='iconfont'
            >&#xe62f;</i>
            <i
              style='font-size:16px'
              class='iconfont'
            >&#xe6b4;</i>
          </span>
        </div>
        <ul class="bottom">
          <li
            v-for="(item, index) in entryList"
            :key="index"
            :title="item"
            @click="turnurl(index)"
          >{{item}}
          </li>
        </ul>
      </div> -->
      <div class="device-operation-Status">
        <div class="left">
          <h5>设备运行状态</h5>
          <div class="state">
            <el-form label-position='top'>
              <el-form-item label="正常运行">
                <el-progress
                  :percentage="deviceData.normalPer"
                  :stroke-width="10"
                  color="#67c23a"
                ></el-progress>
              </el-form-item>
              <el-form-item label="故障待处理">
                <el-progress
                  :percentage="deviceData.faultPer"
                  :stroke-width="10"
                  color="#f56c6c"
                ></el-progress>
              </el-form-item>
              <el-form-item label="维修中">
                <el-progress
                  :percentage="deviceData.maintenancePer"
                  :stroke-width="10"
                  color="#e6a23c"
                ></el-progress>
              </el-form-item>
              <el-form-item label="关机中">
                <el-progress
                  :percentage="deviceData.showdownPer"
                  :stroke-width="10"
                  color="#939393"
                ></el-progress>
              </el-form-item>
              <el-form-item label="未连接">
                <el-progress
                  :percentage="deviceData.unlinePer"
                  :stroke-width="10"
                  color="#D7D7D7"
                ></el-progress>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <h5>设备数据</h5>
          <ul>
            <li>
              <span>
                <i
                  class="iconfont2 icon-tubiao-zhuzhuangtu"
                  style="color: #409eff;"
                ></i>
              </span>
              <div>
                <p>总数</p>
                <p style="font-size:20px;font-weight:600;">{{deviceData.AllDevice}}</p>
              </div>
            </li>
            <li>
              <span>
                <i
                  class="iconfont2 icon-dengpao"
                  style="color:#e6a23c ;"
                ></i>
              </span>
              <div>
                <p>预警</p>
                <p style="font-size:20px;font-weight:600;" v-if="deviceData.warn>0">{{deviceData.warn}}</p>
                 <p style="color:#dde2eb;font-size:20px;font-weight:600;" v-else>0</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right ">
      <div class="backlog">
        <h5>待办事项</h5>
        <ul>
          <li
            title="故障工单"
            @click="$router.push('/Breakdown')"
          >
            <span>故障工单</span>
            <span v-if="worksList.fault>0">{{worksList.fault}}</span>
            <span style="color:#dde2eb" v-else>0</span>
          </li>
          <li
            title="检修工单"
            @click="$router.push('/TurnaroundPlans')"
          >
            <span>检修工单</span>
            <span v-if="worksList.overhaul>0">{{worksList.overhaul}}</span>
            <span style="color:#dde2eb" v-else>0</span>
          </li>
          <li
            title="保养工单"
            @click="$router.push('/Upkeep')"
          >
            <span>保养工单</span>
            <span v-if="worksList.maintain>0">{{worksList.maintain}}</span>
            <span style="color:#dde2eb" v-else>0</span>
          </li>
        </ul>
      </div>
      <div class="message-notification">
        <div class="top">
          <span style="font-weight: 600;">消息通知</span>
          <span>更多</span>
        </div>
        <ul class="message-details">
          <li
            v-for="(item, index) in massgageData"
            :key="index"
            @click="$router.push('/Message')"
          ><span :title="item.msgTitle">{{item.msgTitle}}</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{item.msgContent}}</span></li>
        </ul>
      </div>
      <div class="frequent-contacts">
        <h5>常用联系人</h5>
        <!-- <ul>
          <li>
            <span>IT服务热线1：</span>
            <span>12230</span>
          </li>
          <li>
            <span>IT服务热线2：</span>
            <span>12345</span>
          </li>
          <li>
            <span>MAIL、ERP后台：</span>
            <span>12630</span>
          </li>
          <li>
            <span>网络组：</span>
            <span>13500</span>
          </li>
          <li>
            <span>桌面维护：</span>
            <span>14790</span>
          </li>
          <li>
            <span>桌面维护：</span>
            <span>12580</span>
          </li>
        </ul> -->
        <div v-html="a_content"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      role: [],
      dialogVisible: false,
      entryList: ["设备管理", "故障管理", "备品备件", "检修计划", "保养计划"],
      userMsg: {},
      //各工单数量
      worksList: {
        maintain: 0,
        fault: 0,
        overhaul: 0
      },
      //设备信息
      deviceData: {
        showdownPer: 0,
        warn: "",
        unlinePer: 0,
        normalPer: 0,
        faultPer: 0,
        maintenancePer: 0,
        AllDevice: 0,
        fault: 0,
        normal: 0,
      },
      //消息
      massgageData: [],
      a_content:'',
    };
  },
  methods: {
    getworksCount() {
      this.Axios(
        {
          url: "/workbench/findWorks",
          type: "get",
          option: {
            enableMsg: false
          }
        },
        this
      ).then(
        result => {
          this.worksList = result.data.data;
        },
        () => {}
      );
    },
    getdeviceData() {
      this.Axios(
        {
          url: "/deviceState/findDeviceDate",
          type: "get",
          params: {
            organizeCode: JSON.parse(localStorage.getItem("user")).organizeCode
          },
          option: {
            enableMsg: false,
            requestTarget: "r"
          }
        },
        this
      ).then(
        result => {
          this.deviceData = result.data.data;
        },
        () => {}
      );
    },
    turnurl(index) {
      switch (index) {
        case 0:
          this.$router.push("/Equipment");
          break;
        case 1:
          this.$router.push("/Breakdown");
          break;
        case 2:
          this.$router.push("/SparePart");
          break;
        case 3:
          this.$router.push("/TurnaroundPlans");
          break;
        case 4:
          this.$router.push("/Upkeep");
          break;
      }
    },
    allNotReadMsg() {
      this.Axios(
        {
          params: {
            page: 1,
            size: 20
          },
          type: "get",
          url: "/message/allNotReadMsg",
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
          option: {
            requestTarget: "m",
            enableMsg: false
          }
        },
        this
      )
        .then(result => {
          this.massgageData = result.data.data.content;
        })
        .catch(err => {});
    },
    //记事本方法
    addNode() {
      let qs = require("qs");
      let data = qs.stringify({
        content: ""
      });
      this.Axios(
        {
          url: "/workbench/addNote",
          type: "post",
          params: data,
          option: {
            enableMsg: false
          }
        },
        this
      ).then(result => {}, () => {});
    },
    deleteNode() {
      let qs = require("qs");
      let data = qs.stringify({
        id: ""
      });
      this.Axios(
        {
          url: "/workbench/addNote",
          type: "post",
          params: data,
          option: {
            enableMsg: false
          }
        },
        this
      ).then(result => {}, () => {});
    },
    updateNode() {
      let qs = require("qs");
      let data = qs.stringify({
        id: "",
        content: ""
      });
      this.Axios(
        {
          url: "/workbench/addNote",
          type: "post",
          params: data,
          option: {
            enableMsg: false
          }
        },
        this
      ).then(result => {}, () => {});
    },
    findNotes() {
      this.Axios(
        {
          url: "/workbench/findNotes",
          type: "get",
          option: {
            enableMsg: false
          }
        },
        this
      ).then(result => {}, () => {});
    },
    getRoleAndPermissionInfo() {
      this.Axios(
        {
          url: "/role/getRoleAndPermissionInfo",
          type: "get",
          option: {
            enableMsg: false
          }
        },
        this
      ).then(
        result => {
          this.role = result.data.data;
        },
        () => {}
      );
    },
    findLinkMan() {
      this.Axios(
        {
          params: {},
          url: "/workbench/findLinkMan",
          type: "get",
          option: {}
        },
        this
      ).then(
        result => {
          this.a_content=result.data.data[0].content
        },
        ({ type, info }) => {}
      );
    }
  },
  created() {
    this.userMsg = JSON.parse(localStorage.getItem("user"));
    // this.$store.commit("tokenStr", localStorage.getItem("token"));
    this.getworksCount();
    this.getdeviceData();
    this.allNotReadMsg();
    this.getRoleAndPermissionInfo();
    this.findLinkMan();
  },
  watch: {}
};
</script>
<style lang="less">
@import url("../../assets/font/font.css");
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.case-style {
  padding: 10px;
  border-radius: 5px;
  border: @border;
  box-shadow: 4px 4px 10px #c0bfbf;
}

.home {
  h5 {
    width: 100px;
    display: inline-block;
  }
  overflow: hidden;
  font-size: 12px;
  .left {
    width: 70%;
    float: left;
    padding: 10px;
    // border: @border;
    .personal-information {
      .role_style {
        width: 100%;
        overflow: scroll;
        padding: 10px;
        li {
          line-height: 24px;
          margin-bottom: 4px;
        }
      }
      .case-style;
      height: 194px;
      overflow: hidden;
      .user-msg {
        float: left;
        .jurisdiction {
          cursor: pointer;
          position: relative;
          top: -18px;
          left: 15px;
        }
        .case {
          padding: 10px;
          overflow: hidden;
          margin-top: 10px;

          .photo {
            width: 90px;
            height: 90px;
            float: left;
            font-size: 0;
            border-radius: 5px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .message {
            float: left;
            width: 130px;
            margin-left: 10px;
            padding: 10px 0;
            p {
              padding: 8px 0;
            }
          }
        }
      }
      .equipment-data {
        .top {
          padding-right: 10px;
          line-height: 16px;
          i {
            float: right;
            display: none;
            cursor: pointer;
            &:hover {
              color: #f56c6c;
            }
          }
          &:hover {
            i {
              display: block;
            }
          }
        }
        .case {
          margin-top: 10px;
          // border: @border;
          overflow: hidden;
          padding: 10px;
          li {
            float: left;
            list-style-type: none;
            width: 32.5%;
            // min-width: 130px;
            background-color: #eeeeee;
            height: 136px;
            padding-top: 35px;
            cursor: pointer;
            p {
              width: 100%;
              line-height: 30px;
              text-align: center;
            }
            p:nth-child(1) {
              font-size: 20px;
              font-weight: 600;
            }
          }
          li:not(:last-child) {
            margin-right: 1%;
          }
        }
      }
    }
    .quick-entry {
      .case-style;
      margin-top: 10px;
      min-height: 160px;
      .top {
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        &:hover {
          .addIcon {
            display: block;
          }
        }
        .addIcon {
          width: 80px;
          float: right;
          display: none;
          i {
            display: inline-block;
            width: 20px;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: #f56c6c;
            }
          }
        }
      }
      .bottom {
        margin-top: 10px;
        overflow: scroll;
        padding: 0 10px;
        li {
          list-style-type: none;
          float: left;
          width: 32.5%;
          text-align: center;
          height: 38px;
          line-height: 38px;
          background-color: #eeeeee;
          margin-bottom: 16px;
          cursor: pointer;
        }
        li:not(:nth-child(3n)) {
          margin-right: 1%;
        }
      }
    }
    .device-operation-Status {
      .case-style;
      margin-top: 10px;
      height: 400px;
      .left {
        width: 65%;
        .state {
          margin-top: 10px;
          border-right: @border;
          padding: 10px;
          .el-form-item__label {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
          }
          .el-progress {
            width: 100%;
          }
          .el-form-item {
            margin-bottom: 10px;
          }
        }
      }
      .right {
        width: 35%;
        padding: 40px 10px 10px;
        ul {
          li {
            list-style-type: none;
            height: 120px;
            line-height: 120px;
            width: 100%;
            overflow: hidden;
            text-align: center;
            i {
              font-size: 40px;
            }
            div {
              display: inline-block;
              margin-left: 30px;
              p {
                text-align: left;
                line-height: 20px;
              }
            }
          }
          li:not(:last-child) {
            border-bottom: @border;
          }
        }
      }
    }
  }
  .right {
    float: left;
    width: 30%;
    padding: 10px 10px 10px 0px;
    overflow: hidden;
    .backlog {
      .case-style;
      height: 194px;
      ul {
        li {
          list-style-type: none;
          width: 100%;
          height: 40px;
          line-height: 40px;
          background-color: #eeeeee;
          margin-top: 10px;
          padding: 0px 30px 0px 10px;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
          span:nth-child(2) {
            float: right;
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
    }
    .message-notification {
      .case-style;
      margin-top: 10px;
      height: 200px;
      .top {
        span:nth-child(2) {
          float: right;
          cursor: pointer;
          &:hover {
            color: @Danger;
          }
        }
      }
      .message-details {
        border: @border;
        height: 156px;
        margin-top: 10px;
        overflow: scroll;
        li {
          list-style-type: none;
          width: 100%;
          padding: 0 10px;
          height: 18px;
          line-height: 18px;
          background-color: #eeeeee;
          margin-top: 4px;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
          span:nth-child(1) {
            margin-right: 9%;
            width: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
          span:nth-child(2) {
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
        }
      }
    }
    .frequent-contacts {
      .case-style;
      height: 190px;
      margin-top: 10px;
      overflow: scroll;
      div {
        margin-top: 10px;
        padding-left:5px;
        line-height: 20px; 
        
        // li {
        //   list-style-type: none;
        //   height: 20px;
        //   line-height: 20px;
        //   padding: 0 10px;
        //   span:nth-child(1) {
        //     margin-right: 10px;
        //   }
        // }
      }
    }
  }
  .el-progress-bar {
    width: 90%;
  }
  .role-parent {
    font-size: 12px;
    display: inline-block;
    text-align: right;
    width: 150px;
  }
  .role-child {
    font-size: 12px;
    display: inline-block;
    width: 495px;
    vertical-align: top;
  }
}
</style>
