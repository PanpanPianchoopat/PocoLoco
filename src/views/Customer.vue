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
        />
      </div>
      <DefaultButton @click="searchData" type="small">Search</DefaultButton>
      <AddButton
        :style="{ position: 'fixed', right: '5%', top: '170px' }"
        @click="goToCustomerReg()"
      />
    </div>

    <table v-bind:style="customer_db.length !== 0 ? {} : { display: 'none' }">
      <tr>
        <th>Rank</th>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Number of stay</th>
        <th>Manage</th>
      </tr>

      <tr
        v-for="(customer, index) in customer_db.slice(
          currentPage * numberPerPage - numberPerPage,
          currentPage * numberPerPage
        )"
        v-bind:key="index"
        class="row"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ customer.customerID }}</td>
        <td>{{ customer.customerName }}</td>
        <td>{{ customer.phone }}</td>
        <td>{{ customer.numberStay }}</td>
        <td>
          <div class="manage">
            <button
              class="manage-button"
              @click="editData(customer.customerID)"
            >
              <i class="fa fa-pencil fa-2x"></i>
            </button>
            <!-- <div class="vl"></div>
            <button class="manage-button">
              <i class="fa fa-trash fa-2x" :style="{}"></i>
            </button> -->
          </div>
        </td>
      </tr>
    </table>

    <PaginationBar
      :pageCount="Math.ceil(customer_db.length / numberPerPage)"
      :paginationVisible="customer_db.length > numberPerPage"
      @pageReturn="pageReturn"
      :style="
        windowWidth <= 1000
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
  <Popup v-bind:visible="visible" @popReturn="popReturn">
    <div class="popup-head">
      <div>Department: {{ department }}</div>
      <div>Role: {{ role }}</div>
    </div>
    <p>First Name</p>
    <div :style="{ paddingBottom: '20px' }">
      <input
        type="text"
        :value="salary"
        :placeholder="Firstname"
        :style="{ marginRight: '10px' }"
      />
      Baht
    </div>
    <p>Bonus Rate</p>
    <input
      type="text"
      :value="bonusRate"
      :placeholder="bonusRate"
      :style="{ width: '95%' }"
    />
  </Popup>
</template>

<script>
import DefaultButton from "../components/DefaultButton.vue";
import Navbar from "../components/Navbar.vue";
import Container from "../components/Container.vue";
import PaginationBar from "../components/PaginationBar.vue";
import AddButton from "../components/AddButton.vue";
import Popup from "../components/Popup.vue";
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
  data() {
    return {
      numberPerPage: 4,
      currentPage: 1,
      visible: false,

      navOpen: true,
      windowWidth: self.innerWidth,
      windowHeight: self.innerHeight,

      search: "",
      customer_db: "",
      check: false,
      form: {
        customerID: "",
        firstName: "",
        lastName: "",
        DOB: "",
        phone: "",
        email: "",
        address: "",
        isEdit: false,
      },
    };
  },

  created() {
    this.getCustomer();
  },

  mounted() {
    this.$nextTick(() => {
      self.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    self.removeEventListener("resize", this.onResize);
  },
  methods: {
    pageReturn(page) {
      this.currentPage = page;
    },

    popReturn(value) {
      this.visible = value;
    },

    getRecord(department, role, salary, bonus) {
      this.visible = !this.visible;
      this.department = department;
      this.role = role;
      this.salary = salary;
      this.bonusRate = bonus;
    },

    goToCustomerReg() {
      this.$router.push("/CustomerReg");
    },

    navReturn(isOpen) {
      this.navOpen = isOpen;
    },

    onResize() {
      this.windowWidth = self.innerWidth;
      this.windowHeight = self.innerHeight;
      this.numberPerPage = Math.floor((this.windowHeight - 450) / 35);
      if (this.windowWidth <= 1000) {
        this.visible = false;
      }
    },

    getCustomer() {
      axios
        .post("http://localhost:8080/PocoLoco_db/api_customer.php", {
          action: "getCustomer",
        })
        .then(
          function(res) {
            this.customer_db = res.data;
          }.bind(this)
        );
    },

    searchData(e) {
      e.preventDefault();
      axios
        .post("http://localhost:8080/PocoLoco_db/api_customer.php", {
          search: this.search,
          action: "searchData",
        })
        .then(
          function(res) {
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
                this.getCustomer();
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
              this.getCustomer();
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
.icon-wrap {
  position: absolute;
  z-index: 0;
  padding: 5px 20px;
}
.search-field {
  width: 225px;
  height: 30px;
  padding-left: 45px;
  font-size: 18px;
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
input {
  width: 250px;
  height: 35px;
  align-self: center;
  padding-left: 10px;
  color: var(--header-color);
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
}
@media (max-width: 700px) {
  table {
    width: 80%;
  }
  .search-field {
    width: 150px;
    font-size: 16px;
  }
}
</style>
