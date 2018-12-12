<template>
    <el-dialog
    title="OEE任务结束"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    center>
        <section class='addOeeWrap'>
            <el-form ref="form" :model="form" label-width="200px">
                <el-form-item label="结束时间">
                    <el-checkbox>是否重设时间</el-checkbox>&nbsp;&nbsp;
                    <el-date-picker
                        v-model="endDate"
                        align="right"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="生产总量">
                    <el-input maxlength="2" v-model="form.name" type='number' placeholder="生产总量（件）"></el-input>
                </el-form-item>
                <el-form-item label="合格成品量">
                    <el-input v-model="form.name" type='number' placeholder="生产的成品总合格数量"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                
            </el-form>
        </section>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleOK">结束任务</el-button>
            <el-button @click="handleClose">取消</el-button>
        </span>
    </el-dialog>
    
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: true,
      endDate:'',
      form:{
          name:''
      }
    };
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
      this.dialogBack();
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
