<template>
  <FormContainer>
    <div class="form-header">
      <h2>Add Booking Detail</h2>
    </div>

    <InnerFormContainer
      class="styled-inner"
      :style="
        sampleRooms.length === 0
          ? { height: '500px' }
          : windowWidth <= 1000
          ? { height: '1100px', position: 'relative' }
          : { height: '800px', position: 'relative' }
      "
    >
      <div :style="{ alignSelf: 'center', paddingLeft: '60px' }">
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
                :masks="{ input: ['DD/MM/YYYY'] }"
                :model-config="inDateConfig"
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
                :masks="{ input: ['DD/MM/YYYY'] }"
                :model-config="outDateConfig"
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
      </div>
      <!-- Table -->
      <table v-bind:style="sampleRooms.length !== 0 ? {} : { display: 'none' }">
        <tr>
          <th>Room Number</th>
          <th>Select</th>
        </tr>

        <tr
          v-for="(room, i) in sampleRooms.slice(
            currentPage * numberPerPage - numberPerPage,
            currentPage * numberPerPage
          )"
          :key="i"
          class="row"
        >
          <td>{{ room.roomNumber }}</td>

          <td>
            <input
              type="checkbox"
              :id="room.roomNumber"
              :value="room.roomNumber"
              v-model="selectedRooms"
              class="checkbox"
            />
            <label :id="room.roomNumber" for="i">{{ checked }}</label>
          </td>
        </tr>
      </table>

      <PaginationBar
        :pageCount="Math.ceil(sampleRooms.length / numberPerPage)"
        :paginationVisible="sampleRooms.length > numberPerPage"
        @pageReturn="pageReturn"
        :style="{
          position: 'absolute',
          bottom: '35px',
          margin: '0 auto',
          left: '0',
          right: '0',
        }"
      />
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
  import PaginationBar from "../components/PaginationBar.vue";

  const sampleRooms = [
    { roomNumber: "1234", type: "suite" },
    { roomNumber: "2345", type: "suite" },
    { roomNumber: "1232", type: "suite" },
    { roomNumber: "5555", type: "suite" },
    { roomNumber: "6666", type: "suite" },
    { roomNumber: "7777", type: "suite" },
    { roomNumber: "8888", type: "suite" },
    //{ roomNumber: "9999", type: "suite" },
    //{ roomNumber: "1010", type: "suite" },
  ];
  export default {
    name: "AddBookingDetail",
    components: {
      FormContainer,
      DefaultButton,
      InnerFormContainer,
      PaginationBar,
    },
    data() {
      return {
        windowWidth: window.innerWidth,
        sampleRooms,
        selectedRooms: [],
        inDate: new Date(),
        outDate: new Date(),
        numberPerPage: 5,
        currentPage: 1,
        inDateConfig: {
          type: "string",
          mask: "YYYY-MM-DD",
        },
        outDateConfig: {
          type: "string",
          mask: "YYYY-MM-DD",
        },
      };
    },

    mounted() {
      this.$nextTick(() => {
        window.addEventListener("resize", this.onResize);
      });
    },

    beforeDestroy() {
      window.removeEventListener("resize", this.onResize);
    },
    methods: {
      pageReturn(page) {
        this.currentPage = page;
      },
      onResize() {
        this.windowWidth = window.innerWidth;
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
  table {
    width: 100%;
    max-width: 350px;
    align-self: center;
    border: 1px solid black;
    border-collapse: collapse;
    margin-top: 30px;
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
  .checkbox {
    width: 20px;
    height: 20px;
    margin: 5px auto 0 auto;
  }

  i {
    color: var(--primary-blue);
    margin: 5px 0 0 -35px;
    padding-right: 240px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 45px 0;
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
