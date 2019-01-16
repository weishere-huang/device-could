<template>
  <div class="breakDetails">
    <div class="case">
      <div class="top">
        <el-button
          size="small" type="primary" @click="toback"  icon="el-icon-arrow-left">返回</el-button>
        <!--<el-button size="small" @click="commitAudit">提交审核</el-button>-->
        <permission-button
          permCode='operation_fault_lookup.operation_fault_dispel'
          banType='hide'
          size="small" type="primary" @click="dispel" v-if="isOk"><i style='font-size:12px' class='iconfont'>&#xe645;</i>&nbsp;故障消除</permission-button>
        <permission-button
          permCode='operation_fault_detail_lookup.operation_fault_detail_audit'
          banType='hide'
          size="small" type="primary" @click="auditInfo" icon="el-icon-search">审核详情</permission-button>
        <!-- 故障消除弹框 -->
        <el-dialog
          title="故障消除"
          :visible.sync="dialogVisible"
          width="30%"
          >
           <el-form label-position=right label-width="120px" :model="formLabelAlign" style="padding:10px">
            <el-form-item label="故障持续时间：">
              <el-input  v-model="formLabelAlign.time" size="mini" style="width:30%"></el-input>
              <span>小时</span>
            </el-form-item>
            <el-form-item label="消除原因：">
              <el-input type="textarea" v-model="formLabelAlign.desc"></el-input>
            </el-form-item>
           </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" type="primary">取 消</el-button>
            <el-button type="primary" @click="toDispel">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 故障消除弹框结束 -->
      </div>
      <div class="bottom">
        <div class="left">
          <div class="fault-top">
            <h5>故障对象</h5>
            <el-form label-width="100px">
              <el-form-item label="设备编码：">
                <span>{{companyName.deviceNo}}</span>
              </el-form-item>
              <el-form-item label="设备名称：">
                <span>{{companyName.deviceName}}</span>
              </el-form-item>
              <el-form-item label="规格/型号：">
              <span>{{companyName.deviceSpec}}</span>
              </el-form-item>
              <el-form-item label="设备位号：">
                <span>{{companyName.locationNo}}</span>
              </el-form-item>
              <el-form-item label="安装位置：">
                <span>{{companyName.location}}</span>
              </el-form-item>
              <el-form-item label="所属单位：">
                <span>{{companyName.organizeName}}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="fault-bottom">
            <h5>故障处理</h5>
            <el-form label-width="120px">
              <el-form-item label="故障持续时间：">
                <span>{{companyName.faultDuration}}</span>
              </el-form-item>
              <el-form-item label="消除人：">
                <span>{{companyName.dispel}}</span>
              </el-form-item>
              <el-form-item label="消除时间：">
                <span>{{companyName.dispelTime}}</span>
              </el-form-item>
              <el-form-item label="消除原因：" style="border-bottom:1px dashed #dde2eb; height:auto; padding-bottom:5px">
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
                <span>{{companyName.faultNo}}</span>
              </el-form-item>
              <el-form-item label="故障状况：">
                <span>{{companyName.state}}</span>
              </el-form-item>
            </el-form>
            <el-form :inline="true" style="margin-bottom:5px" size="small" label-width="100px">
              <el-form-item label="故障等级：">
                <span>{{companyName.faultLevel}}</span>
              </el-form-item>
              <el-form-item label="故障来源：">
                <span>{{companyName.faultSource}}</span>
              </el-form-item>
            </el-form>
            <el-form :inline="true" style="margin-bottom:5px" size="small" label-width="100px">
              <el-form-item label="报告人：">
                <span>{{companyName.discovery}}</span>
              </el-form-item>
              <el-form-item label="报告时间：">
                <span>{{companyName.discoveryTime}}</span>
              </el-form-item>
            </el-form>
            <el-form style="margin-bottom:5px;" size="small" label-width="100px" >
              <el-form-item label="故障描述：" style="margin-bottom:5px;width:100%">
                <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="companyName.faultDesc" style="width:94%"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="原因分析：" style="width:100%">
                <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="companyName.causeAnalysis" style="width:94%"></el-input>
              </el-form-item>
              <el-form-item label="照片：" style="width:100%">
                <template>
                  <el-carousel trigger="click" :autoplay=false height="260px" style="width: 94%">
                    <el-carousel-item v-for="item in imgPath" :key="item" >
                      <i @click="imgIsOk" :id="item"><img :src="item" style="width: 100%;"></i>
                    </el-carousel-item>
                  </el-carousel>
                    <el-dialog
                      width="75%"
                      :visible.sync="imgShow"
                      center>
                      <div style="text-align: center; width: 100%; height: 100%">
                        <img :src="lookImg" style="max-width: 100%;"/>
                      </div>
                    </el-dialog>
                  <el-dialog
                    title="审核详情"
                    :visible.sync="submitAuditInfo"
                    width="50%"
                  >
                    <div style="padding:10px">
                      <v-table
                        is-horizontal-resize
                        column-width-drag
                        :multiple-sort="false"
                        style="width:100%;"
                        :columns="submitAuditTable"
                        :table-data="submitAuditData"
                        row-hover-color="#eee"
                        row-click-color="#edf7ff"
                        :row-height=30
                        :show-vertical-border="false"
                      ></v-table>
                    </div>
                  </el-dialog>
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
        submitAuditInfo:false,
        submitAuditTable:[
          {
            field: 'custome', title:'序号', width: 40, titleAlign: 'center', columnAlign: 'center',
            formatter: function (rowData,rowIndex) {
              return rowIndex < 3 ? '<span>' + (rowIndex + 1) + '</span>' : rowIndex + 1
            }, isFrozen: true,isResize:true
          },
          {
            field: "name",
            title: "审核人",
            width: 60,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "startTime",
            title: "提交时间",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "endTime",
            title: "审核时间",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
          },
          {
            field: "state",
            title: "审核状态",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true,
            formatter:function (rowData) {
              if(rowData.state===0)return`<span>待处理</span>`;
              if(rowData.state===1)return`<span>已通过</span>`;
              if(rowData.state===2)return`<span>已驳回</span>`;
            }
          },
          {
            field: "position",
            title: "岗位",
            width: 40,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "phone",
            title: "手机号",
            width: 80,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          },
          {
            field: "opinion",
            title: "审核意见",
            width: 100,
            titleAlign: "left",
            columnAlign: "left",
            isResize: true
          }
        ],
        submitAuditData:[],
        lookImg:"",
        imgShow:false,
        isOk:true,
        imgPath:[],
        dialogVisible:false,
        formLabelAlign:{
          time:"",
          desc:""
        },
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
      auditInfo(){
        this.submitAuditInfo = true;
        this.Axios(
          {
            params:{faultId:this.companyName.id,
              page:1, size:20
            },
            type: "get",
            url: "/fault/auditList",
            option:{enableMsg:false}
          },
          this
        ).then(response => {
            this.submitAuditData=response.data.data.content
          },
          ({type, info}) => {

          })
      },
      imgIsOk(event){
        this.lookImg = event.path[1].id;
        this.imgShow=true
      },
      toPansAdd() {
        this.$router.push({
          path: "/Breakdown"
        });
        this.$store.commit("breakDetails","y")
      },
      toback() {
        this.$router.back(-1)
      },
      toValue(value) {
        if (value.state === 0) this.companyName.state = "待审核";
        if (value.state === 2) this.companyName.state = "禁用";
        if (value.state === 3) this.companyName.state = "已删除";
        if (value.state === 4) this.companyName.state = "审核中";
        if (value.state === 5) this.companyName.state = "执行中";
        if (value.state === 6) this.companyName.state = "已消除";
        if (value.state === 7) this.companyName.state = "已撤销";
        if (value.state === 10) this.companyName.state = "已驳回";
        if (value.state === 14) this.companyName.state = "已完成";
        this.companyName.state==="待审核" || this.companyName.state==="执行中"?
          this.isOk = true : this.isOk = false;
        if(value.faultLevel===1) this.companyName.faultLevel = "小";
        if(value.faultLevel===2) this.companyName.faultLevel = "中";
        if(value.faultLevel===3) this.companyName.faultLevel = "大";
        if(value.faultSource === "0") this.companyName.faultSource = "人工提交";
        if(value.faultSource === "1") this.companyName.faultSource = "设备自检";
        this.companyName.faultDuration ==null ?
          this.companyName.faultDuration ="---":
          this.companyName.faultDuration +="小时";
      },
      load(number) {
        this.Axios(
          {
            params:{faultId: number},
            type: "get",
            url: "/fault/detail",
            option:{enableMsg:false}
          },
          this
        ).then(response => {
            this.tableData = response.data.data;
            this.companyName = this.tableData;
            this.toValue(response.data.data);
            this.imgPath = this.tableData.img.split(",").map((item)=>{
              return this.global.imgPath+item.split("img:")[1];
            });
          },
          ({type, info}) => {
          })
      },
      dispel(){
        if (this.companyName.state !=="已删除"&&this.companyName.state!=="待审核"){
          this.dialogVisible=true;
        }else{
          this.$message.error("对不起、不能消除待审核或已删除状态的数据")
        }
      },
      toDispel(){
        let qs = require("qs");
        let data = qs.stringify({
          faultIds:this.companyName.id,
          dispelCause:this.formLabelAlign.desc,
          faultDuration:this.formLabelAlign.time
        });
        this.formLabelAlign.desc = "";
        this.formLabelAlign.time = "";
        this.Axios(
          {
            params:data,
            type: "post",
            url: "/fault/dispel",
            option:{successMsg:"消除成功"}
          },
          this
        ).then(response => {
            this.dialogVisible = false;
            this.toPansAdd()
          },
          ({type, info}) => {
          })
      },
    },
    created(){
      this.load(this.$route.params.id);
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
    min-width: 1090px;
    .case {
      width: 100%;
      padding: 10px;
      .top {
        border: @border;
        padding: 10px;
        border-radius: 5px;

      }
      .bottom {
        width: 100%;
        overflow: hidden;
        border: @border;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        .left {
          
          width: 35%;
          min-width: 350px;
          float: left;
          .fault-top {
            width: 350px;
            border: @border;
            padding: 10px;
            border-radius: 5px;
            h5 {
              position: relative;
              top: -17px;
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
              top: -17px;
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
          width: 65%;
          min-width: 650px;
          float: left;

          .msgCase {
            border: @border;
            padding: 10px;
            border-radius: 5px;
            min-height: 650px;
            .el-form-item{
              width: 45%;
            }
            
            h5 {
              position: relative;
              top: -17px;
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
