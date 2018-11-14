<template>
  <div class="business-details">
    <span>企业信息</span>
    <div class="left">

      <ul>
        <h3>企业主体信息</h3>
        <li>
          <label for="">企业名称：</label>
          <el-input type="text" size="small" style="width:300px"></el-input>
        </li>
        <li>
          <label for="">企业法人：</label>
          <el-input type="text" size="small" style="width:300px"></el-input>
        </li>
        <li>
          <label for="">联系电话：</label>
          <el-input type="text" size="small" style="width:300px"></el-input>
        </li>
        <li>
          <label for="">联系地址：</label>
          <el-input type="text" size="small" style="width:300px"></el-input>
        </li>
        <li>
          <label for="">统一信用社会代码：</label>
          <el-input type="text" size="small" style="width:300px"></el-input>
        </li>
      </ul>
      <ul>
        <h3>申请人信息</h3>
        <li>
          <label for="">姓名：</label>
          <el-input type="text" size="small" style="width:300px"></el-input>
        </li>
        <li>
          <label for="">手机：</label>
          <el-input type="text" size="small" style="width:300px"></el-input>
        </li>
      </ul>
      <div>
        <span>
          驳回原因：
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {}
};
</script>
<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
.business-details {
  margin-left:180px; 
  padding: 10px;
  width: 800px;
  border: 1px solid @Info;
  span{
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid @Info;
  }
  .left {
    
    li {
      list-style-type: none;
    }
  }
}
</style>
