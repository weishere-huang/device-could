<template>
  <div class="search">
    <div class="case">
      <label for="">企业名称：</label>
      <el-input
        type="search"
        size="mini"
        v-model="companyName"
        @keyup.enter.native="search"
      ></el-input>
      <div>
        <label for="">企业状态：</label>
        <div style="margin-top:10px;">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="0">待审核</el-checkbox>
            <el-checkbox label="1">正常</el-checkbox>
            <el-checkbox label="2">已禁用</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div style="width:100%;text-align:center;margin-top:20px;">
        <el-button
          size="small"
          @click="isHide"
        >取消</el-button>
        <el-button
          size="small"
          v-on:click="search"
          type="primary"
        >搜索</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["pageSize"],
  data() {
    return {
      dataName: "",
      totalElements: "",
      companyName: "",
      checkList: [],
      choice: ""
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
      this.Axios(
        {
          params: Object.assign({
            page: 1,
            size: this.pageSize,
            enterpriseName: this.companyName,
            state: this.choice
          }),
          type: "get",
          url: "/enterprise/findByNameOrState"
        },
        this
      ).then(
        response => {
          document.querySelectorAll(".adsearch")[0].style.right = "-310px";
          this.dataName = response.data.data;
          console.log(this.dataName);
          this.$emit("advanceValue", {
            dataName: this.dataName,
            params: {
              enterpriseName: this.companyName,
              state: this.choice
            }
          });
        },
        ({ type, info }) => {}
      );
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
