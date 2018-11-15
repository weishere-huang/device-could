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
          <li>系统管理员</li>
          <li>数据分析员</li>
          <li>设备管理员</li>
          <li>运维管理员</li>
          <li>企业管理员</li>
          <li>工单管理员</li>
          <li>工单审核专员</li>
          <li>知识库管理员</li>
          <li>消息管理员</li>
        </ul>
      </div>
      <div class="right">
        <div class="roleName">
          <h6>权限分配</h6>
          <label for="">角色名称:</label>
          <el-input type="text" style="width:200px" size="small"></el-input>
        </div>
        <div>
          <div class="system">
            <span class="sleft">
              <i class="iconfont icon-jia" @click="isShow" v-show="system.sShow"></i>
              <i class="iconfont icon-jian" @click="isHide" v-show="system.sHide"></i>
              系统设置
            </span>
            <span class="sright">
              <el-checkbox :indeterminate="system.isIndeterminate" v-model="system.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </span>
          </div>
          <div class="slist">
            <el-checkbox-group v-model="system.checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in system.cities" :label="item" :key="item">{{item}}</el-checkbox>
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
      system: {
        sShow: true,
        sHide: false,
        checkAll: false,
        checkedCities: ["系统参数设置", "工作台管理"],
        cities: [
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
    handleCheckAllChange(val) {
      this.system.checkedCities = val ? this.system.cities : [];
      this.system.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.system.checkAll = checkedCount === this.system.cities.length;
      this.system.isIndeterminate =
        checkedCount > 0 && checkedCount < this.system.cities.length;
    },
    isShow() {
      console.log("ok");
      document.querySelectorAll(".slist")[0].style.height = "auto";
      this.system.sShow = !this.system.sShow;
      this.system.sHide = !this.system.sHide;
    },
    isHide() {
      document.querySelectorAll(".slist")[0].style.height = 0;
      this.system.sShow = !this.system.sShow;
      this.system.sHide = !this.system.sHide;
    }
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
        padding-left: 80px;
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
      .slist {
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
</style>
