<template>
  <div class="addPerson">
    <div class="addCase">

      <div class="bottom">
        <div class="left">
          <h5>设备类别</h5>
          <div class="treeCase">
            <el-tree
              :data="data2"
              node-key="id"
              @node-click="handleNodeClick"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
            >
            </el-tree>
          </div>
        </div>
        <div class="center">
          <div class="search">

            <el-input
              type="search"
              size="mini"
              v-model="key"
              style="width:30%;"
            ></el-input>
            <el-button
              size="mini"
              @click="search"
            >搜索</el-button>
            <span style="padding:0 10px;">最近搜索：{{searchs}}</span>
            <span style="text-decoration: underline;"></span>
          </div>
          <div class="tableList">
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
              :select-change="selectChange"
            ></v-table>
            <div
              class="mt20 mb20 bold"
              style="text-align:left;margin-top:10px"
            >
              <v-pagination
                @page-change="pageChange"
                @page-size-change="pageSizeChange"
                :total="pageNumber"
                :page-size="pageSize"
                :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
              ></v-pagination>
            </div>
          </div>
        </div>
        <div class="right">
          <el-button size="mini" @click="deletes">清空</el-button>
          <el-button size="mini" @click="toAdd">确定</el-button>
          <div class="personList">
            <ul @click="getId">
              <li v-for="(item, index) in personListValue" :key="index">
                {{item.deviceName}}
                <span :label="item.id">x</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import clone from 'clone';
  export default {
    name: "",
    data() {
      return {
        pageIsOk:true,
        arr:new Array(),
        clickId: 0,
        key: "",
        pageNumber:"",
        searchs: "",
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
            categoryName: "一级",
            children: [
              {
                id: 11,
                categoryName: "二级 1-1",
                children: [
                  {
                    id: 12,
                    categoryName: "三级 1-1-1"
                  },
                  {
                    id: 13,
                    categoryName: "三级 1-1-2"
                  }
                ]
              }
            ]
          }
        ],
        defaultProps: {
          children: "children",
          label: "categoryName"
        }
      };
    },
    methods: {
      loads() {
        let arrs = new Array();
        this.Axios(
          {
            params: { page: this.pageIndex, size: this.pageSize },
            type: "get",
            url: "/device/select",
            loadingConfig:{
              target:document.querySelector('.el-dialog')
            }
          },
          this
        ).then(
          response => {
            this.pageNumber = response.data.data.totalElements;
            arrs = response.data.data.content;
            arrs.forEach(item=>{
              if(this.personListValue.find((i,index)=>i.id===item.id)) item._checked=true;
            });
            this.tableData = arrs;
            this.tabledate = this.tableData;
          },
          ({ type, info }) => {}
        );
      },
      toLoad() {
        this.Axios(
          {
            params: { deviceCategory: this.clickId},
            type: "get",
            url: "/device/select"
          },
          this
        ).then(
          response => {
            this.tableData = response.data.data.content;
            this.tableData.forEach(item=>{
              if(this.personListValue.find((i,index)=>i.id===item.id)) item._checked=true;
            });
            this.pageNumber = this.tableData.length;
          },
          ({ type, info }) => {}
        );
      },
      search() {
        if(this.key!==""){
          this.toSearch();
          this.pageIsOk = false;
        }else{
          this.pageIsOk = true;
          this.pageChange(1);
        }
      },
      toSearch(){
        this.Axios(
          {
            params: { keyWord: this.key },
            type: "get",
            url: "/device/findByKeyWord"
          },
          this
        ).then(
          response => {
            this.pageNumber = response.data.data.totalElements;
            this.tableData = response.data.data.content;
            this.tabledate = this.tableData;
            this.searchs = this.key;
          },
          ({ type, info }) => {}
        );
      },
      isHide() {
        this.$emit("isHide", false);
      },
      toAdd() {
        let data = {
          values: this.personListValue,
          isOk: false
        };
        this.$emit("toAdd", data);
      },
      deletes() {
        this.personListValue = [];
        this.loads();
      },
      getId(event){
        let deleteId = event.target.attributes.label.value;
        this.personListValue = this.personListValue.filter(item=>item.id!=deleteId);
        this.loads();
      },

      handleNodeClick(data) {
        this.clickId = data.categoryNo;
        this.toLoad();
      },
      selectChange(selection,rowData){
        if(selection.find(item=>item.id===rowData.id)){
          this.personListValue.push(rowData);
        }else{
          this.personListValue = this.personListValue.filter(item=>item.id!==rowData.id);
        }
      },
      selectALL(selection) {
        let _personListValue=clone(this.personListValue);
        if(selection.length===0){
          //全不选
          this.tableData.forEach(sitem => {
            _personListValue = _personListValue.filter(item=>item.id!==sitem.id);
          });
        }else{
          //全选
          selection.forEach(sitem=>{
            if(!_personListValue.find(item=>item.id===sitem.id)){
              _personListValue.push(sitem);
            }
          });
        }
        this.personListValue = _personListValue;
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
        if(this.pageIsOk){
          this.loads();
        }
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        if(this.pageIsOk){
          this.loads();
        }
        this.getTableData();
      },


      filterArray2(data, parent) {
        let vm = this;
        var tree = [];
        var temp;
        for (var i = 0; i < data.length; i++) {
          if (data[i].categoryParentNo == parent) {
            var obj = data[i];
            temp = this.filterArray2(data, data[i].categoryNo);
            if (temp.length > 0) {
              obj.children = temp;
            }
            tree.push(obj);
          }
        }
        return tree;
      },
      findAlldeviceClassify(){
        this.Axios({
          params: {
          },
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/deviceCategory/all",
        },this)
          .then(result => {
            this.data2= this.filterArray2(result.data.data,0);
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    created() {
      this.loads();
      this.findAlldeviceClassify();
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
      width: 900px;
      // min-height: 500px;
      // background-color: white;
      // margin: auto;
      // border-radius: 5px;
      // margin-top: 100px;
      font-size: 12px;

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
