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
            <el-cascader
              placeholder="搜索"
              :options="options"
              filterable
              change-on-select
              :show-all-levels="false"
              v-model="sizeForm.organizeName"
              style="width:512px;"
            ></el-cascader>
          </el-form-item>
          <el-form :inline="true" style="padding-left:12px" size="small">
            <el-form-item label="设备分类">
              <el-select v-model="sizeForm.deviceClassify" placeholder="点击选择" style="width:215px">

                <el-option v-for="(item,index) in options2" :key="index" :label="item.label"
                           :value="item.value"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="设备类别">
              <el-cascader
                placeholder="搜索"
                :options="options"
                filterable
                change-on-select
                :show-all-levels="false"
                v-model="sizeForm.organizeName"
                style="width:215px;"
              ></el-cascader>
            </el-form-item>
          </el-form>
          <el-form :inline="true" style="padding-left:12px" size="small">
            <el-form-item label="设备型号">
              <el-input v-model="sizeForm.deviceModel" style="width:215px"></el-input>
            </el-form-item>
            <el-form-item label="设备状况">
              <el-select v-model="sizeForm.deviceState" placeholder="点击选择" style="width:215px">

                <el-option v-for="(item,index) in options4" :key="index" :label="item.label"
                           :value="item.value"></el-option>

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
          // deviceNo: "",
          // deviceName: "",
          // organizeName: "",
          // deviceClassify: "",
          // deviceClassifyName: "超级存储",
          // deviceSpec: "",
          // outputDate: "",
          // manufacturer: "",
          // location: "",
          // locationNo: "",
          // buyPrice: "",
          // buyDate: "",
          // dataInfo: "",
          // deviceCategory: "",
          // deviceCategoryName: "",
          // deviceModel: "",
          // deviceState: "",
          // organizeCode: "",
          // enterFactoryDate: ""
          

          deviceNo: "CH000001",
          deviceName: "液压机",
          organizeName: "武器事业部制造",
          deviceClassify: "1",
          deviceClassifyName: "超级存储",
          deviceSpec: "GC222",
          outputDate: "2018/11/26",
          manufacturer: "222",
          location: "金牛市民中心",
          locationNo: "333",
          buyPrice: "200000",
          buyDate: "2018/11/26",
          dataInfo: "555",
          deviceCategory: "1",
          deviceCategoryName: "机械类",
          deviceModel: "ZA100-315315",
          deviceState: "1",
          organizeCode: "IBM",
          enterFactoryDate: "2018/11/26"
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
        options: [
          {
            value: "zhinan",
            label: "指南",
            children: [
              {
                value: "shejiyuanze",
                label: "设计原则",
                children: [
                  {
                    value: "yizhi",
                    label: "一致"
                  },
                  {
                    value: "fankui",
                    label: "反馈"
                  },
                  {
                    value: "xiaolv",
                    label: "效率"
                  },
                  {
                    value: "kekong",
                    label: "可控"
                  }
                ]
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航"
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航"
                  }
                ]
              }
            ]
          },
          {
            value: "zujian",
            label: "组件",
            children: [
              {
                value: "basic",
                label: "Basic",
                children: [
                  {
                    value: "layout",
                    label: "Layout 布局"
                  },
                  {
                    value: "color",
                    label: "Color 色彩"
                  },
                  {
                    value: "typography",
                    label: "Typography 字体"
                  },
                  {
                    value: "icon",
                    label: "Icon 图标"
                  },
                  {
                    value: "button",
                    label: "Button 按钮"
                  }
                ]
              },
              {
                value: "form",
                label: "Form",
                children: [
                  {
                    value: "radio",
                    label: "Radio 单选框"
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox 多选框"
                  },
                  {
                    value: "input",
                    label: "Input 输入框"
                  },
                  {
                    value: "input-number",
                    label: "InputNumber 计数器"
                  },
                  {
                    value: "select",
                    label: "Select 选择器"
                  },
                  {
                    value: "cascader",
                    label: "Cascader 级联选择器"
                  },
                  {
                    value: "switch",
                    label: "Switch 开关"
                  },
                  {
                    value: "slider",
                    label: "Slider 滑块"
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker 时间选择器"
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker 日期选择器"
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker 日期时间选择器"
                  },
                  {
                    value: "upload",
                    label: "Upload 上传"
                  },
                  {
                    value: "rate",
                    label: "Rate 评分"
                  },
                  {
                    value: "form",
                    label: "Form 表单"
                  }
                ]
              },
              {
                value: "data",
                label: "Data",
                children: [
                  {
                    value: "table",
                    label: "Table 表格"
                  },
                  {
                    value: "tag",
                    label: "Tag 标签"
                  },
                  {
                    value: "progress",
                    label: "Progress 进度条"
                  },
                  {
                    value: "tree",
                    label: "Tree 树形控件"
                  },
                  {
                    value: "pagination",
                    label: "Pagination 分页"
                  },
                  {
                    value: "badge",
                    label: "Badge 标记"
                  }
                ]
              },
              {
                value: "notice",
                label: "Notice",
                children: [
                  {
                    value: "alert",
                    label: "Alert 警告"
                  },
                  {
                    value: "loading",
                    label: "Loading 加载"
                  },
                  {
                    value: "message",
                    label: "Message 消息提示"
                  },
                  {
                    value: "message-box",
                    label: "MessageBox 弹框"
                  },
                  {
                    value: "notification",
                    label: "Notification 通知"
                  }
                ]
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "menu",
                    label: "NavMenu 导航菜单"
                  },
                  {
                    value: "tabs",
                    label: "Tabs 标签页"
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb 面包屑"
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown 下拉菜单"
                  },
                  {
                    value: "steps",
                    label: "Steps 步骤条"
                  }
                ]
              },
              {
                value: "others",
                label: "Others",
                children: [
                  {
                    value: "dialog",
                    label: "Dialog 对话框"
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip 文字提示"
                  },
                  {
                    value: "popover",
                    label: "Popover 弹出框"
                  },
                  {
                    value: "card",
                    label: "Card 卡片"
                  },
                  {
                    value: "carousel",
                    label: "Carousel 走马灯"
                  },
                  {
                    value: "collapse",
                    label: "Collapse 折叠面板"
                  }
                ]
              }
            ]
          },
          {
            value: "ziyuan",
            label: "资源",
            children: [
              {
                value: "axure",
                label: "Axure Components"
              },
              {
                value: "sketch",
                label: "Sketch Templates"
              },
              {
                value: "jiaohu",
                label: "组件交互文档"
              }
            ]
          }
        ]
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
          deviceClassifyName: this.sizeForm.deviceClassifyName,
          deviceSpec: this.sizeForm.deviceSpec,
          organizeName: this.sizeForm.organizeName,
          organizeCode: this.sizeForm.organizeCode,
          deviceCategory: this.sizeForm.deviceCategory,
          deviceCategoryName: this.sizeForm.deviceCategoryName,
          outputDate: this.sizeForm.outputDate,
          manufacturer: this.sizeForm.manufacturer,
          location: this.sizeForm.location,
          locationNo: this.sizeForm.locationNo,
          buyPrice: this.sizeForm.buyPrice,
          buyDate: this.sizeForm.buyDate,
          dataInfo: this.sizeForm.dataInfo,
          deviceModel: this.sizeForm.deviceModel,
          deviceState: this.sizeForm.deviceState,
          enterFactoryDate: this.sizeForm.enterFactoryDate,
          // deviceDataInfo: JSON.stringify(this.sizeForm.deviceDataInfo),
          devicePersonnelInfo: JSON.stringify([{
            workerType: 1,
            workerName: "赵六",
            workerId: 188,
            workerTypeName: "负责人员"
          },
            {
              workerType: 2,
              workerTypeName: "维修人员",
              workerId: 192,
              workerName: "王五"
            },
            {
              workerType: 1,
              workerTypeName: "负责人员",
              workerId: 147,
              workerName: "李四"
            }
          ])
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

        console.log(data);
        this.axios
          .post(this.global.apiSrc + "/device/add", data)
          .then(result => {
            console.log(result.data);
            alert("执行添加");
            if (result.data.code == 410) {
              alert("该设备号已存在,请重新编辑!!!")
            } else if (result.data.code == 200) {
              alert("添加成功");
              console.log("add");
              console.log(result.data);
              this.$router.push("/Equipment");
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      findDeviceClassify() {
        let qs = require("qs");
        let data = qs.stringify({});
        this.axios
          .get(this.global.apiSrc + "/device/findDeviceClassify", data)
          .then(result => {
            console.log("findDeviceClassify");
            console.log(result.data);
          })
          .catch(err => {
            console.log(err);
          });
      },
      findDeviceState() {
        let qs = require("qs");
        let data = qs.stringify({});
        this.axios
          .get(this.global.apiSrc + "/device/findDeviceState", data)
          .then(result => {
            console.log("findDeviceState");
            console.log(result.data);
          })
          .catch(err => {
            console.log(err);
          });
      },
      findAlldeviceClassify() {
        let qs = require("qs");
        let data = qs.stringify({});
        this.axios
          .get(this.global.apiSrc + "/deviceCategory/all", data)
          .then(result => {
            console.log("findAlldeviceClassify");
            console.log(result.data);
          })
          .catch(err => {
            console.log(err);
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
    },

    created() {
      this.findDeviceClassify();
      this.findDeviceState();
      this.findAlldeviceClassify();
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
