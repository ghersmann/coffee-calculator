import { createRouter, createWebHistory } from 'vue-router'

import CoffeeCalculator from '@/components/CoffeeCalculator.vue';
import RecipeList from '@/components/RecipeList.vue'
import MainView from '@/views/MainView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    }
  ]
})

export default router
