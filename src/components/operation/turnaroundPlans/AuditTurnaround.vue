<template>
  <div class="audit">
    <div class="case">
      <div class="bottom">
        <el-form label-position=right label-width="120px" :model="formLabelAlign">
          <el-form-item label="审批结果：">
            <el-radio v-model="formLabelAlign.radio" label="1">同意</el-radio>
            <el-radio v-model="formLabelAlign.radio" label="2">驳回</el-radio>
          </el-form-item>
          <el-form-item label="审批意见：">
            <el-input type="textarea" autofocus v-model="formLabelAlign.desc"></el-input>
            </el-form-item>
            <div v-if="radio!=2">
              <el-form-item label="是否终审：">
                <el-checkbox-group v-model="formLabelAlign.type">
                  <el-checkbox label="" value="1" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="下一级审批人：" v-if="formLabelAlign.type!=true">
                <el-input v-model="toAudit.name" size="mini" @focus="pShow"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:["toAudit"],
    data() {
      return {
        personShow:false,
        formLabelAlign: {
          desc:"",
          type:"",
          radio: ""
        },
      };
    },
    methods:{
      auditHide(){
        this.$emit("auditHide",false)
      },
      pShow(){
        this.personShow=true;
      },
      personHide(params){
        this.personShow=params
      }
    },
    components:{

    },

  };
</script>

<style lang="less" scoped>
  @blue: #409eff;
  @Success: #67c23a;
  @Warning: #e6a23c;
  @Danger: #f56c6c;
  @Info: #dde2eb;
  @border: 1px solid #dde2eb;
  .audit {
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100vw;
    // height: 100vh;
    // background-color: #95999c42;
    .case {
      // position: relative;
      // left: 50%;
      // top: 50%;
      // width: 400px;
      // background-color: white;
      // margin-left: -200px;
      // margin-top: -120px;
      // border-radius: 5px;
      // box-shadow: 4px 4px 10px #999999;
      .top {
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        background-color: @Info;
        span:nth-child(2) {
          float: right;
        }
      }
      .bottom {
        padding: 10px 30px;
        overflow: hidden;
        .el-form-item{
          margin-bottom:0px;
        }
      }
    }
  }
</style>
