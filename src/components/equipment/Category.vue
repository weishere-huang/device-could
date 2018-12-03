<template>
  <div class="category">
    <div class="case">
      <div style="float:left;width:500px;">
        <h5>类别名称</h5>
        <el-tree :data="organize" :props="defaultProps" @node-click="handleNodeClick" node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.categoryName}}</span>
            <span class="addCase">
              <el-button type="text" size="mini" @click="dialogVisible=true" >
                添加
              </el-button>
              <el-button type="text" size="mini" >
                修改
              </el-button>
              <el-button type="text" size="mini" @click="deleteCategory">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="remark">
        <h5>备注</h5>
        <el-form ref="form" label-width="90px">
          <el-form-item label="类别名称：">
            <el-input v-model="nodedata.categoryName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="nodedata.categoryMsg"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="updateCategory">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-form ref="form" label-width="90px">
          <el-form-item label="类别名称：">
            <el-input v-model="addname" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="addmsg"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="addCategory">保存</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
let id = 1000;
export default {
  data() {
    return {
      dialogVisible:false,
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
      nodedata:"",
      addname:"",
      addmsg:""
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
    findAlldeviceClassify(){
      let qs = require("qs");
      let data = qs.stringify({
      });
      this.axios
        .get(this.global.apiSrc + "/deviceCategory/all", data)
        .then(result => {
          this.organize= this.filterArray(result.data.data,0);
          console.log(this.organize);
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addCategory(){
      //添加设备类别
      let qs = require("qs");
      let data = qs.stringify({
        categoryParentName:this.nodedata.categoryName,
        categoryParentNo:this.nodedata.categoryNo,
        categoryName:this.addname,
        categoryMsg:this.addmsg
      });
      this.axios
        .post(this.global.apiSrc + "/deviceCategory/add", data)
        .then(result => {
          if(result.data.code === 200){
            alert("添加成功");
            location.reload();
          }else {
            alert("添加失败,请重新添加");
          }
          console.log("addCategory");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateCategory(){
      //修改设备类别
      let qs = require("qs");
      let data = qs.stringify({
        categoryId:this.nodedata.id,
        categoryName:this.nodedata.categoryName,
        categoryMsg:this.nodedata.categoryMsg
      });
      this.axios
        .post(this.global.apiSrc + "/deviceCategory/update", data)
        .then(result => {
          if(result.data.code === 200){
            alert("修改成功");
            location.reload();
          }else{
            alert("修改失败,请重新尝试")
          }
          console.log("修改设备类别");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCategory(){
      //删除设备类别
      let qs = require("qs");
      let data = qs.stringify({
        categoryId:this.nodedata.id,
      });
      this.axios
        .post(this.global.apiSrc + "/deviceCategory/delete/"+this.nodedata.id)
        .then(result => {
          if(result.data.code === 200){
            alert("删除成功");
            location.reload();
          }else{
            alert("删除失败,请重新尝试")
          }
          console.log("删除设备类别");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });}
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
.category {
  // padding-left: 180px;
  .case {
    width: 900px;
    padding: 10px;
    border: @border;
    overflow: hidden;
    font-size: 14px;
    h5 {
      height: 30px;
      line-height: 30px;
      width: 100%;
      text-align: center;
      border-bottom: @border;
    }
    .el-tree {
      width: 100%;
      padding: 10px;
      .addCase {
        float: right;
        display: none;
      }
      .custom-tree-node {
        width: 100%;
        &:hover {
          .addCase {
            display: block;
          }
        }
      }
    }
    .remark {
      float: right;
      width: 300px;
      .el-form {
        padding: 30px 10px;
        .el-form-item__content {
          width: 100%;
        }
      }
    }
  }
}
</style>
