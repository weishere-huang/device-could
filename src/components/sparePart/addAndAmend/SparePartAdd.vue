<template>
  <div class="spare-part-add">
    <div class="top">
      <permission-button
        permCode='part_info_add_lookup.part_info_add_save'
        banType='hide'
        size="small"
        type="primary"
        @click="toBack"
        icon="el-icon-arrow-left"
      >返回</permission-button>
      <el-button size="small" type="primary" @click="btisok">
        <i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;保存</el-button>
    </div>
    <div class="basic-information">
      <h5>备件基本信息</h5>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="100px"
        ref="baseinfo"
        :rules="rules1"
      >
        <el-form-item label="备件编号：" prop="partNo">
          <el-input
            v-model="formInline.partNo"
            placeholder=""
            size="small"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="备件名称：" prop="partName">
          <el-input
            v-model="formInline.partName"
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
        ref="ggform"
        :rules="rules2"
      >
        <el-form-item label="型号/规格：" prop="partModel">
          <el-input
            v-model="formInline.partModel"
            placeholder=""
            size="small"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="备件级别："prop="partCategory">
          <el-select
            v-model="formInline.partCategory"
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
            placeholder="请选择"
            :options="ctgoptions"
            filterable
            ref="getName2"
            expand-trigger="hover"
            :props="defaultProps2"
            change-on-select
            :show-all-levels="false"
            v-model="classfy"
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
            v-model="formInline.partUnit"
            placeholder=""
            size="small"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存下限：">
          <el-input
            v-model="formInline.lower"
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
            v-model="formInline.remarks"
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
  inject: ["reload"],
  name: "",
  data() {
    return {
      formInline: {
        partNo:"",
        partName:"",
        partModel:"",
        partCategory:"",
        partClassify:"",
        partClassifyName:"",
        lower:10,
        //以下可空
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
        img:"",
      },
      ctgoptions: [],
      options2: [
        {
          value: 1,
          label: "普通"
        },
        {
          value: 2,
          label: "关键"
        }
      ],
      defaultProps2: {
        value: "code",
        label: "name"
      },
      classfy:"",
      classfyid:"",

      rules1:{
        partNo:[
          {required: true, message: '请输入备件编号', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        partName:[
          {required: true, message: '请输入设备名称', trigger: 'blur'},
          {max: 20, message: '备件名称过长', trigger: 'blur'}
        ]
      },
      rules2:{
        partModel:[
          {required: true, message: '请输入规格型号', trigger: 'blur'},
          {max: 20, message: '长度在 20 个字符以内', trigger: 'blur'}
        ],
        // partCategory:[
        //   {required: true, message: '请选择备件级别', trigger: 'blur'},
        // ]
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
      let code = value[value.length - 1];
      this.formInline.partClassify=code;
      this.formInline.partClassifyName=name;
    },
    //新增
    Saddbaseinfo(){
      //新增备件基础信息接口1
      let qs = require("qs");
      let data = qs.stringify({
        partNo:this.formInline.partNo,
        partName:this.formInline.partName,
        partModel:this.formInline.partModel,
        partCategory:this.formInline.partCategory,
        partClassify:this.formInline.partClassify,
        partClassifyName:this.formInline.partClassifyName,
        lower:this.formInline.lower,
        remarks:this.formInline.remarks,
        partUnit:this.formInline.partUnit,

        // partQuality:this.formInline.partQuality,
        // inventory:this.formInline.inventory,
        // freeze:this.formInline.freeze,
        // price:this.formInline.price,
        // storageTime:this.formInline.storageTime,
        // partSource:this.formInline.partSource,
        // company:this.formInline.company,
        // manufactor:this.formInline.manufactor,

        // img:this.formInline.img

      });
      this.Axios({
        params: data,
        // option: {
        //   enableMsg: false
        // },
        type: "post",
        url: "/part/addBasicInfo"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            if(result.data.code ===200){
              this.$message("添加成功");
              this.$router.push("/SparePart");
              this.reload();
            }
          },
          ({type, info}) => {
          }
        );

    },
    //按钮控制
    btisok(){
      let subok = true;

      this.$refs['baseinfo'].validate((valid) => {
        if (valid) {
        } else {
          subok = false;
          return false;
        }
      });
      this.$refs['ggform'].validate((valid) => {
        if (valid) {
        } else {
          subok = false;
          return false;
        }
      });
      //
      if(subok){
        this.$confirm('确定完成操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Saddbaseinfo();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }else{
        this.$message.warning("请完善备件信息");
      }

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
    Sgetlist(){
      //获取备品备件分类数据接口1
      this.Axios({
        option: {
          enableMsg: false
        },
        type: "get",
        url: "/part/list"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        .then(
          result => {
            this.ctgoptions=this.filterArray(result.data.data,0);
          },
          ({type, info}) => {
          }
        );

    },

  },
  created(){
    this.Sgetlist();
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
.spare-part-add {
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
