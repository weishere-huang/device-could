<template>
  <div id="app">
    <div style="width:100%;margin:auto;">
      <el-container>
        <el-header style="background-color:rgb(238, 241, 246);">
          <div class="logo">

          </div>
        </el-header>
      </el-container>
      <el-container class='box'>
        <el-aside width="180px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1', '1']" :router=true :default-active="$route.name" style="background-color:rgb(238, 241, 246);">
            <el-submenu index="/Home">
              <template slot="title"><i class="el-icon-message"></i>默认工作台</template>
              <!-- <el-menu-item index="/Home">选项1</el-menu-item>
              <el-menu-item index="/Home">选项2</el-menu-item>
              <el-menu-item index="/Home">选项3</el-menu-item> -->
            </el-submenu>
            <el-submenu index="/Information">
              <template slot="title"><i class="el-icon-menu"></i>数据中心</template>
              <el-menu-item index="/Information">选项1</el-menu-item>
              <el-menu-item index="/Information">选项2</el-menu-item>
              <el-menu-item index="/Information">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/Company">
              <template slot="title"><i class="el-icon-setting"></i>企业管理</template>
              <el-menu-item index="/Company">选项1</el-menu-item>
              <el-menu-item index="/Company">选项2</el-menu-item>
              <el-menu-item index="/Company">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/Equipment">
              <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
              <el-menu-item index="/Equipment">选项1</el-menu-item>
              <el-menu-item index="/Equipment">选项2</el-menu-item>
              <el-menu-item index="/Equipment">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/Operation">
              <template slot="title"><i class="el-icon-setting"></i>运维管理</template>
              <el-menu-item index="/Operation">选项1</el-menu-item>
              <el-menu-item index="/TurnaroundPlans">检修计划</el-menu-item>
              <el-menu-item index="/Operation">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/Organization">
              <template slot="title"><i class="el-icon-setting"></i>组织机构</template>
              <el-menu-item index="/Organization">选项1</el-menu-item>
              <el-menu-item index="/Organization">选项2</el-menu-item>
              <el-menu-item index="/Organization">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/Personnel">
              <template slot="title"><i class="el-icon-setting"></i>人员档案</template>
              <el-menu-item index="/Personnel">选项1</el-menu-item>
              <el-menu-item index="/PersnnelAdd">添加</el-menu-item>
              <el-menu-item index="/Personnel">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/User">
              <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
              <el-menu-item index="/User">选项1</el-menu-item>
              <el-menu-item index="/User">选项2</el-menu-item>
              <el-menu-item index="/User">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/EquipmentArchives">
              <template slot="title"><i class="el-icon-setting"></i>设备档案</template>
              <el-menu-item index="/EquipmentArchives">选项1</el-menu-item>
              <el-menu-item index="/EquipmentArchives">选项2</el-menu-item>
              <el-menu-item index="/EquipmentArchives">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/WorkOrder">
              <template slot="title"><i class="el-icon-setting"></i>工单</template>
              <el-menu-item index="/WorkOrder">选项1</el-menu-item>
              <el-menu-item index="/WorkOrder">选项2</el-menu-item>
              <el-menu-item index="/WorkOrder">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/KnowledgeBase">
              <template slot="title"><i class="el-icon-setting"></i>知识库</template>
              <el-menu-item index="/KnowledgeBase">选项1</el-menu-item>
              <el-menu-item index="/KnowledgeBase">选项2</el-menu-item>
              <el-menu-item index="/KnowledgeBase">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/Message">
              <template slot="title"><i class="el-icon-setting"></i>消息管理</template>
              <el-menu-item index="/Message">选项1</el-menu-item>
              <el-menu-item index="/Message">选项2</el-menu-item>
              <el-menu-item index="/Message">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="/System">
              <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
              <el-menu-item index="/System">选项1</el-menu-item>
              <el-menu-item index="/System">选项2</el-menu-item>
              <el-menu-item index="/System">选项3</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- <ul class="nav">
          <router-link to="/Home" tag="li"><i class="el-icon-document"></i>默认工作台</router-link>
          <router-link to="/Information" tag="li"><i class="el-icon-caret-right"></i>数据中心</router-link>
          <router-link to="/Company" tag="li"><i class="el-icon-caret-right"></i>企业管理</router-link>
          <router-link to="/Equipment" tag="li"><i class="el-icon-caret-right"></i>设备管理</router-link>
          <router-link to="/Operation" tag="li"><i class="el-icon-caret-right"></i>运维管理</router-link>
          <router-link to="/Organization" tag="li"><i class="el-icon-caret-right"></i>组织机构</router-link>
          <router-link to="/Personnel" tag="li"><i class="el-icon-caret-right"></i>人员档案</router-link>
          <router-link to="/User" tag="li"><i class="el-icon-caret-right"></i>用户管理</router-link>
          <router-link to="/EquipmentArchives" tag="li"><i class="el-icon-caret-right"></i>设备档案</router-link>
          <router-link to="/WorkOrder" tag="li"><i class="el-icon-caret-right"></i>工单</router-link>
          <router-link to="/KnowledgeBase" tag="li"><i class="el-icon-caret-right"></i>知识库</router-link>
          <router-link to="/Message" tag="li"><i class="el-icon-caret-right"></i>消息管理</router-link>
          <router-link to="/System" tag="li"><i class="el-icon-caret-right"></i>系统管理</router-link>
        </ul> -->
        <!-- </el-aside> -->
      </el-container>
      <router-view />
    </div>

  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      show: true
    };
  }
};
</script>

<style lang="less" >
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  width: 100%;
  margin: auto;
  overflow: hidden;
  .logo {
    width: 200px;
    height: 37px;
    margin-top: 10px;
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
  height: 40px !important;
  line-height: 40px !important;
}
body {
  scrollbar-arrow-color: #f2f2f3; /*上下箭头*/
  scrollbar-track-color: #1589ce; /*底层背景色*/
  scrollbar-face-color: #27aeff; /*滚动条前景色*/
  scrollbar-shadow-color: #1589ce; /*滚动条边线色*/
}
/*chrome滚动条颜色设置*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #b9abab;
} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar-track {
  background-color: rgba(252, 250, 250, 0.699);
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} /*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background-color: @Info;
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} /*定义滑块 内阴影+圆角*/
</style>
