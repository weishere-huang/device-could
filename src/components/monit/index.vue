<template>
  <!-- <div>
        <span>Equipment{{showInfo}}</span>
        <button @click="clickDemo" :class="showInfo">点击</button>
  </div>-->
  <div>
    <div v-bind:class="activeClass">
      <el-container>
        <el-aside
          width="200px"
          class="equTypeListBar"
        >
          <el-collapse
            v-model="activeNames"
            @change="collapseItemChange"
          >
            <el-collapse-item
              title="组织机构"
              name="1"
            >
              <div style="max-height:300px;overflow:scroll;">
                <el-tree
                  ref="tree"
                  :data="organizationTreeData"
                  highlight-current
                  default-expand-all
                  node-key="id"
                  :empty-text="organizationEmptytTxt"
                  :expand-on-click-node="false"
                  @node-click="treeNodeClick"
                ></el-tree>
              </div>
            </el-collapse-item>
            <el-collapse-item
              title="设备类别"
              name="2"
            >
              <div style="max-height:300px;overflow:scroll;">
                <el-tree
                  ref="tree2"
                  :data="equTypeTreeData"
                  highlight-current
                  default-expand-all
                  node-key="id"
                  :empty-text="equTypeEmptytTxt"
                  :expand-on-click-node="false"
                  @node-click="classifyNodeclick"
                ></el-tree>
              </div>
            </el-collapse-item>
            <!-- <el-collapse-item title="设备状态" name="3">
              <el-tree 
                  ref='tree2'
                  :data="equStatusTreeData" 
                  :props="defaultProps" 
                  highlight-current
                  default-expand-all
                  node-key="id"
                  empty-text="数据加载中..."
                  :expand-on-click-node="false"
                  @node-click="treeNodeClick">
                </el-tree>
            </el-collapse-item>-->
          </el-collapse>
        </el-aside>
        <el-main class="monitMainContent">
          <section class="topWrap">
            <div>当前设备组：常减压产线组 / 数量（台）：{{pageEquCount}}</div>
            <div>刷新频次：
              <el-select
                v-model="refreshValue"
                size="small"
                placeholder="请选择"
                style="width:100px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button
                size="small"
                type="primary"
                @click="reload()"
              >
                <i class="el-icon-refresh"></i> 立即刷新
              </el-button>
            </div>
          </section>
          <section class="pinsWrap">
            <div id="pinLeft"></div>
            <div id="pinRight"></div>
          </section>
          <section class="equListWrap">
            <div>
              <el-row>
                <el-col
                  :span="6"
                  v-for="(item, index) in equipmentOperationalCondition"
                  :key="index"
                >
                  <el-card
                    shadow="always"
                    class="cardItem"
                  >
                    <div
                      slot="header"
                      class="clearfix"
                    >
                      <span :title="item.deviceName" class="cardItem-header ellipsis">
                        <el-tooltip
                          v-if="item.warnLevel===1"
                          class="item"
                          effect="light"
                          content="黄色预警，请检查设备"
                          placement="top"
                        >
                          <i class="iconfont c-yellow">&#xe651;</i>
                        </el-tooltip>
                        <el-tooltip
                          v-if="item.warnLevel===2"
                          class="item"
                          effect="light"
                          content="橙色预警，请立即检查设备"
                          placement="top"
                        >
                          <i class="iconfont c-orange">&#xe651;</i>
                        </el-tooltip>
                        <el-tooltip
                          v-if="item.warnLevel===3"
                          class="item"
                          effect="light"
                          content="严重警报，请立即检查设备"
                          placement="top"
                        >
                          <i class="iconfont c-red">&#xe651;</i>
                        </el-tooltip>
                        {{item.deviceName}}
                      </span>
                      <router-link
                        :class="'g-link f14'"
                        style="float: right; "
                        :to="{path:'/Monit/'+item.id}"
                      >
                      <el-tooltip effect="dark" content="查看日志" placement="top">
                        <i style="font-size:18px" class="iconfont">&#xe60d;</i>
                      </el-tooltip>
                      </router-link>
                    </div>
                    <div class="text item">
                      <p :style="'border-color:'+(item.runState===0?'green':item.runState===1?'red':item.runState===2?'yellow':item.runState===3?'darkgray':'#CEC9C9')">编号：{{item.deviceNo}}</p>
                      <!-- <div class="separate"></div> -->
                      <ul>
                        <li>
                          <i class="iconfont">&#xe658;</i>温度：
                          <span>{{item.temperature}}</span>
                        </li>
                        <li>
                          <i class="iconfont">&#xe607;</i>压力：
                          <span>{{item.pressure}}</span>
                        </li>
                        <li>
                          <i class="iconfont">&#xe628;</i>主轴转速：
                          <span>{{item.spindleSpeed}}</span>
                        </li>
                        <li>
                          <i class="iconfont">&#xe76a;</i>主润滑液位：
                          <span>{{item.lubricationLevel}}</span>
                        </li>
                        <li>
                          <i class="iconfont">&#xe641;</i>振动频率：
                          <span>{{item.vibrationFrequency}}</span>
                        </li>
                      </ul>
                    </div>
                  </el-card>
                </el-col>
                <!-- <el-col :span="6">
                  <el-card shadow="always" class="cardItem">
                    <div slot="header" class="clearfix">
                      <span>常减压装置</span>
                      <el-button style="float: right; padding: 3px 0" type="text">运行日志</el-button>
                    </div>
                    <div class="text item">
                      <p>编号：CH10002355</p>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="always" class="cardItem">
                    <div slot="header" class="clearfix">
                      <span>常减压装置</span>
                      <el-button style="float: right; padding: 3px 0" type="text">运行日志</el-button>
                    </div>
                    <div class="text item">
                      <p>编号：CH10002355</p>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="always" class="cardItem">
                    <div slot="header" class="clearfix">
                      <span>常减压装置</span>
                      <el-button style="float: right; padding: 3px 0" type="text">运行日志</el-button>
                    </div>
                    <div class="text item">
                      <p>编号：CH10002355</p>
                    </div>
                  </el-card>
                </el-col> -->
              </el-row>
            </div>
          </section>
        </el-main>
      </el-container>
    </div>
    <div v-if="this.$route.params.deviceId!==undefined">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts");
