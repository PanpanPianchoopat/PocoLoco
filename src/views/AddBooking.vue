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

      <!-- Table -->
      <table>
        <tr>
          <th>Booking Detail ID</th>
          <th>Manage</th>
        </tr>

        <tr v-for="(item, i) in sampleID" :key="i" class="row">
          <td class="idCell">{{ item.id }}</td>
          <td>
            <div class="manage">
              <button class="manage-button">
                <i class="fa fa-pencil fa-2x"></i>
              </button>
              <div class="vl" />
              <button class="manage-button">
                <i class="fa fa-trash fa-2x"></i>
              </button>
            </div>
          </td>
        </tr>
      </table>
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

  const sampleID = [
    { id: 1000020023654800 },
    { id: 1000020023654801 },
    { id: 1000020023654802 },
    { id: 1000020023654803 },
    { id: 1000020023654804 },
    { id: 1000020023654805 },
    { id: 1000020023654806 },
    { id: 1000020023654807 },
    { id: 1000020023654808 },
    { id: 1000020023654809 },
    { id: 1000020023654810 },
    { id: 1000020023654811 },
    { id: 1000020023654812 },
    { id: 1000020023654813 },
    { id: 1000020023654814 },
  ];

  export default {
    name: "AddBooking",
    components: { FormContainer, DefaultButton, InnerFormContainer },
    data() {
      return {
        sampleID,
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
  table {
    border: 1px solid black;
    border-collapse: collapse;
    margin-top: 25px;
  }
  th {
    height: 35px;
    padding-left: 50px;
    background-color: #eeeeee;
    border-bottom: 1px solid black;
  }
  .row:hover {
    cursor: pointer;
    background: #f0f0f0;
  }
  .idCell {
    padding-left: 50px;
  }
  .manage-button {
    border: none;
    background: none;
    cursor: pointer;
  }
  .manage {
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 45px 0;
  }
  i {
    color: #5f5f5f;
  }
  i:hover {
    color: #0a96b7;
  }
  .vl {
    border-left: 3px solid #eeeeee;
    height: 25px;
    margin: 0 15px;
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
