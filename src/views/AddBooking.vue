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
      <table
        v-bind:style="bookingDetails.length !== 0 ? {} : { display: 'none' }"
      >
        <tr>
          <th>Booking Detail ID</th>
          <th>Room Number</th>
          <th>Type</th>
          <th>Manage</th>
        </tr>

        <tr v-for="(item, i) in bookingDetails" :key="i" class="row">
          <td>{{ item.id }}</td>
          <td>{{ item.roomNumber }}</td>
          <td>{{ item.roomType }}</td>
          <td>
            <div class="manage">
              <button class="manage-button">
                <i class="fa fa-trash fa-2x"></i>
              </button>
            </div>
          </td>
        </tr>
      </table>

      <PaginationBar></PaginationBar>

      <div
        :style="{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '25px',
        }"
      >
        <AddButton />
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
      <DefaultButton>ADD</DefaultButton>
    </div>
  </FormContainer>
</template>

<script>
  import FormContainer from "../components/FormContainer.vue";
  import DefaultButton from "../components/DefaultButton.vue";
  import InnerFormContainer from "../components/InnerFormContainer.vue";
  import AddButton from "../components/AddButton.vue";
  import PaginationBar from "../components/PaginationBar.vue";

  const bookingDetails = [
    { id: 1000020023, roomNumber: "1623", roomType: "suite" },
    { id: 1000020024, roomNumber: "1023", roomType: "grand ballroom" },
    { id: 1000020025, roomNumber: "1235", roomType: "standard" },
    { id: 1000020026, roomNumber: "1236", roomType: "seminar" },
    { id: 1000020027, roomNumber: "5643", roomType: "suite" },
    { id: 1000020028, roomNumber: "1234", roomType: "standard" },
  ];

  export default {
    name: "AddBooking",
    components: {
      FormContainer,
      DefaultButton,
      InnerFormContainer,
      AddButton,
      PaginationBar,
    },
    data() {
      return {
        bookingDetails,
      };
    },

    methods: {
      next: function() {
        if (this.currentPage * this.pageSize < this.bookingDetails.length) {
          this.currentPage++;
        }
      },
      prev: function() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
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
    width: 100%;
    max-width: 500px;
    align-self: center;
    border: 1px solid black;
    border-collapse: collapse;
    margin-top: 25px;
  }
  th {
    height: 35px;
    text-align: center;
    background-color: #eeeeee;
    border-bottom: 1px solid black;
  }
  td {
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .row:hover {
    cursor: pointer;
    background: #f0f0f0;
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
    padding: 0 20px;
  }
  i:hover {
    color: var(--primary-blue);
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
    input {
      width: 180px;
    }
  }
  @media (max-width: 700px) {
    th {
      height: 35px;
      text-align: center;
      background-color: #eeeeee;
      border-bottom: 1px solid black;
      font-size: 14px;
    }
    td {
      text-align: center;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
</style>
