<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.orderId">
            <td>{{ item.orderId }}</td>
            <td>{{ item.customerName }}</td>
            <td>{{ item.numItems }}</td>
            <td>${{ item.totalAmount }}</td>
            <td>
              <v-chip
                :color="getStatusColor(item.orderStatus)"
                text-color="white"
                class="ma-1"
              >
                {{ item.orderStatus }}
              </v-chip>
            </td>
            <td>
              <v-btn small text color="primary" @click="showMore(item)"
                >More Info</v-btn
              >
            </td>
            <td>
              <v-btn
                small
                text
                color="secondary"
                @click="openStatusDialog(item)"
                >Change <v-icon small class="ml-1">mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>

    <v-dialog v-model="showMoreDialog" max-width="600">
      <v-card>
        <v-card-title class="headline grey lighten-3"
          >Order Details</v-card-title
        >
        <v-card-text>
          <v-container v-if="selectedOrder">
            <v-row>
              <v-col cols="6">
                <strong>Order ID:</strong> {{ selectedOrder.orderId }}
              </v-col>
              <v-col cols="6">
                <strong>Customer:</strong> {{ selectedOrder.customerName }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <strong>Date:</strong> {{ selectedOrder.orderDate }}
              </v-col>
              <v-col cols="6">
                <strong>Total:</strong> ${{ selectedOrder.totalAmount }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <strong>Status:</strong>
                <v-chip
                  :color="getStatusColor(selectedOrder.orderStatus)"
                  text-color="white"
                  class="ma-1"
                >
                  {{ selectedOrder.orderStatus }}
                </v-chip>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row>
              <v-col>
                <strong>Items:</strong>
                <v-list dense>
                  <v-list-item
                    v-for="(i, index) in selectedOrder.orderItems"
                    :key="index"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        🍕 {{ i.itemName }} — Qty: {{ i.quantity }} — ${{
                          i.price
                        }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="showMoreDialog = false" class="mb-2"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showStatusDialog" max-width="400">
      <v-card>
        <v-card-title class="headline grey lighten-3 p-1"
          >Change Order Status</v-card-title
        >
        <v-card-text class="pt-4">
          <v-select
            v-model="newStatus"
            :items="statusOptions"
            label="Select new status"
            outlined
            dense
            hide-details
          ></v-select>
        </v-card-text>
        <v-card-actions class="pt-4">
          <v-spacer />
          <v-btn color="success" @click="updateStatus">Update</v-btn>
          <v-btn text @click="showStatusDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { orderStatusColorMixin } from "@/mixins/orderStatusColor";

export default {
  props: {
    orders: Array,
  },
  name: "DashboardData",
  data() {
    return {
      headers: [
        { text: "Order ID", value: "orderId" },
        { text: "Customer", value: "customerName" },
        { text: "Items", value: "numItems" },
        { text: "Total ($)", value: "totalAmount" },
        { text: "Status", value: "orderStatus" },
        { text: "More Info", value: "more", sortable: false },
        { text: "Change Status", value: "changeStatus", sortable: false },
      ],
      selectedOrder: null,
      showMoreDialog: false,
      showStatusDialog: false,
      newStatus: "",
      statusOptions: [
        "Order Received",
        "Preparing",
        "Ready to Serve",
        "Completed Orders",
      ],
    };
  },
  mixins: [orderStatusColorMixin],
  methods: {
    showMore(order) {
      this.selectedOrder = order;
      this.showMoreDialog = true;
    },

    openStatusDialog(order) {
      this.selectedOrder = order;
      this.newStatus = order.orderStatus;
      this.showStatusDialog = true;
    },

    updateStatus() {
      if (this.selectedOrder) {
        this.selectedOrder.orderStatus = this.newStatus;

        const updatedOrders = this.orders.map((order) =>
          order.orderId === this.selectedOrder.orderId
            ? this.selectedOrder
            : order
        );
        this.$emit("update-orders", updatedOrders);
      }
      this.showStatusDialog = false;
    },
  },
};
</script>
