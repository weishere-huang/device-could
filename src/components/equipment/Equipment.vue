<template>
  <div class="equipment">
    <div class="equipmentContent">
      <div class="classifylist">
        <div class="classify">
          <ul>
            <h5><i class='iconfont icon-leimupinleifenleileibie'></i>&nbsp;所有分类</h5>
            <li>
              ├生产设备
            </li>
            <li>
              ├非生产设备
            </li>
            <li>
              ├辅助生产设备
            </li>
            <li>
              ├检验检测设备
            </li>
            <li>
              ├其他设备
            </li>
          </ul>
        </div>
        <div class="category">
          <ul>
            <h5><i class='iconfont icon-shuqian'></i>&nbsp;所有类别</h5>
            <li>
              ├炉类
            </li>
            <li>
              ├塔类
            </li>
            <li>
              ├反应器类
            </li>
            <li>
              ├动力类
            </li>
            <li>
              ├储罐及容器类
            </li>
            <li>
              ├冷换设备类
            </li>
            <li>
              ├通用机械类
            </li>
            <li>
              ├化工机械类
            </li>
            <li>
              ├起重运输类
            </li>
            <ul class="transitlist">
              <li>
                ├起重设备
              </li>
              <li>
                ├厂内机动车
              </li>
            </ul>
            <li>
              ├其他设备类
            </li>
          </ul>
        </div>
        <div class="tone">
          <h5><i class='iconfont icon-shebeiguanli'></i>&nbsp;设备状况</h5>
          <ul>
            <li>
              ├使用
            </li>
            <li style="color:#FF990E">
              ├闲置
            </li>
            <li style="color:#00990C">
              ├封存
            </li>
            <li style="color:#0C99FD">
              ├租赁
            </li>
            <li style="color:#993202">
              ├报废
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="search">
        <el-button size="small" @click="toAdd">添加</el-button>
        <el-button size="small" @click="sort()"> 复制</el-button>
        <el-button size="small">删除</el-button>
        <div class="searchright">
          <span>关键字：</span>
          <el-input type="search" size="small" placeholder="根据设备编号，名称，位号"></el-input>
          <el-button size="small">搜索</el-button>
          <span style="color:#409eff;font-size:12px;cursor: pointer;" @click="adShow">高级搜索</span>
        </div>
      </div>
      <div class="tablelist">
        <div>
          <v-table is-vertical-resize is-horizontal-resize :vertical-resize-offset='100' column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :select-all="selectALL" :select-group-change="selectGroupChange" :row-dblclick="redactShow"></v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="50" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <advanced class="adsearch" v-on:isHide="isHide"></advanced>
  </div>
</template>
<script>
import advanced from "./Advanced";
export default {
  name: "equipment",
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      tableData: [
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        },
        {
          name: "111",
          tel: "222",
          address: "3333",
          hobby: "4444"
        }
      ],
      tableDate: [],
      columns: [
        {
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        {
          field: "tel",
          title: "设备编号",
          width: 90,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
          // orderBy: ""
        },
        {
          field: "address",
          title: "设备名称",
          width: 100,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "hobby",
          title: "设备状况",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "address",
          title: "所属部门",
          width: 90,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "安装位置",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "设备位号",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "设备类别",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "设备型号",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "address",
          title: "设备负责人",
          width: 80,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        }
      ]
    };
  },
  methods: {
    adShow(){
      document.querySelectorAll('.adsearch')[0].style.right=0;
    },
    isHide:function (params) {
      document.querySelectorAll('.adsearch')[0].style.right=params;
    },
    toAdd() {
      this.$router.push("/EquipmentAdd");
    },
    redactShow(rowIndex, rowData, column) {
      this.$router.push("/Redact");
      this.$store.commit("equipmentRedact", rowData);
    },
    selectGroupChange(selection) {
      console.log("select-group-change", selection);
    },
    selectALL(selection) {
      console.log("select-aLL", selection);
    },
    selectChange(selection, rowData) {
      console.log("select-change", selection, rowData);
    },
    getTableData() {
      this.tableData = this.tableDate.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getTableData();
      console.log(pageIndex);
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
    },
    sortChange(params) {
      if (params.height.length > 0) {
        this.tableConfig.tableData.sort(function(a, b) {
          if (params.height === "asc") {
            return a.height - b.height;
          } else if (params.height === "desc") {
            return b.height - a.height;
          } else {
            return 0;
          }
        });
      }
    }
  },
  components: {
    advanced
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/font/font.css");
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
.equipment {
  overflow: hidden;
  .equipmentContent {
    font-size: 12px;
    color: #666666;
    width: 200px;
    overflow: hidden;
    float: left;
    font-size: 12px;
    .classifylist {
      width: 170px;
      overflow: hidden;
      margin: 10px;
      float: left;
      border: 1px solid @Info;
      padding: 10px;
      border-radius: 5px;
      h5 {
        width: 100%;
        text-align: left;
        display: inline-block;
        padding: 5px 14px 0 0;
      }
      li {
        list-style-type: none;
        text-align: left;
        padding: 4px 0 4px 20px;
        letter-spacing: 1px;
        cursor: pointer;
        &:hover {
          background-color: @Info;
        }
      }
      .transitlist {
        padding-left: 20px;
      }
    }
  }
  .content {
    width: 80%;
    min-width: 700px;
    float: left;
    margin: 10px 0 0 0;
    // border: 1px solid @Info;
    // border-radius:5px;
    .search {
      border: 1px solid @Info;
      border-radius: 5px;
      height: 60px;
      line-height: 60px;
      padding: 0 10px;
      // overflow: hidden;
      .searchright {
        font-size: 12px;
        float: right;
        // display: inline-block;
      }
    }
    .tablelist {
      font-size: 12px;
      margin-top: 10px;
      padding: 10px;
      border: 1px solid @Info;
      border-radius: 5px;
      min-height: 500px;
    }
  }
}
.el-input__inner {
  //   width: 150px !important;
  display: inline !important;
}
.el-input {
  width: auto !important;
  padding: 0 !important;
}
.adsearch {
    position: absolute;
    top: 60px;
    right: -310px;
    transition: all 0.3s ease-in;
  }
</style>
