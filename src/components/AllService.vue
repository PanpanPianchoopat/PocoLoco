<template>
  <div class="menu-bar">
    <div class="search-container">
      <i class="fa fa-search fa-1x"></i>

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
      @click="goToAddService()"
      :style="{ position: 'absolute', right: '2%' }"
    />
  </div>
  <SearchError v-if="error" :style="{ marginTop: '80px' }" />
  <div class="table-container">
    <table v-if="services.length !== 0 && !error">
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
        <td>
          {{ service.serviceName }}
        </td>
        <td>{{ service.type }}</td>
        <td>{{ service.price }}</td>

        <td>
          <div class="manage">
            <button class="manage-button" @click="showPopup(service)">
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
  </div>

  <PaginationBar
    v-if="!error"
    :pageCount="Math.ceil(services.length / tableRow)"
    :paginationVisible="services.length > tableRow"
    @pageReturn="pageReturn"
  />

  <Popup
    v-bind:visible="editVisible"
    :buttons="true"
    @popReturn="editReturn"
    :style="{ top: '0', left: '0', margin: '0' }"
  >
    <h4>Service Type</h4>
    <select>
      <option :value="serviceType" selected disabled hidden>
        {{ serviceType }}
      </option>
      <option
        v-for="(option, i) in serviceOptions"
        :key="i"
        :value="serviceType"
        :selected="option == serviceType ? 'selected' : null"
      >
        {{ option }}
      </option>
    </select>
    <h4>Service Name</h4>
    <input
      type="text"
      :value="serviceName"
      :placeholder="serviceName"
      :style="{ width: '280px' }"
    />
    <h4>Price</h4>
    <div class="input-group">
      <input
        :value="servicePrice"
        :placeholder="servicePrice"
        :style="{ marginRight: '10px', textAlign: 'right' }"
      />
      <p>Baht</p>
    </div>
  </Popup>
</template>

<script>
  import CustomSelect from "./CustomSelect";
  import DefaultButton from "./DefaultButton";
  import AddButton from "./AddButton";
  import { useScreenWidth } from "../composables/useScreenWidth";
  import PaginationBar from "./PaginationBar";
  import Popup from "./Popup";
  import SearchError from "./SearchError";

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
    components: {
      CustomSelect,
      DefaultButton,
      AddButton,
      PaginationBar,
      Popup,
      SearchError,
    },
    setup() {
      const { width } = useScreenWidth();
      return { width };
    },
    data() {
      return {
        services,
        serviceOptions: ["Room Facility", "Food & Bev"],
        currentPage: 1,
        tableRow: 10,
        editVisible: false,
        serviceType: null,
        serviceName: null,
        servicePrice: null,
        error: true,
      };
    },
    methods: {
      pageReturn(page) {
        this.currentPage = page;
      },
      goToAddService() {
        this.$router.push("/AddNewService");
      },
      editReturn(value) {
        this.editVisible = value;
      },
      showPopup(service) {
        this.serviceType = service.type;
        this.serviceName = service.serviceName;
        this.servicePrice = service.price;
        this.editVisible = !this.editVisible;
      },
    },
  };
</script>

<style scoped>
  .menu-bar {
    display: flex;
    flex-direction: row;
    position: relative;
  }
  .menu-buttons {
    display: flex;
    align-items: center;
  }
  .search-container {
    position: relative;
    display: flex;
  }
  i {
    color: #5f5f5f;
  }
  .fa-search {
    position: absolute;
    z-index: 5;
    margin: 17px 10px;
    font-size: 16px;
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
  .table-container {
    display: flex;
    height: 460px;
  }
  table {
    width: 100%;
    max-width: 1000;
    border: 1px solid black;
    border-collapse: collapse;
    align-self: flex-start;
    margin-top: 40px;
    z-index: 0;
  }
  th {
    height: 35px;
    text-align: center;
    background-color: #eeeeee;
    border-bottom: 1px solid black;
  }
  td {
    height: 35px;
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
  h4 {
    margin: 0;
  }
  select {
    width: 150px;
    height: 35px;
    padding-left: 10px;
    margin: 10px 0 20px 0;
  }
  .input-group {
    display: flex;
    align-items: center;
  }
  input {
    width: 100px;
    height: 30px;
    padding-left: 10px;
    margin: 10px 0 20px 0;
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
    .table-container {
      height: 450px;
    }
    table {
      margin-top: 30px;
      font-size: 14px;
    }
    .vl {
      margin: 0 2px;
    }
    .fa-pencil,
    .fa-trash {
      font-size: 20px;
    }
  }
</style>
