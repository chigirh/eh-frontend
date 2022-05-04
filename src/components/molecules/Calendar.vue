<script>
import { defineComponent } from "vue";

import "bootstrap/dist/css/bootstrap.min.css";

import Datepicker from "vue3-datepicker";

import commons from "@/common/commons";
import schedulsApi from "@/api/schedule";
import store from "@/store/index";
import router from "@/router/index";

export default defineComponent({
  name: "CarenderView",
  data: function () {
    return {
      fromPicked: new Date(),
      toPicked: new Date(),
      rowAggregates: [],
      aggregates: [],
    };
  },
  watch: {
    aggregates: function (newVal) {
      let map = new Map();
      this.$store.state.periods.forEach((e) => {
        map.set(e.period, {
          time: `${("00" + e.hour_from).slice(-2)}:${(
            "00" + e.minute_from
          ).slice(-2)}`,
          rows: new Array(),
        });
      });

      newVal.forEach((e) => {
        e.periods.forEach((v) => {
          let obj = map.get(v.period);
          obj.rows.push({ count: v.count });
        });
      });
      this.rowAggregates.splice(0);
      this.rowAggregates = Array.from(map.values());
    },
  },
  methods: {
    handle() {
      if (this.toPicked.getTime() < this.fromPicked.getTime()) {
        alert("ToではFromより前に日付を指定することはできません。");
        return;
      }

      this.aggregates = [];
      let from = commons.dateToString(this.fromPicked);
      let to = commons.dateToString(this.toPicked);

      schedulsApi
        .aggregate(from, to, this.$store.state.auth.token)
        .then((res) => {
          this.aggregates = res.data.aggregates;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            alert(err.response.data.message);
          } else {
            alert("Internal server error:" + err.response.data.message);
          }
          this.$router.push({ path: "/" });
        });
    },
  },
  setup() {
    schedulsApi
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
  },
  components: {
    Datepicker,
  },
});
</script>

<template>
  <div class="col-md-12 order-md-1">
    <form>
      <div class="row justify-content-around">
        <div class="col-md-4 mb-3">
          <label for="picker-from">From</label>
          <datepicker
            class="form-control"
            id="picker-from"
            format="yyyy-MM-dd"
            v-model="fromPicked"
          />
        </div>
        <div class="col-md-4 mb-3">
          <label for="picker-to">To</label>
          <datepicker
            class="form-control"
            id="picker-to"
            format="yyyy-MM-dd"
            v-model="toPicked"
          />
        </div>
      </div>
      <div class="row justify-content-around">
        <div class="col-md-4 mb-3">
          <button
            class="btn btn-lg btn-primary btn-block"
            type="button"
            @click="handle()"
          >
            Display
          </button>
        </div>
      </div>
    </form>
  </div>
  <table class="table table-bordered table-striped table-sm">
    <thead class="thead-light">
      <tr>
        <th scope="col" style="width: 80px">times</th>
        <th
          scope="col"
          v-for="aggregate in this.aggregates"
          :key="aggregate.date"
        >
          {{ aggregate.date }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="aggregate in this.rowAggregates" :key="aggregate.time">
        <th>{{ aggregate.time }}</th>
        <td v-for="row in aggregate.rows" :key="row.count">
          {{ row.count }}人
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang='css'>
</style>
