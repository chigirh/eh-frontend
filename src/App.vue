<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <router-link class="navbar-brand" to="/">east house .inc</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" v-if="this.$store.state.auth.roles.some(value => value === 'ADMIN')" to="/mgr/add-user">Add User</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="this.$store.state.auth.roles.some(value => value === 'GENE')" to="/schedule/regist">Schedule regist</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="this.$store.state.auth.roles.some(value => value === 'ADMIN' || value === 'CORP')" to="/schedule/list">Schedule</router-link>
        </li>
      </ul>
    </nav>
  </header>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

import "bootstrap/dist/css/bootstrap.min.css";

import scheduleApi from "@/api/schedule";
import store from "@/store/index";
import router from "@/router/index";

export default defineComponent({
  name: "AppView",
  methods: {
    window: (onload = function () {
      scheduleApi
        .getPeriods(store.state.auth.token)
        .then((res) => {
          store.state.periods = res.data.periods;
        })
        .catch((err) => {
          if (err.response.status == 401) {
            alert(err.response.data.message);
          } else {
            alert("Internal server error:" + err.response.data.message);
          }
          router.push({ path: "/" });
        });
    }),
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
