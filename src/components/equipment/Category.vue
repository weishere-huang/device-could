<template>
    <div class="category">
        <div>
            <el-tree :data="data5" show-checkbox="" node-key="id" default-expand-all :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="text" size="mini" @click="() => append(data)">
                            Append
                        </el-button>
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                            Delete
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
    </div>
</template>
<script>
let id = 1000;
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ];
    return {
      data5: JSON.parse(JSON.stringify(data))

    };
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    allOrganize() {
      this.axios
      //axios
        .get(this.global.apiSrc+"/organize/allOrganize/321")
       // .get("api/organize/allOrganize/321")
        .then(result => {
          console.log("查询所有组织机构");
          console.log(result.data.data);
          this.data = this.filterArray(result.data.data,1000);
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
          temp = this.filterArray(data, data[i].id);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    },
  },
  created(){
    this.allOrganize()
  }
};
</script>
<style lang="less" scoped>
</style>
