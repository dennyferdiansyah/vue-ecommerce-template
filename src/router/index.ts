import { createRouter, createWebHistory } from 'vue-router'

const withDefaultLayout = (component: any) => ({
    component,
    meta: { layout: 'default', showBreadcrumbs: true   },
    suspensible: true,
})

const routes = [
    {
        path: '/',
        ...withDefaultLayout(() => import(/* webpackChunkName: "indexs" */ '@/pages/Index.vue')),
        meta: {
            showBreadcrumbs: false,
        }
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
    {
        path: '/cart',
        ...withDefaultLayout(() => import(/* webpackChunkName: "cart-index" */ '@/pages/cart/index.vue')),
    },
    {
        path: '/:pathMatch(.*)*',
        ...withDefaultLayout(() => import(/* webpackChunkName: "not-found" */ '@/pages/NotFound.vue')),
        meta: {
            showBreadcrumbs: false,
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // Always scroll to top
        return { top: 0 }
    }
})

export default router
