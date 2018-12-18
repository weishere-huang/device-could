<template>
  <div class="home">
    <div class="left">
      <div class="personal-information">
        <div class="user-msg">
          <span>个人信息</span>
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
        </div>
        <div class="equipment-data">
          <div class="top">
            <span>设备数据</span>
            <i style='font-size:16px' class='iconfont'>&#xe614;</i>
          </div>
          <ul class="case">
            <li title="设备总数">
              <p style="color:#409eff">100</p>
              <p>设备总数</p>
            </li>
            <li title="正常运行">
              <p style="color:#67c23a">100</p>
              <p>正常运行</p>
            </li>
            <li title="设备故障">
              <p style="color:#f56c6c">100</p>
              <p>设备故障</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="quick-entry">
        <div class="top">
          <span>快捷入口</span>
          <span class="addIcon">
            <i style='font-size:16px' class='iconfont'>&#xe62f;</i>
            <i style='font-size:16px' class='iconfont'>&#xe6b4;</i>
          </span>
        </div>
        <ul class="bottom">
          <li
            v-for="(item, index) in entryList"
            :key="index"
            :title="item"
          >{{item}}</li>
        </ul>
      </div>
      <div class="device-operation-Status">
        <div class="left">
          <span>设备运行状态</span>
          <div class="state">
            <el-form label-position='top'>
              <el-form-item label="正常运行">
                <el-progress
                  :percentage="70"
                  :stroke-width="10"
                  color="#67c23a"
                ></el-progress>
              </el-form-item>
              <el-form-item label="故障待处理">
                <el-progress
                  :percentage="70"
                  :stroke-width="10"
                  color="#f56c6c"
                ></el-progress>
              </el-form-item>
              <el-form-item label="维修中">
                <el-progress
                  :percentage="70"
                  :stroke-width="10"
                  color="#e6a23c"
                ></el-progress>
              </el-form-item>
              <el-form-item label="关机中">
                <el-progress
                  :percentage="70"
                  :stroke-width="10"
                  color="#939393"
                ></el-progress>
              </el-form-item>
              <el-form-item label="未连接">
                <el-progress
                  :percentage="70"
                  :stroke-width="10"
                  color="#D7D7D7"
                ></el-progress>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <h4>设备数据</h4>
          <ul>
            <li>
              <span>
                <i
                  class="iconfont icon-tubiao-zhuzhuangtu"
                  style="color: #409eff;"
                ></i>
              </span>
              <div>
                <p>总数</p>
                <p style="font-size:20px;font-weight:600;">100台</p>
              </div>
            </li>
            <li>
              <span>
                <i
                  class="iconfont icon-dengpao"
                  style="color:#e6a23c ;"
                ></i>
              </span>
              <div>
                <p>预警</p>
                <p style="font-size:20px;font-weight:600;">100台</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="backlog">
        <span>待办事项</span>
        <ul>
          <li title="故障工单">
            <span>故障工单</span>
            <span>0</span>
          </li>
          <li title="检修工单">
            <span>检修工单</span>
            <span>0</span>
          </li>
          <li title="保养工单">
            <span>保养工单</span>
            <span>0</span>
          </li>
        </ul>
      </div>
      <div class="message-notification">
        <div class="top">
          <span>消息通知</span>
          <span>更多</span>
        </div>
        <ul class="message-details">
          <li
            v-for="(item, index) in 10000"
            :key="index"
          ><span>11</span><span>{{item}}</span></li>
        </ul>
      </div>
      <div class="frequent-contacts">
        <span>常用联系人</span>
        <ul>
          <li>
            <span>IT服务热线1：</span>
            <span>11111</span>
          </li>
          <li>
            <span>IT服务热线2：</span>
            <span>11111</span>
          </li>
          <li>
            <span>MAIL、ERP后台：</span>
            <span>11111</span>
          </li>
          <li>
            <span>网络组：</span>
            <span>11111</span>
          </li>
          <li>
            <span>桌面维护：</span>
            <span>11111</span>
          </li>
          <li>
            <span>桌面维护：</span>
            <span>11111</span>
          </li>
          <li>
            <span>IT服务QQ群：</span>
            <span>11111</span>
          </li>
          <li>
            <span>投诉电话：</span>
            <span>11111</span>
          </li>
          <li>
            <span>技术支持：</span>
            <span>11111</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      entryList: ["设备管理", "故障管理", "备品备件", "检修计划", "保养计划"],
      userMsg:{
        
      }
    };
  },
  methods: {},
  created() {
    this.userMsg=JSON.parse(sessionStorage.getItem("user"))
    console.log(this.userMsg.name);
  }
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
  overflow: hidden;
  font-size: 12px;
  .left {
    width: 70%;
    float: left;
    padding: 10px;
    // border: @border;
    .personal-information {
      .case-style;
      height: 194px;
      overflow: hidden;
      .user-msg {
        float: left;
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
          &:hover{
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
      height: 300px;
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
        height: 256px;
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
          &:hover{
            color: #409eff;
          }
          span:nth-child(1) {
            margin-right: 16px;
          }
        }
      }
    }
    .frequent-contacts {
      .case-style;
      height: 270px;
      margin-top: 10px;
      ul{
        margin-top:10px; 
        li{
          list-style-type: none;
          height: 20px;
          line-height: 20px;
          padding: 0 10px;
          span:nth-child(1){
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
