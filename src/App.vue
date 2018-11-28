<template>
  <div id="app">
      <el-container class="mainWrapper">
        <el-aside class="siderWrapper">
          <el-menu :router=true :default-active="$route.name"
              class="el-menu-vertical-demo"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
              >
            <el-submenu>
              <template slot="title">
                <span slot="title">
                  <img src='./assets/image/chlogo.png'/>
                </span>
                </template>
            </el-submenu>
            <el-submenu index="/Home">
              <template slot="title"><i class="el-icon-message" index="/Home"></i><span slot="title">默认工作台</span></template>
              <el-menu-item index="/Home">默认工作台</el-menu-item>
              <!-- <el-menu-item index="/Home">选项2</el-menu-item>
              <el-menu-item index="/Home">选项3</el-menu-item> -->
            </el-submenu>
            <!-- <router-link to="默认工作台"></router-link> -->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i><span slot="title">数据中心</span></template>
              <el-menu-item index="/Information">数据中心</el-menu-item>
              <el-menu-item index="/Information">选项2</el-menu-item>
              <el-menu-item index="/Information">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">企业管理</span></template>
              <el-menu-item index="/Company">企业管理</el-menu-item>
              <!-- <el-menu-item index="/BusinessDetails">企业详情</el-menu-item> -->
              <!-- <el-menu-item index="/Audit">审核</el-menu-item> -->
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">设备管理</span></template>
              <el-menu-item index="/Equipment">设备列表</el-menu-item>
              <el-menu-item index="/Category">类别管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">运维管理</span></template>
              <el-menu-item index="/Breakdown">设备故障</el-menu-item>
              <el-menu-item index="/TurnaroundPlans">检修计划</el-menu-item>
              <!-- <el-menu-item index="/Operation">选项3</el-menu-item> -->
              <!-- <el-menu-item index="/TurnaroundPlansAdd">检修计划添加/修改</el-menu-item> -->
              <!-- <el-menu-item index="/BreakDetails">故障详情</el-menu-item> -->
              <el-menu-item index="/Upkeep">保养计划</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">组织机构</span></template>
              <el-menu-item index="/Organization">组织机构管理</el-menu-item>
              <!-- <el-menu-item index="/Add">添加</el-menu-item> -->
              <!-- <el-menu-item index="/Organization">选项3</el-menu-item> -->
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">员工管理</span></template>
              <el-menu-item index="/Personnel">员工管理</el-menu-item>
              <!-- <el-menu-item index="/PersnnelAdd">添加</el-menu-item> -->
              <!-- <el-menu-item index="/Modification">修改</el-menu-item> -->
            </el-submenu>
            <!-- <el-submenu index="7">
              <template slot="title"><i class="el-icon-setting"></i>企业用户管理</template>
              <el-menu-item index="/User">企业用户管理</el-menu-item>
              <el-menu-item index="/User">选项2</el-menu-item>
              <el-menu-item index="/User">选项3</el-menu-item>
            </el-submenu> -->
            <el-submenu index="8">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">设备档案</span></template>
              <el-menu-item index="/EquipmentArchives">选项1</el-menu-item>
              <el-menu-item index="/EquipmentArchives">选项2</el-menu-item>
              <el-menu-item index="/EquipmentArchives">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="9">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">工单</span></template>
              <el-menu-item index="/WorkOrder">选项1</el-menu-item>
              <el-menu-item index="/WorkOrder">选项2</el-menu-item>
              <el-menu-item index="/WorkOrder">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="10">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">知识库</span></template>
              <el-menu-item index="/KnowledgeBase">选项1</el-menu-item>
              <el-menu-item index="/KnowledgeBase">选项2</el-menu-item>
              <el-menu-item index="/KnowledgeBase">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="11">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">消息管理</span></template>
              <el-menu-item index="/Message">消息管理</el-menu-item>
              <!-- <el-menu-item index="/MsgDetails">消息详情</el-menu-item> -->
              <!-- <el-menu-item index="/Message">选项3</el-menu-item> -->
            </el-submenu>
            <el-submenu index="12">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">角色管理</span></template>
              <el-menu-item index="/RoleManagement">角色管理</el-menu-item>
              <el-menu-item index="/RoleManagement">选项2</el-menu-item>
              <el-menu-item index="/RoleManagement">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="13">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">系统管理</span></template>
              <el-menu-item index="/System">选项1</el-menu-item>
              <el-menu-item index="/User">用户管理</el-menu-item>
              <el-menu-item index="/System">选项3</el-menu-item>
            </el-submenu>
          </el-menu>
          <div v-on:click="TroggleHandle" class="isCollapse-group">
            <i v-show="isCollapse === true" class="el-icon-caret-right"></i>
            <i v-show="isCollapse === false" class="el-icon-caret-left"></i>
          </div>
        </el-aside>
        <el-container>
          <el-header>
              
                
              <!-- <el-radio-group v-model="isCollapse">
                <i :label="false" class="el-icon-edit"></i>
                <i :label="true" class="el-icon-delete"></i>
              </el-radio-group> -->
          </el-header>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>Footer</el-footer>
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
      isCollapse: false
    };
  },
  methods: {
    TroggleHandle(key, keyPath) {
      // console.log(key, keyPath);
      this.isCollapse = !this.isCollapse;
    },
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
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
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
    margin: 10px auto;
    background-image: url("./assets/image/chlogo.png");
    background-size: cover;
  }
}

.box {
  float: left;
  // width: 90%;
  height: 100%;
}
.el-menu-item {
  height: 40px;
  line-height: 40px;
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
  background-color: #eeeeee;
} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar-track {
  background-color: rgba(250, 245, 245, 0.699);
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} /*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(7, 7, 7, 0.3);
} /*定义滑块 内阴影+圆角*/
 </style>
