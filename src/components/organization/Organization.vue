<template>
  <div class="organization">
    <div class="content">
      <div class="left">
        <h5>企业名称</h5>

        <ul>
          <el-tree node-key="id" :default-expanded-keys="[1, 2,3]" :default-checked-keys="[1000]" :data="name" :props="defaultProps" accordion @node-click="handleNodeClick">
          </el-tree>
          <!-- <li v-for="(item, index) in name" :key="index">{{item.menu_name}}

            <span style="letter-spacing:2px;">
              <i class="iconfont icon-jia" @click="ap"></i>
              <i class="iconfont icon-xiewrite18" @click="revise"></i>

              <i class="iconfont icon-shanchu1"></i>
            </span>
            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;" v-for="(item, index) in sss" :key="index">
                {{item}}
                <span style="letter-spacing:5px; height:25px;">

                  <i class="iconfont icon-jia" @click="ap"></i>
                  <i class="iconfont icon-xiewrite18"></i>
                  <i class="iconfont icon-shanchu1"></i>
                </span>
                //如果有三级的话


              </li>
            </ul>
        </li> -->
        </ul>
      </div>
      <div class="center">
        <h5>类型</h5>
        <ul>

          <li v-for="(item, index) in name1" :key="index">{{item}}
            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;text-align:center;padding:0;"></li>

            </ul>
          </li>
        </ul>
      </div>
      <div class="right">
        <h5>备注</h5>
        <ul>

          <li v-for="(item, index) in name1" :key="index">{{item}}
            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;text-align:center;padding:0;"></li>

            </ul>
          </li>
        </ul>
      </div>
    </div>

    <add v-show="add1"></add>
    <revise v-show="revise1"></revise>
  </div>

</template>
<script>

