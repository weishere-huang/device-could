<template>
  <div class="search">
    <div class="case">
      <label for="">企业名称：</label>
      <el-input type="search" size="mini" v-model="companyName"></el-input>
      <div>
        <label for="">企业状态：</label>
        <div style="margin-top:10px;">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="0">待审核</el-checkbox>
            <el-checkbox label="1">正常</el-checkbox>
            <el-checkbox label="2">已禁用</el-checkbox>
            <el-checkbox label="4">审核中</el-checkbox>
            <el-checkbox label="10">未通过</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div style="width:100%;text-align:center;margin-top:20px;">
        <el-button size="small" @click="isHide">取消</el-button>
        <el-button size="small" v-on:click="search">搜索</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {
        dataName: "",
        totalElements: "",
        companyName: "",
        checkList: [],
        choice: "",
      };
    },
    methods: {
      isHide() {
        document.querySelectorAll(".adsearch")[0].style.right = "-310px";
      },
      search() {
        this.choice = "";
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.choice == "") {
            this.choice = this.checkList[i];
          } else {
            this.choice += "," + this.checkList[i];
          }
        }

        this.axios
          .get(this.global.apiSrc + "/enterprise/findByNameOrState", {
            params: {
              enterpriseName: this.companyName,
              state: this.choice,
              // page: this.pageIndex, size: this.pageSize
            }
          })
          .then(response => {
            console.log(response);
            document.querySelectorAll(".adsearch")[0].style.right = "-310px";
            for (let i = 0; i < response.data.data.content.length; i++) {
              console.log(this.dataName);
              console.log(this.checkList)
              response.data.data.content[i].gmtCreate = response.data.data.content[i].gmtCreate.split("T")[0];

              if (response.data.data.content[i].state === 0) {
                response.data.data.content[i].state = "待审核";
              }
              if (response.data.data.content[i].state === 1) {
                response.data.data.content[i].state = "正常";
              }
              if (response.data.data.content[i].state === 2) {
                response.data.data.content[i].state = "禁用";
              }
              if (response.data.data.content[i].state === 4) {
                response.data.data.content[i].state = "审核中";
              }
              if (response.data.data.content[i].state === 10) {
                response.data.data.content[i].state = "未通过"
              }
            }
            console.log(this.choice)
            this.dataName = response.data.data
            console.log(this.dataName);
            this.$emit("advanceValue", this.dataName);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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
  .search {
    width: 300px;
    // position: absolute;
    padding: 20px;
    border: @border;
    border-radius: 5px;
    box-shadow: -5px 5px 10px #a5a8af;
    min-height: 500px;
    background-color: white;
    font-size: 14px;
    .case {
      .el-input {
        width: 65%;
      }
      .el-checkbox {
        width: 80%;
        padding: 5px 10px;
        margin: 0;
      }
    }
  }
</style>
