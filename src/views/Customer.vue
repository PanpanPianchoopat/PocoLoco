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
          v-model="search"
          class="search-field"
          type="text"
          placeholder="search"
          :style="{ marginBottom: '0' }"
        />
      </div>
      <DefaultButton @click="searchData" type="small">Search</DefaultButton>

      <h4>Sort By</h4>
      <!-- Sort By -->
      <select v-model="sort">
        <option value="all" selected>All</option>
        <option value="rank">Rank</option>
        <option value="customerID">ID</option>
        <option value="firstName">Name</option>
        <option value="numberVisit">Number of visit</option>
      </select>

      <h4>Filter</h4>
      <!-- Filter -->
      <select v-model="filter">
        <option value="all" selected>All</option>
        <option value="rank">Rank</option>
        <option value="customerID">ID</option>
        <option value="firstName">Name</option>
        <option value="numberVisit">Number of visit</option>
      </select>

      <AddButton
        :style="{ position: 'fixed', right: '5%', top: '170px' }"
        @click="goToCustomerReg()"
      />
    </div>

    <h4 v-if="customer_db.length == 0" style="color:red">
      No results found try different keywords or different search filters
    </h4>
    <table v-if="customer_db.length !== 0">
      <tr>
        <th>Rank</th>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Number of visit</th>
        <th>Manage</th>
      </tr>

      <tr
        v-for="(customer, index) in customer_db.slice(
          currentPage * tableRow - tableRow,
          currentPage * tableRow
        )"
        v-bind:key="index"
        class="row"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ customer.customerID }}</td>
        <td>{{ customer.firstName }} {{ customer.lastName }}</td>
        <td>{{ customer.phone }}</td>
        <td v-if="customer.numberVisit != NULL">{{ customer.numberVisit }}</td>
        <td v-else>0</td>
        <td>
          <div class="manage">
            <!-- Search Button -->
            <button
              class="manage-button"
              @click="getCustomerData('view', customer)"
            >
              <i class="fa fa-search fa-2x"></i>
            </button>
            <!-- Edit Button -->
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
      :pageCount="Math.ceil(customer_db.length / tableRow)"
      :paginationVisible="customer_db.length > tableRow"
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
        <h4>{{ firstName }} {{ lastName }}</h4>
        <p v-if="numberVisit != NULL" class="subscript-text">
          Number of visit: {{ numberVisit }}
        </p>
        <p v-else class="subscript-text">Number of visit: 0</p>
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
        <p><b>Birthday: </b>{{ DOB }}</p>
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
        :v-model="form.firstName"
        :value="firstName"
        :placeholder="fname"
        :style="{ marginRight: '20px' }"
      />
      <input
        type="text"
        :v-model="form.lastName"
        :value="lastName"
        :placeholder="lname"
      />
    </div>
    <p>Phone</p>
    <input
      type="text"
      :v-model="form.phone"
      :value="phone"
      :placeholder="phone"
    />
    <p>Email</p>
    <input
      type="text"
      :v-model="form.email"
      :value="email"
      :placeholder="email"
      :style="{ width: '250px' }"
    />
    <p>Address</p>
    <textarea :v-model="form.address" :value="address" />
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
import axios from "axios";

export default {
  name: "Customer",
  components: {
    DefaultButton,
    Navbar,
    Container,
    PaginationBar,
    AddButton,
    Popup,
  },
  setup() {
    const { width } = useScreenWidth();
    const { height, tableRow } = useScreenHeight();
    return { width, height, tableRow };
  },
  data() {
    return {
      viewVisible: false,
      editVisible: false,
      currentPage: 1,

      search: "",
      sort: "all",
      filter: "all",
      customer_db: "",
      check: false,
      form: {
        rank: "",
        customerID: "",
        firstName: "",
        lastName: "",
        DOB: "",
        phone: "",
        email: "",
        address: "",
        numberVisit: "",
        isEdit: false,
      },
    };
  },

  created() {
    this.getAllCustomer();
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

    getRecord(department, role, salary, bonus) {
      this.visible = !this.visible;
      this.department = department;
      this.role = role;
      this.salary = salary;
      this.bonusRate = bonus;
    },

    getCustomerData(type, customer) {
      console.log(customer);
      if (type === "view") {
        this.viewVisible = !this.viewVisible;
      }
      if (type === "edit") {
        this.editVisible = !this.editVisible;
        this.form.isEdit = true;
      }
      this.customerID = customer.customerID;
      this.firstName = customer.firstName;
      this.lastName = customer.lastName;
      this.phone = customer.phone;
      this.email = customer.email;
      this.DOB = customer.DOB;
      this.address = customer.address;
      this.numberVisit = customer.numberVisit;
      this.gender = customer.gender;
    },

    goToCustomerReg() {
      this.$router.push("/CustomerReg");
    },

    getAllCustomer() {
      axios
        .post("http://localhost:8080/PocoLoco_db/api_customer.php", {
          action: "getAllCustomer",
          sort: this.sort,
          filter: this.filter,
        })
        .then(
          function(res) {
            console.log(res);
            this.customer_db = res.data;
          }.bind(this)
        );
    },

    searchData(e) {
      e.preventDefault();
      axios
        .post("http://localhost:8080/PocoLoco_db/api_customer.php", {
          action: "searchData",
          search: this.search,
          sort: this.sort,
          filter: this.filter,
        })
        .then(
          function(res) {
            console.log(res);
            this.customer_db = res.data;
          }.bind(this)
        );
    },

    editData(customerID) {
      this.form.isEdit = true;
      axios
        .post("http://localhost:8080/PocoLoco_db/api_customer.php", {
          action: "editData",
          customerID: customerID,
        })
        .then(
          function(res) {
            console.log(res.data);
            this.form.customerID = res.data[0].customerID;
            this.form.firstName = res.data[0].firstName;
            this.form.lastName = res.data[0].lastName;
            this.form.DOB = res.data[0].DOB;
            this.form.phone = res.data[0].phone;
            this.form.email = res.data[0].email;
            this.form.address = res.data[0].address;
          }.bind(this)
        );
    },

    updateData() {
      this.validate();

      if (this.check && this.form.isEdit) {
        axios
          .post("http://localhost:8080/PocoLoco_db/api_customer.php", {
            action: "updateData",
            customerID: this.form.customerID,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            DOB: this.form.DOB,
            phone: this.form.phone,
            email: this.form.email,
            address: this.form.address,
          })
          .then(
            function(res) {
              console.log(res.data);
              if (res.data.success == true) {
                alert("Updated Successfully");
                this.resetData();
                this.getAllCustomer();
              }
            }.bind(this)
          );
      }
    },

    deleteData(customerID) {
      if (confirm("Do you want to delete ID " + customerID + "?")) {
        axios
          .post("http://localhost:8080/PocoLoco_db/api_customer.php", {
            action: "deleteData",
            customerID: customerID,
          })
          .then(function(res) {
            alert(res.data.message);
            if (res.data.success == true) {
              alert("Deleted Successfully");
              this.resetData();
              this.getAllCustomer();
            }
          });
      }
    },

    validate() {
      this.check =
        this.form.firstName != "" &&
        this.form.lastName != "" &&
        this.form.DOB != "" &&
        this.form.phone != "" &&
        this.form.email != "" &&
        this.form.address != "";
    },

    resetData() {
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.DOB == "";
      this.form.phone == "";
      this.form.email == "";
      this.form.address == "";
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
