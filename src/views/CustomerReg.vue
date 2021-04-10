<template>
  <FormContainer>
    <div class="form-header">
      <h2>New Customer Registration</h2>
    </div>

    <InnerFormContainer>
      <h3>Customer ID:</h3>

      <div class="input-group">
        <!-- FirstName -->
        <div v-if="firstNameError">
          <h4>First Name</h4>
          <input v-model="form.firstName" type="text" placeholder="ex. Poco" />
        </div>
        <!-- FirstName Error -->
        <div v-else>
          <h4 style="color:red">First Name</h4>
          <input v-model="form.firstName" type="text" placeholder="ex. Poco" />
        </div>

        <!-- LastName -->
        <div v-if="lastNameError">
          <h4>Last Name</h4>
          <input v-model="form.lastName" type="text" placeholder="ex. Loco" />
        </div>
        <!-- LastName Error -->
        <div v-else>
          <h4 style="color:red">Last Name</h4>
          <input v-model="form.lastName" type="text" placeholder="ex. Loco" />
        </div>
      </div>

      <div class="input-group">
        <!-- DOB -->
        <div v-if="DOBError">
          <h4>Date of Birth</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="form.DOB"
              :masks="{ input: ['YYYY-MM-DD'] }"
              mode="single"
              class="flex-group"
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
        <!-- DOB Error -->
        <div v-else>
          <h4 style="color:red">Date of Birth</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="form.DOB"
              :masks="{ input: ['YYYY-MM-DD'] }"
              mode="single"
              class="flex-group"
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

        <!-- Gender -->
        <div v-if="genderError">
          <h4>Gender</h4>
          <select
            v-model="form.gender"
            class="form-select"
            aria-label="Default select example"
          >
            <option disabled value>Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <!-- Gender Error -->
        <div v-else>
          <h4 style="color:red">Gender</h4>
          <select
            v-model="form.gender"
            class="form-select"
            aria-label="Default select example"
          >
            <option disabled value>Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      <div v-if="phoneError">
        <h4>Phone</h4>
        <input v-model="form.phone" type="text" placeholder="ex. 0812345678" />
      </div>

      <div v-else>
        <h4 style="color: red">Phone</h4>
        <input v-model="form.phone" type="text" placeholder="ex. 0812345678" />
      </div>

      <div v-if="emailError">
        <h4>Email</h4>
        <input
          v-model="form.email"
          type="text"
          placeholder="ex. customers@mail.com"
        />
      </div>

      <div v-else>
        <h4 style="color: red">Email</h4>
        <input
          v-model="form.email"
          type="text"
          placeholder="ex. customers@mail.com"
        />
      </div>

      <div v-if="addressError">
        <h4>Address</h4>
        <input v-model="form.address" type="text" :style="{ width: '100%' }" />
      </div>

      <div v-else>
        <h4 style="color: red">Address</h4>
        <input v-model="form.address" type="text" :style="{ width: '100%' }" />
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
  name: "CustomerReg",
  components: { FormContainer, DefaultButton, InnerFormContainer },
  data() {
    return {
      birthDate: null,
      customer: "",
      message: "New Customer Registration",

      firstNameError: true,
      lastNameError: true,
      DOBError: true,
      genderError: true,
      phoneError: true,
      emailError: true,
      addressError: true,
      check: false,

      form: {
        id: "",
        firstName: "",
        lastName: "",
        DOB: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
      },
    };
  },

  methods: {
    submitData(e) {
      e.preventDefault();
      this.check =
        this.form.firstName != "" &&
        this.form.lastName != "" &&
        this.form.DOB != "" &&
        this.form.gender != "" &&
        this.form.phone != "" &&
        this.form.email != "" &&
        this.form.address != "";
      //Check First Name
      if (this.form.firstName == "") {
        this.firstNameError = false;
      }
      if (this.form.firstName != "") {
        this.firstNameError = true;
      }
      // Check Last Name
      if (this.form.lastName == "") {
        this.lastNameError = false;
      }
      if (this.form.lastName != "") {
        this.lastNameError = true;
      }
      // Check DOB
      if (this.form.DOB == "") {
        this.DOBError = false;
      }
      if (this.form.DOB != "") {
        this.DOBError = true;
      }
      // Check gender
      if (this.form.gender == "") {
        this.genderError = false;
      }
      if (this.form.gender != "") {
        this.genderError = true;
      }
      // Check phone
      if (this.form.phone == "") {
        this.phoneError = false;
      }
      if (this.form.phone != "") {
        this.phoneError = true;
      }
      // Check email
      if (this.form.email == "") {
        this.emailError = false;
      }
      if (this.form.email != "") {
        this.emailError = true;
      }
      // Check address
      if (this.form.address == "") {
        this.addressError = false;
      }
      if (this.form.address != "") {
        this.addressError = true;
      }
      if (this.check) {
        // Save Data
        console.log("555555555555");
        axios
          .post("http://localhost:8080/PocoLoco_db/api_addCustomer.php", {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            DOB: this.form.DOB,
            gender: this.form.gender,
            phone: this.form.phone,
            email: this.form.email,
            address: this.form.address,
            action: "insert",
          })
          .then(function(res) {
            console.log(res);
            //app.resetData(); //app คือ method เรียก method
          });
      }
    },
    resetData(e) {
      this.form.id = "";
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.DOB = "";
      this.form.gender = "";
      this.form.phone = "";
      this.form.email = "";
      this.form.address = "";
      // this.form.status = "save";
      // this.form.isEdit = false;
    },
  },
};
</script>

<style></style>
