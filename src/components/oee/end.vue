<template>
    <el-dialog
    title="OEE任务结束"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    center>
        <section class='addOeeWrap'>
            <el-form ref="form" :model="form" label-width="200px">
                <el-form-item size="small" label="起始时间">
                    <span>{{(startDate?(new Date(startDate).toLocaleDateString().replace(/\//g, "-")):"")}}</span>
                </el-form-item>
                <el-form-item size="small" label="结束时间">
                    <el-checkbox v-model="reResetTime">是否重设时间</el-checkbox>&nbsp;&nbsp;
                    <el-date-picker
                        :disabled="!reResetTime"
                        v-model="form.endDate"
                        align="right"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item size="small" label="生产总量">
                    <el-input maxlength="2" v-model="form.prodTotal" type='number' placeholder="生产总量（件）">
                        <template slot="append">件</template>
                    </el-input>
                </el-form-item>
                <el-form-item size="small" label="合格成品量">
                    <el-input v-model="form.qualifiedCount" type='number' placeholder="生产的成品总合格数量">
                        <template slot="append">件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.describeInfo"></el-input>
                </el-form-item>
                
            </el-form>
        </section>
        <span slot="footer" class="dialog-footer">
            <permission-button permCode='device_OEE_termination_lookup.device_OEE_termination_save' banType='disable' size="small" type="primary" @click="handleOK">结束任务</permission-button>
            <el-button size="small" @click="handleClose">取消</el-button>
        </span>
    </el-dialog>
    
</template>
<script>
let qs = require("qs");
export default {
  data() {
    return {
      dialogVisible: true,
      reResetTime:false,
      startDate:"",
      
      form:{
          prodTotal:'',
          qualifiedCount:'',
          endDate:'',
          describeInfo:''
      }
    };
  },
  created:function(){
      
  },
  mounted:function(){
      this.$nextTick(function () {
          this.Axios(
            {
            params: {organizeCode:'1000',planId:this.$route.params.equId},
            url: "/data/getOeePlanDetail",
            type: "get",
            option: {
                requestTarget:'r',
                enableMsg: false
            },
            loadingConfig: {
                target: document.querySelector(".el-dialog")
            }
            },
            this
        ).then(
            response => {
            this.oeeDetails=response.data.data;
            this.form.endDate=(new Date(this.oeeDetails.endDate).toLocaleDateString().replace(/\//g, "-"));
            this.startDate=this.oeeDetails.startDate;
            }
        );
      });
  },
  methods: {
    dialogBack: function() {
      this.dialogVisible = false;
      window.setTimeout(() => {
        //this.$router.push({ path: "/Oee" });
        this.$router.back();
      }, 200);
    },
    handleClose: function() {
      this.dialogBack();
    },
    handleOK: function() {
        const _params={
              organizeCode:'1000',
              organizeName:'山海重工股份有限公司',
              id:this.$route.params.equId,
              prodTotal:this.form.prodTotal,
              qualifiedCount:this.form.qualifiedCount,
              endDate:new Date(this.form.endDate).format("yyyy/MM/dd"),
              describeInfo:this.form.describeInfo
           };
           delete _params.region;
      this.Axios(
        {
          url: "/data/terminationOeePlan",
          type: "post",
          option: {
            requestTarget:'r',
            successMsg:'任务已经成功结束'
          },
          params: qs.stringify(_params)
        },
        this
      ).then(
        response => {
          this.dialogBack();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.addOeeWrap {
  width: 600px;
  padding: 20px 0;
}
</style>
