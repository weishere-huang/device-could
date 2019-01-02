<template>
  <div class="persnnel-add">
    <div class="add-case">
      <div class="topbtn">
        <el-button size="small"
                   type="primary" @click="tback" icon="el-icon-arrow-left">返回</el-button>
        <el-button size="small"
                   type="primary" @click="employeeAdd('persnnelAdd')" >
          <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</el-button>
      </div>
      <div class="botton">
        <div class="essential">
          <p class="title">基本信息（必填）</p>
          <el-form :label-position="labelPosition"  ref="persnnelAdd" :model="persnneladd" :rules="personValidate" label-width="100px" style="width:100%;margin-top:26px"  size="mini">
            <el-col :span="14">
              <el-form-item label="姓名：" prop="name" style="">
                <el-input type="text" style="width:70%" v-model="persnneladd.name" ref="name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="性别：" style="">
                <el-radio v-model="persnneladd.gender" label="1">男</el-radio>
                <el-radio v-model="persnneladd.gender" label="0">女</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="身份证：" prop="idCardNo" style="">
                <el-input type="text"   v-model="persnneladd.idCardNo"  ref="idCardNo" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="员工编号：" prop="employeeNo" style="">
                <el-input type="text" ref="employeeNo" v-model="persnneladd.employeeNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="角色权限：" prop="roleId" style="">
                <el-select v-model="persnneladd.roleId" placeholder="请选择" style="width:100%">
                  <el-option v-for="item in role" :key="item.value" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号码：" prop="phone" style="">
                <el-input type="text" ref="phone"  v-model="persnneladd.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="出生日期：" prop="birthday" style="">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy/MM/dd" v-model="persnneladd.birthday"
                                style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="组织单位：" prop="defaultProps" >
                <el-cascader
                  placeholder="搜索"
                  :options="options"
                  :props="defaultProps"
                  expand-trigger="hover"
                  filterable
                  ref="getName"
                  change-on-select
                  :show-all-levels="false"
                  v-model="ogrname"
                  @change="handleChange"
                  style="width:100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="岗位：" prop="position" style="">
                <el-input type="text"  v-model="persnneladd.position" ref="position"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="入职时间：" prop="entryTime" style="">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy/MM/dd" v-model="persnneladd.entryTime"
                                style="width:100%"         ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="婚姻状况：" prop="marital" style="">
                <el-radio v-model="persnneladd.marital" label="1">已婚</el-radio>
                <el-radio v-model="persnneladd.marital" label="0">未婚</el-radio>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="more-msg">
          <p class="title">更多信息（选填）</p>
          <div style="overflow: hidden;">
            <el-form :label-position="labelPosition" ref="persnneladd" :model="persnneladd" :rules="personValidate"  label-width="100px" style="width:100%;margin-top:26px"  size="mini">
              <el-col :span="11">
                <el-form-item label="工作年限：">
                  <el-input type="text" style="width:50%" v-model="persnneladd.workingYears"></el-input>&nbsp;年
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="身高：">
                  <el-input type="text" style="width:50%" v-model="persnneladd.height"></el-input>&nbsp;CM
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="籍贯：">
                  <el-input type="text"  v-model="persnneladd.nativePlace"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="国籍：">
                  <el-input type="text" style="width:50%" v-model="persnneladd.nationality"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="电子邮箱：" prop="email">
                  <el-input type="text"  v-model="persnneladd.email"  ref="email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="通讯地址：">
                  <el-input type="text"  v-model="persnneladd.postalAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="毕业学校：">
                  <el-input type="text"  v-model="persnneladd.graduateSchool"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="最高学历：">
                  <el-input type="text" style="width:50%" v-model="persnneladd.degree"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="照片：">
                  <el-upload
                    style="display:inline-block;vertical-align:top"
                    :action="path()"
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
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="资质：">
                  <el-upload
                    style="display:inline-block;line-height:30px;vertical-align:top"
                    class="upload-demo"
                    :action="path()"
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
                    :on-success="handleSuccess"
                    :limit="10"
                    :on-exceed="handleExceed1"
                    :file-list="fileList">
                    <el-button size="mini" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip" style="display:inline-block;margin-left:10px;">文件小于1MB(最多上传10个)</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
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
        ogrname:"",
        labelPosition:"right",
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        date:new Date().toLocaleString().split(" ")[0].replace(/\//g, "-"),
        nameAndImg:[{name:"", img:""}],
        persnneladd: {
          userName:"",
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
        personValidate:{
          name: [
            {required: true, message: "员工姓名不能为空",  trigger: "blur",focus},
            {
              validator: (rule, value, callback) => {
                let nameValue=/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
                if (nameValue.test(value)) {
                  this.$refs.name.focus();
                  callback(new Error("请输入正确的员工姓名"));
                } else {
                  let pinyin = require("pinyin");
                  this.persnneladd.userName =pinyin(this.persnneladd.name,{style:pinyin.STYLE_NORMAL}) ;
                  this.persnneladd.userName = this.persnneladd.userName.toString().replace(/,/g,"");
                  callback();
                }
              },
              trigger: "blur"
            },
          ],
          idCardNo: [
            {required: true, message: "身份证号不能为空", trigger: "blur"},
            {
              validator: (rule, value, callback) => {
                let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!regIdNo.test(value)) {
                  this.$refs.idCardNo.focus();
                  callback(new Error("身份证号填写有误"));
                } else {
                  callback();
                  let date = this.persnneladd.idCardNo;
                  this.persnneladd.birthday = date.substr(6,4)+"-"+date.substr(10,2)+"-"+date.substr(12,2);
                  date.substr(16,1)%2===0 ? this.persnneladd.gender = "0": this.persnneladd.gender = "1";
                }
              },
              trigger: "blur"
            },
          ],
          employeeNo: [{required: true, message: "员工编号不能为空", trigger: "blur"}],
          roleId:[{required: true, message: "角色权限不能为空", trigger: "blur"}],
          phone:[{required: true, message: "手机号码不能为空", trigger: "blur"},
            {
              validator: (rule, value, callback) => {
                if (!(/^1[0-9]\d{9}$/.test(this.persnneladd.phone))) {
                  callback(new Error("手机号码有误"));
                  this.$refs.phone.focus();
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }],
          birthday:[{required: true, message: "请选择出生日期", trigger: "blur"}],
          position:[{required: true, message: "岗位不能为空", trigger: "blur"}],
          entryTime:[{required: true, message: "入职日期不能为空", trigger: "blur"}],
          marital:[{required: true, message: "婚姻状况不能为空", trigger: "blur"}],
          email:[{
            validator: (rule, value, callback) => {
              let regEmail= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
              if(value!=="") {
                if (!regEmail.test(this.persnneladd.email)) {
                  callback(new Error("请输入正确的邮箱"));
                  this.$refs.email.focus();
                }else{
                  callback();
                }
              }else {
                callback();
              }
            },
            trigger: "blur"
          }],
        },
        options: [],
        role: [],
        defaultProps: {
          value: "code",
          label: "name"
        },
        validateIsOk:true,
      };
    },
    methods: {
      path(){
        return this.global.apiImg;
      },
      handleChange(value) {
        let name = this.$refs["getName"].currentLabels;
        name = name[name.length - 1];
        let id = value[value.length - 1];
        this.persnneladd.organizeCode = id;
        this.persnneladd.organizationName = name;
      },
      handleAvatarSuccess(res, file) {
        this.$message.success('图片成功上传');
        this.dialogImageUrl= file.response.data;
        // console.log(this.dialogImageUrl);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;

        let isOk = true;
        if (!(isJPG || isPNG)) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
          isOk = false;
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isOk && isLt1M ;
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
          this.$message.error('上传的文件不能大于 1MB!');
        }

        return isOk && isLt1M;
      },
      handleRemove1(file, fileList) {
        this.fileList = this.fileList.filter(item=>item.name!==file.name);
      },
      handlePreview1(file) {
        // console.log(file);
      },
      handleExceed1(files,fileList) {
        this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove1(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);

      },
      handleRemove(file, fileList) {
        this.dialogImageUrl=fileList;
        // console.log(file);
        // console.log(fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(res, file,fileList){
        this.$message.success('文件成功上传');
        if(fileList.length>=1){
          this.fileList.push({
            img:fileList[fileList.length-1].response.data,
            name:fileList[fileList.length-1].name
          });
        }
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
          let code = Math.min.apply(null, (response.data.data).map((item)=>{return item.code}));
          this.options = this.filterArray(response.data.data,code);
          },
          ({type, info}) => {
          })
      },
      filterArray(data, parent) {
        //编辑组织机构数据为树状结构方法
        let vm = this;
        var tree = [];
        var temp;
        for (var i = 0; i < data.length; i++) {
          if (data[i].parentCode == parent) {
            var obj = data[i];
            temp = this.filterArray(data, data[i].code);
            if (temp.length > 0) {
              obj.children = temp;
            }
            tree.push(obj);
          }
        }
        return tree;
      },
      employeeAdd(formName){
        if(this.persnneladd.organizationName === ""){
          this.$message.error("请选择组织机构");
        }else {
          this.$refs[formName].validate(valid => {
            valid ? this.toEmployeeAdd() :  this.$message.error("请填写完信息");
          });
        }
      },
      toEmployeeAdd() {
        let file = [];
        for(let i in this.fileList){
          file.push({
            name:this.fileList[i].name,
            img:this.fileList[i].img,
          })
        }
        this.persnneladd.birthday=this.persnneladd.birthday.replace(/-/g, "/");
        this.persnneladd.entryTime=this.persnneladd.entryTime.replace(/-/g, "/");
        let qs = require("qs");
        let data = qs.stringify({
          userName:this.persnneladd.userName,
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
          qualificationInfo:JSON.stringify(file),
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
        this.$store.commit("personnel","y")
      },
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
          this.persnneladd.entryTime = this.date;
          this.persnneladd.birthday = parseInt(this.date.split("-")[0])-30+"-01-01";
        },
        ({type, info}) => {
        });
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

          padding-bottom: 20px;
          .title {
            display: inline-block;
            width: auto;
            text-align: center;
            position: relative;
            top: -7px;
            left: 20px;
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
