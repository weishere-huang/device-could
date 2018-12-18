<template>
  <!-- <div>
        <span>Equipment{{showInfo}}</span>
        <button @click="clickDemo" :class="showInfo">点击</button>
  </div>-->
  <div>
    <div v-bind:class="activeClass">
      <el-container>
        <el-aside width="200px" class="equTypeListBar">
          <el-collapse v-model="activeNames" @change="collapseItemChange">
            <el-collapse-item title="组织机构" name="1">
              <div>
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
            <el-collapse-item title="设备类别" name="2">
              <div>
                <el-tree
                  ref="tree2"
                  :data="equTypeTreeData"
                  highlight-current
                  default-expand-all
                  node-key="id"
                  :empty-text="equTypeEmptytTxt"
                  :expand-on-click-node="false"
                  @node-click="treeNodeClick"
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
              <el-select v-model="refreshValue" size="small" placeholder="请选择" style="width:100px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button size="small" type="primary">
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
                <el-col :span="6" v-for="(item, index) in equipmentOperationalCondition" :key="index">
                  <el-card shadow="always" class="cardItem">
                    <div slot="header" class="clearfix">
                      <span class="cardItem-header">
                        <el-tooltip
                          v-if="item.runState===1"
                          class="item"
                          effect="light"
                          content="黄色预警，请检查设备"
                          placement="top"
                        >
                          <i class="iconfont c-yellow">&#xe651;</i>
                        </el-tooltip>
                        <el-tooltip
                          v-if="item.runState===2"
                          class="item"
                          effect="light"
                          content="橙色预警，请立即检查设备"
                          placement="top"
                        >
                          <i class="iconfont c-orange">&#xe651;</i>
                        </el-tooltip>
                        <el-tooltip
                          v-if="item.runState===3"
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
                        style="float: right; padding: 3px 0"
                        :to="{path:'/Monit/'+item.id}"
                      >运行日志</router-link>
                    </div>
                    <div class="text item">
                      <p>编号：{{item.deviceNo}}</p>
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
        id: item.id,
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
        id: item.id,
        label: item.categoryName,
        children: initTreeDataForEquType(nodeData, item.categoryNo)
      };
    });
};
export default {
  data() {
    return {
      activeClass: this.$route.params.deviceId !== undefined ? "monitWrap hide" : "monitWrap show",//`monitWrap`,
      pageEquCount:0,
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
      equipmentOperationalCondition:[]
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
    this.Axios(
      {
        url: ["/organize/allOrganize", "/deviceCategory/all"],
        type: ["get", "get"],
        params: {}
      },
      this
    ).then(
      ([res1, res2]) => {
        if (res1.data.data.length) {
          this.organizationTreeData = initTreeDataForOrganization(
            res1.data.data,
            "0"
          );
          this.$store.commit('getCode',res1.data.data[0].code)
          
          this.setPinOption(res1.data.data[0].code);
          this.getEquList(res1.data.data[0].code);
        } else {
          this.organizationEmptytTxt = "暂无数据";
        }
        if (res2.data.data.length)
          this.equTypeTreeData = initTreeDataForEquType(res2.data.data, "0");
        else this.equTypeEmptytTxt = "暂无数据";

        //window.setTimeout(() => {this.$refs.tree.setCurrentKey("1024");}, 1000);
      }
    );
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
            organizeCode: selectOrganizeCode
          },
          option: { requestTarget: "r" }
        },
        this
      ).then(
        ([res2_1, res2_2]) => {
          const chartLeft = echarts.init(document.getElementById("pinLeft"));
          const chartRight = echarts.init(document.getElementById("pinRight"));
          const baseState=res2_1.data.data;
          const warnState=res2_2.data.data;
          this.pageEquCount=baseState.count||0;
          chartLeft.setOption({
            title: {
              text: "设备基本状态",
              subtext: "统计设备量："+baseState.count||0,
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: [
                "正常运行",
                "故障待处理",
                "维修中",
                "关机中",
                "断线"
              ]
            },
            series: [
              {
                name: "设备状态",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                stillShowZeroSum:false,
                data: [
                  {value: baseState.normal||0,name: "正常运行",itemStyle: { color: "#008000" }},
                  {value: baseState.fault||0,name: "故障待处理",itemStyle: { color: "#FF0000" }},
                  { value: baseState.maintenance||0, name: "维修中", itemStyle: { color: "#FFD700" } },
                  { value: baseState.showdown||0, name: "关机中", itemStyle: { color: "#909090" } },
                  { value: baseState.unline||0, name: "断线", itemStyle: { color: "#CDC9C9" } }
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
              subtext: "统计设备量："+warnState.count,
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
                name: "设备状态",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: [
                  { value: warnState.normal||0, name: "正常", itemStyle: { color: "#008000" } },
                  {value: warnState.orange||0,name: "橙色预警",itemStyle: { color: "#FF8C00" }},
                  {value: warnState.yellow||0,name: "黄色预警",itemStyle: { color: "#CDCD00" }},
                  {value: warnState.red||0,name: "红色预警",itemStyle: { color: "#FF0000" }},
                  { value: warnState.unline||0, name: "断线", itemStyle: { color: "#CDC9C9" } }
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
        });
    },
    getEquList(selectOrganizeCode){
      this.Axios(
      {
        url: "/deviceState/listDeviceByState",
        type: "get",
        params: {organizeCode:selectOrganizeCode,size:100},
        option: { requestTarget: "r" }
      },
      this
    ).then(
      (res) => {
        console.log(res.data.data.content);
        this.equipmentOperationalCondition=res.data.data.content
        //window.setTimeout(() => {this.$refs.tree.setCurrentKey("1024");}, 1000);
      }
    );
    },
    collapseItemChange(val) {
      console.log(val);
    },
    treeNodeClick(data) {
      console.log(data);
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

