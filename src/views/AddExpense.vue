<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Hotel Expenses</h2>
    </div>

    <InnerFormContainer>
      <h4 :style="{ paddingBottom: '20px' }">Employee ID: XXXXXXXXX</h4>

      <div class="input-group">
        <h4>Room Number</h4>
        <input type="text" />
      </div>

      <div class="input-group">
        <h4>Detail</h4>
        <textarea />
      </div>

      <div class="two-inline">
        <div class="input-group">
          <h4>Expense</h4>
          <div :style="{ display: 'flex', flexDirection: 'row' }">
            <input type="number" />
            <p class="unit">Baht</p>
          </div>
        </div>

        <div class="input-group">
          <h4>Expense Date</h4>
          <div class="flex x-full">
            <v-date-picker
              v-model="expenseDate"
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
    name: "AddExpense",
    components: { FormContainer, DefaultButton, InnerFormContainer },
    data() {
      return {
        expenseDate: null,
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
