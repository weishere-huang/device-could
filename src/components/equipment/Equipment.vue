<template>
  <div class="equipment">
    <div class="equipmentContent">
      <div class="classifylist">
        <div class="classify">
          <ul>
            <h5><i class='iconfont icon-leimupinleifenleileibie'></i>&nbsp;所有分类</h5>
            <li>├生产设备</li>
            <li>├非生产设备</li>
            <li>├辅助生产设备</li>
            <li>├检验检测设备</li>
            <li>├其他设备</li>
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
            <li>├使用</li>
            <li style="color:#FF990E">├闲置</li>
            <li style="color:#00990C">├封存</li>
            <li style="color:#0C99FD">├租赁</li>
            <li style="color:#993202">├报废</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="search">
        <el-button
          size="small"
          @click="toAdd"
        >添加
        </el-button>
        <el-button
          size="small"
          @click="editShow"
        >修改
        </el-button>
        <!--<el-button size="small" > 复制</el-button>-->
        <el-button
          size="small"
          @click="edelete"
        >删除
        </el-button>
        <div class="searchright">
          <span>关键字：</span>

          <el-input
            type="search"
            size="small"
            placeholder="根据设备编号，名称，位号"
            v-model="keyWord"
          ></el-input>
          <el-button
            size="small"
            @click="findByKeyWord"
          >搜索
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
            style="width:100%;min-height:400px;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :select-all="selectALL"
            :select-group-change="selectGroupChange"
            :row-dblclick="redactShow"
            ref="equipmentTable"
          ></v-table>
          <div
            class="mt20 mb20 bold"
            style="text-align:center;margin-top:30px"
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

  export default {
    name: "equipment",
    data() {
      return {
        organiza: "",
        totalnum:"",
        defaultProps: "",
        keyWord: "",
        deviceId: "",
        pageIndex: 1,
        pageSize: 10,
        ids: "",
        edbt: "",
        tableData: [{
        }],
        tableDate: [],
        totalElements: "",
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
            isResize: true
            // orderBy: ""
          },
          {
            field: "deviceName",
            title: "设备名称",
            width: 100,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "deviceState",
            title: "设备状况",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "organizeName",
            title: "所属部门",
            width: 90,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "location",
            title: "安装位置",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "locationNo",
            title: "设备位号",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "deviceCategoryName",
            title: "设备类别",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "deviceModel",
            title: "设备型号",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "workerNames",
            title: "设备负责人",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          }
        ],
        //监控为条件或高级搜索
        keyorall:0,
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      advanceValue(params) {
        this.tableData = params;

      },
      adsearch() {
        $(".adsearch")[0].style.right = 0;
      },
      isHide(params) {
        $(".adsearch")[0].style.right = params;
      },
      toAdd() {
        this.$router.push("/EquipmentAdd");
      },
      editShow() {
        if (this.edbt.length == 1) {
          this.$router.push("/Redact/" + this.edbt[0].id);
          this.$store.commit("equipmentRedact", this.edbt);
        } else {
          alert("只能选择选择一行数据!!!");
        }
      },
      redactShow(rowIndex, rowData, column) {
        this.$router.push("/Redact/" + rowData.id);
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
        if(this.keyorall === 0){
          this.findall();
        }else{
          this.findByKeyWord();

        }
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
        this.findall();
      },
      sortChange(params) {
        if (params.height.length > 0) {
          this.tableConfig.tableData.sort(function (a, b) {
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

      //通过
      findall(data) {
        this.keyorall = 0
        //根据用户token查询所属组织机构下设备类别
        EventBus.$on("sideBarTroggleHandle", isCollapse => {
          window.setTimeout(() => {
            this.$refs.equipmentTable.resize();
          }, 500);
        })
        this.Axios({
          params: {
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
        },this)
          //.get(this.global.apiSrc + "/device/select", {params:{ page: this.pageIndex,size: this.pageSize}})
          .then(result => {
            this.totalnum = result.data.data.totalElements;
              console.log("++++");
            console.log(result.data);
            this.tableData = result.data.data.content;
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].deviceState === 1) {
                this.tableData[i].deviceState = "在用";
              }
              if (this.tableData[i].deviceState === 2) {
                this.tableData[i].deviceState = "出租";
              }
              if (this.tableData[i].deviceState === 3) {
                this.tableData[i].deviceState = "停用";
              }
              if (this.tableData[i].deviceState === 4) {
                this.tableData[i].deviceState = "封存";
              }
              if (this.tableData[i].deviceState === 5) {
                this.tableData[i].deviceState = "报废";
              }
            }
            console.log(result.data);
            this.totalElements = result.data.data.totalElements
          },
            ({type, info}) => {
              //错误类型 type=faild / error
              //error && error(type, info);
            }
          )
          // .catch(err => {
          //   console.log(err);
          // });
      },

      //通过
      // findDeviceState(id) {
      //   //获取设备状况接口
      //   let ids = id;
      //   this.Axios({
      //     option: {
      //       enableMsg: false
      //     },
      //     type: "get",
      //     url: "/enterprise/findByNameOrState"
      //     // loadingConfig: {
      //     //   target: document.querySelector("#mainContentWrapper")
      //     // }
      //   },this)
      //    // .get(this.global.apiSrc + "/device/findDeviceState")
      //     .then(result => {
      //       let arr = new Array();
      //       arr = result.data.data;
      //       console.log(arr);
      //       console.log(result.data);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // },
      findByKeyWord() {
        this.keyorall = 1
        //根据设备编号、位号、名称查询
        this.Axios({
          params: {
            page: this.pageIndex,
            size: this.pageSize,
            keyWord: this.keyWord
          },
          // option: {
          //   enableMsg: false
          // },
          type: "get",
          url: "/device/findByKeyWord"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },this)
          // .get(this.global.apiSrc + "/device/findByKeyWord", {
          //   params: {
          //     page: this.pageIndex,
          //     size: this.pageSize,
          //     keyWord: this.keyWord
          //   }
          // })
          .then(result => {
            this.tableData = result.data.data.content;
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].deviceState === 1) {
                this.tableData[i].deviceState = "在用";
              }
              if (this.tableData[i].deviceState === 2) {
                this.tableData[i].deviceState = "出租";
              }
              if (this.tableData[i].deviceState === 3) {
                this.tableData[i].deviceState = "停用";
              }
              if (this.tableData[i].deviceState === 4) {
                this.tableData[i].deviceState = "封存";
              }
              if (this.tableData[i].deviceState === 5) {
                this.tableData[i].deviceState = "报废";
              }
            }
            console.log(result.data.data.content);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // getDeviceById() {
      //   //根据员工id查询相关设备信息接口，支持分页（用于设备模块）
      //   let qs = require("qs");
      //   let data = qs.stringify({
      //     page: this.pageIndex,
      //     size: this.pageSize,
      //     employeeId: 147
      //   });
      //   this.Axios({
      //     params: Object.assign(this.searchParams, {
      //       page: this.pageIndex,
      //       size: this.pageSize,
      //       employeeId: 147
      //     }),
      //     // option: {
      //     //   enableMsg: false
      //     // },
      //     type: "get",
      //     url: "/enterprise/findByNameOrState"
      //     // loadingConfig: {
      //     //   target: document.querySelector("#mainContentWrapper")
      //     // }
      //   },this)
      //    // .get(this.global.apiSrc + "/employee/getDeviceById", data)
      //     .then(result => {
      //       alert("getDeviceById");
      //       console.log(result.data);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // },
      edelete() {
        let qs = require("qs");
        let data = qs.stringify({
          deviceIds: this.ids
        });
        this.Axios({
          url: "/device/delete",
          params: data,
          type: "post",
          option: {
            enableMsg: false
          }
        },this)
          //.post(this.global.apiSrc + "/device/delete", data)
          .then(result => {
            this.findall();
            alert("删除成功");
            console.log("delete");
            console.log(result.data);
          },
            ({type, info}) => {
            }
          )
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
        this.Axios({
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
        },this)
         // .get(this.global.apiSrc + "/deviceCategory/all", data)
          .then(result => {
            this.organiza = this.filterArray(result.data.data, 0);
            console.log("查找全部设备类别");
            console.log(result.data);
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    created() {
      this.findall();
      //this.findDeviceState();
      this.findAlldeviceClassify();

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
    position: relative;
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
    right: -310px;
    transition: all 0.3s ease-in;
  }
</style>
