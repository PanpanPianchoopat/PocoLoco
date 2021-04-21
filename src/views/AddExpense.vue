<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Hotel Expenses</h2>
    </div>

    <InnerFormContainer>
      <h4 :style="{ paddingBottom: '20px' }">Employee ID: XXXXXXXXX</h4>

      <!-- Room number -->
      <div class="input-group" v-if="roomNumberError">
        <h4>Room Number</h4>
        <input type="text" v-model="form.roomNumber" />
      </div>
      <!-- Room number Error -->
      <div class="input-group" v-else>
        <h4 style="color:red">Room Number</h4>
        <input type="text" v-model="form.roomNumber" />
      </div>

      <!-- Detail -->
      <div class="input-group" v-if="detailError">
        <h4>Detail</h4>
        <textarea v-model="form.detail" />
      </div>
      <div class="input-group" v-else>
        <h4 style="color:red">Detail</h4>
        <textarea v-model="form.detail" />
      </div>

      <!-- Expense -->
      <div class="two-inline">
        <div class="input-group" v-if="expenseError">
          <h4>Expense</h4>
          <div :style="{ display: 'flex', flexDirection: 'row' }">
            <input type="number" v-model="form.expense" />
            <p class="unit">Baht</p>
          </div>
        </div>
        <div class="input-group" v-else>
          <h4 style="color:red">Expense</h4>
          <div :style="{ display: 'flex', flexDirection: 'row' }">
            <input type="number" v-model="form.expense" />
            <p class="unit">Baht</p>
          </div>
        </div>

        <!-- Expense Date -->
        <div class="input-group" v-if="expenseDateError">
          <h4>Expense Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="form.expenseDate"
              :masks="{ input: ['YYYY-MM-DD'] }"
              mode="single"
              class="flex-grow"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <div :style="{ display: 'flex', flexDirection: 'row' }">
                  <input
                    :value="inputValue"
                    v-on="inputEvents"
                    :style="{ width: '150px' }"
                  />
                  <i class="fa fa-calendar fa-2x"></i>
                </div>
              </template>
            </v-date-picker>
          </div>
        </div>
        <div class="input-group" v-else>
          <h4 style="color:red">Expense Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="form.expenseDate"
              :masks="{ input: ['YYYY-MM-DD'] }"
              mode="single"
              class="flex-grow"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <div :style="{ display: 'flex', flexDirection: 'row' }">
                  <input
                    :value="inputValue"
                    v-on="inputEvents"
                    :style="{ width: '150px' }"
                  />
                  <i class="fa fa-calendar fa-2x"></i>
                </div>
              </template>
            </v-date-picker>
          </div>
        </div>
      </div>
    </InnerFormContainer>
    <div class="buttons">
      <DefaultButton
        :style="{
          background: 'none',
          marginRight: '110px',
          border: '3px solid white',
        }"
        @click="resetData"
        >CANCEL</DefaultButton
      >
      <DefaultButton :style="{ background: '#54CFD6' }" @click="submitData"
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
  name: "AddExpense",
  components: { FormContainer, DefaultButton, InnerFormContainer },
  data() {
    return {
      roomNumberError: true,
      detailError: true,
      expenseError: true,
      expenseDateError: true,
      check: false,
      form: {
        roomNumber: "",
        detail: "",
        expenseDate: "",
        expense: "",
      },
    };
  },
  methods: {
    submitData(e) {
      e.preventDefault();
      this.validate();
      if (this.check) {
        // Save Data
        axios
          .post("http://localhost:8080/PocoLoco_db/api_hotelExpense.php", {
            roomNumber: this.form.roomNumber,
            detail: this.form.detail,
            expenseDate: this.form.expenseDate,
            expense: this.form.expense,
            action: "insert",
          })
          .then(
            function(res) {
              if (res.data.success == true) {
                alert("Saved Successful");
                this.resetData();
              } else {
                this.message = res.data.message;
              }
            }.bind(this)
          );
      }
    },

    validate() {
      this.check =
        this.form.roomNumber != "" &&
        this.form.detail != "" &&
        this.form.expense != "" &&
        this.form.expenseDate != "";

      if (this.form.roomNumber == "") {
        this.roomNumberError = false;
      }
      if (this.form.detail == "") {
        this.detailError = false;
      }
      if (this.form.expense == "") {
        this.expenseError = false;
      }
      if (this.form.expenseDate == "") {
        this.expenseDateError = false;
      }
      if (this.form.roomNumber != "") {
        this.roomNumberError = true;
      }
      if (this.form.detail != "") {
        this.detailError = true;
      }
      if (this.form.expense != "") {
        this.expenseError = true;
      }
      if (this.form.expenseDate != "") {
        this.expenseDateError = true;
      }
    },

    resetData(e) {
      this.form.roomNumber = "";
      this.form.detail = "";
      this.form.expense = "";
      this.form.expenseDate = "";
      this.expenseDateError = true;
      this.roomNumberError = true;
      this.detailError = true;
      this.expenseError = true;
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
.input-group {
  width: 100%;
  display: flex;
  flex-direction: row;
}
input {
  width: 150px;
  height: 35px;
  margin: 10px 0 35px 20px;
  padding-left: 10px;
}
textarea {
  width: 100%;
  height: 250px;
  margin: 20px 0 35px 35px;
  padding: 10px;
}
.unit {
  padding: 5px 40px 0 10px;
}
.two-inline {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 45px 0;
}
i {
  color: #0a96b7;
  margin: 15px 0 0 -35px;
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
  input {
    margin: 0 0 35px 0;
  }
  .two-inline {
    flex-direction: column;
  }
  i {
    margin: 5px 0 0 -35px;
  }
  textarea {
    height: 200px;
    margin: 0 0 35px 0;
    padding: 10px;
  }
  .unit {
    padding: 0 40px 0 10px;
  }
}
</style>
