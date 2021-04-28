<template>
  <Container>
    <Navbar />

    <h3>Customer</h3>
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
      <CustomSelect
        type="Sort by"
        :options="['A', 'B', 'C']"
        :style="{ marginRight: '20px' }"
      />
      <CustomSelect
        type="Filter"
        :options="['A', 'B', 'C']"
        :style="{ marginRight: '20px' }"
      />
      <DefaultButton type="small" :style="width < 650 ? { width: '70px' } : {}"
        >Search</DefaultButton
      >
      <AddButton
        :style="
          width < 800
            ? { position: 'fixed', right: '5%', top: '80px' }
            : { position: 'fixed', right: '5%', top: '170px' }
        "
        @click="goToCustomerReg()"
      />
    </div>

    <table v-if="customers.length !== 0">
      <tr>
        <th>Rank</th>
        <th>ID</th>
        <th>Name</th>

        <th>Phone</th>
        <th>Number of visit</th>
        <th>Manage</th>
      </tr>

      <tr
        v-for="(customer, i) in customers.slice(
          currentPage * tableRow - tableRow,
          currentPage * tableRow
        )"
        :key="i"
        class="row"
      >
        <td>{{ i + 1 }}</td>
        <td>{{ customer.id }}</td>
        <td>{{ customer.fname }} {{ customer.lname }}</td>

        <td>{{ customer.phone }}</td>
        <td>{{ customer.visit }}</td>
        <td>
          <div class="manage">
            <!--View-->
            <button
              class="manage-button"
              @click="getCustomerData('view', customer)"
            >
              <i class="fa fa-search fa-2x"></i>
            </button>
            <div class="vl"></div>
            <!--Edit-->
            <button
              class="manage-button"
              @click="getCustomerData('edit', customer)"
            >
              <i class="fa fa-pencil fa-2x"></i>
            </button>
          </div>
        </td>
      </tr>
    </table>

    <PaginationBar
      :pageCount="Math.ceil(customers.length / tableRow)"
      :paginationVisible="customers.length > tableRow"
      @pageReturn="pageReturn"
      :style="
        width <= 1000
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
  </Container>

  <!--View-->
  <Popup v-bind:visible="viewVisible" @popReturn="viewReturn">
    <div class="popup-head">
      <div class="ranking">
        <div class="rank">1</div>
        <h4>ID: {{ customerID }}</h4>
      </div>

      <div>
        <h4>{{ fname }} {{ lname }}</h4>
        <p class="subscript-text">Number of visit: {{ visitCount }}</p>
      </div>
    </div>
    <div class="view-group">
      <div class="view-item">
        <p><b>Phone: </b>{{ phone }}</p>
      </div>
      <div>
        <p><b>Email: </b>{{ email }}</p>
      </div>
    </div>
    <div class="view-group">
      <div class="view-item">
        <p><b>Gender: </b> {{ gender }}</p>
      </div>
      <div>
        <p><b>Birthday: </b>{{ birthday }}</p>
      </div>
    </div>
    <p :style="{ textAlign: 'justify' }"><b>Address: </b>{{ address }}</p>
  </Popup>

  <!--Edit-->
  <Popup v-bind:visible="editVisible" :buttons="true" @popReturn="editReturn">
    <div class="input-group">
      <p
        :style="
          width > 700 ? { marginRight: '130px' } : { marginRight: '90px' }
        "
      >
        First Name
      </p>
      <p>Last Name</p>
    </div>
    <div class="input-group">
      <input
        type="text"
        :value="fname"
        :placeholder="fname"
        :style="{ marginRight: '20px' }"
      />
      <input type="text" :value="lname" :placeholder="lname" />
    </div>
    <p>Phone</p>
    <input type="text" :value="phone" :placeholder="phone" />
    <p>Email</p>
    <input
      type="text"
      :value="email"
      :placeholder="email"
      :style="{ width: '250px' }"
    />
    <p>Address</p>
    <textarea :value="address" />
  </Popup>
</template>

