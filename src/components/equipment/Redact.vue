
<template>
  <div class="redact">
    <div class="addCase">
      <div class="top">
        <el-row>
          <el-button
            
            size="small"
            @click="tback"
            type="primary"
            icon="el-icon-arrow-left"
          >返回</el-button>
          <el-button
            
            size="small"
            type="primary"
            @click="updatewarning"
          >
          <i style='font-size:12px' class='iconfont'>&#xe645;</i> &nbsp;保存</el-button>
        </el-row>
      </div>
      <div class="center">
        <h5>基础信息</h5>
        <el-form
          ref="baseform"
          label-width="80px"
          size="small"
          :rules="rules1"
        >
          <el-form-item label="设备编号" prop="deviceNo">
            <el-input
              v-model="sizeForm.deviceNo"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备名称" prop="deviceName">
            <el-input
              v-model="sizeForm.deviceName"
              style="width:512px"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <span>{{sizeForm.organizeName}}</span>
            <el-button
              size="mini"
              type="primary"
              @click="dialogVisible1=true"
            >点击修改</el-button>
            <el-dialog
              title="修改部门"
              :visible.sync="dialogVisible1"
              width="300px"
              style="overflow: hidden;"
            >
            <el-col :span="24" style="text-align:center;">
              <el-cascader
                placeholder="请选择"
                :options="orgoptions"
                :props="defaultProps"
                expand-trigger="hover"
                filterable
                ref="getName"
                change-on-select
                :show-all-levels="false"
                v-model="qqqqq"
                @change="handleChange"
                style="padding:10px;width:90%"
              ></el-cascader>
            </el-col>
              <div style="text-align:right;padding:10px;">
                <el-button @click="dialogVisible1 = false;chengeOrgCode='';chengeOrgname=''">取 消</el-button>
              <el-button
                type="primary"
                @click="orgsave"
              >确 定</el-button>
              </div>
            </el-dialog>

          </el-form-item>
          <el-form
            :inline="true"
            style="padding-left:12px"
            size="small"
          >
            <el-form-item label="设备分类">
              <el-select
                v-model="sizeForm.deviceClassifyName"
                placeholder="点击选择"
                style="width:215px"
                @change="classf"
              >

                <el-option
                  v-for="(item,index) in options2"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="设备类别">
              <span>{{sizeForm.deviceCategoryName}}</span>
              <el-button
                size="mini"
                type="primary"
                @click="dialogVisible3=true"
              >点击修改</el-button>
              <el-dialog
                title="修改类别"
                :visible.sync="dialogVisible3"
                width="300px"
              >
                <el-col :span="24" style="text-align:center;">
                  <el-cascader
                      placeholder=""
                      :options="ctgoptions"
                      filterable
                      ref="getName2"
                      expand-trigger="hover"
                      :props="defaultProps2"
                      change-on-select
                      size="small"
                      :show-all-levels="false"
                      v-model="classfynm"
                      @change="handleChange2"
                      style="padding:10px;width:90%"
                    ></el-cascader>
                </el-col>
                  <div style="text-align:right;padding:10px;">
                   <el-button @click="dialogVisible3 = false;chengectg='';chengectgname=''" >取 消</el-button>
                    <el-button
                      type="primary"
                      @click="ctgsave"
                    >确 定</el-button>
                  </div>
              </el-dialog>
            </el-form-item>
          </el-form>
          <el-form
            :inline="true"
            style="padding-left:12px"
            size="small"
          >
            <el-form-item label="设备型号">
              <el-input
                v-model="sizeForm.deviceModel"
                style="width:215px"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备状况">
              <el-select
                v-model="sizeForm.deviceState"
                placeholder="点击选择"
                style="width:215px"
              >
                <el-option
                  v-for="(item,index) in options4"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  placeholder="请选择"
                ></el-option>

              </el-select>
            </el-form-item>
          </el-form>
          <el-form
            :inline="true"
            style="padding-left:12px"
            size="small"
          >
            <el-form-item label="设备规格">
              <el-input
                v-model="sizeForm.deviceSpec"
                style="width:215px"
              ></el-input>
            </el-form-item>
            <el-form-item label="出厂日期">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy/MM/dd"
                  v-model="sizeForm.outputDate"
                  style="width: 215px;"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form>

          <el-form-item label="设备厂家">
            <el-input
              v-model="sizeForm.manufacturer"
              style="width:512px"
            ></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div class="administrator">
        <h5>管理人员</h5>
        <el-form
          :inline="true"
          class="demo-form-inline"
          label-width="100px"
        >
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
        <el-form
          :inline="true"
          class="demo-form-inline"
          label-width="100px"
        >
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
        <el-form
          :inline="true"
          class="demo-form-inline"
          label-width="100px"
        >
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
            <el-button
              size="mini"
              type="primary"
              @click="dialogVisible=true"
            >添加人员</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom">
        <h5>其他信息</h5>
        <el-form
          :inline="true"
          style="padding-left:12px"
          size="small"
        >
          <el-form-item label="安装位置">
            <el-input
              v-model="sizeForm.location"
              style="width:215px"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备位号">
            <el-input
              v-model="sizeForm.locationNo"
              style="width:215px"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          style="padding-left:12px"
          size="small"
        >
          <el-form-item label="购买价格">
            <el-input
              v-model="sizeForm.buyPrice"
              style="width:215px"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="购买日期">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy/MM/dd"
                v-model="sizeForm.buyDate"
                style="width: 215px;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="入厂日期">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy/MM/dd"
                v-model="sizeForm.enterFactoryDate"
                style="width: 215px;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <el-col style="padding:5px 0;">
          <div
          style="padding:0 40px 0 12px;"
          class="upLoad"
        >
          <span>相关资料：</span>
          
          <span><el-upload
            style="display:inline-block;vertical-align:top"
            class="upload-demo"
            :action="path()"
            :on-preview="handlePreview1"
            :on-remove="handleRemove1"
            :before-remove="beforeRemove1"
            :on-success="handleAvatarSuccess"
            multiple
            :limit="20"
            :on-exceed="handleExceed1"
            :file-list="fileList">
                <el-button size="mini" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip" style="display:inline-block;margin-left:10px;">只能上传不超过1M的文件,且不能超过20个文件</div>
              </el-upload></span>
        </div>
        </el-col>
        
        <div style="padding:0 40px 0 12px;margin-top:16px;">
          <span>运维记录：</span>
          <span>查看</span>
        </div>
      </div>
    </div>
    <el-dialog
      title="人员添加"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <addperson :personAddHandler="personAddHandler" v-on:personData="personData"> </addperson>
    </el-dialog>
  </div>
