<template>
  <div class="breakdown-order">
    <div class="top">
      <el-button size="small">返回</el-button>
      <el-button size="small">提交审核</el-button>
    </div>
    <div class="bottom">
        <div class="left">
            <div class="msg">
                <h5>工单信息</h5>
                <el-form label-width="120px" :model="formLabelAlign">
                <el-form-item label="工单编号：">
                    <span></span>
                </el-form-item>
                <el-form-item label="工单类型：">
                    <span></span>
                </el-form-item>
                <el-form-item label="工单状态：">
                    <span></span>
                </el-form-item>
                <el-form-item label="工单创建时间：">
                    <span></span>
                </el-form-item>
                </el-form>
            </div>
            <div class="breakdown-details">

            </div>
        </div>
        <div class="right">

        </div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            formLabelAlign:{},
        }
    }
}
</script>

<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.breakdown-order {
    font-size: 14px;
  .top {
    padding: 10px;
    border: @border;
    border-radius: 5px;
  }
  .bottom{
      margin-top:10px; 
    //   border: @border;
      width: 350px;
      .msg{
        padding: 10px;
        border: @border;
        border-radius: 5px;
        .el-form-item{
            margin-bottom: 0px;
        }
      }
  }
}
</style>
