<template>

  <div class="organization">
    <div class="content">
      <div class="left">
        <h5>企业名称</h5>
        <!-- <ul>

          <li v-for="(item, index) in name1" :key="index">{{item.name}}
            <span style="letter-spacing:2px;">
              <i class="iconfont icon-jia" @click="ap"></i>
              <i class="iconfont icon-xiewrite18" @click="revise"></i>
              <i class="iconfont icon-shanchu1"></i>
            </span>
            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;" v-for="(item, index) in sss" :key="index">
                {{item.name}}
                <span style="letter-spacing:5px; height:25px;">
                  <i class="iconfont icon-jia" @click="ap"></i>
                  <i class="iconfont icon-xiewrite18"></i>
                  <i class="iconfont icon-shanchu1"></i>
                </span>
              </li>
            </ul>

            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;" v-for="(item, index) in sss" :key="index">
                {{item.menu_name}}
                <span style="letter-spacing:5px; height:25px;">
                  <i class="iconfont icon-jia" @click="ap"></i>
                  <i class="iconfont icon-xiewrite18"></i>
                  <i class="iconfont icon-shanchu1"></i>
                </span>
              </li>
            </ul>

          </li>
        </ul> -->
        <el-tree :data="data" default-expand-all :props="defaultProps" @node-click="handleNodeClick" style="width:400px">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <!-- <span>{{ node }}</span> -->
            <span class="addCase">
              <el-button type="text" size="mini" @click="() => append(data)">
                添加
              </el-button>
              <el-button type="text" size="mini">
                修改
              </el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="center">
        <h5>类型</h5>
        <el-tree :data="data" default-expand-all :props="defaultProps1" @node-click="handleNodeClick" style="width:400px;text-align: center;"></el-tree>
      </div>
      <div class="right" >
        <h5>备注</h5>
        <el-tree :data="data" default-expand-all :props="defaultProps2" @node-click="handleNodeClick" style="width:400px;text-align: center;" ></el-tree>
      </div>
    </div>

    <add v-show="add1"></add>
    <revise v-show="revise1"></revise>
  </div>

</template>
<script>
import add from "./Add";
import revise from "./Revise";
import { eq } from "semver";

export default {
  data() {
    return {
      add1: false,
      revise1: false,
      sss: "",
      xxx: "",
      name1: [1, 2, 3, 4, 5, 6, 7, 8],
      organizeType: [1, 2, 3, 4, 5, 6, 7, 8],
      organizeInfo: [1, 2, 3, 4, 5, 6, 7, 8],
      pushtext: [],
      code: "id",
      data: this.name1,
      defaultProps: {
        children: "children",
        label: "name"
      },
      defaultProps1: {
        children: "children",
        label: "state"
      },
      defaultProps2: {
        children: "children",
        label: "organizeInfo"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    append(data) {
      const newChild = { id: this.data.id++, label: "你好", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    add() {
      //添加组织机构
      let qs = require("qs");
      let data = qs.stringify({
        parentCode: "1000001",
        name: "后端组55555",
        organizeType: 1,
        organizeInfo: "1119"
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
        organizeId: "356",
        organizeType: "1",
        organizeInfo: "14:53",
        organizeName: "工程与技术中心"
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
      let data = qs.stringify({});
      axios
        .delete(this.global.apiSrc + "/delete/327")
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
    allOrganize() {
      let arr = new Array();
      axios
        .get("http://192.168.1.102:8080/organize/allOrganize/321")
        .then(result => {
          console.log(result);
          this.data = this.filterArray(result.data.data, 0);
          console.log(this.data);
          // console.log(this.name1[0].children);

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
    findOneOrganize() {
      //查询单个组织机构
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
    filterArray(data, parent) {
      let vm = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentCode == parent) {
          var obj = data[i];
          temp = this.filterArray(data, data[i].code);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    },
    ap() {
      this.add1 = !this.add1;
    },
    revise() {
      this.revise1 = !this.revise1;
    }
  },
  mounted() {
    let li = document.querySelectorAll(".left li");
    for (let i = 0; i < li.length; i++) {
      li[i].onmouseover = function(event) {
        // console.log("ok");
        document.querySelectorAll(".content li span")[i].style.display =
          "inline-block";
        event.stopPropagation();
      };
      li[i].onmouseout = function(event) {
        document.querySelectorAll(".content li span")[i].style.display = "none";
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
  },
  components: {
    revise,
    add
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
          display: none;
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
.el-tree {
  width: 300px;
  padding: 10px;
  overflow: hidden;
  .addCase {
    float: right;
    display: none;
  }
  .custom-tree-node {
    width: 100%;
    text-align: left;
    &:hover {
      .addCase {
        display: block;
      }
    }
  }
}
.center{
  .custom-tree-node {
    width: 100%;
    text-align: center !important;
  }
}
.right{
  .custom-tree-node {
    width: 100%;
    text-align: center !important;
  }
}
</style>
