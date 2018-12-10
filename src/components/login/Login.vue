<template>
  <div class="login">
    <div
      class="loginBox"
      v-show="isshow"
    >
      <h1>长虹智能终端设备生产管理云平台</h1>
      <el-form
        :model="loginList"
        :rules="loginRules"
        style="width:60%;margin-top:10px;"
        ref="loginList"
      >
        <el-form-item
          label=""
          style="margin-bottom: 20px;"
          prop="userName"
        >
          <el-input
            placeholder="用户名/手机号"
            v-model="loginList.userName"
          >
            <i
              class='iconfont icon-fonts-user'
              slot="suffix"
            >
            </i></el-input>
        </el-form-item>
        <el-form-item
          label=""
          style="margin-bottom: 20px;"
          prop="password"
        >
          <el-input
            type="password"
            placeholder="密码"
            v-model="loginList.password"
            @keyup.enter.native="login"
          >
            <i
              class='iconfont icon-password'
              slot="suffix"
            >
            </i></el-input>
        </el-form-item>
        <el-form-item
          label=""
          style="width:100%;margin-bottom: 20px;"
          prop="verification"
          :inline="true"
        >
          <el-input
            type="text"
            placeholder="验证码"
            v-model="loginList.verification"
            @keyup.enter.native="login"
            style="width:60%"
          >
          </el-input>
          <el-button
            type="primary"
            plain
            style="width:38%;height:40px;"
          >获取验证码</el-button>
        </el-form-item>
      </el-form>
      <p>
        <el-button
          type="primary"
          @click="submitForm('loginList')"
          @keyup.enter.native="login"
        >登录
        </el-button>
      </p>
      <p class="registerSkip">
        <span>忘记密码</span>
        <span v-on:click="function(){ 
          isshow=!isshow 
          ishide=!ishide
          }">企业注册</span>
      </p>
    </div>
    <div
      class="register"
      v-show="ishide"
    >
      <div v-show="backshow">
        <h2>企业注册</h2>
        <div class="titleText">（企业注册信息填写）</div>
        <el-form>

        </el-form>
        <ul>
          <li>
            <label for="">企业名称：</label>
            <el-input
              size="small"
              v-model="company.name"
            ></el-input>
          </li>
          <li>
            <label for="">法人代表：</label>
            <el-input
              size="small"
              v-model="company.corporation"
            ></el-input>
          </li>
          <li>
            <label for="">联系电话：</label>
            <el-input
              size="small"
              v-model="company.phone"
            ></el-input>
          </li>
          <li>
            <label for="">企业地址：</label>
            <el-input
              size="small"
              v-model="company.address"
            ></el-input>
          </li>

          <li>
            <label for="">统一社会信用代码：</label>
            <el-input
              size="small"
              v-model="company.companyID"
            ></el-input>
          </li>
          <li>
            <label for="">营业执照：</label>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </el-dialog>
          </li>
        </ul>
        <div class="next">
          <el-button
            type="primary"
            size="small"
            round
            class="registerBtn"
            v-on:click="function(){nextshow=!nextshow
           backshow=!backshow}"
          >下一步
          </el-button>
        </div>
      </div>
      <div
        v-show="nextshow"
        style="margin-top:20px"
      >
        <div class="titleText">（管理员信息登记）</div>
        <ul>
          <li>
            <label for="">用户名：</label>
            <el-input
              size="small"
              v-model="manager.userName"
            ></el-input>
          </li>
          <li>
            <label for="">密码：</label>
            <el-input
              size="small"
              type="password"
              v-model="manager.userPassword"
            ></el-input>
          </li>
          <li>
            <label for="">手机号：</label>
            <el-input
              size="small"
              v-model="manager.phone"
            ></el-input>
          </li>
          <li>
            <label for="">验证码：</label>
            <el-input
              class="validate"
              size="small"
              v-model="manager.validate"
            ></el-input>
            <el-button
              type="primary"
              round
              size="small"
            >获取验证码
            </el-button>
          </li>
          <li>
            <el-checkbox v-model="checked">您已阅读<a href="">《长虹设备云用户注册协议》</a></el-checkbox>
          </li>
          <li>
            <el-button
              type="primary"
              size="small"
              round
              class="registerBtn"
              v-on:click="function(){nextshow=!nextshow
           backshow=!backshow}"
            >上一步
            </el-button>
            <el-button
              type="primary"
              size="small"
              round
              class="registerBtn"
              v-on:click="register"
            >注册
            </el-button>
          </li>
        </ul>
      </div>

      <div
        class="loginSkip"
        v-on:click="function(){
          isshow=!isshow 
          ishide=!ishide
          }"
      >已有账号，直接登录
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";
import forgetThePassword from "./ForgetThePassword";
export default {
  inject: ["reload"],
  name: "Login",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      loginList: {
        verification: "",
        userName: "",
        password: ""
      },
      isshow: true,
      ishide: false,
      nextshow: false,
      backshow: true,
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名或手机号", trigger: "blur" },
          { min: 1, max: 20, message: "长度在20个字符内", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        verification: [
          { required: false, message: "验证码不能为空", trigger: "blur" }
        ]
      },
      fileList: [
        {
          name: "",
          url: ""
        }
      ],
      company: {
        name: "",
        address: "",
        phone: "",
        corporation: "",
        companyID: ""
      },
      manager: {
        userName: "",
        userPassword: "",
        // password: "",
        phone: "",
        validate: ""
      },
      checked: true
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // let instance = axios.create({
    //   headers: { "content-type": "application/x-www-form-urlencoded" }
    // });
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    encryptByDES(message, key) {
      // const keyHex = CryptoJS.enc.Utf8.parse(key);
      const keyHex = CryptoJS.enc.Utf8.parse(key);
      const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    },

    login() {
      // this.submitForm('loginList')
      let pass = this.loginList.password;
      pass = md5(pass);
      console.log(this.password);
      let key = "*chang_hong_device_cloud";
      let a = pass;
      pass = this.encryptByDES(a, key);
      // console.log(this.password);
      let qs = require("qs");
      let data = qs.stringify({
        phoneOrName: this.loginList.userName,
        passWord: pass
      });
      this.Axios(
        {
          url: "/user/login",
          params: data,
          type: "post"
        },
        this
      ).then(
        result => {
          if (result.data.code === 200) {
            sessionStorage.token = result.data.data.tokenStr;
            sessionStorage.user = result.data.data.employeeName;
            this.$store.commit("user", sessionStorage.getItem("user"));
            this.$store.commit("tokenSrc", result.data.data.tokenStr);
            this.$router.replace("/Home");
            location.reload();
          } else {
            this.$message({
              message: "账号或密码错误",
              type: "error"
            });
            this.$router.push({ path: "/Login" });
          }
        },
        ({ type, info }) => {}
      );

      // this.axios
      //   .post(this.global.apiSrc + "/user/login", data)
      //   // .post("/api/user/login", data)
      //   .then(result => {
      //     console.log(result);
      //     if (this.userName === "") {
      //       console.log("请输入用户名");
      //       alert("请输入用户名");
      //     } else if (this.password === "") {
      //       alert("请输入密码");
      //     } else {
      //       if (result.data.code === 200) {
      //         sessionStorage.token = result.data.data.tokenStr;
      //         console.log(result.data.data);
      //         this.$store.commit("tokenSrc", result.data.data.tokenStr);
      //         console.log(sessionStorage.token);
      //         console.log(this.$store.state.token.tokenNub);
      //         this.$router.push({
      //           path: "/Home",
      //           redirect: "/Home"
      //         });
      //         location.reload()
      //       } else {
      //         alert("账号或密码错误");
      //         this.$router.push({ path: "/Login" });
      //       }
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     console.log(this.userName);
      //   });
    },
    register() {
      let pass = this.manager.userPassword;
      pass = md5(pass);
      // alert(this.manager.userPassword);
      console.log(this.manager.userPassword);
      let key = "*chang_hong_device_cloud";
      pass = this.encryptByDES(pass, key);
      // alert(this.manager.userPassword)
      console.log(this.manager.userPassword);
      let qs = require("qs");
      let data = qs.stringify({
        enterpriseName: this.company.name,
        enterpriseAddress: this.company.address,
        enterprisePhone: this.company.phone,
        legalPerson: this.company.corporation,
        creditCode: this.company.companyID,
        businessLicenseImg: "img",
        userName: this.manager.userName,
        passWord: pass,
        phone: this.manager.phone,
        returnForget() {
          this.forgetShow = true;
          this.isshow = false;
        }
      });
      if (this.company.name === "") {
        this.$message({
          message: "企业名不能为空",
          type: "error"
        });
      }
      if (this.company.address === "") {
        this.$message({
          message: "企业地址不能为空",
          type: "error"
        });
      }
      if (this.company.phone === "") {
        this.$message({
          message: "企业电话不能为空",
          type: "error"
        });
      }
      if (this.company.corporation === "") {
        this.$message({
          message: "企业法人不能为空",
          type: "error"
        });
      }
      if (
        this.company.companyID === "" ||
        this.company.companyID.length !== 18
      ) {
        this.$message({
          message:
            "统一社会信用编码不能为空且必须为十八位，请与营业执照上的编码相同",
          type: "error"
        });
      }
      if (this.company.companyID === "") {
        this.$message({
          message: "请上传营业执照",
          type: "error"
        });
      }
      if (this.manager.userName === "") {
        this.$message({
          message: "请输入企业管理人信息",
          type: "error"
        });
      }
      if (pass === "") {
        this.$message({
          message: "请设置密码",
          type: "error"
        });
      }
      if (this.manager.phone === "") {
        this.$message({
          message: "请输入企业管理人电话",
          type: "error"
        });
      }
      this.Axios(
        {
          url: "/enterprise/add",
          params: data,
          type: "post"
        },
        this
      ).then(
        result => {
          if (result.data.code === 200) {
            this.$message({
              message: "恭喜您注册成功",
              type: "success"
            });
            location.reload();
          }
        },
        ({ type, info }) => {}
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    encryptByDES(message, key) {
      const keyHex = CryptoJS.enc.Utf8.parse(key);
      const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    }
  },
  components: {
    forgetThePassword
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/font/font.css");
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #909399;
* {
  margin: 0;
  padding: 0;
}

.login {
  text-align: center;
  width: 100%;
  height: 100vh;
  //background-color: @blue;
  background: #686868 url(../../assets/image/login-bg2.png) bottom no-repeat;
  background-size: 100% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  .loginBox {
    width: 40%;
    height: auto;
    //background-color: white;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    box-shadow: 3px 3px 5px #333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    h1 {
      width: 100%;
      padding: 20px 0;
      letter-spacing: 2px;
      //font-family: "和畅惠风 Hiragino Sans GB";
      font-weight: 500;
      color: @blue;
      font-size: 120%;
    }
    // .el-form-item {
    //   margin-bottom: 20px;
    // }
    p {
      width: 60%;
      padding: 0 0 10px 0;
      button {
        width: 100%;
        height: 40px;
      }
    }
    .registerSkip {
      text-align: right;
      padding-bottom: 50px;
      font-size: 12px;
      span {
        display: inline-block;
        margin-left: 5px;
        cursor: pointer;
        &:hover {
          color: @blue;
        }
      }
    }
    .proving1 {
      text-align: left;
      width: 60%;
      .el-input {
        width: 120%;
      }
      .el-button {
        width: 160%;
        height: 38px;
      }
      span {
        margin-left: 3%;
        display: inline-block;
        width: 30%;
        border: 1px solid red;
      }
    }
  }
}

.adminLogin {
  width: 40%;
  height: auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 10px 10px @Info;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  h1 {
    width: 100%;
    padding: 20px 0;
    letter-spacing: 2px;
    font-family: "和畅惠风 Hiragino Sans GB";
    font-weight: 500;
    color: @blue;
  }
  p {
    width: 60%;
    padding: 10px 0;
    button {
      width: 100%;
    }
  }
  .registerSkip {
    text-align: right;
    padding-bottom: 50px;
    font-size: 12px;
    span {
      display: inline-block;
      margin-left: 5px;
      cursor: pointer;
      &:hover {
        color: @blue;
      }
    }
  }
  .proving {
    font-size: 12px;
    text-align: left;
    position: relative;
    .el-input:nth-child(1) {
      width: 40%;
    }
    .el-input:nth-child(2) {
      width: 58.5%;
    }
    .el-button {
      position: absolute;
      top: 20%;
      right: 1.5%;
      width: 70px;
      height: 36px;
      margin-left: 4%;
      border: none;
    }
  }
}

.register {
  position: absolute;
  right: 10%;
  width: 35%;
  background-color: white;
  box-shadow: 10px 10px 10px @Info;
  border-radius: 10px;
  padding-bottom: 30px;
  .next {
    margin-top: 30px;
  }
  h2 {
    letter-spacing: 2px;
    font-weight: 500;
    padding: 10px 0;
  }
  ul {
    li {
      list-style-type: none;
      margin-bottom: 5px;
      label {
        display: inline-block;
        width: 31%;
        text-align: right;
      }
      .validate {
        width: 30%;
      }
      a {
        text-decoration: none;
        color: @blue;
      }
    }
  }
  .el-input {
    width: 50%;
    padding: 0;
  }
  .titleText {
    width: 100%;
    font-size: 12px;
    color: #909399;
    text-align: center;
    padding: 10px 0 10px 20px;
  }
  .upload-demo {
    width: 50%;
    display: inline-block;
    padding: 0;
  }
  .registerBtn {
    width: 30%;
  }
  .loginSkip {
    padding-right: 40px;
    margin-top: 20px;
    text-align: right;
    font-size: 12px;
    cursor: pointer;
  }
}
 
</style>
