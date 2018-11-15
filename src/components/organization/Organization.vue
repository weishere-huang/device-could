<template>

    <div class="organization">
        <div class="content">
            <div class="left">
                <h5>企业名称</h5>
                <ul>
                    <li v-for="(item, index) in name" :key="index">{{item}}
                        <span style="letter-spacing:2px;">
                            <i class="iconfont icon-jia"></i>
                            <i class="iconfont icon-xiewrite18"></i>
                            <i class="iconfont icon-shanchu1"></i>
                        </span>
                        <ul v-if="sss!=''">
                            <li style="border-top:1px solid #dde2eb;" >
                                <span style="letter-spacing:5px; height:25px;">
                                    <i class="iconfont icon-jia"></i>
                                    <i class="iconfont icon-xiewrite18"></i>
                                    <i class="iconfont icon-shanchu1"></i>
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="center">
                <h5>类型</h5>
                <ul>
                    <li v-for="(item, index) in organizeType" :key="index">{{item}}
                        <ul v-if="sss!=''">
                            <li style="border-top:1px solid #dde2eb;text-align : center;padding:0;"></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="right">
                <h5>备注</h5>
                <ul>
                    <li v-for="(item, index) in organizeInfo" :key="index">{{item}}
                        <ul v-if="sss!=''">
                            <li style="border-top:1px solid #dde2eb;text-align : center;padding:0;"></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>


    </div>
    <add v-show="add"></add>
    <revise v-show="revise1"></revise>
  </div>
</template>
<script>
import add from "./Add";
import revise from "./Revise";
export default {
  name: "",
  data() {
    return {

      sss: "1",
      name: [1, 2, 3, 4, 5, 6, 7, 8],
      organizeType: [1, 2, 3, 4, 5, 6, 7, 8],
      organizeInfo: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  methods: {
    add(){
      //添加组织机构
      let qs = require("qs");
      let data = qs.stringify({
        ids:"1,2,3"
      });
      axios
        .post("api/organize/add", data)
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    update(){
      //修改组织机构
      let qs = require("qs");
      let data = qs.stringify({
        ids:"1,2,3"
      });
      axios
        .post("api/organize/update", data)
        .then(result => {
          console.log(result.data);

        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    delete(){
      //修改组织机构
      let qs = require("qs");
      let data = qs.stringify({
        ids:"1,2,3"
      });
      axios
        .get("api/organize/delete"+this.organizeId, data)
        .then(result => {
          console.log(result.data);

        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    allOrganize(){
      //查询所有组织机构
      let qs = require("qs");
      let data = qs.stringify({
        token:"321"
      });
      axios
        .get("api/organize/allOrganize",data)
        .then(result => {
          alert("查询所有组织机构")
          console.log(result.data);
          this.name=result.data.name;
          this.organizeType=result.data.organizeType;
          this.organizeInfo=result.data.organizeInfo;
          // "id": 328,
          // "code": "1000001",
          //   "parentCode": "1000",
          //   "enterpriseId": 313,
          //   "name": "工程与技术中心",
          //   "organizeType": 1,
          //   "organizeInfo": "暂无",
          //   "gmtCreate": "2018-11-14T05:46:01.000+0000",
          //   "gmtModified": "2018-11-14T05:46:01.000+0000",
          //   "state": 1
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    findOneOrganize(){
      //查询单个组织机构

      axios
        .get("api/organize/findOneOrganize"+this.organizeId)
        .then(result => {
          console.log(result.data);

        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    }


  },
  mounted() {
    let li = document.querySelectorAll(".left li");
    for (let i = 0; i < li.length; i++) {
      li[i].onmouseover = function(event) {
        // console.log("ok");
        document.querySelectorAll(".content li span")[i].style.opacity = 1;
        event.stopPropagation();
      };
      li[i].onmouseout = function(event) {
        document.querySelectorAll(".content li span")[i].style.opacity = 0;
        event.stopPropagation();
      };
    }
  },
  created(){
    this.allOrganize();

  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/font/font.css");
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
@border: 1px solid #dde2eb;
.organization {
  padding-left: 180px;
  add {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .content {
    padding: 10px;
    overflow: hidden;
    h5 {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      border-bottom: @border;
    }
    div:nth-child(1) {
      width: 40%;
    }
    div:nth-child(2) {
      width: 10%;
      border-left: none;
      border-right: none;
    }
    div:nth-child(3) {
      width: 50%;
    }
    div {
      float: left;
      text-align: center;
      border: @border;
      li {
        list-style-type: none;
        border-bottom: 1px solid @Info;
        // height: 30px;
        line-height: 29px;
        overflow: hidden;
        // pointer-events: none;
        ul {
          // pointer-events: none;
          li {
            list-style-type: none;
            line-height: 30px;
            height: 30px;
            padding-left: 40px;
            // pointer-events: none;
          }
        }

        span {
          opacity: 0;
          padding-left: 10px;
          transition: All 0.4s ease-in-out;
          i {
            cursor: pointer;
            display: inline-block;
            height: 29px;

            &:hover {
              transform: scale(1.4);
              color: #67c23a;
            }
          }
        }
        // &:hover {
        //   span {
        //     opacity: 1;
        //     // display: inline-block;
        //     height: 25px;
        //   }
        // }
      }
      li:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
