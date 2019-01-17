<template>
  <div class="roleManagement">
    <div class="case">
      <div class="top">
        <permission-button
          permCode='role_lookup.role_add'
          banType='disable'
          size="small" type="primary" @click="dialogFormVisible=true">
          <i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;添加角色</permission-button>
        <permission-button
          permCode='role_lookup.role_edit'
          banType='disable'
          size="small" type="primary" @click="getCheckedKeys">
          <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</permission-button>
      </div>
      <div class="bottom-case">
        <div class="left">
          <h5>角色列表</h5>
          <ul>
            <li v-for="(item,index) in role" :label="item.id" :key="item.id" :class="active===index?'fontColor':''"><span :label="item.id" @click="getName($event,index)">{{item.name}}</span>
              <permission-button
                permCode='role_lookup.role_delete'
                banType='hide'
                style="font-size:14px;"
                type="text" @click="expurgate($event)" >
                <i class="iconfont" :label="item.id" style="font-size:14px;">&#xe66b;</i>
              </permission-button>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="roleName">
            <h5>权限分配</h5>
          </div>
          <div class="tree-case">
            <el-tree
              show-checkbox
              :data="data"
              node-key="id"
              :props="defaultProps"
              ref="tree"
              :default-expanded-keys="[1]"
              :default-checked-keys="power"
              :render-after-expand="treeIsOk"
            >
              <span
                class="custom-tree-node"
                slot-scope="{ node, data }"
              >
                <span :title="data.name" class="listcontent">
                  {{ data.name +"　("+data.dataUrl+")"}}
                </span >
              </span>
            </el-tree>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="角色添加" :visible.sync="dialogFormVisible" width="30%" :beforeClose="toCancel">
      <el-form :model="form" style="padding:10px 20px;" label-width="70px">
        <el-form-item label="角色名称" >
          <el-input v-model="form.name" size="small"  autofocus  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" >
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="roleAddValue" size="small">保存</el-button>
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
        active:0,
        data:[],
        power:[],
        treeIsOk:false,
        defaultProps: {
          children: "children",
          label: "name"
        },
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
      };
    },
    methods: {
      getCheckedKeys() {
        this.systemID = "";
        this.systemID =this.$refs.tree.getCheckedKeys().join(',');
        this.roleId == "" ? this.$message.error("请选择角色"):this.update();
      },
      focus: function (el) {
        el.focus();
      },
      expurgate(event){
        this.$confirm('此操作将删除该角色, 是否继续?', '提示')
          .then(_=>{
            this.deleteRole(event.target.getAttribute("label"));
          })
          .catch(_=>{
          })
      },
      roleAddValue(){
        if (this.form.name ===""|| this.form.name == null) this.$message.error("请输入角色名称");
        else if (this.form.name.indexOf(" ")!==-1)this.$message.error("对不起，角色名称中不能包含空格");
        else this.roleAdd();
      },
      roleAdd(){

          this.Axios(
            {
              params: {roleName:this.form.name},
              type: "get",
              url: "/role/findOnlyByRoleName",
              option: {
                enableMsg:false,
              }
            },
            this
          ).then(
            response => {
                response.data.data? this.toRoleAdd():this.$message.error("请勿重复添加");
            },
            ({type, info}) => {

            })
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
            option: {
              successMsg:"新增成功"
            },
          },
          this
        ).then(
          response => {
            this.reload();
            this.form.name = "";
            this.form.desc = "";
          },
          ({type, info}) => {

          })
      },
      load(){
        this.Axios(
          {
            params: {},
            type: "get",
            url: "/role/listAllRole",
            option: {
              enableMsg:false,
            },
          },
          this
        ).then(
          response => {
            let roleName = JSON.parse(localStorage.getItem("user")).roleName;
            this.role = response.data.data;
            this.role.forEach(item=>{
              item.name === roleName?
                this.listPermissionByRoleId(item.id):"";
            });
            this.PermissionsList();
            this.role.map((item,index)=>{
              item.name === roleName ? this.active = index : null;
              this.roleId = item.id;
            })
          },
          ({type, info}) => {})
      },
      update(){
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
            option: {
              successMsg:"保存成功"
            }
          },
          this
        ).then(
          response => {
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
            option: {
              enableMsg:false,
            },
          },
          this
        ).then(
          response => {
            this.power = response.data.data.map(item=>{
              return item.id
            });
            this.$refs.tree.setCheckedKeys(this.power);
          },
          ({type, info}) => {

          })
      },
      cancel(){
        this.form.name = "";
        this.form.desc = "";
      },
      toCancel(){
        this.dialogFormVisible = false;
        this.form.name = "";
        this.form.desc = "";
      },
      filterArray(data, parent) {
        let vm = this;
        var tree = [];
        var temp;
        for (var i = 0; i < data.length; i++) {
          if (data[i].parentCode == parent) {
            var obj = data[i];
            temp = this.filterArray(data, data[i].id);
            if (temp.length > 0) {
              obj.children = temp;
            }
            tree.push(obj);
          }
        }
        return tree;
      },
      PermissionsList(){
        this.Axios(
          {
            params: {},
            type: "get",
            url: "/permission/listAllPermission",
            option: {
              enableMsg:false,
            },
          },
          this
        ).then(
          response => {
            let code = Math.min.apply(null, (response.data.data).map((item)=>{return item.parentCode}));
            this.data = this.filterArray(response.data.data,code);
          },
          ({type, info}) => {

          })
      },
      getName(event,index){
        this.active=index;
        this.roleId = event.target.getAttribute("label");
        this.listPermissionByRoleId(this.roleId);
      },
      deleteRole(value){
        let qs = require("qs");
        let data = qs.stringify({roleId:value});
        this.Axios(
          {
            params:data ,
            type: "post",
            url: "/role/delete",
            option: {
              successMsg:"删除成功"
            },
          },
          this
        ).then(
          response => {
            this.reload();
          },
          ({type, info}) => {

          })
      },
    },
    mounted() {
    },
    created() {
      this.load();
    }
  };
