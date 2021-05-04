<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add New Promotion</h2>
    </div>

    <InnerFormContainer>
      <div class="input-group">
        <div>
          <h4>Season</h4>
          <select></select>
        </div>
        <div>
          <h4>Room Type</h4>
          <select></select>
        </div>
      </div>

      <h4>Promotion Name</h4>
      <input type="text" />

      <div class="input-group">
        <div>
          <h4>Start Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="startDate"
              :masks="{ input: ['DD/MM/YYYY'] }"
              :model-config="startDateConfig"
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
          <h4>End Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="endDate"
              :masks="{ input: ['DD/MM/YYYY'] }"
              :model-config="endDateConfig"
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

      <h4>Discount</h4>
      <input type="number" :style="{ width: '200px' }" />
    </InnerFormContainer>
    <div class="buttons">
      <DefaultButton
        :style="{
          background: 'none',
          marginRight: '110px',
          border: '3px solid white',
        }"
        @click="backToPromo()"
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
    name: "AddPromo",
    components: { FormContainer, DefaultButton, InnerFormContainer },
    data() {
      return {
        startDate: null,
        endDate: null,
        startDateConfig: {
          type: "string",
          mask: "YYYY-MM-DD",
        },
        endDateConfig: {
          type: "string",
          mask: "YYYY-MM-DD",
        },
      };
    },
    methods: {
      backToPromo() {
        this.$router.push("/Promotion");
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
