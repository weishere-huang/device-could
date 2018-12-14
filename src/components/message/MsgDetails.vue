<template>
  <div class="msgDetails">
    <div class="case">
      <div class="top">
        <el-button size="small" @click="back">返回</el-button>
      </div>
      <div class="bottom">
        <h4>消息详情</h4>
        <ul>
          <li>
            <span>消息标题：</span>
            <span>{{msgDetail.msgTitle}}</span>
          </li>
          <li>
            <span>消息内容：</span>
            <span>{{msgDetail.msgContent}}</span>
          </li>
          <!--<li>-->
            <!--<span>消息类型：</span>-->
            <!--<span>{{msgDetail.msgType}}</span>-->
          <!--</li>-->
          <li>
            <span>发送时间：</span>
            <span>{{msgDetail.gmtCreate}}</span>
          </li>
          <li>
            <!--<span>接收对象：</span>-->
            <!--<span>-->
              <!--<table>-->
                <!--<thead>-->
                  <!--<th>姓名</th>-->
                  <!--<th>状态</th>-->
                  <!--<th>阅读时间</th>-->
                <!--</thead>-->
                <!--<tr v-for="(item, index) in tableData" :key="index">-->
                  <!--<td>{{item.name}}</td>-->
                  <!--<td>{{item.address}}</td>-->
                  <!--<td>{{item.date}}</td>-->
                <!--</tr>-->
              <!--</table>-->
            <!--</span>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
let apiMsg = "http://192.168.1.104:9880/m";
export default {
  name: "",
  props: ["msgDetail"],
  data() {
    return {
      ishide: false,
      message: {
        title: "1111",
        centent: "222",
        type: "333",
        date: "4444"
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: ""
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: ""
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: ""
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: ""
        }
      ]
    };
  },
  methods: {
    back() {
      this.$emit("detailsIsHide", this.ishide);
    }
  },
  created() {
    this.Axios({

      // option: {
      //   enableMsg: false
      // },
      type: "get",
      url: "/message/findOneMsg/" + this.msgDetail,
      // loadingConfig: {
      //   target: document.querySelector(".message")
      // }
      option:{requestTarget:"m"}
    },this)
      //.get(apiMsg + "/message/findOneMsg/" + this.msgDetail)
      .then(result => {
        console.log(result.data);
        this.message = result.data.data;
        // if (this.message.isRead === 0) {
        //   this.updateMessageRead();
        //   this.allMsg();
        // }
      })
      .catch(err => {
        console.log(err);
        console.log(this.userName);
      });
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
.msgDetails {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #55565738;
  .case {
    width: 700px;
    font-size: 14px;
    margin: auto;
    padding: 20px;
    background-color: white;
    margin-top: 100px;
    border-radius: 5px;
    box-shadow: 4px 4px 10px #a9cef3;
    .top {
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
    .bottom {
      margin-top: 10px;
      border: @border;
      border-radius: 5px;
      padding-left: 30px;
      h4 {
        position: relative;
        top: -10px;
        background-color: white;
        width: 70px;
        text-align: center;
      }
      li {
        list-style-type: none;
        span:nth-child(1) {
          vertical-align: top;
        }
        span:nth-child(2) {
          display: inline-block;
          min-height: 40px;
          width: 70%;
          table {
            width: 100%;
            text-align: center;
            border: @border;
            border-radius: 5px;
            padding: 0;
            margin: 0;
            border-collapse: collapse;
            td,
            th {
              border: @border;
            }
          }
        }
      }
    }
  }
}
</style>
