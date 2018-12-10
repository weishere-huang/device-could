<template>
    <div class="search">
        <div class="case">
            <div>
                <el-form label-width="100px">
                    <el-form-item label="设备名称：">
                        <el-input v-model="deviceName" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="设备位号：">
                        <el-input v-model="locationNo" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人：">
                        <el-input v-model="workerName" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="设备厂家：">
                        <el-input v-model="manufacturer" size="mini"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="padding-left:9px;">
                <label for="">设备状况：</label>
                <div style="margin-top:10px;">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="1">在用</el-checkbox>
                        <el-checkbox label="2">出租</el-checkbox>
                        <el-checkbox label="3">停用</el-checkbox>
                        <el-checkbox label="4">封存</el-checkbox>
                        <el-checkbox label="5">报废</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div style="width:100%;text-align:center;margin-top:20px;">
                <el-button size="small" @click="isHide">取消</el-button>
                <el-button size="small" v-on:click="givevalue">搜索</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  inject: ["reload"],
  name: "",
  data() {
    return {
      dataName: "",
      companyName: "",

      deviceName:"",
      locationNo:"",
      workerName:"",
      manufacturer:"",
      deviceCategory:"",
      choice:"",
      checkList: [ ],
      state: []
    };
  },
  methods: {
    isHide() {
      this.$emit("isHide", "-310px");
    },
    search() {
      this.choice = "";
      for(let i= 0 ;i<this.checkList.length; i++){
        if(this.choice ==""){
          this.choice = this.checkList[i];
        }else{
          this.choice += ","+this.checkList[i];
        }
      }
      console.log(this.choice);
      this.Axios({
        params: {
          deviceName:this.deviceName,
          locationNo:this.locationNo,
          workerName:this.workerName,
          manufacturer:this.manufacturer,
          deviceSates:this.choice,
          deviceCategory:"",
          page:1,
          size:10


        },
        // option: {
        //   enableMsg: false
        // },
        type: "get",
        url: "/device/select"
        // loadingConfig: {
        //   target: document.querySelector("#mainContentWrapper")
        // }
      },this)
        // .get(this.global.apiSrc+"/device/select", {
        //   params: {
        //     deviceName:this.deviceName,
        //     locationNo:this.locationNo,
        //     workerName:this.workerName,
        //     manufacturer:this.manufacturer,
        //     deviceSates:this.choice,
        //     deviceCategory:"",
        //     page:1,
        //     size:10
        //   }
        // })
        .then(response => {
          for (let i = 0; i < response.data.data.content.length; i++) {
            if (response.data.data.content[i].deviceState === 1) {
              response.data.data.content[i].deviceState = "在用";
            }
            if (response.data.data.content[i].deviceState === 2) {
              response.data.data.content[i].deviceState = "出租";
            }
            if (response.data.data.content[i].deviceState === 3) {
              response.data.data.content[i].deviceState = "停用";
            }
            if (response.data.data.content[i].deviceState === 4) {
              response.data.data.content[i].deviceState = "封存";
            }
            if (response.data.data.content[i].deviceState === 5) {
              response.data.data.content[i].deviceState = "报废";
            }
          }
          console.log(response.data);
          document.querySelectorAll(".adsearch")[0].style.right ="-310px";
          this.dataName = response.data.data.content;
          console.log(this.dataName);
          this.$emit("advanceValue", this.dataName);
        },
          ({type, info}) => {
            //错误类型 type=faild / error
            //error && error(type, info);
          }
        )
        // .catch(function(error) {
        //   console.log(error);
        // });
    },
    //把值给到主页面
    givevalue(){
      this.choice = "";
      for(let i= 0 ;i<this.checkList.length; i++){
        if(this.choice ==""){
          this.choice = this.checkList[i];
        }else{
          this.choice += ","+this.checkList[i];
        }
      };
      this.dataName ={
        deviceName:this.deviceName,
        locationNo:this.locationNo,
        workerName:this.workerName,
        manufacturer:this.manufacturer,
        deviceSates:this.choice,
        page:1,
      };
      document.querySelectorAll(".adsearch")[0].style.right ="-310px";
      this.$emit("advanceValue", this.dataName);
    }
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
.search {
  width: 300px;
  padding: 20px;
  border: @border;
  border-radius: 5px;
  box-shadow: -5px 5px 10px #a5a8af;
  min-height: 500px;
  background-color: white;
  .case {
    .el-input {
      //   width: 65%;
    }
    .el-checkbox {
      width: 80%;
      padding: 5px 10px;
      margin: 0;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}
</style>
