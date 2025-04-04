import { createRouter, createWebHistory } from 'vue-router'

const withDefaultLayout = (component: any) => ({
    component,
    meta: { layout: 'default' },
    suspensible: true,
})

const routes = [
    {
        path: '/',
        ...withDefaultLayout(() => import(/* webpackChunkName: "home" */ '@/pages/Home.vue')),
    },
    {
        path: '/product/:slug',
        ...withDefaultLayout(() => import(/* webpackChunkName: "product-detail" */ '@/pages/products/ProductDetail.vue')),
    },
    {
        path: '/search/:query',
        ...withDefaultLayout(() => import(/* webpackChunkName: "product-list" */ '@/pages/products/ProductList.vue')),
    },
    {
        path: '/category/:categorySlug',
        ...withDefaultLayout(() => import(/* webpackChunkName: "product-list" */ '@/pages/products/ProductList.vue')),
    },
    {
        path: '/favorites',
        ...withDefaultLayout(() => import(/* webpackChunkName: "favorite-product-list" */ '@/pages/products/FavoritePage.vue')),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Always scroll to top
        return { top: 0 }
    }
})

export default router
