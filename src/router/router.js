import EmployeeList from '@/components/view/employee/EmployeeList.vue';
import CashPage from '@/components/view/cash/CashPage.vue';
import DepositPage from '@/components/view/deposit/DepositPage.vue';

import {createRouter, createWebHistory} from 'vue-router';

const routers = [
    {
        path:"/employee",
        name: "EmployeeRouter",
        component: EmployeeList
    },
    {
        path: "/cash",
        name: "Cash",
        component: CashPage
    },
    {
        path: "/deposit",
        name: "Deposit",
        component: DepositPage
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

export default router;


