<template>
  <Container>
    <Navbar />

    <h3>Promotions</h3>
    <div class="menu-bar">
      <div>
        <span class="icon-wrap">
          <i class="fa fa-search fa-1x"></i>
        </span>

        <input
          class="search-field"
          type="text"
          placeholder="search"
          :style="{ marginBottom: '0' }"
        />
      </div>
      <CustomSelect
        type="Filter"
        :options="['A', 'B', 'C']"
        :style="{ marginRight: '20px' }"
        @selection="selectionFilter"
      />
      <CustomSelect
        type="Sort by"
        :options="['A', 'B', 'C']"
        :style="{ marginRight: '20px' }"
        @selection="selectionSort"
      />
      <DefaultButton type="small" :style="width < 650 ? { width: '70px' } : {}">
        Search
      </DefaultButton>
      <AddButton
        :style="
          width < 800
            ? { position: 'fixed', right: '5%', top: '80px' }
            : { position: 'fixed', right: '5%', top: '170px' }
        "
        @click="goToAddPromotion()"
      />
    </div>

    <table v-if="promotions.length !== 0">
      <tr>
        <th>Promotion Name</th>
        <th>Season</th>
        <th>Room Type</th>
        <th>Discount</th>
        <th>Start</th>
        <th>End</th>
        <th>Edit</th>
      </tr>

      <tr
        v-for="(promotion, i) in promotions.slice(
          currentPage * tableRow - tableRow,
          currentPage * tableRow
        )"
        :key="i"
        class="row"
      >
        <td>{{ promotion.promoName }}</td>
        <td>{{ promotion.season }}</td>
        <td>{{ promotion.roomType }}</td>
        <td>{{ promotion.discount * 100 }}%</td>
        <td>{{ promotion.start }}</td>
        <td>{{ promotion.end }}</td>
        <td>
          <div class="manage">
            <button class="manage-button" @click="getExpenseData(promotion)">
              <i class="fa fa-pencil fa-2x"></i>
            </button>
          </div>
        </td>
      </tr>
    </table>

    <PaginationBar
      :pageCount="Math.ceil(promotions.length / tableRow)"
      :paginationVisible="promotions.length > tableRow"
      @pageReturn="pageReturn"
      :style="
        width <= 1000
          ? {
              position: 'fixed',
              bottom: '50px',
              margin: '0 auto',
              right: '0',
              left: '60px',
            }
          : {
              position: 'fixed',
              bottom: '50px',
              margin: '0 auto',
              right: '0',
              left: '200px',
            }
      "
    />
  </Container>

  <!--View-->
  <Popup v-bind:visible="viewVisible" @popReturn="viewReturn" :buttons="true">
    <div class="input-group">
      <div class="group-item">
        <h4>Season Name</h4>
        <select>
          <option :value="season" selected disabled hidden>{{ season }}</option>
          <option
            v-for="(option, i) in seasonOptions"
            :key="i"
            :value="season"
            :selected="option == season ? 'selected' : null"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <div class="group-item">
          <h4>Room Type</h4>
          <select>
            <option :value="season" selected disabled hidden>
              {{ roomType }}
            </option>
            <option
              v-for="(option, i) in roomOptions"
              :key="i"
              :value="roomType"
              :selected="option == roomType ? 'selected' : null"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <h4>Promotion Name</h4>
    <input
      type="text"
      :value="promoName"
      :placeholder="promoName"
      :style="{ width: '95%' }"
    />

    <div class="input-group">
      <div class="group-item">
        <h4>Start Date</h4>
        <div class="flex x-full">
          <v-date-picker
            v-model="promoStart"
            :masks="{ input: ['YYYY-MM-DD'] }"
            :model-config="startDateConfig"
            mode="single"
            class="flex-grow"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <div :style="{ display: 'flex', flexDirection: 'row' }">
                <input
                  :value="inputValue"
                  v-on="inputEvents"
                  :placeholder="promoStart"
                  :style="{ width: '120px', marginRight: '0' }"
                />
                <i class="fa fa-calendar fa-2x"></i>
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>
      <div class="group-item">
        <h4>End Date</h4>
        <div class="flex x-full">
          <v-date-picker
            v-model="promoEnd"
            :masks="{ input: ['YYYY-MM-DD'] }"
            :model-config="endDateConfig"
            mode="single"
            class="flex-grow"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <div :style="{ display: 'flex', flexDirection: 'row' }">
                <input
                  :value="inputValue"
                  v-on="inputEvents"
                  :style="{ width: '120px', marginRight: '0' }"
                />
                <i class="fa fa-calendar fa-2x"></i>
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>
    </div>
    <h4>Discount</h4>
    <input type="text" :value="discount" :placeholder="discount" />
  </Popup>
</template>

