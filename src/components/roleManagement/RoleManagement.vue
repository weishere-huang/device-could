<template>
  <div class="roleManagement">
    <div class="case">
      <div class="top">
        <el-button size="small">添加</el-button>
        <el-button size="small">保存</el-button>
      </div>
      <div class="left">
        <h6>角色列表</h6>
        <ul>
          <li @click="dddd">系统管理员</li>
          <li @click="dddd">数据分析员</li>
          <li @click="dddd">设备管理员</li>
          <li @click="dddd">运维管理员</li>
          <li @click="dddd">企业管理员</li>
          <li @click="dddd">工单管理员</li>
          <li @click="dddd">工单审核专员</li>
          <li @click="dddd">知识库管理员</li>
          <li @click="dddd">消息管理员</li>
        </ul>
      </div>
      <div class="right">
        <div class="roleName">
          <h6>权限分配</h6>
          <label for="">角色名称:</label>
          <el-input type="text" style="width:200px" size="small" v-model="roleName"></el-input>
        </div>
        <div>
          <div class="system">
            <span class="sleft">
              <i class="iconfont icon-jia" @click="systemShow" v-show="system.sShow"></i>
              <i class="iconfont icon-jian" @click="systemHide" v-show="system.sHide"></i>
              系统设置
            </span>
            <span class="sright">
              <el-checkbox :indeterminate="system.isIndeterminate" v-model="system.checkAll" @change="systemCheckAllChange">全选</el-checkbox>
            </span>
          </div>
          <div class="system-slist">
            <el-checkbox-group v-model="system.checkedSystem" @change="systemCheckedCitiesChange">
              <el-checkbox v-for="item in system.systemList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <div class="information">
            <span class="sleft">
              <i class="iconfont icon-jia" @click="informationShow" v-show="information.sShow"></i>
              <i class="iconfont icon-jian" @click="informationHide" v-show="information.sHide"></i>
              数据分析
            </span>
            <span class="sright">
              <el-checkbox :indeterminate="information.isIndeterminate" v-model="information.checkAll" @change="informationCheckAllChange">全选</el-checkbox>
            </span>
          </div>
          <div class="information-slist">
            <el-checkbox-group v-model="information.checkedSystem" @change="informationCheckedCitiesChange">
              <el-checkbox v-for="item in information.systemList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <div class="equipment">
            <span class="sleft">
              <i class="iconfont icon-jia" @click="equipmentShow" v-show="equipment.sShow"></i>
              <i class="iconfont icon-jian" @click="equipmentHide" v-show="equipment.sHide"></i>
              设备管理
            </span>
            <span class="sright">
              <el-checkbox :indeterminate="equipment.isIndeterminate" v-model="equipment.checkAll" @change="equipmentCheckAllChange">全选</el-checkbox>
            </span>
          </div>
          <div class="equipment-slist">
            <el-checkbox-group v-model="equipment.checkedSystem" @change="equipmentCheckedCitiesChange">
              <el-checkbox v-for="item in equipment.systemList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <div class="personnel">
            <span class="sleft">
              <i class="iconfont icon-jia" @click="personnelShow" v-show="personnel.sShow"></i>
              <i class="iconfont icon-jian" @click="personnelHide" v-show="personnel.sHide"></i>
              人员档案管理
            </span>
            <span class="sright">
              <el-checkbox :indeterminate="personnel.isIndeterminate" v-model="personnel.checkAll" @change="personnelCheckAllChange">全选</el-checkbox>
            </span>
          </div>
          <div class="personnel-slist">
            <el-checkbox-group v-model="personnel.checkedSystem" @change="personnelCheckedCitiesChange">
              <el-checkbox v-for="item in equipment.systemList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <div class="user">
            <span class="sleft">
              <i class="iconfont icon-jia" @click="userShow" v-show="user.sShow"></i>
              <i class="iconfont icon-jian" @click="userHide" v-show="user.sHide"></i>
              用户管理
            </span>
            <span class="sright">
              <el-checkbox :indeterminate="user.isIndeterminate" v-model="user.checkAll" @change="userCheckAllChange">全选</el-checkbox>
            </span>
          </div>
          <div class="user-slist">
            <el-checkbox-group v-model="user.checkedSystem" @change="userCheckedCitiesChange">
              <el-checkbox v-for="item in user.systemList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div>
          <div class="message">
            <span class="sleft">
              <i class="iconfont icon-jia" @click="messageShow" v-show="message.sShow"></i>
              <i class="iconfont icon-jian" @click="messageHide" v-show="message.sHide"></i>
              消息管理
            </span>
            <span class="sright">
              <el-checkbox :indeterminate="message.isIndeterminate" v-model="message.checkAll" @change="messageCheckAllChange">全选</el-checkbox>
            </span>
          </div>
          <div class="message-slist">
            <el-checkbox-group v-model="message.checkedSystem" @change="messageCheckedCitiesChange">
              <el-checkbox v-for="item in message.systemList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleName: "",
      system: {
        sShow: true,
        sHide: false,
        checkAll: false,
        checkedSystem: [],
        systemList: [
          "系统参数设置",
          "工作台管理",
          "数据备份",
          "系统模型管理",
          "工作流管理",
          "安全设置",
          "更新缓存",
          "数备份"
        ],
        isIndeterminate: true
      },
      information: {
        sShow: true,
        sHide: false,
        checkAll: false,
        checkedSystem: ["系统参数设置", "工作台管理"],
        systemList: [
          "系统参数设置",
          "工作台管理",
          "数据备份",
          "系统模型管理",
          "工作流管理",
          "安全设置",
          "更新缓存",
          "数备份"
        ],
        isIndeterminate: true
      },
      equipment: {
        sShow: true,
        sHide: false,
        checkAll: false,
        checkedSystem: [],
        systemList: [
          "新增设备信息",
          "修改设备信息",
          "删除设备信息",
          "设备分类管理",
          "设备类别管理",
          "设备绑定人员信息管理"
        ],
        isIndeterminate: true
      },
      personnel: {
        sShow: true,
        sHide: false,
        checkAll: false,
        checkedSystem: ["系统参数设置", "工作台管理"],
        systemList: [
          "系统参数设置",
          "工作台管理",
          "数据备份",
          "系统模型管理",
          "工作流管理",
          "安全设置",
          "更新缓存",
          "数备份"
        ],
        isIndeterminate: true
      },
      user: {
        sShow: true,
        sHide: false,
        checkAll: false,
        checkedSystem: ["系统参数设置", "工作台管理"],
        systemList: [
          "系统参数设置",
          "工作台管理",
          "数据备份",
          "系统模型管理",
          "工作流管理",
          "安全设置",
          "更新缓存",
          "数备份"
        ],
        isIndeterminate: true
      },
      message: {
        sShow: true,
        sHide: false,
        checkAll: false,
        checkedSystem: ["系统参数设置", "工作台管理"],
        systemList: [
          "系统参数设置",
          "工作台管理",
          "数据备份",
          "系统模型管理",
          "工作流管理",
          "安全设置",
          "更新缓存",
          "数备份"
        ],
        isIndeterminate: true
      }
    };
  },

  methods: {
    systemCheckAllChange(val) {
      this.system.checkedSystem = val ? this.system.systemList : [];
      this.system.isIndeterminate = false;
    },
    systemCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.system.checkAll = checkedCount === this.system.systemList.length;
      this.system.isIndeterminate =
        checkedCount > 0 && checkedCount < this.system.systemList.length;
    },
    systemShow() {
      console.log("ok");
      $(".system-slist")[0].style.height = "auto";
      this.system.sShow = !this.system.sShow;
      this.system.sHide = !this.system.sHide;
    },
    systemHide() {
      $(".system-slist")[0].style.height = 0;
      this.system.sShow = !this.system.sShow;
      this.system.sHide = !this.system.sHide;
    },
    informationCheckAllChange(val) {
      this.information.checkedSystem = val ? this.information.systemList : [];
      this.information.isIndeterminate = false;
    },
    informationCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.information.checkAll =
        checkedCount === this.information.systemList.length;
      this.information.isIndeterminate =
        checkedCount > 0 && checkedCount < this.information.systemList.length;
    },
    informationShow() {
      console.log("ok");
      document.querySelectorAll(".information-slist")[0].style.height = "auto";
      this.information.sShow = !this.information.sShow;
      this.information.sHide = !this.information.sHide;
    },
    informationHide() {
      document.querySelectorAll(".information-slist")[0].style.height = 0;
      this.information.sShow = !this.information.sShow;
      this.information.sHide = !this.information.sHide;
    },
    equipmentCheckAllChange(val) {
      this.equipment.checkedSystem = val ? this.equipment.systemList : [];
      this.equipment.isIndeterminate = false;
    },
    equipmentCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.equipment.checkAll =
        checkedCount === this.equipment.systemList.length;
      this.equipment.isIndeterminate =
        checkedCount > 0 && checkedCount < this.equipment.systemList.length;
    },
    equipmentShow() {
      console.log("ok");
      document.querySelectorAll(".equipment-slist")[0].style.height = "auto";
      this.equipment.sShow = !this.equipment.sShow;
      this.equipment.sHide = !this.equipment.sHide;
    },
    equipmentHide() {
      document.querySelectorAll(".equipment-slist")[0].style.height = 0;
      this.equipment.sShow = !this.equipment.sShow;
      this.equipment.sHide = !this.equipment.sHide;
    },
    personnelCheckAllChange(val) {
      this.personnel.checkedSystem = val ? this.personnel.systemList : [];
      this.personnel.isIndeterminate = false;
    },
    personnelCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.personnel.checkAll = personnel === this.personnel.systemList.length;
      this.personnel.isIndeterminate =
        checkedCount > 0 && checkedCount < this.personnel.systemList.length;
    },
    personnelShow() {
      console.log("ok");
      document.querySelectorAll(".personnel-slist")[0].style.height = "auto";
      this.personnel.sShow = !this.personnel.sShow;
      this.personnel.sHide = !this.personnel.sHide;
    },
    personnelHide() {
      document.querySelectorAll(".personnel-slist")[0].style.height = 0;
      this.personnel.sShow = !this.personnel.sShow;
      this.personnel.sHide = !this.personnel.sHide;
    },
    userCheckAllChange(val) {
      this.user.checkedSystem = val ? this.user.systemList : [];
      this.user.isIndeterminate = false;
    },
    userCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.personnel.checkAll = user === this.user.systemList.length;
      this.user.isIndeterminate =
        checkedCount > 0 && checkedCount < this.user.systemList.length;
    },
    userShow() {
      console.log("ok");
      document.querySelectorAll(".user-slist")[0].style.height = "auto";
      this.user.sShow = !this.user.sShow;
      this.user.sHide = !this.user.sHide;
    },
    userHide() {
      document.querySelectorAll(".user-slist")[0].style.height = 0;
      this.user.sShow = !this.user.sShow;
      this.user.sHide = !this.user.sHide;
    },
    messageCheckAllChange(val) {
      this.message.checkedSystem = val ? this.message.systemList : [];
      this.message.isIndeterminate = false;
    },
    messageCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.message.checkAll = message === this.message.systemList.length;
      this.message.isIndeterminate =
        checkedCount > 0 && checkedCount < this.message.systemList.length;
    },
    messageShow() {
      console.log("ok");
      document.querySelectorAll(".message-slist")[0].style.height = "auto";
      this.message.sShow = !this.message.sShow;
      this.message.sHide = !this.message.sHide;
    },
    messageHide() {
      document.querySelectorAll(".message-slist")[0].style.height = 0;
      this.message.sShow = !this.message.sShow;
      this.message.sHide = !this.message.sHide;
    },
    dddd(event) {
      this.roleName = event.currentTarget.innerText;
    }
  },
  mounted() {
    $(".left li").click(function() {
      $(this)
        .addClass("fontColor")
        .siblings()
        .removeClass("fontColor");
    });
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/font/font.css");
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.roleManagement {
  padding-left: 180px;
  font-size: 14px;
  .case {
    padding: 10px;
    position: relative;
    overflow: hidden;
    .top {
      height: 50px;
      line-height: 50px;
      margin-bottom: 20px;
    }
    .left {
      width: 20%;
      border: @border;
      float: left;
      border-radius: 5px;
      padding-top: 20px;
      min-height: 500px;
      h6 {
        display: block;
        position: absolute;
        top: 72px;
        left: 30px;
        background-color: white;
      }
      li {
        list-style-type: none;
        text-align: left;
        padding-left: 20%;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        &:hover {
          color: @blue;
        }
      }
    }
    .right {
      width: 70%;
      border: @border;
      float: left;
      border-radius: 5px;
      min-height: 500px;
      margin-left: 30px;
      padding: 10px;
      .roleName {
        height: 100px;
        line-height: 100px;
        padding-left: 10px;
        position: relative;
        h6 {
          position: absolute;
          top: -60px;
          left: 30px;
        }
      }
      .system {
        height: 30px;
        line-height: 30px;
        background-color: @Info;
        border-radius: 5px;
        padding: 0 10px;
        .sleft {
          i {
            display: inline-block;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            transition: all 1s ease-in-out;
          }
        }
        .sright {
          display: inline-block;
          float: right;
        }
      }
      .system-slist {
        overflow: hidden;
        height: 0;
        .el-checkbox {
          width: 24%;
          padding: 10px 20px 5px;
          margin: 0;
        }
      }
      .information {
        height: 30px;
        line-height: 30px;
        background-color: @Info;
        border-radius: 5px;
        padding: 0 10px;
        .sleft {
          i {
            display: inline-block;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            transition: all 1s ease-in-out;
          }
        }
        .sright {
          display: inline-block;
          float: right;
        }
      }
      .information-slist {
        overflow: hidden;
        height: 0;
        .el-checkbox {
          width: 24%;
          padding: 10px 20px 5px;
          margin: 0;
        }
      }
      .equipment {
        height: 30px;
        line-height: 30px;
        background-color: @Info;
        border-radius: 5px;
        padding: 0 10px;
        .sleft {
          i {
            display: inline-block;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            transition: all 1s ease-in-out;
          }
        }
        .sright {
          display: inline-block;
          float: right;
        }
      }
      .equipment-slist {
        overflow: hidden;
        height: 0;
        .el-checkbox {
          width: 24%;
          padding: 10px 20px 5px;
          margin: 0;
        }
      }
      .personnel {
        height: 30px;
        line-height: 30px;
        background-color: @Info;
        border-radius: 5px;
        padding: 0 10px;
        .sleft {
          i {
            display: inline-block;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            transition: all 1s ease-in-out;
          }
        }
        .sright {
          display: inline-block;
          float: right;
        }
      }
      .personnel-slist {
        overflow: hidden;
        height: 0;
        .el-checkbox {
          width: 24%;
          padding: 10px 20px 5px;
          margin: 0;
        }
      }
      .user {
        height: 30px;
        line-height: 30px;
        background-color: @Info;
        border-radius: 5px;
        padding: 0 10px;
        .sleft {
          i {
            display: inline-block;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            transition: all 1s ease-in-out;
          }
        }
        .sright {
          display: inline-block;
          float: right;
        }
      }
      .user-slist {
        overflow: hidden;
        height: 0;
        .el-checkbox {
          width: 24%;
          padding: 10px 20px 5px;
          margin: 0;
        }
      }
      .message {
        height: 30px;
        line-height: 30px;
        background-color: @Info;
        border-radius: 5px;
        padding: 0 10px;
        .sleft {
          i {
            display: inline-block;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            transition: all 1s ease-in-out;
          }
        }
        .sright {
          display: inline-block;
          float: right;
        }
      }
      .message-slist {
        overflow: hidden;
        height: 0;
        .el-checkbox {
          width: 24%;
          padding: 10px 20px 5px;
          margin: 0;
        }
      }
    }
  }
}
.fontColor {
  color: #409eff;
}
</style>
