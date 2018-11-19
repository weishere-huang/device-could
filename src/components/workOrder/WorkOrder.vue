<template>
    <div>
        工单管理
    </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      nodes: [
        { id: 1, pId: 0, name: "父节点1 - 展开", open: true },
        { id: 11, pId: 1, name: "父节点11 - 折叠" },
        { id: 12, pId: 1, name: "父节点12 - 折叠" },
        { id: 13, pId: 1, name: "父节点13 - 没有子节点" },
        { id: 2, pId: 0, name: "父节点2 - 折叠" },
        { id: 21, pId: 2, name: "父节点21 - 展开", open: true },
        { id: 22, pId: 2, name: "父节点22 - 折叠" },
        { id: 23, pId: 2, name: "父节点23 - 折叠" },
        { id: 3, pId: 0, name: "父节点3 - 没有子节点" }
      ]
    };
  },
  methods: {
    getTree(data, root, idTxt, pidTxt, pushTxt) {
      var idTxt = idTxt || "id";
      var pidTxt = pidTxt || "pid";
      var pushTxt = pushTxt || "children";
      // 递归方法
      function getNode(id) {
        var node = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i][pidTxt] == id) {
            data[i][pushTxt] = getNode(data[i][idTxt]);
            node.push(data[i]);
          }
        }
        if (node.length == 0) {
          return;
        } else {
          return node;
        }
      }
      // 使用根节点
      return getNode(root);
    }
  }
};
</script>


