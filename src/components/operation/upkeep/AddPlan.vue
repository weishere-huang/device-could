<template>
  <div class="addPerson">
    <div class="addCase">
      <div class="top">
        <span>添加设备</span>
        <label>
          <button @click="isHide">×</button>
        </label>
      </div>
      <div class="bottom">
        <div class="left">
          <h5>组织机构</h5>
          <div class="treeCase">
            <el-tree :data="data2" node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
            </el-tree>
          </div>
        </div>
        <div class="center">
          <div class="search">

            <el-input type="search" size="mini" v-model="key" style="width:30%;"></el-input>
            <el-button size="mini" @click="search">搜索</el-button>
            <span style="padding:0 10px;">最近搜索：{{searchs}}</span>
            <span style="text-decoration: underline;"></span>
          </div>
          <div class="tableList">
            <v-table is-vertical-resize is-horizontal-resize :vertical-resize-offset='100' column-width-drag :multiple-sort="false" style="width:100%;" :columns="columns" :table-data="tableData" row-hover-color="#eee" row-click-color="#edf7ff" :select-all="selectALL" :select-group-change="selectGroupChange"></v-table>
            <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px">
              <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="tableData.length" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
            </div>
          </div>
        </div>
        <div class="right">
          <el-button size="mini" @click="deletes">清空</el-button>
          <el-button size="mini" @click="toAdd">保存</el-button>
          <div class="personList">
            <ul>
              <li v-for="(item, index) in personListValue" :key="index">{{item}}
                <span>x</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {
        key: "",
        searchs: "",
        toValue: "",
        pageIndex: 1,
        pageSize: 10,
        tableData: [],
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
            width: 60,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
            // orderBy: ""
          },
          {
            field: "deviceName",
            title: "设备名称",
            width: 80,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "deviceModel",
            title: "型号/规格",
            width: 130,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "location",
            title: "设备位置",
            width: 90,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          }
        ],
        personListValue: [],
        data2: [
          {
            id: 1,
            label: "一级 1",
            children: [
              {
                id: 4,
                label: "二级 1-1",
                children: [
                  {
                    id: 9,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 10,
                    label: "三级 1-1-2"
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: "一级 2",
            children: [
              {
                id: 5,
                label: "二级 2-1"
              },
              {
                id: 6,
                label: "二级 2-2"
              }
            ]
          },
          {
            id: 3,
            label: "一级 3",
            children: [
              {
                id: 7,
                label: "二级 3-1"
              },
              {
                id: 8,
                label: "二级 3-2"
              }
            ]
          }
        ],
        defaultProps: {
          children: "children",
          label: "label"
        }
      };
    },
    methods: {
      loads() {
        let arrs = new Array();
        this.axios
          .get(this.global.apiSrc + "/device/all", {
            params: { page: this.pageIndex, size: this.pageSize }
          })
          .then(response => {
            arrs = response.data.data.content;
            this.tableData = arrs;
            this.tabledate = this.tableData;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      search() {
        this.axios
          .get(this.global.apiSrc + "/device/findByKeyWord", {
            params: { keyWord: this.key }
          })
          .then(response => {
            this.tableData = response.data.data.content;
            this.tabledate = this.tableData;
            console.log(response.data);
            this.searchs = this.key;
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      isHide() {
        this.$emit("isHide", false);
      },
      toAdd() {
        let data = {
          values: this.toValue,
          isOk: false
        };
        this.$emit("toAdd", data);
      },
      deletes() {
        this.personListValue = "";
        this.toValue = "";
      },

      selectGroupChange(selection) {
        this.toValue = selection;
        let arr = new Array();
        for (let i = 0; i < selection.length; i++) {
          arr[i] = selection[i].deviceName;
        }
        this.personListValue = arr;
        console.log(arr);
        // console.log("select-group-change", selection);
      },
      selectALL(selection) {
        this.toValue = selection;
        let arr = new Array();
        for (let i = 0; i < selection.length; i++) {
          arr[i] = selection[i].deviceName;
        }
        this.personListValue = arr;
        // console.log("select-aLL", selection);
      },
      selectChange(selection, rowData) {
        // console.log("select-change", selection, rowData);
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
      }
    },
    created() {
      this.loads();
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
  .addPerson {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #42424227;
    .addCase {
      width: 80%;
      // min-height: 500px;
      background-color: white;
      margin: auto;
      border-radius: 5px;
      margin-top: 100px;
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
          width: 18%;
          border: @border;
          min-height: 400px;
          position: relative;
          float: left;
          margin-right: 1%;
          font-size: 12px;
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
          width: 60%;

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
          width: 20%;
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
            li {
              list-style-type: none;
              height: 20px;
              line-height: 20px;
              padding: 0 10px;
              span {
                float: right;
                cursor: pointer;
                display: none;
              }
              &:hover {
                span {
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
