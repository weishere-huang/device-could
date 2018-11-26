<template>

  <div class="organization">
    <div class="content">
      <div class="left">
        <h5>企业名称</h5>
        <ul>

          <li v-for="(item, index) in name1" :key="index">{{item.name}}
            <span style="letter-spacing:2px;">
              <i class="iconfont icon-jia" @click="ap"></i>
              <i class="iconfont icon-xiewrite18" @click="revise"></i>
              <i class="iconfont icon-shanchu1"></i>
            </span>
            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;" v-for="(item, index) in sss" :key="index">
                {{item.menu_name}}
                <span style="letter-spacing:5px; height:25px;">
                  <i class="iconfont icon-jia" @click="ap"></i>
                  <i class="iconfont icon-xiewrite18"></i>
                  <i class="iconfont icon-shanchu1"></i>
                </span>
              </li>
            </ul>
            第三层
            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;" v-for="(item, index) in sss" :key="index">
                {{item.menu_name}}
                <span style="letter-spacing:5px; height:25px;">
                  <i class="iconfont icon-jia" @click="ap"></i>
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

          <li v-for="(item, index) in name1" :key="index">{{item}}
            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;text-align:center;padding:0;"></li>

            </ul>
          </li>
        </ul>
      </div>
      <div class="right">
        <h5>备注</h5>
        <ul>

          <li v-for="(item, index) in name1" :key="index">{{item}}
            <ul v-if="sss!=''">
              <li style="border-top:1px solid #dde2eb;text-align:center;padding:0;"></li>

            </ul>
          </li>
        </ul>
      </div>
    </div>

    <add v-show="add1"></add>
    <revise v-show="revise1"></revise>
  </div>

</template>
<script>
import add from "./Add";
import revise from "./Revise";
import { eq } from "semver";

export default {
  data() {
    return {
      add1: false,
      revise1: false,
      sss: "",
      xxx: "",
      name1: [1, 2, 3, 4, 5, 6, 7, 8],
      organizeType: [1, 2, 3, 4, 5, 6, 7, 8],
      organizeInfo: [1, 2, 3, 4, 5, 6, 7, 8],
      pushtext: [],
      code: "id"
    };
  },
  methods: {
    add() {
      //添加组织机构
      let qs = require("qs");
      let data = qs.stringify({
        parentCode: "1000001",
        name: "后端组55555",
        organizeType: 1,
        organizeInfo: "1119"
      });
      axios
        .post("api/organize/add", data)
        .then(result => {
          alert("add");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    update() {
      //修改组织机构
      let qs = require("qs");
      let data = qs.stringify({
        organizeId: "356",
        organizeType: "1",
        organizeInfo: "14:53",
        organizeName: "工程与技术中心"
      });
      axios
        .put("api/organize/update", data)
        .then(result => {
          alert("updata");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    delete() {
      //删除组织机构
      let qs = require("qs");
      let data = qs.stringify({});
      axios
        .delete(this.global.apiSrc + "/delete/327")
        .then(result => {
          alert("delete");
          console.log("delete");
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    allOrganize() {
      axios
        .get(this.global.apiSrc + "/organize/allOrganize/321")
        .then(result => {
          console.log(result);
          this.name1 = this.filterArray(result.data.data, 0);
          console.log(this.name1);
          this.sss = this.name1.children;
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
    findOneOrganize() {
      //查询单个组织机构

      axios
        .get("api/organize/findOneOrganize/1")
        .then(result => {
          alert("findone");
          console.log("findone");
          console.log(+result.data);
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    filterArray(data, parent) {
      let vm = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentCode == parent) {
          var obj = data[i];
          temp = this.filterArray(data, data[i].code);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    },
    ap() {
      this.add1 = !this.add1;
    },
    revise() {
      this.revise1 = !this.revise1;
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
  created() {
    this.allOrganize();
    //this.findOneOrganize();
    //this.delete();
    //this.add();
    //this.update();
  },
  components: {
    revise,
    add
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