<script>
  import DefaultButton from "../components/DefaultButton.vue";
  import Navbar from "../components/Navbar.vue";
  import Container from "../components/Container.vue";
  import PaginationBar from "../components/PaginationBar.vue";
  import AddButton from "../components/AddButton.vue";
  import Popup from "../components/Popup.vue";
  import { useScreenWidth } from "../composables/useScreenWidth";
  import { useScreenHeight } from "../composables/useScreenHeight";
  import CustomSelect from "../components/CustomSelect.vue";

  const customers = [
    {
      id: 123456,
      fname: "Ploypapas",
      lname: "Pianchoopat",
      phone: "0925027111",
      email: "pploypapass@gmail.com",
      address: "second star to the right, and straight on till morning",
      birth: "17-07-2544",
      gender: "female",
      visit: 1,
    },
    {
      id: 199109,
      fname: "Tay",
      lname: "Tawan",
      phone: "0841135544",
      email: "tawanv@gmail.com",
      address: "osk134",
      birth: "17-07-2544",
      gender: "male",
      visit: 2,
    },
    {
      id: 140505,
      fname: "Thannapas",
      lname: "Pianchoopat",
      phone: "0841936333",
      email: "thannapaspcp@gmail.com",
      address: "The Utonium Residence (107 Pokey Oaks South, Townsville, USA)",
      birth: "17-07-2544",
      gender: "female",
      visit: 3,
    },
    {
      id: 200001,
      fname: "Chimon",
      lname: "Vachirawit",
      phone: "0657435923",
      email: "chimonac@gmail.com",
      address: "somewhere in this world",
      birth: "17-07-2544",
      gender: "male",
      visit: 4,
    },
    {
      id: 133066,
      fname: "Marc",
      lname: "Pahun",
      phone: "0817445637",
      email: "marcac@gmail.com",
      address: "ac school",
      birth: "17-07-2544",
      gender: "male",
      visit: 5,
    },
    {
      id: 654321,
      fname: "Gun",
      lname: "Smile",
      phone: "0900773421",
      birth: "17-07-2544",
      email: "gunsmile@gmail.com",
      address: "osk school",
      gender: "male",
      visit: 6,
    },
    {
      id: 345565,
      fname: "Off",
      lname: "Jumpol",
      phone: "0984562341",
      birth: "17-07-2544",
      email: "tumcial@gmail.com",
      address: "jp house",
      gender: "male",
      visit: 7,
    },
    {
      id: 468249,
      fname: "Kim",
      lname: "Soo Hyun",
      phone: "0948763964",
      birth: "17-07-2544",
      email: "kimsoohyunn@gmail.com",
      address: "Korea",
      gender: "male",
      visit: 9,
    },
    {
      id: 582855,
      fname: "Vincenzo",
      lname: "Casano",
      phone: "0762289453",
      birth: "17-07-2544",
      email: "vincasazo@gmail.com",
      address: "Kimga plaza",
      gender: "male",
      visit: 10,
    },
    {
      id: 170744,
      fname: "Panpan",
      lname: "Skrskr",
      phone: "0900075072",
      birth: "17-07-2544",
      email: "ppskrskr@gmail.com",
      address: "skr land",
      gender: "female",
      visit: 11,
    },
    {
      id: 270845,
      fname: "Tata",
      lname: "Sick",
      phone: "0804450222",
      birth: "17-07-2544",
      email: "methawatpian@gmail.com",
      address: "DSS sshool",
      gender: "male",
      visit: 11,
    },
  ];

  export default {
    name: "Customer",
    components: {
      DefaultButton,
      Navbar,
      Container,
      PaginationBar,
      AddButton,
      Popup,
      CustomSelect,
    },
    setup() {
      const { width } = useScreenWidth();
      const { height, tableRow } = useScreenHeight();
      return { width, height, tableRow };
    },
    data() {
      return {
        customers,
        currentPage: 1,
        viewVisible: false,
        editVisible: false,
        customerID: null,
        fname: null,
        lname: null,
        phone: null,
        birthday: null,
        email: null,
        address: null,
        visitCount: 0,
        gender: null,
      };
    },

    methods: {
      pageReturn(page) {
        this.currentPage = page;
      },
      viewReturn(value) {
        this.viewVisible = value;
      },
      editReturn(value) {
        this.editVisible = value;
      },
      getCustomerData(type, customer) {
        if (type === "view") {
          this.viewVisible = !this.viewVisible;
        }
        if (type === "edit") {
          this.editVisible = !this.editVisible;
        }
        this.customerID = customer.id;
        this.fname = customer.fname;
        this.lname = customer.lname;
        this.phone = customer.phone;
        this.email = customer.email;
        this.birthday = customer.birth;
        this.address = customer.address;
        this.visitCount = customer.visit;
        this.gender = customer.gender;
      },
      goToCustomerReg() {
        this.$router.push("/CustomerReg");
      },
    },
  };
