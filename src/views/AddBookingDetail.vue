<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Booking Detail</h2>
      <b>Booking ID:</b>
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

      <div class="input-group">
        <div>
          <h4>Room Type</h4>
          <select></select>
        </div>
        <div>
          <h4>Room Number</h4>
          <select></select>
        </div>
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

<style></style>
