<template>
    <div class="persnnel-add">
        <div class="add-case">
            <div class="topbtn">
                <el-button size="small">返回</el-button>
                <el-button size="small" @click="employeeAdd">保存</el-button>
            </div>
            <div class="botton">
                <div class="essential">
                    <p class="title">基本信息（必填）</p>
                    <div class="left">
                        <ul>
                            <li>
                                <label for=""><span style="letter-spacing: 10px;">姓名</span>：</label>
                                <el-input type="text" size="small" v-model="persnneladd.name"></el-input>
                            </li>
                            <li>
                                <label for=""><span style="letter-spacing: 10px;">性别</span>：</label>
                                <span style="display: inline-block;width:70%;text-align: left;">
                                    <el-radio v-model="persnneladd.gender" label="男">男</el-radio>
                                    <el-radio v-model="persnneladd.gender" label="女">女</el-radio>
                                </span>
                            </li>
                            <li>
                                <label for="">员工编号：</label>
                                <el-input type="text" size="small" v-model="persnneladd.employeeNo"></el-input>
                            </li>
                            <li>
                                <label for="">手机号码：</label>
                                <el-input type="text" size="small" v-model="persnneladd.phone"></el-input>
                            </li>
                            <li>
                                <label for="">组织单位：</label>
                                <el-select v-model="persnneladd.organizationName" placeholder="请选择" size="small" style="width:70%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>

                                </el-select>
                            </li>
                            <li>
                                <label for="">入职时间：</label>
                                <el-input type="date" size="small" v-model="persnneladd.entryTime"></el-input>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <ul>
                            <li>
                                <label for="">身份证：</label>
                                <el-input type="text" size="small" v-model="persnneladd.idCardNo"></el-input>
                            </li>
                            <li>
                                <label for="">出生日期：</label>
                                <el-input type="date" size="small" v-model="persnneladd.birthday"></el-input>
                            </li>
                            <li>
                                <label for="">岗位：</label>
                                <el-input type="text" size="small" v-model="persnneladd.position"></el-input>
                            </li>
                            <li>
                                <label for="">婚姻状况：</label>
                                <span style="display: inline-block;width:70%;text-align: left;">
                                    <el-radio v-model="persnneladd.marital" label="已婚">已婚</el-radio>
                                    <el-radio v-model="persnneladd.marital" label="未婚">未婚</el-radio>
                                </span>

                            </li>
                        </ul>
                    </div>
                </div>
                <div class="more-msg">
                    <p class="title">更多信息（选填）</p>
                    <ul>
                        <li>
                            <span>
                                <label for="">工作年限：</label>
                                <el-input type="text" size="small" style="width:80px" v-model="persnneladd.workingYears"></el-input>
                                年
                            </span>
                            <span style="display:inline-block;float:right;padding-right:100px">
                                <label for="">身高：</label>
                                <el-input type="text" size="small" style="width:80px" v-model="persnneladd.height"></el-input>
                                CM
                            </span>
                        </li>
                        <li>
                            <span>
                                <label for="" style="letter-spacing:8px;">籍贯：</label>
                                <el-input type="text" size="small" style="width:250px" v-model="persnneladd.nativePlace"></el-input>

                            </span>
                            <span style="display:inline-block;float:right;padding-right:102px">
                                <label for="">国籍：</label>
                                <el-input type="text" size="small" style="width:100px" v-model="persnneladd.nationality"></el-input>
                            </span>
                        </li>
                        <li>
                            <label for="">电子邮箱：</label>
                            <el-input type="email" size="small" style="width:300px" v-model="persnneladd.email"></el-input>
                        </li>
                        <li>
                            <label for="">通讯地址：</label>
                            <el-input type="email" size="small" style="width:300px" v-model="persnneladd.postalAddress"></el-input>
                        </li>
                        <li>
                            <span>
                                <label for="">毕业学校：</label>
                                <el-input type="text" size="small" style="width:200px" v-model="persnneladd.graduateSchool"></el-input>

                            </span>
                            <span style="display:inline-block;float:right;padding-right:100px">
                                <label for="">最高学历：</label>
                                <el-input type="text" size="small" style="width:80px" v-model="persnneladd.degree"></el-input>
                            </span>
                        </li>
                        <li>
                            <label for="" style="letter-spacing: 8px;">照片：</label>
                            <el-input type="text" size="small" placeholder="1寸照片电子版" style="width:50%"></el-input>
                            <el-button size="small">点击上传</el-button>
                        </li>
                        <li>
                            <label for="" style="letter-spacing: 8px;">资质：</label>
                            <el-button size="small" @click="open6()">点击上传</el-button>
                        </li>
                    </ul>
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
      persnneladd: {
        name: "",
        gender: "",
        employeeNo: "",
        idCardNo: "",
        phone: "",
        birthday: "",
        organizationName: "",
        position: "",
        entryTime: "",
        marital: "",
        workingYears: "",
        height: "",
        nativePlace: "",
        nationality: "",
        postalAddress: "",
        email: "",
        graduateSchool: "",
        degree: "",
        img: ""
      },
      options: [
        {
          value: "四川长虹电器有限公司",
          label: "四川长虹电器有限公司"
        },
        {
          value: "四川长虹智能制造有限公司",
          label: "四川长虹智能制造有限公司"
        },
        {
          value: "长虹网络科技有限公司",
          label: "长虹网络科技有限公司"
        },
        {
          value: "长虹电子系统有限公司",
          label: "长虹电子系统有限公司"
        }
      ]
    };
  },
  methods: {
    employeeAdd(){
      let qs = require("qs");
      let employee = qs.stringify({
        name:this.persnneladd.name,
        gender: this.persnneladd.gender,
        employeeNo: this.persnneladd.employeeNo,
        phone: this.persnneladd.phone,
        birthday:this.persnneladd.birthday,
        organizationName:this.persnneladd.organizationName,
        position:this.persnneladd.position,
        entryTime:this.persnneladd.entryTime,
        email: this.persnneladd.email
      });
      let employeeInfo = qs.stringify({
        idCardNo:this.persnneladd.idCardNo,
        marital:this.persnneladd.marital,
        workingYears:this.persnneladd.workingYears,
        height:this.persnneladd.height,
        nativePlace:this.persnneladd.nativePlace,
        nationality:this.persnneladd.nationality,
        postalAddress:this.persnneladd.postalAddress,
        graduateSchool:this.persnneladd.graduateSchool,
        degree:this.persnneladd.degree,
        img:this.persnneladd.img
      });
      axios
        .post("/api/employee/add", employee,employeeInfo)
        .then(response => {
          console.log(response.data.data.content)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    open6() {
      let str = `<div>
            <input type="text">文件名
            <input type="file" :v-model="persnneladd.img">
        </div>`;
      this.$confirm(str, "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "放弃修改",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "保存修改"
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
          });
        });
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
.persnnel-add {
  padding-left: 180px;
  .add-case {
    padding: 10px;
    .topbtn {
      padding-left: 10px;
      height: 60px;
      line-height: 60px;
      //   border: 1px solid @Info;
      border-radius: 5px;
    }
    .botton {
      font-size: 12px;
      margin-top: 10px;
      //   border: 1px solid @Info;
      border-radius: 5px;
      padding: 10px 0 0 10px;
      position: relative;
      .essential {
        width: 600px;
        border: 1px solid @Info;
        border-radius: 5px;
        overflow: hidden;
        .title {
          display: inline-block;
          width: 110px;
          position: absolute;
          text-align: center;
          top: 0%;
          left: 2.5%;
          background-color: white;
        }
        .left {
          width: 45%;
          text-align: right;
          float: left;
          li {
            list-style-type: none;
            height: 60px;
            line-height: 60px;
            .el-input {
              width: 70%;
            }
          }
        }
        .right {
          width: 45%;
          text-align: right;
          float: left;
          padding-top: 120px;
          padding-left: 20px;
          //   border: 1px solid red;

          li {
            list-style-type: none;
            height: 60px;
            line-height: 60px;
          }
          .el-input {
            width: 70%;
          }
        }
      }
      .more-msg {
        width: 600px;
        border: 1px solid @Info;
        border-radius: 5px;
        overflow: hidden;
        margin-top: 30px;
        padding-left: 20px;
        .title {
          display: inline-block;
          width: 110px;
          text-align: center;
          position: absolute;
          top: 48%;
          left: 2.5%;
          background-color: white;
        }
        li {
          list-style-type: none;
          height: 60px;
          line-height: 60px;
          .el-input {
            width: 70%;
          }
        }
      }
    }
  }
}
</style>
