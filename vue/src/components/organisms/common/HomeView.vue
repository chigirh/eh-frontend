<template>
<ul class="list-group">
  <li class="list-group-item">
    <router-link v-if="this.$store.state.auth.roles.some(value => value === 'ADMIN')" to="/mgr/add-user">Add User</router-link>
  </li>
  <li class="list-group-item">
    <router-link v-if="this.$store.state.auth.roles.some(value => value === 'GENE')" to="/schedule/regist">Schedule regist</router-link>
  </li>
  <li class="list-group-item">
    <router-link v-if="this.$store.state.auth.roles.some(value => value === 'ADMIN' || value === 'CORP')" to="/schedule/list">Schedule</router-link>
  </li>
</ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style scoped></style>
