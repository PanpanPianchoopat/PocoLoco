<template>
  <FormContainer>
    <h2>New Employee Registration</h2>
    <b>Please fill out your information below</b>
    <div class="form">
      <div class="inner-container">
        <h3>EmployeeID:</h3>

        <div class="input-row">
          <div class="first-element"><h4>Department</h4></div>
          <div><h4>Role</h4></div>
        </div>
        <div class="input-row">
          <select></select>
          <select></select>
        </div>

        <h4>Start Date</h4>
        <div class="flex x-full">
          <v-date-picker
            v-model="startDate"
            :masks="{ input: ['YYYY-MM-DD'] }"
            mode="single"
            class="flex-grow"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <input
                :value="inputValue"
                v-on="inputEvents"
                :style="{ width: '150px' }"
              />
            </template>
          </v-date-picker>
        </div>
        <hr />

        <div class="input-row">
          <div class="first-element"><h4>First Name</h4></div>
          <div><h4>Last Name</h4></div>
        </div>
        <div class="input-row">
          <input type="text" placeholder="ex. Poco" />
          <input type="text" placeholder="ex. Loco" />
        </div>

        <h4>ID Number / Passport Number</h4>
        <input type="text" />

        <div class="input-row">
          <div :style="{ width: '300px' }"><h4>Date of Birth</h4></div>
          <div><h4>Gender</h4></div>
        </div>
        <div class="input-row">
          <div class="flex x-full">
            <v-date-picker
              v-model="birthDate"
              :masks="{ input: ['YYYY-MM-DD'] }"
              mode="single"
              class="flex-grow"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <input
                  :value="inputValue"
                  v-on="inputEvents"
                  :style="{ width: '150px', marginRight: '140px' }"
                />
              </template>
            </v-date-picker>
          </div>
          <select></select>
        </div>

        <h4>Phone</h4>
        <input type="text" placeholder="ex. 0812345678" />

        <h4>Email</h4>
        <input type="text" placeholder="ex. employee@mail.com" />

        <div class="input-row">
          <div class="first-element"><h4>Password</h4></div>
          <div><h4>Confirm Password</h4></div>
        </div>
        <div class="input-row">
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
    </div>
    <div class="buttons">
      <DefaultButton :style="{ background: '#FF8E8E', marginRight: '110px' }"
        >CANCEL</DefaultButton
      >
      <DefaultButton :style="{ background: '#54CFD6' }">ADD</DefaultButton>
    </div>
  </FormContainer>
</template>

<script>
  import FormContainer from "../components/FormContainer.vue";
  import DefaultButton from "../components/DefaultButton.vue";
  export default {
    components: { FormContainer, DefaultButton },
    data() {
      return {
        startDate: null,
        birthDate: null,
      };
    },
  };
</script>

<style scoped>
  h2 {
    color: white;
    font-size: 36px;
    line-height: 10px;
  }
  h3 {
    font-size: 24px;
    padding-bottom: 15px;
  }
  h4 {
    line-height: 10px;
  }
  b {
    color: white;
    font-size: 18px;
  }
  .form {
    width: 100%;
    height: auto;
    margin-top: 30px;
    background-color: white;
  }
  hr {
    width: 765px;
    color: black;
    margin: 40px auto;
  }
  .first-element {
    width: 350px;
  }
  .inner-container {
    padding: 40px 90px;
    display: flex;
    flex-direction: column;
  }
  .input-row {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  input {
    width: 300px;
    height: 35px;
    margin: 0 40px 30px 0;
    padding-left: 10px;
  }
  select {
    width: 220px;
    height: 40px;
    margin: 0 130px 30px 0;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 45px;
  }
</style>
