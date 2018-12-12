<template>
    <el-dialog
    title="OEE任务新增"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    center>
        <section class='addOeeWrap'>
            <el-form ref="form" :model="form" label-width="170px">
                <el-form-item label="速记名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="起止时间">
                    <el-date-picker
                        size="small"
                        v-model="form.date1"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="计划日工时">
                    <el-input v-model="form.name" type='number' placeholder="每日的单台设备预计生产工时（小时/日）例如：8"></el-input>
                </el-form-item>
                <el-form-item label="计划日停机时间">
                    <el-input v-model="form.name" type='number' placeholder="每日的单台设备预计停机工时（小时/日）例如：1"></el-input>
                </el-form-item>
                <el-form-item label="计划日损耗时间">
                    <el-input v-model="form.name" type='number' placeholder="每日的单台设备预计损耗工时（小时/日）例如：1.5"></el-input>
                </el-form-item>
                <el-form-item label="计划单件成品生产时间">
                    <el-input v-model="form.name" type='number' placeholder="预计单件成品生产所用时件（秒/件）例如：120"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    
                </el-form-item>
            </el-form>
        </section>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">立即创建</el-button>
            <el-button @click="handleClose">取消</el-button>
        </span>
    </el-dialog>
    
</template>
<script>
export default {
  data() {
    return {
      dialogVisible:true,
      dateRange: "",
      formInline: {
        region: ""
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      addOeeWrap: {},
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    handleClose: function() {
        this.dialogVisible=false;
        window.setTimeout(()=>{
            this.$router.push({path:'/Oee'})
        },200);
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
