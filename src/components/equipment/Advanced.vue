<template>
    <div class="search">
        <div class="case">
            <div>
                <el-form label-width="100px">
                    <el-form-item label="设备名称：">
                        <el-input v-model="companyName.name" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="设备位号：">
                        <el-input v-model="companyName.region" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人：">
                        <el-input v-model="companyName.type" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="设备厂家：">
                        <el-input v-model="companyName.type" size="mini"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="padding-left:9px;">
                <label for="">设备状态：</label>
                <div style="margin-top:10px;">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="0">在用</el-checkbox>
                        <el-checkbox label="1">停用</el-checkbox>
                        <el-checkbox label="2">出租</el-checkbox>
                        <el-checkbox label="3">封存</el-checkbox>
                        <el-checkbox label="4">报废</el-checkbox>
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
      companyName: "",
      checkList: [],
      state: []
    };
  },
  methods: {
    isHide() {
      this.$emit("isHide", "-310px");
    },
    search() {
      axios
        .get("/api/enterprise/findByNameOrState", {
          params: { enterpriseName: this.companyName }
        })
        .then(response => {
          console.log(response);
          document.querySelectorAll(".adsearch")[0].style.right = "-310px";
          this.dataName = response.data.data.content;
          console.log(this.dataName);
          this.$emit("advanceValue", this.dataName);
        })
        .catch(function(error) {
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
  padding: 20px;
  border: @border;
  border-radius: 5px;
  box-shadow: -5px 5px 10px #a5a8af;
  min-height: 500px;
  background-color: white;
  .case {
    .el-input {
      //   width: 65%;
    }
    .el-checkbox {
      width: 80%;
      padding: 5px 10px;
      margin: 0;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}
</style>
