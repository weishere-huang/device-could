<template>
    <div>
        工单管理
    </div>
</template>
<script >
  export default {
    data() {
      return {
        list : [{
          "id": 43,
          "menu_name": "测试任务",
          "menu_href": "6",
          "menu_icon": "el-icon-lx-edit",
          "tree_sort": 600,
          "tree_level": 1,
          "is_show": 1,
          "status": 0,
          "remarks": "",
          "parent": null
        },
          {
            "id": 44,
            "menu_name": "待领样",
            "menu_href": "waitGetSamples",
            "menu_icon": "",
            "tree_sort": 610,
            "tree_level": 2,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": 43
          },
          {
            "id": 45,
            "menu_name": "待测试",
            "menu_href": "waitTest",
            "menu_icon": "",
            "tree_sort": 620,
            "tree_level": 2,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": 43
          },
          {
            "id": 46,
            "menu_name": "测试中",
            "menu_href": "testInProcess",
            "menu_icon": "",
            "tree_sort": 630,
            "tree_level": 2,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": 43
          },
          {
            "id": 47,
            "menu_name": "数据审核",
            "menu_href": "7",
            "menu_icon": "el-icon-lx-punch",
            "tree_sort": 700,
            "tree_level": 1,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": null
          },
          {
            "id": 48,
            "menu_name": "数据审理",
            "menu_href": "dataAuditing",
            "menu_icon": "",
            "tree_sort": 710,
            "tree_level": 2,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": 47
          },
          {
            "id": 49,
            "menu_name": "异常处理",
            "menu_href": "exceptionHandling",
            "menu_icon": "",
            "tree_sort": 720,
            "tree_level": 2,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": 47
          },
          {
            "id": 50,
            "menu_name": "样品异常",
            "menu_href": "SamplesAbnormal",
            "menu_icon": "",
            "tree_sort": 721,
            "tree_level": 3,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": 49
          },
          {
            "id": 51,
            "menu_name": "测试数据异常",
            "menu_href": "testDataException",
            "menu_icon": "",
            "tree_sort": 722,
            "tree_level": 3,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": 49
          },
          {
            "id": 52,
            "menu_name": "设备异常处理",
            "menu_href": "deviceExceptionHandling",
            "menu_icon": "",
            "tree_sort": 723,
            "tree_level": 3,
            "is_show": 1,
            "status": 0,
            "remarks": "",
            "parent": 49
          }
        ]

      };
    },
    methods:{
      filterArray(data, parent) {
     let vm = this;
     var tree = [];
     var temp;
     for (var i = 0; i < data.length; i++) {
      if (data[i].parent == parent) {
        var obj = data[i];
        temp = filterArray(data, data[i].id);
        if (temp.length > 0) {
          obj.subs = temp;
        }
        tree.push(obj);
      }
    }
    console.log(tree);
    return tree;
  },
      created() {
        alert("1")
        let data=this.list;
          this.filterArray(data,data.id);
    }
  }
  };
</script>
