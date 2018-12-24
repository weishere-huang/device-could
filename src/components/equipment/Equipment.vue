<template>
  <div class="equipment">
    <router-view></router-view>
    <div class="equipmentContent" :class="[{hide:isHideList}]">
      <div class="classifylist">
        <div class="classify">
          <ul>
            <h5><i class='iconfont icon-leimupinleifenleileibie'></i>&nbsp;所有分类</h5>
            <li @click="leftcontro(1,'','')">├生产设备</li>
            <li @click="leftcontro(2,'','')">├非生产设备</li>
            <li @click="leftcontro(3,'','')">├辅助生产设备</li>
            <li @click="leftcontro(4,'','')">├检验检测设备</li>
            <li @click="leftcontro(5,'','')">├其他设备</li>
          </ul>
        </div>
        <div class="category">
          <h5><i class='iconfont icon-shuqian'></i>&nbsp;所有类别</h5>
          <el-tree
            :data="organiza"
            default-expand-all
            :props="defaultProps"
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
            >
              <span class="listcontent">{{ data.categoryName}}</span>
            </span>
          </el-tree>
        </div>
        <div class="tone">
          <h5><i class='iconfont icon-shebeiguanli'></i>&nbsp;设备状况</h5>
          <ul>
            <li @click="leftcontro('','','1')">├在用</li>
            <li
              style="color:#FF990E"
              @click="leftcontro('','','2')"
            >├出租</li>
            <li
              style="color:#00990C"
              @click="leftcontro('','','3')"
            >├停用</li>
            <li
              style="color:#0C99FD"
              @click="leftcontro('','','4')"
            >├封存</li>
            <li
              style="color:#993202"
              @click="leftcontro('','','5')"
            >├报废</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content" :class="[{hide:isHideList}]">
      <div class="search">
        <el-button
          size="small"
          type="primary"
          @click="toAdd"
        ><i style='font-size:12px' class='iconfont'>&#xe62f;</i>&nbsp; 添加
        </el-button>
        <el-button size="small" type="primary" @click="reload()"><i class='el-icon-refresh'></i> 立即刷新</el-button>
        <!-- <el-button
          size="small"
          type="primary"
          @click="editShow"
          disabled
        >修改
        </el-button> -->
        <!--<el-button size="small" > 复制</el-button>-->
        <div class="searchright">
          <span>关键字：</span>
          <el-input
            type="search"
            size="small"
            placeholder="根据设备编号，名称，位号"
            v-model="keyWord"
            style="width:200px"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            @click="beforefindByKeyWord"
          ><i class='el-icon-search'></i> 搜索
          </el-button>
          <span
            style="color:#409eff;font-size:12px;cursor: pointer;"
            @click="adsearch"
          >高级搜索</span>

        </div>
      </div>
      <div class="tablelist">
        <div>
          <v-table
            is-vertical-resize
            is-horizontal-resize
            :vertical-resize-offset='100'
            column-width-drag
            :multiple-sort="false"
            style="width:100%;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :select-all="selectALL"
            :select-group-change="selectGroupChange"
            :row-dblclick="redactShow"
            ref="equipmentTable"
            @on-custom-comp="customCompFunc"
          ></v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:left;margin-top:20px"
          >
            <v-pagination
              @page-change="pageChange"
              @page-size-change="pageSizeChange"
              :total="totalnum"
              :page-size="pageSize"
              :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
            ></v-pagination>
          </div>
        </div>
      </div>
    </div>

    <advanced
      class="adsearch"
      v-on:isHide="isHide"
      v-on:advanceValue="advanceValue"
    ></advanced>
  </div>