require("echarts/lib/chart/pie");
const initTreeDataForOrganization = function(nodeData, parentCode) {
  return nodeData
    .filter(item => item.parentCode === parentCode)
    .map(item => {
      return {
        id: item.code,
        label: item.name,
        children: initTreeDataForOrganization(nodeData, item.code)
      };
    });
};
const initTreeDataForEquType = function(nodeData, parentCode) {
  return nodeData
    .filter(item => item.categoryParentNo === parentCode)
    .map(item => {
      return {
        id: item.categoryNo,
        label: item.categoryName,
        children: initTreeDataForEquType(nodeData, item.categoryNo)
      };
    });
};
export default {
  inject: ["reload"],
  data() {
    return {
      activeClass:
        this.$route.params.deviceId !== undefined
          ? "monitWrap hide"
          : "monitWrap show", //`monitWrap`,
      pageEquCount: 0,
      selectOrganizeCode: "",
      activeNames: ["1", "2", "3"],
      organizationTreeData: [],
      organizationEmptytTxt: "数据加载中...",
      equTypeTreeData: [],
      equTypeEmptytTxt: "数据加载中...",
      equStatusTreeData: [
        {
          label: "设备状态",
          children: [
            {
              label: "开机",
              id: "1"
            },
            {
              label: "关机",
              id: "2"
            },
            {
              label: "故障",
              id: "3"
            }
          ]
        }
      ],
      options: [
        {
          value: "30",
          label: "30s"
        },
        {
          value: "60",
          label: "60s"
        },
        {
          value: "300",
          label: "5分钟"
        },
        {
          value: "600",
          label: "10分钟"
        },
        {
          value: "1800",
          label: "30分钟"
        }
      ],
      refreshValue: "60",
      equipmentOperationalCondition: [],
      organizeCode: JSON.parse(localStorage.getItem("user")).organizeCode,
      deviceCategory: "",
      basicStateCount: "",
      type:"",
    };
  },
  watch: {
    $route() {
      this.activeClass = `monitWrap ${
        this.$route.params.deviceId !== undefined ? "hide" : "show"
      }`;
    }
  },
  created: function() {
    console.log();

    this.Axios(
      {
        url: ["/organize/allOrganize", "/deviceCategory/all"],
        type: ["get", "get"],
        params: {}
      },
      this
    ).then(([res1, res2]) => {
      console.log(res2.data.data);
      if (res1.data.data.length) {
        this.organizationTreeData = initTreeDataForOrganization(
          res1.data.data,
          res1.data.data.find(item=>item.organizeType===1).parentCode
        );
        this.$store.commit("getCode", res1.data.data[0].code);

        this.setPinOption();
        this.getEquList();
      } else {
        this.organizationEmptytTxt = "暂无数据";
      }
      if (res2.data.data.length)
        this.equTypeTreeData = initTreeDataForEquType(res2.data.data, "0");
      else this.equTypeEmptytTxt = "暂无数据";

      //window.setTimeout(() => {this.$refs.tree.setCurrentKey("1024");}, 1000);
    });
  },
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    // 绘制图表
  },
  methods: {
    setPinOption(selectOrganizeCode) {
      //获取设备两个状态
      this.Axios(
        {
          url: [
            "/deviceState/findDeviceBasicStateCount",
            "/deviceState/findDeviceWarnStateCount"
          ],
          type: "get",
          params: {
            organizeCode: this.organizeCode,
            deviceCategory: this.deviceCategory
          },
          option: { requestTarget: "r" }
        },
        this
      ).then(([res2_1, res2_2]) => {
        const chartLeft = echarts.init(document.getElementById("pinLeft"));
        const chartRight = echarts.init(document.getElementById("pinRight"));
        const baseState = res2_1.data.data;
        const warnState = res2_2.data.data;
        this.pageEquCount = baseState.count || 0;
        const self=this;
        chartLeft.setOption({
          title: {
            text: "设备基本状态",
            subtext: "统计设备量：" + (baseState.count || 0),
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["正常运行", "故障待处理", "维修中", "关机中", "断线"]
          },
          series: [
            {
              name: "设备基本状态",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              //stillShowZeroSum: false,
              data: [
                {
                  value: baseState.normal || 0,
                  name: "正常运行",
                  itemStyle: { color: "#008000" }
                },
                {
                  value: baseState.fault || 0,
                  name: "故障待处理",
                  itemStyle: { color: "#FF0000" }
                },
                {
                  value: baseState.maintenance || 0,
                  name: "维修中",
                  itemStyle: { color: "#FFD700" }
                },
                {
                  value: baseState.showdown || 0,
                  name: "关机中",
                  itemStyle: { color: "#909090" }
                },
                {
                  value: baseState.unline || 0,
                  name: "断线",
                  itemStyle: { color: "#CDC9C9" }
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
        chartRight.setOption({
          title: {
            text: "设备预警状态",
            subtext: "统计设备量：" + (warnState.count || 0),
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["正常", "橙色预警", "黄色预警", "红色预警", "断线"]
          },
          series: [
            {
              name: "设备报警状态",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                {
                  value: warnState.normal || 0,
                  name: "正常",
                  itemStyle: { color: "#008000" }
                },
                {
                  value: warnState.orange || 0,
                  name: "橙色预警",
                  itemStyle: { color: "#FF8C00" }
                },
                {
                  value: warnState.yellow || 0,
                  name: "黄色预警",
                  itemStyle: { color: "#CDCD00" }
                },
                {
                  value: warnState.red || 0,
                  name: "红色预警",
                  itemStyle: { color: "#FF0000" }
                },
                {
                  value: warnState.unline || 0,
                  name: "断线",
                  itemStyle: { color: "#CDC9C9" }
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
        chartLeft.on("click", function (param) { 
          if (param.data.name === "正常运行") {
            self.basicStateCount = 0;
          }else if (param.data.name === "故障待处理") {
            self.basicStateCount = 1;
          }else if (param.data.name === "维修中") {
            self.basicStateCount = 2;
          }else if (param.data.name === "关机中") {
            self.basicStateCount = 3;
          }else if (param.data.name === "断线") {
            self.basicStateCount = 4;
          }
          self.type=0
          //console.log(param.data.name,self.basicStateCount);
          self.getEquList()
         });
         chartRight.on("click", function (param) { 
          if (param.data.name === "正常") {
            self.basicStateCount = 0;
          }else if (param.data.name === "黄色预警") {
            self.basicStateCount = 1;
          }else if (param.data.name === "橙色预警") {
            self.basicStateCount = 2;
          }else if (param.data.name === "红色预警") {
            self.basicStateCount = 3;
          }else if (param.data.name === "断线") {
            self.basicStateCount = 4;
          }
          self.type=1
          console.log(param.data.name,self.basicStateCount);
          self.getEquList()
         });
      });
    },
    
    getEquList(selectOrganizeCode) {
      this.Axios(
        {
          url: "/deviceState/listDeviceByState",
          type: "get",
          params: {
            organizeCode: this.organizeCode,
            deviceCategory: this.deviceCategory,
            state: this.basicStateCount,
            type:this.type,
            size: 100
          },
          option: { requestTarget: "r" }
        },
        this
      ).then(res => {
        console.log(res.data.data.content);
        this.equipmentOperationalCondition = res.data.data.content;
        //window.setTimeout(() => {this.$refs.tree.setCurrentKey("1024");}, 1000);
      });
    },
    collapseItemChange(val) {
      console.log(val);
    },
    treeNodeClick(data) {
      console.log(data);
      this.organizeCode = data.id;
      this.setPinOption();
      this.getEquList();
    },
    classifyNodeclick(data) {
      console.log(data);
      this.deviceCategory = data.id;
      this.setPinOption();
      this.getEquList();
    }
  }
};
</script>
<style lang="less" scoped>
.monitWrap {
  height: 100%;
  .equTypeListBar {
    //overflow: hidden;
    border-right: solid 1px #eee;
    padding: 10px;
  }
  .monitMainContent {
    padding-top: 0;
    .topWrap {
      border: solid 1px #dfdfdf;
      border-radius: 5px;
      height: 55px;
      margin: 0 10px 5px 10px;
      display: flex;
      font-size: 12px;
      & > div:first-child {
        flex: 1;
        margin: 5px 10px;
        line-height: 40px;
        //border: solid 1px #dfdfdf;
      }
      & > div:last-child {
        flex: 1;
        margin: 5px 10px;
        //border: solid 1px #dfdfdf;
        text-align: right;
        div {
          margin: 5px;
        }
      }
    }
  }
  .pinsWrap {
    margin: 0 5px 5px 5px;
    height: 300px;
    display: flex;
    & > div {
      flex: 1;
      margin: 5px;
      border: solid 1px #dfdfdf;
      border-radius: 5px;
    }
  }
  .equListWrap {
    // border: solid 1px #ccc;
    // padding:5px;
    margin: 0 5px 5px 5px;
  }
  .el-card__body {
    padding: 10px;
  }
  .cardItem {
    margin: 5px;
    .cardItem-header {
      font-size: 16px;
      display: inline-block;
      width: calc(100% - 20px);
    }
    p {
      padding-bottom: 10px;
      font-size: 14px;
      border-bottom: solid 3px #0e8561;
    }
    .separate {
      background: #0e8561;
      height: 3px;
      border-radius: 1px;
    }
    ul {
      margin-top: 5px;
      list-style-type: none;
      display: inline-block;
      width: 100%;
      font-size: 12px;
      li {
        width: 100%;
        line-height: 22px;
        i {
          margin: 0 5px;
        }
        span {
          font-weight: bold;
        }
        &:hover {
          background: #e3edf8;
        }
      }
    }
    .red {
      cursor: pointer;
    }
  }
}
</style>

