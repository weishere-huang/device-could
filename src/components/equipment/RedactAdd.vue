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
            ></el-input>
            <el-button size="mini">搜索</el-button>
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
            ></v-table>
            <div
              class="mt20 mb20 bold"
              style="text-align:center;margin-top:30px"
            >
              <v-pagination
                @page-change="pageChange"
                @page-size-change="pageSizeChange"
                :total="50"
                :page-size="pageSize"
                :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
              ></v-pagination>
            </div>
          </div>
        </div>
        <div class="right">
          <el-button size="mini">清空</el-button>
          <el-button size="mini">保存</el-button>
          <div class="personList">
            <ul>
              <li
                v-for="(item, index) in personListValue"
                :key="index"
              >{{item}}
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
      pageIndex: 1,
      pageSize: 10,
      tableData: [
        // {
        //   name: "111",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // },
        // {
        //   name: "2222",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // },
        // {
        //   name: "3333",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // },
        // {
        //   name: "4444",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // },
        // {
        //   name: "5555",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // },
        // {
        //   name: "6666",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // },
        // {
        //   name: "7777",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // },
        // {
        //   name: "8888",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // },
        // {
        //   name: "9999",
        //   gender: "1111",
        //   position: "1111",
        //   phone: "111",
        //   details: "111"
        // }
      ],
      tableDate: [{code:1000}],
      columns: [
        {
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          type: "selection"
        },
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
          field: "gender",
          title: "性别",
          width: 50,
          titleAlign: "center",
          columnAlign: "center",
          isResize: true
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
          columnAlign: "center",
          isResize: true
        },
        {
          field: "details",
          title: "分配情况",
          width: 150,
          titleAlign: "center",
          columnAlign: "center",
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
    handleNodeClick(data) {
      console.log(data);
      console.log(data.code);
      this.findpeopler(data.code);
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
      console.log(arr);
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
    findpeopler(code){
      console.log("该组织机构code---"+code)
      this.Axios({
        params: {
          organizeCode:code
        },
        option: {
          enableMsg: false
        },
        type: "get",
        url: "/employee/findByOrganizeCode"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        //.get(this.global.apiSrc + "/employee/findByOrganizeCode", {params:{organizeCode:code}})
        .then(result => {
          console.log("按照组织机构编号查询人");
          console.log(result.data);
          this.tableData=result.data.data.content;
        },
          ({type, info}) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        )
        // .catch(err => {
        //   console.log(err);
        // });
    }
  },
  created() {
    this.Axios({
      type: "get",
      url: "/organize/allOrganize"
    },this)
     // .get(this.global.apiSrc + "/organize/allOrganize")
      .then(result => {
        console.log("查询所有组织机构");
        console.log(result.data);
        console.log(result.data.data);
        let arr = this.filterArray(result.data.data, 0);
        console.log(arr);
        //this.data2 = this.filterArray(result.data.data,1000);
        this.data2 = arr;
      },
        ({type, info}) => {
          //错误类型 type=faild / error
          //error && error(type, info);
        }
      )
      // .catch(err => {
      //   console.log(err);
      //   console.log(this.userName);
      // });
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
  // position: fixed;
  // width: 100vw;
  // height: 100vh;
  // top: 0;
  // left: 0;
  // background-color: #42424227;
  .addCase {
    width: 100%;
    min-height: 500px;
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
