<template>
  <div class="organizationManage">
    <div class="content">
      <div class="left">
        <h5 class="componet-name">企业名称</h5>
        <div style="float:right;">
          <h5 class="classify">类别</h5>
          <h5 class="remarks">备注</h5>
        </div>
        <el-tree
          class="organization-tree"
          :data="data"
          default-expand-all
          :props="defaultProps"
          @node-click="handleNodeClick"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >
            <span :title="data.name" class="listcontent">{{ data.name }}
              <span class="addCase" @click.stop>
                <permission-button
                  permCode='organize_lookup.organize_add'
                  banType='disable'
                  type="text"
                  size="mini"
                  @click="toAdd(data)"
                >
                <el-tooltip class="item" effect="dark" content="添加" placement="top">
                  <i style='font-size:16px' class='iconfont'>&#xe62f;</i>
                </el-tooltip>
                </permission-button>
                  <permission-button
                    permCode='organize_lookup.organize_edit'
                    banType='disable'
                    type="text"
                    size="mini"
                    @click="() => toRevise(data.id)"
                    v-if="data.organizeType!='企业'"
                  >
                  <el-tooltip class="item" effect="dark" content="修改" placement="top">
                  <i style='font-size:16px' class='iconfont'>&#xe6b4;</i>
                </el-tooltip>
                </permission-button>
                 <permission-button
                   permCode='organize_lookup.organize_delete'
                   banType='disable'
                   type="text"
                   size="mini"
                   @click="() => warningdelete(data.id)"
                   v-if="data.organizeType!='企业'"
                   style="color:#F56C6C"
                 >
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <i style='font-size:16px' class='iconfont'>&#xe66b;</i>
                </el-tooltip>
                </permission-button>
              </span>
            </span>
            <span class="state">{{ data.organizeType }}</span>
            <span class="organizeInfo" :title="data.organizeInfo">{{ data.organizeInfo }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-dialog
      title="添加"
      :visible.sync="addShow"
      width="500px"
    >
      <add
        v-on:addHide="addHide"
        :nodedata="nodedata"
        :addShow="addShow"
      ></add>
    </el-dialog>
    <el-dialog
      title="修改"
      :visible.sync="reviseShow"
      width="500px"
    >
      <revise
        v-show="reviseShow"
        v-on:reviseHide="reviseHide"
        :chengedata="chengedata"
      ></revise>
    </el-dialog>
  </div>

</template>
<script>
  import add from "./Add";
  import revise from "./Revise";
  import {eq} from "semver";

  export default {
    inject: ["reload"],
    data() {
      return {
        addShow: false,
        reviseShow: false,
        name1: [1, 2, 3, 4, 5, 6, 7, 8],
        organizeType: [1, 2, 3, 4, 5, 6, 7, 8],
        organizeInfo: [1, 2, 3, 4, 5, 6, 7, 8],
        pushtext: [],
        code: "id",
        data: [],
        defaultProps: {
          children: "children",
          label: "name"
        },
        //当前节点数据
        nodedata: "",
        //xiugai jiedian
        chengedata: "",
        //当前节点ID
        orgID: "",
      };
    },
    methods: {
      reviseHide(params) {
        this.reviseShow = params;
      },
      toRevise(id) {
        this.reviseShow = true;
        this.findOneOrganize(id);
      },
      addHide(params) {
        this.addShow = params;
      },
      toAdd(data) {

        this.nodedata = data
        this.addShow = true;
        return false;
      },
      handleNodeClick(data) {
        this.nodedata = data;
        this.chengedata = data;
      },
      orgdelete(nodeId) {
        //删除组织机构
        let qs = require("qs");
        let data = qs.stringify({
          organizeId: nodeId
        });
        this.Axios(
          {
            url: "/organize/delete/" + nodeId,
            params: data,
            type: "post",
            option: {
              enableMsg: false
            }
          },
          this
        )
          .then(
            result => {
              if (result.data.code == 200) {
                this.reload();
              } else {
                this.$message("删除失败");
              }
            },
            ({type, info}) => {
            }
          );
      },
      allOrganize() {
        this.Axios(
          {
            params: {},
            type: "get",
            url: "/organize/allOrganize",
            option: {
              enableMsg: false
            }
          },
          this
        )
          .then(
            result => {
              for (let i = 0; i < result.data.data.length; i++) {
                if (result.data.data[i].organizeType === 0) {
                  result.data.data[i].organizeType = "企业";
                  result.data.data[i].name = "组织机构";
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
                if (result.data.data[i].organizeType === 5) {
                  result.data.data[i].organizeType = "产线";
                }
              }
              let arr = Math.min.apply(null, (result.data.data).map((item) => {
                return item.parentCode
              }));
              this.data = this.filterArray(result.data.data, arr);
            },
            ({type, info}) => {
            }
          );
      },
      findOneOrganize(id) {
        //查询单个组织机构
        this.Axios(
          {
            params: id,
            type: "get",
            url: "/organize/findOneOrganize/" + id,
            option: {
              enableMsg: false
            }
          },
          this
        )
          .then(result => {
            this.chengedata = result.data.data;
          })
          .catch(err => {
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
      },
      warningdelete(nodeId) {
        this.$confirm("该操作将会删除(如设备、员工、计划等)数据，确认删除吗？", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.orgdelete(nodeId);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
    },
    mounted() {
      let li = document.querySelectorAll(".left li");
      for (let i = 0; i < li.length; i++) {
        li[i].onmouseover = function (event) {
          document.querySelectorAll(".content li span")[i].style.display =
            "inline-block";
          event.stopPropagation();
        };
        li[i].onmouseout = function (event) {
          document.querySelectorAll(".content li span")[i].style.display = "none";
          event.stopPropagation();
        };
      }
      let a = JSON.parse(localStorage.getItem("user"))

    },
    created() {
      this.allOrganize();
    },
    components: {
      revise,
      add
    }
  };
</script>
<style lang="less">
  @import url("../../assets/font/font.css");

  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  @border: 1px solid #dde2eb;

  .organizationManage {
    // padding-left: 180px;
    font-size: 12px;
    .el-tree-node__content {
      height: 40px;
      border-top: solid 1px #eee;
    }
    add {
      position: absolute;
      top: 50%;
      left: 50%;
    }
    .content {
      overflow: auto;
      padding: 10px;
      border: @border;
      border-radius: 5px;
      //max-height: 500px;
      .left {
        width: 99%;
        // padding: 10px;
        overflow: hidden;
        //float: left;
        display: inline-block;
        margin-left: 5px;
        // text-align: center;
        // border: @border;

        .componet-name {
          line-height: 30px;
          width: 500px;
          // border: @border;
          padding-left: 30px;
          float: left;
        }
        .remarks {
          width: 400px;
          float: left;
          // border: @border;
          line-height: 30px;
          text-align: left;
        }
        .classify {
          padding-right: 10px;
          width: 100px;
          // border: @border;
          float: left;
          line-height: 30px;
          text-align: center;
        }
      }
    }
    .organization-tree {
      width: 100%;
      overflow: hidden;
      .custom-tree-node {
        width: 100%;
        text-align: right;
        // height: 40px;
        .listcontent {
          // display: inline-block;
          float: left;
          text-align: left;
          width: 400px;
          position: relative;
          .addCase {
            position: relative;
            display: inline-block;
            margin-left: 30px;
            opacity: 0;
            z-index: -10;
          }
          &:hover {
            .addCase {
              opacity: 1;
              z-index: 10;
            }
          }
        }
        .state {
          display: inline-block;
          width: 100px;
          line-height: 28px;
          text-align: center;
          // border: @border;
        }
        .organizeInfo {
          display: inline-block;
          text-align: left;
          width: 400px;
          line-height: 28px;
          // border: @border;
        }

        .state {
        }
      }
    }
  }


</style>
