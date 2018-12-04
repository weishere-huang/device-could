<template>
    <!-- <div>
        <span>Equipment{{showInfo}}</span>
        <button @click="clickDemo" :class="showInfo">点击</button>
    </div> -->
    <div class="monitWrap">
      <el-container>
        <el-aside width="200px" class="equTypeListBar">
          <el-collapse v-model="activeNames" @change="collapseItemChange">
            <el-collapse-item title="组织机构" name="1">
              <div>
                <el-tree 
                  ref='tree'
                  :data="organizationTreeData" 
                  :props="defaultProps" 
                  highlight-current
                  default-expand-all
                  node-key="id"
                  empty-text="数据加载中..."
                  :expand-on-click-node="false"
                  @node-click="treeNodeClick">
                </el-tree>
              </div>
            </el-collapse-item>
            <el-collapse-item title="设备类别" name="2">
              <div>
                <el-tree 
                  ref='tree2'
                  :data="equTypeTreeData" 
                  :props="defaultProps" 
                  highlight-current
                  default-expand-all
                  node-key="id"
                  empty-text="数据加载中..."
                  :expand-on-click-node="false"
                  @node-click="treeNodeClick">
                </el-tree>
              </div>
            </el-collapse-item>
            <el-collapse-item title="设备状态" name="3">
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
            </el-collapse-item>
          </el-collapse>
        </el-aside>
        <el-main class="monitMainContent">
          <section class="pinsWrap">
            <div id='pinLeft'></div>
            <div id='pinRight'></div>
          </section>
        </el-main>
      </el-container>
    </div>
</template>

<script>
var echarts = require("echarts");
require("echarts/lib/chart/pie");
const initTreeDataForOrganization = function(nodeData, parentCode) {
  return nodeData.filter(item => item.parentCode === parentCode).map(item => {
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
      activeNames: ["1", "2", "3"],
      organizationTreeData: [],
      equTypeTreeData: [],
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
      ]
    };
  },
  created: function() {
    this.Axios(
      {
        url: ["/organize/allOrganize", "/deviceCategory/all"],
        type: "get"
      },
      this
    ).then(
      ([res1, res2]) => {
        this.organizationTreeData = initTreeDataForOrganization(res1.data.data,"0");
        this.equTypeTreeData = initTreeDataForEquType(res2.data.data, "0");
        //window.setTimeout(() => {this.$refs.tree.setCurrentKey("1024");}, 1000);
      },
      () => {}
    );
  },
  mounted: function() {
    // 基于准备好的dom，初始化echarts实例
    var chartLeft = echarts.init(document.getElementById("pinLeft"));
    var chartRight = echarts.init(document.getElementById("pinRight"));
    // 绘制图表

    chartLeft.setOption({
      title: {
        text: "设备基本状态",
        subtext: "统计设备量：20",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["开机初始化", "正常运行", "故障中", "维修中", "关机"]
      },
      series: [
        {
          name: "设备状态",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 1, name: "开机初始化" },
            { value: 8, name: "正常运行" },
            { value: 2, name: "故障中" },
            { value: 3, name: "维修中" },
            { value: 6, name: "关机" }
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
        subtext: "统计设备量：20",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["无预警", "橙色预警", "黄色预警", "红色预警","预警断线"]
      },
      series: [
        {
          name: "设备状态",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 8, name: "正常" },
            { value: 4, name: "橙色预警" },
            { value: 2, name: "黄色预警" },
            { value: 3, name: "红色预警" },
            { value: 3, name: "预警断线" }
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
  },
  methods: {
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
  }
  .pinsWrap{
    margin:0 10px 10px 10px;
    height: 300px;
    display: flex;
    &>div{
      flex: 1;
      margin: 5px;
      border: solid 1px #ccc;
    }
  }
}
</style>

