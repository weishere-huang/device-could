<template>
  <div class="spare-part-amend">
    <div class="top">
      <el-button size="small" type="primary" @click="toBack"  icon="el-icon-arrow-left">返回</el-button>
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
        <el-form-item label="备件级别：">
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
          <span style="display:inline-block;width:110px;">{{classfyname}}</span>
          <el-button type="primary" size="mini" @click="dialogVisible=true">点击修改</el-button>
          <!-- <el-cascader
            placeholder="搜索"
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
          ></el-cascader> -->
        </el-form-item>
        <el-dialog
          title="备件类别"
          :visible.sync="dialogVisible"
          width="300px"
          :before-close="handleClose">
          <div style="width:100%;text-align:center;padding:20px 0;">
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
            style="width:80%;"
            size="small"
            ></el-cascader>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false,classfyname=formInline.partClassifyName,classfycode=formInline.partClassify" size="mini">确 定</el-button>
          </span>
        </el-dialog>
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
        dialogVisible:false,
        formInline: {},
        ctgoptions: {
          value:"id",
          label:"partClassifyName"
        },
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
        defaultProps2:  {
            value: "code",
            label: "name"
          },
        urlid: "",
        classfy:"",
        classfyname:"",
        classfycode:"",

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
      baseupdate() {
        //编辑备件基础信息接口1
        let qs = require("qs");
        let data = qs.stringify({
          id: this.urlid,
          partNo: this.formInline.partNo,
          partName: this.formInline.partName,
          partModel: this.formInline.partModel,
          partCategory: this.formInline.partCategory,
          partClassify: this.classfycode,
          partClassifyName: this.classfyname,
          lower: this.formInline.lower,
          remarks: this.formInline.remarks,
          partUnit: this.formInline.partUnit,
          //
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
        }, this)
          .then(
            result => {
              if (result.data.code == 200) {
                this.$router.push("/SparePart");
                this.reload();
              } else if (result.data.code == 410) {
                this.$message("该设备编号以存在,请修改!!!");
              }
            },
            ({type, info}) => {
            }
          );
      },
      btisok() {
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
        if(subok){
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
      Sgetlist() {
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
        }, this)
          .then(
            result => {
              this.ctgoptions = this.filterArray(result.data.data, 0);
            },
            ({type, info}) => {
            }
          );
      },
      getinfobyId(id) {
        this.Axios({
          params: {
            id: id
          },
          option: {
            enableMsg: false
          },
          type: "get",
          url: "/part/getBasicInfo"
          // loadingConfig: {
          //   target: document.querySelector("#mainContentWrapper")
          // }
        }, this)
          .then(
            result => {
              this.formInline = result.data.data;
              this.classfyname=this.formInline.partClassifyName;
              this.classfycode =this.formInline.partClassify;
            },
            ({type, info}) => {
            }
          );
      }
    },
    created() {
      this.urlid = this.$route.params.id;
      this.getinfobyId(this.urlid);
      this.Sgetlist();
    }
  }
  ;
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
