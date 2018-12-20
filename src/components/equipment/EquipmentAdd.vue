<template>
  <div class="equipmentAdd">
    <div class="addCase">
      <div class="top">
        <el-row>
          <el-button  size="small" type="primary" @click="tback" icon="el-icon-arrow-left">返回</el-button>
          <el-button  size="small" type="primary" @click="addwarning"><i style='font-size:12px' class='iconfont'>&#xe645;</i> &nbsp;保存</el-button>
        </el-row>
      </div>
      <div class="center">
        <h5>基础信息</h5>
        <el-form ref="baseform" :model="sizeForm" label-width="80px" size="small" :rules="rules1" >
          <el-form-item label="设备编号" prop="deviceNo">
            <el-input v-model="sizeForm.deviceNo" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="sizeForm.deviceName" style="width:512px"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="defaultProps" >
            <el-cascader
              placeholder="搜索"
              :options="orgoptions"
              :props="defaultProps"
              expand-trigger="hover"
              filterable
              ref="getName"
              change-on-select
              :show-all-levels="false"
              v-model="ogrname"
               @change="handleChange"
              style="width:512px;"
            ></el-cascader>
          </el-form-item>
          <el-form :inline="true" style="padding-left:12px" size="small">
            <el-form-item label="设备分类" prop="ctg">
              <el-select v-model="sizeForm.deviceClassify" placeholder="点击选择" style="width:215px" @change="classf" ref="getclassfy">
                <el-option v-for="(item,index) in options2" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备类别" prop="clsfy">
              <el-cascader
                placeholder="搜索"
                :options="ctgoptions"
                filterable
                ref="getName2"
                expand-trigger="hover"
                :props="defaultProps2"
                change-on-select
                :show-all-levels="false"
                v-model="classfynm"
                @change="handleChange2"
                style="width:215px;"
              ></el-cascader>
            </el-form-item>
          </el-form>
          <el-form :inline="true" style="padding-left:12px" size="small">
            <el-form-item label="设备型号" prop="dxh">
              <el-input v-model="sizeForm.deviceModel" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item label="设备状况" prop="dzk">
              <el-select v-model="sizeForm.deviceState" placeholder="点击选择" style="width:215px">

                <el-option v-for="(item,index) in options4" :key="index" :label="item.label"
                           :value="item.value" @chenge="devstate"></el-option>

              </el-select>
            </el-form-item>
          </el-form>
          <el-form :inline="true" style="padding-left:12px" size="small">
            <el-form-item label="设备规格">
              <el-input v-model="sizeForm.deviceSpec" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item label="出厂日期">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy/MM/dd" v-model="sizeForm.outputDate"
                                style="width: 215px;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form>

          <el-form-item label="设备厂家">
            <el-input v-model="sizeForm.manufacturer" style="width:512px"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div class="administrator">
        <h5>管理人员</h5>
        <el-form :inline="true"  class="demo-form-inline" label-width="100px">
          <el-form-item label="负责人员：">
            <span v-if="devicePersonnelInfoBase.find(item=>item.workerType==='0')">
              <el-tag :style="{ margin: '0 5px' }" key='person.id' v-for="person in devicePersonnelInfoBase.find(item=>item.workerType==='0').content">
                {{person.workerName}}
              </el-tag>
            </span>
            <span v-else>
              （空）
            </span>
          </el-form-item>
          <el-form-item label="维修人员：">
            <span v-if="devicePersonnelInfoBase.find(item=>item.workerType==='1')">
              <el-tag :style="{ margin: '0 5px' }" key='person.id' v-for="person in devicePersonnelInfoBase.find(item=>item.workerType==='1').content">
                {{person.workerName}}
              </el-tag>
            </span>
            <span v-else>
              （空）
            </span>
          </el-form-item>
        </el-form>
        <el-form :inline="true"  class="demo-form-inline" label-width="100px">
          <el-form-item label="检修人员：">
            <span v-if="devicePersonnelInfoBase.find(item=>item.workerType==='2')">
              <el-tag :style="{ margin: '0 5px' }" key='person.id' v-for="person in devicePersonnelInfoBase.find(item=>item.workerType==='2').content">
                {{person.workerName}}
              </el-tag>
            </span>
            <span v-else>
              （空）
            </span>
          </el-form-item>
          <el-form-item label="保养人员：">
            <span v-if="devicePersonnelInfoBase.find(item=>item.workerType==='3')">
              <el-tag :style="{ margin: '0 5px' }" key='person.id' v-for="person in devicePersonnelInfoBase.find(item=>item.workerType==='3').content">
                {{person.workerName}}
              </el-tag>
            </span>
            <span v-else>
              （空）
            </span>
          </el-form-item>
        </el-form>
        <el-form :inline="true"  class="demo-form-inline" label-width="100px">
          <el-form-item label="操作人员：">
            <span v-if="devicePersonnelInfoBase.find(item=>item.workerType==='4')">
              <el-tag :style="{ margin: '0 5px' }" key='person.id' v-for="person in devicePersonnelInfoBase.find(item=>item.workerType==='4').content">
                {{person.workerName}}
              </el-tag>
            </span>
            <span v-else>
              （空）
            </span>
          </el-form-item>
          <el-form-item style="padding-left:20px">
            <el-button size="mini" type="primary" @click="dialogVisible=true" >添加人员</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom">
        <h5>其他信息</h5>

        <el-form :inline="true" style="padding-left:12px" size="small">
          <el-form-item label="安装位置">
            <el-input v-model="sizeForm.location" style="width:215px"></el-input>
          </el-form-item>
          <el-form-item label="设备位号">
            <el-input v-model="sizeForm.locationNo" style="width:215px"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" style="padding-left:12px" size="small">
          <el-form-item label="购买价格">
            <el-input v-model="sizeForm.buyPrice" style="width:215px" type="number"></el-input>
          </el-form-item>
          <el-form-item label="购买日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy/MM/dd" v-model="sizeForm.buyDate"
                              style="width: 215px;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="入厂日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy/MM/dd"
                              v-model="sizeForm.enterFactoryDate"
                              style="width: 215px;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <div style="padding:0 40px 0 12px;" class="upLoad">
          <span>相关资料：</span>
           <el-upload
                style="display:inline-block;vertical-align:top"
                class="upload-demo"
                ref="upload"
                :action="path()"
                :on-preview="handlePreview1"
                :on-remove="handleRemove1"
                :before-remove="beforeRemove1"
                multiple
                :limit="20"
                :on-exceed="handleExceed1"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :auto-upload="true"
                :file-list="fileList">
                <el-button size="mini" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip" style="display:inline-block;margin-left:10px;">只能上传不超过10M的文件,且不能超过20个文件</div>
              </el-upload>
        </div>
      </div>
    </div>
    <el-dialog
      title="人员添加"
      :visible.sync="dialogVisible"
      width="80%"
      >
      <addPerson :personAddHandler="personAddHandler"></addPerson>
    </el-dialog>
  </div>
