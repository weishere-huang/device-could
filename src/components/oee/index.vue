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
                  :empty-text="organizationEmptytTxt"
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
                  :empty-text="equTypeEmptytTxt"
                  :expand-on-click-node="false"
                  @node-click="treeNodeClick">
                </el-tree>
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
            </el-collapse-item> -->
          </el-collapse>
        </el-aside>
        <el-main class="monitMainContent2">
          <section class="topWrap">
            <div>当前设备组：常减压产线组 / 数量（台）：20</div>
            <div>
              刷新频次：
                <el-select v-model="refreshValue" size="small" placeholder="请选择" style="width:100px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button size="small" type="primary"><i class='el-icon-refresh'></i> 立即刷新</el-button>
            </div>
          </section>
          <section class="pinsWrap">
            
          </section>
          <section class='equListWrap'>
            <div>
              <el-row>
                <el-col :span="6">
                  <el-card shadow="always" class="cardItem">
                    <div slot="header" class="clearfix">
                      <span class="cardItem-header">
                        <el-tooltip class="item" effect="light" content="严重警报，请立即检查设备" placement="top">
                          <i class="iconfont c-red">&#xe651;</i>
                        </el-tooltip>
                        &nbsp;常减压装置</span>
                      <router-link :class="'g-link f14'" style="float: right; padding: 3px 0" to="/Monit/12">运行日志</router-link>
                    </div>
                    <div class="text item">
                        <p>编号：CH10002355</p>
                        <!-- <div class="separate"></div> -->
                        <ul>
                          <li><i class="iconfont">&#xe658;</i>温度：<span>88℃</span></li>
                          <li><i class="iconfont">&#xe607;</i>压力：<span>8ps</span></li>
                          <li><i class="iconfont">&#xe628;</i>主轴转速：<span>1200转/分</span></li>
                          <li><i class="iconfont">&#xe76a;</i>主润滑液位：<span>117.2</span></li>
                          <li><i class="iconfont">&#xe641;</i>振动频率：<span>8Hz</span></li>
                        </ul>
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
              </el-row>
            </div>
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
      
    };
  },
  created: function() {
    
  },
  mounted: function() {

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
  .monitMainContent2 {
    padding-top: 0;
    .topWrap{
      border:solid 1px #dfdfdf;
      border-radius: 5px;
      height: 55px;
      margin: 0 10px 5px 10px;
      display: flex;
      font-size: 12px;
      &>div:first-child {
        flex: 1;
        margin: 5px;
        line-height: 40px;
        //border: solid 1px #dfdfdf;
      }
      &>div:last-child {
        flex: 3;
        margin: 5px;
        //border: solid 1px #dfdfdf;
        text-align: right;
        div{
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
  .equListWrap{
    //border: solid 1px #ccc;
    margin: 0 5px 5px 5px;
  }
  .el-card__body{
    padding: 10px;
  }
  .cardItem{
    margin: 5px;
    .cardItem-header{
      font-size: 16px;
    }
    p{
      padding-bottom: 10px;
      font-size: 14px;
      border-bottom: solid 3px #0e8561;
    }
    .separate{
      background:  #0e8561;
      height: 3px;
      border-radius: 1px;
    }
    ul{
      margin-top: 5px;
      list-style-type: none;
      display: inline-block;
      width: 100%;
      font-size: 12px;
      li{
        width: 100%;
        line-height: 22px;
        i{margin: 0 5px;}
        span{
          font-weight: bold;
        }
        &:hover{
          background: #e3edf8
        }
      }
    }
    .red{
      cursor: pointer;
    }
  }
}
</style>

