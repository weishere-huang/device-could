<template>
  <div class="persnnel-add">
    <div class="add-case">
      <div class="topbtn">
        <el-button size="small"
                   type="primary" @click="tback">返回</el-button>
        <el-button size="small"
                   type="primary" @click="employeeAdd">保存</el-button>
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
                  <el-radio v-model="persnneladd.gender" label="1">男</el-radio>
                  <el-radio v-model="persnneladd.gender" label="0">女</el-radio>
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
                <el-select v-model="persnneladd.organizeCode" placeholder="请选择" size="small" style="width:70%">
                  <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.code">
                  </el-option>

                </el-select>
              </li>
              <li>
                <label for="">入职时间：</label>
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy/MM/dd" v-model="persnneladd.entryTime"
                                size="small"  ></el-date-picker>
                <!-- <el-input type="date" size="small" v-model="persnneladd.entryTime"></el-input> -->
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
                <label for="">角色权限：</label>
                <el-select v-model="persnneladd.roleId" placeholder="请选择" size="small" style="width:70%">
                  <el-option v-for="item in role" :key="item.value" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <label for="">出生日期：</label>
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy/MM/dd" v-model="persnneladd.birthday"
                                size="small"  ></el-date-picker>
                <!-- <el-input type="date" size="small" v-model="persnneladd.birthday"></el-input> -->
              </li>
              <li>
                <label for="">岗位：</label>
                <el-input type="text" size="small" v-model="persnneladd.position"></el-input>
              </li>
              <li>
                <label for="">婚姻状况：</label>
                <span style="display: inline-block;width:70%;text-align: left;">
                  <el-radio v-model="persnneladd.marital" label="1">已婚</el-radio>
                  <el-radio v-model="persnneladd.marital" label="0">未婚</el-radio>
                </span>
              </li>

            </ul>
          </div>
        </div>
        <div class="more-msg">
          <p class="title">更多信息（选填）</p>
          <ul class="msg-box">
            <li class="detalis">
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
            <li class="detalis">
              <span>
                <label for="" style="letter-spacing:8px;">籍贯：</label>
                <el-input type="text" size="small" style="width:200px" v-model="persnneladd.nativePlace"></el-input>

              </span>
              <span style="display:inline-block;float:right;padding-right:123px">
                <label for="">国籍：</label>
                <el-input type="text" size="small" style="width:80px" v-model="persnneladd.nationality"></el-input>
              </span>
            </li>
            <li class="detalis">
              <label for="">电子邮箱：</label>
              <el-input type="email"  size="small" style="width:200px" v-model="persnneladd.email"></el-input>
            </li>
            <li class="detalis">
              <label for="">通讯地址：</label>
              <el-input type="text" size="small" style="width:200px" v-model="persnneladd.postalAddress"></el-input>
            </li>
            <li class="detalis">
              <span>
                <label for="">毕业学校：</label>
                <el-input type="text" size="small" style="width:200px" v-model="persnneladd.graduateSchool"></el-input>
              </span>
              <span style="display:inline-block;float:right;padding-right:100px">
                <label for="">最高学历：</label>
                <el-input type="text" size="small" style="width:80px" v-model="persnneladd.degree"></el-input>
              </span>
            </li>
            <li style="height:auto ;margin-top:10px;" class="detalis">
              <label for="" style="letter-spacing: 8px;">照片：</label>
              <el-upload
                style="display:inline-block;vertical-align:top"
                action="http://192.168.1.148:8081/upload"
                accept="image/jpeg,image/png"
                list-type="picture-card"
                :limit="1"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </li>
            <li style="height:auto;margin-top:20px;line-height:40px;" class="detalis">
              <label for="" style="letter-spacing: 8px;display:inline-block">资质：</label>
              <el-upload
                style="display:inline-block;line-height:30px;vertical-align:top"
                class="upload-demo"
                action="http://192.168.1.148:8081/upload"
                accept="
                 application/msword,
                 application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                 application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                 application/vnd.ms-excel,
                 application/vnd.ms-powerpoint,
                 application/vnd.openxmlformats-officedocument.presentationml.presentation,
                 application/pdf,
                 text/plain,
                 image/jpeg,
                 image/png"
                :on-preview="handlePreview1"
                :on-remove="handleRemove1"
                :before-upload="beforeAvatarUpload1"
                :before-remove="beforeRemove1"
                multiple
                :limit="10"
                :on-exceed="handleExceed1"
                :file-list="fileList">
                <el-button size="mini" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip" style="display:inline-block;margin-left:10px;">文件小于1MB(最多上传10个)</div>
              </el-upload>
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
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        dialogImageUrl: '',
        dialogVisible: false,
        date:new Date().toLocaleString().split(" ")[0].replace(/\//g, "-"),
        nameAndImg:[{name:"", img:""}],
        persnneladd: {
          employeeNo: "",
          name: "",
          gender: "1",
          birthday: "",
          phone: "",
          position: "",
          organizeCode:"",
          organizationName: "",
          enterpriseId:"",
          workType:"",
          entryTime: "",
          email: "",
          marital: "0",
          idCardNo: "",
          workingYears: "",
          height: "",
          nativePlace: "",
          nationality: "",
          postalAddress: "",
          graduateSchool: "",
          degree: "",
          img: "",
          qualificationInfo:"",
          roleId: ""
        },
        options: [],
        role: []
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.dialogImageUrl = file.response.data.split(":")[1];
        this.dialogImageUrl= "ftp://192.168.1.104/"+this.dialogImageUrl;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!(isJPG || isPNG)) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isJPG && isLt1M && isPNG;
      },
      beforeAvatarUpload1(file) {
        const isDOC = file.type === 'application/msword';
        const isDOCX = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        const isXLS = file.type === 'application/vnd.ms-excel';
        const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const isTXT = file.type === 'text/plain';
        const isPDF = file.type === 'application/pdf';
        const isPPT = file.type === 'application/vnd.ms-powerpoint';
        const isPPTX = file.type === 'aapplication/vnd.openxmlformats-officedocument.presentationml.presentation';
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;

        let isOk = true;
        if(!(isDOC || isDOCX || isXLS || isXLSX || isTXT || isPDF || isPPT || isPPTX || isJPG || isPNG ||isLt1M)){
          this.$message.error('文件格式不正确');
          isOk = false;
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isOk&& isLt1M;
      },
      handleRemove1(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview1(file) {
        console.log(file);
      },
      handleExceed1(files, fileList) {
        this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove1(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
        console.log(fileList);
      },
      handleRemove(file, fileList) {
        console.log(file);
        console.log(fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file);
        this.dialogVisible = true;
      },

      tback(){
        this.$router.back(-1)
      },
      organize(){
        this.Axios(
          {
            params:{},
            type: "get",
            url: "/organize/allOrganize",
          },
          this
        ).then(response => {
            this.options = response.data.data;
          },
          ({type, info}) => {
          })
      },
      codeToName(organizeCode){
        for (let i =0;i<this.options.length;i++){
          if(this.options[i].code === organizeCode){
            this.persnneladd.organizationName = this.options[i].name;
          }
        }
      },
      toEmployeeAdd() {
        this.persnneladd.birthday=this.persnneladd.birthday.replace(/-/g, "/");
        this.persnneladd.entryTime=this.persnneladd.entryTime.replace(/-/g, "/");
        let qs = require("qs");
        let data = qs.stringify({
          employeeNo: this.persnneladd.employeeNo,
          name:this.persnneladd.name,
          gender:this.persnneladd.gender,
          birthday:this.persnneladd.birthday,
          phone:this.persnneladd.phone,
          position:this.persnneladd.position,
          organizeCode:this.persnneladd.organizeCode,
          organizationName :this.persnneladd.organizationName,
          enterpriseId  :this.persnneladd.enterpriseId,
          workType:this.persnneladd.workType,
          entryTime:this.persnneladd.entryTime,
          email:this.persnneladd.email,
          marital:this.persnneladd.marital,
          idCardNo:this.persnneladd.idCardNo,
          workingYears:this.persnneladd.workingYears,
          height:this.persnneladd.height,
          nativePlace:this.persnneladd.nativePlace,
          nationality:this.persnneladd.nationality,
          postalAddress:this.persnneladd. postalAddress,
          graduateSchool:this.persnneladd. graduateSchool,
          degree:this.persnneladd.degree,
          img:this.dialogImageUrl,
          qualificationInfo:this.persnneladd.qualificationInfo,
          roleId:this.persnneladd.roleId
        });
        this.Axios(
          {
            params:data,
            type: "post",
            url: "/employee/add",
          },
          this
        ).then(response => {
            this.Personnel();
          },
          ({type, info}) => {
          })
      },
      Personnel() {
        this.$router.push({
          path: "/Personnel"
        });
      },

      testValue(){
        // let regEmail=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
        // if(this.persnneladd.email.test(" ")){
        //   if(!regEmail.test(this.persnneladd.email)){
        //     alert("邮箱格式不正确");
        //     return false;
        //   }
        // }
        if (this.persnneladd.name == ""){
          alert("员工名不能为空");
          return false;
        }
        if(this.persnneladd.employeeNo == ""){
          alert("员工编号不能为空");
          return false;
        }
        let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!regIdNo.test(this.persnneladd.idCardNo)){
          alert("身份证号填写有误");
          return false;
        }
        if (this.persnneladd.roleId == ""){
          alert("请选择角色权限");
          return false;
        }
        if(!(/^1[34578]\d{9}$/.test(this.persnneladd.phone))){
          alert("手机号码有误，请重填");
          return false;
        }
        if(this.persnneladd.birthday == ""){
          alert("请选择出生日期");
          return false;
        }
        if(this.persnneladd.organizationName == " "){
          alert("请选择组织机构");
          return false;
        }
        if(this.persnneladd.position==""){
          alert("请输入岗位");
          return false;
        }
        return true;
      },
      employeeAdd(){
        this.codeToName(this.persnneladd.organizeCode);
        if(this.testValue()){
          this.toEmployeeAdd()
        }
      }
    },
    created() {
      this.organize();
      this.Axios(
        {
          params:{},
          type: "get",
          url: "/role/listAllRole",
        },
        this
      ).then(response => {
          this.role = response.data.data;
          this.persnneladd.entryTime = this.date
        },
        ({type, info}) => {
        })
    }
  };
</script>

<style lang="less" >
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  .persnnel-add {
    // padding-left: 180px;
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
            width: auto;
            position: absolute;
            text-align: center;
            top: 3px;
            left: 32px;
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
            padding-top: 45px;
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
          // overflow: hidden;
          margin-top: 30px;
          padding-left: 20px;
          padding-bottom: 20px;
          .title {
            display: inline-block;
            width: auto;
            text-align: center;
            position: relative;
            top: -7px;
            left: 0px;
            background-color: white;
          }
          .msg-box{

            .detalis {
              list-style-type: none;
              height: 60px;
              line-height: 60px;
              .el-input {
                width: 70%;
              }
              .el-upload{
                // line-height: 30px;
                ul{
                  display: inline-block;
                }
              }
            }
          }

        }
      }
    }
  }

</style>
