<template>
  <div class="input-group">
    <p>Room Number</p>
    <input type="text" />
  </div>
  <div class="input-group">
    <p>Service Name</p>
    <div class="search-container">
      <i class="fa fa-search fa-1x"></i>
      <input
        class="search-field"
        type="text"
        placeholder="search"
        :style="{ marginBottom: '0' }"
      />
    </div>
    <DefaultButton type="small">
      Search
    </DefaultButton>
  </div>
  <table class="search-table">
    <tr>
      <th v-if="width > 700">Service ID</th>
      <th>Name</th>
      <th>Price</th>
      <th>Amount</th>
      <th>Add Order</th>
    </tr>

    <tr
      v-for="(option, i) in options.slice(
        currentPage * resultPerPage - resultPerPage,
        currentPage * resultPerPage
      )"
      :key="i"
      class="row"
    >
      <td v-if="width > 700">{{ option.id }}</td>
      <td :style="{ textAlign: 'left' }">{{ option.name }}</td>
      <td>{{ option.price }}</td>
      <td>
        <input
          class="add-amount"
          :id="`orderAmount${i}`"
          type="number"
          min="1"
          :value="startingAmount"
        />
      </td>
      <td>
        <DefaultButton
          type="small"
          @click="addToOrder(option, i)"
          :style="
            width > 700
              ? { width: '90px', height: '25px' }
              : { width: '60px', height: '25px' }
          "
        >
          Add
        </DefaultButton>
      </td>
    </tr>
    <tr
      v-if="
        currentPage == Math.ceil(options.length / resultPerPage) &&
          options.length % resultPerPage !== 0
      "
    >
      <td colspan="5" :style="{ height: '100%' }"></td>
    </tr>
  </table>

  <PaginationBar
    :pageCount="Math.ceil(options.length / resultPerPage)"
    :paginationVisible="options.length > resultPerPage"
    @pageReturn="pageReturn"
  />

  <table class="orders" v-if="orders.length >= 1">
    <tr>
      <th v-if="width > 700">Service ID</th>
      <th>Name</th>
      <th>Amount</th>
      <th>Price</th>
      <th>Total</th>
      <th>Remove</th>
    </tr>

    <tr v-for="(order, i) in orders" :key="i" class="row">
      <td v-if="width > 700">{{ order.id }}</td>
      <td :style="{ textAlign: 'left' }">{{ order.name }}</td>
      <td>{{ order.amount }}</td>
      <td>{{ order.price }}</td>
      <td>{{ order.amount * order.price }}</td>
      <td>
        <button class="manage-button" @click="removeOrder(order, i)">
          <i class="fa fa-trash fa-2x"></i>
        </button>
      </td>
    </tr>
    <tr class="summary-row">
      <td v-if="width > 700"></td>
      <td :style="{ textAlign: 'right' }"><b>Total</b></td>
      <td>
        <b>{{ totalAmount }}</b>
      </td>
      <td></td>
      <td>
        <b>{{ totalPrice }}</b>
      </td>
      <td></td>
    </tr>
  </table>

  <div class="buttons" v-if="orders.length >= 1">
    <DefaultButton
      @click="clearBasket()"
      :style="{
        height: '40px',
        width: '110px',
        background: 'none',
        marginRight: '40px',
        border: '3px solid #777777',
        color: '#777777',
        fontSize: '15px',
      }"
      >CANCEL</DefaultButton
    >
    <DefaultButton
      :style="{
        height: '40px',
        width: '110px',
        background: 'var(--primary-yellow)',
        fontSize: '15px',
      }"
      >CONFIRM</DefaultButton
    >
  </div>
</template>

