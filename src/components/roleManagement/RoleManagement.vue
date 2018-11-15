<template>
  <div class="roleManagement">
    <div class="case">
      <div class="top">
        <el-button size="small">添加</el-button>
        <el-button size="small">保存</el-button>
      </div>
      <div class="left">
        <h6>角色列表</h6>
        <ul @click="clickfun($event)">
          <li v-for="item in role" :label="item.id" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="roleName">
          <h6>权限分配</h6>
          <label for="">角色名称:</label>
          <el-input type="text" style="width:200px" size="small" v-model="userName"></el-input>
        </div>
        <div>
          <div class="system">
            <span class="sleft">
              <i class="iconfont icon-jia" @click="isShow(1)" v-show="system.sShow" ></i>
              <i class="iconfont icon-jian" @click="isHide" v-show="system.sHide"></i>
              系统设置
            </span>
            <span class="sright">
              <el-checkbox :indeterminate="system.isIndeterminate" v-model="system.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </span>
          </div>
          <div class="slist">
            <el-checkbox-group v-model="system.checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in system.cities" :label="item.id" :key="item.name">{{item.name}}</el-checkbox>
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
        stateId:"",
        userName:"",
        role:[],
        roleId:"",
        system: {
          sShow: true,
          sHide: false,
          checkAll: false,
          checkedCities: [],
          cities: [],
          isIndeterminate: true
        }
      };
    },
    methods: {
      clickfun(e){
        this.userName = e.target.textContent;
        this.roleId = e.target.attributes.label;
      },
      handleCheckAllChange(val) {
        console.log("handleCheckAllChange:"+val);
        this.system.checkedCities = val ? this.system.cities : [];
        this.system.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log("handleCheckedCitiesChange:"+value);
        let checkedCount = value.length;
        this.system.checkAll = checkedCount === this.system.cities.length;
        this.system.isIndeterminate =
          checkedCount > 0 && checkedCount < this.system.cities.length;
      },
      isShow(e) {
        if(e==1){
          console.log(e);
          console.log("ok");
          document.querySelectorAll(".slist")[0].style.height = "auto";
          this.system.sShow = !this.system.sShow;
          this.system.sHide = !this.system.sHide;
        }else{
          this.permissionsList(e);
        }
      },
      isHide() {
        document.querySelectorAll(".slist")[0].style.height = 0;
        this.system.sShow = !this.system.sShow;
        this.system.sHide = !this.system.sHide;
      },
      permissionsList(number){
        let qs = require("qs");
        let data = qs.stringify({
          page:this.pageIndex,
          size:this.pageSize
        });
        axios
          .get("/api/permission/listAllPermission",data)
          .then(response =>{
            let j = response.data.data.content.length;
            let value1 = [j];
            for (let i = 0; i<j;i++){
              if(response.data.data.content[i].parentCode == number){
                value1[i] = response.data.data.content[i];
                console.log(value1[i].name);
              }else {
                this.system.cities = value1;
                break;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    created() {
      this.permissionsList(1);
      axios
        .get("/api/role/listAllRole")
        .then(response => {
          this.role = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
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
