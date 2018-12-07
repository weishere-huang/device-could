
<template>
  <div class="redact">
    <div class="addCase">
      <div class="top">
        <el-row>
          <el-button
            plain
            size="small"
            @click="tback"
          >返回</el-button>
          <el-button
            plain
            size="small"
            @click="updatewarning"
          >保存</el-button>
        </el-row>
      </div>
      <div class="center">
        <h5>基础信息</h5>
        <el-form
          ref="form"
          label-width="80px"
          size="small"
        >
          <el-form-item label="设备编号">
            <el-input
              v-model="sizeForm.deviceNo"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input
              v-model="sizeForm.deviceName"
              style="width:512px"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <span>{{sizeForm.organizeName}}</span>
            <el-button
              size="mini"
              @click="dialogVisible1=true"
            >点击修改</el-button>
            <el-dialog
              title="修改部门"
              :visible.sync="dialogVisible1"
              width="30%"
            >
              <el-cascader
                placeholder="placeholder1"
                :options="orgoptions"
                :props="defaultProps"
                expand-trigger="hover"
                filterable
                ref="getName"
                change-on-select
                :show-all-levels="false"
                v-model="qqqqq"
                @change="handleChange"
                style="padding:10px;"
              ></el-cascader>
              <el-button @click="dialogVisible1 = false;chengeOrgCode='';chengeOrgname=''">取 消</el-button>
              <el-button
                type="primary"
                @click="orgsave"
              >确 定</el-button>

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
                @click="dialogVisible3=true"
              >点击修改</el-button>
              <el-dialog
                title="修改类别"
                :visible.sync="dialogVisible3"
                width="30%"
              >
                <el-cascader
                  placeholder=""
                  :options="ctgoptions"
                  filterable
                  ref="getName2"
                  expand-trigger="hover"
                  :props="defaultProps2"
                  change-on-select
                  :show-all-levels="false"
                  v-model="classfynm"
                  @change="handleChange2"
                  style="width:215px;padding:10px;"
                ></el-cascader>
                <el-button @click="dialogVisible3 = false;chengectg='';chengectgname=''" >取 消</el-button>
                <el-button
                  type="primary"
                  @click="ctgsave"
                >确 定</el-button>

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
        <div
          style="padding:0 40px 0 12px;"
          class="upLoad"
        >
          <span>相关资料：</span>
          <span></span>
          <span>附件管理</span>
        </div>
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
      <addperson :personAddHandler="personAddHandler"> </addperson>
    </el-dialog>
  </div>