<script>
  import DefaultButton from "../components/DefaultButton.vue";
  import Navbar from "../components/Navbar.vue";
  import Container from "../components/Container.vue";
  import PaginationBar from "../components/PaginationBar.vue";
  import AddButton from "../components/AddButton.vue";
  import Popup from "../components/Popup.vue";
  import { useScreenWidth } from "../composables/useScreenWidth";
  import { useScreenHeight } from "../composables/useScreenHeight";
  import CustomSelect from "../components/CustomSelect.vue";

  const promotions = [
    {
      season: "New Year",
      promoName: "Happy x2",
      roomType: "Double",
      discount: 0.1,
      start: "2022-01-05",
      end: "2022-01-08",
    },
    {
      season: "Christmas",
      promoName: "Hakuna Matata",
      roomType: "Villa",
      discount: 0.25,
      start: "2021-12-23",
      end: "2021-12-27",
    },
    {
      season: "Christmas",
      promoName: "Hakuna Matata",
      roomType: "Suite",
      discount: 0.05,
      start: "2021-12-23",
      end: "2021-12-27",
    },
    {
      season: "Summer",
      promoName: "Hot summer, Hot deal",
      roomType: "Deluxe",
      discount: 0.3,
      start: "2022-04-03",
      end: "2022-04-10",
    },
    {
      season: "Low Season",
      promoName: "Free Floating Breakfast",
      roomType: "Suite",
      discount: 0.05,
      start: "2021-05-03",
      end: "2021-05-25",
    },
    {
      season: "Songkran",
      promoName: "Buffet Breakfast",
      roomType: "Single",
      discount: 0.1,
      start: "2022-04-13",
      end: "2022-04-15",
    },
    {
      season: "Hotel Special Day",
      promoName: "20th Year Celebration",
      roomType: "Suite",
      discount: 0.2,
      start: "2022-07-14",
      end: "2022-07-17",
    },
  ];

  const seasonOptions = [
    "New Year",
    "Christmas",
    "Summer",
    "Low Season",
    "Songkran",
  ];

  const roomOptions = ["Double", "Villa", "Suite", "Deluxe", "Single"];

  export default {
    name: "Promotion",
    components: {
      DefaultButton,
      Navbar,
      Container,
      PaginationBar,
      AddButton,
      Popup,
      CustomSelect,
    },
    setup() {
      const { width } = useScreenWidth();
      const { height, tableRow } = useScreenHeight();
      return { width, height, tableRow };
    },
    data() {
      return {
        promotions,
        seasonOptions,
        roomOptions,
        currentPage: 1,
        viewVisible: false,
        season: null,
        promoName: null,
        roomType: null,
        discount: null,
        promoStart: null,
        promoEnd: null,
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
      pageReturn(page) {
        this.currentPage = page;
      },
      viewReturn(value) {
        this.viewVisible = value;
      },
      getExpenseData(promotion) {
        this.viewVisible = !this.viewVisible;
        this.season = promotion.season;
        this.promoName = promotion.promoName;
        this.roomType = promotion.roomType;
        this.discount = promotion.discount;
        this.promoStart = promotion.start;
        this.promoEnd = promotion.end;
      },
      goToAddPromotion() {
        this.$router.push("/AddPromo");
      },
    },
  };
</script>

<style scoped>
  h3 {
    font-size: 48px;
    margin: 80px 0 35px 0;
  }
  h4 {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .icon-wrap {
    position: absolute;
    z-index: 0;
    padding: 5px 20px;
  }
  .search-field {
    width: 225px;
    height: 30px;
    padding-left: 45px;
    font-size: 16px;
    outline: none;
    z-index: 1;
    border: none;
    border-radius: 50px;
    margin-right: 20px;
  }
  i {
    color: #5f5f5f;
  }
  .menu-bar {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  table {
    width: 75%;
    max-width: 1000;
    margin-top: 50px;
    border: 1px solid black;
    border-collapse: collapse;
    align-self: flex-start;
    z-index: 0;
  }
  .manage {
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .fa-pencil:hover {
    color: var(--primary-blue);
  }
  .fa-calendar {
    color: var(--primary-blue);
    margin: 3px 0 0 -35px;
  }
  .manage-button {
    border: none;
    background: none;
    cursor: pointer;
  }

  p {
    margin-bottom: 10px;
    font-size: 18px;
  }
  input {
    width: 120px;
    height: 35px;
    padding: 0 10px;
    margin-bottom: 20px;
    color: var(--header-color);
  }
  .input-group {
    display: flex;
    width: 100%;
    flex-direction: row;
  }
  .group-item {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  select {
    width: 180px;
    height: 35px;
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
    background: var(--grey-highlight);
  }
  *:focus {
    outline: 0;
  }
  @media (max-width: 1000px) {
    .search-field {
      width: 180px;
    }
    .vl {
      margin: 0 5px;
    }
    table {
      width: 85%;
    }
    h4 {
      font-size: 16px;
    }
    p {
      font-size: 16px;
    }
    .subscript-text {
      font-size: 12px;
      margin-top: 5px;
    }
    .rank {
      width: 40px;
      height: 40px;
      margin: 12px 15px 0 0;
      font-size: 16px;
    }
  }
  @media (max-width: 700px) {
    table {
      width: 80%;
    }
    th {
      font-size: 14px;
    }
    td {
      font-size: 14px;
    }
    .search-field {
      width: 150px;
      font-size: 16px;
    }
    h4 {
      font-size: 14px;
    }
    p {
      font-size: 14px;
    }
    .rank {
      width: 35px;
      height: 35px;
      margin: 10px 15px 0 0;
      font-size: 14px;
    }
    select {
      width: 140px;
    }
    .fa-pencil {
      font-size: 20px;
    }
  }
</style>
