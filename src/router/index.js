import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import MenuList from '@/components/menu_list/menu_list'
import Personal from '@/components/personal/personal'
import PersonalInfo from '@/components/personal_info/personal_info'
import menuDetail from '@/components/menu_detail/menu_detail'
import MenuVote from '@/components/menu_vote/menu_vote'
import Login from '@/components/login/login'
import Register from '@/components/register/register'
import addDish from '@/components/add_dish/add_dish'
import collectDish from '@/components/collect_dish/collect_dish'
import Chat from '@/components/chat/chat'
import typeDish from '@/components/type_dish/type_dish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/menu_list',
      name: 'MenuList',
      component: MenuList
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/personal_info',
      name: 'PersonalInfo',
      component: PersonalInfo
    },
    {
      path: '/menu_detail',
      name: 'menuDetail',
      component: menuDetail
    },
    {
      path: '/menu_vote',
      name: 'MenuVote',
      component: MenuVote
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/add_dish',
      name: 'addDish',
      component: addDish
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/collect_dish',
      name: 'collectDish',
      component: collectDish
    },
    {
      path: '/type_dish',
      name: 'typeDish',
      component: typeDish
    }
  ]
})
