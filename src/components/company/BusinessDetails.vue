<template>
  <div class="back">
    <div class="business-details">

      <!-- <span class="title">企业信息</span> -->
      <div class="left">

        <ul>
          <h4>企业主体信息</h4>
          <li>
            <label for="">企业名称：</label>
            <el-input type="text" size="small" style="width:300px" v-model="detailsValue.name" readonly></el-input>
          </li>
          <li>
            <label for="">企业法人：</label>
            <el-input type="text" size="small" style="width:300px" v-model="detailsValue.legalPerson"
                      readonly></el-input>
          </li>
          <li>
            <label for="">联系电话：</label>
            <el-input type="text" size="small" style="width:300px" v-model="detailsValue.phone" readonly></el-input>
          </li>
          <li>
            <label for="">联系地址：</label>
            <el-input type="text" size="small" style="width:300px" v-model="detailsValue.address" readonly></el-input>
          </li>
          <li>
            <label for="">统一信用社会代码：</label>
            <el-input type="text" size="small" style="width:300px" v-model="detailsValue.creditCode"
                      readonly></el-input>
          </li>
        </ul>

        <div class="state">
          <span>
            驳回原因：
          </span>
          <span style="color:red;display:inline-block">
            <p>{{detailsValue.auditOpinion}}</p>
          </span>
        </div>
        <!-- <div style="margin-top:20px;text-align:center;">
          <el-button size="small" @click="isHide">返回</el-button>
        </div> -->
      </div>
      <div class="right">
        <a target="_blank" :href="detailsValue.businessLicenseImg">
        <img :src="detailsValue.businessLicenseImg" alt="">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    props: ["detailsValue"],
    data() {
      return {
        imgUrl: "",
        msg: "哈哈哈",
        img: "",
        block: false,
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
    methods: {
      isHide() {
        this.$emit("childByValue", false)
      }
    },
    created() {
    }
  };
</script>
<style lang="less" scoped>
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  // .back {
  //   width: 100vw;
  //   height: 100vh;
  //   position: absolute;
  //   top: 0%;
  //   left: 0%;
  //   background-color: #8081812a;
  // }

  .business-details {
    // margin: auto;
    padding: 10px;
    // width: 800px;
    border: 1px solid @Info;
    overflow: hidden;
    // background-color: white;
    // margin-top: 100px;
    // position: absolute;
    // top: 0;
    // left: 0;
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
        height: auto;
      }
    }
  }
</style>
