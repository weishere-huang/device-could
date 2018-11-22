<template>
    <div class="breakDetails">
        <div class="case">
            <div class="top">
                <el-button size="small">返回</el-button>
                <el-button size="small">提交审核</el-button>
                <el-button size="small">审核进度</el-button>
                <el-button size="small">故障消除</el-button>
            </div>
            <div class="bottom">
                <div class="left">
                    <div class="fault-top">
                        <h5>故障对象</h5>
                        <el-form label-width="100px">
                            <el-form-item label="设备编码：">
                                <el-input v-model="companyName.name" size="mini" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="设备名称：">
                                <el-input v-model="companyName.region" size="mini" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="规格/型号：">
                                <el-input v-model="companyName.type" size="mini" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="设备位号：">
                                <el-input v-model="companyName.type" size="mini" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="安装位置：">
                                <el-input v-model="companyName.type" size="mini" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="所属单位：">
                                <el-input v-model="companyName.type" size="mini" disabled></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="fault-bottom">
                        <h5>故障处理</h5>
                        <el-form label-width="120px">
                            <el-form-item label="故障持续时间：">
                                <span></span>
                            </el-form-item>
                            <el-form-item label="取消人：">
                                <span></span>
                            </el-form-item>
                            <el-form-item label="取消时间：">
                                <span></span>
                            </el-form-item>
                            <el-form-item label="取消原因：" style="border-bottom:1px dashed #dde2eb; height:auto; padding-bottom:5px">
                                <el-input type="textarea" style="width:100%;" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="是否撤销：">
                                <span></span>
                            </el-form-item>
                            <el-form-item label="撤销人：">
                                <span></span>
                            </el-form-item>
                            <el-form-item label="撤销时间：">
                                <span></span>
                            </el-form-item>
                            <el-form-item label="撤销原因：" style="height:auto; padding-bottom:5px">
                                <el-input type="textarea" style="width:100%;" disabled></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <h5>故障信息</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      companyName: ""
    };
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
.breakDetails {
  padding-left: 180px;
  .case {
    width: 90%;
    padding: 10px;
    .top {
      padding: 10px;
    }
    .bottom {
      width: 950px;
      overflow: hidden;
      .left {
        padding: 10px;
        float: left;
        .fault-top {
          width: 350px;
          border: @border;
          padding: 10px;
          border-radius: 5px;
          h5 {
            position: relative;
            top: -20px;
            left: 10px;
          }
          .el-form-item {
            height: 40px;
            margin-bottom: 0px;
          }
        }
        .fault-bottom {
          width: 350px;
          border: @border;
          padding: 10px;
          border-radius: 5px;
          margin-top: 20px;
          h5 {
            position: relative;
            top: -20px;
            left: 10px;
          }
          .el-form-item {
            height: 40px;
            margin-bottom: 0px;
            span {
              display: inline-block;
              width: 80px;
              height: auto;
            }
          }
        }
      }
      .right {
        border: @border;
        padding: 20px;
        border-radius: 5px;
        // display: inline-block;
        float: left;
        min-height: 717px;
        // h5 {
        //   position: relative;
        //   top: -20px;
        //   left: 10px;
        // }
      }
    }
  }
}
</style>
