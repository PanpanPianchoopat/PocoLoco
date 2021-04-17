import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import EmployeeReg from "../views/EmployeeReg.vue";
import CustomerReg from "../views/CustomerReg.vue";
import AddRole from "../views/AddRole.vue";
import AddPromo from "../views/AddPromo.vue";
import AddBookingDetail from "../views/AddBookingDetail.vue";
import AddBooking from "../views/AddBooking.vue";

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
    path: "/AddBookingDetail",
    name: "AddBookingDetail",
    component: AddBookingDetail,
  },
  {
    path: "/AddBooking",
    name: "AddBooking",
    component: AddBooking,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
