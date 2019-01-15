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
              v-model="condition"
              placeholder="如姓名，电话"
            ></el-input>
            <el-button
              size="mini"
              type="primary"
              @click="searchcontroller"
            >搜索</el-button>
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
              style="width:100%;min-height:250px;"
              :columns="columns"
              :table-data="tableData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
              :select-all="selectALL"
              :select-group-change="selectGroupChange"
              @on-custom-comp="customCompFunc"
              :show-vertical-border="false"
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
            <div
              v-for="(item,index) of editableTabs=personAddHandler"
              :key="index"
            >
              <tab-component
                :items="item"
                :deleteWorker="workerDelete"
                :values="item.workerType"
                v-on:changeTpye="changeTpye"
              ></tab-component>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-dialog
      width="300px"
      title="请选择管理人员类型"
      :visible.sync="innerVisible"
      append-to-body
    > -->
    <div
      append-to-body
      class="person-type"
      style="padding:10px; overflow: hidden;width:150px;"
      v-show="innerVisible"
    >
      <!-- <el-select
        v-model="value1"
        placeholder="请选择"
        style="width:100%"
      >
        <el-option
          v-for="item of options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->
      <ul class="work-person">
        <li v-for="(item,index) in options" :key="index" :class="active==index?'active-bgcolor':''" @click="workerTypeValue(item,index)">{{item.label}}</li>
      </ul>
      <div style="margin-top:10px;float:right;">
        <el-button
          size="mini"
          @click="innerVisible=flase"
        >取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="addPerson"
        >确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