</template>
<script>
import advanced from "./Advanced";
import Vue from "vue";
export default {
  inject: ["reload"],
  name: "equipment",
  data() {
    return {
      isHideList: this.$route.params.id !== undefined
        ? true
        : false,
      organiza: "",
      totalnum: "",
      defaultProps: "",
      keyWord: "",
      deviceId: "",
      pageIndex: 1,
      pageSize: 10,
      ids: "",
      edbt: "",
      tableData: [{}],
      tableDate: [],
      columns: [
        {
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
        {
          field: "deviceNo",
          title: "设备编号",
          width: 90,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
          // orderBy: ""
        },
        {
          field: "deviceName",
          title: "设备名称",
          width: 120,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "deviceState",
          title: "设备状况",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true,
          formatter: function (rowData, rowIndex, pagingIndex, field) {
            if (rowData.deviceState === 1) {
              return `<span >在用</span>`
            }else if(rowData.deviceState === 2){
              return `<span style="color:#FF990E">出租</span>`
            }else if(rowData.deviceState === 3){
              return `<span style="color:#00990C">停用</span>`
            }else if(rowData.deviceState === 4){
              return `<span style="color:#0C99FD">封存</span>`
            }else if(rowData.deviceState === 5){
              return `<span style="color:#993202">报废</span>`
            }

          },
        },
        {
          field: "organizeName",
          title: "所属部门",
          width: 140,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "location",
          title: "安装位置",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "locationNo",
          title: "设备位号",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "deviceCategoryName",
          title: "设备类别",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "deviceModel",
          title: "设备型号",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "workerNames",
          title: "负责人",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          overflowTitle: true
        },
        {
          field: "custome-adv",
          title: "操作",
          width: 70,
          titleAlign: "center",
          columnAlign: "center",
          componentName: "table-equipment"
          // isResize: true
        }
      ],
      //监控为条件或高级搜索或左侧搜索栏
      keyorall: 0,
      //左侧搜索栏
      leftclass: "",
      leftcate: "",
      leftstate: "",
      //高级搜索
      deviceName: "",
      locationNo: "",
      workerName: "",
      manufacturer: "",
      deviceSates: ""
    };
  },
  methods: {
    customCompFunc(params) {
      console.log(params);

      if (params.type === "delete") {
        // do delete operation
        this.ids = params.rowData.id;
        this.warningdelete();
        this.$delete(this.tableData, params.index);
      } else if (params.type === "edit") {
        // do edit operation
        this.$router.push({path:"Equipment/Redact/" + params.rowData.id});
        //alert(`行号：${params.index} 姓名：${params.rowData["name"]}`);
      } else if (params.type === "audit") {
        // do edit operation

        alert(`ID：${params.rowData["id"]} 姓名：${params.rowData["name"]}`);
      }
    },
    handleNodeClick(data) {
      this.leftcate = data.categoryNo;
      this.leftstate = "";
      this.leftclass = null;
      this.keyorall = 2;
      this.pageIndex = 1;
      console.log(data);
      this.leftfind();
    },
    advanceValue(params) {
      // this.tableData = params;
      (this.deviceName = params.deviceName),
        (this.locationNo = params.locationNo),
        (this.workerName = params.workerName),
        (this.manufacturer = params.manufacturer),
        (this.deviceSates = params.deviceSates),
        (this.pageIndex = 1),
        this.findall();
      console.log(params);
    },
    adsearch() {
      $(".adsearch")[0].style.right = 0;
    },
    isHide(params) {
      $(".adsearch")[0].style.right = params;
    },
    toAdd() {
      this.$router.push({path:"Equipment/EquipmentAdd"});
    },
    editShow() {
      if (this.edbt.length == 1) {
        this.$router.push({path:"Equipment/Redact/" + this.edbt[0].id});
        this.$store.commit("equipmentRedact", this.edbt);
      } else {
        this.$message("只能选择选择一行数据!!!");
      }
    },
    redactShow(rowIndex, rowData, column) {
      this.$router.push({path:"Equipment/Redact/" + rowData.id});
      this.$store.commit("equipmentRedact", rowData);
      console.log(rowData);
    },
    selectGroupChange(selection) {
      console.log("select-group-change", selection);
      this.ids = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.ids != "") {
          this.ids += "," + selection[i].id;
        } else {
          this.ids += selection[i].id;
        }
      }
      this.edbt = selection;
      console.log(this.ids);
    },
    selectALL(selection) {
      this.ids = "";
      for (let i = 0; i < selection.length; i++) {
        if (this.ids != "") {
          this.ids += "," + selection[i].id;
        } else {
          this.ids += selection[i].id;
        }
      }
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
      console.log(this.pageSize);
      if (this.keyorall === 0) {
        this.findall();
      } else if (this.keyorall === 1) {
        this.findByKeyWord();
      } else {
        this.leftfind();
      }
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      if (this.keyorall === 0) {
        this.findall();
      } else if (this.keyorall === 1) {

      } else {
        this.leftfind();
      }
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
    },
    findall() {
      this.keyorall = 0;
      //根据用户token查询所属组织机构下设备类别
      EventBus.$on("sideBarTroggleHandle", isCollapse => {
        window.setTimeout(() => {
          this.$refs.equipmentTable.resize();
        }, 500);
      });
      this.Axios(
        {
          params: {
            page: this.pageIndex,
            size: this.pageSize,
            deviceName: this.deviceName,
            locationNo: this.locationNo,
            workerName: this.workerName,
            manufacturer: this.manufacturer,
            deviceSates: this.deviceSates
          },
          option: {
            enableMsg:true,
            successMsg:'设备信息加载完成~',
          },
          type: "get",
          url: "/device/select"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      )
        //.get(this.global.apiSrc + "/device/select", {params:{ page: this.pageIndex,size: this.pageSize}})
        .then(
          result => {
            this.totalnum = result.data.data.totalElements;
            console.log("查找设备");
            console.log(result.data);
            this.tableData = result.data.data.content;

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
    findByKeyWord() {
      this.keyorall = 1;
      //根据设备编号、位号、名称查询
      this.Axios(
        {
          params: {
            page: this.pageIndex,
            size: this.pageSize,
            keyWord: this.keyWord
          },
          type: "get",
          url: "/device/findByKeyWord"
        },
        this
      ).then(
        result => {
          this.totalnum = result.data.data.totalElements;
          this.tableData = result.data.data.content;

          console.log(result.data.data.content);
        },
        ({ type, info }) => {}
      );
    },
    beforefindByKeyWord(){
      this.pageIndex=1;
      this.findByKeyWord();
    },
    edelete() {
      let qs = require("qs");
      let data = qs.stringify({
        deviceIds: this.ids
      });
      this.Axios(
        {
          url: "/device/delete",
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      ).then(
        result => {
          console.log("delete");
          console.log(result);
          this.reload();
        },
        ({ type, info }) => {}
      );
      // .catch(err => {
      //   console.log(err);
      // });
    },
    filterArray(data, parent) {
      let vm = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].categoryParentNo == parent) {
          var obj = data[i];
          temp = this.filterArray(data, data[i].categoryNo);
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
          params: {
            page: this.pageIndex,
            size: this.pageSize
          },
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/deviceCategory/all"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      )
        // .get(this.global.apiSrc + "/deviceCategory/all", data)
        .then(
          result => {
            this.organiza = this.filterArray(result.data.data, 0);
            console.log("查找全部设备类别");
            console.log(result.data);
          },
          ({ type, info }) => {}
        );
    },
    warningdelete() {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.edelete();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    leftcontro(a, b, c) {
      this.keyorall = 2;
      if (c === "") {
        this.leftclass = a;
      }
      this.leftcate = "";
      this.leftstate = c;
      this.pageIndex = 1;

      this.leftfind();
    },
    leftfind() {
      this.Axios(
        {
          params: {
            classify: this.leftclass,
            deviceCategory: this.leftcate,
            deviceSates: this.leftstate,
            page: this.pageIndex,
            size: this.pageSize
          },
          // option: {
          //   enableMsg: false
          // },
          type: "get",
          url: "/device/select"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      )
        //.get(this.global.apiSrc + "/device/select", {params:{ page: this.pageIndex,size: this.pageSize}})
        .then(
          result => {
            this.totalnum = result.data.data.totalElements;
            console.log("++++");
            console.log(result.data);
            this.tableData = result.data.data.content;

          },
          ({ type, info }) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        );
    }
  },
  created() {
    this.findall();
    //this.findDeviceState();
    this.findAlldeviceClassify();
  },
  components: {
    advanced
  },
  watch: {
    $route() {
      //debugger
      let a=this.$route.matched.find(item=>(item.name==="EquipmentAdd"))?true:false;
      let b=this.$route.params.id !== undefined ? true : false;
      this.isHideList = a||b ?true:false;
    }
  },
};
Vue.component("table-equipment", {
  template: `<span>
          <el-tooltip class="item" effect="dark" content="修改" placement="top">
            <a href="" style="text-decoration: none;color:#409eff"><i @click.stop.prevent="update(rowData,index)" style='font-size:16px' class='iconfont'>&#xe6b4;</i></a>
          </el-tooltip>
          &nbsp;&nbsp;
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <a href="" style="text-decoration: none;color:#F56C6C"><i @click.stop.prevent="deleteRow(rowData,index)" style='font-size:16px' class='iconfont'>&#xe66b;</i></a>
          </el-tooltip>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    update() {
      // 参数根据业务场景随意构造
      let params = { type: "edit", index: this.index, rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    },
    deleteRow() {
      // 参数根据业务场景随意构造

      let params = { type: "delete", rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    }
  }
});
</script>
<style lang="less" scoped>
@import url("../../assets/font/font.css");

@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
.equipment {
  position: relative;
  overflow: hidden;
  min-height: 550px;

  .equipmentContent {
    font-size: 12px;
    color: #666666;
    width: 200px;
    // overflow: hidden;
    float: left;
    font-size: 12px;
    .classifylist {
      width: 170px;
      // overflow: hidden;
      margin: 10px;
      float: left;
      border: 1px solid @Info;
      padding: 10px;
      border-radius: 5px;
      .category{
        border: none;
      }
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
      // min-height: 500px;
    }
  }
}

.el-input__inner {
  //   width: 150px !important;
  display: inline !important;
}

.el-input {
  // width: auto !important;
  padding: 0 !important;
}

.adsearch {
  position: absolute;
  right: -310px;
  transition: all 0.3s ease-in;
}
</style>
