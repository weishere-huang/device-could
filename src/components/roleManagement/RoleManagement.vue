<template>
  <div class="roleManagement">
    <div class="case">
      <div class="top">
        <el-button size="small" @click="add">添加</el-button>
        <el-button size="small" @click="update">保存</el-button>
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
              <el-checkbox v-for="item in personnel.systemList" :label="item" :key="item">{{item}}</el-checkbox>
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
        role:"",
        roleName: "",
        roleId:0,
        systemID:"",
        systemKeyInfo:[],
        roleDTO:{
          id:0,
          roleCode:"",
          name:"",
          description:"",
          organizeCode:"",
          organizeName:"",
          gmtCreate:"",
          gmtModified:"",
          state:""
        },
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
            "数备份"],
          systemKey :[],
          isIndeterminate: true
        },
        information: {
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
          systemKey :[],
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
          systemKey :[],
          isIndeterminate: true
        },
        personnel: {
          sShow: true,
          sHide: false,
          checkAll: false,
          checkedSystem: [],
          systemList: [],
          systemKey :[],
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
          systemKey :[],
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
          systemKey :[],
          isIndeterminate: true
        },
      };
    },
    methods: {
      systemCheckAllChange(val) {
        this.list(this.system.systemList,this.system.systemList,this.system.systemKey,1);
        this.system.checkedSystem = val ? this.system.systemList : [];
        this.system.isIndeterminate = false;
      },
      systemCheckedCitiesChange(value) {
        this.list(value,this.system.systemList,this.system.systemKey,1);
        let checkedCount = value.length;
        this.system.checkAll = checkedCount === this.system.systemList.length;
        this.system.isIndeterminate =
          checkedCount > 0 && checkedCount < this.system.systemList.length;
      },
      systemShow() {
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
        this.list(this.information.systemList,this.information.systemList,this.information.systemKey,2);
        this.information.checkedSystem = val ? this.information.systemList : [];
        this.information.isIndeterminate = false;
      },
      informationCheckedCitiesChange(value) {
        this.list(value,this.information.systemList,this.information.systemKey,2);
        let checkedCount = value.length;
        this.information.checkAll =
          checkedCount === this.information.systemList.length;
        this.information.isIndeterminate =
          checkedCount > 0 && checkedCount < this.information.systemList.length;
      },
      informationShow() {
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
        this.list(this.equipment.systemList,this.equipment.systemList,this.equipment.systemKey,3);
        this.equipment.checkedSystem = val ? this.equipment.systemList : [];
        this.equipment.isIndeterminate = false;
      },
      equipmentCheckedCitiesChange(value) {
        this.list(value,this.equipment.systemList,this.equipment.systemKey,3);
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
        this.list(this.personnel.systemList,this.personnel.systemList,this.personnel.systemKey,4);
        this.personnel.checkedSystem = val ? this.personnel.systemList : [];
        this.personnel.isIndeterminate = false;
      },
      personnelCheckedCitiesChange(value) {
        this.list(value,this.personnel.systemList,this.personnel.systemKey,4);
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
        this.list(this.user.systemList,this.user.systemList,this.user.systemKey,5);
        this.user.checkedSystem = val ? this.user.systemList : [];
        this.user.isIndeterminate = false;
      },
      userCheckedCitiesChange(value) {
        this.list(value,this.user.systemList,this.user.systemKey,5);
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
        this.list(this.message.systemList,this.message.systemList,this.message.systemKey,6);
        this.message.checkedSystem = val ? this.message.systemList : [];
        this.message.isIndeterminate = false;
      },
      messageCheckedCitiesChange(value) {
        this.list(value,this.message.systemList,this.message.systemKey,6);
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
      },

      load(){
        this.axios
          .get(this.global.apiSrc+"/role/listAllRole")
          .then(response => {
            this.role = response.data.data;
            // console.log(response.data.data)
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      clickfun(e){
        this.roleName = e.target.textContent;
        this.roleId = e.target.attributes.label;
        this.listPermissionByRoleId(this.roleId.value);
      },
      list(value,toValues,key,number){
        this.systemID = "";
        for(let i in value){
          for (let j in toValues){
            if(value[i] === toValues[j]) {
              if (this.systemID === "") {
                this.systemID += key[j];
              } else {
                this.systemID += "," + key[j];
              }
            }
          }
        }
        switch(number){
          case 1:
            this.systemKeyInfo[0] = this.systemID;
            break;
          case 2:
            this.systemKeyInfo[1] = this.systemID;
            break;
          case 3:
            this.systemKeyInfo[2] = this.systemID;
            break;
          case 4:
            this.systemKeyInfo[3]= this.systemID;
            break;
          case 5:
            this.systemKeyInfo[4] = this.systemID;
            break;
          case 6:
            this.systemKeyInfo[5] = this.systemID;
            break;
          default:
            break;
        }
        console.log(this.systemKeyInfo);
      },
      add(){
        this.systemID = "";
        for(let i = 0;i< this.systemKeyInfo.length;i++){
          if(this.systemID === ""){
            this.systemID = this.systemKeyInfo[i];
          }else{
            this.systemID += ","+this.systemKeyInfo[i];
          }
        }
        // console.log(this.systemID);
        let qs = require("qs");
        let data = qs.stringify({
          id:this.roleId.value,
          name:this.roleName
        });
        this.axios
          .post(this.global.apiSrc+"/role/add",data,{params: {permissionIds:this.systemID}})
          .then(response =>{
            this.load();
            console.log(response)
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      update(){
        this.systemID = "";
        for(let i = 0;i< this.systemKeyInfo.length;i++){
          if(this.systemID === ""){
            this.systemID = this.systemKeyInfo[i];
          }else{
            this.systemID += ","+this.systemKeyInfo[i];
          }
        }
        this.roleDTO.id=this.roleId.value;
        this.roleDTO.name=this.roleName;
        let qs = require("qs");
        let data = qs.stringify({
          id:this.roleId.value,
          name:this.roleName
        });
        console.log(this.roleId.value);
        console.log(this.roleName);
        this.axios
          .put(this.global.apiSrc+"/role/update",data,{params:{
              permissionIds:this.systemID,
              id:this.roleId.value,
              name:this.roleName
            }})
          .then(response =>{
            this.load();
            console.log(response)
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      listPermissionByRoleId(val){
        this.axios
          .get(this.global.apiSrc+"/role/listPermissionByRole",{params: {roleId:val}})
          .then(response =>{
            let arr = new Array();
            let arr1 = new Array();
            let arr2 = new Array();
            let arr3 = new Array();
            let arr4 = new Array();
            let arr5 = new Array();
            for (let i in response.data.data) {
              if (response.data.data[i].parentCode === 1) {
                arr[arr.length] = response.data.data[i].name;
              }
              if (response.data.data[i].parentCode === 2) {
                arr1[arr1.length] = response.data.data[i].name;
              }
              if (response.data.data[i].parentCode === 3) {
                arr2[arr2.length] = response.data.data[i].name;
              }
              if (response.data.data[i].parentCode === 4) {
                arr3[arr3.length] = response.data.data[i].name;
              }
              if (response.data.data[i].parentCode === 5) {
                arr4[arr4.length] = response.data.data[i].name;
              }
              if (response.data.data[i].parentCode === 6) {
                arr5[arr5.length] = response.data.data[i].name;
              }
            }
            this.system.checkedSystem = arr;
            this.information.checkedSystem = arr1;
            this.equipment.checkedSystem = arr2;
            this.personnel.checkedSystem = arr3;
            this.user.checkedSystem = arr4;
            this.message.checkedSystem = arr5;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      PermissionsList(number){
        this.axios
          .get(this.global.apiSrc+"/permission/listAllPermission")
          .then(response =>{
            let arr = new Array();
            let k = new Array();
            for (let i in response.data.data) {
              if(response.data.data[i].parentCode === number){
                arr[arr.length] = response.data.data[i].name;
                k[k.length]= response.data.data[i].id;
                switch(number){
                  case 1:
                    this.system.systemList = arr;
                    this.system.systemKey = k;
                    continue;
                  case 2:
                    this.information.systemList = arr;
                    this.information.systemKey = k;
                    continue;
                  case 3:
                    this.equipment.systemList = arr;
                    this.equipment.systemKey = k;
                    continue;
                  case 4:
                    this.personnel.systemList = arr;
                    this.personnel.systemKey = k;
                    continue;
                  case 5:
                    this.user.systemList = arr;
                    this.user.systemKey = k;
                    continue;
                  case 6:
                    this.message.systemList = arr;
                    this.message.systemKey = k;
                    break;
                  default:
                    break;
                }
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    mounted() {
      $(".left li").click(function() {
        $(this)
          .addClass("fontColor")
          .siblings()
          .removeClass("fontColor");
      });
    },
    created() {
      this.load();
      this.PermissionsList(1);
      this.PermissionsList(2);
      this.PermissionsList(3);
      this.PermissionsList(4);
      this.PermissionsList(5);
      this.PermissionsList(6);
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
