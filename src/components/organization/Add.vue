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
            v-model="orgname"
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
            v-model="orgInfo"
          ></textarea>

        </li>
        <li style="text-align:center;">
          <el-button
            size="small"
            @click="addHide"
          >取消</el-button>
          <el-button
            size="small"
            @click="add"
            type="primary"
          >保存</el-button>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
  inject: ["reload"],
  name: "",
  props:["nodedata",'test'],
  data() {
    /*let option=[]
    if (this.nodedata.organizeType=="企业") {
       option=[
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
        },
        {
          value: 5,
          label: "产线"
        }
      ];
    } else if (this.nodedata.organizeType == "公司") {
      option = [
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
        },
        {
          value: 5,
          label: "产线"
        }
      ];
    } else if (this.nodedata.organizeType == "工厂") {
      option = [
        {
          value: 3,
          label: "部门"
        },
        {
          value: 4,
          label: "车间"
        },
        {
          value: 5,
          label: "产线"
        }
      ];
    } else if (this.nodedata.organizeType == "部门") {
      option = [
        {
          value: 4,
          label: "车间"
        },
        {
          value: 5,
          label: "产线"
        }
      ];
    } else if (this.nodedata.organizeType == "车间") {
      option = [
        {
          value: 3,
          label: "部门"
        },
        {
          value: 5,
          label: "产线"
        }
      ];
    } else if (this.nodedata.organizeType == "产线") {
      option = [
        {
          value: 3,
          label: "部门"
        },
        {
          value: 4,
          label: "车间"
        }
      ]
    }*/
    console.log(this.nodedata);
    return {
      show: true,
      type: "",
      // pcode:this.nodedata,
      options:{},
      // options: [
      //   {
      //     value: 1,
      //     label: "公司"
      //   },
      //   {
      //     value: 2,
      //     label: "工厂"
      //   },
      //   {
      //     value: 3,
      //     label: "部门"
      //   },
      //   {
      //     value: 4,
      //     label: "车间"
      //   },
      //   {
      //     value: 5,
      //     label: "产线"
      //   }
      // ],
      value: "",
      orgname: "",
      orgInfo: ""
    };
  },
  created:function(){
    this.optionSet();
  },
  watch: {
    nodedata() {
      this.optionSet();
    }
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
      this.orgname = "";
      this.value = "";
      this.orgInfo = "";
      this.$emit("addHide", false);
    },
    add() {
      //添加组织机构
      let qs = require("qs");
      let data = qs.stringify({
        parentCode: this.nodedata.code,
        name: this.orgname,
        organizeType: this.value,
        organizeInfo: this.orgInfo
      });
      console.log(this.nodedata);
      this.Axios(
        {
          url: "/organize/add",
          params: data,
          type: "post"
          // option: {
          //   enableMsg: false
          // }
        },
        this
      )
        //.post(this.global.apiSrc + "/organize/add", data)
        .then(result => {
          if (result.data.code === 200) {
            console.log(result.data);
            this.orgname = "";
            this.value = "";
            this.orgInfo = "";
            this.reload();
          } else {
            this.$message("添加失败");
            console.log(result.data);
          }
        })
        .catch(err => {
          console.log(err);
          console.log(this.userName);
        });
    },
    optionSet(){
      let option=[]
      if (this.nodedata.organizeType=="企业") {
        option=[
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
          },
          {
            value: 5,
            label: "产线"
          }
        ]
      }else if (this.nodedata.organizeType=="公司") {
        option=[
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
          },
          {
            value: 5,
            label: "产线"
          }
        ]
      }else if (this.nodedata.organizeType=="工厂") {
        option=[
          {
            value: 3,
            label: "部门"
          },
          {
            value: 4,
            label: "车间"
          },
          {
            value: 5,
            label: "产线"
          }
        ]
      }else if (this.nodedata.organizeType=="部门") {
        option=[
          {
            value: 4,
            label: "车间"
          },
          {
            value: 5,
            label: "产线"
          }
        ]
      }else if (this.nodedata.organizeType=="车间") {
        option=[
          {
            value: 3,
            label: "部门"
          },
          {
            value: 5,
            label: "产线"
          }
        ]
      }else if (this.nodedata.organizeType=="产线") {
        option=[
          {
            value: 3,
            label: "部门"
          },
          {
            value: 4,
            label: "车间"
          }
        ]
      }
      this.options=option;
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
  // width: 100vw;
  // height: 100vh;

  // background-color: rgba(0, 0, 0, 0.103);
  // position: absolute;
  // top: 0%;
  // left: 0%;
  //   margin-left: -150px;
  //   margin-top: -150px;
  .addcase {
    width: 500px;

    // position: relative;
    // top: 50%;
    // left: 50%;
    // margin-top: -150px;
    // margin-left: -150px;
    // background-color: white;
    padding: 15px;
    // border-radius: 5px;
    // box-shadow: 4px 5px 10px @Info;
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