</template>
<script>
  import addPerson from "./AddPerson";
  export default {
    inject: ["reload"],
    name: "",
    data() {
      return {
        upcode:"",
        fileList1: [],
        defaultProps:{
          value:"code",
          label:"name"
        },
        defaultProps2:{
          value:"categoryNo",
          label:"categoryName"
        },
        dialogVisible:false,
        addShow: false,
        ogrname:"",
        classfynm:"",
        sizeForm: {
          deviceNo: "",
          deviceName: "",
          organizeName: "",
          organizeCode: "",
          deviceClassify: "",
          deviceClassifyName: "",
          deviceSpec: "",
          outputDate: "",
          manufacturer: "",
          location: "",
          locationNo: "",
          buyPrice: "",
          buyDate: "",
          dataInfo: "",
          deviceCategory: "",
          deviceCategoryName: "",
          deviceModel: "",
          deviceState: "",
          enterFactoryDate: ""
        },
        options2: [
          {
            value: "1",
            label: "生产设备"
          },
          {
            value: "2",
            label: "非生产设备"
          },
          {
            value: "3",
            label: "辅助生产设备"
          },
          {
            value: "4",
            label: "检验检测设备"
          },
          {
            value: "5",
            label: "其他设备"
          },
        ],
        options4: [
          {
            value: "1",
            label: "在用"
          },
          {
            value: "2",
            label: "出租"
          },
          {
            value: "3",
            label: "停用"
          },
          {
            value: "4",
            label: "封存"
          },
          {
            value: "5",
            label: "报废"
          }
        ],

        orgoptions:[],
        ctgoptions:[],
        devicePersonnelInfoBase:[],
        dialogImageUrl:"",
        //表名baseform
        rules1:{
          //编号
          deviceNo:[
            {required: true, message: '请输入设备编号', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          deviceName:[
            {required: true, message: '请输入设备名称', trigger: 'blur'},
            {max:20,message:'设备名称过长'}
          ],
          // defaultProps:[
          //   {required: true, message: '请添加组织机构', trigger: 'blur'},
          // ]
        },
      };
    },
    methods: {
      path(){
        return this.global.apiImg;
      },
      beforeAvatarUpload(file){
        console.log("beforeAvatarUpload");
        console.log(file);
        const isLt10M = file.size/1024/1024<10;
        if(!isLt10M){
          this.$message.error('上传文件大小不能超过10MB!');
        }
      },
      handleAvatarSuccess(res, file) {
        // this.upcode = res.code;
        console.log(res);
        console.log("handleAvatarSuccess")
        console.log(file);
        this.fileList1.push({
          img:res.data,
          name:file.name
        })
        console.log(this.fileList);
      },
      handleRemove1(file, fileList) {
        console.log(file);
        console.log(fileList);
        console.log(this.fileList);
        this.fileList1.filter(item >= item.name !== file.name);
      },
      handlePreview1(file) {
        console.log(file);
      },
      handleExceed1(files, fileList) {
        this.$message.warning(`当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove1(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      classf(value){
        console.log(value);
        let obj = {};
        obj = this.options2.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.value === value;//筛选出匹配数据
        });
        console.log(obj.label);//我这边的name就是对应label的
        this.sizeForm.deviceClassifyName=obj.label;
      },
      handleChange(value) {
        let name=this.$refs['getName'].currentLabels
        name=name[(name.length)-1]
        let id=value[(value.length)-1]
        console.log(id,name);
        this.sizeForm.organizeCode=id;
        this.sizeForm.organizeName=name;

      },
      handleChange2(value) {
        let name=this.$refs['getName2'].currentLabels
        name=name[(name.length)-1]
        let id=value[(value.length)-1]
        console.log(id,name);
        console.log(value);

        this.sizeForm.deviceCategory=id;
        this.sizeForm.deviceCategoryName=name;
      },
      tback() {
        this.$router.back(-1);
      },
      addIsShow() {
        this.addShow = true;
      },
      isHide: function (params) {
        this.addShow = params;
      },
      add1() {
        //添加设备信息接口
        //上传文件
        let qs = require("qs");
        let _devicePersonnelInfo=[];
        this.devicePersonnelInfoBase.forEach(items => {
            _devicePersonnelInfo=_devicePersonnelInfo.concat(items.content.map(item=>{
              return {
              workerType: items.workerType,
              workerName: item.workerName,
              workerId: item.id,
              workerTypeName: items.workerTypeName
            }}));
        });
        console.log(_devicePersonnelInfo);
        if(this.fileList1 == null || this.fileList1.length===0  ){
          this.fileList1 = null
        }else{
          this.fileList1=JSON.stringify(this.fileList1);
        };
        let data = qs.stringify({
          deviceNo: this.sizeForm.deviceNo,
          deviceName: this.sizeForm.deviceName,
          deviceClassify: this.sizeForm.deviceClassify,
          deviceClassifyName: this.sizeForm.deviceClassifyName,
          deviceSpec: this.sizeForm.deviceSpec,
          organizeName: this.sizeForm.organizeName,
          organizeCode: this.sizeForm.organizeCode,
          deviceCategory: this.sizeForm.deviceCategory,
          deviceCategoryName: this.sizeForm.deviceCategoryName,
          outputDate: this.sizeForm.outputDate,
          manufacturer: this.sizeForm.manufacturer,
          location: this.sizeForm.location,
          // location: null,
          locationNo: this.sizeForm.locationNo,
          buyPrice: this.sizeForm.buyPrice * 100,
          buyDate: this.sizeForm.buyDate,
          dataInfo: this.sizeForm.dataInfo,
          deviceModel: this.sizeForm.deviceModel,
          deviceState: this.sizeForm.deviceState,
          enterFactoryDate: this.sizeForm.enterFactoryDate,
          deviceDataInfo: this.fileList1,
          devicePersonnelInfo:JSON.stringify(_devicePersonnelInfo)

          // deviceNo: this.sizeForm.deviceNo,
          // deviceName: this.sizeForm.deviceName,
          // organizeName: this.sizeForm.organizeName,
          // deviceClassify: this.sizeForm.deviceClassify,
          // deviceClassifyName: this.sizeForm.deviceClassifyName,
          // deviceSpec: this.sizeForm.deviceSpec,
          // // outputDate: this.sizeForm.outputDate,
          // manufacturer: this.sizeForm.manufacturer,
          // location: this.sizeForm.location,
          // locationNo: this.sizeForm.locationNo,
          // buyPrice: this.sizeForm.buyPrice,
          // // buyDate: this.sizeForm.buyDate,
          // deviceCategory: this.sizeForm.deviceCategory,
          // deviceCategoryName: this.sizeForm.deviceCategoryName,
          // deviceModel: this.sizeForm.deviceModel,
          // deviceState: this.sizeForm.deviceState,
          // // gmtModified: this.sizeForm.gmtModified,
          // organizeCode: this.sizeForm.organizeCode,
          // // enterFactoryDate: this.sizeForm.enterFactoryDate,
          // deviceDataInfo: JSON.stringify(this.sizeForm.deviceDataInfo),
          // devicePersonnelInfo: JSON.stringify(this.sizeForm.devicePersonnelInfo),
        });
        this.Axios({
          url: "/device/add",
          params: data,
          type: "post",
          // option: {
          //   enableMsg: false
          // }
        },this)
          .then(result => {
            console.log(result.data);

            if (result.data.code == 410) {
              this.$message.warning("该设备号已存在,请重新编辑!!!")
            } else if (result.data.code == 200) {
              console.log("add");
              console.log(result.data);
              this.$router.push("/Equipment");
            }
          },({type, info}) => {
          })
          // .catch(err => {
          //   console.log(err);
          // });
      },
      add2(){
        this.$refs.upload.submit();
        // let loadingInstance = Loading.service(options);
        // Loading.service(options);
        // if(this.upcode === 200 ){
        //   this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        //     loadingInstance.close();
        //   });
        // }
        const loading = this.$loading({
          lock: true,
          text: '正在上传文件',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        setTimeout(() => {
          loading.close();
          this.$message.warning("上传文件超时")
        }, 60000);
      },

      devstate(data){
        let obj = {};
        obj = this.options4.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.value === value;//筛选出匹配数据
        });
        console.log(obj.label);//我这边的name就是对应label的
        this.sizeForm.deviceState = data.value
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
      getparaentcode(data){
        let pcode;
        let tempcode = 50;
        for(let b in data){
          if(data[b].parentCode.length < tempcode){
            tempcode=data[b].parentCode.length;
            pcode=data[b].parentCode;
          }
        }
        return pcode;
      },
      filterArray2(data, parent) {
        //编辑设备类别数据为树状结构方法
        let vm = this;
        var tree = [];
        var temp;
        for (var i = 0; i < data.length; i++) {
          if (data[i].categoryParentNo == parent) {
            var obj = data[i];
            temp = this.filterArray2(data, data[i].categoryNo);
            if (temp.length > 0) {
              obj.children = temp;
            }
            tree.push(obj);
          }
        }
        return tree;
      },
      organdcls(){
        this.Axios(
          {
            url: ["/organize/allOrganize", "/deviceCategory/all"],
            type: ["get","get"],
            params:[{},{}]
          },
          this
        ).then(
          ([res1, res2]) => {
            this.orgoptions = this.filterArray(res1.data.data, this.getparaentcode(res1.data.data));
            this.ctgoptions= this.filterArray2(res2.data.data,0);
          },
          () => {}
        );
      },

      personAddHandler(data){
        console.log(data);
        this.devicePersonnelInfoBase=data;
        this.dialogVisible=false;
      },

      addwarning(){
        let subok = true;
        this.$refs['baseform'].validate((valid) => {
          if (valid) {
          } else {
            subok = false;
            return false;
          }
        });
        if(this.sizeForm.deviceClassify==="" || this.sizeForm.organizeCode === "" || this.sizeForm.deviceState === "" || this.sizeForm.deviceSpec === ""){
          subok = false;
        }
        console.log(this.sizeForm.deviceSpec === "");
        console.log(this.sizeForm.deviceClassify === "");
        console.log(this.sizeForm.organizeCode === "");
        console.log(this.sizeForm.deviceState === "");
        //判断人员
        if(!(this.devicePersonnelInfoBase.find(item=> item.workerType==='0') || this.devicePersonnelInfoBase.find(item=> item.workerType==='1') || this.devicePersonnelInfoBase.find(item=> item.workerType==='2') || this.devicePersonnelInfoBase.find(item=> item.workerType==='3'))){
          subok = false;
        }

        //如果提交通过, 则弹出提示框
        if(subok){
          this.$confirm('确认添加设备吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.add1();
            // this.add2();

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消保存'
            });
          });
        }else{
          this.$message.error("请完善设备信息");
        }

      },
    },
    created() {
      this.organdcls();
      // this.findAlldeviceClassify();
      // this.allOrganize();
      // console.log(this.options);
    },
    components: {
      addPerson
    }
  };
</script>
<style lang="less" scoped>
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  @border: 1px solid #dde2eb;
  .equipmentAdd {
    // padding-left: 180px;
    .addCase {
      padding: 10px;
      .top {
        padding: 10px;
        height: 60px;
      }
      .center {
        padding: 10px;
        width: 650px;
        border: @border;
        border-radius: 5px;
        position: relative;
        font-size: 14px;
        color: #606266;
        h5 {
          position: absolute;
          top: -5px;
          left: 23px;
          background-color: white;
        }
        .el-form-item {
          height: 30px;
        }
      }
      .administrator{
        width: 650px;
        padding: 10px;
        border: @border;
        border-radius: 5px;
        position: relative;
        margin-top: 20px;
        font-size: 14px;
        color: #606266;
        h5 {
          position: absolute;
          top: -5px;
          left: 23px;
          background-color: white;
        }
        .el-form-item {
          margin-bottom: 0px;
          width: 45%;
        }
      }
      .bottom {
        padding: 10px;
        width: 650px;
        border: @border;
        border-radius: 5px;
        margin-top: 20px;
        position: relative;
        font-size: 14px;
        color: #606266;
        h5 {
          position: absolute;
          top: -5px;
          left: 23px;
          background-color: white;
        }
        .staff {
          li {
            list-style-type: none;
            padding: 0 40px 0 10px;
            height: 30px;
            line-height: 30px;
            div:nth-child(1) {
              display: inline-block;
            }
            div:nth-child(2) {
              float: right;
              cursor: pointer;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
        .upLoad {
          span:nth-child(3) {
            color: #409eff;
            cursor: pointer;
            display: inline-block;
            float: right;
          }
        }
      }

    }

  }
</style>
