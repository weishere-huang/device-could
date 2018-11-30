<template>
  <div class="organization">
    <div class="content">
      <div class="left">
        <h5>企业名称</h5>
        <div style="float:right;">
          <h5>备注</h5>
          <h5>类别</h5>
        </div>
        <el-tree
          :data="data"
          default-expand-all
          :props="defaultProps"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >
            <span class="listcontent">{{ data.name }}
              <span class="addCase">
                <el-button
                  type="text"
                  size="mini"
                  @click="toAdd"
                >
                  添加
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="toRevise"
                >
                  修改
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="orgdelete"
                >
                  删除
                </el-button>
              </span>
            </span>
            <span class="state">{{ data.organizeType }}</span>
            <span class="organizeInfo">{{ data.organizeInfo }}</span>
          </span>
        </el-tree>
      </div>
    </div>

    <add v-show="addShow" v-on:addHide="addHide" :nodedata="nodedata"></add>
    <revise v-show="reviseShow" v-on:reviseHide="reviseHide" :chengedata="chengedata"></revise>
  </div>

</template>
<script>
  import add from "./Add";
  import revise from "./Revise";
  import {eq} from "semver";

  export default {
    data() {
      return {
        addShow: false,
        reviseShow: false,
        name1: [1, 2, 3, 4, 5, 6, 7, 8],
        organizeType: [1, 2, 3, 4, 5, 6, 7, 8],
        organizeInfo: [1, 2, 3, 4, 5, 6, 7, 8],
        pushtext: [],
        code: "id",
        data: "",
        defaultProps: {
          children: "children",
          label: "name"
        },
        //当前节点数据
        nodedata: "",
        //xiugai jiedian
        chengedata: "",
        //当前节点ID
        orgID: ""
      };
    },
    methods: {
      reviseHide(params) {
        this.reviseShow = params
      },
      toRevise() {
        this.reviseShow = true;
        console.log(this.chengedata);
      },
      addHide(params) {
        this.addShow = params;
      },
      toAdd() {
        this.addShow = true
      },
      handleNodeClick(data) {
        console.log(data);
        this.nodedata = data;
        // console.log( this.nodedata);
        this.chengedata = data;
        this.orgID = data.id;
      },
      //添加组织结构
      // append(data) {
      //   const newChild = { id: id++, label: "text", children: [] };
      //   if (!data.children) {
      //     this.$set(data, "children", []);
      //   }
      //   data.children.push(newChild);
      // },
      //删除组织机构
      // remove(node, data) {
      //   const parent = node.parent;
      //   const children = parent.data.children || parent.data;
      //   const index = children.findIndex(d => d.id === data.id);
      //   children.splice(index, 1);
      //   this.delete();
      // },
      orgdelete() {
        //删除组织机构
        let qs = require("qs");
        let data = qs.stringify({
          organizeId: this.orgID
        });
        console.log("delete" + this.orgID);
        this.axios
          .post(this.global.apiSrc + "/organize/delete/"+this.orgID,data)
          .then(result => {
            if (result.data.code == 200) {
              alert("删除成功");
              console.log("delete");
              console.log(result.data);
            } else {
              alert("删除失败");
              console.log(result.data);
            }
          })
          .catch(err => {
            console.log(err);
            console.log(this.userName);
          });
      },
      allOrganize() {
        this.axios
          .get(this.global.apiSrc + "/organize/allOrganize")
          .then(result => {
            console.log(result.data);
            for (let i = 0; i < result.data.data.length; i++) {
              if (result.data.data[i].organizeType === 0) {
                result.data.data[i].organizeType = "企业";
              }
              if (result.data.data[i].organizeType === 1) {
                result.data.data[i].organizeType = "公司";
              }
              if (result.data.data[i].organizeType === 2) {
                result.data.data[i].organizeType = "工厂";
              }
              if (result.data.data[i].organizeType === 3) {
                result.data.data[i].organizeType = "部门";
              }
              if (result.data.data[i].organizeType === 4) {
                result.data.data[i].organizeType = "车间";
              }
            }
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
        this.axios
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
        li[i].onmouseover = function (event) {
          // console.log("ok");
          document.querySelectorAll(".content li span")[i].style.display =
            "inline-block";
          event.stopPropagation();
        };
        li[i].onmouseout = function (event) {
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
    // padding-left: 180px;
    add {
      position: absolute;
      top: 50%;
      left: 50%;
    }
    .content {
      padding: 10px;
      overflow: hidden;
      // border: @border;
      .left {
        width: 900px;
        padding: 10px;
        overflow: hidden;
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
          padding-right: 10px;
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
          // display: inline-block;
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
