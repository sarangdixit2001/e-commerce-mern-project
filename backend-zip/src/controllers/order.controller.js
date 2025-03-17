const orderService = require("../services/order.service.js");

const createOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: "Invalid order data" });
    }

    const createdOrder = await orderService.createOrder(req.user, req.body);

    return res.status(201).send(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};


const findOrderById = async (req, res) => {
  try {
    console.log("Fetching order with ID:", req.params.id);

    const order = await orderService.findOrderById(req.params.id);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    return res.status(200).send(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).send({ message: "Internal Server Error", error: error.stack });
  }
};



const orderHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const orders = await orderService.usersOrderHistory(req.user._id);

    return res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};


module.exports = { createOrder, findOrderById, orderHistory };
