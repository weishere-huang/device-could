//主要为全部菜单结构和权限的配置，visible=true不在菜单显示，defaultDock=true会跳过lookUp权限默认在菜单显示
//permissionCode为权限映射码，若permissionCode未对应到用户权限则不显示也无跳转访问权限
//route和routeReg为匹配路由，二者必须有一个，若都有则为“或”逻辑
export default [{
  menu: '工作台',
  permissionCode: 'workDock_lookUp',
  defaultDock: true,
  icon: '&#xe606;',
  subMenu: [{
    menu: '默认工作台',
    route: '/Home',
    permissionCode: 'Home'
  }]
},
  {
    menu: '企业管理',
    permissionCode: 'enterprise',
    icon: '&#xe600;',
    subMenu: [{
      menu: '企业管理',
      route: '/Company',
      permissionCode: 'enterprise_lookup'
    }]
  },
  {
    menu: '组织机构',
    permissionCode: 'organization',
    icon: '&#xe62e;',
    subMenu: [{
      menu: '组织机构',
      route: '/Organization',
      permissionCode: 'organize_lookup'
    }]
  },
  {
    menu: '员工管理',
    permissionCode: 'personnel"',
    icon: '&#xe68d;',
    subMenu: [{
      menu: '员工管理',
      route: '/Personnel',
      permissionCode: 'employee_lookup'
    },
      {
        menu: '员工详情',
        routeReg: /^\/Personnel\/Modification\/\d{1,}$/i,
        visible: true,
        permissionCode: 'employee_modification_lookup'
      },
      {
        menu: '添加员工',
        route: "/Personnel/PersnnelAdd",
        visible: true,
        permissionCode: 'employee_add_lookup'
      }
    ]
  },
  {
    menu: '设备管理',
    permissionCode: 'device',
    icon: '&#xe61c;',
    subMenu: [{
      menu: '设备管理',
      route: "/Equipment",
      permissionCode: 'device_lookup'
    },
      {
        menu: '类别管理',
        route: "/Category",
        permissionCode: 'deviceCate_lookup'
      },
      {
        menu:'设备添加',
        route:"/Equipment/EquipmentAdd",
        visible: true,
        permissionCode:"device_add_lookup",
      },
      {
        menu: '设备详情',
        routeReg: /^\/Equipment\/Redact\/\d{1,}$/i,
        visible: true,
        permissionCode: 'device_redact_lookup'
      },
    ]
  },
  {
    menu: '设备监控',
    permissionCode: 'monit',
    icon: '&#xe6a0;',
    subMenu: [{
      menu: '设备实时状态',
      route: "/Monit",
      permissionCode: 'device_state_lookup'
    },
      {
        menu: '设备运行日志',
        routeReg: /^\/Monit\/\d{1,}$/i,
        visible: true,
        permissionCode: 'device_state_lookup'
      },
      {
        menu: '设备OEE分析',
        route: "/Oee",
        permissionCode: 'device_OEE_lookup'
      },
      {
        menu: 'OEE任务新增',
        route: "/Oee/Add",
        visible: true,
        permissionCode: 'device_OEE_add_lookup'
      },
      {
        menu: 'OEE任务详情',
        routeReg: /^\/Oee\/Details\/\d{1,}$/i,
        visible: true,
        permissionCode: 'device_OEE_edit_lookup'
      },
      {
        menu: 'OEE任务结束',
        routeReg: /^\/Oee\/End\/\d{1,}$/i,
        visible: true,
        permissionCode: 'device_OEE_termination_lookup'
      },
      {
        menu: 'OEE任务结束',
        visible: true,
        routeReg: /^\/Oee\/Details\/\d{1,}\/end$/i,
        permissionCode: 'device_OEE_termination_lookup'
      }
    ]
  },
  {
    menu: '运维管理',
    permissionCode: 'ops',
    icon: '&#xe73a;',
    subMenu: [{
      menu: '设备故障',
      route: "/Breakdown",
      permissionCode: 'operation_fault_lookup',
      },
      {
        menu: '设备故障详情',
        routeReg: /^\/Breakdown\/BreakDetails\/\d{1,}$/i,
        visible: true,
        permissionCode: 'fault_detail_lookup'
      },
      {
        menu: '检修计划',
        route: "/TurnaroundPlans",
        permissionCode: 'overhaul_lookup'
      },
      {
        menu: '添加检修计划',
        route: "/TurnaroundPlans/TurnaroundPlansAdd",
        visible: true,
        permissionCode: 'overhaul_add_lookup'
      },
      {
        menu: '检修计划详情',
        routeReg: /^\/TurnaroundPlans\/TurnaroundPlansAmend\/\d{1,}$/i,
        visible: true,
        permissionCode: 'overhaul_detail_lookup'
      },
      {
        menu: '保养计划',
        route: "/Upkeep",
        permissionCode: 'maintain_lookup'
      },
      {
        menu: '添加保养计划',
        route: "/Upkeep/UpkeepAdd",
        visible: true,
        permissionCode: 'maintain_add_lookup'
      },
      {
        menu: '保养计划详情',
        routeReg: /^\/Upkeep\/UpkeepAmend\/\d{1,}$/i,
        visible: true,
        permissionCode: 'maintain_detail_lookup'
      },
    ]
  },
  {
    menu: '备品备件',
    permissionCode: 'partInfo',
    icon: '&#xe690;',
    subMenu: [{
      menu: '备件基础信息',
      route: "/SparePart",
      permissionCode: 'partInfo_lookup'
    },
      {
        menu: '备品备件添加',
        route: "/SparePart/SparePartAdd",
        permissionCode: 'partInfo_add_lookup',
        visible: true,
      },
      {
        menu: '备件备件修改',
        routeReg: /^\/SparePart\/SparePartAmend\/\d{1,}$/i,
        permissionCode: 'partInfo_detail_lookup',
        visible: true,
      },
      {
        menu: '备件分类',
        route: "/SparePartsClassification",
        permissionCode: 'partCate_lookup'
      },
      {
        menu: '备件入库',
        route: "/SparePartsWarehouse",
        permissionCode: 'partWarehouse_lookup'
      },
      {
        menu: '入库明细',
        route: "/WarehousingDetail",
        permissionCode: 'partWarehouseInfo_lookup'
      }
    ]
  },
  {
    menu: '工单系统',
    permissionCode: 'work_list_lookup',
    icon: '&#xe60b;',
    subMenu: [{
      menu: '工单列表',
      route: "/WorkOrder",
      permissionCode: 'work_list_lookup'
    },
      {
        menu: '故障工单详情',
        routeReg: /^\/WorkOrder\/BreakdownOrder\/\d{1,}$/i,
        visible: true,
        permissionCode: 'work_list_detail_lookup'
      },
      {
        menu: '检修保养工单详情',
        routeReg: /^\/WorkOrder\/UpkeepAndTurnaroundPlans\/\d{1,}$/i,
        visible: true,
        permissionCode: 'work_list_detail_lookup'
      }
    ]
  },
  {
    menu: '消息管理',
    permissionCode: 'msg',
    icon: '&#xe627;',
    defaultDock: true,
    subMenu: [{
      menu: '消息管理',
      route: "/Message",
      permissionCode: 'message_lookup'
    }]
  },
  {
    menu: '角色管理',
    permissionCode: 'role',
    icon: '&#xe630;',
    defaultDock: true,
    subMenu: [{
      menu: '角色管理',
      route: "/RoleManagement",
      permissionCode: 'role_lookup'
    }]
  },
  {
    menu: '系统管理',
    permissionCode: 'sys',
    icon: '&#xe60a;',
    subMenu: [{
      menu: '用户管理',
      route: "/User",
      permissionCode: 'system_user_lookup'
    }]
  }
]
