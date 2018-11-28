<template>
  <div class="category">
    <div class="case">
      <div style="float:left;width:500px;">
        <h5>类别名称</h5>
        <el-tree :data="organize" :props="defaultProps" @node-click="handleNodeClick" node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
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
      <div class="remark">
        <h5>备注</h5>
        <el-form ref="form" label-width="90px">
          <el-form-item label="类别名称：">
            <el-input v-model="form.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
let id = 1000;
export default {
  data() {
    return {
      organize: "",
      // data5: this.organize,
      form: {
        name: "",
        desc: ""
      },
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
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
    allOrganize() {
      this.axios
        //axios
        .get(this.global.apiSrc+"/organize/allOrganize")
        // .get("api/organize/allOrganize/321")
        .then(result => {
          this.organize = this.filterArray(result.data.data, 0);
        })
        .catch(err => {
          console.log(err);
          // console.log(this.userName);
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
    findAlldeviceClassify(){
      let qs = require("qs");
      let data = qs.stringify({
      });
      this.axios
        .get(this.global.apiSrc + "/deviceCategory/all", data)
        .then(result => {
          console.log("findAlldeviceClassify");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
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
