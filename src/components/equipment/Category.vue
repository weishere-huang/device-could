<template>
  <div class="category">
    <div style="width:900px;">
      <div class="classify-title">
        <h5 class="classify-name">分类名称</h5>
        <h5 class="remarks">备注</h5>
      </div>
      <div class="classification">
        <el-tree
          :data="organize"
          :props="defaultProps"
          @node-click="handleNodeClick"
          node-key="categoryParentNo"

        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >
            <span class="content">{{ data.categoryName}}
              <span class="addCase" @click.stop>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="添加"
                  placement="top"
                >
                  <el-button
                    type="text"
                    size="mini"
                    @click="dialogVisible=true"
                  >
                    <i style='font-size:16px' class='iconfont'>&#xe62f;</i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="修改"
                  placement="top"
                >
                  <el-button
                    type="text"
                    size="mini"
                    @click="dialogVisible1=true,nodeCname=data.categoryName,nodeCMsg=data.categoryMsg"
                  >
                    <i
                      style='font-size:16px'
                      class='iconfont'
                    >&#xe6b4;</i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除"
                  placement="top"
                >
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => warningdelete(data.id)"

                  >
                    <i
                      style='font-size:16px;color:#F56C6C'
                      class='iconfont'

                    >&#xe66b;</i>
                  </el-button>
                </el-tooltip>
              </span>
            </span>
            <span class="content-remarks">{{data.categoryMsg}}</span>
          </span>
        </el-tree>
        <div style="width:100%;text-align:center">
          <el-button
            size="small"
            style="width:200px;margin:auto"
            @click="dialogVisible3=true"
          >添加初始类别</el-button>
        </div>
        <el-dialog
          title="添加初始类别"
          :visible.sync="dialogVisible3"
          width="30%"
        >
          <el-form
            ref="form"
            label-width="90px"
            style="padding:10px"
            @submit.native.prevent
          >
            <el-form-item label="类别名称：" >
              <el-input
                v-model="addname"
                size="mini"
                maxlength="80"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input
                type="textarea"
                v-model="addmsg"
              ></el-input>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogVisible3 = false">取 消</el-button>
            <el-button
              type="primary"
              @click="addFirst"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible1"
      width="30%"
    >
      <el-form
        ref="form"
        label-width="90px"
        style="padding:10px 30px;"
        @submit.native.prevent
      >
        <el-form-item label="类别名称：">
          <el-input
            v-model="nodeCname"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            v-model="nodeCMsg"
          ></el-input>
        </el-form-item>
        <div style="text-align:center">
          <el-button
            size="small"
            @click="dialogVisible1=false"
          >取消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="checkUpdateForm"
          >确认修改</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        ref="form"
        label-width="90px"
        style="padding:10px 30px;"
        @submit.native.prevent
      >
        <el-form-item label="类别名称：">
          <el-input
            v-model="addname"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            v-model="addmsg"
          ></el-input>
        </el-form-item>
        <div style="text-align:center">
          <el-button
            size="small"
            @click="dialogVisible=false"
          >取消</el-button>
          <el-button
            size="small"
            @click="checkAddForm"
            type="primary"
          >保存</el-button>
        </div>
      </el-form>
    </el-dialog>
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
      organize: [],
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
          url: "/deviceCategory/all",
          option:{
            enableMsg:false
          }
        },
        this
      )
        .then(
          result => {
            this.organize = this.filterArray(result.data.data, 0);
            console.log(result.data);
          },
          ({ type, info }) => {}
        );
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
        .then(
          result => {
            if (result.data.code === 200) {
              this.$message("添加成功");
              this.reload();
            } else {
              this.$message("添加失败,请重新添加");
            }
          },
          ({ type, info }) => {}
        );
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
        .then(
          result => {
            if (result.data.code === 200) {
              this.$message("添加成功");
              this.reload();
            } else {
              this.$message("添加失败,请重新添加");
            }
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
        .then(
          result => {
            if (result.data.code === 200) {
              this.$message("修改成功");
              this.reload();
            } else {
              this.$message("修改失败,请重新尝试");
            }

          },
          ({ type, info }) => {}
        );
      this.nodeCname = "";
      this.nodeCMsg = "";
    },
    deleteCategory(nodeId) {
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
        .then(
          result => {
            if (result.data.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.reload();
            } else {
              this.$message.info("删除失败,请重新尝试");
            }
          },
          ({ type, info }) => {}
        );
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
    },
    checkAddForm(){
      let subok = true;
      if(this.addname === ""){
        subok=false;
      }
      if(subok){
        this.addCategory();
      }else{
        this.$message.warning("请填写类别名称")
      }

    },
    checkUpdateForm(){
      let subok = true;
      if(this.nodeCname === ""){
        subok=false;
      }
      if(subok){
        this.updateCategory();
      }else{
        this.$message.warning("请填写类别名称")
      }

    },
    checkFirstForm(){
      let subok = true;
      if(this.addname === ""){
        subok=false;
      }
      if(subok){
        this.addFirst();
      }else{
        this.$message.warning("请填写类别名称")
      }

    },
  },
  created() {
    this.findAlldeviceClassify();
  }
};
</script>

<style lang="less" >
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;

.category {

  border: @border;
  border-radius: 5px;
  font-size: 12px;
  max-height: 80vh;
  overflow: scroll;
  padding-bottom: 10px;
  .classify-title {
    line-height: 40px;
    overflow: hidden;
    .classify-name {
      float: left;
      width: 40%;
      padding: 0 20px;
      //   border-bottom: 1px solid #dde2eb;
    }
    .remarks {
      float: right;
      width: 400px;
      padding: 0 ;
      //   border-bottom: 1px solid #dde2eb;
    }
  }
  .classification {
    .custom-tree-node {
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .content {
      display: inline-block;
      width: 40%;
      //   border: @border;
      .addCase {
        display: inline-block;
        // display: none;
        opacity: 0;
        margin-left: 40px;
        position: relative;
        z-index: -10;
      }
      &:hover {
        .addCase {
          z-index: 10;
          opacity: 1;
        }
      }
    }
    .content-remarks {
      display: inline-block;
      width: 400px;
      //   border: @border;
      line-height: 28px;
      height: 100%;
      position: absolute;
      right: 0%;
    }
  }
}
</style>
