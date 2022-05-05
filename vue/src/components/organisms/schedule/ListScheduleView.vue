<template>
  <div class="container">
    <div class="col-md-12 order-md-1">
      <div class="py-5 text-center">
        <h2>Schedule Aggregates</h2>
        <p class="lead">Aggregation by timeline.</p>
      </div>
      <Calendar />
    </div>

  </div>
</template>

<script>
import { defineComponent } from "vue";

import Calendar from "@/components/molecules/Calendar.vue";

// import schedulsApi from "@/api/schedule";

export default defineComponent({
  name: "ListScheduleView",
  data() {
    return {};
  },
  methods: {
    handle() {},
  },
  components: {
    Calendar,
  },
});
</script>

<style scoped></style>
