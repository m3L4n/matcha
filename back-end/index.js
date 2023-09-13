const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const { deletedataExpiredFromToken } = require("./db/updateExpiredData");
const userRouter = require("./routes/users/users");
const swaggerDocument = require("./swagger.json");
app.use(express.json());

app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/users", userRouter);
app.use(function (req, res, next) {
  res.header("content-type", "application/json;charset=utf-8");
  res.header("access-control-allow-credentials", true);
  res.header("access-control-allow-headers", "origin, x-requested-with, content-type, accept");
  next();
});
setInterval(deletedataExpiredFromToken, 60 * 60 * 1000);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
