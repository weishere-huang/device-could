<template>
  <el-cascader
    size="small"
    placeholder="请选择"
    :options="options"
    :props="defaultProps"
    expand-trigger="hover"
    filterable
    ref="getName"
    change-on-select
    :show-all-levels="false"
    title=""
    @change="handleChange"
    style=""
  ></el-cascader>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      defaultProps: {
        value: "code",
        label: "name"
      }
    };
  },
  props: {
    changeValue: {
       
    }
    // handleChange:{},
    // style:{},
    // getName:{}
  },
  methods: {
    handleChange(value) {
      let name = this.$refs["getName"].currentLabels;
      name = name[name.length - 1];
      let id = value[value.length - 1];
      let params={
            organizeCode:id,
            organizationName:name
      };
      this.$props.changeValue(params)
    },
    organize() {
      this.Axios(
        {
          params: {},
          type: "get",
          url: "/organize/allOrganize",
          option: { enableMsg: false }
        },
        this
      ).then(
        response => {
          console.log(response);
          let code = Math.min.apply(
            null,
            response.data.data.map(item => {
              return item.code;
            })
          );
          this.options = this.filterArray(response.data.data, code);
        },
        ({ type, info }) => {}
      );
    },
    filterArray(data, parent) {
      //编辑组织机构数据为树状结构方法
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
    }
  },
  created() {
    this.organize();
  }
};
</script>
