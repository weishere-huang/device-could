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
                            @node-click="classifyNodeclick">
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
                    @change="equipmentChange"
                    :titles="['可选设备', '已选设备']"
                    filterable></el-transfer>
                </div>
            </section>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleDeviceOK">确定</el-button>
                <!-- <el-button @click="innerHandleClose">取消</el-button> -->
            </span>
        </el-dialog>
        <section class='addOeeWrap'>
            <el-form ref="form" :model="form" label-width="200px">
                <el-form-item label="速记名称">
                    <el-input size="small" v-model="form.shorthandName" placeholder="速记名称(不超过30字)" maxlength='30'></el-input>
                </el-form-item>
                <el-form-item label="起止时间">
                    <el-date-picker
                        size="small"
                        v-model="form.region"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy/MM/dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="计划日工时">
                    <el-input size="small" maxlength="2" v-model="form.calendarHours" type='number' placeholder="每日的单台设备预计生产工时（小时/日）例如：8">
                        <template slot="append">小时/日</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="计划日停机时间">
                    <el-input size="small" v-model="form.shutdownTime" type='number' placeholder="每日的单台设备预计停机工时（分钟/日）例如：1">
                        <template slot="append">分钟/日</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="计划日损耗时间">
                    <el-input size="small" v-model="form.changeTime" type='number' placeholder="每日的单台设备预计损耗工时（分钟/日）例如：1.5">
                        <template slot="append">分钟/日</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="计划单件成品生产时间">
                    <el-input size="small" v-model="form.planProdTime" type='number' placeholder="预计单件成品生产所用时件（秒/件）例如：120">
                        <template slot="append">秒/件</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="设备选择">
                    <el-button size="mini" @click="equChooseHandler" type="primary" icon="el-icon-plus" circle></el-button>
                    <span>已选择{{selectedEquList.length}}台设备</span>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input size="small" type="textarea" v-model="form.describeInfo"></el-input>
                </el-form-item>
                
            </el-form>
        </section>
        <span slot="footer" class="dialog-footer">
            <permission-button   permCode='device_OEE_add_lookup.device_OEE_add_save' banType='disable'  size="small" type="primary" @click="handleOK">立即创建</permission-button>
            <el-button size="small" @click="handleClose">取消</el-button>
        </span>
    </el-dialog>
    
</template>
<script>
let qs = require("qs");
const initTreeDataForOrganization = function(nodeData, parentCode) {
  return nodeData.filter(item => item.parentCode === parentCode).map(item => {
    return {
      id: item.code,
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
        id: item.categoryNo,
        label: item.categoryName,
        children: initTreeDataForEquType(nodeData, item.categoryNo)
      };
    });
};
export default {
    inject:['reload'],
  data() {
    return {
      dialogVisible: true,
      innerVisible:false,
      dateRange: "",
      activeNames: ["1", "2"],
      organizationTreeData: [],
      organizationEmptytTxt:'数据加载中...',
      equTypeTreeData: [],
      equTypeEmptytTxt:'数据加载中...',
      equList:[],
      selectedEquList:[],
      form: {
        shorthandName: "",
        region: [],//Date.parse(new Date(this.form.region[0]))
        calendarHours:'',
        shutdownTime:'',
        changeTime:'',
        planProdTime:'',
        deviceIds:'',
        describeInfo: ""
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
      },
      organizeCode:"",
      deviceCategory:"",
    };
  },
  created:function(){
      
  },
  methods: {
      equipmentChange(value){
          this.form.deviceIds=this.selectedEquList.join(',')
        console.log(this.form.deviceIds);
      },
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
      //consol.log(this.form.region);
      let ids=this.selectedEquList.join(',')
      console.log(ids);
      const _params=Object.assign({
              organizeCode:JSON.parse(localStorage.getItem('user')).organizeCode,
              organizeName:JSON.parse(localStorage.getItem('user')).organizeName,
              startDate:new Date(this.form.region[0]).format("yyyy/MM/dd"),
              endDate:new Date(this.form.region[1]).format("yyyy/MM/dd"),
              deviceIds:this.form.deviceIds,
              shorthandName:this.form.shorthandName,
              calendarHours:this.form.calendarHours,
              shutdownTime:this.form.shutdownTime,
              changeTime:this.form.changeTime,
              planProdTime:this.form.planProdTime,
              describeInfo:this.form.describeInfo,
           },this.form);
           console.log(_params.deviceIds);
           delete _params.region;
      this.Axios(
        {
          url: "/data/insertOeePlan",
          type: "post",
          option: {
            requestTarget:'r',
          },
          params: qs.stringify(_params)
        },
        this
      ).then(
        response => {
            this.reload();
          this.dialogBack();
        });
    },
    handleDeviceOK:function(){
        this.innerVisible=false;
    },
    innerHandleClose: function() {
      this.innerVisible=false;
    },
    deviceList(){
        this.Axios(
                {
                    url: "/deviceState/listDeviceByOrganize",
                    type: 'get',
                    params:{
                        organizeCode:this.organizeCode,
                        deviceCategory:this.deviceCategory,
                        page:-1,
                        // size:100,

                    },
                    option:{requestTarget:'r'},
                    loadingConfig:{
                        target: document.querySelector('.el-dialog')
                    }
                },
                this
                ).then((response)=>{
                    console.log(response);
                    this.equList=response.data.data.map(item=>{return {
                        key: item.id,
                        label: `${item.deviceName}(${item.deviceNo})`
                    }})
                })
    },
    equChooseHandler:function(){
        this.organizeCode=JSON.parse(localStorage.getItem('user')).organizeCode
        this.innerVisible=true;
        this.Axios(
        {
            url: ["/organize/allOrganize", "/deviceCategory/all"],
            type: ["get","get"],
            params:[{},{}],
            loadingConfig:{
                        target: document.querySelector('.el-dialog')
                    }
        },
        this
        ).then(
        ([res1, res2]) => {
            if(res1.data.data.length){
                this.organizationTreeData = initTreeDataForOrganization(res1.data.data,res1.data.data.find(item=>item.organizeType===1).parentCode);
                this.deviceList()
            }else{
                this.organizationEmptytTxt='暂无数据';
            }
            if(res2.data.data.length){
                this.equTypeTreeData = initTreeDataForEquType(res2.data.data, "0");
            }else{
                this.equTypeEmptytTxt='暂无数据';
            }
            //window.setTimeout(() => {this.$refs.tree.setCurrentKey("1024");}, 1000);
        },
        () => {}
        );
    },
    treeNodeClick(data){
        this.organizeCode=data.id
        console.log(data);
        this.deviceList()
    },
    classifyNodeclick(data){
        this.deviceCategory=data.id
        console.log(data);
        this.deviceList()
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
