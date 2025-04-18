<template>
  <v-app>
    <v-container fluid class="pa-0 fill-height">
      <v-row no-gutters class="fill-height">
        <Menubar />

        <v-col class="p-4 fill-height" style="flex: 1">
          <v-card elevation="2" class="pa-4 fill-height">
            <v-card-title class="headline">
              <h1>Dashboard</h1>
            </v-card-title>
            <v-divider class="mb-4" />

            <v-row class="mb-4" dense justify="space-around">
              <!-- Total Orders -->
              <v-col cols="auto">
                <v-card color="#102E50" dark class="pa-4 stat-card">
                  <v-card-title class="justify-center text-h6"
                    >Total Orders</v-card-title
                  >
                  <v-card-subtitle class="text-center text-h4">
                    {{ orders.length }}
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <!-- Order Received -->
              <v-col cols="auto">
                <v-card
                  :color="getStatusColor('Order Received')"
                  dark
                  class="pa-4 stat-card"
                >
                  <v-card-title class="justify-center text-h6"
                    >Order Received</v-card-title
                  >
                  <v-card-subtitle class="text-center text-h4">
                    {{ countByStatus("Order Received") }}
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <!-- Preparing -->
              <v-col cols="auto">
                <v-card
                  :color="getStatusColor('Preparing')"
                  dark
                  class="pa-4 stat-card"
                >
                  <v-card-title class="justify-center text-h6"
                    >Preparing</v-card-title
                  >
                  <v-card-subtitle class="text-center text-h4">
                    {{ countByStatus("Preparing") }}
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <!-- Ready to Serve -->
              <v-col cols="auto">
                <v-card
                  :color="getStatusColor('Ready to Serve')"
                  dark
                  class="pa-4 stat-card"
                >
                  <v-card-title class="justify-center text-h6"
                    >Ready to Serve</v-card-title
                  >
                  <v-card-subtitle class="text-center text-h4">
                    {{ countByStatus("Ready to Serve") }}
                  </v-card-subtitle>
                </v-card>
              </v-col>

              <!-- Completed Orders -->
              <v-col cols="auto">
                <v-card
                  :color="getStatusColor('Completed Order')"
                  dark
                  class="pa-4 stat-card"
                >
                  <v-card-title class="justify-center text-h6"
                    >Completed Orders</v-card-title
                  >
                  <v-card-subtitle class="text-center text-h4">
                    {{ countByStatus("Completed Order") }}
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>

            <!-- Dashboard data table and chart -->
            <v-divider class="mb-4" />

            <v-row>
              <Dashboard :orders="orders" @update-orders="updateOrders" />
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Dashboard from "@/components/DashboardData.vue";
import Menubar from "@/components/MenuItems.vue";
import { orderStatusColorMixin } from "@/mixins/orderStatusColor";

export default {
  name: "DashboardPage",
  components: { Dashboard, Menubar },
  mixins: [orderStatusColorMixin],
  data() {
    return {
      orders: [],
    };
  },
  computed: {
    ...mapState({
      storeOrders: (state) => state.orders,
    }),
  },
  methods: {
    countByStatus(status) {
      return this.orders.filter((order) => order.orderStatus === status).length;
    },

    updateOrders(updatedOrders) {
      this.orders = updatedOrders;
      this.$store.commit("setOrders", updatedOrders);
    },
  },

  watch: {
    storeOrders: {
      immediate: true,
      handler(newOrders) {
        this.orders = [...newOrders];
      },
    },
  },
  created() {
    this.$store.dispatch("fetchOrders");
  },
};
</script>

<style scoped>
.fill-height {
  height: auto;
}
.sidebar {
  background-color: #f5f5f5;
  border-right: 1px solid #ccc;
}
.stat-card {
  width: 280px;
  min-height: 150px;
  border-radius: 16px;
}
.menu-active {
  background-color: blue;
  color: white;
}
</style>
