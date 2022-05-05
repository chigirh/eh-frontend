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

export default defineComponent({
  name: "AppView",
  methods: {},
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
