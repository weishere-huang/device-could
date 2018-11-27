<template>

  <div class="organization">
    <div class="content">
      <div class="left">
        <h5>企业名称</h5>
        <div style="float:right;">
          <h5>备注</h5>
          <h5>状态</h5>
        </div>

        <el-tree :data="data" default-expand-all :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="listcontent">{{ data.name }}
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
            <span class="state">{{ data.state }}</span>
            <span class="organizeInfo">{{ data.organizeInfo }}</span>
          </span>
        </el-tree>
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
        .post(this.global.apiSrc + "/organize/add", data)
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
        .get(this.global.apiSrc + "/organize/allOrganize")
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
        .put(this.global.apiSrc + "/organize/update", data)
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
    .left {
      width: 900px;
      float: left;
      // text-align: center;
      border: @border;
      h5 {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        // border-bottom: @border;
        display: inline-block;
        width: 300px;
        text-align: center;
      }
      h5:nth-child(2) {
        width: 100px;
        float: left;
      }
      h5:nth-child(3) {
        padding-right:10px; 
        width: 300px;
        // float: right;
      }
      // .el-tree {
      //   width: 100%;
      // }
    }
  }
}
.el-tree {
  width: 900px;
  padding: 10px;
  overflow: hidden;

  .custom-tree-node {
    width: 900px;
    text-align: right;
    // height: 40px;
    .listcontent {
      // display: inline-block;
      float: left;
      text-align: left;
      width: 400px;
      // border: @border;
      .addCase {
        float: right;
        display: none;
      }
      &:hover {
        .addCase {
          display: block;
        }
      }
    }
    .state {
      display: inline-block;
      width: 80px;
      text-align: center;
      // border: @border;
    }
    .organizeInfo {
      display: inline-block;
      text-align: center;
      width: 300px;
      // border: @border;
    }

    .state {
    }
  }
}
</style>
