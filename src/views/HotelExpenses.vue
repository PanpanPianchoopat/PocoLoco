<template>
  <Container>
    <Navbar />

    <h3>Hotel Expenses</h3>
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
        type="Filter"
        :options="selectionOption"
        :style="{ marginRight: '20px' }"
        @selection="selectionFilter"
      />
      <CustomSelect
        type="Sort by"
        :options="selectionOption"
        :style="{ marginRight: '20px' }"
        @selection="selectionSort"
      />
      <DefaultButton type="small" :style="width < 650 ? { width: '70px' } : {}">
        Search
      </DefaultButton>
      <AddButton
        :style="
          width < 800
            ? { position: 'fixed', right: '5%', top: '80px' }
            : { position: 'fixed', right: '5%', top: '170px' }
        "
        @click="goToAddExpense()"
      />
    </div>

    <table v-if="expenseDetail_db.length !== 0">
      <tr>
        <th>Informer</th>
        <th>Room Number</th>
        <th>Room Type</th>
        <th>Expense</th>
        <th>Date</th>
        <th>Manage</th>
      </tr>

      <tr
        v-for="(expense, i) in expenseDetail_db.slice(
          currentPage * tableRow - tableRow,
          currentPage * tableRow
        )"
        :key="i"
        class="row"
      >
        <td>{{ expense.employeeName }}</td>
        <td>{{ expense.roomID }}</td>
        <td>{{ expense.roomType }}</td>

        <td>{{ expense.expense }}</td>
        <td>{{ expense.expenseDate }}</td>
        <td>
          <div class="manage">
            <!--View-->
            <button
              class="manage-button"
              @click="getExpenseData('view', expense)"
            >
              <i class="fa fa-search fa-2x"></i>
            </button>
            <div class="vl"></div>
            <!--Edit-->
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
      :pageCount="Math.ceil(expenses.length / tableRow)"
      :paginationVisible="expenses.length > tableRow"
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
      <div class="user-pic">
        <div class="user-icon">
          <img :src="require(`../assets/${role}.png`)" />
        </div>
        <h4>{{ employeeID }}</h4>
      </div>
      <div>
        <h4>{{ informer }}</h4>
        <p class="subscript-text">{{ role }}</p>
      </div>
    </div>

    <div class="view-group">
      <div class="view-item">
        <p><b>Room No: </b>{{ room }}</p>
      </div>
      <div>
        <p><b>Room Type: </b>{{ roomType }}</p>
      </div>
    </div>
    <p :style="{ textAlign: 'justify' }"><b>Detail: </b>{{ detail }}</p>
    <div class="view-group">
      <div class="view-item">
        <p>
          <b :style="width > 700 ? { marginRight: '10px' } : { margin: '0' }">
            Amount:
          </b>
          {{ expenseAmount }}
          <b :style="width > 700 ? { marginLeft: '10px' } : { margin: '0 ' }">
            Baht
          </b>
        </p>
      </div>
      <div>
        <p><b>Date: </b>{{ date }}</p>
      </div>
    </div>
  </Popup>

  <!--Edit-->
  <Popup v-bind:visible="editVisible" :buttons="true" @popReturn="editReturn">
    <div class="popup-head">
      <div class="user-pic">
        <div class="user-icon">
          <img :src="require(`../assets/${role}.png`)" />
        </div>
        <h4>{{ employeeID }}</h4>
      </div>
      <div>
        <h4>{{ informer }}</h4>
        <p class="subscript-text">{{ role }}</p>
      </div>
    </div>

    <div class="input-group">
      <b :style="{ margin: '8px 10px 0 0' }">Room Number</b>
      <input type="text" :placeholder="room" :value="room" />
    </div>

    <div class="input-group">
      <b>Detail</b>
      <textarea :placeholder="detail" :value="detail" />
    </div>

    <div class="input-group" :style="{ marginTop: '20px' }">
      <div class="group-item">
        <b :style="{ marginBottom: '10px' }">Expense Amount</b>
        <div class="input-group">
          <input
            type="text"
            :placeholder="expenseAmount"
            :value="expenseAmount"
            :style="{ width: '80px', marginRight: '10px', textAlign: 'right' }"
          />
          <p :style="{ margin: '10px 0 0 0' }">Baht</p>
        </div>
      </div>
      <div>
        <b>Expense Date</b>
        <div class="flex x-full" :style="{ marginTop: '10px' }">
          <v-date-picker
            v-model="newExpenseDate"
            :masks="{ input: ['DD/MM/YYYY'] }"
            :model-config="dateConfig"
            mode="single"
            class="flex-grow"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <div :style="{ display: 'flex', flexDirection: 'row' }">
                <input
                  :value="inputValue"
                  v-on="inputEvents"
                  :placeholder="date"
                  :style="{ width: '120px' }"
                />
                <i
                  class="fa fa-calendar fa-2x"
                  :style="{
                    color: 'var(--primary-blue',
                    margin: '3px 0 0 -35px',
                  }"
                ></i>
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>
    </div>
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
import axios from "axios";

