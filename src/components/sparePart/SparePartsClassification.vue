<template>
  <div class="spare-parts-classification">
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
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >
            <span class="content">{{ data.name}}
              <span class="addCase">
                <el-button
                  type="text"
                  size="mini"
                  @click="dialogVisible=true"
                >
                  <el-tooltip class="item" effect="dark" content="添加" placement="top">
                    <i style='font-size:16px' class='iconfont'>&#xe62f;</i>
                  </el-tooltip>
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="dialogVisible1=true,nodeCname=data.name,nodeCMsg=data.remarks"
                >
                  <el-tooltip class="item" effect="dark" content="修改" placement="top">
                    <i style='font-size:16px' class='iconfont'>&#xe6b4;</i>
                  </el-tooltip>
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => warningdelete(data.id)"
                  style="color:#F56C6C"
                >
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <i style='font-size:16px' class='iconfont'>&#xe66b;</i>
                </el-tooltip>
                </el-button>
              </span>
            </span>
            <span class="content-remarks">{{data.remarks}}</span>
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
            style="padding:20px 30px 0;"
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
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
            style="text-align:center"
          >
            <el-button @click="dialogVisible3 = false,addname='',addmsg=''" size="small">取 消</el-button>
            <el-button
              type="primary"
              @click="addFirst"
              size="small"
            >确 定</el-button>
          </div>
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
        style="padding:10px;"
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
        <el-form-item>
          <el-button
            size="small"
            @click="dialogVisible1=false"
          >取消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="Supdate"
          >确认修改</el-button>
        </el-form-item>
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
        style="padding:10px;"
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
        <el-form-item>
          <el-button
            size="small"
            @click="dialogVisible=false"
          >取消</el-button>
          <el-button
            size="small"
            @click="Sadd"
            type="primary"
          >保存</el-button>
        </el-form-item>
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
      //修改节点
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
      //添加数据
      addname: "",
      addmsg: ""
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.nodedata = data;
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
    Sgetlist(){
      //获取备品备件分类数据接口1
      this.Axios({
        // option: {
        //   enableMsg: false
        // },
        type: "get",
        url: "/part/list"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            console.log(result.data);
            console.log(result.data.data);
            this.organize=this.filterArray(result.data.data,0);
          },
          ({type, info}) => {
          }
        );

    },
    Sadd(){
      //备品备件分类添加1
      let qs = require("qs");
      let data = qs.stringify({
        parentCode:this.nodedata.code,
        name:this.addname,
        remarks:this.addmsg,
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/add"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.reload();
          },
          ({type, info}) => {
          }
        );
    },
    Supdate(){
      //备品备件分类修改1
      let qs = require("qs");
      let data = qs.stringify({
        id:this.nodedata.id,
        name:this.nodeCname,
        remarks:this.nodeCMsg
      });
      this.Axios({
        params:data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/update"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            if (result.data.code === 200) {
              this.reload();
            } else {
              this.$message("修改失败,请重新尝试");
            }
            console.log("修改备品备件类别");
            console.log(result.data);
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    Sdelete(nodeId){
      //备品备件分类删除1
      let qs = require("qs");
      let data = qs.stringify({
        partId:nodeId
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/delete"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            if (result.data.code === 200) {
              this.reload();
            } else {
              this.$message("删除失败,请重新尝试");
            }
            console.log("删除备品备件类别");
            console.log(result.data);
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );

    },
    warningdelete(nodeId) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.Sdelete(nodeId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addFirst() {
      //添加根类
      let qs = require("qs");
      let data = qs.stringify({
        parentCode: 0,
        name: this.addname,
        remarks: this.addmsg
      });
      this.Axios(
        {
          url: "/part/add",
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
              this.dialogVisible3 = false
              this.reload();
            } else {
              this.$message("添加失败,请重新添加");
            }
            console.log("添加根类");
            console.log(result.data);
          },
          ({ type, info }) => {}
        );
    },
  },
  created() {
    this.Sgetlist();
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
  max-height: 500px;
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
      padding: 0 20px;
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
