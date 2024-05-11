const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { userId, books, status } = req.body;

  try {
    const newOrder = new Order({ user: userId, books, status });
    await newOrder.save();
    res.status(201).json({ message: "Pedido creado correctamente." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username")
      .populate("books", "title")
      .exec();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado." });
    }

    order.status = status;
    await order.save();
    res.json({ message: "Estado del pedido actualizado correctamente." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};

exports.softDeleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado." });
    }

    order.disabled = true;
    await order.save();
    res.json({ message: "Pedido deshabilitado correctamente." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor.");
  }
};
