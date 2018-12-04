<template>
  <div id="app">
      <el-container class="mainWrapper">
        <el-aside class="siderWrapper">
          <div class="logoWrap">
            <img src='./assets/image/logo.png'/>
          </div>
          <el-menu :router=true :default-active="$route.name"
              class="el-menu-vertical-demo"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
              >
            <!-- <el-submenu index="/">
              <template slot="title" class="logoWrap">
                <span slot="title">
                  
                </span>
                </template>
            </el-submenu> -->
          <el-submenu index="/Home">
            <template slot="title">
              <i class="iconfont">&#xe606;</i>
              <span slot="title">默认工作台</span></template>
            <el-menu-item index="/Home">默认工作台</el-menu-item>
          </el-submenu>
          <!-- <router-link to="默认工作台"></router-link> -->
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont">&#xe600;</i>
              <span slot="title">企业管理</span></template>
            <el-menu-item index="/Company">企业管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont">&#xe61c;</i>
              <span slot="title">设备管理</span></template>
              <el-menu-item index="/Equipment">设备列表</el-menu-item>
              <el-menu-item index="/Category">类别管理</el-menu-item>
            </el-submenu>
            <el-submenu index="monit">
            <template slot="title">
              <i class="iconfont">&#xe6a0;</i>
              <span slot="title">设备监控</span></template>
              <el-menu-item index="/Monit">设备实时状态</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="iconfont">&#xe73a;</i>
                <span slot="title">运维管理</span></template>
                <el-menu-item index="/Breakdown">设备故障</el-menu-item>
                <el-menu-item index="/TurnaroundPlans">检修计划</el-menu-item>
                <el-menu-item index="/Upkeep">保养计划</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="iconfont">&#xe62e;</i>
                <span slot="title">组织机构</span></template>
                <el-menu-item index="/Organization">组织机构管理</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="iconfont">&#xe68d;</i>
                <span slot="title">员工管理</span></template>
                <el-menu-item index="/Personnel">员工管理</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="8">
              <template slot="title">
                <i class="iconfont">&#xe62d;</i>
              <span slot="title">设备档案</span></template>
            <el-menu-item index="/EquipmentArchives">选项1</el-menu-item>
            <el-menu-item index="/EquipmentArchives">选项2</el-menu-item>
            <el-menu-item index="/EquipmentArchives">选项3</el-menu-item>
          </el-submenu> -->
          <el-submenu index="9">
            <template slot="title">
              <i class="iconfont">&#xe60b;</i>
              <span slot="title">工单</span></template>
            <el-menu-item index="/WorkOrder">选项1</el-menu-item>
            <el-menu-item index="/WorkOrder">选项2</el-menu-item>
            <el-menu-item index="/WorkOrder">选项3</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="10">
            <template slot="title">
              <i class="iconfont">&#xe602;</i>
              <span slot="title">知识库</span></template>
            <el-menu-item index="/KnowledgeBase">选项1</el-menu-item>
            <el-menu-item index="/KnowledgeBase">选项2</el-menu-item>
            <el-menu-item index="/KnowledgeBase">选项3</el-menu-item>
          </el-submenu> -->
          <el-submenu index="11">
            <template slot="title">
              <i class="iconfont">&#xe601;</i>
              <span slot="title">消息管理</span></template>
            <el-menu-item index="/Message">消息管理</el-menu-item>
          </el-submenu>
          <el-submenu index="12">
            <template slot="title">
              <i class="iconfont">&#xe630;</i>
              <span slot="title">角色管理</span></template>
            <el-menu-item index="/RoleManagement">角色管理</el-menu-item>
          </el-submenu>
          <el-submenu index="13">
            <template slot="title">
              <i class="iconfont">&#xe60a;</i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="/User">用户管理</el-menu-item>
          </el-submenu>
        </el-menu>
        <div
          v-on:click="TroggleHandle"
          class="isCollapse-group"
        >
          <i
            v-show="isCollapse === true"
            class="el-icon-arrow-right"
          ></i>
          <i
            v-show="isCollapse === false"
            class="el-icon-arrow-left"
          ></i>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <el-header style="background-color:#efefef;">
            <div class="stateList">
              <ul>
                <li>&nbsp;欢迎您：管理员</li>
                <li>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="设备状态"
                    placement="bottom-end"
                  >
                    <i class="iconfont">&#xe609;</i>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="我的消息"
                    placement="bottom-end"
                  >
                    <i class="iconfont">&#xe601;</i>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="我的工单"
                    placement="bottom-end"
                  >
                    <i class="iconfont">&#xe61d;</i>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="退出"
                    placement="bottom-end"
                  >
                    <i class="iconfont">&#xe6af;</i>
                  </el-tooltip>
                </li>
              </ul>
            </div>
          </el-header>
        </el-header>
        <el-main class="mainContentWrapper">
          <router-view />
        </el-main>
        <el-footer>长虹智能终端设备生产管理云平台</el-footer>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      show: true,
      isCollapse: false,
      pictLoading: true
    };
  },
  methods: {
    TroggleHandle(key, keyPath) {
      // console.log(key, keyPath);
      this.isCollapse = !this.isCollapse;
      EventBus.$emit("sideBarTroggleHandle", this.isCollapse);
    }
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
};
</script>

 <style lang="less" >
.el-menu-vertical-demo {
  margin-top: 60px !important;
  &:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }
}

@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
* {
  margin: 0;
  padding: 0;
}
.el-header {
  overflow: hidden;
  position: relative;
  font-size: 12px;
}
.stateList {
  position: absolute;
  right: 20px;
  bottom: 0;
  top: 0;
  margin: auto;
  height: 25px;
  i {
    font-size: 16px;
    margin: 0 2px;
    &:hover {
      color: #830404;
      font-weight: bold;
    }
  }
  // border: 1px solid @Info;
  ul {
    li {
      list-style-type: none;
      float: left;
      height: 24px;
      line-height: 24px;
      padding: 0 7px;
      //border-right: 1px solid rgb(182, 179, 179);
      cursor: pointer;
      .el-button--mini {
        padding: 5px 5px;
      }
    }
    li:last-child {
      border-right: none;
    }
  }
}
.el-input__inner {
  padding: 0 5px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  width: 100%;
  margin: auto;
  min-width: 1200px;
  overflow: hidden;
  .logo {
    width: 200px;
    height: 37px;
    margin-top: 10px;
    display: inline-block;
    background-image: url("./assets/image/chlogo.png");
    background-size: cover;
  }
}

.box {
  float: left;
  // width: 90%;
  height: 100%;
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    min-width: 170px;
  }
}
.el-dialog__body {
  padding: 0px !important;
}
.el-tabs__item {
  padding: 0 7.5px;
}
.el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
}
// body {
//   scrollbar-arrow-color: #f2f2f3; /*上下箭头*/
//   scrollbar-track-color: #1589ce; /*底层背景色*/
//   scrollbar-face-color: #27aeff; /*滚动条前景色*/
//   scrollbar-shadow-color: #1589ce; /*滚动条边线色*/
// }
/*chrome滚动条颜色设置*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  //background-color: #eeeeee;
} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar-track {
  background-color: transparent;
  // border-radius: 5px;
  //-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} /*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background-color: #999999;
  border-radius: 3px;
  //-webkit-box-shadow: inset 0 0 6px rgba(7, 7, 7, 0.3);
} /*定义滑块 内阴影+圆角*/
</style>
