<template>
  <div class="audit">
    <div class="case">
      <div class="top">
        <span>审核</span>
        <span>
          <el-button
            size="mini"
            style="padding:0px 3px;font-size:18px"
            @click="auditHide"
          >×</el-button>
        </span>
      </div>
      <div class="bottom">
        <el-form
          label-position=right
          label-width="120px"
          :model="formLabelAlign"
        >
          <el-form-item label="审批结果：">
            <el-radio
              v-model="radio"
              label="1"
            >同意</el-radio>
            <el-radio
              v-model="radio"
              label="2"
            >驳回</el-radio>
          </el-form-item>
          <el-form-item label="审批意见：">
            <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
          </el-form-item>
          <div v-if="radio!=2">
            <el-form-item label="是否终审：">
                <el-checkbox-group v-model="formLabelAlign.type">
                    <el-checkbox label="" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="下一级审批人：" v-if="formLabelAlign.type!=true">
                <el-input v-model="formLabelAlign.personnel" size="mini" @focus="pShow"></el-input>
            </el-form-item>
          </div>
          
          <el-form-item>
                <el-button type="primary" size="mini">提交</el-button>
        </el-form-item>
        </el-form>
      </div>
    </div>
    <personnel v-show="personShow" v-on:personHide="personHide"></personnel>
  </div>
</template>
<script>
import personnel from './Personnel'
export default {
  data() {
    return {
      personShow:false,
      formLabelAlign: {},
      radio: ""
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
    personnel
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
.audit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #95999c42;
  .case {
    position: relative;
    left: 50%;
    top: 50%;
    width: 400px;
    background-color: white;
    margin-left: -200px;
    margin-top: -120px;
    border-radius: 5px;
    box-shadow: 4px 4px 10px #999999;
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
