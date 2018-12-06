<template>
  <div class="spare-parts-warehouse">
    <div class="top">
      <el-button size="small">保存</el-button>
    </div>
    <div class="warehouse">
      <h1>备件入库</h1>
      <div>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="100px"
        >
          <el-form-item label="入库单号：" style="margin-bottom:0px;">
            <el-input
              v-model="formInline.user"
              placeholder=""
              size="small"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="入库日期：" style="margin-bottom:0px;">
            <el-input
              v-model="formInline.time"
              placeholder=""
              size="small"
              style="width:200px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-list">
          <div>

          </div>
          <div>
              
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
          time:new Date().toLocaleDateString(),
      }
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
.spare-parts-warehouse {
  font-size: 12px;
  .top {
    border: @border;
    border-radius: 5px;
    padding: 10px;
  }
  .warehouse {
    border: @border;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    padding: 10px;
    h1 {
      text-align: center;
      letter-spacing: 6px;
    }
  }
}
</style>
