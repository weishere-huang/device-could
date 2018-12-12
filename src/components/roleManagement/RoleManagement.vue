<template>
  <div class="roleManagement">
    <div class="case">
      <div class="top">
        <el-button size="small" type="primary" @click="dialogFormVisible=true">添加角色</el-button>
        <el-button size="small" type="primary" @click="update">保存</el-button>
      </div>
      <div class="left">
        <h6>角色列表</h6>
        <ul @click="getName($event)">
          <li v-for="item in role" :label="item.id" :key="item.id" ><span :label="item.id">{{item.name}}</span> <span @click="expurgate" :label="item.id"><i class='iconfont icon-shanchu1'></i></span></li>
        </ul>
      </div>
      <div class="right">
        <div class="roleName">
          <h6>权限分配</h6>

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
        <div v-if="information.systemList!=''">
          <div class="information" >
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
        <div v-if="equipment.systemList!=''">
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
        <div  v-if="personnel.systemList!=''">
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
        <div v-if="user.systemList!=''">
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
        <div v-if="message.systemList!=''">
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
    <el-dialog title="角色添加" :visible.sync="dialogFormVisible" width="40%" :beforeClose="toCancel">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="roleAdd" size="small">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { MessageBox } from 'element-ui';
  export default {
    inject:['reload'],
    data() {
      return {
        form:{
          name:"",
          desc:""
        },
        dialogFormVisible: false,
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
          systemList: [],
          systemKey :[],
          adminKey:[],
          isIndeterminate: true
        },
        information: {
          sShow: true,
          sHide: false,
          checkAll: false,
          checkedSystem: [],
          systemList: [],
          systemKey :[],
          adminKey:[],
          isIndeterminate: true
        },
        equipment: {
          sShow: true,
          sHide: false,
          checkAll: false,
          checkedSystem: [],
          systemList: [],
          systemKey :[],
          adminKey:[],
          isIndeterminate: true
        },
        personnel: {
          sShow: true,
          sHide: false,
          checkAll: false,
          checkedSystem: [],
          systemList: [],
          systemKey :[],
          adminKey:[],
          isIndeterminate: true
        },
        user: {
          sShow: true,
          sHide: false,
          checkAll: false,
          checkedSystem: [],
          systemList: [],
          systemKey :[],
          adminKey:[],
          isIndeterminate: true
        },
        message: {
          sShow: true,
          sHide: false,
          checkAll: false,
          checkedSystem: [],
          systemList: [],
          systemKey :[],
          adminKey:[],
          isIndeterminate: true
        },
      };
    },
    methods: {
      expurgate(event){
        this.$confirm('此操作将删除该角色, 是否继续?', '提示')
          .then(_=>{
            this.deleteRole(event.target.parentNode.attributes.label.textContent);
          })
          .catch(_=>{
            console.log("stop")
          })
      },
      systemCheckAllChange(val) {
        this.adminKey="";
        if(val){
          this.list(this.system.systemList,this.system.systemList,this.system.systemKey,1);
        }else{
          this.list(this.adminKey,this.system.systemList,this.system.systemKey,1);
        }
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
        this.list(this.system.checkedSystem,this.system.systemList,this.system.systemKey,1);
        document.querySelectorAll(".system-slist")[0].style.height = "auto";
        this.system.sShow = !this.system.sShow;
        this.system.sHide = !this.system.sHide;
      },
      systemHide() {
        document.querySelectorAll(".system-slist")[0].style.height = 0;
        this.system.sShow = !this.system.sShow;
        this.system.sHide = !this.system.sHide;
      },

      informationCheckAllChange(val) {
        this.adminKey="";
        if(val){
          this.list(this.information.systemList,this.information.systemList,this.information.systemKey,2);
        }else{
          this.list(this.adminKey,this.information.systemList,this.information.systemKey,2);
        }
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
        this.list(this.information.checkedSystem,this.information.systemList,this.information.systemKey,2);
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
        this.adminKey="";
        if(val){
          this.list(this.equipment.systemList,this.equipment.systemList,this.equipment.systemKey,3);
        }else{
          this.list(this.adminKey,this.equipment.systemList,this.equipment.systemKey,3);
        }
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
        this.list(this.equipment.checkedSystem,this.equipment.systemList,this.equipment.systemKey,3);
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
        this.adminKey="";
        if(val){
          this.list(this.personnel.systemList,this.personnel.systemList,this.personnel.systemKey,4);
        }else{
          this.list(this.adminKey,this.personnel.systemList,this.personnel.systemKey,4);
        }
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
        this.list(this.personnel.checkedSystem,this.personnel.systemList,this.personnel.systemKey,4);
        document.querySelectorAll(".personnel-slist")[0].style.height = "auto";
        this.personnel.sShow = !this.personnel.sShow;
        this.personnel.sHide = !this.personnel.sHide;
      },
      personnelHide() {
        console.log("no");
        document.querySelectorAll(".personnel-slist")[0].style.height = 0;
        this.personnel.sShow = !this.personnel.sShow;
        this.personnel.sHide = !this.personnel.sHide;
      },

      userCheckAllChange(val) {
        this.adminKey="";
        if(val){
          this.list(this.user.systemList,this.user.systemList,this.user.systemKey,5);
        }else{
          this.list(this.adminKey,this.user.systemList,this.user.systemKey,5);
        }
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
        this.list(this.user.checkedSystem,this.user.systemList,this.user.systemKey,5);
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
        this.adminKey="";
        if(val){
          this.list(this.message.systemList,this.message.systemList,this.message.systemKey,6);
        }else{
          this.list(this.adminKey,this.message.systemList,this.message.systemKey,6);
        }
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
        this.list(this.message.checkedSystem,this.message.systemList,this.message.systemKey,6);
        document.querySelectorAll(".message-slist")[0].style.height = "auto";
        this.message.sShow = !this.message.sShow;
        this.message.sHide = !this.message.sHide;
      },
      messageHide() {
        document.querySelectorAll(".message-slist")[0].style.height = 0;
        this.message.sShow = !this.message.sShow;
        this.message.sHide = !this.message.sHide;
      },


      roleAdd(){
        if (this.form.name === ""){
          alert("请输入角色名称");
        }else{
          this.Axios(
            {
              params: {roleName:this.form.name},
              type: "get",
              url: "/role/findOnlyByRoleName",
            },
            this
          ).then(
            response => {
              this.toRoleAdd();
            },
            ({type, info}) => {

            })

        }
      },
      load(){
        this.Axios(
          {
            params: {},
            type: "get",
            url: "/role/listAllRole",
          },
          this
        ).then(
          response => {
            this.role = response.data.data;
          },
          ({type, info}) => {

          })
      },
      list(value,toValues,key,number){
        let toKey = "";
        for(let i in value){
          for (let j in toValues){
            if(value[i] === toValues[j]) {
              if (toKey === "") {
                toKey = key[j];
              } else if(toValues!==""){
                toKey += "," + key[j];
              }
            }
          }
          // console.log(toKey);
        }
        switch(number){
          case 1:
            this.system.adminKey = toKey;
            break;
          case 2:
            this.information.adminKey = toKey;
            break;
          case 3:
            this.equipment.adminKey = toKey;
            break;
          case 4:
            this.personnel.adminKey = toKey;
            break;
          case 5:
            this.user.adminKey = toKey;
            break;
          case 6:
            this.message.adminKey = toKey;
            break;
          default:
            break;
        }
      },
      toRoleAdd(){
        this.dialogFormVisible = false;
        let qs = require("qs");
        let data = qs.stringify({
          name:this.form.name,
          description:this.form.desc
        });
        this.Axios(
          {
            params:data ,
            type: "post",
            url: "/role/add",
          },
          this
        ).then(
          response => {
            this.load();
            this.form.name = "";
            this.form.desc = "";
          },
          ({type, info}) => {

          })
      },
      update(){
        this.systemID = "";
        this.systemID = this.system.adminKey.toString();
        this.systemID == "" ? this.systemID = this.information.adminKey : this.information.adminKey!="" ? this.systemID +=","+this.information.adminKey:"";
        this.systemID == "" ? this.systemID = this.equipment.adminKey : this.equipment.adminKey!="" ? this.systemID +=","+this.equipment.adminKey:"";
        this.systemID == "" ? this.systemID = this.personnel.adminKey : this.personnel.adminKey!="" ? this.systemID +=","+this.personnel.adminKey:"";
        this.systemID == "" ? this.systemID = this.user.adminKey : this.user.adminKey!="" ? this.systemID +=","+this.user.adminKey:"";
        this.systemID == "" ? this.systemID = this.message.adminKey : this.message.adminKey!="" ? this.systemID +=","+this.message.adminKey:"";
        let qs = require("qs");
        let data = qs.stringify({
          id:this.roleId,
          permissionIds:this.systemID
        });
        this.Axios(
          {
            params:data ,
            type: "post",
            url: "/role/update",
          },
          this
        ).then(
          response => {
            // this.load();
            console.log(response);
            this.reload()
          },
          ({type, info}) => {

          })
      },
      listPermissionByRoleId(value){

        this.Axios(
          {
            params:{roleId:value} ,
            type: "get",
            url: "/role/listPermissionByRole",
          },
          this
        ).then(
          response => {
            let adminKey=new Array();
            let adminKey1=new Array();
            let adminKey2=new Array();
            let adminKey3=new Array();
            let adminKey4=new Array();
            let adminKey5=new Array();
            let arr = new Array();
            let arr1 = new Array();
            let arr2 = new Array();
            let arr3 = new Array();
            let arr4 = new Array();
            let arr5 = new Array();
            for (let i in response.data.data) {
              if (response.data.data[i].parentCode === 1) {
                arr[arr.length] = response.data.data[i].name;
                adminKey[adminKey.length] = response.data.data[i].id;
              }
              if (response.data.data[i].parentCode === 2) {
                arr1[arr1.length] = response.data.data[i].name;
                adminKey1[adminKey1.length] = response.data.data[i].id;
              }
              if (response.data.data[i].parentCode === 3) {
                arr2[arr2.length] = response.data.data[i].name;
                adminKey2[adminKey2.length] = response.data.data[i].id;
              }
              if (response.data.data[i].parentCode === 4) {
                arr3[arr3.length] = response.data.data[i].name;
                adminKey3[adminKey3.length] = response.data.data[i].id;
              }
              if (response.data.data[i].parentCode === 5) {
                arr4[arr4.length] = response.data.data[i].name;
                adminKey4[adminKey4.length] = response.data.data[i].id;
              }
              if (response.data.data[i].parentCode === 6) {
                arr5[arr5.length] = response.data.data[i].name;
                adminKey5[adminKey5.length] = response.data.data[i].id;
              }
            }
            this.system.checkedSystem = arr;
            this.information.checkedSystem = arr1;
            this.equipment.checkedSystem = arr2;
            this.personnel.checkedSystem = arr3;
            this.user.checkedSystem = arr4;
            this.message.checkedSystem = arr5;

            this.system.adminKey = adminKey;
            this.information.adminKey = adminKey1;
            this.equipment.adminKey = adminKey2;
            this.personnel.adminKey = adminKey3;
            this.user.adminKey = adminKey4;
            this.message.adminKey = adminKey5;

          },
          ({type, info}) => {
            this.system.checkedSystem=[];
            this.information.checkedSystem=[];
            this.equipment.checkedSystem=[];
            this.personnel.checkedSystem=[];
            this.user.checkedSystem=[];
            this.message.checkedSystem=[];
          })
      },
      toCancel(){
        this.dialogFormVisible = false;
        this.form.name = "";
        this.form.desc = "";
      },
      PermissionsList(number){
        this.Axios(
          {
            params: {},
            type: "get",
            url: "/permission/listAllPermission",
          },
          this
        ).then(
          response => {
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
          },
          ({type, info}) => {

          })
      },
      getName(event){
        this.roleName = event.target.innerHTML;
        for(let i =0;i<this.role.length;i++){
          if(this.roleName  === this.role[i].name){
            this.roleId = this.role[i].id;
            this.listPermissionByRoleId(this.roleId);
          }
        }
      },
      deleteRole(value){
        let qs = require("qs");
        let data = qs.stringify({
          roleId:value
        });
        this.Axios(
          {
            params:data ,
            type: "post",
            url: "/role/delete",
          },
          this
        ).then(
          response => {
            this.load();
          },
          ({type, info}) => {

          })
      },
    },
    mounted() {
      $(".left").on('click',"li",function(event) {
        $(this).addClass("fontColor").siblings().removeClass("fontColor");
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
    // padding-left: 180px;
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
          span:nth-child(2){
            color: #f56c6c;
            display: none;
          }
          &:hover {
            color: @blue;
            span:nth-child(2){
              display: inline-block;
            }
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
          height: 10px;
          padding-left: 10px;
          position: relative;
          h6 {
            position: absolute;
            top: -15px;
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