Vue.component("tab-component", {
  template: `<ul class="workerList"><li v-for="(item,index) of items.content">{{ item.workerName }}
      <span style="display:inline;margin-left:5%;" >
        <el-select
          v-model="value=values"
          placeholder="请选择"
          style="width:50%"
          size="mini"
          @change="changeValue(value,item,items)"
          disabled
        >
          <el-option
            v-for="item of options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </span>
  <i v-on:click="deleteWorker(item,items)" class="el-icon-circle-close-outline"></i></li></ul>`,
  data() {
    return {
      options: [
        {
          value: "0",
          label: "负责人员"
        },
        {
          value: "1",
          label: "维修人员"
        },
        {
          value: "2",
          label: "检修人员"
        },
        {
          value: "3",
          label: "保养人员"
        },
        {
          value: "4",
          label: "操作人员"
        }
      ],
      value: ""
    };
  },
  props: {
    items: {
      type: Object,
      required: true
    },
    deleteWorker: {
      type: Function,
      required: true
    },
    values: {},
    changeTpye:{

    }
  },
  methods: {
    changeValue(data, rowdata,oldvalue) {
      this.value = data;
      let params = {};
      params = {
        value: data,
        person: rowdata,
        oldvalue:oldvalue
      };
      this.$emit("changeTpye", params);
    }
  }
});
Vue.component("table-RedactAdd", {
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
    }
  }
});
export default {
  inject: ["reload"],
  name: "",
  props: {
    personAddHandler: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      innerVisible: false,
      personnelMsg: "",
      condition: "",
      editableTabs: [
        {
          workerTypeName: "负责人员",
          workerType: "0",
          content: []
        },
        {
          workerTypeName: "维修人员",
          workerType: "1",
          content: []
        },
        {
          workerTypeName: "检修人员",
          workerType: "2",
          content: []
        },
        {
          workerTypeName: "保养人员",
          workerType: "3",
          content: []
        },
        {
          workerTypeName: "操作人员",
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
          titleAlign: "left",
          columnAlign: "left",
          isResize: true
          // orderBy: ""
        },

        {
          field: "position",
          title: "岗位",
          width: 80,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "phone",
          title: "手机号",
          width: 90,
          titleAlign: "left",
          columnAlign: "left",
          isResize: true
        },
        {
          field: "details",
          title: "操作",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true,
          componentName: "table-RedactAdd"
        }
      ],
      personListValue: [],
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      orgcode: "",
      //分页total
      tablenum: "",
      options: [
        {
          value: "0",
          label: "负责人员"
        },
        {
          value: "1",
          label: "维修人员"
        },
        {
          value: "2",
          label: "检修人员"
        },
        {
          value: "3",
          label: "保养人员"
        },
        {
          value: "4",
          label: "操作人员"
        }
      ],
      value1: "",
      active: -1,
      fristcode:""
    };
  },
  methods: {
    searchcontroller(){
      this.orgcode=this.fristcode;
      this.findpeopler();
    },
    workerTypeValue(item, index){
      this.value1=item.value
      this.active=index
    },
    changeTpye(params) {
      this.editableTabs[params.oldvalue.workerType].content =  this.editableTabs[params.oldvalue.workerType].content.filter(item => item.id !== params.person.id)
      this.editableTabs[params.value].content.push({
        workerName: params.person.workerName,
        id: params.person.id
      });
    },
    customCompFunc(params) {
      if (params.type === "add") {
        // do delete operation
        this.personnelMsg = params;
        this.innerVisible = true;
        // this.getRowData(params.rowData)
      }
    },
    addPerson() {
      this.innerVisible = false;
      this.editableTabsValue = this.value1;
      this.getRowData(this.personnelMsg.rowData);
    },
    getRowData(b) {
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
    },
    handleNodeClick(data) {
      this.condition="";
      this.orgcode = data.code;
      this.findpeopler();
    },
    isHide() {
      this.$emit("isHide", false);
    },
    selectGroupChange(selection) {
      let arr = new Array();
      for (let i = 0; i < selection.length; i++) {
        arr[i] = selection[i].name;
      }
      this.personListValue = arr;
    },
    selectALL(selection) {
    },
    selectChange(selection, rowData) {
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
            condition: this.condition,
            page: this.pageIndex,
            size: this.pageSize
          },
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/employee/findByOrganizeCode"
        },
        this
      )
        .then(
          result => {
            if (result.data.code === 204) {
              this.tableData = [];
            } else {
              this.tableData = result.data.data.content;
              this.tablenum = result.data.data.totalElements;
            }
          },
          ({ type, info }) => {}
        );

    },

    toAdd() {
      // this.$props.personAddHandler(this.editableTabs);
      let params = {
        data: this.editableTabs,
        isHide: false
      };
      this.$emit("personData", params);
    },
    deletes() {
      this.editableTabs.forEach(item => item.content = []);
    },

    workerDelete(value,data) {
      this.editableTabs[data.workerType].content=this.editableTabs[data.workerType].content.filter(item=>item.id!==value.id)
    }
  },
  created() {
    this.Axios(
      {
        params: {},
        type: "get",
        url: "/organize/allOrganize"
      },
      this
    )
      // .get(this.global.apiSrc + "/organize/allOrganize")
      .then(
        result => {
          let pcode = Math.min.apply(
            null,
            result.data.data.map(item => {
              return item.parentCode;
            })
          );
          let arr = this.filterArray(result.data.data, pcode);
          this.data2 = arr;
          this.orgcode = result.data.data.find(
            item => item.organizeType === 1
          ).code;
          this.fristcode=this.orgcode;
          this.findpeopler();
        },
        ({ type, info }) => {}
      );
  },
  mounted() {
    $('.person-type').on('click','li',function(event) {
      $(this).addClass("active-bgcolor").siblings().removeClass("active-bgcolor");
    });
  },
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
    // min-height: 500px;
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
        h5 {
          position: absolute;
          top: 0px;
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
  .work-person{
    li{
      font-size: 14px !important;
    }
  }
}
.person-type {
  position: absolute;
  top: 200px;
  left: 800px;
  z-index: 1000000;
  background-color: white;
  border: @border;
  border-radius: 5px;
  ul{
    li{
      list-style-type: none;
      height: 28px;
      line-height: 28px;
      padding: 0 10px;
      cursor: pointer;
      &:hover{
        color: #409eff;
      }
    }
  }
}
.active-bgcolor{
  color: #409eff;
}
</style>
