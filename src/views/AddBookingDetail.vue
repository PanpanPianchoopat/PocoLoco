<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Booking Detail</h2>
    </div>

    <InnerFormContainer>
      <div :style="{ alignSelf: 'center', paddingLeft: '60px' }">
        <div class="input-group">
          <!-- Guest's First Name -->
          <div>
            <h4>Guest's First Name</h4>
            <input
              v-model="details.guestFirstName"
              @change="validate"
              type="text"
              placeholder="ex. Poco"
            />
          </div>

          <!-- Guest's Last Name -->
          <div>
            <h4>Guest's Last Name</h4>
            <input
              v-model="details.guestLastName"
              @change="validate"
              type="text"
              placeholder="ex. Loco"
            />
          </div>
        </div>

        <!-- Room Type -->
        <div>
          <h4>Room Type</h4>
          <select v-model="details.roomType" @change="validate">
            <option disabled value>Room Type</option>
            <option
              v-for="(room, index) in typeDB"
              v-bind:key="index"
              :value="room.roomTypeID"
            >
              {{ room.roomType }}
            </option>
          </select>
        </div>

        <!-- Check In Date -->
        <div class="input-group">
          <div>
            <h4>Check In Date</h4>
            <div class="flex x-full">
              <v-date-picker
                v-model="details.checkIn"
                @click="validate"
                :masks="{ input: ['DD/MM/YYYY'] }"
                :model-config="inDateConfig"
                mode="single"
                class="flex-grow"
              >
                <template v-slot="{ inputValue, inputEvents }">
                  <div :style="{ display: 'flex', flexDirection: 'row' }">
                    <input
                      :value="inputValue"
                      v-on="inputEvents"
                      :style="{ width: '150px', marginRight: '0' }"
                    />
                    <i class="fa fa-calendar fa-2x"></i>
                  </div>
                </template>
              </v-date-picker>
            </div>
          </div>

          <!-- Check Out Date -->
          <div>
            <h4>Check Out Date</h4>
            <div class="flex x-full">
              <v-date-picker
                v-model="details.checkOut"
                :masks="{ input: ['DD/MM/YYYY'] }"
                :model-config="outDateConfig"
                mode="single"
                class="flex-grow"
                @click="validate"
              >
                <template v-slot="{ inputValue, inputEvents }">
                  <div :style="{ display: 'flex', flexDirection: 'row' }">
                    <input
                      :value="inputValue"
                      v-on="inputEvents"
                      :style="{ width: '150px', marginRight: '0' }"
                    />
                    <i class="fa fa-calendar fa-2x"></i>
                  </div>
                </template>
              </v-date-picker>
            </div>
          </div>
        </div>
      </div>

      <!-- Room Number Table -->
      <table v-bind:style="roomDB.length !== 0 ? {} : { display: 'none' }">
        <tr>
          <th>Room Number</th>
          <!-- <th>Room Type</th> -->
          <th>Select</th>
        </tr>

        <tr
          v-for="(room, index) in roomDB"
          v-bind:key="index"
          :value="room"
          :style="[
            details.roomNumber.includes(room.roomID)
              ? { background: 'pink' }
              : {},
          ]"
        >
          <!-- room number -->
          <td>{{ room.roomID }}</td>

          <!-- room type in table -->
          <!-- <td>{{ room.roomType }}</td> -->
          <!-- <div v-for="(type, index) in typeDB" v-bind:key="index" :value="type">
            <td v-if="details.roomType == type.roomTypeID">
              {{ type.roomType }}
            </td>
          </div> -->

          <!-- Select Button -->
          <td>
            <!-- @change="checkOne(details.roomNumber[details.roomNumber.length - 1])" -->
            <input
              type="checkbox"
              v-model="details.roomNumber"
              :value="room.roomID"
              class="checkbox"
            />
          </td>
        </tr>
      </table>
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
      <DefaultButton
        @click="addBookingDetail"
        :style="{ background: '#54CFD6' }"
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
  name: "AddBookingDetail",
  components: { FormContainer, DefaultButton, InnerFormContainer },
  data() {
    return {
      typeDB: "",
      roomDB: "",
      canGet: false,
      details: {
        bookingID: "",
        guestFirstName: "",
        guestLastName: "",
        roomType: "",
        typeName: "",
        roomNumber: [],
        checkIn: "",
        checkOut: "",
      },
      inDateConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
      outDateConfig: {
        type: "string",
        mask: "YYYY-MM-DD",
      },
    };
  },

  created() {
    this.details.bookingID = this.$route.params.bookingID;
    this.getRoomType();
  },

  methods: {
    checkOne(room) {
      console.log(this.details.roomNumber);
      if (this.details.roomNumber.length > 1) {
        this.details.roomNumber = [];
        this.details.roomNumber[0] = room;
      }
    },

    getRoomType() {
      axios
        .post("http://localhost:8080/PocoLoco_db/api_bookingDetail.php", {
          action: "getRoomType",
        })
        .then(
          function(res) {
            this.typeDB = res.data;
          }.bind(this)
        );
    },

    validate() {
      if (
        this.details.guestFirstName != "" &&
        this.details.guestLastName != "" &&
        this.details.roomType != "" &&
        this.details.checkIn != "" &&
        this.details.checkOut != ""
      ) {
        this.getRoomNumber();
      }
    },

    getRoomNumber() {
      axios
        .post("http://localhost:8080/PocoLoco_db/api_bookingDetail.php", {
          action: "getRoomNumber",
          roomType: this.details.roomType,
          checkIn: this.details.checkIn,
          checkOut: this.details.checkOut,
        })
        .then(
          function(res) {
            this.roomDB = res.data;
            console.log(res);
          }.bind(this)
        );
    },

    addBookingDetail(e) {
      e.preventDefault();
      axios
        .post("http://localhost:8080/PocoLoco_db/api_bookingDetail.php", {
          action: "addBookingDetail",
          bookingID: this.details.bookingID,
          guestFirstName: this.details.guestFirstName,
          guestLastName: this.details.guestLastName,
          roomNumber: this.details.roomNumber,
          checkIn: this.details.checkIn,
          checkOut: this.details.checkOut,
        })
        .then(
          function(res) {
            console.log(res);
            if (res.data.success == true) {
              alert("Saved Successful");
              this.$router.push({
                name: "AddBooking",
                params: { bookingID: this.$bookingID },
              });
            }
          }.bind(this)
        );
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
b {
  color: white;
  font-size: 18px;
}
hr {
  width: 80%;
  color: black;
  margin: 40px auto;
}
.input-group {
  width: 100%;
  display: flex;
  flex-direction: row;
}
input {
  width: 300px;
  height: 35px;
  margin: 0 80px 40px 0;
  padding-left: 10px;
}
select {
  width: 220px;
  height: 40px;
  margin: 0 180px 30px 0;
  padding-left: 10px;
}
table {
  width: 100%;
  max-width: 470px;
  align-self: center;
  border: 1px solid black;
  border-collapse: collapse;
  margin-top: 25px;
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
  background: #f0f0f0;
}
.checkbox {
  width: 20px;
  height: 20px;
  margin: 5px auto 0 auto;
}
.checkbox:checked:before {
  background-color: green;
}
i {
  color: #0a96b7;
  margin: 5px 0 0 -35px;
  padding-right: 240px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 45px 0;
}
*:focus {
  outline: 0;
}
@media (max-width: 1000px) {
  .input-group {
    flex-direction: column;
  }
  .form-header {
    padding: 20px 0 10px 10%;
  }
}
</style>
