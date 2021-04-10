<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Booking</h2>
    </div>

    <InnerFormContainer>
      <div >
        <h3>Booking ID: 1000051231315</h3>
      </div>
      <div class="input-group">
        <div>
            <h4 style="display: inline-block; margin-right: 10px;">Customer ID: </h4>
            <input type="text" placeholder="ex. 21554321" />
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

<style></style>