</template>
<script>
import addperson from "./RedactAdd";
export default {
  inject: ["reload"],
  data() {
    return {
      fileList:[],
      fileList1:[],
      qqqqq: "",
      dialogVisible3: false,
      dialogVisible1: false,
      dialogVisible: false,
      addp: false,
      sizeForm: {
        deviceNo: "",
        deviceName: "",
        organizeName: "",
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
        organizeCode: "",
        enterFactoryDate: ""
      },
      // defaultProps:{
      //   value:"organizeCode",
      //   label:"organizeName"
      // },
      defaultProps2: {
        value: "categoryNo",
        label: "categoryName"
      },
      defaultProps: {
        value: "code",
        label: "name"
      },
      urlid: "",
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
        }
      ],
      options4: [
        {
          value: 1,
          label: "在用"
        },
        {
          value:2,
          label: "出租"
        },
        {
          value: 3,
          label: "停用"
        },
        {
          value: 4,
          label: "封存"
        },
        {
          value: 5,
          label: "报废"
        }
      ],
      ogrname: "",
      classfynm: "",
      orgoptions: [],
      ctgoptions: [],
      //解除双向绑定
      chengeOrgCode:"",
      chengeOrgname:"",

      chengectg:"",
      chengectgname:"",
      devicePersonnelInfoBase:[],

      editableTabs: [
        {
          workerTypeName: "负责人员",
          workerType: '0',
          content: []
        },
        {
          workerTypeName: "维修人员",
          workerType: '1',
          content: []
        },
        {
          workerTypeName: "检修人员",
          workerType: '2',
          content: []
        },
        {
          workerTypeName: "保养人员",
          workerType: '3',
          content: []
        },
        {
          workerTypeName: "操作人员",
          workerType: '4',
          content: []
        }
      ],
      personAddHandler:"",
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
  components: {
    addperson
  },
  methods: {
    personData(params){
      this.devicePersonnelInfoBase=params.data
      this.dialogVisible=params.isHide
    },
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
      console.log(this.fileList);
      this.fileList1.push({
        img:res.data,
        name:file.name
      })
      console.log(this.fileList);

    },
    handleRemove1(file, fileList) {
      console.log(file);
      console.log(fileList);
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
    handleChange(value) {
      let name = this.$refs["getName"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      console.log(id, name);
      this.chengeOrgCode = id;
      this.chengeOrgname = name;
      // this.sizeForm.organizeCode = id;
      // this.sizeForm.organizeName =this.chengeOrgname name;
    },
    handleChange2(value) {
      let name = this.$refs["getName2"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      console.log(id, name);
      this.chengectg=id;
      this.chengectgname=name;
      // this.sizeForm.deviceCategory = id;
      // this.sizeForm.deviceCategoryName = name;
    },
    classf(value) {
      console.log(value);
      let obj = {};
      obj = this.options2.find(item => {
        return item.value === value;
      });
      console.log(obj.label);
      this.sizeForm.deviceClassifyName = obj.label;
    },
    tback() {
      this.$router.back(-1);
    },
    isHide: function(params) {
      this.addp = params;
    },
    addIsShow() {
      this.addp = true;
    },
    update() {
      //编辑设备信息接口
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
      let data = {
        //sizeForm: JSON.stringify(this.sizeForm),21
        id: this.urlid,
        deviceNo: this.sizeForm.deviceNo,
        deviceName: this.sizeForm.deviceName,
        organizeName: this.sizeForm.organizeName,
        deviceClassify: this.sizeForm.deviceClassify,
        deviceClassifyName: this.sizeForm.deviceClassifyName,
        deviceSpec: this.sizeForm.deviceSpec,
        manufacturer: this.sizeForm.manufacturer,
        location: this.sizeForm.location,
        locationNo: this.sizeForm.locationNo,
        buyPrice: this.sizeForm.buyPrice*100,
        deviceCategory: this.sizeForm.deviceCategory,
        deviceCategoryName: this.sizeForm.deviceCategoryName,
        deviceModel: this.sizeForm.deviceModel,
        deviceState: this.sizeForm.deviceState,
        organizeCode: this.sizeForm.organizeCode,
         // devicePersonnelInfo: JSON.stringify(this.sizeForm.devicePersonnelInfo)
        devicePersonnelInfo: JSON.stringify(_devicePersonnelInfo)
      };

      if(this.fileList1.length > 0){
        data.deviceDataInfo=JSON.stringify(this.fileList1);
      }
      if(this.sizeForm.outputDate.length !== 0 )  {
        data.outputDate = this.sizeForm.outputDate;
      }
      if(this.sizeForm.buyDate.length !== 0){
        data.buyDate = this.sizeForm.buyDate;
      }
      if(this.sizeForm.enterFactoryDate.length !== 0){
        data.enterFactoryDate = this.sizeForm.enterFactoryDate;
      }
      data=qs.stringify(data);
      this.Axios(
        {
          url: "/device/update",
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      )
        .then(
          result => {
            if (result.data.code == 200) {
              console.log(result);
              console.log("update");
              console.log(result.data);
              this.$router.push("/Equipment");
            } else if (result.data.code == 410) {
              this.fileList1= JSON.parse(this.fileList1);
              this.$message.warning("该设备编号以存在,请修改!!!");
            }else{
              this.fileList1= JSON.parse(this.fileList1);
            }
          },
          ({ type, info }) => {

          }
        );

    },

    jsontoarr(data){
      //把查出来的人员json数据转换为数组
      var jsonObj =  JSON.parse(data)
      var jsonStr1 = JSON.stringify(jsonObj)
      var jsonArr = [];
      for(var i =0 ;i < jsonObj.length;i++){
        jsonArr[i] = jsonObj[i];
      }
      this.arrrrrrr(jsonArr);
    },
    arrrrrrr(data){
      let newarrr= new Array();
      newarrr =this.editableTabs;
      for(let i=0;i<data.length;i++){
        if(data[i].workerType === 0){
          newarrr[0].content.push({
              id:data[i].workerId,
              workerName:data[i].workerName
            })
        }
        if(data[i].workerType === 1){
          newarrr[1].content.push({
              id:data[i].workerId,
              workerName:data[i].workerName
            })
        }
        if(data[i].workerType === 2){
          newarrr[2].content.push({
              id:data[i].workerId,
              workerName:data[i].workerName
            })
        }
        if(data[i].workerType === 3){
          newarrr[3].content.push({
              id:data[i].workerId,
              workerName:data[i].workerName
            })
        }
        if(data[i].workerType === 4){
          newarrr[4].content.push({
              id:data[i].workerId,
              workerName:data[i].workerName
            })
        }
      }
      this.devicePersonnelInfoBase = newarrr ;
    },

    detail(id) {
      //获取设备详情接口
      this.Axios(
        {
          params: {
            deviceId: id
          },
          type: "get",
          url: "/device/detail"
        },
        this
      )
        .then(result => {
          console.log("detail");
          console.log(result.data);
          this.sizeForm = result.data.data;
          this.sizeForm.buyPrice = parseInt(this.sizeForm.buyPrice)/100;
          this.placeholder=this.sizeForm.organizeName;
          if (this.sizeForm.buyDate != null) {
            this.sizeForm.buyDate = this.sizeForm.buyDate.replace(/-/g, "/");
          }
          if (this.sizeForm.enterFactoryDate != null) {
            this.sizeForm.enterFactoryDate = this.sizeForm.enterFactoryDate.replace(/-/g, "/");
          }
          if (this.sizeForm.outputDate != null) {
            this.sizeForm.outputDate = this.sizeForm.outputDate.replace(/-/g, "/");
          }

            this.jsontoarr(result.data.data.devicePersonnelInfo);
            //this.aaaa.value = this.sizeForm.deviceState;
          this.personAddHandler = this.devicePersonnelInfoBase;

          this.fileList = JSON.parse(result.data.data.deviceDataInfo);
          this.fileList1 = JSON.parse(result.data.data.deviceDataInfo);

          console.log(this.fileList);
          console.log(this.fileList1);
          console.log("---------------");
        },
          ({type, info}) => {

          }
        );

    },
    personAddHandler(data){
      console.log(data);
      this.devicePersonnelInfoBase=data;
      this.dialogVisible=false;
      console.log(data);
    },
    updatewarning(){
      let subok = true;
      this.$refs['baseform'].validate((valid) => {
        if (valid) {
        } else {
          subok = false;
          return false;
        }
      });
      //判断人员
      if(!(this.devicePersonnelInfoBase.find(item=> item.workerType==='0') || this.devicePersonnelInfoBase.find(item=> item.workerType==='1') || this.devicePersonnelInfoBase.find(item=> item.workerType==='2') || this.devicePersonnelInfoBase.find(item=> item.workerType==='3'))){
        subok = false;
      }
      if(this.sizeForm.deviceClassify==="" || this.sizeForm.organizeCode === "" || this.sizeForm.deviceState === "" || this.sizeForm.deviceSpec===""){
        subok = false;
      }
      if(subok){
        this.$confirm('确定要修改吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.update();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }else{
        this.$message.warning("请完善设备信息");
      }

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

    orgsave(){
      this.dialogVisible1 = false ;
      this.sizeForm.organizeCode=this.chengeOrgCode ;
      this.sizeForm.organizeName=this.chengeOrgname
    },
    ctgsave(){
      this.dialogVisible3 = false;
      this.sizeForm.deviceCategory=this.chengectg;
      this.sizeForm.deviceCategoryName=this.chengectgname
    },
  },
  created() {
    this.urlid = this.$route.params.id;
    this.detail(this.urlid);
    console.log("letid:" + this.urlid);
    this.organdcls();
  }
};
</script>
<style lang="less" >
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.redact {
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
    .administrator {
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
         
        }
      }
    }
  }
  .el-cascader__label{
    top:10px !important;
  }
}
</style>
