<template>
  <div class="business-details">
    <span class="title">企业信息</span>
    <div class="left">

      <ul>
        <h4>企业主体信息</h4>
        <li>
          <label for="">企业名称：</label>
          <el-input type="text" size="small" style="width:300px" v-model="company.name"> </el-input>
        </li>
        <li>
          <label for="">企业法人：</label>
          <el-input type="text" size="small" style="width:300px" v-model="company.corporation"></el-input>
        </li>
        <li>
          <label for="">联系电话：</label>
          <el-input type="text" size="small" style="width:300px" v-model="company.phone"></el-input>
        </li>
        <li>
          <label for="">联系地址：</label>
          <el-input type="text" size="small" style="width:300px" v-model="company.address"></el-input>
        </li>
        <li>
          <label for="">统一信用社会代码：</label>
          <el-input type="text" size="small" style="width:300px" v-model="company.companyID"></el-input>
        </li>
      </ul>
      <ul>
        <h4>申请人信息</h4>
        <li>
          <label for="">姓名：</label>
          <el-input type="text" size="small" style="width:300px" v-model="manager.userName"></el-input>
        </li>
        <li>
          <label for="">手机：</label>
          <el-input type="text" size="small" style="width:300px" v-model="manager.phone"></el-input>
        </li>
      </ul>
      <div class="state">
        <span>
          驳回原因：
        </span>
        <span style="color:red;display:inline-block">
          <p>{{msg}}</p>
        </span>
      </div>
    </div>
    <div class="right">
      <img src="../../assets/image/chlogo.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "哈哈哈",
      img: "",
      company: {
        name: "",
        address: "",
        phone: "",
        corporation: "",
        companyID: ""
      },
      manager: {
        userName: "",
        phone: ""
      }
    };
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
  margin-left: 180px;
  padding: 10px;
  width: 800px;
  border: 1px solid @Info;
  overflow: hidden;

  .title {
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid @Info;
  }
  .left {
    float: left;
    width: 65%;
    padding-bottom: 30px;
    ul {
      border-bottom: 1px solid @Info;
      padding: 10px 30px 10px 10px;
      li {
        list-style-type: none;
        width: 100%;
        text-align: right;
        height: 50px;
        line-height: 50px;
      }
    }
    .state {
      padding-left: 30px;
      margin-top: 20px;
    }
  }
  .right {
    float: right;
    width: 30%;
    border: 1px solid @Info;
    margin-right: 3%;
    margin-top: 20px;
    padding: 20px;
    img {
      width: 100%;
    }
  }
}
</style>
