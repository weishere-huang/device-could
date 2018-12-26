<template>
  <div class="addPerson">
    <div class="addCase">
      <!-- <div class="top">
        <span>添加人员</span>
        <label>
          <button @click="isHide">×</button>
        </label>
      </div> -->
      <div class="bottom">
        <div class="left">
          <h5>组织机构</h5>
          <div class="treeCase">
            <el-tree
              :data="data2"
              node-key="id"
              default-expand-all
              @node-click="handleNodeClick"
              :expand-on-click-node="false"
              :props="defaultProps"
              style="height:350px;overflow: scroll;"
            >
              <span
                class="custom-tree-node"
                slot-scope="{ node, data }"
              >
                <span class="listcontent">{{ data.name }}</span>
              </span>
            </el-tree>
          </div>
        </div>
        <div class="center">
          <div class="search">
            <el-input
              type="search"
              size="mini"
              style="width:30%;"
              placeholder="如姓名，电话"
              v-model="condition"
            ></el-input>
            <el-button size="mini" type="primary" @click="findpeopler">搜索</el-button>
            <span style="padding:0 10px;">最近搜索：</span>
            <span style="text-decoration: underline;"></span>
          </div>
          <div class="tableList">
            <v-table
              is-vertical-resize
              is-horizontal-resize
              :vertical-resize-offset='100'
              column-width-drag
              :multiple-sort="false"
              style="width:100%;height:350px;"
              :columns="columns"
              :table-data="tableData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
              @on-custom-comp="customCompFunc"
            ></v-table>
            <div
              class="mt20 mb20 bold"
              style="text-align:center;margin-top:30px"
            >
              <v-pagination
                @page-change="pageChange"
                @page-size-change="pageSizeChange"
                :total="tablenum"
                :page-size="pageSize"
                :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
              ></v-pagination>
            </div>
          </div>
        </div>
        <div class="right">
          <el-button
            size="mini"
            type="primary"
            @click="deletes"
          >清空</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="toAdd"
          >保存</el-button>
          <div class="personList">
            <el-tabs
              type="border-card"
              @tab-click="getNode"
              v-model="editableTabsValue"
              :tab-position="tabPosition"
              style="height: 350px;overflow:scroll;"
            >
              <el-tab-pane
                :key="item.name"
                v-for="item in editableTabs"
                :label="item.workerTypeName"
                :name="item.workerType"
              >
                <!-- <span>{{item.content}}
                  <label><i class="iconfont icon-cha"></i></label>
                </span> -->
                <tab-component
                  :items="item"
                  :deleteWorker="workerDelete"
                ></tab-component>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
