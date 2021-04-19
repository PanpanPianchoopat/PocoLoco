<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Booking</h2>
    </div>

    <InnerFormContainer>
      <h3>Booking ID: {{ bookingID }}</h3>
      <div class="input-group">
        <h4>Customer ID</h4>
        <input v-model="customerID" type="text" />
        <h4 style="color:red">{{ message }}</h4>
      </div>

      <!-- Table -->
      <!-- ฺBooking Detail -->
      <div>
        <table style="width:100%">
          <!-- head -->
          <tr>
            <th>Booking Detail ID</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Manage</th>
          </tr>
          <!-- detail -->
          <tr
            v-for="(detail, index) in bookingDetail_db"
            v-bind:key="index"
            :value="detail"
          >
            <!-- BookingDetail ID -->
            <td>{{ detail.bookingDetailID }}</td>

            <!-- Room Number -->
            <td>{{ detail.roomID }}</td>

            <!-- Room Type -->
            <td>{{ detail.roomType }}</td>

            <!-- Select Button -->
            <td>
              <button @click="deleteDetail(detail.bookingDetailID)">
                Delete
              </button>
            </td>
          </tr>
        </table>
      </div>

      <!-- Add Booking Detail -->
      <div class="buttons">
        <DefaultButton
          @click="
            $router.push({
              name: 'AddBookingDetail',
              params: { bookingID },
            })
          "
          :style="{ background: '#54CFD6' }"
          >ADD</DefaultButton
        >
      </div>
    </InnerFormContainer>
    <div class="buttons">
      <DefaultButton
        :style="{
          background: 'none',
          marginRight: '110px',
          border: '3px solid white',
        }"
        >CANCEL</DefaultButton
      >
      <DefaultButton @click="addBooking" :style="{ background: '#54CFD6' }"
        >ADD</DefaultButton
      >
    </div>
  </FormContainer>
</template>

<script>
import FormContainer from "../components/FormContainer.vue";
import DefaultButton from "../components/DefaultButton.vue";
import InnerFormContainer from "../components/InnerFormContainer.vue";
import axios from "axios";

export default {
  name: "AddBooking",
  components: { FormContainer, DefaultButton, InnerFormContainer },
  data() {
    return {
      bookingID: "",
      customerID: "",
      bookingDetail_db: "",
      message: "",
    };
  },

  created() {
    this.getBookingID();
  },

  methods: {
    getBookingID() {
      axios
        .post("http://localhost:8080/PocoLoco_db//api_booking.php", {
          action: "getBookingID",
        })
        .then(
          function(res) {
            this.bookingID = res.data;
            this.getBookingDetail();
          }.bind(this)
        );
    },

    getBookingDetail() {
      axios
        .post("http://localhost:8080/PocoLoco_db//api_booking.php", {
          action: "getBookingDetail",
          bookingID: this.bookingID,
        })
        .then(
          function(res) {
            this.bookingDetail_db = res.data;
          }.bind(this)
        );
    },

    deleteDetail(id) {
      if (confirm("Do you want to delete ID " + id + "?")) {
        axios
          .post("http://localhost:8080/PocoLoco_db//api_booking.php", {
            action: "deleteBookingdetail",
            bookingDetail: id,
          })
          .then(
            function(res) {
              if (res.data.success == true) {
                this.getBookingDetail();
              }
            }.bind(this)
          );
      }
    },

    addBooking() {
      if (this.customerID != "") {
        axios
          .post("http://localhost:8080/PocoLoco_db/api_booking.php", {
            action: "addBooking",
            bookingID: this.bookingID,
            customerID: this.customerID,
          })
          .then(
            function(res) {
              console.log(res);
              this.message = res.data.message;
            }.bind(this)
          );
      } else {
        this.message = "Please fill Customer ID";
      }
    },
  },
};
</script>

<style scoped>
.form-header {
  padding: 90px 0 10px 10%;
}
h2 {
  color: white;
  font-size: 36px;
  margin-bottom: 10px;
}
h3 {
  font-size: 24px;
  padding-bottom: 15px;
}
.input-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
input {
  width: 300px;
  height: 35px;
  margin-left: 10px;
  align-self: center;
  padding-left: 10px;
}
table,
th,
td {
  border: 1px solid black;
  margin: none;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 45px 0;
}
i {
  color: #0a96b7;
  margin: 5px 0 0 -35px;
  padding-right: 240px;
}
*:focus {
  outline: 0;
}
@media (max-width: 1000px) {
  .form-header {
    padding: 20px 0 10px 10%;
  }
}
</style>
