<template>
  <div class="msgDetails">
    <div class="case">
      <div class="bottom">
        <el-form :model="msgDetail" label-width="80px">
          <el-form-item label="消息标题：">
            <span>{{msgDetail.msgTitle}}</span>
          </el-form-item>
          <el-form-item label="消息内容：">
            <span>{{msgDetail.msgContent}}</span>
          </el-form-item>
          <el-form-item label="发送时间：">
            <span>{{msgDetail.gmtCreate}}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
let apiMsg = "http://192.168.1.104:9880/m";
export default {
  name: "",
  props: ["msgDetail"],
  data() {
    return {
      ishide: false,
    };
  },
  methods: {
    back() {
      this.$emit("detailsIsHide", this.ishide);
    }
  },
  created() {

  }
};
</script>
<style lang="less">
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.msgDetails {
  // width: 100vw;
  // height: 100vh;
  // position: absolute;
  // top: 0;
  // left: 0;
  // background-color: #55565738;
  .case {
    width: 100%;
    font-size: 14px;
    margin: auto;
    padding: 10px 20px; 
    // background-color: white;
    // margin-top: 100px;
    // border-radius: 5px;
    // box-shadow: 4px 4px 10px #a9cef3;
    // .top {
    //   width: 100%;
    //   height: 40px;
    //   line-height: 40px;
    // }
    .bottom {
      .el-form-item__label{
        line-height: 30px;
        
      }
      .el-form-item__content{
        line-height: 30px;
      }
      .el-form-item {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
