<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Booking Detail</h2>
    </div>

    <InnerFormContainer>
      <div class="input-group">
        <div>
          <h4>Guest's First Name</h4>
          <input type="text" placeholder="ex. Poco" />
        </div>
        <div>
          <h4>Guest's Last Name</h4>
          <input type="text" placeholder="ex. Loco" />
        </div>
      </div>

      <div>
        <h4>Room Type</h4>
        <select></select>
      </div>

      <div class="input-group">
        <div>
          <h4>Check In Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="inDate"
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
        </div>
        <div>
          <h4>Check Out Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="outDate"
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
      <DefaultButton :style="{ background: '#54CFD6' }">ADD</DefaultButton>
    </div>
  </FormContainer>
</template>

<script>
  import FormContainer from "../components/FormContainer.vue";
  import DefaultButton from "../components/DefaultButton.vue";
  import InnerFormContainer from "../components/InnerFormContainer.vue";
  export default {
    name: "AddBookingDetail",
    components: { FormContainer, DefaultButton, InnerFormContainer },
    data() {
      return {
        inDate: null,
        outDate: null,
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
