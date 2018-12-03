<template>
  <div class="breakDetails">
    <div class="case">
      <div class="top">
        <el-button size="small" @click="toback">返回</el-button>
        <el-button size="small" @click="commitAudit">提交审核</el-button>
        <el-button size="small" @click="dispel">故障消除</el-button>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="fault-top">
            <h5>故障对象</h5>
            <el-form label-width="100px">
              <el-form-item label="设备编码：">
                <el-input v-model="companyName.deviceNo" size="mini" readonly></el-input>
              </el-form-item>
              <el-form-item label="设备名称：">
                <el-input v-model="companyName.deviceName" size="mini" readonly></el-input>
              </el-form-item>
              <el-form-item label="规格/型号：">
                <el-input v-model="companyName.deviceSpec" size="mini" readonly></el-input>
              </el-form-item>
              <el-form-item label="设备位号：">
                <el-input v-model="companyName.locationNo" size="mini" readonly></el-input>
              </el-form-item>
              <el-form-item label="安装位置：">
                <el-input v-model="companyName.location" size="mini" readonly></el-input>
              </el-form-item>
              <el-form-item label="所属单位：">
                <el-input v-model="companyName.organizeName" size="mini" readonly></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="fault-bottom">
            <h5>故障处理</h5>
            <el-form label-width="120px">
              <el-form-item label="故障持续时间：">
                <span>{{companyName.faultDuration}}</span>
              </el-form-item>
              <el-form-item label="取消人：">
                <span>{{companyName.dispel}}</span>
              </el-form-item>
              <el-form-item label="取消时间：">
                <span>{{companyName.dispelTime}}</span>
              </el-form-item>
              <el-form-item label="取消原因：" style="border-bottom:1px dashed #dde2eb; height:auto; padding-bottom:5px">
                <el-input type="textarea" v-model="companyName.dispelCause" style="width:100%;" readonly></el-input>
              </el-form-item>
              <el-form-item label="撤销人：">
                <span>{{companyName.revokePeople}}</span>
              </el-form-item>
              <el-form-item label="撤销时间：">
                <span>{{companyName.revokeTime}}</span>
              </el-form-item>
              <el-form-item label="撤销原因：" style="height:auto; padding-bottom:5px">
                <el-input type="textarea" style="width:100%;" v-model="companyName.revokeCause" readonly></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <div class="msgCase">
            <h5>故障信息</h5>
            <el-form :inline="true" style="margin-bottom:5px" size="small" label-width="100px">
              <el-form-item label="故障编码：">
                <el-input v-model="companyName.faultNo" style="width:150px" readonly size="mini"></el-input>
              </el-form-item>
              <el-form-item label="故障状况：">
                <el-input v-model="companyName.state" style="width:150px" readonly size="mini"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline="true" style="margin-bottom:5px" size="small" label-width="100px">
              <el-form-item label="故障等级：">
                <el-input v-model="companyName.faultLevel" style="width:150px" readonly size="mini"></el-input>
              </el-form-item>
              <el-form-item label="故障来源：">
                <el-input v-model="companyName.faultSource" style="width:150px" readonly size="mini"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline="true" style="margin-bottom:5px" size="small" label-width="100px">
              <el-form-item label="报告人：">
                <el-input v-model="companyName.discovery" style="width:150px" readonly size="mini"></el-input>
              </el-form-item>
              <el-form-item label="报告时间：">
                <span>{{companyName.discoveryTime}}</span>
              </el-form-item>
            </el-form>
            <el-form style="margin-bottom:5px" size="small" label-width="100px">
              <el-form-item label="故障描述：" style="margin-bottom:5px;">
                <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="companyName.faultDesc" style="width:94%"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="原因分析：">
                <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="companyName.causeAnalysis" style="width:94%"></el-input>
              </el-form-item>
              <el-form-item label="照片：">
                <template>
                  <el-carousel trigger="click" :autoplay=false height="200px">
                    <el-carousel-item v-for="item in 6" :key="item">
                      <h3>{{ item }}</h3>
                    </el-carousel-item>
                  </el-carousel>
                </template>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {
        faultId:0,
        state:[],
        companyName:{
          img:"",
          revokeId:"",
          faultLevel:"",
          deviceId:"",
          faultNo:"",
          deviceName:"",
          revokeTime:"",
          discovery:"",
          discoveryTime:"",
          dispelCause:"",
          id:0,
          state:0,
          discoveryId:"",
          organizeCode:"",
          incidence:"",
          dispelTime:"",
          revokePeople:"",
          organizeName:"",
          faultDuration:"",
          dispel:"",
          deviceSpec:"",
          locationNo:"",
          revokeCause:"",
          faultSource:"",
          faultDesc:"",
          deviceNo:"",
          deviceModel:"",
          location:"",
          causeAnalysis:"",
          dispelId:"",
        },
        tableData:[],
      };
    },
    mounted() {
      let i = 0;
      $(".leftButton").click(function() {
        i += 150;
        if ($(".slideshow>ul")[0].style.left >= "0px") {
          $(".slideshow>ul")[0].style.left = "-900px";
          i = -900;
        } else {
          $(".slideshow>ul")[0].style.left = i + "px";
        }
      });
      $(".rightButton").click(function() {
        i -= 150;
        if ($(".slideshow>ul")[0].style.left <= "-900px") {
          $(".slideshow>ul")[0].style.left = "0px";
          i = 0;
        } else {
          $(".slideshow>ul")[0].style.left = i + "px";
        }
      });
    },
    methods: {
      toback() {
        this.$router.back(-1)
      },
      toValue(value) {
        if (value.state === 0) {
          this.companyName.state = "待审核";
        }
        if (value.state === 1) {
          this.companyName.state = "审核通过";
        }
        if (value.state === 2) {
          this.companyName.state = "禁用";
        }
        if (value.state === 3) {
          this.companyName.state = "已删除";
        }
        if (value.state === 4) {
          this.companyName.state = "审核中";
        }
        if (value.state === 5) {
          this.companyName.state = "待处理";
        }
        if (value.state === 6) {
          this.companyName.state = "已消除";
        }
        if (value.state === 7) {
          this.companyName.state = "已撤销";
        }
        if (value.state === 10) {
          this.companyName.state = "已驳回";
        }
        if(value.faultLevel===1){
          this.companyName.faultLevel = "小";
        }
        if(value.faultLevel===2){
          this.companyName.faultLevel = "中";
        }
        if(value.faultLevel===3){
          this.companyName.faultLevel = "大";
        }
        if(value.faultSource === "0"){
          this.companyName.faultSource = "人工提交";
        }
        if(value.faultSource === "1"){
          this.companyName.faultSource = "设备自检";
        }
      },
      load() {
        this.Axios(
          {
            params:{faultId: this.faultId},
            type: "get",
            url: "/fault/detail",
          },
          this
        ).then(response => {
            this.tableData = response.data.data;
            this.companyName = this.tableData;
            this.toValue(response.data.data);
          },
          ({type, info}) => {

          })
      },
      commitAudit(){
        let qs = require("qs");
        let data = qs.stringify({faultId:this.companyName.id});

        this.Axios(
          {
            params:data,
            type: "post",
            url: "/fault/commitAudit",
          },
          this
        ).then(response => {

          },
          ({type, info}) => {

          })
      },
      dispel(){
        let qs = require("qs");
        let data = qs.stringify({
          faultIds:this.companyName.id,
          dispelCause:this.companyName.revokeCause
        });
        this.Axios(
          {
            params:data,
            type: "post",
            url: "/fault/dispel",
          },
          this
        ).then(response => {

          },
          ({type, info}) => {

          })
      }
    },
    created(){
      this.faultId = this.$store.state.operation.breakList.id;
      this.load();
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
  .breakDetails {
    // padding-left: 180px;
    .case {
      width: 100%;
      padding: 10px;
      .top {
        padding: 10px;
      }
      .bottom {
        width: 100%;
        overflow: hidden;
        .left {
          padding: 10px;
          float: left;
          .fault-top {
            width: 350px;
            border: @border;
            padding: 10px;
            border-radius: 5px;
            h5 {
              position: relative;
              top: -20px;
              left: 10px;
            }
            .el-form-item {
              height: 40px;
              margin-bottom: 0px;
            }
          }
          .fault-bottom {
            width: 350px;
            border: @border;
            padding: 10px;
            border-radius: 5px;
            margin-top: 20px;
            h5 {
              position: relative;
              top: -20px;
              left: 10px;
            }
            .el-form-item {
              height: 40px;
              margin-bottom: 0px;
              span {
                display: inline-block;
                width: 80px;
                height: auto;
              }
            }
          }
        }
        .right {
          padding: 10px;
          width: 650px;
          float: left;

          .msgCase {
            border: @border;
            padding: 10px;
            border-radius: 5px;
            min-height: 698px;
            h5 {
              position: relative;
              top: -20px;
              left: 10px;
            }
            .el-form-item {
              margin-bottom: 10px;
            }
            .slideshow {
              width: 94%;
              height: 200px;
              border: @border;
              margin-top: 5px;
              border-radius: 5px;
              overflow: hidden;
              position: relative;
              padding: 0 24px;
              ul {
                width: 1900px;
                position: relative;
                transition: all 0.3s ease-in-out;
                li {
                  list-style-type: none;
                  float: left;
                  height: 198px;
                  width: 150px;
                  border: 1px solid @blue;
                }
              }
              .leftButton {
                display: block;
                height: 200px;
                line-height: 180px;
                position: absolute;
                left: 0;
                transition: all 0.3s ease-in-out;
                text-align: center;
                cursor: pointer;
                padding: 0 5px;
                z-index: 10;
                &:hover {
                  background-color: #5d5f611e;
                }
              }
              .rightButton {
                display: block;
                height: 200px;
                line-height: 180px;
                position: absolute;
                right: 0;
                transition: all 0.3s ease-in-out;
                cursor: pointer;
                text-align: center;
                padding: 0 5px;
                z-index: 10;
                &:hover {
                  background-color: #5d5f611e;
                }
              }
            }
          }
        }
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
