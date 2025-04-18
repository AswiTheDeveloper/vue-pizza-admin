export const orderStatusColorMixin = {
    methods: {
        getStatusColor(status) {
            const statusColors = {
                "Order Received": "#FBC02D",
                "Preparing": "#FB8C00",
                "Ready to Serve": "#43A047",
                "Completed Order": "#1E88E5",
            };
            return statusColors[status] || "#9E9E9E";
        }
    }
};
