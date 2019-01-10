<template>
  <div
    class="revise"
    v-show="show"
  >
    <div class="revisecase">
      <el-form label-width="100px">
        <el-form-item label="名称：">
          <el-input
            type="text"
            size="small"
            v-model="chengedata.name"
             style="width:273px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select
            style="width:273px"
            v-model="chengedata.organizeType"
            placeholder="请选择"
            size="small"
            disabled
          >
            <el-option
              v-for="item in options"
              :props="aaa"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <textarea
            type="textarea"
            style="width:273px;height:60px;"
            v-model="chengedata.organizeInfo"
          ></textarea>

        </el-form-item>
      </el-form>
      <div style="text-align:center;margin-top:20px">
          <el-button
            size="small"
            @click="reviseHide"
          >取消</el-button>
          <el-button
            size="small"
            @click="beforeUpdate"
            type="primary"
          >保存</el-button>
        </div>
    </div>

  </div>
</template>
<script>
export default {
  inject: ["reload"],
  name: "",
  props: ["chengedata"],
  data() {
    return {
      aaa: {
        value: "chengedata.organizeType",
        label: ""
      },
      show: true,
      // Cnode:chengedata,
      options: [
        {
          value: 1,
          label: "公司"
        },
        {
          value: 2,
          label: "工厂"
        },
        {
          value: 3,
          label: "部门"
        },
        {
          value: 4,
          label: "车间"
        },
        {
          value: 5,
          label: "产线"
        }
      ],
      orgname: "",
      orgtype: "",
      orginfo: ""
    };
  },

  methods: {
    reviseHide() {
      this.$emit("reviseHide", false);
    },
    update() {
      //修改组织机构
      // if (this.chengedata.organizeType == "公司"){
      //   this.chengedata.organizeType = 1;
      // }
      // if (this.chengedata.organizeType == "工厂"){
      //   this.chengedata.organizeType = 2;
      // }
      // if (this.chengedata.organizeType == "部门"){
      //   this.chengedata.organizeType = 3;
      // }
      // if (this.chengedata.organizeType == "车间"){
      //   this.chengedata.organizeType = 4;
      // }

      let qs = require("qs");
      let data = qs.stringify({
        organizeId: this.chengedata.id,
        organizeName: this.chengedata.name,
        organizeType: this.chengedata.organizeType,
        organizeInfo: this.chengedata.organizeInfo
      });

      this.Axios(
        {
          url: "/organize/update",
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      )
        //.post(this.global.apiSrc + "/organize/update", data)
        .then(result => {
          if (result.data.code === 200) {
            // location.reload();
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.reload();
          } else {
            this.$message("修改失败");
          }
        })
        .catch(err => {
        });
    },
    beforeUpdate(){
      if(this.chengedata.name ==="" || this.chengedata.organizeType ===""){
        this.$message.warning("请完整填写信息");
      }else{
        this.update();
      }

    }
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
.revise {
  // width: 100vw;
  // height: 100vh;

  // background-color: rgba(0, 0, 0, 0.103);
  // position: absolute;
  // top: 0%;
  // left: 0%;
  //   margin-left: -150px;
  //   margin-top: -150px;
  .revisecase {
    width: 500px;
    // position: relative;
    // top: 50%;
    // left: 50%;
    // margin-top: -150px;
    // margin-left: -150px;
    // background-color: white;
    padding: 15px;
    // border-radius: 5px;
    // box-shadow: 4px 5px 10px @Info;
    li {
      margin-top: 20px;
      text-align: right;
      list-style-type: none;
      width: 100%;
      padding-right: 50px;
      textarea {
        resize: none;
        border-radius: 5px;
        border-color: #dde2eb;
      }
      .el-input {
        width: 70%;
      }
    }
  }
}
</style>
