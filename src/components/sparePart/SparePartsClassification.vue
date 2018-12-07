<template>
  <div class="spare-parts-classification">
    <div class="classify-title">
      <h5 class="classify-name">分类名称</h5>
      <h5 class="remarks">备注</h5>
    </div>
    <div class="classification">
      <el-tree
        :data="organize"
        :props="defaultProps"
        @node-click="handleNodeClick"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >
          <span class="content">{{ data.categoryName}}
            <span class="addCase">
              <el-button
                type="text"
                size="mini"
                @click="dialogVisible=true"
              >
                添加
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="dialogVisible1=true,nodeCname=data.categoryName,nodeCMsg=data.categoryMsg"
              >
                修改
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => warningdelete(data.id)"
              >
                删除
              </el-button>
            </span>
          </span>
          <span class="content-remarks">11122</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      dialogVisible3: false,
      dialogVisible1: false,
      dialogVisible: false,
      nodeCname: "",
      nodeCMsg: "",
      organize: "",
      // data5: this.organize,
      form: {
        name: "",
        desc: ""
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      nodedata: "",
      addname: "",
      addmsg: ""
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.nodedata = data;
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
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
    filterArray(data, parent) {
      let vm = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].categoryParentNo == parent) {
          var obj = data[i];
          temp = this.filterArray(data, data[i].categoryNo);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    },
    findAlldeviceClassify() {
      this.Axios(
        {
          params: {},
          type: "get",
          url: "/deviceCategory/all"
        },
        this
      )
        // .get(this.global.apiSrc + "/deviceCategory/all", data)
        .then(
          result => {
            this.organize = this.filterArray(result.data.data, 0);
            console.log(this.organize);
            console.log(result.data);
          },
          ({ type, info }) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        );
      // .catch(err => {
      //   console.log(err);
      // });
    },
    addCategory() {
      //添加设备类别
      let qs = require("qs");
      let data = qs.stringify({
        categoryParentName: this.nodedata.categoryName,
        categoryParentNo: this.nodedata.categoryNo,
        categoryName: this.addname,
        categoryMsg: this.addmsg
      });
      this.Axios(
        {
          url: "/deviceCategory/add",
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      )
        //.post(this.global.apiSrc + "/deviceCategory/add", data)
        .then(
          result => {
            if (result.data.code === 200) {
              alert("添加成功");
              location.reload();
            } else {
              alert("添加失败,请重新添加");
            }
            console.log("addCategory");
            console.log(result.data);
          },
          ({ type, info }) => {}
        );
      // .catch(err => {
      //   console.log(err);
      // });
    },
    addFirst() {
      //添加根类
      let qs = require("qs");
      let data = qs.stringify({
        categoryParentName: "根类",
        categoryParentNo: 0,
        categoryName: this.addname,
        categoryMsg: this.addmsg
      });
      this.Axios(
        {
          url: "/deviceCategory/add",
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      )
        //.post(this.global.apiSrc + "/deviceCategory/add", data)
        .then(
          result => {
            if (result.data.code === 200) {
              alert("添加成功");
              location.reload();
            } else {
              alert("添加失败,请重新添加");
            }
            console.log("addCategory");
            console.log(result.data);
          },
          ({ type, info }) => {}
        );
    },
    updateCategory() {
      //修改设备类别
      let qs = require("qs");
      let data = qs.stringify({
        categoryId: this.nodedata.id,
        categoryName: this.nodeCname,
        categoryMsg: this.nodeCMsg
      });
      this.Axios(
        {
          url: "/deviceCategory/update",
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      )
        // .post(this.global.apiSrc + "/deviceCategory/update", data)
        .then(
          result => {
            if (result.data.code === 200) {
              alert("修改成功");
              location.reload();
            } else {
              alert("修改失败,请重新尝试");
            }
            console.log("修改设备类别");
            console.log(result.data);
          },
          ({ type, info }) => {}
        );
      // .catch(err => {
      //   console.log(err);
      // });
      this.nodeCname = "";
      this.nodeCMsg = "";
    },
    deleteCategory(nodeId) {
      console.log(nodeId + "nodeiddd");
      //  删除设备类别
      console.log(this.nodedata.id);
      let qs = require("qs");
      let data = qs.stringify({
        categoryId: nodeId
      });
      this.Axios(
        {
          url: "/deviceCategory/delete/" + nodeId,
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      )
        // .post(this.global.apiSrc + "/deviceCategory/delete/"+this.nodedata.id)
        .then(
          result => {
            if (result.data.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.reload();
            } else {
              alert("删除失败,请重新尝试");
            }
            console.log("删除设备类别");
            console.log(result.data);
          },
          ({ type, info }) => {}
        );
      // .catch(err => {
      //   console.log(err);
      // });
    },
    warningdelete(nodeId) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteCategory(nodeId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.findAlldeviceClassify();
  }
};
</script>

<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.spare-parts-classification {
  border: @border;
  font-size: 12px;
  //   overflow: hidden;
  .classify-title {
    line-height: 40px;
    overflow: hidden;
    .classify-name {
      float: left;
      width: 50%;
      padding: 0 20px;
      border-bottom: 1px solid #dde2eb;
    }
    .remarks {
      float: right;
      width: 50%;
      padding: 0 20px;
      border-bottom: 1px solid #dde2eb;
    }
  }
  .classification {
    .content {
      display: inline-block;
      width: 50%;
      .addCase{
        //   float: right;
      }
    }
    .content-remarks {
      display: inline-block;
      width: 50%;
    }
  }
}
</style>
