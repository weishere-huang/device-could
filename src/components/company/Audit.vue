<template>
  <div class="auditCase">
    <div class="audit">
      <span class="title">企业信息</span>
      <div class="left">

        <ul>
          <h4>企业主体信息</h4>
          <li>
            <label for="">企业名称：</label>
            <el-input type="text" size="small" style="width:300px" v-model="auditValue.name" readonly></el-input>
          </li>
          <li>
            <label for="">企业法人：</label>
            <el-input type="text" size="small" style="width:300px" v-model="auditValue.legalPerson" readonly></el-input>
          </li>
          <li>
            <label for="">联系电话：</label>
            <el-input type="text" size="small" style="width:300px" v-model="auditValue.phone" readonly></el-input>
          </li>
          <li>
            <label for="">联系地址：</label>
            <el-input type="text" size="small" style="width:300px" v-model="auditValue.address" readonly></el-input>
          </li>
          <li>
            <label for="">统一信用社会代码：</label>
            <el-input type="text" size="small" style="width:300px" v-model="auditValue.creditCode" readonly></el-input>
          </li>
        </ul>

        <div class="state">
          <div>
            <label style="display:inline-block;height:60px;vertical-align:top;">驳回原因：</label>
            <textarea type="textarea" style="width:70%;height:60px;" placeholder="请填写驳回原因"
                      v-model="auditValue.opinion"></textarea>
          </div>

          <div style="margin-top:10px;width:100%;text-align:center;">
            <el-button size="small" @click="auditback">返回</el-button>
            <el-button size="small" @click="reject">驳回</el-button>
            <el-button size="small" @click="pass">通过</el-button>
          </div>
        </div>
      </div>
      <div class="right">
        <img src="../../assets/image/chlogo.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    props: ["auditValue"],
    data() {
      return {
        msg: "哈哈哈",
        img: "",
        block: false,
        enterpriseIds: "",

        company: {
          name: "",
          address: "",
          phone: "",
          corporation: "",
          companyID: "",
          enterpriseId: ""
        },
        manager: {
          userName: "",
          phone: ""
        }
      };
    },
    methods: {
      auditback() {
        this.$emit("auditByValue", this.block);
        // location.reload();
      },
      pass() {
        let qs = require("qs");
        let data = qs.stringify({
          enterpriseId: this.auditValue.id,
          passOrTurn: 1
        })
        this.Axios(
          {
            url: "/enterprise/auditEnterprise/",
            params: data,
            type: "post",
            option: {
              enableMsg: false
            },
          }
        ).then(response=>{
          this.$message({
              message: "您已通过该企业的审核",
              type:"success"
            })
          location.reload();
        },({type,info})=>{})
      },
      reject() {
        let qs = require("qs");
        let data = qs.stringify({
          enterpriseId: this.auditValue.id,
          passOrTurn: 0,
          // userId:2,
          opinion: this.auditValue.opinion,
        })
        // this.Axios(
        //   {
        //     url: "/enterprise/auditEnterprise/",
        //     params: data,
        //     type: "post",
        //     option: {enableMsg: false}
        //   },
        //   this
        //
        // ).then(respose=>{
        //   if(this.auditValue.opinion===""){
        //     this.
        //   }
        // },({type, info})=>{})


        console.log(data.auditOpinion)
        this.axios.post(this.global.apiSrc + "/enterprise/auditEnterprise/", data)
          .then(response => {

              alert("审核被驳回")

            location.reload();
            console.log(response)
          }).catch(function (error) {
          console.log(error)

        })
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
  .auditCase {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #8081812a;
  }

  .audit {
    padding: 10px;
    width: 800px;
    margin: auto;
    margin-top: 100px;
    border: 1px solid @Info;
    overflow: hidden;
    background-color: white;
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
        textarea {
          resize: none;
          border-radius: 5px;
          border-color: #dde2eb;
          padding: 10px;
        }
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
