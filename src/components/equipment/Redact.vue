<template>
    <div class="redact">
        <div class="addCase">
            <div class="top">
                <el-row>
                    <el-button plain size="small" @click="tback">返回</el-button>
                    <el-button plain size="small" @click="update">保存</el-button>
                </el-row>
            </div>
            <div class="center">
                <h5>基础信息</h5>
                <el-form ref="form" label-width="80px" size="small">
                    <el-form-item label="设备编号">
                        <el-input v-model="sizeForm.deviceNo" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item label="设备名称">
                        <el-input v-model="sizeForm.deviceName" style="width:512px"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门">
                        <el-select v-model="sizeForm.organizeName" placeholder="点击选择" style="width:512px">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form :inline="true" style="padding-left:12px" size="small">
                        <el-form-item label="设备分类">
                            <el-select v-model="sizeForm.deviceClassify" placeholder="点击选择" style="width:215px">

                              <el-option v-for="item in options1" :key="" :label="item.label" :value="item.sizeForm.deviceClassify"></el-option>

                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备类别">
                            <el-select v-model="sizeForm.deviceCategoryName" placeholder="点击选择" style="width:215px">

                              <el-option v-for="item in options1" :key="item.sizeForm.deviceClassify" :label="item.label" :value="item.sizeForm.deviceClassify"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" style="padding-left:12px" size="small">
                        <el-form-item label="设备型号">
                            <el-input v-model="sizeForm.deviceModel" style="width:215px"></el-input>
                        </el-form-item>
                        <el-form-item label="设备状况">
                            <el-select v-model="sizeForm.deviceState" placeholder="点击选择" style="width:215px">

                              <el-option v-for="item in options1" :key="item.sizeForm.deviceClassify" :label="item.label" :value="item.sizeForm.deviceClassify"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" style="padding-left:12px" size="small">
                        <el-form-item label="设备规格">
                            <el-input v-model="sizeForm.deviceSpec" style="width:215px"></el-input>
                        </el-form-item>
                        <el-form-item label="出厂日期">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.outputDate" style="width: 215px;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-form>

                    <el-form-item label="设备厂家">
                        <el-input v-model="sizeForm.manufacturer" style="width:512px"></el-input>
                    </el-form-item>
                </el-form>

            </div>
            <div class="bottom">
                <h5>管理信息</h5>
                <ul class="staff">
                    <li>
                        <div>
                            <span>负责人员：</span>
                            <span>（空）</span>
                        </div>
                        <div @click="addIsShow">
                            更改绑定
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>维修人员：</span>
                            <span>（空）</span>
                        </div>
                        <div @click="addIsShow">
                            更改绑定
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>检修人员：</span>
                            <span>（空）</span>
                        </div>
                        <div @click="addIsShow">
                            更改绑定
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>保养人员：</span>
                            <span>（空）</span>
                        </div>
                        <div @click="addIsShow">
                            更改绑定
                        </div>
                    </li>
                    <li>
                        <div>
                            <span>操作人员：</span>
                            <span>（空）</span>
                        </div>
                        <div @click="addIsShow">
                            更改绑定
                        </div>
                    </li>
                </ul>
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
                        <el-input v-model="sizeForm.buyPrice" style="width:215px"></el-input>
                    </el-form-item>
                    <el-form-item label="购买日期">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.buyDate" style="width: 215px;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="入厂日期">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.enterFactoryDate" style="width: 215px;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div style="padding:0 40px 0 12px;" class="upLoad">
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
        <addperson v-show="addp" v-on:isHide="isHide"></addperson>
    </div>
</template>
<script>
import addperson from "./AddPerson";
export default {
  data() {
    return {
      addp: false,
      sizeForm: {
        deviceNo: "",
        deviceName: "",
        deviceClassify: "",
        deviceClassifyName: "",
        deviceCategory: "",
        deviceCategoryName: "",
        deviceSpec: "",
        organizeCode: "",
        organizeName: "",
      },
      options1:[
        {
          value:"1",
          label:"1"
        },
        {
          value:"2",
          label:"2"
        },
        {
          value:"3",
          label:"3"
        },
        {
          value:"4",
          label:"4"
        },
      ],


    };
  },
  components: {
    addperson
  },
  methods: {
      tback(){
          this.$router.back(-1)
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
      let data = qs.stringify({
        sizeForm:this.sizeForm
      });
      this.axios
        .put(this.global.apiSrc+"/device/update", data)
        .then(result => {
          console.log("update");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    allOrganize() {
      this.axios
        .get(this.global.apiSrc+"/organize/allOrganize/321")
        .then(result => {
          alert("查询所有组织机构")
          console.log(result.data);
          console.log(result.data.data[0].name);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
  },
  created(){
      this.sizeForm=this.$store.state.equipment.person
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
  padding-left: 180px;
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
      h5 {
        position: absolute;
        top: -10px;
        left: 23px;
        background-color: white;
      }
      .el-form-item {
        height: 30px;
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
        top: -10px;
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
