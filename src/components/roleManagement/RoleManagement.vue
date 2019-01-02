<template>
  <div class="roleManagement">
    <div class="case">
      <div class="top">
        <el-button size="small" type="primary" @click="dialogFormVisible=true">
          <i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp;添加角色</el-button>
        <el-button size="small" type="primary" @click="getCheckedKeys">
          <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</el-button>
      </div>
      <div class="left">
        <h6>角色列表</h6>
        <ul>
          <li v-for="item in role" :label="item.id" :key="item.id" ><span :label="item.id" @click="getName($event)">{{item.name}}</span> <span :label="item.id" @click="expurgate($event)" class='iconfont icon-shanchu1'></span></li>
        </ul>
      </div>
      <div class="right">
        <div class="roleName">
          <h6>权限分配</h6>
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
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
            >
              <span :title="data.name" class="listcontent">
                {{ data.name }}
              </span >
            </span>
          </el-tree>
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
        <el-button type="primary" @click="roleAdd" size="small">保存</el-button>
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
        data:[],
        power:[],
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
      roleAdd(){
        if (this.form.name === ""){
          this.$message.error("请输入角色名称");
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
              if (this.form.name.indexOf(" ")===-1){
                response.data.data? this.toRoleAdd():this.$message.error("请勿重复添加");
              } else{
                this.$message.error("对不起、不能输入空格");
              }
            },
            ({type, info}) => {

            })

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
            option: {
              enableMsg:false,
              successMsg:"保存成功"
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
            this.role = response.data.data;
            this.PermissionsList();
          },
          ({type, info}) => {

          })
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
          },
          this
        ).then(
          response => {
            this.power = response.data.data.map((item)=>{
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
            let arr = Math.min.apply(null, (response.data.data).map((item)=>{return item.parentCode}));
            this.data = this.filterArray(response.data.data,arr);
          },
          ({type, info}) => {

          })
      },
      getName(event){
        this.roleId = event.target.getAttribute("label");
        this.listPermissionByRoleId(this.roleId);
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
            option: {
              successMsg:"成功删除角色"
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
      $(".left").on('click',"li",function(event) {
        $(this).addClass("fontColor").siblings().removeClass("fontColor");
      });
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
        height: 500px;
        margin-left: 30px;
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
          h6 {
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
  .icon-jia,.icon-jian{
    font-size: 14px !important;
  }
</style>
