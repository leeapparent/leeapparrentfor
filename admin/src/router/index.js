import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesCreate from '../views/categoriesCreate.vue'
import CategoriesList from '../views/categoriesList.vue'

import itemsList from '../views/itemsList.vue'
import itemsCreate from '../views/itemsCreate.vue'

import HeroList from '../views/HeroList'
import HeroCreate from '../views/HeroCreate '
import ArticlesList from '../views/articlesList'
import ArticlesCreate from '../views/articlesCreate '

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

      
      {path:'/items/create',component: itemsCreate},
      {path:'/items/list',component: itemsList},
      {path:'/items/edit/:id',component: itemsCreate, props: true},

       
      {path:'/heros/create',component: HeroCreate},
      {path:'/heros/list',component: HeroList},
      {path:'/heros/edit/:id',component: HeroCreate, props: true},


         
      {path:'/articles/create',component: ArticlesCreate},
      {path:'/articles/list',component: ArticlesList},
      {path:'/articles/edit/:id',component: ArticlesCreate, props: true},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
