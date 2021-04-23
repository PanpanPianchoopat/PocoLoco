<template>
  <Container>
    <Navbar />

    <h3>Role</h3>
    <div class="menu-bar">
      <div>
        <span class="icon-wrap">
          <i class="fa fa-search fa-1x"></i>
        </span>

        <input class="search-field" type="text" placeholder="search" />
      </div>
      <DefaultButton type="small">Search</DefaultButton>
      <AddButton
        :style="{ position: 'fixed', right: '5%', top: '170px' }"
        @click="goToAddRole"
      />
    </div>

    <table v-bind:style="sampleRole.length !== 0 ? {} : { display: 'none' }">
      <tr>
        <th>Role ID</th>
        <th>Department</th>
        <th>Name</th>

        <th>Salary</th>
        <th>Bonus Rate</th>
        <th>Manage</th>
      </tr>

      <tr
        v-for="(role, i) in sampleRole.slice(
          currentPage * numberPerPage - numberPerPage,
          currentPage * numberPerPage
        )"
        :key="i"
        class="row"
      >
        <td>{{ role.id }}</td>
        <td>{{ role.dept }}</td>
        <td>{{ role.name }}</td>

        <td>{{ role.salary }}</td>
        <td>{{ role.bonus }}</td>
        <td>
          <div class="manage">
            <button
              class="manage-button"
              @click="getRecord(role.dept, role.name, role.salary, role.bonus)"
            >
              <i class="fa fa-pencil fa-2x"></i>
            </button>
            <div class="vl"></div>
            <button class="manage-button">
              <i class="fa fa-trash fa-2x" :style="{}"></i>
            </button>
          </div>
        </td>
      </tr>
    </table>

    <PaginationBar
      :pageCount="Math.ceil(sampleRole.length / numberPerPage)"
      :paginationVisible="sampleRole.length > numberPerPage"
      @pageReturn="pageReturn"
      :style="
        windowWidth <= 1000
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
  <Popup v-bind:visible="visible" @popReturn="popReturn">
    <div class="popup-head">
      <div>Department: {{ department }}</div>
      <div>Role: {{ role }}</div>
    </div>
    <p>Salary</p>
    <div :style="{ paddingBottom: '20px' }">
      <input
        type="text"
        :value="salary"
        :placeholder="salary"
        :style="{ marginRight: '10px' }"
      />
      Baht
    </div>
    <p>Bonus Rate</p>
    <input
      type="text"
      :value="bonusRate"
      :placeholder="bonusRate"
      :style="{ width: '95%' }"
    />
  </Popup>
</template>

<script>
  import DefaultButton from "../components/DefaultButton.vue";
  import Navbar from "../components/Navbar.vue";
  import Container from "../components/Container.vue";
  import PaginationBar from "../components/PaginationBar.vue";
  import AddButton from "../components/AddButton.vue";
  import Popup from "../components/Popup.vue";

  const sampleRole = [
    { id: 11, name: "Manager", dept: "Kitchen", salary: 30000, bonus: 0.8 },
    { id: 12, name: "Chef", dept: "Kitchen", salary: 40000, bonus: 0.9 },
    { id: 13, name: "Waiter", dept: "Kitchen", salary: 50000, bonus: 0.1 },
    {
      id: 21,
      name: "Manager",
      dept: "Housekeeping",
      salary: 30000,
      bonus: 0.1,
    },
    { id: 22, name: "Maid", dept: "Housekeeping", salary: 30000, bonus: 0.1 },
    { id: 31, name: "Manager", dept: "Hospitality", salary: 30000, bonus: 0.1 },
    {
      id: 32,
      name: "Receptionist",
      dept: "Hospitality",
      salary: 30000,
      bonus: 0.1,
    },
    { id: 11, name: "Manager", dept: "Kitchen", salary: 30000, bonus: 0.1 },
    { id: 12, name: "Chef", dept: "Kitchen", salary: 30000, bonus: 0.1 },
    { id: 13, name: "Waiter", dept: "Kitchen", salary: 50000, bonus: 0.1 },
    {
      id: 21,
      name: "Manager",
      dept: "Housekeeping",
      salary: 30000,
      bonus: 0.1,
    },
    { id: 22, name: "Maid", dept: "Housekeeping", salary: 30000, bonus: 0.1 },
    { id: 31, name: "Manager", dept: "Hospitality", salary: 30000, bonus: 0.1 },
    {
      id: 32,
      name: "Receptionist",
      dept: "Hospitality",
      salary: 30000,
      bonus: 0.1,
    },
    { id: 11, name: "Manager", dept: "Kitchen", salary: 30000, bonus: 0.1 },
    { id: 12, name: "Chef", dept: "Kitchen", salary: 30000, bonus: 0.1 },
  ];

  export default {
    name: "Role",
    components: {
      DefaultButton,
      Navbar,
      Container,
      PaginationBar,
      AddButton,
      Popup,
    },
    data() {
      return {
        sampleRole,
        numberPerPage: 4,
        currentPage: 1,
        visible: false,
        department: null,
        role: null,
        salary: 0,
        bonusRate: 0,
        navOpen: true,
        windowWidth: self.innerWidth,
        windowHeight: self.innerHeight,
      };
    },
    mounted() {
      this.$nextTick(() => {
        self.addEventListener("resize", this.onResize);
      });
    },
    beforeDestroy() {
      self.removeEventListener("resize", this.onResize);
    },
    methods: {
      pageReturn(page) {
        this.currentPage = page;
      },
      popReturn(value) {
        this.visible = value;
      },
      getRecord(department, role, salary, bonus) {
        this.visible = !this.visible;
        this.department = department;
        this.role = role;
        this.salary = salary;
        this.bonusRate = bonus;
      },
      goToAddRole() {
        this.$router.push("/AddRole");
      },
      navReturn(isOpen) {
        this.navOpen = isOpen;
      },
      onResize() {
        this.windowWidth = self.innerWidth;
        this.windowHeight = self.innerHeight;
        this.numberPerPage = Math.floor((this.windowHeight - 450) / 35);
        if (this.windowWidth <= 1000) {
          this.visible = false;
        }
      },
    },
  };
</script>

<style scoped>
  h3 {
    font-size: 48px;
    margin: 80px 0 35px 0;
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
    font-size: 18px;
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
  }
  .manage {
    height: 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .fa-pencil:hover,
  .fa-trash:hover {
    color: var(--primary-blue);
  }
  .manage-button {
    border: none;
    background: none;
    cursor: pointer;
  }
  .vl {
    border-left: 3px solid #eeeeee;
    height: 25px;
    margin: 0 15px;
  }
  .popup-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 3px solid var(--grey-highlight);
    padding-bottom: 20px;
    margin-bottom: 25px;
    font-weight: bold;
  }
  input {
    width: 250px;
    height: 35px;
    align-self: center;
    padding-left: 10px;
    color: var(--header-color);
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
  }
  @media (max-width: 700px) {
    table {
      width: 80%;
    }
    .search-field {
      width: 150px;
      font-size: 16px;
    }
  }
</style>
