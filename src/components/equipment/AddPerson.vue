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
          <el-button size="mini" @click="deletes">清空</el-button>
          <el-button size="mini" @click="toAdd">保存</el-button>
          <div class="personList">
               <el-tabs type="border-card" :tab-position="tabPosition" style="height: 200px;">
                <el-tab-pane label="负责">
                  <span>负责人员
                    <label><i class="iconfont icon-cha"></i></label>
                  </span>
                </el-tab-pane>
                <el-tab-pane label="维修">
                  <span>维修人员
                    <label><i class="iconfont icon-cha"></i></label>
                  </span>
                  
                </el-tab-pane>
                <el-tab-pane label="检修">
                  <span>检修人员
                  <label><i class="iconfont icon-cha"></i></label>
                  </span>
                </el-tab-pane>
                <el-tab-pane label="保养">
                  <span>保养人员
                  <label><i class="iconfont icon-cha"></i></label>
                  </span>
                </el-tab-pane>
                <el-tab-pane label="操作">
                  <span>操作人员
                  <label><i class="iconfont icon-cha"></i></label>
                  </span>
                </el-tab-pane>
              </el-tabs>
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
      tabPosition:'top',
      pageIndex: 1,
      pageSize: 10,
      toValue:"",
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
          title: "分配情况",
          width: 150,
          titleAlign: "center",
          columnAlign: "left",
          isResize: true
        }
      ],
      personListValue: [1,2],
      data2:[{code:"1000"}],
      defaultProps: {
        children: "children",
        label: "label"
      },
       options: [{
          value: '选项1',
          label: '负责人员'
        }, {
          value: '选项2',
          label: '维修人员'
        }, {
          value: '选项3',
          label: '检修人员'
        }, {
          value: '选项4',
          label: '保养人员'
        }, {
          value: '选项5',
          label: '操作人员'
        }],
        value: ''
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.findpeopler(data.code)
    },
    isHide() {
      this.$emit("isHide", false);
    },
    selectGroupChange(selection) {
      this.toValue = selection;
      let arr = new Array();
      for (let i = 0; i < selection.length; i++) {
        arr[i] = selection[i].name;
      }
      this.personListValue = arr;
      console.log(arr);
      console.log("select-group-change", selection);
    },
    selectALL(selection) {
      this.toValue = selection;
      let arr = new Array();
      for (let i = 0; i < selection.length; i++) {
        arr[i] = selection[i].name;
      }
      this.personListValue = arr;
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
      this.axios
        .get(this.global.apiSrc + "/employee/findByOrganizeCode", {params:{organizeCode:code}})
        .then(result => {
          if(result.data.code === 204){
            this.tableData=[];
          }else{
            console.log("按照组织机构编号查询人");
            console.log(result.data);
            this.tableData=result.data.data.content;
          }

        })
        .catch(err => {
          console.log(err);
        });
    },
    toAdd() {
      let personname = "";
        for(let i = 0;i<this.toValue.length;i++){
        if( i == 0){
          personname += ""+this.toValue[i].name ;
        }else{
          personname += ","+this.toValue[i].name;
        }
      }
      let data = {
        pname:personname,
        id: this.toValue.id,
        name:this.toValue.name,
        isOk: false
      };
      this.$emit("addPerson", data);
    },
    deletes() {
      this.personListValue = "";
      this.toValue = "";
      // let arr ="";
      // this.selectALL(arr);
    },
  },
  created() {
    //axios
    this.axios
      .get(this.global.apiSrc + "/organize/allOrganize")
      //.get("api/organize/allOrganize/321")
      .then(result => {
        console.log("查询所有组织机构");
        console.log(result.data);
        console.log(result.data.data);
        let arr = this.filterArray(result.data.data, 0);
        console.log(arr);
        //this.data2 = this.filterArray(result.data.data,1000);
        this.data2 = arr;
      })
      .catch(err => {
        console.log(err);
      });
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
        width: 55%;
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
          .el-tab-pane{
            span{
              display: inline-block;
              width: 100%;
              label{
                float: right;
                display: none;
                i{
                  cursor: pointer;
                  &:hover{
                    color: #409eff;
                  }
                }
              }
              &:hover{
                label{
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
</style>
