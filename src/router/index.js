import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import ForgetThePassword from '@/components/login/ForgetThePassword'
import Home from '@/components/home/Home'
import Information from '@/components/information/Information'
import Company from '@/components/company/Company'
import BusinessDetails from '@/components/company/BusinessDetails'
import Equipment from '@/components/equipment/Equipment'
import Category from '@/components/equipment/Category'
import EquipmentAdd from '@/components/equipment/EquipmentAdd'
import Redact from '@/components/equipment/Redact'
import Operation from '@/components/operation/Operation'
import TurnaroundPlansAdd from '@/components/operation/turnaroundPlans/TurnaroundPlansAdd'
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
import KnowledgeBase from '@/components/knowledgeBase/KnowledgeBase'
import Message from '@/components/message/Message'
import System from '@/components/system/System'
import RoleManagement from '@/components/roleManagement/RoleManagement'
import AdvancedSearch from '@/components/company/AdvancedSearch'
import Audit from '@/components/company/Audit'
import MsgDetails from '@/components/message/MsgDetails'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ForgetThePassword',
      name: 'ForgetThePassword',
      component: ForgetThePassword
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information
    },
    {
      path: '/Company',
      name: 'Company',
      component: Company
    },
    {
      path: '/Audit',
      name: 'Audit',
      component: Audit
    },
     {
       path: '/AdvancedSearch',
       name: 'AdvancedSearch',
       component: AdvancedSearch
    },
    {
      path: '/Category',
      name: 'Category',
      component: Category
    },
    {
      path: '/BusinessDetails',
      name: 'BusinessDetails',
      component: BusinessDetails
    },
    {
      path: '/Equipment',
      name: 'Equipment',
      component: Equipment
    },
    {
      path: '/EquipmentAdd',
      name: 'EquipmentAdd',
      component: EquipmentAdd
    },
    {
      path: '/Redact',
      name: 'Redact',
      component: Redact
    },
    {
      path: '/Operation',
      name: 'Operation',
      component: Operation
    },
    {
      path: '/TurnaroundPlansAdd',
      name: 'TurnaroundPlansAdd',
      component: TurnaroundPlansAdd
    },
    {
      path: '/BreakDetails',
      name: 'BreakDetails',
      component: BreakDetails
    },
    {
      path: '/Breakdown',
      name: 'Breakdown',
      component: Breakdown
    },
    {
      path: '/TurnaroundPlans',
      name: 'TurnaroundPlans',
      component: TurnaroundPlans
    },
    {
      path: '/Organization',
      name: 'Organization',
      component: Organization
    },
    {
      path: '/Add',
      name: 'Add',
      component: Add
    },
    {
      path: '/Personnel',
      name: 'Personnel',
      component: Personnel
    },
    {
      path: '/PersnnelAdd',
      name: 'PersnnelAdd',
      component: PersnnelAdd
    },
    {
      path: '/Modification',
      name: 'Modification',
      component: Modification
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/EquipmentArchives',
      name: 'EquipmentArchives',
      component: EquipmentArchives
    },
    {
      path: '/WorkOrder',
      name: 'WorkOrder',
      component: WorkOrder
    },
    {
      path: '/KnowledgeBase',
      name: 'KnowledgeBase',
      component: KnowledgeBase
    },
    {
      path: '/Message',
      name: 'Message',
      component: Message
    },
    {
      path: '/MsgDetails',
      name: 'MsgDetails',
      component: MsgDetails
    },
    {
      path: '/RoleManagement',
      name: 'RoleManagement',
      component: RoleManagement
    },
    {
      path: '/System',
      name: 'System',
      component: System
    }
  ]
})