<script>
  import DefaultButton from "../components/DefaultButton";
  import { useScreenHeight } from "../composables/useScreenHeight";
  import { useScreenWidth } from "../composables/useScreenWidth";
  import PaginationBar from "../components/PaginationBar";

  const options = [
    {
      id: 111,
      name: "Extra Blanket",
      price: 350,
    },
    {
      id: 112,
      name: "Extra Pillow",
      price: 250,
    },
    {
      id: 113,
      name: "Extra Towel",
      price: 150,
    },
    {
      id: 114,
      name: "Extra Bed",
      price: 800,
    },
    {
      id: 115,
      name: "Extra Something",
      price: 50,
    },
    {
      id: 115,
      name: "Extra Something",
      price: 50,
    },
    {
      id: 115,
      name: "Extra Something",
      price: 50,
    },
    {
      id: 115,
      name: "Extra Something",
      price: 50,
    },
  ];

  export default {
    name: "OrderService",
    components: { DefaultButton, PaginationBar, DefaultButton },
    setup() {
      const { width } = useScreenWidth();
      const { height, tableRow } = useScreenHeight(420);
      return { width, height, tableRow };
    },
    data() {
      return {
        options,
        orders: [],
        currentPage: 1,
        resultPerPage: 5,
        startingAmount: 1,
        totalAmount: 0,
        totalPrice: 0,
      };
    },
    methods: {
      pageReturn(page) {
        this.currentPage = page;
      },
      addToOrder(item, index) {
        const inputAmount = Number(
          document.getElementById(`orderAmount${index}`).value
        );
        this.totalAmount = this.totalAmount + inputAmount;
        this.totalPrice = this.totalPrice + item.price * inputAmount;
        this.orders.push({
          id: item.id,
          name: item.name,
          amount: inputAmount,
          price: item.price,
        });
      },
      removeOrder(order, index) {
        const inputAmount = Number(
          document.getElementById(`orderAmount${index}`).value
        );
        this.totalAmount = this.totalAmount - inputAmount;
        this.totalPrice = this.totalPrice - order.price * inputAmount;
        this.orders.splice(index, 1);
      },
      clearBasket() {
        this.orders = [];
      },
    },
  };
</script>

<style scoped>
  .input-group {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
  }
  p {
    margin-right: 20px;
  }
  input {
    width: 180px;
    height: 30px;
    padding-left: 10px;
    color: var(--header-color);
    font-size: 16px;
    z-index: 0;
  }

  i {
    color: #5f5f5f;
  }
  .search-container {
    position: relative;
  }
  .fa-search {
    position: absolute;
    z-index: 5;
    margin: 7px 0 0 12px;
    font-size: 16px;
  }
  .search-field {
    width: 225px;
    height: 30px;
    padding-left: 35px;
    font-size: 16px;
    outline: none;
    z-index: 1;
    border: 1px solid var(--light-grey);
    border-radius: 50px;
    margin-right: 20px;
    position: relative;
  }

  .search-table {
    width: 100%;
    height: 220px;
    max-width: 1000px;
    border-collapse: collapse;
    margin: 10px;
    position: relative;
  }
  th {
    height: 35px;
    text-align: center;
    border-bottom: 1px solid black;
  }
  td {
    height: 35px;
    width: 80px;
    text-align: center;
  }
  .row:hover {
    cursor: pointer;
    background: var(--grey-highlight);
  }
  .summary-row {
    height: 50px;
    border-top: 2px solid var(--light-grey);
  }
  .add-amount {
    width: 50px;
    height: 20px;
    font-size: 16px;
    text-align: center;
  }
  .orders {
    width: 100%;
    max-width: 1000px;
    border-collapse: collapse;
    margin-top: 20px;
    border: 1px solid black;
  }
  .manage-button {
    border: none;
    background: none;
    cursor: pointer;
  }
  .fa-trash:hover {
    color: var(--primary-blue);
  }
  .buttons {
    margin: 0 auto;
    padding-top: 20px;
  }
  @media (max-width: 700px) {
    p {
      font-size: 14px;
    }
    input {
      font-size: 14px;
      width: 130px;
      height: 25px;
    }
    .search-field {
      width: 150px;
      font-size: 14px;
    }
    .search-table {
      font-size: 14px;
    }
    .add-amount {
      width: 40px;
      font-size: 14px;
    }
    .orders {
      font-size: 14px;
    }
  }
</style>