const selectionOption = [
  "All",
  "Informer",
  "Room No.",
  "Room Type",
  "Expense",
  "Date",
];

const expenses = [
  {
    informer: "Panpan panda",
    room: "1011",
    roomType: "Suite",
    expenseAmount: "6499",
    date: "3/11/2022",
    employeeID: "000000",
    role: "receptionist",
    detail: "fix broken toilet and replace television",
  },
  {
    informer: "Ying the stongest woman",
    room: "1001",
    roomType: "Standard",
    expenseAmount: "7000",
    date: "14/08/2022",
    employeeID: "000001",
    role: "maid",
    detail: "buy new washing machine",
  },
  {
    informer: "PJ mask",
    room: "2002",
    roomType: "Deluxe",
    expenseAmount: "7999",
    date: "24/12/2022",
    employeeID: "000100",
    role: "manager",
    detail: "pay the salary",
  },
  {
    informer: "Beambub bbubuu",
    room: "2023",
    roomType: "Superior",
    expenseAmount: "6999",
    date: "20/01/2022",
    employeeID: "001000",
    role: "chef",
    detail: "buy salmon and plates",
  },
  {
    informer: "Mewmew maree",
    room: "3003",
    roomType: "Suite",
    expenseAmount: "6499",
    date: "17/01/2022",
    employeeID: "010000",
    role: "receptionist",
    detail: "fix the hotel's telephone",
  },
  {
    informer: "Ddee thannapiann",
    room: "1414",
    roomType: "Deluxe",
    expenseAmount: "7999",
    date: "14/05/2022",
    employeeID: "100000",
    role: "owner",
    detail: "renovate water park",
  },
  {
    informer: "Tata the rouse",
    room: "7202",
    roomType: "Suite",
    expenseAmount: "6499",
    date: "07/08/2022",
    employeeID: "110000",
    role: "chef",
    detail: "buy a new fire extinguisher",
  },
  {
    informer: "Tata the rouse",
    room: "7202",
    roomType: "Suite",
    expenseAmount: "6499",
    date: "07/08/2022",
    employeeID: "110000",
    role: "chef",
    detail: "buy a new fire extinguisher",
  },
  {
    informer: "Tata the rouse",
    room: "7202",
    roomType: "Suite",
    expenseAmount: "6499",
    date: "07/08/2022",
    employeeID: "110000",
    role: "chef",
    detail: "buy a new fire extinguisher",
  },
  {
    informer: "Tata the rouse",
    room: "7202",
    roomType: "Suite",
    expenseAmount: "6499",
    date: "07/08/2022",
    employeeID: "110000",
    role: "chef",
    detail: "buy a new fire extinguisher",
  },
  {
    informer: "Tata the rouse",
    room: "7202",
    roomType: "Suite",
    expenseAmount: "6499",
    date: "07/08/2022",
    employeeID: "110000",
    role: "chef",
    detail: "buy a new fire extinguisher",
  },
];
export default {
  name: "HotelExpenses",
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
    const { height, tableRow } = useScreenHeight(420);
    return { width, height, tableRow };
  },
  data() {
    return {
      selectionOption,
      currentPage: 1,
      viewVisible: false,
      editVisible: false,
      check: false,
      search: "",
      sort: "",
      filter: "",
      expenseDetail_db: "",
      form: {
        expenseID: "",
        employeeID: "",
        employeeName: "",
        employeeRole: "",
        roomID: "",
        roomType: "",
        detail: "",
        expense: "",
        expenseDate: "",
        status: "save",
        isEdit: false,
      },

      expenses,

      informer: null,
      room: null,
      roomType: null,
      expenseAmount: null,
      date: null,
      employeeID: null,
      role: null,
      detail: null,
      newExpenseDate: null,
      dateConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },
  created() {
    this.getAllusers();
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
    getExpenseData(type, expense) {
      if (type === "view") {
        this.viewVisible = !this.viewVisible;
      }
      if (type === "edit") {
        this.editVisible = !this.editVisible;
      }
      this.informer = expense.informer;
      this.room = expense.room;
      this.roomType = expense.roomType;
      this.expenseAmount = expense.expenseAmount;
      this.date = expense.date;
      this.employeeID = expense.employeeID;
      this.role = expense.role;
      this.detail = expense.detail;
    },
    goToAddExpense() {
      this.$router.push("/AddExpense");
    },
    searchData(e) {
      e.preventDefault();
      console.log("search");
      axios
        .post("http://localhost:8080/PocoLoco_db/api_hotelExpense.php", {
          search: this.search,
          sort: this.sort,
          filter: this.filter,
          action: "SearchData",
        })
        .then(
          function(res) {
            console.log(res);
            this.expenseDetail_db = res.data;
          }.bind(this)
        );
    },

    submitData(e) {
      e.preventDefault();
      this.check =
        this.form.roomID != "" &&
        this.form.detail != "" &&
        this.form.expense != "" &&
        this.form.expenseDate != "";

      if (this.check && this.form.isEdit) {
        //Update Data
        axios
          .post("http://localhost:8080/PocoLoco_db/api_hotelExpense.php", {
            expenseID: this.form.expenseID,
            roomID: this.form.roomID,
            detail: this.form.detail,
            expense: this.form.expense,
            expenseDate: this.form.expenseDate,
            action: "update",
          })
          .then(
            function(res) {
              console.log(res.data);
              alert(res.data.message);
              this.resetData();
              this.getAllusers();
            }.bind(this)
          );
      }
    },

    resetData() {
      this.form.expenseID = "";
      this.form.employeeID = "";
      this.form.employeeName = "";
      this.form.employeeRole = "";
      this.form.roomID = "";
      this.form.roomType = "";
      this.form.detail = "";
      this.form.expense = "";
      this.form.expenseDate = "";
      this.form.isEdit = false;
    },

    getAllusers() {
      //ส่ง action ไปทำงานที่ php file
      axios
        .post("http://localhost:8080/PocoLoco_db/api_hotelExpense.php", {
          action: "getAll",
        })
        .then(
          function(res) {
            this.expenseDetail_db = res.data;
          }.bind(this)
        );
    },

    editData(id) {
      this.form.isEdit = true;
      //ส่งข้อมูลไป
      axios
        .post("http://localhost:8080/PocoLoco_db/api_hotelExpense.php", {
          action: "getEditData",
          expenseID: id,
        })
        .then(
          function(res) {
            console.log(res);
            this.form.expenseID = res.data.expenseID;
            this.form.employeeID = res.data.employeeID;
            this.form.employeeName = res.data.employeeName;
            this.form.employeeRole = res.data.employeeRole;
            this.form.roomID = res.data.roomID;
            this.form.detail = res.data.detail;
            this.form.expense = res.data.expense;
            this.form.expenseDate = res.data.expenseDate;
          }.bind(this)
        );
    },

    deleteData(id) {
      if (confirm("Do you want to delete ID " + id + "?")) {
        axios
          .post("http://localhost:8080/PocoLoco_db/api_hotelExpense.php", {
            action: "deleteData",
            expenseID: id,
          })
          .then(function(res) {
            alert(res.data.message);
            this.resetData();
            this.getAllusers();
          });
      }
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
  margin: 0 5px;
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
.user-pic {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.user-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-yellow);
  color: white;
  margin: 15px 25px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 20px;
  overflow: hidden;
}
img {
  width: 35px;
  padding-top: 10px;
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
.group-item {
  width: 60%;
  display: flex;
  flex-direction: column;
}
input {
  width: 180px;
  height: 35px;
  padding-left: 10px;
  margin-bottom: 20px;
  color: var(--header-color);
}
textarea {
  width: 100%;
  padding: 10px;
  height: 100px;
  margin-left: 10px;
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
  width: 45%;
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