</script>
<style lang="less" >
  @import url("../../assets/font/font.css");
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  @border: 1px solid #dde2eb;
  .roleManagement {
    // padding-left: 180px;
    .el-checkbox__inner{
      border-color: #409EFF !important;
    }
    font-size: 12px;
    .case {
      padding: 10px;
      position: relative;
      overflow: hidden;
      .bottom-case{
        border: @border;
        border-radius: 5px;
        padding: 10px;
        overflow: hidden;
      }
      .top {
        border: @border;
        border-radius: 5px;
        margin-bottom: 10px;
        padding: 10px;
      }
      .left {
        width: 20%;
        border: @border;
        float: left;
        border-radius: 5px;
        padding-top: 20px;
        min-height: 500px;
        h5 {
          display: block;
          position: absolute;
          top: 80px;
          left: 40px;
          background-color: white;
        }
        li {
          list-style-type: none;
          padding-left: 20px;
          height: 26px;
          line-height: 26px;
          margin-bottom: 5px;
          cursor: pointer;
          span{
            display: inline-block;
            height: 100%;
          }
          button{
            color: #f56c6c;
            padding: 0;
            opacity: 0;
          }
          &:hover {
            color: @blue;
            button{
              opacity:1;
            }
          }
        }
      }
      .right {
        width: 70%;
        border: @border;
        float: left;
        border-radius: 5px;
        height: 500px;
        margin-left: 10px;
        padding: 10px;

        .tree-case{
          width: 100%;
          height: 480px;
          overflow: scroll;
          .el-tree{
            letter-spacing: 2px;
          }
        }
        .roleName {
          margin: auto;
          height: 10px;
          padding-left: 10px;
          position: relative;
          h5 {
            position: absolute;
            top: -17px;
            left: 10px;
          }
        }

      }
    }
  }
  .fontColor {
    color: #409eff;
  }
</style>
