<template>
  <div class="equipmentAdd">
    <div class="addCase">
      <div class="top">
        <el-row>
          <el-button plain size="small" @click="tback">返回</el-button>
          <el-button plain size="small" @click="add1">保存</el-button>
        </el-row>
      </div>
      <div class="center">
        <h5>基础信息</h5>
        <el-form ref="form" :model="sizeForm" label-width="80px" size="small">
          <el-form-item label="设备编号">
            <el-input v-model="sizeForm.deviceNo" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="sizeForm.deviceName" style="width:512px"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select v-model="sizeForm.organizeName" placeholder="点击选择" style="width:512px">

              <el-option v-for="item in options1" :key="" :label="item.label" :value="item.value"></el-option>

            </el-select>
          </el-form-item>
          <el-form :inline="true" style="padding-left:12px" size="small">
            <el-form-item label="设备分类">
              <el-select v-model="sizeForm.deviceClassify" placeholder="点击选择" style="width:215px">

                <el-option v-for="item in options2" :key="" :label="item.label" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="设备类别">
              <el-select v-model="sizeForm.deviceCategory" placeholder="点击选择" style="width:215px">

                <el-option v-for="item in options3" :key="" :label="item.label" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
          </el-form>
          <el-form :inline="true" style="padding-left:12px" size="small">
            <el-form-item label="设备型号">
              <el-input v-model="sizeForm.deviceModel" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item label="设备状况">
              <el-select v-model="sizeForm.deviceState" placeholder="点击选择" style="width:215px">

                <el-option v-for="item in options4" :key="" :label="item.label" :value="item.value"></el-option>

              </el-select>
            </el-form-item>
          </el-form>
          <el-form :inline="true" style="padding-left:12px" size="small">
            <el-form-item label="设备规格">
              <el-input v-model="sizeForm.deviceSpec" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item label="出厂日期">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.outputDate"
                                style="width: 215px;"></el-date-picker>
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
              <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.buyDate"
                              style="width: 215px;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="入厂日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.enterFactoryDate"
                              style="width: 215px;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <div style="padding:0 40px 0 12px;" class="upLoad">
          <span>相关资料：</span>
          <span></span>
          <span>附件上传</span>
        </div>
      </div>
    </div>
    <addPerson v-show="addShow" v-on:isHide="isHide"></addPerson>
  </div>
</template>
<script>
  import addPerson from "./AddPerson";

  export default {
    name: "",
    data() {
      return {
        addShow: false,
        sizeForm: {
          deviceNo: "",
          deviceName: "",
          organizeName: "",
          deviceClassify: "",
          deviceClassifyName: "超级存储",
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
          gmtModified: "",
          organizeCode: "",
          enterFactoryDate: ""
        },
        options1: [
          {
            value: "1",
            label: "1"
          },
          {
            value: "2",
            label: "2"
          },
          {
            value: "3",
            label: "3"
          },
          {
            value: "4",
            label: "4"
          },
        ],
        options2: [
          {
            value: "1",
            label: "1"
          },
          {
            value: "2",
            label: "2"
          },
          {
            value: "3",
            label: "3"
          },
          {
            value: "4",
            label: "4"
          },
        ],
        options3: [
          {
            value: "1",
            label: "1"
          },
          {
            value: "2",
            label: "2"
          },
          {
            value: "3",
            label: "3"
          },
          {
            value: "4",
            label: "4"
          },
        ],
        options4: [
          {
            value: "0",
            label: "0"
          },
          {
            value: "-1",
            label: "-1"
          },
        ],
      };
    },
    methods: {
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
        let qs = require("qs");
        let data = qs.stringify({
          deviceNo: this.sizeForm.deviceNo,
          deviceName: this.sizeForm.deviceName,
          deviceClassify: this.sizeForm.deviceClassify,
          deviceClassifyName: "超级存储",
          deviceSpec: this.sizeForm.deviceSpec,
          organizeName: "IBM公司",
          organizeCode: "IIIBBBMMM",
          deviceCategory: this.sizeForm.deviceCategory,
          deviceCategoryName: "存储器",
          devicePersonnelInfo: JSON.stringify([{
              workerType:1,
              workerName:"赵六",
              workerId:188,
              workerTypeName:"负责人员"
            },
            {
              workerType:2,
              workerTypeName:"维修人员",
              workerId:192,
              workerName:"王五"
            },
            {
              workerType:1,
              workerTypeName:"负责人员",
              workerId:147,
              workerName:"李四"
            }
          ])
        });

        console.log(data);
        this.axios
          .post(this.global.apiSrc + "/device/add", data)
          .then(result => {

            console.log("add");
            console.log(result.data);
          })
          .catch(err => {
            console.log(err);
          });
      },
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
