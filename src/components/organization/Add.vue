<template>
  <div
    class="add"
    v-show="show"
  >
    <div class="addcase">
      <ul>
        <li>
          <label for="">名称：</label>
          <el-input type="text" size="small" v-model="orgname"></el-input>
        </li>
        <li>
          <label for="">类型：</label>
          <el-select style="width:70%" v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <label style="display:inline-block;height:60px;vertical-align:top;">备注：</label>
          <textarea type="textarea" style="width:70%;height:60px;" v-model="orgInfo"></textarea>

        </li>
        <li style="text-align:center;">
          <el-button
            size="small"
            @click="addHide"
          >取消</el-button>
          <el-button size="small" @click="add">保存</el-button>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
  name: "",
  props:["nodedata"],
  data() {
    return {
      show: true,
      type: "",
      pcode:this.nodedata,
      options: [
      {
        value: 0,
        label: "企业"
      },
      {
        value: 1,
        label: "公司"
      },
      {
        value: 2,
        label: "工厂"
      },
      {
        value: 3,
        label: "部门"
      },
      {
        value: 4,
        label: "车间"
      }
    ],
      value: "",
      orgname:"",
      orgInfo:""

    };
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "text", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    handleChange(value) {
      console.log(value);
    },
    addHide() {
      this.$emit("addHide",false)
    },
    add() {
      //添加组织机构
      let qs = require("qs");
      let data = qs.stringify({
        parentCode: this.pcode.code,
        name: this.orgname,
        organizeType: this.value,
        organizeInfo: this.orgInfo
      });
      console.log(this.pcode);
      this.axios
        .post(this.global.apiSrc + "/organize/add", data)
        .then(result => {
          if(result.data.code === 200){
            alert("添加成功");
            console.log(result.data);
          }else{
            alert("添加失败");
            console.log(result.data);
          }
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
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
.add {
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.103);
  position: absolute;
  top: 0%;
  left: 0%;
  //   margin-left: -150px;
  //   margin-top: -150px;
  .addcase {
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
        padding: 10px;
      }
      .el-input {
        width: 70%;
      }
    }
  }
}
</style>
