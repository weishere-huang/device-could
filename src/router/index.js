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
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
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
      component: Equipment,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Monit/:deviceId',
      name: 'MonitSingle',
      component: MonitSingle,
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
    },
    {
      path: '/Oee',
      name: 'Oee',
      component: Oee,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/EquipmentAdd',
      name: 'EquipmentAdd',
      component: EquipmentAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/UpkeepAmend',
      name: 'UpkeepAmend',
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
      component: Upkeep,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/UpkeepAdd',
      name: 'UpkeepAdd',
      component: UpkeepAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/TurnaroundPlansAdd',
      name: 'TurnaroundPlansAdd',
      component: TurnaroundPlansAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/TurnaroundPlansAmend',
      name: 'TurnaroundPlansAmend',
      component: TurnaroundPlansAmend,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/BreakDetails',
      name: 'BreakDetails',
      component: BreakDetails,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Breakdown',
      name: 'Breakdown',
      component: Breakdown,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/TurnaroundPlans',
      name: 'TurnaroundPlans',
      component: TurnaroundPlans,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Organization',
      name: 'Organization',
      component: Organization,
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
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/PersnnelAdd',
      name: 'PersnnelAdd',
      component: PersnnelAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/Modification',
      name: 'Modification',
      component: Modification,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/User',
      name: 'User',
      component: User,
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
      component: WorkOrder,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/BreakdownOrder',
      name: 'BreakdownOrder',
      component: BreakdownOrder,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/UpkeepAndTurnaroundPlans',
      name: 'UpkeepAndTurnaroundPlans',
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
      component: SparePart,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePartAdd',
      name: 'SparePartAdd',
      component: SparePartAdd,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePartAmend',
      name: 'SparePartAmend',
      component: SparePartAmend,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePartsWarehouse',
      name: 'SparePartsWarehouse',
      component: SparePartsWarehouse,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/WarehousingDetail',
      name: 'WarehousingDetail',
      component: WarehousingDetail,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/OutboundDetails',
      name: 'OutboundDetails',
      component: OutboundDetails,
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/SparePartsClassification',
      name: 'SparePartsClassification',
      component: SparePartsClassification,
      meta: {
        requireAuth: true
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断是否需要登录权限
    if (sessionStorage.getItem('token')) { // 判断是否登录
      next()
    } else if (sessionStorage.getItem('token') === "") { // 没登录则跳转到登录界面
      next({
        path: '/',
        query: {
          // redirect: "/Login"
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
