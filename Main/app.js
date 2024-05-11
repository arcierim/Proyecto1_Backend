const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const config = require("./config");

const app = express();

app.use(bodyParser.json());

app.use(authMiddleware);

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor en ejecución en el puerto ${PORT}`)
);
