import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import EmployeeReg from "../views/EmployeeReg.vue";
import CustomerReg from "../views/CustomerReg.vue";
import AddRole from "../views/AddRole.vue";
import AddPromo from "../views/AddPromo.vue";
import AddBooking from "../views/AddBooking.vue";
import AddBookingDetail from "../views/AddBookingDetail.vue";
import AddNewService from "../views/AddNewService.vue";
import AddExpense from "../views/AddExpense.vue";
import Role from "../views/Role.vue";

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/EmployeeReg",
    name: "EmployeeReg",
    component: EmployeeReg,
  },
  {
    path: "/CustomerReg",
    name: "CustomerReg",
    component: CustomerReg,
  },
  {
    path: "/AddRole",
    name: "AddRole",
    component: AddRole,
  },
  {
    path: "/AddPromo",
    name: "AddPromo",
    component: AddPromo,
  },
  {
    path: "/AddBooking",
    name: "AddBooking",
    component: AddBooking,
  },
  {
    path: "/AddBookingDetail",
    name: "AddBookingDetail",
    component: AddBookingDetail,
  },
  {
    path: "/AddNewService",
    name: "AddNewService",
    component: AddNewService,
  },
  {
    path: "/AddExpense",
    name: "AddExpense",
    component: AddExpense,
  },
  {
    path: "/Role",
    name: "Role",
    component: Role,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
