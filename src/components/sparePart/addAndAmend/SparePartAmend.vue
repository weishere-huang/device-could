<template>
  <div class="spare-part-amend">
    <div class="top">
      <el-button size="small" @click="toBack">返回</el-button>
      <el-button size="small" @click="btisok">保存</el-button>
    </div>
    <div class="basic-information">
      <h5>备件基本信息</h5>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="备件编号：">
          <el-input
            v-model="formInline.user"
            placeholder=""
            size="small"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="备件名称：">
          <el-input
            v-model="formInline.user"
            placeholder=""
            size="small"
            style="width:514px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="型号/规格：">
          <el-input
            v-model="formInline.user"
            placeholder=""
            size="small"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="备件级别：">
          <el-select
            v-model="formInline.user"
            placeholder="点击选择"
            size="small"
            style="width:200px"
          >
            <el-option
              v-for="(item,index) in options2"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备件分类：">
          <el-cascader
            placeholder="搜索"
            :options="ctgoptions"
            filterable
            ref="getName2"
            expand-trigger="hover"
            :props="defaultProps2"
            change-on-select
            :show-all-levels="false"
            v-model="formInline.user"
            @change="handleChange2"
            style="width:200px;"
            size="small"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="计量单位：">
          <el-input
            v-model="formInline.user"
            placeholder=""
            size="small"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存下限：">
          <el-input
            v-model="formInline.user"
            placeholder=""
            size="small"
            style="width:200px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            v-model="formInline.user"
            placeholder=""
            style="width:824px"
            :autosize="{ minRows: 4, maxRows: 10}"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      formInline: {},
      ctgoptions: [],
      options2: [
        {
          value: "普通",
          label: "普通"
        },
        {
          value: "关键",
          label: "关键"
        }
      ],
      defaultProps2: {
        value: "categoryNo",
        label: "categoryName"
      }
    };
  },
  methods: {
    toBack() {
      this.$router.back(-1);
    },
    handleChange2(value) {
      let name = this.$refs["getName2"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      console.log(id, name);
      this.sizeForm.deviceCategory = id;
      this.sizeForm.deviceCategoryName = name;
    },
    baseupdate(){
      //编辑备件基础信息接口1
      let qs = require("qs");
      let data = qs.stringify({
        id:"",
        partNo:"",
        partName:"",
        partModel:"",
        partCategory:"",
        partClassify:"",
        partClassifyName:"",
        partQuality:"",
        partUnit:"",
        inventory:"",
        freeze:"",
        price:"",
        storageTime:"",
        partSource:"",
        company:"",
        manufactor:"",
        remarks:"",
        img:""
      });
      this.Axios({
        params: data,
        option: {
          enableMsg: false
        },
        type: "post",
        url: "/part/updateBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.$message({
              message: "启用成功",
              type: "success"
            });
            console.log("请求参数：" + data);
          },
          ({type, info}) => {
          }
        );
    },
    btisok(){
      this.$confirm('确定完成修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.baseupdate();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
  },
  created(){

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
.spare-part-amend {
  font-size: 12px;
  .top {
    padding: 10px;
    border: @border;
    border-radius: 5px;
    padding: 10px;
  }
  .basic-information {
    border: @border;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    padding: 10px;
    h5 {
      position: relative;
      top: -15px;
      left: 10px;
      background-color: white;
      display: inline-block;
    }
  }
}
</style>
