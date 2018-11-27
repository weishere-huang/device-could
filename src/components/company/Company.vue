<template>
  <div class="company">
    <div class="userCase">
      <div class="top">
        <el-button size="small" @click="auditblock">审核</el-button>
        <el-button size="small" @click="startUseing">启用</el-button>
        <el-button size="small" @click="forbidden">停用</el-button>
        <el-button size="small" @click="replace">刷新</el-button>
        <div class="search">
          <el-input type="search" placeholder="根据企业名称" size="small" v-model="name"></el-input>
          <el-button size="small" @click="findByName">搜索</el-button>
          <span style="color:#409eff" @click="adsearch">高级搜索</span>
        </div>

      </div>
      <div class="bottom">
        <div>
          <v-table is-horizontal-resize column-width-drag :multiple-sort="false" style="width:100%;min-height:400px;"
                   :columns="columns" :table-data="tableData" row-hover-color="#eee" :select-all="selectALL"
                   :select-group-change="selectGroupChange" :row-dblclick="details" row-click-color="#edf7ff">
          </v-table>
          <div class="mt20 mb20 bold" style="text-align:center;margin-top:30px">
            <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="this.totalNub" :page-size="pageSize"
                          :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
          </div>
        </div>
      </div>
    </div>
    <advancedsearch class="adsearch" v-on:advanceValue="advanceValue"></advancedsearch>
    <audit v-show="auditShow" v-on:auditByValue="auditByValue" :auditValue="auditValue"></audit>
    <businessDetails v-show="detailsShow" v-on:childByValue="childByValue"
                     :detailsValue="detailsValue"></businessDetails>
  </div>
</template>
<script>
  import advancedsearch from "./AdvancedSearch";
  import businessDetails from "./BusinessDetails";
  import audit from "./Audit";

  export default {
    data() {
      return {

        detailsShow: false,
        auditShow: false,
        detailsValue: "",
        auditValue: "",
        // advanceValue: "",
        choice:"",
        pageIndex: 1,
        pageSize: 10,
        name: "",
        totalNub:"",
        tableData: [
          {
            name: "",
            address: "",
            phone: "",
            address: "",
            gmtCreate: "",
            state: "",
          }
        ],
        tableDate: [],
        columns: [
          {
            width: 50,
            titleAlign: "center",
            columnAlign: "center",
            type: "selection"
          },
          {
            field: "name",
            title: "企业名称",
            width: 150,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
            //   orderBy: ""
          },
          {
            field: "address",
            title: "企业地址",
            width: 200,
            titleAlign: "center",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "phone",
            title: "企业电话",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "gmtCreate",
            title: "申请时间",
            width: 80,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          },
          {
            field: "state",
            title: "状态",
            width: 50,
            titleAlign: "center",
            columnAlign: "center",
            isResize: true
          }
        ]
      };
    },
    components: {
      advancedsearch,
      businessDetails,
      audit
    },
    methods: {
      advanceValue: function (params) {
        this.tableData = params;
      },
      replace() {
        location.reload();
      },
      auditblock() {
        if (this.auditValue === "") {
          alert("请选择一个企业");
        } else {
          this.auditShow = true;
        }
      },
      auditByValue: function (params) {
        this.auditShow = params;
      },
      childByValue: function (params) {
        this.detailsShow = params;
      },
      details(rowIndex, rowData, column) {
        this.detailsShow = true;
        this.detailsValue = rowData;
        console.log(rowData);
      },
      selectGroupChange(selection) {
        console.log("select-group-change", selection);
        this.auditValue = selection[0];
        this.choice = "";
        for(let i= 0 ;i<selection.length; i++){
          if(this.choice ==""){
            this.choice = selection[i].id;
          }else{
            this.choice += ","+selection[i].id;
          }
        }
        console.log(this.choice);
        console.log(this.auditValue);
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
        this.load();
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
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
      load() {
        this.axios
          .get(this.global.apiSrc + "/enterprise/all", {
            params: {page: this.pageIndex, size: this.pageSize}
          })
          .then(response => {
            console.log(response)
            this.totalNub=response.data.data.totalElements
            for (let i = 0; i < response.data.data.content.length; i++) {
              // console.log(response.data.data.content.length)
              // response.data.data.content[i].gmtCreate = response.data.data.content[i].gmtCreate.split("T")[0];
              if (response.data.data.content[i].state === 0) {
                response.data.data.content[i].state = "待审核"
              }
              if (response.data.data.content[i].state === 1) {
                response.data.data.content[i].state = "正常"
              }
              if (response.data.data.content[i].state === 2) {
                response.data.data.content[i].state = "禁用"
              }
              if (response.data.data.content[i].state === 4) {
                response.data.data.content[i].state = "审核中"
              }
              if (response.data.data.content[i].state === 10) {
                response.data.data.content[i].state = "未通过"
              }
            }
            this.tableData = response.data.data.content;
            this.tableDate = response.data.data.content;
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      findByName() {
        this.axios.get(this.global.apiSrc + "/enterprise/findByNameOrState", {params: {enterpriseName: this.name}})
          .then(response => {
            for (let i = 0; i < response.data.data.content.length; i++) {
              // console.log(response.data.data.content.length)
              // response.data.data.content[i].gmtCreate = response.data.data.content[i].gmtCreate.split("T")[0];
              if (response.data.data.content[i].state === 0) {
                response.data.data.content[i].state = "待审核"
              }
              if (response.data.data.content[i].state === 1) {
                response.data.data.content[i].state = "正常"
              }
              if (response.data.data.content[i].state === 2) {
                response.data.data.content[i].state = "禁用"
              }
              if (response.data.data.content[i].state === 4) {
                response.data.data.content[i].state = "审核中"
              }
              if (response.data.data.content[i].state === 10) {
                response.data.data.content[i].state = "未通过"
              }
            }
            this.tableData = response.data.data.content;

          }).catch(function (error) {
          console.log(error)
        })
      },
      startUseing() {
        let qs = require("qs")
        let data = qs.stringify({
          enterpriseIds: this.choice
          // state: 0
        })
        this.axios.post(this.global.apiSrc + "/enterprise/enableEnterprises/", data)
          .then(response => {
            alert("启用成功")
            // this.message("启用成功")
            this.load()
            console.log("请求参数：" + data)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      forbidden() {
        let qs = require("qs");
        let data = qs.stringify({
          enterpriseIds: this.choice
        });
        console.log("请求参数：" + data)

        this.axios.post(this.global.apiSrc + "/enterprise/discontinuationEnterprises",data)
          .then(response => {
            console.log("1111请求参数：" + data)
            console.log(response)
            alert("禁用成功")
            this.load()

          }).catch(function (error) {
          console.log(error)
        })
      },

      adsearch() {
        document.querySelectorAll(".adsearch")[0].style.right = 0;
      }
    },

    created() {
      this.load();
    }
  };
</script>
<style lang="less" scoped>
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  .company {
    // padding-left: 180px;
    position: relative;
    overflow: hidden;
    .userCase {
      width: 100%;
      padding: 10px;
      .top {
        height: 60px;
        line-height: 60px;
        border: 1px solid @Info;
        border-radius: 5px;
        padding-left: 10px;
        .search {
          float: right;
          overflow: hidden;
          width: 40%;
          .el-input {
            width: 60%;
          }
          span {
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
      .bottom {
        padding: 10px;
        font-size: 12px;
        border: 1px solid @Info;
        margin-top: 10px;
        min-height: 500px;
        border-radius: 5px;
      }
    }
    .adsearch {
      position: absolute;
      top:0;
      right: -310px;
      transition: all 0.3s ease-in;
    }
  }
</style>
