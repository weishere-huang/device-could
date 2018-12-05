<template>
  <div
    class="revise"
    v-show="show"
  >
    <div class="revisecase">
      <ul>
        <li>
          <label for="">名称：</label>
          <el-input
            type="text"
            size="small"
            v-model="chengedata.name"
          ></el-input>
        </li>
        <li>
          <label for="">类型：</label>
          <el-select
            style="width:70%"
            v-model="chengedata.organizeType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :props="aaa"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <label style="display:inline-block;height:60px;vertical-align:top;">备注：</label>
          <textarea
            type="textarea"
            style="width:70%;height:60px;"
            v-model="chengedata.organizeInfo"
          ></textarea>

        </li>
        <li style="text-align:center;">
          <el-button
            size="small"
            @click="reviseHide"
          >取消</el-button>
          <el-button size="small" @click="update">保存</el-button>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
  inject:['reload'],
  name: "",
  props:["chengedata"],
  data() {
    return {
      aaa:{
        value:"chengedata.organizeType",
        label:""
      },
      show: true,
      // Cnode:this.chengedata,
      options: [
        {
          value: "1",
          label: "公司"
        },
        {
          value: "2",
          label: "工厂"
        },
        {
          value: "3",
          label: "部门"
        },
        {
          value: "4",
          label: "车间"
        }
      ],
    };
  },
  methods: {
    reviseHide() {
      this.$emit("reviseHide",false)
    },
    update() {
      //修改组织机构
      if (this.chengedata.organizeType == "公司"){
        this.chengedata.organizeType = 1;
      }
      if (this.chengedata.organizeType == "工厂"){
        this.chengedata.organizeType = 2;
      }
      if (this.chengedata.organizeType == "部门"){
        this.chengedata.organizeType = 3;
      }
      if (this.chengedata.organizeType == "车间"){
        this.chengedata.organizeType = 4;
      }
      console.log(this.chengedata);
      let qs = require("qs");
      let data = qs.stringify({
        organizeId: this.chengedata.id,
        organizeName: this.chengedata.name,
        organizeType: this.chengedata.organizeType,
        organizeInfo: this.chengedata.organizeInfo
      });
      console.log(data);
      this.Axios({
        url: "/organize/update",
        params: data,
        type: "post",
        option: {
          enableMsg: false
        }
      },this)
        //.post(this.global.apiSrc + "/organize/update", data)
        .then(result => {
          if(result.data.code === 200){
            console.log(result.data);
            // location.reload();
            // alert("修改成功");
            this.reload()
          }else{
            alert("修改失败");
            console.log(result.data);
           }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
.revise {
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.103);
  position: absolute;
  top: 0%;
  left: 0%;
  //   margin-left: -150px;
  //   margin-top: -150px;
  .revisecase {
    width: 500px;
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -150px;
    background-color: white;
    padding: 25px;
    border-radius: 5px;
    box-shadow: 4px 5px 10px @Info;
    li {
      margin-top: 20px;
      text-align: right;
      list-style-type: none;
      width: 100%;
      padding-right: 50px;
      textarea {
        resize: none;
        border-radius: 5px;
        border-color: #dde2eb;
      }
      .el-input {
        width: 70%;
      }
    }
  }
}
</style>