</script>

<style scoped>
  h3 {
    font-size: 48px;
    margin: 80px 0 35px 0;
  }
  h4 {
    font-size: 20px;
    margin-bottom: 0;
  }
  .icon-wrap {
    position: absolute;
    z-index: 0;
    padding: 5px 20px;
  }
  .search-field {
    width: 225px;
    height: 30px;
    padding-left: 45px;
    font-size: 16px;
    outline: none;
    z-index: 1;
    border: none;
    border-radius: 50px;
    margin-right: 20px;
  }
  i {
    color: #5f5f5f;
  }
  .menu-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  table {
    width: 75%;
    max-width: 1000;
    margin-top: 50px;
    border: 1px solid black;
    border-collapse: collapse;
    align-self: flex-start;
    z-index: 0;
  }
  .manage {
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .fa-pencil:hover,
  .fa-search:hover {
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
    margin: 0 15px;
  }
  .popup-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 3px solid var(--grey-highlight);
    padding-bottom: 20px;
    margin-bottom: 25px;
    font-weight: bold;
  }
  .ranking {
    display: flex;
    flex-direction: row;
  }
  .rank {
    width: 50px;
    height: 50px;
    background: var(--button-blue);
    color: white;
    margin: 15px 25px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    font-size: 20px;
  }
  .subscript-text {
    color: grey;
    font-size: 14px;
    margin: 10px 0 0 0;
  }
  p {
    margin-bottom: 10px;
    font-size: 18px;
  }
  .input-group {
    display: flex;
    width: 100%;
    flex-direction: row;
  }
  input {
    width: 180px;
    height: 35px;
    align-self: center;
    padding-left: 10px;
    margin-bottom: 20px;
    color: var(--header-color);
  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-family: Arial, Helvetica, sans-serif;
    color: var(--text-color);
  }
  th {
    height: 35px;
    text-align: center;
    background-color: #eeeeee;
    border-bottom: 1px solid black;
  }
  td {
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .row:hover {
    cursor: pointer;
    background: var(--grey-highlight);
  }
  .view-group {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .view-item {
    width: 40%;
  }
  *:focus {
    outline: 0;
  }
  @media (max-width: 1000px) {
    .search-field {
      width: 180px;
    }
    .vl {
      margin: 0 5px;
    }
    table {
      width: 85%;
    }
    h4 {
      font-size: 16px;
    }
    p {
      font-size: 16px;
    }
    .subscript-text {
      font-size: 12px;
      margin-top: 5px;
    }
    .rank {
      width: 40px;
      height: 40px;
      margin: 12px 15px 0 0;
      font-size: 16px;
    }
    input {
      width: 180px;
    }
  }
  @media (max-width: 700px) {
    table {
      width: 80%;
    }
    .search-field {
      width: 150px;
      font-size: 16px;
    }
    input {
      width: 125px;
    }
    h4 {
      font-size: 14px;
    }
    p {
      font-size: 14px;
    }
    .rank {
      width: 35px;
      height: 35px;
      margin: 10px 15px 0 0;
      font-size: 14px;
    }
  }
</style>
