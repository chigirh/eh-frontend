import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/organisms/common/LoginView.vue'
import Home from '@/components/organisms/common/HomeView.vue'

import AddUser from '@/components/organisms/mgr/AddUserView.vue'

import AddSchedule from '@/components/organisms/schedule/AddSchedule.vue'
import ListSchedule from '@/components/organisms/schedule/ListScheduleView.vue'
import { authorizeToken } from './guards'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // mgr
  {
    path: '/mgr/add-user',
    name: 'AddUser',
    component: AddUser
  },
  // schedule
  {
    path: '/schedule/regist',
    name: 'AddSchedule',
    component: AddSchedule
  },
  {
    path: '/schedule/list',
    name: 'ListSchedule',
    component: ListSchedule
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(authorizeToken)

export default router