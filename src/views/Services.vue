<template>
  <TablePage>
    <h3>Services</h3>
    <div>
      <button
        class="menu-button"
        v-for="(menu, i) in menus"
        :key="i"
        @click="selectMenu(menu)"
        :style="
          menu == selected
            ? { borderBottom: '5px solid var(--primary-blue)' }
            : {}
        "
      >
        {{ menu }}
      </button>
    </div>

    <div class="inner-container">
      <AllService v-if="selected == menus[0]" />
      <OrderService v-if="selected == menus[1]" />
      <ServiceActivity v-if="selected == menus[2]" />
      <SearchError v-if="notFound" />
    </div>
  </TablePage>
</template>

<script>
  import TablePage from "../components/TablePage.vue";
  import AllService from "../components/AllService.vue";
  import OrderService from "../components/OrderService.vue";
  import ServiceActivity from "../components/ServiceActivity.vue";
  import SearchError from "../components/SearchError";

  const menus = ["All Services", "Order Service", "History"];

  export default {
    name: "Services",
    components: {
      TablePage,
      AllService,
      OrderService,
      ServiceActivity,
      SearchError,
    },
    data() {
      return {
        menus,
        selected: menus[0],
        notFound: false,
      };
    },
    methods: {
      selectMenu(menu) {
        this.selected = menu;
      },
    },
  };
</script>

<style scoped>
  h3 {
    font-size: 48px;
    margin: 80px 0 35px 0;
  }
  .menu-button {
    width: 150px;
    height: 35px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-color);
  }
  .inner-container {
    display: flex;
    height: 100%;
    margin-bottom: 50px;
    padding: 35px 30px;
    background: white;
  }
  @media (max-width: 1000px) {
    h3 {
      margin: 40px 0 20px 0;
    }
  }
  @media (max-width: 700px) {
    .inner-container {
      margin-bottom: 20px;
    }
    .menu-button {
      width: 100px;
      height: 35px;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
</style>
