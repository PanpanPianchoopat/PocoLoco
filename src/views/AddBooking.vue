<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Booking</h2>
    </div>

    <InnerFormContainer>
      <h3>Booking ID:</h3>
      <div class="input-group">
        <h4>Customer ID</h4>
        <input type="text" />
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
    name: "AddBooking",
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
