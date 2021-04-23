<template>
  <div
    id="nav"
    :style="windowWidth <= 1000 ? (visible ? {} : { width: '60px' }) : {}"
  >
    <button
      class="close"
      @click="returnVisible"
      :style="
        windowWidth <= 1000
          ? visible
            ? {}
            : { left: '15px', top: '15px' }
          : { display: 'none' }
      "
    >
      <i
        class="fa fa-times fa-2x"
        :style="windowWidth <= 1000 && visible ? {} : { display: 'none' }"
      ></i>
      <i
        class="fa fa-bars fa-2x"
        :style="!visible ? {} : { display: 'none' }"
      ></i>
    </button>
    <div
      class="circle"
      :style="visible || windowWidth > 1000 ? {} : { display: 'none' }"
    >
      <img src="../assets/owner.png" />
    </div>
    <div
      class="info"
      :style="visible || windowWidth > 1000 ? {} : { display: 'none' }"
    >
      <b>Role Name</b>
      <b>Employee ID</b>
    </div>
    <div
      class="menu"
      :style="visible || windowWidth > 1000 ? {} : { display: 'none' }"
    >
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
      <router-link :to="{ name: 'Role' }">Role</router-link>
    </div>
    <button
      class="logout-button"
      :style="visible || windowWidth > 1000 ? {} : { display: 'none' }"
    >
      <div class="logout-text">
        <i
          class="fa fa-sign-out fa-2x"
          :style="visible ? { paddingRight: '5px' } : {}"
        >
        </i>
        <div>Logout</div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      visible: true,
      windowWidth: self.windowWidth,
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
    returnVisible() {
      this.visible = !this.visible;
      this.$emit("NavReturn", this.visible);
    },
    onResize() {
      this.windowWidth = self.innerWidth;
      if (this.windowWidth <= 1000) {
        this.visible = false;
      }
    },
  },
};
</script>

<style scoped>
#nav {
  width: 200px;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  background-color: var(--primary-blue);
  transition: width 0.25s;
}
#nav a {
  font-weight: bold;
  color: #fcfcfc;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 0;
  padding-left: 40px;
}
#nav a:hover {
  background: white;
  border-radius: 50px;
  opacity: 0.85;
  z-index: 10;
  color: var(--text-color);
}
#nav a.router-link-exact-active {
  color: var(--text-color);
  background: white;
  border-radius: 50px;
  z-index: 10;
}
.close {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  position: fixed;
  top: 5px;
  left: 165px;
  z-index: 10;
  cursor: pointer;
}
.close:hover {
  opacity: 0.7;
}
i {
  color: white;
  cursor: pointer;
}
.circle {
  width: 90px;
  height: 90px;
  background: var(--primary-yellow);
  display: flex;
  justify-content: center;
  align-self: center;
  border-radius: 50%;
  overflow: hidden;
}
img {
  width: 55px;
  align-self: center;
  padding-top: 25px;
}
.info {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}
b {
  font-size: 18px;
  color: white;
  align-self: center;
}
.menu {
  display: flex;
  flex-direction: column;
  padding: 45px 0 0 20px;
  margin-right: -20px;
}
.logout-button {
  width: 120px;
  left: 40px;
  bottom: 30px;
  height: 35px;
  position: fixed;
  z-index: 10;
  background: none;
  border: none;
}
.logout-button:hover {
  cursor: pointer;
  opacity: 0.7;
}
.logout-text {
  width: 100%;
  color: white;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
*:focus {
  outline: 0;
}
</style>
