<template>
  <FormContainer>
    <div class="form-header">
      <h2>New Customer Registration</h2>
    </div>

    <InnerFormContainer>
      <h3>Customer ID:</h3>

      <div class="input-group">
        <div>
          <h4>First Name</h4>
          <input type="text" placeholder="ex. Poco" />
        </div>
        <div>
          <h4>Last Name</h4>
          <input type="text" placeholder="ex. Loco" />
        </div>
      </div>

      <div class="input-group">
        <div>
          <h4>Date of Birth</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="birthDate"
              :masks="{ input: ['DD/MM/YYYY'] }"
              :model-config="dateConfig"
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
          <h4>Gender</h4>
          <select></select>
        </div>
      </div>

      <h4>Phone</h4>
      <input type="text" placeholder="ex. 0812345678" />

      <h4>Email</h4>
      <input type="text" placeholder="ex. customers@mail.com" />

      <h4>Address</h4>
      <input type="text" :style="{ width: '100%' }" />
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
      <DefaultButton>ADD</DefaultButton>
    </div>
  </FormContainer>
</template>

<script>
  import FormContainer from "../components/FormContainer.vue";
  import DefaultButton from "../components/DefaultButton.vue";
  import InnerFormContainer from "../components/InnerFormContainer.vue";
  export default {
    name: "CustomerReg",
    components: { FormContainer, DefaultButton, InnerFormContainer },
    data() {
      return {
        birthDate: null,
        dateConfig: {
          type: "string",
          mask: "YYYY-MM-DD",
        },
      };
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
    color: var(--primary-blue);
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
