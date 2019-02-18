<template>
<div class="login">
  <div
    class="loginBox"
    v-show="isshow"
  >
    <h2>长虹智能终端设备生产管理云平台</h2>
    <el-form
      @keyup.enter.native="submitForm('loginList')"
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
          maxlength="30"
          autofocus
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
          maxlength="30"
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
          placeholder="短信验证码"
          v-model="loginList.verification"
          @keyup.enter.native="login"
          style="width:60%"
        >
        </el-input>
        <!--<el-button type="primary" plain style="width:38%;height:40px;" @click="loginSecuritycode">-->
        <el-button
          type="primary"
          style="width:38%;height:40px;padding:0;"
          v-if="!sendMsgDisabled"
          @click="loginSecuritycode"
        >获取验证码
        </el-button>
        <el-button
          type="primary"
          plain
          disabled="true"
          style="width:38%;height:40px;padding:0;"
          v-if="sendMsgDisabled"
        >{{time+'秒后获取'}}
        </el-button>
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
      <el-form
        :label-position="labelPosition"
        label-width="160px"
        :model="company"
        :rules="registerRules"
        ref="company"
      >
        <el-form-item
          label="企业名称："
          prop="name"
        >
          <el-input
            placeholder="营业执照主体单位名称"
            size="small"
            v-model="company.name"
            maxlength="30"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="法人代表："
          prop="corporation"
        >
          <el-input
            placeholder="营业执照法定代表人"
            size="small"
            v-model="company.corporation"
            style="width:80%"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话："
          prop="phone"
        >
          <el-input
            placeholder="如：028-XXXXXXXX"
            size="small"
            v-model="company.phone"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="企业地址："
          prop="address"
        >
          <el-input
            placeholder="企业现在所处的详细地址"
            size="small"
            maxlength="100"
            v-model="company.address"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="统一社会信用代码："
          prop="companyID"
        >
          <el-input
            placeholder="18位统一社会信用代码"
            size="small"
            v-model="company.companyID"
            style="width:80%"
            maxlength="18"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="营业执照："
          props="dialogImageUrl"
          style="padding-top: 6px;"
        >
          <el-upload
            style="display:inline-block;vertical-align:top"
            :action="uploadUrl()"
            accept="image/jpeg,image/png"
            list-type="picture-card"
            :limit="1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img
              width="100%"
              :src="company.dialogImageUrl"
              alt=""
            >
          </el-dialog>
        </el-form-item>
        <div style="display:inline-block;margin-left:-20px;color:#fff;">仅支持小于1Mb的jpg或png图片格式</div>
      </el-form>
      <div class="next">
        <el-button
          type="primary"
          size="small"
          class="registerBtn"
          @click="registerNext('company')"
        >下一步
        </el-button>
      </div>
    </div>
    <div
      v-show="nextshow"
      style="margin-top:20px"
    >
      <h2>企业注册</h2>
      <div class="titleText">（管理员信息登记）</div>
      <el-form
        :label-position="labelPosition"
        label-width="160px"
        :model="manager"
        :rules="managerRules"
        ref="manager"
      >
        <el-form-item
          label="用户名："
          prop="userName"
        >
          <el-input
            placeholder="6~20位字符组成，以字母开头"
            size="small"
            v-model="manager.userName"
            style="width:80%"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码："
          prop="userPassword"
        >
          <el-input
            placeholder="6~20位字符组成，区分大小写"
            size="small"
            :type="see"
            v-model="manager.userPassword"
            maxlength="20"
            style="width:80%"
          >
            <i
              class="el-icon-view"
              slot="suffix"
              style=""
              @click="seePassword"
            ></i></el-input>
        </el-form-item>
        <el-form-item
          label="手机号："
          prop="phone"
        >
          <el-input
            placeholder="11位手机号（仅国内）"
            size="small"
            v-model="manager.phone"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="验证码："
          prop="validate"
        >
          <el-input
            placeholder="短信验证码"
            v-model="manager.validate"
            size="small"
            style="width:40%"
          >
          </el-input>
          <el-button
            type="primary"
            style="width:38%;"
            size="small"
            v-if="!sendMsgDisabled"
            @click="registerSecuritycode('manager')"
          >获取验证码
          </el-button>
          <el-button
            type="primary"
            plain
            style="width:38%;height:32px;"
            size="small"
            v-if="sendMsgDisabled"
          >{{time+'秒后获取'}}
          </el-button>

        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="checked">您已阅读<a
            href="javascript:"
            style="text-decoration: none;"
            @click="showDeal=true"
          >《长虹设备云用户注册协议》</a></el-checkbox>
        </el-form-item>
      </el-form>
      <el-dialog
        title="用户注册协议"
        :visible.sync="showDeal"
        width="600"
        center
        append-to-body>
        <div style="height:600px;width:100%;overflow:scroll;font-size:12px;line-height:20px;" id="deal-content" v-html="deal.content">

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showDeal = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="showDeal = false" size="mini">确 定</el-button>
          </span>
      </el-dialog>
      <el-button
        type="primary"
        size="small"
        class="registerBtn"
        style="width:35%;height:32px"
        v-on:click="function(){nextshow=!nextshow
           backshow=!backshow}"
      >上一步
      </el-button>
      <el-button
        type="primary"
        size="small"
        class="registerBtn"
        @click="registerInfo('manager')"
        style="width:35%;height:32px"
      >注册
      </el-button>
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
  <div v-if="this.$route.params.deviceId!==undefined">
    <router-view></router-view>
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
        deal: "",
        showDeal: false,
        see: "password",
        time: 60, // 发送验证码倒计时
        sendMsgDisabled: false,
        labelPosition: "right",
        dialogVisible: false,
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
            {required: true, message: "请输入用户名或手机号", trigger: "blur"},
            {min: 1, max: 20, message: "请输入正确的用户名或手机号"}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur"},
            {max: 20, message: "密码错误"}
          ],
          verification: [
            {required: true, message: "验证码不能为空", trigger: "blur"},
          ]
        },
        registerRules: {
          name: [
            {required: true, message: "企业名不能为空", trigger: "blur"},
            {min: 1, max: 100, message: "企业名称长度不能超过100字符"},
            {
              validator: (rule, value, callback) => {
                if (
                  /^(?!(\d+)$)[\u4e00-\u9fffa-zA-Z\d\-_\(\)\（\）\s]+$/.test(
                    value
                  ) == false
                ) {
                  callback(new Error("请输入正确的企业名称"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                this.Axios({
                  params: Object.assign({name: this.company.name}),
                  url: "/enterprise/findByName",
                  type: "get",
                  option: {enableMsg: false, enableLoad: false}
                }).then(
                  res => {
                    // console.log(res);
                    callback();
                  },
                  ({type, info}) => {
                    // console.log(info);
                    callback(new Error("企业名称已存在"));
                  }
                );
              },
              trigger: "blur"
            }
          ],
          address: [
            {required: true, message: "地址不能为空", trigger: "blur"},
            {max: 30, message: "企业地址长度不能超过30字符"}
          ],
          phone: [
            {required: true, message: "电话不能为空", trigger: "blur"},
            {
              validator: (rule, value, callback) => {
                if (
                  /^((0\d{2,3}-\d{7,8})||(1[34578]\d{9}))$/.test(value) == false
                ) {
                  callback(new Error("您输入的电话号码有误，请重新输入"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          corporation: [
            {required: true, message: "法人代表不能为空", trigger: "blur"},
            {max: 30, message: "法人代表长度不能超过30个字符"},
            {
              validator: (rule, value, callback) => {
                if (/^([\u4E00-\u9FA5]+|[a-zA-Z\s?]+)$/.test(value) == false) {
                  callback(new Error("请填写正确的法人代表"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          companyID: [
            {
              required: true,
              message: "统一社会信用代码不能为空",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                if (
                  /^[1-9A-GY]{1}[1239]{1}[\d]{6}[\dA-Z]{10}$/.test(value) == false
                ) {
                  callback(new Error("您输入的统一社会信用代码有误，请重新输入"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                this.Axios({
                  params: Object.assign({creditCode: this.company.companyID}),
                  url: "/enterprise/findByCreditCode",
                  type: "get",
                  option: {enableMsg: false, enableLoad: false}
                }).then(
                  res => {
                    callback();
                  },
                  ({type, info}) => {
                    callback(new Error("统一社会信用代码已存在"));
                  }
                );
              },
              trigger: "blur"
            }
          ]
        },
        managerRules: {
          userName: [
            {required: true, message: "用户名不能为空", trigger: "blur"},
            {
              validator: (rule, value, callback) => {
                if (/^[a-zA-Z0-9_-]{6,20}$/.test(value) == false) {
                  callback(new Error("用户名格式不正确，请输入6~20位字符"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            },
            {
              min: 6,
              max: 20,
              message: "请输入6到20位的字母和数字组合",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                this.Axios({
                  params: Object.assign({userName: this.manager.userName}),
                  url: "/user/userNameIsSingle",
                  type: "get",
                  option: {enableMsg: false, enableLoad: false}
                }).then(
                  res => {
                    callback();
                  },
                  ({type, info}) => {
                    callback(new Error("该用户名已存在"));
                  }
                );
              },
              trigger: "blur"
            }
          ],
          userPassword: [
            {required: true, message: "密码不能为空", trigger: "blur"},
            {
              validator: (rule, value, callback) => {
                if (
                  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value) ==
                  false
                ) {
                  callback(
                    new Error("密码不能全是数字，字母，不能少于6位且小于20位")
                  );
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ],
          phone: [
            {required: true, message: "电话不能为空", trigger: "blur"},
            {
              validator: (rule, value, callback) => {
                if (/^[1][0-9]{10}$/.test(value) == false) {
                  callback(new Error("您输入的手机号有误，请重新输入"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                this.Axios({
                  params: Object.assign({phone: this.manager.phone}),
                  url: "/user/phoneIsSingle",
                  type: "get",
                  option: {enableMsg: false, enableLoad: false}
                }).then(
                  res => {
                    console.log(res);
                    callback();
                  },
                  ({type, info}) => {
                    console.log(info);
                    callback(new Error("该手机号码已存在"));
                  }
                );
              },
              trigger: "blur"
            }
          ],
          validate: [
            {required: false, message: "验证码不能为空", trigger: "blur"}
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
          companyID: "",
          dialogImageUrl: ""
        },
        manager: {
          userName: "",
          userPassword: "",
          phone: "",
          validate: ""
        },
        checked: true
      };
    },
    methods: {
      dealMsg() {
        this.Axios(
          {
            url: "/protocol/find",
            params: {},
            type: "get",
            option: {enableMsg: false, enableLoad: false}
          },
          this
        ).then(
          result => {
            // console.log(result.data.data[0]);
            this.deal = result.data.data[0]
          },
          ({type, info}) => {
          }
        );
      },
      toReginster() {
        this.$router.push({path: '/Reginster'})
      },
      seePassword(e) {
        if (this.see === "text") {
          this.see = "password";
          e.target.style.color = "";
          console.log(this.see);
        } else if (this.see === "password") {
          this.see = "text";
          e.target.style.color = "blue";
          console.log(e.target);
        }
      },
      checkData(rule, value, callback) {
        if (value) {
          if (/[\u4E00-\u9FA5]/g.test(value)) {
            callback(new Error("编码不能输入汉字!"));
          } else {
            callback();
          }
        }
        callback();
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
            // console.log("error submit!!");
            return false;
          }
        });
      },
      registerNext(formName) {
        if (this.company.dialogImageUrl === "") {
          this.$message.error('请上传营业执照')
        } else {
          this.$refs[formName].validate(valid => {
            if (valid) {
              // alert("submit!");
              this.nextshow = !this.nextshow;
              this.backshow = !this.backshow;
            } else {
              this.$message.error("对不起，信息提交失败，请检查后重新提交");
              return false;
            }
          });
        }
      },
      registerInfo(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.register();
          } else {
            this.$message.error("对不起，信息提交失败，请检查后重新提交");
            return false;
          }
        });
      },
      encryptByDES(message, key) {
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
        let key = "*chang_hong_device_cloud";
        let a = pass;
        pass = this.encryptByDES(a, key);
        // console.log(this.password);
        let qs = require("qs");
        let data = qs.stringify({
          phoneOrName: this.loginList.userName,
          passWord: pass,
          verifyCode: this.loginList.verification
        });
        this.Axios(
          {
            url: "/user/login",
            params: data,
            type: "post",
            option: {enableMsg: false},
            loadingConfig: {
              target: document.querySelector(".login")
            }
          },
          this
        ).then(
          result => {
            if (result.data.code === 200) {
              // console.log(result.data);
              localStorage.token = result.data.data.tokenStr;
              localStorage.user = JSON.stringify(result.data.data);
              localStorage.permissionUrl = JSON.stringify(result.data.data.permissionUrl);
              // this.$cookieStore.addCookie('token', JSON.stringify(result.data.data.tokenStr),168)
              // this.$cookieStore.addCookie('message',JSON.stringify(result.data.data) ,168)
              // this.$cookieStore.addCookie('permissionUrl',JSON.stringify(result.data.data.permissionUrl),168)
              this.$store.commit("user", result.data.data);
              // this.$store.commit("tokenSrc",result.data.data.tokenStr);
              // console.log(this.$store.state.token.tokenNub);
              // console.log(this.$store.state.token.userMsg);
              this.$router.replace("/Home");
              // location.reload();
            }
          },
          ({type, info}) => {
            if (info.code === 408) {
              this.$message.error("验证码错误");
            }
            if (info.code === 402) {
              this.$message.error("账号或密码错误");
            }
            if (info.code === 0) {
              this.$message.error('对不起，您的账户已被禁用')
            }
            if (info.code === 406) {
              this.$message.error('对不起，您的企业正在审核中，请审核通过后再登录')
            }
          }
        );
      },
      send() {
        let me = this;
        me.sendMsgDisabled = true;
        let interval = window.setInterval(function () {
          if (me.time-- <= 0) {
            me.time = 60;
            me.sendMsgDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      register() {
        let pass = this.manager.userPassword;
        pass = md5(pass);
        let key = "*chang_hong_device_cloud";
        pass = this.encryptByDES(pass, key);
        let qs = require("qs");
        let data = qs.stringify({
          enterpriseName: this.company.name,
          enterpriseAddress: this.company.address,
          enterprisePhone: this.company.phone,
          legalPerson: this.company.corporation,
          creditCode: this.company.companyID,
          businessLicenseImg: this.company.dialogImageUrl,
          userName: this.manager.userName,
          passWord: pass,
          phone: this.manager.phone,
          verifyCode: this.manager.validate,
          returnForget() {
            this.forgetShow = true;
            this.isshow = false;
          }
        });
        this.Axios(
          {
            url: "/enterprise/add",
            params: data,
            type: "post",
            option: {enableMsg: false, enableLoad: false}
          },
          this
        ).then(
          result => {
            if (result.data.code === 200) {
              this.$alert(
                "恭喜您，企业注册信息已提交成功。审核结果将以短信的方式通知到您绑定的手机号。",
                "提示",
                {
                  confirmButtonText: "确定",
                  callback: action => {
                    location.reload();
                  }
                }
              );
            }
          },
          ({type, info}) => {
          }
        );
      },
      //登录验证码
      loginSecuritycode() {
        this.Axios(
          {
            params: Object.assign({phoneOrName: this.loginList.userName}),
            url: "/user/getVerifyCode",
            type: "get",
            option: {
              enableMsg: false,
              enableLoad: false
            }
            // loadingConfig:{
            //   target: document.querySelector('.login')
            // }
          },
          this
        ).then(
          response => {
            this.$message.success("短信验证码已发送至您的手机，请注意查收");
            this.send();
          },
          ({type, info}) => {
            // console.log(info);
            if (info.code === 401 || info.code === 406) {
              this.$message.error("用户名或手机号错误");
            } else {
              this.$message.error("服务器异常，请稍后再试");
            }
          }
        );
      },
      //注册验证码
      registerSecuritycode(formName) {
        this.Axios(
          {
            params: Object.assign({phone: this.manager.phone}),
            url: "/enterprise/getVerifyCode",
            type: "get",
            option: {
              enableMsg: false,
              enableLoad: false
            }
          },
          this
        ).then(
          response => {
            this.$refs[formName].validate(valid => {
              if (valid) {
                this.$message.success("短信验证码已发送至您的手机，请注意查收");
                this.send();
              } else {
                this.$message.error("对不起,获取验证码失败，请检查信息填写是否正确后再重新获取");
                return false;
              }
            });
          },
          ({type, info}) => {
          }
        );
      },
      uploadUrl() {
        let url = this.global.apiImg;
        return url;
      },
      handleAvatarSuccess(res, file) {
        // console.log(res.data);
        this.$message.success("上传图片成功");
        this.company.dialogImageUrl = res.data;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isLt1M = file.size / 1024 / 1024 < 1;
        let isOK = true;
        if (!(isJPG || isPNG)) {
          this.$message.error("仅支持jpg/png格式");
          isOK = false;
        }
        if (!isLt1M) {
          this.$message.error("图片大小不能超过1M");
        }
        return isOK && isLt1M;
      },
      handlePictureCardPreview(file) {
        this.company.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        this.company.dialogImageUrl = "";
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
    mounted() {
    },
    created() {
      this.dealMsg()
    }
  };
</script>
<style lang="less">
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
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #686868 url(../../assets/image/login-bg.jpg) no-repeat;
    background-size: cover;
    -webkit-filter: blur(4px);
    z-index: 3;
  }
  .topBar {
    line-height: 40px;
    position: absolute;
    top: 0;
    text-align: left;
    width: 100%;
    img {
      width: 200px;
      margin: 5px;
    }
    z-index: 4;
  }
  .bottomBar {
    line-height: 40px;
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    padding: 0 20px;
    bottom: 0;
    width: 100%;
    color: #fff;
    text-align: right;
    border-bottom: solid 1px #a9a7a7;
    text-shadow: 1px 1px 1px #333;
    font-size: 18px;
    z-index: 4;
  }
  text-align: center;
  width: 100%;
  height: 100vh;
  //background-color: @blue;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  .loginBox {
    width: 30%;
    height: auto;
    //background-color: white;
    background: rgba(255, 255, 255, 0.45);
    border-radius: 20px;
    box-shadow: 0 0 8px #000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    z-index: 100;
    h2 {
      width: 100%;
      padding: 10px 0;
      // letter-spacing: 2px;
      //font-family: "和畅惠风 Hiragino Sans GB";
      font-weight: 500;
      width: 80%;
      color: #fff;
      //text-align: left;
      text-shadow: 1px 1px 2px #333;
      //color: @blue;
      //font-size: 120%;
    }
    // .el-form-item {
    //   margin-bottom: 20px;
    // }
    .el-form-item__error {
      color: red;
    }
    p {
      width: 60%;
      padding: 0 0 10px 0;
      button {
        width: 100%;
      }
    }
    .registerSkip {
      text-align: right;
      line-height: 40px;
      font-size: 12px;
      span {
        display: inline-block;
        margin-left: 5px;
        cursor: pointer;
        &:hover {
          color: #0d5196;
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
    width: 80%;
    padding: 10px 0;
    button {
      width: 100%;
    }
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
      color: #0d5196;
    }
  }
  ul {
    li {
      list-style-type: none;
      margin-bottom: 5px;
      .el-upload {
        width: 80px !important;
        height: 80px !important;
        overflow: hidden;
      }
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
    padding: 10px 0 10px 0px;
  }
  .upload-demo {
    width: 50%;
    display: inline-block;
    padding: 0;
  }
  .registerBtn {
    width: 75%;
    height: 32px;
  }
  .loginSkip {
    padding-right: 40px;
    margin-top: 20px;
    text-align: right;
    font-size: 12px;
    cursor: pointer;
  }
}
.register {
  position: absolute;
  //right: 10%;
  width: 35%;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 20px;
  box-shadow: 0 0 8px #000;
  padding-bottom: 30px;
  z-index: 4;
  .next {
    margin-top: 30px;
  }
  .el-form-item__error {
    color: red;
  }
  h2 {
    width: 100%;
    font-weight: 500;
    width: 80%;
    color: #fff;
    text-align: left;
    text-shadow: 1px 1px 2px #333;
    margin: 0 auto;
    line-height: 60px;
    font-size: 24px;
  }
  .el-form-item {
    text-align: left;
    margin-bottom: 16px;
    .el-upload--picture-card {
      width: 80px;
      height: 80px;
    }
    .el-dialog__headerbtn {
      top: 6px;
    }
  }
  .el-input {
    width: 50%;
    padding: 0;
  }
  .titleText {
    width: 100%;
    font-size: 12px;
    color: #fff;
    text-align: center;
    padding: 10px 0 10px 0px;
  }
  .upload-demo {
    width: 50%;
    display: inline-block;
    padding: 0;
  }
  .registerBtn {
    width: 75%;
    height: 32px;
  }
  .loginSkip {
    padding-right: 40px;
    margin-top: 20px;
    text-align: right;
    font-size: 12px;
    cursor: pointer;
  }
  .el-dialog__body {
    font-size: 0px;
  }
  .el-dialog__footer {
    padding-bottom: 10px !important;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .el-form-item__label{color:#fff}
}
</style>