import add from "./Add";
import revise from "./Revise";
export default {
  name: "",
  data() {
    return {
      add1: false,
      revise1: false,
      ddddd: "",
      sss: "",
      name: [1, 2, 3, 4, 5, 6, 7, 8],
      organizeType: [1, 2, 3, 4, 5, 6, 7, 8],
      organizeInfo: [1, 2, 3, 4, 5, 6, 7, 8],
      data: [
        {
          id: "1",
          menu_name: "设置",
          menu_url: "setting",
          parent_id: 0
        },
        {
          id: "1-1",
          menu_name: "权限设置",
          menu_url: "setting.permission",
          parent_id: "1"
        },
        {
          id: "1-1-1",
          menu_name: "用户管理列表",
          menu_url: "setting.permission.user_list",
          parent_id: "1-1"
        },
        {
          id: "1-1-2",
          menu_name: "用户管理新增",
          menu_url: "setting.permission.user_add",
          parent_id: "1-1"
        },
        {
          id: "1-1-3",
          menu_name: "角色管理列表",
          menu_url: "setting.permission.role_list",
          parent_id: "1-1"
        },
        {
          id: "1-2",
          menu_name: "菜单设置",
          menu_url: "setting.menu",
          parent_id: "1"
        },
        {
          id: "1-2-1",
          menu_name: "菜单列表",
          menu_url: "setting.menu.menu_list",
          parent_id: "1-2"
        },
        {
          id: "1-2-2",
          menu_name: "菜单添加",
          menu_url: "setting.menu.menu_add",
          parent_id: "1-2"
        },
        {
          id: "2",
          menu_name: "订单",
          menu_url: "order",
          parent_id: 0
        },
        {
          id: "2-1",
          menu_name: "报单审核",
          menu_url: "order.orderreview",
          parent_id: "2"
        },
        {
          id: "2-2",
          menu_name: "退款管理",
          menu_url: "order.refundmanagement",
          parent_id: "2"
        }
      ],
      defaultProps: {
        children: "children1",
        label: "menu_name"
      }
    };
  },
  computed: {
    // treeData() {
    //   let tree = this.name.filter(father => {
    //     //循环所有项
    //     let branchArr = this.data.filter(child => {
    //       return father.id == child.parent_id; //返回每一项的子级数组
    //     });
    //     if (branchArr.length > 0) {
    //       father.children = branchArr; //如果存在子级，则给父级添加一个children属性，并赋值
    //     }
    //     return father.parent_id == 1; //返回第一层
    //   });
    //   return tree; //返回树形数据
    // }
  },
  methods: {
    add() {
      //添加组织机构
      let qs = require("qs");
      let data = qs.stringify({
        ids: "1,2,3"
      });
      axios
        .post("api/organize/add", data)
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });

    },
    methods: {
      add() {
        //添加组织机构
        let qs = require("qs");
        let data = qs.stringify({
          parentCode: "1000001",
          name: "后端组44444444",
          organizeType: 1,
          organizeInfo: "2:52",
        });
        axios
          .post("api/organize/add", data)
          .then(result => {
            alert("add");
            console.log(result.data);
          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
      update() {
        //修改组织机构
        let qs = require("qs");
        let data = qs.stringify({
          organizeId:"356",
          organizeType:"1",
          organizeInfo:"14:53",
          organizeName:"工程与技术中心"
        });
        axios
          .put("api/organize/update", data)
          .then(result => {
            alert("updata");
            console.log(result.data);

          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
      delete() {
        //删除组织机构
        let qs = require("qs");
        let data = qs.stringify({
        });
        axios
          .delete("api/organize/delete/327")
          .then(result => {
            alert("delete");
            console.log("delete");
            console.log(result.data);

          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
      findOneOrganize() {
        //查询单个组织机构

        axios
          .get("api/organize/findOneOrganize/1")
          .then(result => {
            alert("findone");
            console.log("findone");
            console.log(+result.data);

          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
       
      filterArray(data, parent) {
          let vm = this;
          var tree = [];
          var temp;
    for (var i = 0; i < data.length; i++) {
      if (data[i].parent == parent) {
        var obj = data[i];
        temp = filterArray(data, data[i].id);
        if (temp.length > 0) {
          obj.children = temp;
        }
        tree.push(obj);
      }
    }
    console.log("tree");
    console.log(tree);
    return tree;


  }
      allOrganize() {
        //查询所有组织机构
        let qs = require("qs");
        let data = qs.stringify({
        axios
          .get("api/organize/allOrganize/321",data)
          .then(result => {
            alert("查询所有组织机构")
            console.log(result.data);
            console.log(result.data.data[0].name);
            this.name = result.data.data[0].name;
            this.organizeType = result.data.data[0].organizeType;
            this.organizeInfo = result.data.data[0].organizeInfo;
            this.filterArray(result,1000);
            // "id": 328,
            // "code": "1000001",
            //   "parentCode": "1000",
            //   "enterpriseId": 313,
            //   "name": "工程与技术中心",
            //   "organizeType": 1,
            //   "organizeInfo": "暂无",
            //   "gmtCreate": "2018-11-14T05:46:01.000+0000",
            //   "gmtModified": "2018-11-14T05:46:01.000+0000",
            //   "state": 1
          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
        });

    },
    filterArray(data, parent) {
      let vm = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].parent_id == parent) {
          var obj = data[i];
          temp = this.filterArray(data, data[i].id);
          if (temp.length > 0) {
            obj.children1 = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    },
    render(treeJson) {
      if (!Array.isArray(treeJson) || treeJson.length <= 0) {
        return "";
      }
      var ul = $("<ul>");
      treeJson.forEach(function(item, i) {
        var li = $("<li><span class='treeName'>" + item.name + "</span></li>");
        if (Array.isArray(item.children) && item.children.length > 0) {
          li.append(render(item.children));
        }
        ul.append(li);
      });
      return ul;
    },
    handleNodeClick(data) {
      // console.log(data)
      console.log(this.name);
    }
  },
  mounted() {
    let li = document.querySelectorAll(".left li");
    for (let i = 0; i < li.length; i++) {
      li[i].onmouseover = function(event) {
        // console.log("ok");
        document.querySelectorAll(".content li span")[i].style.opacity = 1;
        event.stopPropagation();
      };
      li[i].onmouseout = function(event) {
        document.querySelectorAll(".content li span")[i].style.opacity = 0;
        event.stopPropagation();
      };
    }
  },
  created() {
    this.allOrganize();
    let arr = new Array();
    let k;
    k = this.filterArray(this.data, "0");
    // console.log(this.name[0].children1);
    // for (let i = 0; i < k.length; i++) {
    //   arr[i] = k[i].menu_name;
    // }
    let z = this.render(k);
    this.ddddd = z;
    console.log(k);
    this.name = k;
    // this.name=arr
    // this.sss=k
  },
  components: {
    add,
    revise

       
     


    },
    mounted() {
      let li = document.querySelectorAll(".left li");
      for (let i = 0; i < li.length; i++) {
        li[i].onmouseover = function (event) {
          // console.log("ok");
          document.querySelectorAll(".content li span")[i].style.opacity = 1;
          event.stopPropagation();
        };
        li[i].onmouseout = function (event) {
          document.querySelectorAll(".content li span")[i].style.opacity = 0;
          event.stopPropagation();
        };
      }
    },
    created() {
      this.allOrganize();
      //this.findOneOrganize();
      //this.delete();
      //this.add();
      //this.update();
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
  .organization {
    padding-left: 180px;
    add {
      position: absolute;
      top: 50%;
      left: 50%;
    }
    .content {
      padding: 10px;
      overflow: hidden;
      h5 {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        border-bottom: @border;
      }
      div:nth-child(1) {
        width: 40%;
      }
      div:nth-child(2) {
        width: 10%;
        border-left: none;
        border-right: none;
      }
      div:nth-child(3) {
        width: 50%;
      }
      div {
        float: left;
        text-align: center;
        border: @border;
        li {
          list-style-type: none;
          border-bottom: 1px solid @Info;
          // height: 30px;
          line-height: 29px;
          overflow: hidden;
          // pointer-events: none;
          ul {
            // pointer-events: none;
            li {
              list-style-type: none;
              line-height: 30px;
              height: 30px;
              padding-left: 40px;
              // pointer-events: none;
            }
          }

          span {
            opacity: 0;
            padding-left: 10px;
            transition: All 0.4s ease-in-out;
            i {
              cursor: pointer;
              display: inline-block;
              height: 29px;

              &:hover {
                transform: scale(1.4);
                color: #67c23a;
              }
            }
          }
          // &:hover {
          //   span {
          //     opacity: 1;
          //     // display: inline-block;
          //     height: 25px;
          //   }
          // }
        }
        li:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
