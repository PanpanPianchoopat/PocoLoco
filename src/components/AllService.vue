<template>
  <div class="menu-bar">
    <div>
      <span class="icon-wrap">
        <i class="fa fa-search fa-1x"></i>
      </span>

      <input
        class="search-field"
        type="text"
        placeholder="search"
        :style="{ marginBottom: '0' }"
      />
    </div>
    <div class="menu-buttons">
      <CustomSelect
        type="Filter"
        :options="['A', 'B', 'C', 'D']"
        :style="{ marginRight: '20px' }"
        @selection="selectionFilter"
      />
      <CustomSelect
        type="Sort by"
        :options="['A', 'B', 'C']"
        :style="{ marginRight: '20px' }"
        @selection="selectionSort"
      />
      <DefaultButton type="small">
        Search
      </DefaultButton>
    </div>
    <AddButton
      :style="
        width > 700
          ? { position: 'fixed', right: '100px', top: '240px' }
          : { position: 'fixed', right: '100px', top: '190px' }
      "
      @click="goToAddService()"
    />
  </div>

  <table v-if="services.length !== 0">
    <tr>
      <th>Service Name</th>
      <th>Type</th>
      <th>Price</th>
      <th>Manage</th>
    </tr>

    <tr
      v-for="(service, i) in services.slice(
        currentPage * tableRow - tableRow,
        currentPage * tableRow
      )"
      :key="i"
      class="row"
    >
      <td>{{ service.serviceName }}</td>
      <td>{{ service.type }}</td>
      <td>{{ service.price }}</td>

      <td>
        <div class="manage">
          <button
            class="manage-button"
            @click="getExpenseData('edit', expense)"
          >
            <i class="fa fa-pencil fa-2x"></i>
          </button>
          <div class="vl"></div>
          <button class="manage-button">
            <i class="fa fa-trash fa-2x"></i>
          </button>
        </div>
      </td>
    </tr>
  </table>

  <PaginationBar
    :pageCount="Math.ceil(services.length / tableRow)"
    :paginationVisible="services.length > tableRow"
    @pageReturn="pageReturn"
    :style="
      width <= 700
        ? {
            position: 'fixed',
            bottom: '30px',
            margin: '0 auto',
            right: '0',
            left: '60px',
          }
        : width <= 1000
        ? {
            position: 'fixed',
            bottom: '50px',
            margin: '0 auto',
            right: '0',
            left: '60px',
          }
        : {
            position: 'fixed',
            bottom: '50px',
            margin: '0 auto',
            right: '0',
            left: '200px',
          }
    "
  />
</template>

<script>
  import CustomSelect from "./CustomSelect";
  import DefaultButton from "./DefaultButton";
  import AddButton from "./AddButton";
  import { useScreenWidth } from "../composables/useScreenWidth";
  import { useScreenHeight } from "../composables/useScreenHeight";
  import PaginationBar from "./PaginationBar";

  const services = [
    {
      type: "Room Facility",
      serviceName: "Extra Blanket",
      price: 350,
    },
    {
      type: "Room Facility",
      serviceName: "Extra Pillow",
      price: 250,
    },
    {
      type: "Room Facility",
      serviceName: "Extra Towel",
      price: 150,
    },
    {
      type: "Food & Bev",
      serviceName: "American Breakfast Set",
      price: 250,
    },
    {
      type: "Food & Bev",
      serviceName: "Fresh Orange Juice",
      price: 80,
    },
    {
      type: "Food & Bev",
      serviceName: "Crab Fried Rice",
      price: 180,
    },
    {
      type: "Food & Bev",
      serviceName: "Crab Fried Rice",
      price: 180,
    },
    {
      type: "Food & Bev",
      serviceName: "Crab Fried Rice",
      price: 180,
    },
    {
      type: "Food & Bev",
      serviceName: "Crab Fried Rice",
      price: 180,
    },
    {
      type: "Food & Bev",
      serviceName: "Crab Fried Rice",
      price: 180,
    },
  ];

  export default {
    name: "AllService",
    components: { CustomSelect, DefaultButton, AddButton, PaginationBar },
    setup() {
      const { width } = useScreenWidth();
      const { height, tableRow } = useScreenHeight(580);
      return { width, height, tableRow };
    },
    data() {
      return {
        services,
        currentPage: 1,
      };
    },
    methods: {
      pageReturn(page) {
        this.currentPage = page;
      },
      goToAddService() {
        this.$router.push("/AddNewService");
      },
    },
  };
</script>

<style scoped>
  .menu-bar {
    display: flex;
    flex-direction: row;
  }
  .menu-buttons {
    display: flex;
  }
  .icon-wrap {
    position: absolute;
    z-index: 0;
    padding: 5px 20px;
  }
  i {
    color: #5f5f5f;
  }
  .search-field {
    width: 180px;
    height: 30px;
    font-size: 16px;
    outline: none;
    z-index: 1;
    padding-left: 45px;
    border: 1px solid var(--light-grey);
    border-radius: 50px;
    margin-right: 20px;
  }
  table {
    width: 100%;
    max-width: 1000;
    margin-top: 50px;
    border: 1px solid black;
    border-collapse: collapse;
    align-self: flex-start;
    z-index: 0;
  }
  th {
    height: 35px;
    text-align: center;
    background-color: #eeeeee;
    border-bottom: 1px solid black;
  }
  td {
    width: 80px;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .row:hover {
    cursor: pointer;
    background: var(--grey-highlight);
  }
  .manage {
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .fa-pencil:hover,
  .fa-trash:hover {
    color: var(--primary-blue);
  }
  .manage-button {
    border: none;
    background: none;
    cursor: pointer;
  }
  .vl {
    border-left: 3px solid #eeeeee;
    height: 25px;
    margin: 0 5px;
  }
  @media (max-width: 1100px) {
    .search-field {
      width: 300px;
    }
    .menu-bar {
      flex-direction: column;
    }
    .menu-buttons {
      margin-top: 40px;
    }
  }
  @media (max-width: 700px) {
    .search-field {
      width: 180px;
    }
  }
</style>
