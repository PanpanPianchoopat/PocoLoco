<template>
  <div class="EmployeeReg">
    <FormContainer>
      <div class="form-header">
        <h2>New Employee Registration</h2>
        <b>Please fill out your information below</b>
      </div>

      <InnerFormContainer>
        <div class="input-group">
          <div>
            <!-- Department -->
            <h4>Department</h4>
            <select @change="getRole" v-model="details.department">
              <option disabled value="">Department</option>
              <option value="1">Admin/Owner</option>
              <option value="2">Receptionist</option>
              <option value="3">Kitchen</option>
              <option value="4">Housekeeping</option>
              <option value="5">Security</option>
              <option value="6">Accounts and Credits</option>
              <option value="7">Maintenance</option>
            </select>
          </div>

          <!-- Role -->
          <div>
            <h4>Role</h4>
            <select v-model="details.roleID">
              <option disabled value>Role</option>
              <option
                v-for="(role, index) in roleDB"
                v-bind:key="index"
                :value="role.roleID"
              >
                {{ role.roleName }}
              </option>
            </select>
          </div>
        </div>

        <!-- Start Date -->
        <h4>Start Date</h4>
        <div class="flex x-full">
          <v-date-picker
            v-model="details.startDate"
            :masks="{ input: ['YYYY-MM-DD'] }"
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

        <!-- Shift -->
        <div>
          <h4>Shift</h4>
          <select v-model="details.shift">
            <option disabled value>Shift</option>
            <option value="1">05.00 - 13.00</option>
            <option value="2">13.00 - 21.00</option>
            <option value="3">21.00 - 05.00</option>
          </select>
        </div>

        <hr />

        <!-- First Name -->
        <div class="input-group">
          <div>
            <h4>First Name</h4>
            <input
              type="text"
              v-model="details.firstName"
              placeholder="ex. Poco"
            />
          </div>

          <!-- Lastname -->
          <div>
            <h4>Last Name</h4>
            <input
              type="text"
              v-model="details.lastName"
              placeholder="ex. Loco"
            />
          </div>
        </div>

        <!-- Identification -->
        <h4>ID Number / Passport Number</h4>
        <input
          type="text"
          v-model="details.identification"
          pattern="^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$"
        />

        <div class="input-group">
          <div>
            <!-- DOB -->
            <h4>Date of Birth</h4>
            <div class="flex x-full">
              <v-date-picker
                v-model="details.DOB"
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
          <div>
            <!-- Gender -->
            <h4>Gender</h4>
            <select v-model="details.gender">
              <option disabled value>Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>

        <!-- Phone -->
        <h4>Phone</h4>
        <input
          type="text"
          v-model="details.phone"
          placeholder="ex. 0812345678"
        />

        <!-- Email -->
        <h4>Email</h4>
        <input
          type="text"
          v-model="details.email"
          placeholder="ex. employee@mail.com"
        />

        <div class="input-group">
          <!-- Password -->
          <div>
            <h4>Password</h4>
            <input
              type="password"
              v-model="details.password"
              placeholder="Password"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <h4>Confirm Password</h4>
            <input
              type="password"
              v-model="details.cf_pass"
              placeholder="Password"
            />
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
          >CANCEL</DefaultButton
        >
        <DefaultButton :style="{ background: '#54CFD6' }" @click="addEmployee"
          >ADD</DefaultButton
        >
      </div>
    </FormContainer>
  </div>
</template>

<script>
import FormContainer from "../components/FormContainer.vue";
import DefaultButton from "../components/DefaultButton.vue";
import InnerFormContainer from "../components/InnerFormContainer.vue";
import axios from "axios";

export default {
  name: "EmployeeReg",
  components: { FormContainer, DefaultButton, InnerFormContainer },
  data() {
    return {
      startDate: null,
      birthDate: null,
      roleDB: null,
      details: {
        department: null,
        roleID: null,
        startDate: null,
        shift: null,
        firstName: null,
        lastName: null,
        identification: null,
        DOB: null,
        gender: null,
        phone: null,
        email: null,
        password: null,
        cf_pass: null,
      },
      selected: "role",
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      axios
        .get("http://localhost:8080/PocoLoco_db/api_addEmployee.php")
        .then((response) => {
          console.log("SUCCESSS");
        })
        .catch(() => {
          console.log("ERROR");
        });
    },

    getRole() {
      axios
        .post("http://localhost:8080/PocoLoco_db/api_addEmployee.php", {
          action: "getRole",
          department: this.details.department,
        })
        .then(
          function(res) {
            this.roleDB = res.data;
          }.bind(this)
        );
    },

    addEmployee(e) {
      e.preventDefault();
      axios
        .post("http://localhost:8080/PocoLoco_db/api_addEmployee.php", {
          action: "addEmployee",
          department: this.details.department,
          roleID: this.details.roleID,
          shift: this.details.shift,
          startDate: this.details.startDate,
          firstName: this.details.firstName,
          lastName: this.details.lastName,
          identification: this.details.identification,
          DOB: this.details.DOB,
          gender: this.details.gender,
          phone: this.details.phone,
          email: this.details.email,
          password: this.details.password,
          cf_pass: this.details.cf_pass,
        })
        .then(function(res) {
          console.log(res.data);
          //alert(res.data);
        });
    },
  },
};
</script>

<style>
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
.first-element {
  width: 350px;
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
  .input-group {
    flex-direction: column;
  }
  .form-header {
    padding: 20px 0 10px 10%;
  }
}
</style>
