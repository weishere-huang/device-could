import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Information from '@/components/information/Information'
import Company from '@/components/company/Company'
import Equipment from '@/components/equipment/Equipment'
import Operation from '@/components/operation/Operation'
import TurnaroundPlans from '@/components/operation/TurnaroundPlans'
import Organization from '@/components/organization/Organization'
import Personnel from '@/components/personnel/Personnel'
import PersnnelAdd from '@/components/personnel/PersnnelAdd'
import User from '@/components/user/User'
import EquipmentArchives from '@/components/equipmentArchives/EquipmentArchives'
import WorkOrder from '@/components/workOrder/WorkOrder'
import KnowledgeBase from '@/components/knowledgeBase/KnowledgeBase'
import Message from '@/components/message/Message'
import System from '@/components/system/System'
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
      path: '/Equipment',
      name: 'Equipment',
      component: Equipment
    },
    {
      path: '/Operation',
      name: 'Operation',
      component: Operation
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
      path: '/System',
      name: 'System',
      component: System
    }
  ]
})
