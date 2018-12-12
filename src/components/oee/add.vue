<template>
    <el-dialog
    title="OEE任务新增"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    center>
        <el-dialog
        title="设备选择"
        width="850px"
        :visible.sync="innerVisible"
        append-to-body>
            <section class="equSelectWrap">
                <div>
                    <el-collapse class='collapseStyle' v-model="activeNames">
                        <el-collapse-item title="组织机构" name="1">
                        <div>
                            <el-tree 
                            ref='tree'
                            :data="organizationTreeData" 
                            highlight-current
                            default-expand-all
                            node-key="id"
                            :empty-text="organizationEmptytTxt"
                            :expand-on-click-node="false"
                            @node-click="treeNodeClick">
                            </el-tree>
                        </div>
                        </el-collapse-item>
                        <el-collapse-item title="设备类别" name="2">
                        <div>
                            <el-tree 
                            ref='tree2'
                            :data="equTypeTreeData" 
                            highlight-current
                            default-expand-all
                            node-key="id"
                            :empty-text="equTypeEmptytTxt"
                            :expand-on-click-node="false"
                            @node-click="treeNodeClick">
                            </el-tree>
                        </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div>
                    <el-transfer 
                    class='transferStyle' 
                    v-model="selectedEquList" 
                    :data="equList" 
                    :titles="['可选设备', '已选设备']"
                    filterable></el-transfer>
                </div>
            </section>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleOK">确定</el-button>
                <el-button @click="innerHandleClose">取消</el-button>
            </span>
        </el-dialog>
        <section class='addOeeWrap'>
            <el-form ref="form" :model="form" label-width="200px">
                <el-form-item label="速记名称">
                    <el-input v-model="form.name" placeholder="速记名称(不超过30字)" maxlength='30'></el-input>
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
                    <el-input maxlength="2" v-model="form.name" type='number' placeholder="每日的单台设备预计生产工时（小时/日）例如：8"></el-input>
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
                <el-form-item label="设备选择">
                    <el-button @click="equChooseHandler" type="primary" icon="el-icon-plus" circle></el-button>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                
            </el-form>
        </section>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleOK">立即创建</el-button>
            <el-button @click="handleClose">取消</el-button>
        </span>
    </el-dialog>
    
</template>
<script>
const initTreeDataForOrganization = function(nodeData, parentCode) {
  return nodeData.filter(item => item.parentCode === parentCode).map(item => {
    return {
      id: item.id,
      label: item.name,
      children: initTreeDataForOrganization(nodeData, item.code)
    };
  });
};
const initTreeDataForEquType = function(nodeData, parentCode) {
  return nodeData
    .filter(item => item.categoryParentNo === parentCode)
    .map(item => {
      return {
        id: item.id,
        label: item.categoryName,
        children: initTreeDataForEquType(nodeData, item.categoryNo)
      };
    });
};
export default {
  data() {
    return {
      dialogVisible: true,
      innerVisible:false,
      dateRange: "",
      formInline: {
        region: ""
      },
      activeNames: ["1", "2"],
      organizationTreeData: [],
      organizationEmptytTxt:'数据加载中...',
      equTypeTreeData: [],
      equTypeEmptytTxt:'数据加载中...',
      equList:[],
      selectedEquList:[],
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
  created:function(){
      
  },
  methods: {
    dialogBack: function() {
      this.dialogVisible = false;
      window.setTimeout(() => {
        this.$router.push({ path: "/Oee" });
      }, 200);
    },
    handleClose: function() {
      this.dialogBack();
    },
    handleOK: function() {
      this.dialogBack();
    },
    innerHandleClose: function() {
      this.innerVisible=false;
    },
    equChooseHandler:function(){
        this.innerVisible=true;
        this.Axios(
        {
            url: ["/organize/allOrganize", "/deviceCategory/all"],
            type: ["get","get"],
            params:[{},{}]
        },
        this
        ).then(
        ([res1, res2]) => {
            if(res1.data.data.length)
            this.organizationTreeData = initTreeDataForOrganization(res1.data.data,"0");
            else
            this.organizationEmptytTxt='暂无数据';

            if(res2.data.data.length)
            this.equTypeTreeData = initTreeDataForEquType(res2.data.data, "0");
            else
            this.equTypeEmptytTxt='暂无数据';
            
            //window.setTimeout(() => {this.$refs.tree.setCurrentKey("1024");}, 1000);
        },
        () => {}
        );
    }
  }
};
</script>
<style lang="less" scoped>
.addOeeWrap {
  width: 600px;
  padding: 20px 0;
}
.equSelectWrap{
    height: 500px;
    display: flex;
    &>div{
        margin: 10px;
        border-right: solid 1px #eee;
        height: 100%;
        overflow: auto;
    }
    &>div:nth-child(1){
        flex: 1
    }
    &>div:nth-child(2){
        flex: 2
    }
}
.collapseStyle{
    width: 96%;
}
.transferStyle{
    width: 95%;
    height: 100%;
}
</style>
