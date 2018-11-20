<template>
    <div class="modification">
        <div class="modiBox" v-show="modiShow">
            <h3>重置登录密码</h3>
            <div class="checkUser" v-show="checkShow">
                <span style="font-size:12px;color:#909399">（确认账号）</span>
                <el-form :model="formLabelAlign">
                    <el-form-item label="用户名：">
                        <el-input v-model="formLabelAlign.name" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：">
                        <el-input v-model="formLabelAlign.proving" size="small" style="width:20%;"></el-input>
                        <label>图片</label>
                        <span style="font-size:12px;">看不清？换一张</span>
                    </el-form-item>
                    <el-form-item style="text-align:center;">
                        <el-button type="primary" style="width:80%;border-radius: 30px;" size="small" @click="checkclick">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="way" v-show="wayShow">
                <span style="font-size:12px;color:#909399">（选择验证方式）</span>
                <div class="radioCase">
                    <el-radio v-model="radio" label="1">通过手机短信验证</el-radio>
                </div>
                <div style="margin-top:10px;">
                    <el-button type="primary" style="width:55%;border-radius: 30px;" size="small" @click="checkPhon">下一步</el-button>
                </div>

            </div>
            <div class="checkPhone" v-show="checkPhoneShow">
                <span style="font-size:12px;color:#909399">（手机短信验证）</span>
                <div>
                    <div style="margin-top:20px;">
                        <span>您绑定的手机号：</span>
                        <span>12345678901</span>
                        <el-button size="small">获取验证码</el-button>
                    </div>
                    <div style="margin-top:20px;margin-bottom:20px;">
                        <label>短信验证码：</label>
                        <el-input size="small" style="width:32%;"></el-input>
                    </div>
                    <div style="margin-top:55px;">
                        <el-button type="primary" style="width:55%;border-radius: 30px;" size="small" @click="newPas">下一步</el-button>
                    </div>

                </div>
            </div>
            <div class="newPassWord" v-show="newP">
                <span style="font-size:12px;color:#909399">（设置新密码）</span>
                <div>
                    <el-form :model="newPass" label-width="90px">
                        <el-form-item label="密码：" prop="pass">
                            <el-input type="password" v-model="newPass.pass"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码：" prop="checkPass">
                            <el-input type="password" v-model="newPass.checkPass"></el-input>
                        </el-form-item>
                        <el-form-item style="text-align:left;">
                            <el-button type="primary" style="width:80%;border-radius: 30px;letter-spacing:5px; margin:auto;" size="small" @click="returnSucced">确认</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span class="returnLogin" v-show="returnLogin">
                <span @click="reLogin">
                    返回登录
                </span>
            </span>
        </div>
        <div class="succeed" v-show="succeedShow">
            <span>
                您的密码已重置成功，请妥善保管您的密码！
            </span>
            <div style="margin-top:45px;">
                <el-button type="primary" style="width:60%;border-radius: 30px;" size="small" @click="reload">立即登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      newPass: {
        psaa: "",
        checkPass: ""
      },
      checkShow: true,
      wayShow: false,
      checkPhoneShow: false,
      newP: false,
      returnLogin: true,
      modiShow: true,
      succeedShow: false,
      radio: "",
      labelPosition: "left",
      formLabelAlign: {
        userName: "",
        proving: ""
      }
    };
  },
  methods: {
    checkclick() {
      this.checkShow = false;
      this.wayShow = true;
    },
    checkPhon() {
      this.wayShow = false;
      this.checkPhoneShow = true;
    },
    newPas() {
      this.checkPhoneShow = false;
      this.returnLogin = false;
      this.newP = true;
    },
    reload() {
      location.reload();
    },
    returnSucced() {
      this.newP = false;
      this.succeedShow = true;
      this.modiShow = false;
    },
    reLogin() {
      location.reload();
    }
  }
};
</script>
<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #909399;
@border: 1px solid #dde2eb;
.modification {
  width: 100vw;
  height: 100vh;
  .modiBox {
    width: 40%;
    min-height: 320px;
    margin: auto;
    margin-top: 150px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 10px 10px 10px @Info;
    padding: 20px;
    .checkUser {
      //   min-height: 215px;
      .el-form {
        width: 70%;
        margin: auto;
        margin-top: 30px;
      }
      .el-form-item {
        text-align: left;
        span {
          display: inline-block;
          //   float: right;
        }
        label {
          display: inline-block;
          width: 80px;
          //   border: @border;
          height: 40px;
        }
      }
      .el-input {
        width: 70%;
      }
    }
    .way {
      .radioCase {
        // min-height: 215;
        height: 150px;
        line-height: 150px;
      }
    }
    .returnLogin {
      display: inline-block;
      width: 100%;
      text-align: right;
      font-size: 12px;
      padding-right: 50px;
      cursor: pointer;
      :hover {
        color: @blue;
      }
    }
    .newPassWord {
      .el-form {
        width: 70%;
        margin: auto;
        margin-top: 30px;
        text-align: left;
        .el-input {
          width: 90%;
        }
      }
    }
  }
  .succeed {
    width: 40%;
    margin: auto;
    margin-top: 150px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 10px 10px 10px @Info;
    padding: 40px 20px;
    min-height: 300px;
    span {
      display: block;
      height: 150px;
      line-height: 150px;
    }
  }
}
</style>
