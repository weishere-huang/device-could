<template>
  <div
    class="add"
    v-show="show"
  >
    <div class="addcase">
      <ul>
        <li>
          <label for="">名称：</label>
          <el-input
            type="text"
            size="small"
          ></el-input>
        </li>
        <li>
          <label for="">类型：</label>
          <el-select
            style="width:70%"
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
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
          ></textarea>

        </li>
        <li style="text-align:center;">
          <el-button
            size="small"
            @click="addHide"
          >取消</el-button>
          <el-button size="small">保存</el-button>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
  name: "",

  data() {
    return {
      show: true,
      type: "",
      options: [
        {
          value: "企业",
          label: "企业"
        },
        {
          value: "工厂",
          label: "工厂"
        },
        {
          value: "生产线",
          label: "生产线"
        },
        {
          value: "车间",
          label: "车间"
        },
        {
          value: "部门",
          label: "部门"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      value: ""
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    addHide() {
      this.$emit("addHide",false)
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