var tabComponent = Vue.component("tab-component", {
  props: {
    items: {
      type: Object,
      required: true
    },
    deleteWorker: {
      type: Function,
      required: true
    }
  },
  template:
    '<ul class="workerList"><li v-for="item in items.content">{{ item.workerName }}<i v-on:click="deleteWorker(item)" class="el-icon-circle-close-outline"></i></li></ul>'
});
Vue.component("table-addPerson", {
  template: `<span>
        <el-tooltip class="item" effect="dark" content="添加" placement="top">
            <i style='font-size:16px;cursor: pointer;' class='el-icon-circle-plus-outline' @click.stop.prevent="add(rowData,index)"></i>
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
    add() {
      let params = { type: "add", index: this.index, rowData: this.rowData };
      this.$emit("on-custom-comp", params);
    },
    
  }
});
export default {
  inject: ["reload"],
  name: "",
  props: {
    personAddHandler: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      //搜索
      pkeyword:"",
      editableTabs: [
        {
          workerTypeName: "负责",
          workerType: "0",
          content: []
        },
        {
          workerTypeName: "维修",
          workerType: "1",
          content: []
        },
        {
          workerTypeName: "检修",
          workerType: "2",
          content: []
        },
        {
          workerTypeName: "保养",
          workerType: "3",
          content: []
        },
        {
          workerTypeName: "操作",
          workerType: "4",
          content: []
        }
      ],
      editableTabsValue: "0",
      tabPosition: "top",
      pageIndex: 1,
      pageSize: 10,
      toValue: "",
      tableData: [],
      tableDate: [],
      columns: [
        {
          field: "name",
          title: "姓名",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
          // orderBy: ""
        },

        {
          field: "position",
          title: "岗位",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          field: "phone",
          title: "手机号",
          width: 90,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "details",
          title: "操作",
          width: 80,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          componentName: "table-addPerson"
        }
      ],
      tablenum: 0,
      data2: [{ code: "1000" }],
      defaultProps: {
        children: "children",
        label: "label"
      },
      value: "",
      orgcode:"",
      condition:""
    };
  },
  methods: {
    customCompFunc(params) {
      if (params.type === "add") {
        // do delete operation
        console.log(params);
        this.getRowData(params.rowData)
      
      } 
    },
    getRowData(b) {
      //console.log(b.name);
      //console.log(this.editableTabs[this.editableTabsValue]);
      //this.editableTabs[this.editableTabsValue].content += b.name + ",";
      if (
        this.editableTabs[this.editableTabsValue].content.find(
          i => i.id === b.id
        )
      ) {
        this.$message("此绑定类型不能添加重复的人员");
      } else {
        this.editableTabs[this.editableTabsValue].content.push({
          workerName: b.name,
          id: b.id
        });
      }
    },
    getNode(a) {
      console.log(a);
      console.log(this.editableTabsValue);
    },
    handleNodeClick(data) {
      console.log(data);
      this.orgcode=data.code
      this.findpeopler();
    },
    isHide() {
      this.$emit("isHide", false);
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
      this.findpeopler();
    },
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getTableData();
      this.findpeopler();
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
    findpeopler() {
      this.Axios(
        {
          params: {
            organizeCode: this.orgcode,
            page:this.pageIndex,
            size:this.pageSize,
            condition:this.condition,
          },
          option: {
            enableMsg:false
          },
          type: "get",
          url: "/employee/findByOrganizeCode",
          loadingConfig: {
            target: document.querySelector(".el-dialog")
          }
        },
        this
        // .get(this.global.apiSrc + "/employee/findByOrganizeCode", {params:{organizeCode:code}})
      ).then(
        result => {
          if (result.data.code === 204) {
            this.tableData = [];
          } else {
            console.log("按照组织机构编号查询人");
            console.log(result.data);
            this.tableData = result.data.data.content;
            this.tablenum = result.data.data.totalElements;
          }
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
    toAdd() {

      this.$props.personAddHandler(this.editableTabs);

    },
    deletes() {
      this.editableTabs[this.editableTabsValue].content=[];
    },
    workerDelete(data) {
      //debugger;
      this.editableTabs[this.editableTabsValue].content = this.editableTabs[
        this.editableTabsValue
      ].content.filter(item => item.id !== data.id);
    },

    psearch(){
      //条件模糊查询,前端控制
      // this.pkeyword =""
      console.log(this.tableData);
      console.log("---");
      let newarr = new Array();
      for(let i=0;i<this.tableData.length;i++){
        // this.tableData = this.tableData[i]
        //   .filter(item => item.name.indexOf(this.pkeyword) >= 0  && item.phone.indexOf(this.pkeyword) >= 0 && item.position.indexOf(this.pkeyword) >= 0);
        if(this.tableData[i].name.indexOf(this.pkeyword) >= 0 || this.tableData[i].phone.indexOf(this.pkeyword) >= 0 || this.tableData[i].position.indexOf(this.pkeyword) >= 0){
          newarr.push(this.tableData[i]);
        }
      }
      this.tableData = newarr;
      console.log(this.tableData);
    },
    getorg(){
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
          url: "/organize/allOrganize"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        },
        this
      )
      // .get(this.global.apiSrc + "/organize/allOrganize")
        .then(
          result => {
            console.log("查询所有组织机构");
            console.log(result.data);
            console.log(result.data.data);
            let pcode = Math.min.apply(null, (result.data.data).map((item)=>{return item.parentCode}));
            let arr = this.filterArray(result.data.data, pcode);
            console.log(arr);
            //this.data2 = this.filterArray(result.data.data,1000);
            this.data2 = arr;

            this.orgcode=result.data.data[0].code;
            this.findpeopler();
          },
          ({ type, info }) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        )
        .catch(err => {
          console.log(err);
        });
    }

  },
  created() {
    this.getorg();
  }
};
</script>

<style lang="less">
@import url("../../assets/font/font.css");

@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.addPerson {
  // position: fixed;
  // width: 100vw;
  // height: 100vh;
  // top: 0;
  // left: 0;
  // background-color: #42424227;
  .addCase {
    width: 100%;
    background-color: white;
    margin: auto;
    border-radius: 5px;
    // margin-top: 100px;
    font-size: 14px;
    .top {
      padding: 10px;
      border-bottom: @border;
      label {
        display: inline-block;
        float: right;
        font-size: 20px;
        button {
          font-size: 16px;
          width: 18px;
          border: none;
          background-color: white;
          &:active {
            background-color: #74b6f8;
          }
        }
      }
    }
    .bottom {
      margin-top: 20px;
      padding: 10px;
      font-size: 0;
      overflow: hidden;
      .left {
        width: 25%;
        border: @border;
        min-height: 400px;
        position: relative;
        float: left;
        margin-right: 1%;
        font-size: 12px;
        // height: 350px;
        // overflow: scroll;
        h5 {
          position: absolute;
          top: -10px;
          left: 10px;
          font-size: 14px;
        }
        .treeCase {
          margin-top: 20px;
        }
      }
      .center {
        width: 48%;
        min-height: 400px;
        float: left;
        margin-right: 1%;
        font-size: 12px;
        .search {
          padding: 0 10px;
        }
        .tableList {
          margin-top: 10px;
          padding: 10px;
          border: @border;
          border-radius: 5px;
          max-height: 500px;
        }
      }
      .right {
        width: 25%;
        min-height: 400px;
        float: left;
        font-size: 12px;
        .personList {
          margin-top: 10px;
          width: 100%;
          border: @border;
          border-radius: 5px;
          min-height: 360px;
          padding: 10px;
          .el-tab-pane {
            span {
              display: inline-block;
              width: 100%;
              label {
                float: right;
                display: none;
                i {
                  cursor: pointer;
                  &:hover {
                    color: #409eff;
                  }
                }
              }
              &:hover {
                label {
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
}
.workerList {
  list-style-type: none;
  li {
    line-height: 22px !important;
    padding: 3px;
    &:nth-child(2n-1) {
      background: #f7f7f7;
    }
    i {
      float: right;
      line-height: 22px;
      cursor: pointer;
      &:hover {
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>
