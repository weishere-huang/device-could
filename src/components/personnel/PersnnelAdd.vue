<template>
    <div class="persnnel-add">
        <div class="add-case">
            <div class="topbtn">
                <el-button size="small">返回</el-button>
                <el-button size="small">保存</el-button>
            </div>
            <div class="botton">
                <div class="essential">
                    <p class="title">基本信息（必填）</p>
                    <div class="left">
                        <ul>
                            <li>
                                <label for=""><span style="letter-spacing: 10px;">姓名</span>：</label>
                                <el-input type="text" size="small"></el-input>
                            </li>
                            <li>
                                <label for=""><span style="letter-spacing: 10px;">性别</span>：</label>
                                <span style="display: inline-block;width:70%;text-align: left;">
                                    <el-radio v-model="sex" label="男">男</el-radio>
                                    <el-radio v-model="sex" label="女">女</el-radio>
                                </span>

                            </li>
                            <li>
                                <label for="">员工编号：</label>
                                <el-input type="text" size="small"></el-input>
                            </li>
                            <li>
                                <label for="">手机号码：</label>
                                <el-input type="text" size="small"></el-input>
                            </li>
                            <li>
                                <label for="">组织单位：</label>
                                <el-select v-model="organization" placeholder="请选择" size="small" style="width:70%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>

                                </el-select>
                            </li>
                            <li>
                                <label for="">入职时间：</label>
                                <el-input type="date" size="small"></el-input>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <ul>
                            <li>
                                <label for="">身份证：</label>
                                <el-input type="text" size="small"></el-input>
                            </li>
                            <li>
                                <label for="">出生日期：</label>
                                <el-input type="date" size="small"></el-input>
                            </li>
                            <li>
                                <label for="">岗位：</label>
                                <el-input type="text" size="small"></el-input>
                            </li>
                            <li>
                                <label for="">婚姻状况：</label>
                                <span style="display: inline-block;width:70%;text-align: left;">
                                    <el-radio v-model="marriage" label="已婚">已婚</el-radio>
                                    <el-radio v-model="marriage" label="未婚">未婚</el-radio>
                                </span>

                            </li>
                        </ul>
                    </div>
                </div>
                <div >
                    <p class="title">更多信息（选填）</p>
                    <ul>
                        <li></li>
                    </ul>
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
      sex: "",
      organization: "",
      marriage: "",
      options: [
        {
          value: "选项1",
          label: "四川长虹电器有限公司"
        },
        {
          value: "选项2",
          label: "四川长虹智能制造有限公司"
        },
        {
          value: "选项3",
          label: "长虹网络科技有限公司"
        },
        {
          value: "选项4",
          label: "长虹电子系统有限公司"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@blue: #409eff;
@Success: #67c23a;
@Warning: #e6a23c;
@Danger: #f56c6c;
@Info: #dde2eb;
.persnnel-add {
  padding-left: 180px;
  .add-case {
    padding: 10px;
    .topbtn {
      padding-left: 10px;
      height: 60px;
      line-height: 60px;
      //   border: 1px solid @Info;
      border-radius: 5px;
    }
    .botton {
      font-size: 12px;
      margin-top: 10px;
      //   border: 1px solid @Info;
      border-radius: 5px;
      padding: 10px 0 0 10px;
      position: relative;
      .essential {
        width: 600px;
        border: 1px solid @Info;
        border-radius: 5px;
        overflow: hidden;
        .title {
          display: inline-block;
          width: 100px;
          position: absolute;
          top: 1%;
          left: 2.5%;
          background-color: white;
        }
        .left {
          width: 45%;
          text-align: right;
          float: left;
          li {
            list-style-type: none;
            height: 60px;
            line-height: 60px;
          }
          .el-input {
            width: 70%;
          }
        }
        .right {
          width: 45%;
          text-align: right;
          float: left;
          padding-top: 120px;
          padding-left: 20px;
          //   border: 1px solid red;
          li {
            list-style-type: none;
            height: 60px;
            line-height: 60px;
          }
          .el-input {
            width: 70%;
          }
        }
      }
      .more-msg {
        width: 600px;
        border: 1px solid @Info;
        border-radius: 5px;
        overflow: hidden;
      }
    }
  }
}
</style>