</template>
<script>
import addperson from "./RedactAdd";
export default {
  data() {
    return {
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
    };
  },
  components: {
    addperson
  },
  methods: {
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

      let data = qs.stringify({
        //sizeForm: JSON.stringify(this.sizeForm),21
        id: this.urlid,
        deviceNo: this.sizeForm.deviceNo,
        deviceName: this.sizeForm.deviceName,
        organizeName: this.sizeForm.organizeName,
        deviceClassify: this.sizeForm.deviceClassify,
        deviceClassifyName: this.sizeForm.deviceClassifyName,
        deviceSpec: this.sizeForm.deviceSpec,
        outputDate: this.sizeForm.outputDate,
        manufacturer: this.sizeForm.manufacturer,
        location: this.sizeForm.location,
        locationNo: this.sizeForm.locationNo,
        buyPrice: this.sizeForm.buyPrice,
        buyDate: this.sizeForm.buyDate,
        deviceCategory: this.sizeForm.deviceCategory,
        deviceCategoryName: this.sizeForm.deviceCategoryName,
        deviceModel: this.sizeForm.deviceModel,
        deviceState: this.sizeForm.deviceState,
        organizeCode: this.sizeForm.organizeCode,
        enterFactoryDate: this.sizeForm.enterFactoryDate,
         //deviceDataInfo: JSON.stringify(this.sizeForm.deviceDataInfo),
        // devicePersonnelInfo: JSON.stringify(this.sizeForm.devicePersonnelInfo)
        devicePersonnelInfo: JSON.stringify(_devicePersonnelInfo)
      });
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
        // .post(this.global.apiSrc + "/device/update", data)
        .then(
          result => {
            if (result.data.code == 200) {
              alert("修改成功");
              console.log(result);
              console.log("update");
              console.log(result.data);
              this.$router.push("/Equipment");
            } else if (result.data.code == 410) {
              alert("该设备编号以存在,请修改!!!");
            }
          },
          ({ type, info }) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        );
      // .catch(err => {
      //   console.log(err);
      // });
    },

    jsontoarr(data){
      //把查出来的人员json数据转换为数组
      var jsonObj =  JSON.parse(data)
      console.log(jsonObj)
      var jsonStr1 = JSON.stringify(jsonObj)
      console.log(jsonStr1+"jsonStr1")
      var jsonArr = [];
      for(var i =0 ;i < jsonObj.length;i++){
        jsonArr[i] = jsonObj[i];
      }
      console.log(jsonArr);
      console.log("jsontoarr");

      this.arrrrrrr(jsonArr);
      // let newarrr = new Array();
      // for(let i;i<jsonArr.length;i++){
      //   console.log(i);
      //   if(jsonArr[i].workerType === 0){
      //       newarrr.push(
      //         {
      //           workerTypeName: "负责人员",
      //           workerType: "0",
      //           content: [{
      //             workerID:data[i].workerId,
      //             workerName:data[i].workerName
      //           }]
      //         }
      //       )
      //     }
      //   if(jsonArr[i].workerType === 1){
      //     newarrr.push(
      //       {
      //         workerTypeName: "维修",
      //         workerType: "1",
      //         content: [{
      //           workerID:data[i].workerId,
      //           workerName:data[i].workerName
      //         }]
      //       }
      //     )}
      //   if(jsonArr[i].workerType === 2){
      //     newarrr.push(
      //       {
      //         workerTypeName: "检修",
      //         workerType: "2",
      //         content: [{
      //           workerID:data[i].workerId,
      //           workerName:data[i].workerName
      //         }]
      //       }
      //     )}
      //   if(jsonArr[i].workerType === 3){
      //     newarrr.push(
      //       {
      //         workerTypeName: "保养",
      //         workerType: "3",
      //         content: [{
      //           workerID:data[i].workerId,
      //           workerName:data[i].workerName
      //         }]
      //       }
      //     )}
      //   if(jsonArr[i].workerType === 4){
      //     newarrr.push(
      //       {
      //         workerTypeName: "操作",
      //         workerType: "4",
      //         content: [{
      //           workerID:data[i].workerId,
      //           workerName:data[i].workerName
      //         }]
      //       }
      //     )}
      // }
      // console.log(newarrr);
      // console.log("newarrr");
      // return newarrr;
      // // this.arrrrrrr(jsonArr);
    },
    arrrrrrr(data){
      let newarrr= new Array();
      newarrr =this.editableTabs;
      for(let i=0;i<data.length;i++){
        if(data[i].workerType === 0){
          newarrr[0].content.push(
            {
              id:data[i].workerId,
              workerName:data[i].workerName
            }
          )
        }
        if(data[i].workerType === 1){
          newarrr[1].content.push(
            {
              id:data[i].workerId,
              workerName:data[i].workerName
            }
          )
        }
        if(data[i].workerType === 2){
          newarrr[2].content.push(
            {
              id:data[i].workerId,
              workerName:data[i].workerName
            }
          )
        }
        if(data[i].workerType === 3){
          newarrr[3].content.push(
            {
              id:data[i].workerId,
              workerName:data[i].workerName
            }
          )
        }
        if(data[i].workerType === 4){
          newarrr[4].content.push(
            {
              id:data[i].workerId,
              workerName:data[i].workerName
            }
          )
        }
      }
      console.log(newarrr);
      console.log("newarrr");
      this.devicePersonnelInfoBase = newarrr ;
    },

    detail(id) {
      //获取设备详情接口
      this.Axios(
        {
          params: {
            deviceId: id
          },
          // option: {
          //   enableMsg: false
          // },
          type: "get",
          url: "/device/detail"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      )
        // .get(this.global.apiSrc + "/device/detail", {
        //   params: { deviceId: id }
        // })
        .then(result => {
          console.log("detail");
          console.log(result.data);
          this.sizeForm = result.data.data;

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
          console.log(this.devicePersonnelInfoBase);
          console.log("---------------");
        },
          ({type, info}) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        );
      // .catch(err => {
      //   console.log(err);
      // });
    },

    personAddHandler(data){
      console.log(data);
      this.devicePersonnelInfoBase=data;
      this.dialogVisible=false;
      console.log(data);
    },
    updatewarning(){
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
    },

    filterArray(data, parent) {
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
    allOrganize() {
      this.Axios(
        {
          params: {},
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/organize/allOrganize"
        },
        this
      )
        //.get(this.global.apiSrc + "/organize/allOrganize")
        .then(
          result => {
            console.log(result.data);
            for (let i = 0; i < result.data.data.length; i++) {
              if (result.data.data[i].organizeType === 0) {
                result.data.data[i].organizeType = "企业";
              }
              if (result.data.data[i].organizeType === 1) {
                result.data.data[i].organizeType = "公司";
              }
              if (result.data.data[i].organizeType === 2) {
                result.data.data[i].organizeType = "工厂";
              }
              if (result.data.data[i].organizeType === 3) {
                result.data.data[i].organizeType = "部门";
              }
              if (result.data.data[i].organizeType === 4) {
                result.data.data[i].organizeType = "车间";
              }
            }
            this.orgoptions = this.filterArray(result.data.data, 0);
            console.log("组织结构");
            console.log(this.orgoptions);
          },
          ({ type, info }) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        );
      // .catch(err => {
      //   console.log(err);
      //   console.log(this.userName);
      // });
    },
    filterArray2(data, parent) {
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
    findAlldeviceClassify() {
      this.Axios(
        {
          params: {},
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/deviceCategory/all"
        },
        this
      )
        //.get(this.global.apiSrc + "/deviceCategory/all", data)
        .then(
          result => {
            console.log("查询设备类别");
            this.ctgoptions = this.filterArray2(result.data.data, 0);
            console.log(result.data);
          },
          ({ type, info }) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        );
      // .catch(err => {
      //   console.log(err);
      // });
    },

    orgAndClass(){

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
    this.allOrganize();
    this.findAlldeviceClassify();
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
          float: right;
        }
      }
    }
  }
}
</style>
