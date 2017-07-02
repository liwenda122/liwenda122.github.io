import App from '../app'

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login',
                name: "登录",
                meta: {auth: false},
                component: resolve => require(['../pages/login/'], resolve)
            },
            {//首页
                path: '/',
                name: "home",
                component: resolve => require(['../pages/index/'], resolve)
            },
            {//采购单首页
                path: '/purchase',
                name: "追踪",
                component: resolve => require(['../pages/purchase/index.vue'], resolve)
            },
            {
                path: '/reports',
                name: "报表",
                component: resolve => require(['../pages/reports/'], resolve)
            },
            {
                path: '/reports/settleOrder/settleOrderList',
                name: "结算单汇总",
                component: resolve => require(['../pages/reports/settleOrder/settleOrderList.vue'], resolve)
            },
            {
                path: '/reports/settleOrder/settleOrderDetail',
                name: "结算单详情",
                component: resolve => require(['../pages/reports/settleOrder/settleOrderDetail.vue'], resolve)
            },
            {
                path: '/settings',
                name: "基础管理",
                component: resolve => require(['../pages/settings/'], resolve)
            },
            {
                path: '/settings/handlePurchase/index',
                name: "供应商管理",
                component: resolve => require(['../pages/settings/handlePurchase/index.vue'], resolve),
                children: [
                    {
                        path: '/settings/handlePurchase/add/index',
                        name: "新增供应商",
                        component: resolve => require(['../pages/settings/handlePurchase/add/index.vue'], resolve)
                    }
                ]
            },
            {
                path: '/settings/handleMateriel/index',
                name: "物料管理",
                component: resolve => require(['../pages/settings/handleMateriel/index.vue'], resolve),
                children: [
                    {
                        path: '/settings/handleMateriel/add/index',
                        name: "新增物料",
                        component: resolve => require(['../pages/settings/handleMateriel/add/index.vue'], resolve),
                    }
                ]
            },
            {
                path: '/settings/handleUser/index',
                name: "员工管理",
                component: resolve => require(['../pages/settings/handleUser/index.vue'], resolve),
                children: [
                    {
                        path: '/settings/handleUser/add/index',
                        name: "新增员工",
                        component: resolve => require(['../pages/settings/handleUser/add/index.vue'], resolve)
                    }
                ]
            },
            {
                path: '*',
                redirect: '/login'
            }
        ]
    }
]