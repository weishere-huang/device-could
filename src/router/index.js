import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import ForgetThePassword from '@/components/login/ForgetThePassword'
import Home from '@/components/home/Home'
import Information from '@/components/information/Information'
import Company from '@/components/company/Company'
import BusinessDetails from '@/components/company/BusinessDetails'
import Equipment from '@/components/equipment/Equipment'
import Monit from '@/components/monit'
import MonitSingle from '@/components/monit/single'
import Oee from '@/components/oee/'
import OeeDetails from '@/components/oee/details'
import OeeAdd from '@/components/oee/add'
import OeeEnd from '@/components/oee/end'
import Category from '@/components/equipment/Category'
import EquipmentAdd from '@/components/equipment/EquipmentAdd'
import Redact from '@/components/equipment/Redact'
import Operation from '@/components/operation/Operation'
import Upkeep from '@/components/operation/upkeep/Upkeep'
import AmendPlan from '@/components/operation/upkeep/AmendPlan'
import UpkeepAdd from '@/components/operation/upkeep/UpkeepAdd'
import UpkeepAmend from '@/components/operation/upkeep/UpkeepAmend'
import TurnaroundPlansAdd from '@/components/operation/turnaroundPlans/TurnaroundPlansAdd'
import TurnaroundPlansAmend from '@/components/operation/turnaroundPlans/TurnaroundPlansAmend'
import Breakdown from '@/components/operation/Breakdown'
import TurnaroundPlans from '@/components/operation/TurnaroundPlans'
import BreakDetails from '@/components/operation/BreakDetails'
import Organization from '@/components/organization/Organization'
import Add from '@/components/organization/Add'
import Personnel from '@/components/personnel/Personnel'
import PersnnelAdd from '@/components/personnel/PersnnelAdd'
import Modification from '@/components/personnel/Modification'
import User from '@/components/user/User'
import EquipmentArchives from '@/components/equipmentArchives/EquipmentArchives'
import WorkOrder from '@/components/workOrder/WorkOrder'
import BreakdownOrder from '@/components/workOrder/breakdownDetails/BreakdownOrder'
import UpkeepAndTurnaroundPlans from '@/components/workOrder/upkeepAndTurnaroundPlans/UpkeepAndTurnaroundPlans'
import KnowledgeBase from '@/components/knowledgeBase/KnowledgeBase'
import Message from '@/components/message/Message'
import System from '@/components/system/System'
import RoleManagement from '@/components/roleManagement/RoleManagement'
import AdvancedSearch from '@/components/company/AdvancedSearch'
import Audit from '@/components/company/Audit'
import MsgDetails from '@/components/message/MsgDetails'
import SparePart from '@/components/sparePart/SparePart'
import SparePartsWarehouse from '@/components/sparePart/SparePartsWarehouse'
import SparePartAdd from '@/components/sparePart/addAndAmend/SparePartAdd'
import SparePartAmend from '@/components/sparePart/addAndAmend/SparePartAmend'
import WarehousingDetail from '@/components/sparePart/WarehousingDetail'
import OutboundDetails from '@/components/sparePart/OutboundDetails'
import SparePartsClassification from '@/components/sparePart/SparePartsClassification'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/Login',
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false
      },
      children: [
        {
          path: '/Reginster',
          name: 'Reginster',
          meta: {
            requireAuth: false
          },
          component: resolve => require(['@/components/login/Reginster'], resolve)
        }
      ]
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      props: {
        pageName: '默认工作台'
      },
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/ForgetThePassword',
      name: 'ForgetThePassword',
      component: ForgetThePassword,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Company',
      name: 'Company',
      props: {
        pageName: '企业管理'
      },
      component: Company,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Audit',
      name: 'Audit',
      component: Audit,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/AdvancedSearch',
      name: 'AdvancedSearch',
      component: AdvancedSearch,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Category',
      name: 'Category',
      props: {
        pageName: '设备分类'
      },
      component: Category,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/BusinessDetails',
      name: 'BusinessDetails',
      component: BusinessDetails,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Equipment',
      name: 'Equipment',
      props: {
        pageName: '设备列表'
      },
      component: Equipment,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Monit',
      name: 'Monit',
      component: Monit,
      meta: {
        requireAuth: true
      },
      props: {
        pageName: '设备监控'
      },
      children: [{
        path: ':deviceId',
        name: 'MonitSingle',
        component: MonitSingle,
        meta: {
          requireAuth: true
        },
        props: {
          pageName: '设备详细数据'
        }
      }]
    },
    {
      path: '/Oee',
      name: 'Oee',
      component: Oee,
      meta: {
        requireAuth: true
      },
      props: {
        pageName: 'OEE'
      },
      children: [{
          path: 'End/:equId',
          name: 'OeeEnd',
          component: OeeEnd,
          meta: {
            requireAuth: true
          },
          props: {
            pageName: '任务结束'
          }
        },
        {
          path: 'Add',
          name: 'OeeAdd',
          component: OeeAdd,
          meta: {
            requireAuth: true
          },
          props: {
            pageName: '任务新增'
          }
        },
        {
          path: 'Details/:equId',
          name: 'OeeDetails',
          component: OeeDetails,
          meta: {
            requireAuth: true
          },
          props: {
            pageName: '任务详情'
          },
          children: [{
            path: 'End',
            name: 'OeeEnd2',
            component: OeeEnd,
            meta: {
              requireAuth: true
            },
            props: {
              pageName: '任务结束'
            }
          }]
        }
      ]
    },
    {
      path: '/EquipmentAdd',
      name: 'EquipmentAdd',
      props: {
        pageName: '设备添加'
      },
      component: EquipmentAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/UpkeepAmend/:id/',
      name: 'UpkeepAmend',
      props: {
        pageName: '保养计划修改'
      },
      component: UpkeepAmend,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/AmendPlan',
      name: 'AmendPlan',
      component: AmendPlan,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Redact/:id/',
      name: 'Redact',
      component: Redact,
      props: {
        pageName: '设备详情'
      },
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Operation',
      name: 'Operation',
      component: Operation,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Upkeep',
      name: 'Upkeep',
      props: {
        pageName: '保养计划列表'
      },
      component: Upkeep,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/UpkeepAdd',
      name: 'UpkeepAdd',
      props: {
        pageName: '新增保养计划'
      },
      component: UpkeepAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/TurnaroundPlansAdd',
      name: 'TurnaroundPlansAdd',
      props: {
        pageName: '新增检修计划'
      },
      component: TurnaroundPlansAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/TurnaroundPlansAmend/:id/',
      name: 'TurnaroundPlansAmend',
      props: {
        pageName: '检修计划修改'
      },
      component: TurnaroundPlansAmend,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/BreakDetails/:id/',
      name: 'BreakDetails',
      props: {
        pageName: '故障详情'
      },
      component: BreakDetails,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Breakdown',
      name: 'Breakdown',
      props: {
        pageName: '设备故障列表'
      },
      component: Breakdown,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/TurnaroundPlans',
      name: 'TurnaroundPlans',
      props: {
        pageName: '检修计划列表'
      },
      component: TurnaroundPlans,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Organization',
      name: 'Organization',
      component: Organization,
      props: {
        pageName: '组织机构'
      },
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Add',
      name: 'Add',
      component: Add,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Personnel',
      name: 'Personnel',
      component: Personnel,
      props: {
        pageName: '员工管理'
      },
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/PersnnelAdd',
      name: 'PersnnelAdd',
      props: {
        pageName: '员工添加'
      },
      component: PersnnelAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Modification/:id/',
      name: 'Modification',
      props: {
        pageName: '员工修改'
      },
      component: Modification,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/User',
      name: 'User',
      component: User,
      props: {
        pageName: '用户管理'
      },
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/EquipmentArchives',
      name: 'EquipmentArchives',
      component: EquipmentArchives,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/WorkOrder',
      name: 'WorkOrder',
      props: {
        pageName: '工单列表'
      },
      component: WorkOrder,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/BreakdownOrder/:id/',
      name: 'BreakdownOrder',
      props: {
        pageName: '故障工单详情'
      },
      component: BreakdownOrder,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/UpkeepAndTurnaroundPlans/:id/',
      name: 'UpkeepAndTurnaroundPlans',
      props: {
        pageName: '检修&保养计划工单详情'
      },
      component: UpkeepAndTurnaroundPlans,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/KnowledgeBase',
      name: 'KnowledgeBase',
      component: KnowledgeBase,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Message',
      name: 'Message',
      props: {
        pageName: '消息列表'
      },
      component: Message,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/MsgDetails',
      name: 'MsgDetails',
      component: MsgDetails,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/RoleManagement',
      name: 'RoleManagement',
      props: {
        pageName: '角色管理'
      },
      component: RoleManagement,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/System',
      name: 'System',
      component: System,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePart',
      name: 'SparePart',
      props: {
        pageName: '备品备件列表'
      },
      component: SparePart,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePartAdd',
      name: 'SparePartAdd',
      props: {
        pageName: '备品备件添加'
      },
      component: SparePartAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePartAmend/:id/',
      name: 'SparePartAmend',
      props: {
        pageName: '备品备件详情页'
      },
      component: SparePartAmend,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePartsWarehouse',
      name: 'SparePartsWarehouse',
      props: {
        pageName: '备件入库'
      },
      component: SparePartsWarehouse,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/WarehousingDetail',
      name: 'WarehousingDetail',
      props: {
        pageName: '入库明细'
      },
      component: WarehousingDetail,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/OutboundDetails',
      name: 'OutboundDetails',
      props: {
        pageName: '出库明细'
      },
      component: OutboundDetails,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePartsClassification',
      name: 'SparePartsClassification',
      props: {
        pageName: '备件分类'
      },
      component: SparePartsClassification,
      meta: {
        requireAuth: true
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('token')
  if (to.meta.requireAuth) { // 判断是否需要登录权限
    if (isLogin) { // 判断是否登录
      next()
    } else  { // 没登录则跳转到登录界面
      next({
        path: '/Login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
  // if (to.path === '/Login') {
  //   next();
  // } else {
  //   let token = sessionStorage.getItem('token');

  //   if (token === 'null' || token === '') {
  //     next('/Login');
  //   } else {
  //     next();
  //   }
  // }
});
export default router
