<template>
  <div class="spare-parts-warehouse">
    <div class="top">
      <el-button size="small">保存</el-button>
    </div>
    <div class="warehouse">
      <h1>备件入库</h1>
      <div>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          label-width="100px"
        >
          <el-form-item
            label="入库单号："
            style="margin-bottom:0px;"
          >
            <el-input
              v-model="formInline.user"
              placeholder=""
              size="small"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="入库日期："
            style="margin-bottom:0px;"
          >
            <el-input
              v-model="formInline.time"
              placeholder=""
              size="small"
              style="width:200px"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-list">
        <div class="spare-parts-table">
          <el-form label-width="85px">
            <el-form-item
              label="备件分类："
              style="margin-bottom:0px;"
            >
            </el-form-item>
          </el-form>
          <el-cascader
            placeholder=""
            :options="ctgoptions"
            filterable
            ref="getName2"
            expand-trigger="hover"
            :props="defaultProps2"
            change-on-select
            :show-all-levels="false"
            v-model="formInline.user"
            @change="handleChange2"
            style="width:100%;"
            size="small"
          ></el-cascader>
          <el-input
            placeholder="输入编号、名称、型号规格"
            class="input-with-select"
            size="small"
            style="margin-top:10px"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
          <div>
              
          </div>
        </div>
        <div style="float:left;font-size:20px">
          →
        </div>
        <div class="inventory-list">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        time: new Date().toLocaleDateString()
      },
      ctgoptions: [],
      defaultProps2: {
        value: "categoryNo",
        label: "categoryName"
      }
    };
  },
  methods: {
    handleChange2(value) {
      let name = this.$refs["getName2"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      console.log(id, name);
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
.spare-parts-warehouse {
  font-size: 12px;
  .top {
    border: @border;
    border-radius: 5px;
    padding: 10px;
  }
  .warehouse {
    border: @border;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    padding: 10px;
    h1 {
      text-align: center;
      letter-spacing: 6px;
    }
    .table-list {
      overflow: hidden;
      margin-top: 20px;
      .spare-parts-table {
        width: 30%;
        border: @border;
        float: left;
      }
      .inventory-list {
        width: 68%;
        border: @border;
        float: left;
      }
    }
  }
}
</style>
