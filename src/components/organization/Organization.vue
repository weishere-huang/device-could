<template>
    <div class="organization">
        <div class="content">
            <div class="left">
                <h5>企业名称</h5>
                <ul>
                    <li v-for="(item, index) in name1" :key="index">{{item}}
                        <span style="letter-spacing:2px;">
                            <i class="iconfont icon-jia"></i>
                            <i class="iconfont icon-xiewrite18"></i>
                            <i class="iconfont icon-shanchu1"></i>
                        </span>
                        <ul v-if="sss!=''">
                            <li style="border-top:1px solid #dde2eb;" >
                                <span style="letter-spacing:2px; height:25px;">
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
                    <li v-for="(item, index) in name1" :key="index">{{item}}
                        <ul v-if="sss!=''">
                            <li style="border-top:1px solid #dde2eb;text-align=center;padding:0;"></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="right">
                <h5>备注</h5>
                <ul>
                    <li v-for="(item, index) in name1" :key="index">{{item}}
                        <ul v-if="sss!=''">
                            <li style="border-top:1px solid #dde2eb;text-align=center;padding:0;"></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      sss: "",
      name1: [1, 2, 3, 4, 5, 6, 7, 8],
      type: [1, 2, 3, 4, 5, 6, 7, 8],
      comment: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  methods: {},
  mounted() {
    let li = document.querySelectorAll(".left li");
    for (let i = 0; i < li.length; i++) {
      li[i].onmouseover = function(event) {
        console.log("ok");
        document.querySelectorAll(".content li span")[i].style.opacity = 1;
        event.stopPropagation();
      };
      li[i].onmouseout = function(event) {
        document.querySelectorAll(".content li span")[i].style.opacity = 0;
        event.stopPropagation();
      };
    }
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
