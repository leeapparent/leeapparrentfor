import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesCreate from '../views/categoriesCreate.vue'
import CategoriesList from '../views/categoriesList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/categories/create',component: CategoriesCreate},
      {path:'/categories/list',component: CategoriesList},
      {path:'/categories/edit/:id',component: CategoriesCreate, props: true},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
